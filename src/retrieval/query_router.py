from typing import Dict, List
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from src.config import get_settings
from pydantic import BaseModel, Field

class DecomposedQuery(BaseModel):
    intent_query: str = Field(description="Query focusing on founder claims, pitch decks, and internal plans")
    execution_query: str = Field(description="Query focusing on market reality, hiring, news, and product delivery")
    constraint_query: str = Field(description="Query focusing on legal, regulatory, and compliance risks")

# Initializing with a simpler model for routing might be enough
class QueryRouter:
    def __init__(self):
        self.settings = get_settings()
        self.llm = ChatOpenAI(api_key=self.settings.openai_api_key, model="gpt-4o")
        
        self.parser = JsonOutputParser(pydantic_object=DecomposedQuery)
        
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Query Router for a forensic analysis system. Decompose the user's question into 3 distinct search queries for different evidence silos.\n{format_instructions}"),
            ("user", "User Question: {question}")
        ]).partial(format_instructions=self.parser.get_format_instructions())
        
        self.chain = self.prompt | self.llm | self.parser

    def route_query(self, question: str) -> Dict[str, str]:
        """
        Returns a dictionary with keys: intent_query, execution_query, constraint_query
        """
        try:
            return self.chain.invoke({"question": question})
        except Exception as e:
            # Fallback if LLM fails
            print(f"Routing failed: {e}. using direct query.")
            return {
                "intent_query": question,
                "execution_query": question,
                "constraint_query": question
            }
