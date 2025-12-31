# Forensic Investment Analyst (FIA) 🕵️‍♂️📊
**Production-grade Multilingual RAG for Startup Intelligence**

## 🚀 Overview
FIA is a "Forensic" RAG system designed for the Investment ecosystem. It resolves "Narrative Drift" by cross-referencing fragmented startup data across three silos: Intent, Execution, and Policy.

## 🛠️ Tech Stack
- **Orchestration:** LangChain / LlamaIndex
- **LLM:** Google Gemini 1.5 Pro (High Context & Multilingual)
- **Vector DB:** Pinecone (with metadata filtering)
- **Arbitration:** NLI-RoBERTa (for contradiction detection)
- **Frontend:** Streamlit / React

## 📂 Project Structure
- `/data`: Sample fragmented PDFs, News Scrapes, and Policy Docs.
- `/src/engine`: The Triple-Path Retrieval logic.
- `/src/arbitrator`: NLI-based conflict detection scripts.
- `/src/ui`: Multilingual dashboard code.

## ⚙️ Setup & Usage
1. Clone the repo: `git clone https://github.com/your-repo/FIA`
2. Install dependencies: `pip install -r requirements.txt`
3. Set Environment Variables: `GOOGLE_API_KEY`, `PINECONE_API_KEY`
4. Run the Ingestion Pipeline: `python ingest.py`
5. Start the FIA Dashboard: `streamlit run app.py`

## 📊 Evaluation
We use the **RAGas Framework** to measure:
- **Faithfulness:** > 95%
- **Conflict Recall:** > 85%
- **Indic Relevancy:** Measured via custom translation-accuracy scripts.
