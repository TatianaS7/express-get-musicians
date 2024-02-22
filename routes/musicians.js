const express = require('express');
const router = express.Router();
const Musicians = require('../models/Musician');

//Get All Musicians
router.get('/', async (req, res) => {
    try {
        const allMusicians = await Musicians.findAll();
        res.json(allMusicians);    
    } catch (error) {
        console.error('Error getting musicians', error);
        res.status(500).json({ message: 'Internal Server Error'});
    };
});

//Get a Musician (by id)
router.get('/:id', async (req, res) => {
    try {
        const musician = await Musicians.findByPk(req.params.id);
        res.json(musician);    
    } catch (error) {
        console.error('Error getting musician', error);
        res.status(500).json({message: 'Internal Server Error'});
    };
});

//Add a Musician
router.post('/', async (req, res) => {
    try {
        const newMusician = await Musicians.create(req.body);
        res.json(newMusician);
    } catch (error) {
        console.error('Error adding musician', error);
        res.status(500).json({message: 'Internal Server Error'});
    };
});

//Update a Musician (by id)
router.post('/:id', async (req, res) => {
    try {
        const musician = await Musicians.findByPk(req.params.id);
        await musician.update(req.body);
        res.json(musician);
    } catch (error) {
        console.error('Error updating musician', error);
        res.status(500).json({message: 'Internal Server Error'});
    };
});

//Delete a Musician (by id)
router.delete('/:id', async (req, res) => {
    try {
        const musician = await Musicians.findByPk(req.params.id);
        await musician.destroy();
        res.json(await Musicians.findAll());
    } catch (error) {
        console.error('Error deleting musician', error);
        res.status(500).json({message: 'Internal Server Error'});
    };
});

module.exports = router;