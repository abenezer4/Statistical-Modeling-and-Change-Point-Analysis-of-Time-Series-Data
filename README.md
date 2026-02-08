# Brent Oil Price Change Point Analysis

## 📌 Project Overview
This project analyzes historical Brent Oil prices (1987-2022) to identify significant "regime shifts" using **Bayesian Change Point Detection**. By correlating these statistical structural breaks with major geopolitical events (OPEC decisions, conflicts, economic crises), we aim to provide actionable insights for investors and policymakers at **Birhan Energies**.

## 🚀 Key Features
*   **Bayesian Modeling:** Uses `PyMC` to detect structural breaks probabilistically.
*   **EDA & Statistics:** Includes Augmented Dickey-Fuller (ADF) tests for stationarity.
*   **Event Attribution:** Maps detected changes to a curated dataset of 15+ major oil market events.
*   **Reproducible Workflow:** Modular code structure with type hinting and logging.

## 📂 Project Structure
```text
brent-oil-dashboard/
├── data/
│   ├── raw/                  # Original BrentOilPrices.csv
│   └── processed/            # Cleaned events data (oil_price_events.csv)
├── notebooks/                # Jupyter Notebooks for analysis
├── src/                      # Source code modules
│   ├── data_loader.py        # Data ingestion and cleaning
│   └── plot_utils.py         # Visualization functions
├── reports/                  # Interim PDF/Markdown reports
└── requirements.txt          # Python dependencies