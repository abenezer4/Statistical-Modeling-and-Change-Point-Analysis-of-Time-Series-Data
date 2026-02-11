## 📌 Project Overview
**Birhan Energies**, a leading consultancy firm, requires deeper insights into the volatility of the global energy market. This project moves beyond simple trend analysis to identify **Structural Breaks** (Regime Shifts) in Brent Oil prices from 1987 to 2022.

Using **Bayesian Change Point Detection (CPD)**, we statistically determine *when* market conditions fundamentally changed (e.g., from a stable "Bull Market" to a volatile "Crash"). These insights are delivered via an interactive **React Dashboard** for investors and policymakers.

## 🚀 Key Features
1.  **Bayesian Inference:** Uses `PyMC` and MCMC sampling to detect change points with probabilistic uncertainty.
2.  **Statistical Rigor:** Includes stationarity testing (ADF Test) and log-return transformation.
3.  **Event Association:** Correlates detected breaks with a curated dataset of geopolitical events (OPEC decisions, Wars, Crises).
4.  **Full-Stack Dashboard:**
    *   **Backend:** Flask API to serve analysis results.
    *   **Frontend:** React + Recharts for interactive visualization of regimes.

## 📂 Project Structure
```text
brent-oil-dashboard/
├── backend/                  # Flask API
│   └── app.py                # Serves JSON results to frontend
├── frontend/                 # React Application
│   ├── src/                  # React Components & Recharts logic
│   └── package.json          # Frontend dependencies
├── data/
│   ├── raw/                  # Original 'BrentOilPrices.csv'
│   └── processed/            # 'oil_price_events.csv' & 'analysis_results.json'
├── notebooks/                # Jupyter Notebooks for EDA & Bayesian Modeling
├── src/                      # Python Source Code
│   ├── data_loader.py        # Data ingestion & cleaning
│   └── plot_utils.py         # Matplotlib visualization functions
├── reports/                  # PDF/Markdown Reports
└── requirements.txt          # Python dependencies
```

---

## 🛠️ Installation & Setup

### Prerequisite
*   **Python 3.10+** (Conda recommended for PyMC)
*   **Node.js & npm** (For the Dashboard)

### 1. Environment Setup (Python)
Clone the repo and create the environment:
```bash
git clone https://github.com/YourUsername/brent-oil-dashboard.git
cd brent-oil-dashboard

# Option A: Conda (Recommended for PyMC)
conda create -n oil_env python=3.10
conda activate oil_env
conda install -c conda-forge pymc arviz pandas matplotlib seaborn flask flask-cors

# Option B: Pip
pip install -r requirements.txt
```

### 2. Dashboard Setup (React)
Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

---

## 🖥️ Usage Guide

This project consists of two parts: the **Analysis (Notebook)** and the **Visualization (Dashboard)**.

### Step 1: Run the Analysis
Run the Jupyter Notebook to process the data, perform MCMC sampling, and export the results to JSON.
```bash
# From root directory
jupyter lab notebooks/1_eda_and_changepoint.ipynb
```
*   *Output:* Generates `data/processed/analysis_results.json`.

### Step 2: Start the Backend API
This serves the generated JSON data to the frontend.
```bash
# Open a new terminal
cd backend
python app.py
```
*   *Status:* Running on `http://localhost:5000`

### Step 3: Launch the Dashboard
Visualize the results interactively.
```bash
# Open a new terminal
cd frontend
npm start
```
*   *Status:* Opens in browser at `http://localhost:3000`

---

## 📊 Key Findings (Sample)
*   **Detected Change Point:** November 13, 2014
*   **Context:** Preceded the November 2014 OPEC meeting where production cuts were blocked.
*   **Quantitative Impact:**
    *   **Pre-Event Mean:** ~$103.49 / barrel
    *   **Post-Event Mean:** ~$54.01 / barrel
    *   **Value Destruction:** -47.8%

## 📝 Data Sources
*   **Brent Oil Prices:** Historical daily closing prices (1987-2022).
*   **Event Data:** Curated list of major geopolitical events (Gulf War, 2008 Crisis, COVID-19, etc.).

## 🤝 Contributors
*   **[Your Name]** - Data Scientist, Birhan Energies

