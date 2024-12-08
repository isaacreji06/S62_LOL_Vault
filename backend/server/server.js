const express = require('express');
const app = express();
let PORT=8080
app.get('/ping', (req, res) => {
    res.send('ping');
});
app.listen(PORT, () => {
    console.log(`the server is running on the port ${PORT}`);
});