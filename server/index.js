const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const db = require('./db');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.post('/login', async (req, res) => {
    try {
        console.log(req.body); 
        const name = await db.getUser(req.body.username, req.body.password);
        return res.status(200).json(name);
    } catch (error) {
        return res.status(404).json({
        message: error.message,
        });
    }       
})

app.get('/images', async (req, res) => {
    try {
        // console.log(req.body); 
        const name = await db.getImages();
        // console.log(name);
        return res.status(200).json(name);
    } catch (error) {
        return res.status(404).json({
        message: error.message,
        });
    }       
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(` Server running on port ${PORT}`))

