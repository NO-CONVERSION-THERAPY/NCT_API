import { Hono } from 'hono';
const app = new Hono();

app.get('/api/map-data', async (c) => {
  const gasUrl = c.env.GAS_URL;
  
    try {
        const response = await fetch(gasUrl);
        
        const data = await response.json();

        const cleanData = data.map(item => {
            return {
                name: item.name,
                statistics: item.statistics
            };
        });

        const dataData = data.data
        const cleanDataForData = dataData.map(item => {
            return {
                lat: item.lat,
                lng: item.lng
            }
        })
        
        return c.json({
            success: true,
            data: cleanData,
            api_by: "HosinoNeko"
        });
        }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
});

export default app;