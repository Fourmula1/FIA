import pandas as pd
from typing import List, Dict, Any
import os
from .pdf_parser import BaseParser

class FinancialParser(BaseParser):
    def parse(self, file_path: str) -> List[Dict[str, Any]]:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        ext = os.path.splitext(file_path)[1].lower()
        
        try:
            if ext == '.csv':
                df = pd.read_csv(file_path)
            elif ext in ['.xls', '.xlsx']:
                df = pd.read_excel(file_path)
            else:
                raise ValueError(f"Unsupported file format for financials: {ext}")
        except Exception as e:
            raise ValueError(f"Failed to read financial file: {e}")

        # Convert dataframe to a string representation (markdown table format is good for LLMs)
        text_representation = df.to_markdown(index=False)
        
        return [{
            "text": f"Financial Table from {os.path.basename(file_path)}:\n\n{text_representation}",
            "metadata": {
                "source": file_path,
                "parser": "FinancialParser",
                "rows": len(df),
                "columns": list(df.columns)
            }
        }]
