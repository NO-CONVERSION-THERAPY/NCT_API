import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: "NCT Data API 運行成功！(Hono 版)" });
});

export default app; // 就這麼簡單，不需要適配器，不需要 fetch 封裝