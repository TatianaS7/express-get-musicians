const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());


//TODO: Create a GET /musicians route to return all musicians 
app.get('/musicians', async (req, res) => {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
});

//Get Musician (by id)
app.get('/musicians/:id', async (req, res) => {
    try {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
    } catch (error) {
        console.error('Error getting musician', error)
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//Add New Musician
app.post('/musicians', async (req, res) => {
    try {
        const newMusician = await Musician.create(req.body);

        res.send(newMusician);
    } catch (error) {
        console.error('Error adding musician', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Update a Musician (by id)
app.put('/musicians/:id', async (req, res) => {
    try {
        const foundMusician = await Musician.findByPk(req.params.id);
        await foundMusician.update(req.body);

        res.send(foundMusician);
    } catch (error) {
        console.error('Error updating musician', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Delete Musician (by id)
app.delete('/musicians/:id', async (req, res) => {
    try {
        const foundMusician = await Musician.findByPk(req.params.id);
        await foundMusician.destroy();

        res.send(await Musician.findAll());
    } catch (error) {
        console.error( 'Error deleting musician', error );
        res.status(500).json({ error: 'Internal Server Error' })
    }
});






module.exports = app;