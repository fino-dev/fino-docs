---
id: start
title: Get Started
displayed_sidebar: getting_started_sidebar
---

# Getting Started with fino

**fino** is an open-source library that helps you collect high-quality financial data  
*directly from official disclosure sources* and load it into Python — reproducibly and transparently.

This guide shows how to:
- fetch real disclosure data
- and load it as a DataFrame

in just a few minutes.

---

## What is “Disclosure Data”? (30 seconds)

Public companies are legally required to disclose financial information.

Examples include:
- annual reports (10-K, 有価証券報告書)
- quarterly reports (10-Q, 決算短信)
- timely disclosures (8-K, 適時開示)

These documents are:
- **official**
- **free**
- **publicly available**

…but surprisingly hard to use.

---

## Why Is It Hard to Use Disclosure Data?

If you try to use disclosure data *directly*, you usually need to:

- find the correct filing system (SEC EDGAR, EDINET, etc.)
- deal with different identifiers (ticker, CIK, security code)
- download XBRL / HTML / ZIP files
- understand different taxonomies
- normalize dates, currencies, and labels
- track corrections and re-filings

Most individual investors give up here  
—or rely on opaque third-party aggregators.

**fino removes this friction.**

---

## Installation

```bash
pip install fino
```

No API keys are required for public disclosure data.

:::info
Some of Disclosures require Registoration or API KEYS. It depending on the Disclosure Services you want to use

Listed [here](/docs/docs/disclosure/disclosure.md) to describe what Disclosure is adopted by fino and what type of resoures is provided
:::

⸻

Your First Data Pull (Less Than 1 Minute)

Let’s fetch an official annual report and load it as a DataFrame.

Example: Apple’s 10-K (SEC EDGAR)

```python
import fino

# Fetch Apple's latest annual filing from the SEC
filing = fino.sec.get_filing(
    symbol="AAPL",
    form="10-K",
    latest=True,
    disclosure=fino.filing.DisclosureType.EDGER
)

# Extract financial statements
financials = filing.extract_financials()

# Convert to pandas DataFrame
df = financials.income_statement

print(df.head())
```

That’s it.

You are now working with official financial data filed by Apple to the SEC.

⸻

***What Just Happened?***

Behind the scenes:
	1.	Connected to SEC EDGAR (the official U.S. disclosure system)
	2.	Resolved Apple’s identifier (CIK)
	3.	Downloaded the original filing data (XBRL)
	4.	Parsed and normalized the financial statements
	5.	Returned a clean, structured DataFrame

All without:
	•	scraping random websites
	•	trusting unknown aggregators
	•	manual preprocessing

⸻

Another Example: Japanese Disclosure (EDINET)

The same idea works across markets.

```python
import fino

# Fetch Toyota's earnings report (決算短信)
filing = fino.edinet.get_filing(
    code="7203",  # Toyota
    form="決算短信",
    fiscal_year=2023,
    disclosure=fino.filing.DisclosureType.EDINET
)

financials = filing.extract_financials()
df = financials.income_statement

print(df.head())
```

Different country.
Different language.
Different taxonomy.

Same Python workflow.

⸻

Why This Matters

With fino:
	•	You know where the data comes from
	•	You know when it was disclosed
	•	You can reproduce the same dataset later
	•	You are not locked into any platform or vendor

This dramatically reduces the information gap between
large organizations and individual investors.

⸻

What fino Focuses On (and What It Doesn’t)

✅ fino focuses on:
	•	collecting data from official disclosure sources
	•	normalizing financial-specific concepts (time, identifiers, currency)
	•	preserving lineage and reproducibility
	•	giving you clean data for analysis

❌ fino does NOT:
	•	tell you how to invest
	•	provide trading strategies
	•	replace pandas, Polars, or analytical libraries
	•	enforce how you store or analyze data

fino stops exactly where analysis begins.

⸻

Using the Data for Analysis

Once you have a DataFrame, use any tools you like.

```python
import pandas as pd

df["profit_margin"] = df["net_income"] / df["revenue"]
print(df[["revenue", "net_income", "profit_margin"]].head())
```

fino works with the Python data ecosystem — not instead of it.

⸻

What’s Next?
	•	Learn more about SEC EDGAR￼
	•	Explore Japanese disclosure data (EDINET)￼
	•	See how fino tracks corrections and re-filings
	•	Build your own data collection workflows

⸻

Summary

fino helps you start analysis from the same quality of data
that institutions use — using only Python.

No scraping.
No black boxes.
No guesswork.

Just disclosure data, as it was actually published.