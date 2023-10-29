const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.get("/test", (req, res) => {
    res.status(200).json({ message: "pass!" });
});


app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
})

app.listen(3000, () => {
    console.log('server running');
})