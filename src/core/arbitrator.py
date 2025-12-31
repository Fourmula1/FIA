from typing import List, Dict, Any
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from src.config import get_settings

class Arbitrator:
    def __init__(self):
        self.settings = get_settings()
        self.llm = ChatOpenAI(
            api_key=self.settings.openai_api_key, 
            model="gpt-4o"  # Better reasoning capabilities
        )
        
        self.contradiction_prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Forensic Auditor. Your job is to detect contradictions between a Founder's Claim (Intent) and External Reality (Execution)."),
            ("user", """
            COMPARE THESE TWO PIECES OF EVIDENCE:
            
            CLAIM (Intent): "{intent}"
            EVIDENCE (Execution): "{execution}"
            
            Task:
            1. Determine if they contradict, agree, or are unrelated.
            2. If they contradict, explain the Narrative Drift.
            3. Assign a 'Conflict Score' from 0 (Perfect Agreement) to 10 (Direct Contradiction).
            
            Return ONLY a JSON with keys: status (AGREEMENT/CONTRADICTION/UNRELATED), explanation, score.
            """)
        ])
        
        self.chain = self.contradiction_prompt | self.llm | StrOutputParser()

    def arbitrate(self, intent_evidence: str, execution_evidence: str) -> Dict[str, Any]:
        """
        Compare a single piece of intent evidence against execution evidence.
        """
        try:
            result = self.chain.invoke({
                "intent": intent_evidence,
                "execution": execution_evidence
            })
            # In a real impl, we'd parse the JSON string properly
            return result 
        except Exception as e:
            return {"error": str(e)}

    def batch_arbitrate(self, intent_docs: List[str], execution_docs: List[str]) -> List[Dict[str, Any]]:
        """
        Compare top claims against top execution signals.
        """
        results = []
        # Simplified N*M comparison
        for intent in intent_docs:
            for execution in execution_docs:
                analyses = self.arbitrate(intent, execution)
                results.append({
                    "intent": intent,
                    "execution": execution,
                    "analysis": analyses
                })
        return results
