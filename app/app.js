import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: "NCT Data API 運行成功！" });
});

// 使用 serverless 適配器包裝 app
const handler = serverless(app);

export default {
  async fetch(request, env, ctx) {
    // 讓適配器處理轉換
    return await handler(request, env, ctx);
  }
};