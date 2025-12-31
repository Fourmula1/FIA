from typing import List, Dict, Any
from .vector_store import VectorStore
import uuid

class SiloManager:
    SILOS = ["intent", "execution", "constraint"]

    def __init__(self):
        self.vector_store = VectorStore()
        self.collections = {
            silo: self.vector_store.get_collection(f"silo_{silo}")
            for silo in self.SILOS
        }

    def add_document(self, silo: str, text: str, metadata: Dict[str, Any]):
        if silo not in self.SILOS:
            raise ValueError(f"Invalid silo '{silo}'. Must be one of {self.SILOS}")
        
        collection = self.collections[silo]
        
        # Simple ID generation
        doc_id = str(uuid.uuid4())
        
        collection.add(
            documents=[text],
            metadatas=[metadata],
            ids=[doc_id]
        )

    def query_silo(self, silo: str, query_text: str, n_results: int = 5):
        if silo not in self.SILOS:
            raise ValueError(f"Invalid silo '{silo}'. Must be one of {self.SILOS}")
        
        collection = self.collections[silo]
        results = collection.query(
            query_texts=[query_text],
            n_results=n_results
        )
        return results

    def clear_silo(self, silo: str):
        if silo not in self.SILOS:
            raise ValueError(f"Invalid silo '{silo}'. Must be one of {self.SILOS}")
        
        # Chroma doesn't have a clear method on collection, so we delete and recreate
        self.vector_store.client.delete_collection(f"silo_{silo}")
        self.collections[silo] = self.vector_store.get_collection(f"silo_{silo}")
