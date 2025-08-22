/**
 * Records Routes - Handle all record-related endpoints
 */

const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// Initialize Record model
const recordModel = new Record();

/**
 * GET /api/records
 * Get all records with pagination, search, and sorting
 */
router.get('/', async (req, res) => {
  try {
    const { page, limit, search, sortBy, sortOrder } = req.query;

    const result = await recordModel.getAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 8,
      search: search || '',
      sortBy: sortBy || 'name',
      sortOrder: sortOrder || 'asc'
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch records'
    });
  }
});

/**
 * GET /api/records/:id
 * Get a single record by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const record = await recordModel.getById(id);

    if (!record) {
      return res.status(404).json({
        error: 'Record not found',
        message: 'No record found with the specified ID'
      });
    }

    res.json(record);
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch record'
    });
  }
});

/**
 * POST /api/records
 * Create a new record
 */
router.post('/', async (req, res) => {
  try {
    const recordData = req.body;

    const result = await recordModel.create(recordData);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid record data',
        details: result.errors
      });
    }

    res.status(201).json(result.data);
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create record'
    });
  }
});

/**
 * PUT /api/records/:id
 * Update an existing record
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await recordModel.update(id, updateData);

    if (!result.success) {
      if (result.error === 'Record not found') {
        return res.status(404).json({
          error: 'Record not found',
          message: 'No record found with the specified ID'
        });
      }

      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid record data',
        details: result.errors
      });
    }

    res.json(result.data);
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update record'
    });
  }
});

/**
 * DELETE /api/records/:id
 * Delete a record
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await recordModel.delete(id);

    if (!result.success) {
      return res.status(404).json({
        error: 'Record not found',
        message: 'No record found with the specified ID'
      });
    }

    res.json({
      message: result.message,
      success: true
    });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete record'
    });
  }
});

/**
 * GET /api/records/count/total
 * Get total count of records
 */
router.get('/count/total', async (req, res) => {
  try {
    const count = await recordModel.getCount();
    res.json({ count });
  } catch (error) {
    console.error('Error getting record count:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to get record count'
    });
  }
});

module.exports = router;
