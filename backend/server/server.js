const express = require('express');
if (process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config({
        path:'../config/.env',
    });
}
const app = express();
const PORT=process.env.PORT
app.get('/ping', (req, res) => {
    res.send('ping');
});
app.listen(PORT, () => {
    console.log(`the server is running on the port ${PORT}`);
});