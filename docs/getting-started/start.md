---
id: start
title: Get Started
displayed_sidebar: getting_started_sidebar
---
# Getting Started with fino

Welcome to fino! This guide will help you start managing financial data **from original sources** in less than 5 minutes.


## Installation

```bash
pip install fino
```

That's it! No API keys needed to get started with public data sources.

---

## Your First Data Pull: SEC EDGAR (30 seconds)

```python
import fino

# Get Apple's latest 10-K filing from SEC EDGAR
filing = fino.sec.get_filing("AAPL", form="10-K", latest=True)

# Extract financial statements
financials = filing.extract_financials()
print(financials.income_statement)
print(financials.balance_sheet)
print(financials.cash_flow)
```

**What happened behind the scenes:**
1. fino queried SEC EDGAR's official API at `https://data.sec.gov`
2. Located Apple's latest 10-K filing using their CIK (Central Index Key)
3. Downloaded the original XBRL data filed by Apple
4. Parsed and standardized the financial statements
5. Returned clean pandas DataFrames ready for analysis

🎉 **You just got official financial data directly from the SEC!**

---

## Understanding the Source-First Approach

### Example: Market Data from Official Exchanges

```python
import fino

# Get market data directly from exchange sources
# (Not from Yahoo Finance or other aggregators)

# U.S. market data
df = fino.market.get(
    symbol="AAPL",
    start="2020-01-01",
    source="sec_splits"  # Official corporate actions from SEC filings
)

# Japanese market data from TDnet
df = fino.market.get(
    symbol="7203",  # Toyota
    start="2020-01-01", 
    source="tdnet",
    market="jp"
)
```

**Why this matters:**
- Corporate actions (splits, dividends) come from official filings
- No reliance on third-party adjustments
- Full audit trail to original source

---

## The fino Workflow: Source → Transform → Analyze

fino handles the "Source" and "Transform" steps so you can focus on "Analyze":

### Step 1: Source - Get Original Data

```python
import fino

# Configure your data sources
sources = fino.SourceRegistry()

# U.S. companies: SEC EDGAR
sources.register("sec", fino.sources.SECEDGAR(
    user_agent="MyCompany research@mycompany.com"  # Required by SEC
))

# Japanese companies: TDnet
sources.register("tdnet", fino.sources.TDnet(
    # API key optional for basic access
))

# Now collect filings
apple_10k = sources.get("sec").filing("AAPL", form="10-K", year=2023)
toyota_kessan = sources.get("tdnet").filing("7203", form="決算短信", year=2023)
```

### Step 2: Transform - Standardize to Your Format

```python
from fino.transforms import FinancialStatementParser

# Parse SEC XBRL format
parser = FinancialStatementParser(format="xbrl")
apple_data = parser.parse(apple_10k)

# Parse Japanese XBRL format (different taxonomy)
parser = FinancialStatementParser(format="xbrl-jp")
toyota_data = parser.parse(toyota_kessan)

# Both are now in standardized format!
print(apple_data.revenue)   # Standardized field name
print(toyota_data.revenue)  # Same field name, different source
```

### Step 3: Analyze - Use Standard Tools

```python
import pandas as pd
import pandas_ta as ta

# Now use standard analysis tools
combined = pd.concat([apple_data.to_dataframe(), toyota_data.to_dataframe()])
combined['rsi'] = ta.rsi(combined['close'])
```

---

## Working with SEC EDGAR

The SEC provides free, comprehensive data. Here's how fino makes it easy:

### Basic Filing Retrieval

```python
import fino

# Get latest filing
filing = fino.sec.get_filing("AAPL", form="10-K", latest=True)

# Get specific year
filing = fino.sec.get_filing("AAPL", form="10-Q", year=2023, quarter=3)

# Get all filings of a type
filings = fino.sec.get_filings("AAPL", form="8-K", start="2023-01-01")

print(f"Found {len(filings)} 8-K filings")
for filing in filings:
    print(f"{filing.filing_date}: {filing.description}")
```

### Extracting Specific Sections

