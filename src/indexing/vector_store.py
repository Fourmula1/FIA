import chromadb
from chromadb.config import Settings as ChromaSettings
from src.config import get_settings
import os

class VectorStore:
    def __init__(self):
        self.settings = get_settings()
        os.makedirs(self.settings.chroma_db_dir, exist_ok=True)
        
        self.client = chromadb.PersistentClient(
            path=self.settings.chroma_db_dir,
            settings=ChromaSettings(allow_reset=True)
        )

    def get_collection(self, name: str):
        return self.client.get_or_create_collection(
            name=name,
            metadata={"hnsw:space": "cosine"} # Cosine similarity for semantic search
        )

    def reset(self):
        """WARNING: This deletes all data"""
        self.client.reset()
