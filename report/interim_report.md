# Interim Report: Brent Oil Price Change Point Analysis
**Date:** February 8, 2026
**Author:** [Your Name]

## 1. Data Analysis Workflow
Our approach follows a structured pipeline to transform raw data into decision-ready insights:

1.  **Data Ingestion:** Load historical Brent Oil prices (1987–2022) from CSV.
2.  **Preprocessing:** 
    *   Convert dates to datetime objects.
    *   Compute **Log Returns** ($ln(P_t) - ln(P_{t-1})$) to stabilize variance and approximate stationarity, which is essential for statistical modeling.
3.  **Exploratory Data Analysis (EDA):**
    *   Visual inspection of price trends and volatility clustering.
    *   **Stationarity Testing:** Apply the Augmented Dickey-Fuller (ADF) test to confirm if the time series properties (mean, variance) are constant over time.
4.  **Bayesian Modeling (PyMC):**
    *   Construct a Change Point Detection model assuming a Uniform prior for the change date ($\tau$).
    *   Model price behavior using Normal distributions for distinct regimes (Before/After).
    *   Use Markov Chain Monte Carlo (MCMC) to sample posterior distributions.
5.  **Insight Generation:**
    *   Identify the most probable date of structural change.
    *   Quantify the shift in mean price and volatility.
    *   **Event Attribution:** Correlate detected dates with the "Key Events" dataset to infer potential geopolitical drivers.

## 2. Assumptions and Limitations
*   **Correlation vs. Causation:** The model detects *temporal* correlations (when a statistical property changed). It does not inherently prove that a specific event *caused* the change. Causality is inferred by the analyst based on domain knowledge and timing.
*   **Stationarity:** Standard time-series models often assume stationarity. While log-returns improve this, extreme shocks (like COVID-19) can create "non-stationary" bursts that complicate simple models.
*   **Single-Variable Scope:** This analysis uses only Price. It excludes external factors like USD exchange rates, production quotas, or global inventory levels.

## 3. Communication Strategy
To ensure insights are actionable, we define specific channels for stakeholders:
*   **Analysts & Data Scientists:** A **Jupyter Notebook** and **GitHub Repo** with reproducible code, MCMC trace plots, and statistical diagnostics (R-hat).
*   **Investors & Policymakers:** An **Interactive Dashboard (React/Flask)** allowing users to filter dates, view "Regime Shifts," and overlay specific geopolitical events (e.g., "Show me price behavior around the 2008 Crisis").
*   **Executive Summary:** A concise PDF report highlighting only the "What" (Date of change), "How Much" (Magnitude of price drop), and "Why" (Likely associated event).

## 4. Model Understanding
*   **Why Change Point Models?** Financial markets are not linear; they switch between "regimes" (e.g., Calm vs. Panic). Standard regression fails to capture these abrupt jumps. A Bayesian Change Point model explicitly hunts for the day ($\tau$) where the rules of the data generated changed.
*   **Expected Outputs:**
    *   **Posterior of $\tau$:** A probability distribution of *when* the change happened.
    *   **$\mu_1$ vs $\mu_2$:** The estimated average price before and after the event.