```python
# Extract Management Discussion & Analysis
filing = fino.sec.get_filing("AAPL", form="10-K", latest=True)
mda = filing.extract_section("7")  # Section 7 = MD&A

# Extract Risk Factors
risks = filing.extract_section("1A")  # Section 1A = Risk Factors

# Get full text
full_text = filing.full_text()
```

### Corporate Actions from SEC Filings

```python
# Get official corporate actions
actions = fino.sec.get_corporate_actions("AAPL", start="2010-01-01")

print(actions)
# Output:
#         date event_type  ratio  source
# 0 2014-06-09      split    7:1  SC 13G/A filing
# 1 2020-08-31      split    4:1  8-K filing
# ...

# These come directly from SEC filings, not third-party estimates!
```

---

## Working with TDnet (Japanese Market)

For Japanese market data, fino connects to TDnet (適時開示情報伝達システム):

```python
import fino

# Configure TDnet source
tdnet = fino.sources.TDnet(
    # Optional: API key for higher rate limits
    # api_key="your_tdnet_api_key"
)

# Get 決算短信 (earnings summary)
filing = tdnet.get_filing(
    code="7203",  # Toyota
    form="決算短信",
    fiscal_year=2023
)

# Extract financials from XBRL
financials = filing.extract_financials()

# Get timely disclosure (適時開示)
disclosures = tdnet.get_disclosures(
    code="7203",
    start="2023-01-01",
    end="2023-12-31"
)
```

**What's different about TDnet:**
- Uses XBRL with Japanese taxonomy (different from US GAAP)
- Disclosure timing follows Japanese market calendar
- fino handles the conversion to standard format

---

## Building Your Data Pipeline

fino is designed to be modular. You combine only the pieces you need:

```python
import fino

# Define what sources you care about
pipeline = fino.Pipeline()

# Add SEC filings
pipeline.add_source(
    fino.sources.SECEDGAR(user_agent="research@mycompany.com"),
    symbols=["AAPL", "GOOGL", "MSFT"],
    forms=["10-K", "10-Q"]
)

# Add Japanese market
pipeline.add_source(
    fino.sources.TDnet(),
    codes=["7203", "6758"],  # Toyota, Sony
    forms=["決算短信"]
)

# Define transformations
pipeline.add_transform(
    fino.transforms.StandardizeFinancials(),
    output_schema="common"  # Convert both to common schema
)

# Execute pipeline
pipeline.run(
    start="2023-01-01",
    storage="iceberg://my-warehouse"  # Optional: store results
)
```

---

## Understanding Data Quality from Original Sources

One of fino's core features is validating data **against the original source**:

```python
from fino.quality import SourceValidator

# Validate that your data matches the original filing
validator = SourceValidator()

# Check if local data matches SEC filing
report = validator.validate_against_source(
    local_data=your_dataframe,
    symbol="AAPL",
    filing_date="2023-09-30",
    source="sec"
)

if report.has_discrepancies():
    print("Found differences from original source:")
    for issue in report.discrepancies:
        print(f"  {issue.field}: {issue.local_value} vs {issue.source_value}")
```

---

## Where Data is Stored

fino gives you **full control** over where data goes:

### Default: Local Cache

```python
# Default behavior: local Parquet files
df = fino.sec.get_filing("AAPL", form="10-K")
# Cached in: ~/.fino/cache/sec/AAPL/10-K/2023.parquet
```

### Recommended: Open Table Formats

```python
# Store in Iceberg (recommended for production)
pipeline = fino.Pipeline(
    storage=fino.storage.Iceberg("local://my-warehouse")
)

# Or Delta Lake
pipeline = fino.Pipeline(
    storage=fino.storage.DeltaLake("s3://my-bucket/delta")
)
```

### Your Choice: Any Backend

```python
# You can use ANY storage you want
pipeline = fino.Pipeline(
    storage=fino.storage.PostgreSQL("postgresql://localhost/mydb")
)

# Or even custom storage
class MyCustomStorage(fino.storage.Backend):
    def write(self, data, **kwargs):
        # Your custom logic
        pass

pipeline = fino.Pipeline(storage=MyCustomStorage())
```

---

## Next Steps

