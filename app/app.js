import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: "NCT Data API 運行成功！" });
});

const handler = serverless(app);

export default {
  async fetch(request, env, ctx) {
    try {
      // serverless-http 需要對象包含特定的屬性，有時直接傳入 request 會在某些版本崩潰
      return await handler(request, env, ctx);
    } catch (e) {
      // 如果崩潰了，直接在頁面上顯示報錯信息，而不是顯示 1101
      return new Response(`內核崩潰: ${e.message}\n${e.stack}`, { 
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};