---
id: getting-started
title: About fino
displayed_sidebar: getting_started_sidebar
---


## What is fino?

fino is an open-source Python library built on a simple philosophy:

> **Get data from original sources. Transform it once. Use it everywhere.**

We believe financial data should come directly from regulatory sources—not aggregators, not third-party APIs, but the actual disclosure systems that companies are legally required to use:

- 🇺🇸 **SEC EDGAR** for U.S. companies (10-K, 10-Q, 8-K filings)
- 🇯🇵 **EDINET** for Japanese companies
- 🇪🇺 **National disclosure systems** for European companies
- 📊 **Exchange APIs** for market data

### Why Original Sources?

**The Problem with Aggregators:**
- Data modified from original format
- Potential errors in transformation
- Vendor lock-in and high costs
- Inconsistent data quality

**fino exists to close this gap.**

**The fino Philosophy:**
- ✅ **Transparency**: Know exactly where your data comes from
- ✅ **Reliability**: Get data as companies filed it
- ✅ **Control**: Transform data according to your needs
- ✅ **Cost**: Original sources are often free or low-cost




---

## What fino Does

fino provides a technology-native solution for high-quality financial data acquisition.

It focuses on:

- **Automated data collection** from public financial sources
- **Normalization** of financial-specific concepts (time, identifiers, currency, markets)
- **Validation and quality checks** to prevent silent data corruption
- **Lineage and reproducibility**, so users can trace where data came from and when
- **Composable outputs**, allowing users to export data in formats they prefer

fino intentionally stays upstream of analysis and storage decisions.

---

## What fino Does NOT Do

To remain flexible and widely usable, fino does **not**:

- Enforce a specific data storage format or architecture
- Dictate how users analyze or model financial data
- Provide trading, execution, or investment advice
- Act as a black-box data provider

fino provides **capabilities**, not opinions about investment decisions.

---

## Design Philosophy

fino is built on the following principles:

- **Source-first**: Data acquisition starts from real-world financial sources
- **Reproducibility as a feature**: Every dataset should be traceable and explainable
- **Quality over convenience**: Correct data matters more than fast shortcuts
- **Non-intrusive downstream**: Storage and analysis are user-controlled
- **Transparency by default**: No hidden transformations or opaque logic

---

## The Goal of fino

fino does not aim to make everyone a better trader.

Its goal is simpler and more fundamental:

> **To ensure that individuals and organizations start from the same quality of information.**

What users build on top of that information is intentionally left to them.

---

## Open by Design

fino is open-source and community-driven.

New data sources, markets, and improvements are expected to come from contributors around the world.

If financial data should be open, reproducible, and explainable,  
fino aims to be the foundation that makes it possible.