import pytest
from src.indexing.silo_manager import SiloManager
import shutil
import os

# Fixture to setup and teardown test data
@pytest.fixture
def silo_manager():
    # Setup
    manager = SiloManager()
    yield manager
    # Teardown - handled by ChromaDB usually, but we can clear silos
    for silo in manager.SILOS:
        manager.clear_silo(silo)

def test_silo_addition_and_query(silo_manager):
    silo_manager.add_document(
        silo="intent", 
        text="Our startup is growing at 50% MoM", 
        metadata={"source": "pitch_deck.pdf"}
    )
    
    results = silo_manager.query_silo("intent", "growth rate")
    
    assert len(results['ids'][0]) > 0
    assert "pitch_deck.pdf" in results['metadatas'][0][0]['source']

def test_silo_isolation(silo_manager):
    """Test that data added to Intent doesn't show up in Execution"""
    silo_manager.add_document(
        silo="intent", 
        text="We are hiring aggressively", 
        metadata={"source": "internal_memo.txt"}
    )
    
    results_exec = silo_manager.query_silo("execution", "hiring")
    # Should be empty because we added to intent, not execution
    assert len(results_exec['ids'][0]) == 0

