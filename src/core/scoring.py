from typing import Dict, Any
from datetime import datetime
import re

class TruthScorer:
    # Source Weights (0.0 to 1.0)
    SOURCE_WEIGHTS = {
        "regulatory": 1.0,  # Government/Compliance docs
        "filing": 0.9,      # Formal filings (MCA, SEBI)
        "pitch_deck": 0.6,  # Founder claims (biased)
        "company_report": 0.7, 
        "news_reputable": 0.8, # Top tier news
        "news_blog": 0.5,
        "twitter": 0.3,
        "linkedin": 0.4
    }

    def calculate_score(self, evidence_metadata: Dict[str, Any]) -> float:
        base_score = self._get_source_authority(evidence_metadata.get("source", ""))
        recency_penalty = self._calculate_recency_penalty(evidence_metadata.get("date"))
        
        final_score = base_score * recency_penalty
        return round(final_score, 2)

    def _get_source_authority(self, source_name: str) -> float:
        # Simple keyword matching for now
        source_lower = source_name.lower()
        if "mca" in source_lower or "sebi" in source_lower:
            return self.SOURCE_WEIGHTS["regulatory"]
        if ".gov" in source_lower:
            return self.SOURCE_WEIGHTS["regulatory"]
        if "pitch" in source_lower or "deck" in source_lower:
            return self.SOURCE_WEIGHTS["pitch_deck"]
        if "twitter" in source_lower or "x.com" in source_lower:
            return self.SOURCE_WEIGHTS["twitter"]
        
        # Default fallback
        return 0.5

    def _calculate_recency_penalty(self, date_str: str | None) -> float:
        if not date_str:
            return 1.0 # Assume current if unknown, or maybe penalize? Let's assume neutral.
        
        try:
            # Try parsing typical formats
            # This is a placeholder for robust date parsing
            # For now, let's assume no penalty if parsing fails
            return 1.0 
        except:
            return 1.0
