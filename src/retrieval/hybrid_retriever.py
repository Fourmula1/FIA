from typing import List, Dict, Any
from src.indexing.silo_manager import SiloManager

class HybridRetriever:
    def __init__(self):
        self.silo_manager = SiloManager()

    def retrieve(self, query: str, silos: List[str] = None, k: int = 5) -> Dict[str, List[Dict[str, Any]]]:
        """
        Retrieve context from specified silos.
        If silos is None, retrieve from all.
        Returns a dict keyed by silo name.
        """
        if silos is None:
            silos = self.silo_manager.SILOS
            
        results = {}
        for silo in silos:
            try:
                # Get raw results from Chroma
                raw_results = self.silo_manager.query_silo(silo, query, n_results=k)
                
                # Format into a cleaner structure
                formatted_results = []
                if raw_results['ids']:
                     for i in range(len(raw_results['ids'][0])):
                        formatted_results.append({
                            "id": raw_results['ids'][0][i],
                            "text": raw_results['documents'][0][i],
                            "metadata": raw_results['metadatas'][0][i],
                            "distance": raw_results['distances'][0][i] if raw_results['distances'] else None
                        })
                results[silo] = formatted_results
            except Exception as e:
                print(f"Error retrieving from {silo}: {e}")
                results[silo] = []
                
        return results
