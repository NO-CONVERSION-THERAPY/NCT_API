import { Hono } from 'hono';
const app = new Hono();

app.get('/fetch-gas-data', async (req, res) => {
  const gasUrl = c.env.GAS_URL;
  
  try {
    const response = await fetch(gasUrl);
    
    if (!response.ok) {
      throw new Error(`GAS get err: ${response.status}`);
    }
    
    const data = await response.json();
    
    res.json({
      content: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;