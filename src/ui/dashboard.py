import streamlit as st
import requests
import json
import os

# Configuration
API_URL = "http://localhost:8000"

st.set_page_config(page_title="Forensic Investment Analyst", page_icon="🕵️", layout="wide")

st.title("🕵️ Forensic Investment Analyst (FIA)")
st.markdown("### Evidence-Driven Due Diligence")

# Sidebar for Ingestion
with st.sidebar:
    st.header("📂 Ingestion")
    
    # URL Ingestion
    st.subheader("News / Signals")
    url_input = st.text_input("Ingest URL", placeholder="https://news.com/startup-layoffs")
    if st.button("Scrape URL"):
        with st.spinner("Scraping..."):
            try:
                res = requests.post(f"{API_URL}/ingest/url", json={"url": url_input, "silo": "execution"})
                if res.status_code == 200:
                    st.success(f"Ingested: {url_input}")
                else:
                    st.error(f"Error: {res.text}")
            except Exception as e:
                st.error(f"Connection Error: {e}")

    st.markdown("---")

    # File Ingestion
    st.subheader("Documents")
    uploaded_file = st.file_uploader("Upload Pitch Deck or Financials", type=['pdf', 'csv', 'xlsx'])
    silo_choice = st.selectbox("Select Silo", ["intent", "execution", "constraint"])
    
    if st.button("Upload File") and uploaded_file:
        with st.spinner("Parsing & Indexing..."):
            try:
                files = {"file": (uploaded_file.name, uploaded_file, uploaded_file.type)}
                res = requests.post(f"{API_URL}/ingest/upload", params={"silo": silo_choice}, files=files)
                if res.status_code == 200:
                    st.success(f"Processed: {uploaded_file.name}")
                else:
                    st.error(f"Error: {res.text}")
            except Exception as e:
                st.error(f"Upload Error: {e}")

# Main Area: Query
st.header("🔍 Forensic Inquiry")

col1, col2 = st.columns([3, 1])
with col1:
    query = st.text_area("Ask a forensic question", placeholder="Does the founder's growth claim match recent hiring trends?", height=100)
with col2:
    deep_analysis = st.checkbox("Deep Forensic Analysis", value=True, help="Enable LLM-based contradiction detection")
    st.write("")
    st.write("")
    query_btn = st.button("Run Investigation", type="primary", use_container_width=True)

if query_btn and query:
    with st.spinner("Analyzing Evidence Silos..."):
        try:
            payload = {"question": query, "deep_analysis": deep_analysis}
            res = requests.post(f"{API_URL}/query", json=payload)
            
            if res.status_code == 200:
                data = res.json()
                
                # 1. Decomposition
                with st.expander("🧩 Query Decomposition", expanded=True):
                    dc = data.get("query_decomposition", {})
                    st.markdown(f"**Intent:** `{dc.get('intent_query')}`")
                    st.markdown(f"**Execution:** `{dc.get('execution_query')}`")
                    st.markdown(f"**Constraint:** `{dc.get('constraint_query')}`")
                
                # 2. Forensic Analysis (The Arbitrator)
                if data.get("forensic_analysis"):
                    st.subheader("⚖️ The Arbitrator's Verdict")
                    for analysis in data["forensic_analysis"]:
                        # Handle if analysis is a string or dict
                        if isinstance(analysis, str):
                            try:
                                analysis = json.loads(analysis)
                            except:
                                st.warning("Raw output (parsing failed): " + str(analysis))
                                continue
                                
                        status = analysis.get("status", "UNKNOWN")
                        color = "green" if status == "AGREEMENT" else "red" if status == "CONTRADICTION" else "orange"
                        
                        st.markdown(f":{color}[**{status}**] (Score: {analysis.get('score', 'N/A')}/10)")
                        st.info(analysis.get("explanation", "No explanation provided."))

                # 3. Evidence Locker
                st.subheader("🗄️ Evidence Locker")
                evidence = data.get("evidence", {})
                
                tabs = st.tabs(["Intent (Claims)", "Execution (Reality)", "Constraints (Legal)"])
                
                with tabs[0]:
                    if evidence.get('intent'):
                        for doc in evidence['intent']:
                            with st.container(border=True):
                                st.markdown(doc['text'][:500] + "...")
                                st.caption(f"Source: {doc['metadata'].get('source')} | Distance: {doc.get('distance', 'N/A')}")
                    else:
                        st.write("No Intent evidence found.")
                        
                with tabs[1]:
                    if evidence.get('execution'):
                        for doc in evidence['execution']:
                            with st.container(border=True):
                                st.markdown(doc['text'][:500] + "...")
                                st.caption(f"Source: {doc['metadata'].get('source')}")
                    else:
                        st.write("No Execution evidence found.")

                with tabs[2]:
                    if evidence.get('constraint'):
                        for doc in evidence['constraint']:
                            with st.container(border=True):
                                st.markdown(doc['text'][:500] + "...")
                                st.caption(f"Source: {doc['metadata'].get('source')}")
                    else:
                        st.write("No Constraint evidence found.")

            else:
                st.error(f"API Error: {res.text}")
                
        except Exception as e:
            st.error(f"Execution Error: {e}")
