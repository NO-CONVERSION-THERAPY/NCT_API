import { Hono } from 'hono';
const app = new Hono();

app.get('/api/map-data', async (c) => {
  const gasUrl = c.env.GAS_URL;
  
    try {
        const response = await fetch(gasUrl);
        
        if (!response.ok) {
            throw new Error(`GAS get err: ${response.status}`);
        }
        
        const data = await response.json();
        
        return c.json({
            content: data,
            api_by: "HosinoNeko"
        });
        }
    catch (error) {
        return c.status(500).json({ error: error.message });
    }
});

export default app;