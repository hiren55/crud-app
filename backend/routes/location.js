/**
 * Location Routes - Handle state and district endpoints
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

/**
 * GET /api/states
 * Get all available states
 */
router.get('/states', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../data/statesDistricts.json');
        const data = await fs.readFile(dataPath, 'utf8');
        const statesData = JSON.parse(data);

        const states = Object.keys(statesData);
        res.json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch states'
        });
    }
});

/**
 * GET /api/districts/:state
 * Get districts for a specific state
 */
router.get('/districts/:state', async (req, res) => {
    try {
        const { state } = req.params;
        const dataPath = path.join(__dirname, '../data/statesDistricts.json');
        const data = await fs.readFile(dataPath, 'utf8');
        const statesData = JSON.parse(data);

        const districts = statesData[state] || [];

        if (districts.length === 0) {
            return res.status(404).json({
                error: 'State not found',
                message: 'No districts found for the specified state'
            });
        }

        res.json(districts);
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch districts'
        });
    }
});

/**
 * GET /api/location/all
 * Get all states and districts data
 */
router.get('/all', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../data/statesDistricts.json');
        const data = await fs.readFile(dataPath, 'utf8');
        const statesData = JSON.parse(data);

        res.json(statesData);
    } catch (error) {
        console.error('Error fetching location data:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch location data'
        });
    }
});

module.exports = router;
