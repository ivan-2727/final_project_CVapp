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

app.get('/login/:uid', async (req, res) => {
    try {
        console.log(req.body); 
        const name = await db.getUser(req.params.uid);
        return res.status(200).json(name);
    } catch (error) {
        return res.status(404).json({
        message: error.message,
        });
    }       
})
app.post('/login/:uid', async (req, res) => {
    try {
        console.log(req.body); 
        const name = await db.createUser(req.params.uid);
        return res.status(200).json(name);
    } catch (error) {
        return res.status(404).json({
        message: error.message,
        });
    }       
})

app.post('/favorite/:id', async (req, res) => {
    try {
        console.log('/////req.body',req.body); 
        const favourite = await db.setFavorites(req.params.id, req.body);
        console.log('//////favoritesInServer', favourite)
        return res.status(200).json(favourite);
    } catch (error) {
        console.log("ERROR ////////////////////", error);
        return res.status(404).json({
        message: error.message,
        });
    }       
})

app.get('/images', async (req, res) => {
    try {
        console.log(req.body); 
        const name = await db.getImages();
        console.log(name[1]);
        return res.status(200).json(name);
    } catch (error) {
        return res.status(404).json({
        message: error.message,
        });
    }       
})
app.get('/template/:id', async (req, res) => {
    try {
        console.log(req.params.id); 
        const name = await db.getTemp(req.params.id);
        console.log(name);
        return res.status(200).json(name.html);
    } catch (error) {
        return res.status(404).json({
        message: error.message,
        });
    }       
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(` Server running on port ${PORT}`))

