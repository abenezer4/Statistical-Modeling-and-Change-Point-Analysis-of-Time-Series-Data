import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd  # <--- Added this import

def plot_price_history(df):
    """Plots the raw price history."""
    sns.set_style("whitegrid")
    plt.figure(figsize=(14, 6))
    plt.plot(df['Date'], df['Price'], color='#1f77b4', alpha=0.8, label='Brent Oil Price')
    plt.title('Brent Oil Prices (1987 - 2022)', fontsize=16)
    plt.ylabel('Price (USD)', fontsize=12)
    plt.xlabel('Date', fontsize=12)
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

def plot_change_point_result(dates, prices, trace, tau_mean, detected_date, mu1, mu2):
    """
    Visualizes the detected change point and regime means.
    """
    # FIX: Convert numpy.datetime64 to a pandas Timestamp so .date() works
    detected_dt = pd.to_datetime(detected_date)
    
    plt.figure(figsize=(14, 6))
    
    # Plot actual data
    plt.plot(dates, prices, label='Observed Price', alpha=0.5, color='gray')
    
    # Plot Mean Regimes
    # We use dates[tau_mean] as the split point
    plt.hlines(mu1, dates[0], dates[tau_mean], colors='r', linestyles='--', lw=2, label=f'Regime 1 (Avg: ${mu1:.2f})')
    plt.hlines(mu2, dates[tau_mean], dates[-1], colors='g', linestyles='--', lw=2, label=f'Regime 2 (Avg: ${mu2:.2f})')
    
    # Plot Vertical Change Line
    plt.axvline(detected_dt, color='black', linestyle='-', lw=2, label=f'Detected Change: {detected_dt.date()}')
    
    plt.title(f'Bayesian Change Point Detection: Regime Shift on {detected_dt.date()}', fontsize=16)
    plt.ylabel('Price (USD)')
    plt.legend()
    plt.show()