import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Container, Typography, Card, CardContent, Grid, Chip, Box } from '@mui/material';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Analysis Results
        const resultRes = await axios.get('http://localhost:5000/api/results');
        setAnalysisData(resultRes.data);

        // Fetch Events
        const eventsRes = await axios.get('http://localhost:5000/api/events');
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Typography variant="h5" style={{padding: 20}}>Loading Dashboard...</Typography>;
  if (!analysisData) return <Typography variant="h5" style={{padding: 20}}>No Analysis Data Found. Please run the Python Notebook.</Typography>;

  const { metrics, change_point_date, chart_data } = analysisData;

  return (
    <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '50px' }}>
      
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Birhan Energies: Oil Price Monitor
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Bayesian Change Point Detection & Event Impact Analysis
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Change Point Detected</Typography>
              <Typography variant="h4" color="error">
                {change_point_date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Price Before vs After</Typography>
              <Typography variant="h5">
                ${metrics.price_mean_before} → ${metrics.price_mean_after}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Impact Magnitude</Typography>
              <Typography variant="h4" style={{ color: metrics.pct_change < 0 ? 'red' : 'green' }}>
                {metrics.pct_change}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Chart */}
      <Card elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Price History & Structural Breaks</Typography>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={chart_data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" minTickGap={30} />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              
              {/* The Price Line */}
              <Line type="monotone" dataKey="price" stroke="#1976d2" dot={false} strokeWidth={2} name="Brent Oil Price" />
              
              {/* The Vertical Line for Change Point */}
              <ReferenceLine x={change_point_date} stroke="red" strokeDasharray="3 3" label="Regime Shift" />
              
              {/* Mean Levels (Horizontal Lines) */}
              {/* Note: Recharts doesn't do segmented horizontal lines easily, so we visualize the shift via text/cards above or custom implementation. 
                  For simplicity, we leave the reference line here. */}
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Events Table (Optional Integration) */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Correlated Geopolitical Events</Typography>
        <Grid container spacing={1}>
          {events.slice(0, 8).map((ev, index) => (
            <Grid item key={index}>
              <Chip label={`${ev.Date}: ${ev.Event}`} variant="outlined" color="default" />
            </Grid>
          ))}
        </Grid>
      </Box>

    </Container>
  );
}

export default App;