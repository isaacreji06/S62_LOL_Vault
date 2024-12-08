const express = require('express');
const app = express();
app.get('/ping', (req, res) => {
    res.send('ping');
});
app.listen(8080, () => {
    console.log("the server is running on the port 8080");
});