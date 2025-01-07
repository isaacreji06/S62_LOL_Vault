const express = require('express');

require('dotenv').config({
    path:'../config/.env',
});

const mongoose=require('mongoose')
const app = express();
const PORT=process.env.PORT
const MONGODB_URL=process.env.MONGODB_URL
let databaseStatus=""
console.log(PORT)
console.log(MONGODB_URL)
mongoose.connect(MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>databaseStatus="Connected to the database successfully").catch((err)=>{
    databaseStatus="error connecting to the database",err
})
app.get('/',(req,res)=>{
    res.send(`<h1>${databaseStatus}</h1>`)
})
app.get('/ping', (req, res) => {
    res.send('ping');
});
app.listen(PORT, () => {
    console.log(`the server is running on the port ${PORT}`);
});