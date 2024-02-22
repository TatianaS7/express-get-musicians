const express = require('express');
const router = express.Router();
const Bands = require('../models/Band');
const Musician = require('../models/Musician');

//Get All Bands & Musicians
router.get('/', async (req, res) => {
    try {
        const allBands = await Bands.findAll({include: [{model: Musician, as: 'musician'}]});
        res.json(allBands);    
    } catch (error) {
        console.error('Error getting bands', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

//Get a Band & the Musicians (by id)
router.get('/:id', async (req, res) => {
    try {
        const findBand = await Bands.findAll({where: {id: req.params.id}, include: {model: Musician, as: 'musician'}});
        res.json(findBand);
    } catch (error) {
        console.error('Error getting band', error);
        res.status(500).json({ error: 'Internal Server Error'});
    };
});

module.exports = router;