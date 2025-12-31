# 📍 Roadmap — The Forensic Investment Analyst (FIA)

This roadmap outlines the phased development of **The Forensic Investment Analyst (FIA)** — a forensic-grade Retrieval-Augmented Generation (RAG) system designed to transform fragmented startup narratives into auditable, evidence-backed investment intelligence.

The roadmap prioritizes **grounding, provenance, conflict detection, and evaluation rigor**, ensuring the system is not just intelligent, but *trustworthy*.

---

## Phase 0 — Problem Formalization & System Blueprint

**Objective:** Translate the abstract problem of narrative drift into concrete system requirements.

This phase establishes FIA’s philosophical and technical foundation. We formally define *narrative drift*, *authority*, *recency*, and *conflict* in computational terms. Clear boundaries are drawn between claims, evidence, and constraints to avoid traditional RAG hallucination patterns.

Key outcomes include:

* Formal definition of *Triple-Path Retrieval* (Intent, Execution, Constraint).
* Decision on evidence granularity (chunk size, metadata schema).
* Definition of what constitutes a **Narrative Conflict** using NLI semantics.
* Finalization of evaluation criteria beyond standard RAG metrics.

**Deliverables**

* System design document
* Metadata schema specification
* Conflict taxonomy (claim vs execution vs constraint)

---

## Phase 1 — Data Ingestion & Evidence Refinery

**Objective:** Build a high-fidelity ingestion pipeline that treats data as *evidence*, not text.

This phase focuses on ingesting heterogeneous, real-world startup data while preserving structure, timestamps, and authority. Emphasis is placed on **layout-aware parsing** and **lossless metadata retention** to ensure auditability downstream.

Key components include:

* Multi-source ingestion (PDFs, web pages, repositories, news).
* Structured chunking that preserves tables, charts, and section semantics.
* Authority scoring at ingestion time rather than generation time.

**Deliverables**

* Ingestion pipeline scripts
* Unified document schema
* Authority & timestamp enrichment module
* Raw → processed data lineage logs

---

## Phase 2 — Hybrid Indexing: Vector + Knowledge Graph

**Objective:** Enable both semantic reasoning and structural verification.

This phase introduces dual representations of knowledge:

1. **Vector embeddings** for semantic similarity and intent matching.
2. **Knowledge graph** for hard entity relationships and factual grounding.

The knowledge graph becomes the backbone for:

* Founder ↔ Startup ↔ Investor relationships
* Temporal evolution of claims
* Cross-source verification

**Deliverables**

* Vector database with enriched embeddings
* Knowledge graph schema and population scripts
* Entity resolution and de-duplication logic
* Graph-based query utilities

---

## Phase 3 — Triple-Path Retrieval Engine

**Objective:** Retrieve *contradictory perspectives by design*.

Instead of a single retrieval step, FIA executes three parallel retrieval paths:

* **Intent Path:** Internal narratives and founder claims.
* **Execution Path:** Observable external execution signals.
* **Constraint Path:** Market, policy, and competitive realities.

This architectural separation ensures that contradictions are *exposed*, not averaged away.

**Deliverables**

* Parallel retrieval orchestration logic
* Path-specific retrievers and filters
* Authority-aware re-ranking mechanism
* Retrieval trace logs for explainability

---

## Phase 4 — Arbitration & Conflict Detection Layer

**Objective:** Detect, quantify, and explain narrative conflicts.

This phase introduces the forensic core of FIA. Retrieved snippets are compared using **Natural Language Inference (NLI)** to detect contradictions, entailments, or neutral relationships.

Conflicts are not resolved heuristically but scored using:

* Source authority
* Temporal recency
* Cross-path consistency

The system produces *structured conflict objects* rather than vague warnings.

**Deliverables**

* NLI-based conflict detection module
* Weighted Truth Scoring implementation
* Conflict explanation generator
* Machine-readable conflict reports

---

## Phase 5 — Grounded Response Generation

**Objective:** Generate answers that behave like audit reports, not chat replies.

Responses are synthesized only from verified snippets, with **strict provenance enforcement**. Every generated claim is traceable to its source, timestamp, and authority score.

The generation layer is explicitly constrained to:

* Avoid speculative synthesis
* Preserve conflicting viewpoints
* Highlight uncertainty where evidence diverges

**Deliverables**

* Grounded generation prompts
* Inline citation rendering
* Claim-to-evidence mapping
* Answer confidence scoring

---

## Phase 6 — Forensic Dashboard & User Experience

**Objective:** Make contradictions visible, not hidden.

This phase focuses on interpretability and trust. The interface is designed to *invite scrutiny*, allowing users to inspect evidence rather than blindly trust outputs.

Core UI concepts include:

* Claim-centric insights
* Side-by-side evidence comparison
* Visual trust and drift indicators

**Deliverables**

* Interactive forensic dashboard
* Evidence inspection panels
* Narrative Drift Meter visualization
* Exportable audit summaries

---

## Phase 7 — Evaluation, Validation & Stress Testing

**Objective:** Prove that FIA is measurably better than standard RAG.

Beyond standard RAG evaluation, FIA is tested for its ability to:

* Detect real-world contradictions
* Maintain provenance under adversarial prompts
* Resist hallucinations in sparse data scenarios

Both quantitative and qualitative evaluations are conducted.

**Deliverables**

* RAG Triad evaluation results
* Conflict Recall benchmarks
* Strict Provenance audit
* Ablation studies (with/without arbitration)

---

## Phase 8 — Optimization, Hardening & Scalability

**Objective:** Prepare FIA for production and research extension.

This phase focuses on performance optimization, cost control, and architectural robustness. It also prepares the system for future extensions such as multimodal evidence and predictive risk modeling.

**Deliverables**

* Latency and cost optimization reports
* Caching and retrieval optimizations
* Modular deployment setup
* Research extension roadmap

---

## Phase 9 — Final Deliverables & Submission Packaging

**Objective:** Present FIA as a complete, credible system.

This final phase consolidates all work into a polished submission suitable for hackathons, conferences, or investor demos.

**Deliverables**

* Clean GitHub repository
* High-resolution architecture diagram
* Demo video showcasing conflict detection
* Evaluation and methodology report

---