Now that you understand fino's source-first philosophy, explore more:

### 📚 **Deep Dives**
- [SEC EDGAR Guide](./sources/sec-edgar.md) - Master all 150+ filing types
- [TDnet Guide](./sources/tdnet.md) - Japanese market data guide
- [Transform Pipeline](./guides/transform-pipeline.md) - Build custom transformations
- [Data Quality](./guides/data-quality.md) - Validate against sources

### 🔧 **Real-World Examples**
- [Multi-Market Portfolio](./examples/multi-market-portfolio.md) - Track US + Japan stocks
- [Financial Statement Analysis](./examples/financial-analysis.md) - Ratio analysis across markets
- [Corporate Action Tracking](./examples/corporate-actions.md) - Monitor splits, dividends, M&A
- [Regulatory Event Detection](./examples/event-detection.md) - Alert on 8-K filings

### 🚀 **Production Setup**
- [Scaling with Iceberg](./guides/iceberg-setup.md) - Handle millions of filings
- [CI/CD Integration](./guides/cicd.md) - Automate data pipelines
- [Rate Limit Management](./guides/rate-limits.md) - Respect SEC/TDnet limits

---

## Getting Help

- 📖 [Full Documentation](https://fino.readthedocs.io)
- 💬 [GitHub Discussions](https://github.com/fino-project/fino/discussions)
- 🐛 [Report Issues](https://github.com/fino-project/fino/issues)
- 💡 [Feature Requests](https://github.com/fino-project/fino/issues/new?template=feature_request.md)

---

## Philosophy in Practice

fino follows three principles:

### 1. **Original Sources First**
We connect to SEC EDGAR, TDnet, and other official systems—not aggregators.

**Example:** When you get Apple's revenue, it comes from the XBRL file Apple filed with the SEC, not a third-party database.

### 2. **Transparent Transformations**
Every transformation is explicit and auditable.

**Example:** You can trace exactly how fino converted SEC XBRL to your final DataFrame.

### 3. **User Control**
We provide tools, not constraints.

**Example:** fino works with Iceberg, Delta Lake, PostgreSQL, or anything else. Your choice.

---

## What fino Does (and Doesn't Do)

### ✅ **What fino Does**
- Fetch filings from SEC EDGAR, TDnet, and other official sources
- Parse XBRL, HTML, PDF from regulatory filings
- Standardize financial statements across different taxonomies
- Track corporate actions from official filings
- Validate data against original sources
- Handle symbol changes, delistings, M&A from official records

### ❌ **What fino Doesn't Do** (Use these great tools instead)
- **Technical indicators** → Use `pandas-ta`
- **Backtesting** → Use `backtesting.py` or `zipline`
- **Visualization** → Use `plotly` or `matplotlib`
- **General analysis** → Use `pandas`
- **Machine learning** → Use `scikit-learn` or `tensorflow`

fino is the **layer that gets you reliable source data**. After that, use whatever tools you prefer for analysis.

---

## Your First Real Analysis

Let's combine fino with standard tools:

```python
import fino
import pandas as pd
import pandas_ta as ta

# 1. Get data from original sources
filings = fino.sec.get_filings("AAPL", form="10-Q", start="2020-01-01")
financials = [f.extract_financials() for f in filings]

# 2. Build DataFrame
df = pd.DataFrame([
    {
        'date': f.filing_date,
        'revenue': f.income_statement['Revenue'],
        'net_income': f.income_statement['NetIncome'],
        'eps': f.income_statement['EPS']
    }
    for f in financials
])

# 3. Analyze with standard tools
df['revenue_growth'] = df['revenue'].pct_change()
df['profit_margin'] = df['net_income'] / df['revenue']

# 4. Visualize
import plotly.express as px
fig = px.line(df, x='date', y='revenue_growth', title='AAPL Revenue Growth')
fig.show()
```

**This is the fino way:**
- Source data from SEC EDGAR ✅
- Transform to analyzable format ✅
- Use standard Python tools for everything else ✅

---

Happy analyzing with **data you can trust**! 📈

**Remember:** With fino, you always know where your data came from, how it was transformed, and that it matches what the company actually filed.