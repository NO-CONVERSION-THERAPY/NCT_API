import { Hono } from 'hono';
const app = new Hono();

app.get('/api/map-data', async (c) => {
  const gasUrl = c.env.GAS_URL;
  
    try {
        const response = await fetch(gasUrl);
        
        const data = await response.json();

        const cleanDataForData = data.data.map(item => {
            return {
                name: item['學校名稱'],
                addr: item['學校地址'],
                else: item['其他'],
                lat: item.lat ? Number(item.lat) : 0,
                lng: item.lng ? Number(item.lat) : 0
            }
        })
        
        return c.json({
            success: true,

            schoolNum: data.schoolNum,
            avg_age: data.avg_age,
            formNum:data.formNum,
            statistics: data.statistics,
            statisticsForm: data.statisticsForm,

            data: cleanDataForData,

            api_by: "HosinoNeko"
        });
        }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
});

export default app;