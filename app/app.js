import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static'
import fs from 'node:fs/promises';
import path from 'node:path';

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
                province: item['省份'],
                prov: item['區、縣'],
                experience: item['請問您在那裏都經歷了什麼？'],
                HMaster: item['校長名字'],
                scandal: item['學校的醜聞'],
                contact: item['學校的聯繫方式'],
                inputType: item['請問您是什麽身份？'],
                else: item['其他'],
                lat: item.lat ? Number(item.lat) : 0,
                lng: item.lng ? Number(item.lng) : 0
            }
        })
        
        return c.json({
            success: true,
            last_synced: data.LastSynced,
            schoolNum: data.SchoolNum,
            avg_age: data.avg_age,
            formNum:data.formNum,
            statistics: data.statistics,
            statisticsForm: data.statisticsForm,

            data: cleanDataForData,

            api_by: `HosinoNeko\n在没有黑暗的地方 我们终将重逢`
        });
        }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
});

app.get('/' , async (c) => {
    const html = await fs.readFile('../index.html', 'utf-8')
    return c.html(html)
});

export default app;