const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.json('[]')
})

const port = 3000
app.listen(port, () => {
    console.log(`server is start at the prot: ${port}`)
})

module.exports = app;