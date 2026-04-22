import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.json('[]')
})

const port = 3000
app.listen(port, () => {
    console.log(`server is start at the prot: ${port}`)
})

export default {
  async fetch(request, env, ctx) {
    // 這裡通常需要一個適配器，或者如果是 Pages 項目則不同
    // 但核心點是必須有 export default
    return app(request, env, ctx);
  }
};