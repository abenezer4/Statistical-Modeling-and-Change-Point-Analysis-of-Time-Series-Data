import pandas as pd
import numpy as np

def load_and_process_data(filepath):
    """
    Loads Brent Oil data, parses dates, and calculates log returns.
    """
    try:
        df = pd.read_csv(filepath)
        
        # Convert to datetime
        df['Date'] = pd.to_datetime(df['Date'])
        
        # Sort by date
        df = df.sort_values('Date').reset_index(drop=True)
        
        # Calculate Log Returns: ln(P_t) - ln(P_t-1)
        # We use log returns because they are more stationary than raw prices
        df['Log_Returns'] = np.log(df['Price']) - np.log(df['Price'].shift(1))
        
        # Drop the first row (NaN due to shift)
        df = df.dropna()
        
        return df
    
    except FileNotFoundError:
        print(f"Error: The file at {filepath} was not found.")
        return None