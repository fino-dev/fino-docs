---
id: getting-started
title: About fino
displayed_sidebar: getting_started_sidebar
---

<span className="orange">**fino**</span> is a ***Python-based open-source project*** for individuals who are interested in investing, financial data analysis, and data management.

The goal of this project is to provide a practical and extensible foundation for working with financial information *~ including Tickers, Market data, News and Events etc.. ~* in a way that is transparent, flexible, and **developer-friendly.**

Many existing financial tools and platforms are either closed, expensive, or tightly coupled to proprietary ecosystems. But fino is not.

## Problems of Analyzing Financial Data

When working with financial data, you often face technical difficulties such as:

- **<span className="smooth-red">Data Collection</span>** - collecting data in various formats from multiple sources using different methods, and parsing it for storage by building batches or pipelines
- **<span className="smooth-red">Data Management</span>** - storing large-scale data and transforming it into meaningful, structured forms that support efficient querying for analysis
- **<span className="smooth-red">Data Analysis</span>** - processing, exploring, and visualizing data to extract insights, trends, and actionable knowledge

fino will help you address these concerns.

:::warning
⚠️ Most fino packages are currently under development. Implementations are evolving.
:::

## Packages

### <span className="orange">fino-ingestor </span>

**fino-ingestor** focuses on the **Data Collection** layer.

Its purpose is to provide a structured and extensible way to:

- Retrieve disclosure documents from sources such as EDINET and EDGAR
- Manage and store document files correctly
- Ingest various data to Data Lakehouse Storage, which is the next layer

More packages covering data management and analysis will be added as the project evolves.