from abc import ABC, abstractmethod
from typing import List, Dict, Any
import os
from llama_parse import LlamaParse
from src.config import get_settings

class BaseParser(ABC):
    @abstractmethod
    def parse(self, file_path: str) -> List[Dict[str, Any]]:
        """
        Parse a file and return a list of document chunks or nodes.
        Each dict should contain 'text' and 'metadata'.
        """
        pass

class LlamaParseParser(BaseParser):
    def __init__(self):
        self.settings = get_settings()
        if not self.settings.llama_cloud_api_key:
            raise ValueError("LLAMA_CLOUD_API_KEY is not set.")
        
        self.parser = LlamaParse(
            result_type="markdown",  # Markdown is better for structure preservation
            api_key=self.settings.llama_cloud_api_key,
            verbose=True
        )

    def parse(self, file_path: str) -> List[Dict[str, Any]]:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
            
        # LlamaParse returns a list of Document objects
        documents = self.parser.load_data(file_path)
        
        parsed_docs = []
        for doc in documents:
            parsed_docs.append({
                "text": doc.text,
                "metadata": {
                    "source": file_path,
                    "parser": "LlamaParse",
                    "extra_info": doc.extra_info
                }
            })
        return parsed_docs

class SimplePDFParser(BaseParser):
    """Fallback parser using basic extraction if LlamaParse is not available"""
    def parse(self, file_path: str) -> List[Dict[str, Any]]:
        # TODO: Implement basic PyPDF or Unstructured fallback
        raise NotImplementedError("SimplePDFParser not yet implemented")

def get_pdf_parser() -> BaseParser:
    settings = get_settings()
    if settings.llama_cloud_api_key:
        return LlamaParseParser()
    return SimplePDFParser()
