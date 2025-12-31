from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
import os
import shutil

from src.ingestion.pdf_parser import get_pdf_parser
from src.ingestion.finance_parser import FinancialParser
from src.ingestion.news_scraper import NewsScraper
from src.indexing.silo_manager import SiloManager
from src.retrieval.query_router import QueryRouter
from src.retrieval.hybrid_retriever import HybridRetriever
from src.core.arbitrator import Arbitrator
from src.core.scoring import TruthScorer

app = FastAPI(title="Forensic Investment Analyst (FIA)")

# Initialize Components
silo_manager = SiloManager()
query_router = QueryRouter()
hybrid_retriever = HybridRetriever()
arbitrator = Arbitrator()
scorer = TruthScorer()

class QueryRequest(BaseModel):
    question: str
    deep_analysis: bool = False

class IngestUrlRequest(BaseModel):
    url: str
    silo: str = "execution"

@app.post("/ingest/upload")
async def ingest_file(file: UploadFile = File(...), silo: str = "intent"):
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Determine parser
        if file.filename.endswith(".pdf"):
            parser = get_pdf_parser()
        elif file.filename.endswith((".xlsx", ".xls", ".csv")):
            parser = FinancialParser()
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
            
        docs = parser.parse(temp_file)
        
        # Add to Silo
        for doc in docs:
            silo_manager.add_document(silo, doc['text'], doc['metadata'])
            
        return {"status": "success", "processed_docs": len(docs), "silo": silo}
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

@app.post("/ingest/url")
async def ingest_url(request: IngestUrlRequest):
    scraper = NewsScraper()
    docs = scraper.scrape(request.url)
    if not docs:
        raise HTTPException(status_code=400, detail="Failed to scrape URL")
        
    for doc in docs:
        silo_manager.add_document(request.silo, doc['text'], doc['metadata'])
        
    return {"status": "success", "processed_docs": len(docs), "silo": request.silo}

@app.post("/query")
async def query_forensic(request: QueryRequest):
    # 1. Route Query
    sub_queries = query_router.route_query(request.question)
    
    # 2. Retrieve from Silos
    evidence = {}
    evidence['intent'] = hybrid_retriever.retrieve(sub_queries['intent_query'], silos=['intent'])['intent']
    evidence['execution'] = hybrid_retriever.retrieve(sub_queries['execution_query'], silos=['execution'])['execution']
    evidence['constraint'] = hybrid_retriever.retrieve(sub_queries['constraint_query'], silos=['constraint'])['constraint']
    
    # 3. Detect Contradictions (Arbitrator)
    forensic_analysis = []
    if request.deep_analysis and evidence['intent'] and evidence['execution']:
        # Compare top intent claim with top execution signal
        top_intent = evidence['intent'][0]['text']
        top_exec = evidence['execution'][0]['text']
        analysis = arbitrator.arbitrate(top_intent, top_exec)
        forensic_analysis.append(analysis)

    return {
        "query_decomposition": sub_queries,
        "evidence": evidence,
        "forensic_analysis": forensic_analysis
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
