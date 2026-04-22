import { Hono } from 'hono';
const app = new Hono();

app.get('/api/map-data', async (c) => {
  const gasUrl = c.env.GAS_URL;
  
    try {
        const response = await fetch(gasUrl);
        
        const data = await response.json();

        const statisticsData = data.map(item => {
            return {
                schoolNum: item.schoolNum,
                avg_age: item.avg_age,
                formNum:item.formNum,
                statistics: item.statistics,
                statisticsForm: item.statisticsForm
            };
        });
        const cleanDataForData = data.map(item => {
            return {
                lat: item.lat,
                lng: item.lng
            }
        })
        
        return c.json({
            success: true,
            data: cleanDataForData,
            api_by: "HosinoNeko"
        });
        }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
});

export default app;