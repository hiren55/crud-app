/**
 * Record Model - Handles data operations for records using MongoDB
 */

const RecordModel = require('./RecordSchema');

class Record {
    /**
     * Get all records with filtering, pagination, and sorting
     * @param {Object} options - Query options
     * @returns {Object} - Paginated and filtered records
     */
    async getAll(options = {}) {
        try {
            const {
                page = 1,
                limit = 8,
                search = '',
                sortBy = 'name',
                sortOrder = 'asc'
            } = options;

            // Build search query
            let query = {};
            if (search) {
                query = {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phone: { $regex: search, $options: 'i' } },
                        { address: { $regex: search, $options: 'i' } },
                        { state: { $regex: search, $options: 'i' } },
                        { district: { $regex: search, $options: 'i' } },
                        { city: { $regex: search, $options: 'i' } },
                        { zipcode: { $regex: search, $options: 'i' } }
                    ]
                };
            }

            // Get total count for pagination
            const totalRecords = await RecordModel.countDocuments(query);

            // Get paginated and sorted records
            const records = await RecordModel.searchRecords(query, {
                page: parseInt(page),
                limit: parseInt(limit),
                sortBy,
                sortOrder
            });

            return {
                records,
                totalRecords,
                totalPages: Math.ceil(totalRecords / limit),
                currentPage: parseInt(page),
                pageSize: parseInt(limit)
            };
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    }

    /**
     * Get a single record by ID
     * @param {string} id - Record ID
     * @returns {Object|null} - Record object or null if not found
     */
    async getById(id) {
        try {
            return await RecordModel.findById(id);
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    }

    /**
     * Create a new record
     * @param {Object} recordData - Record data
     * @returns {Object} - Created record or error
     */
    async create(recordData) {
        try {
            // Set default record date if not provided
            if (!recordData.recordDate) {
                recordData.recordDate = new Date();
            }

            const newRecord = new RecordModel(recordData);
            const savedRecord = await newRecord.save();

            return {
                success: true,
                data: savedRecord
            };
        } catch (error) {
            console.error('Error in create:', error);

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const errors = {};
                Object.keys(error.errors).forEach(key => {
                    errors[key] = error.errors[key].message;
                });

                return {
                    success: false,
                    errors
                };
            }

            throw error;
        }
    }

    /**
     * Update an existing record
     * @param {string} id - Record ID
     * @param {Object} updateData - Data to update
     * @returns {Object} - Updated record or error
     */
    async update(id, updateData) {
        try {
            const updatedRecord = await RecordModel.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true, // Return the updated document
                    runValidators: true, // Run validation on update
                    context: 'query'
                }
            );

            if (!updatedRecord) {
                return {
                    success: false,
                    error: 'Record not found'
                };
            }

            return {
                success: true,
                data: updatedRecord
            };
        } catch (error) {
            console.error('Error in update:', error);

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const errors = {};
                Object.keys(error.errors).forEach(key => {
                    errors[key] = error.errors[key].message;
                });

                return {
                    success: false,
                    errors
                };
            }

            throw error;
        }
    }

    /**
     * Delete a record
     * @param {string} id - Record ID
     * @returns {Object} - Success status or error
     */
    async delete(id) {
        try {
            const deletedRecord = await RecordModel.findByIdAndDelete(id);

            if (!deletedRecord) {
                return {
                    success: false,
                    error: 'Record not found'
                };
            }

            return {
                success: true,
                message: 'Record deleted successfully'
            };
        } catch (error) {
            console.error('Error in delete:', error);
            throw error;
        }
    }

    /**
     * Get total count of records
     * @returns {number} - Total number of records
     */
    async getCount() {
        try {
            return await RecordModel.countDocuments();
        } catch (error) {
            console.error('Error in getCount:', error);
            throw error;
        }
    }

    /**
     * Clear all records (for testing purposes)
     */
    async clear() {
        try {
            await RecordModel.deleteMany({});
            return { success: true, message: 'All records cleared' };
        } catch (error) {
            console.error('Error in clear:', error);
            throw error;
        }
    }

    /**
     * Get records by state
     * @param {string} state - State name
     * @returns {Array} - Array of records in the specified state
     */
    async getByState(state) {
        try {
            return await RecordModel.find({ state: { $regex: state, $options: 'i' } });
        } catch (error) {
            console.error('Error in getByState:', error);
            throw error;
        }
    }

    /**
     * Get records by district
     * @param {string} district - District name
     * @returns {Array} - Array of records in the specified district
     */
    async getByDistrict(district) {
        try {
            return await RecordModel.find({ district: { $regex: district, $options: 'i' } });
        } catch (error) {
            console.error('Error in getByDistrict:', error);
            throw error;
        }
    }

    /**
     * Get records by city
     * @param {string} city - City name
     * @returns {Array} - Array of records in the specified city
     */
    async getByCity(city) {
        try {
            return await RecordModel.find({ city: { $regex: city, $options: 'i' } });
        } catch (error) {
            console.error('Error in getByCity:', error);
            throw error;
        }
    }

    /**
     * Get records by zipcode
     * @param {string} zipcode - Zipcode
     * @returns {Array} - Array of records in the specified zipcode
     */
    async getByZipcode(zipcode) {
        try {
            return await RecordModel.find({ zipcode: { $regex: zipcode, $options: 'i' } });
        } catch (error) {
            console.error('Error in getByZipcode:', error);
            throw error;
        }
    }

    /**
     * Get records by date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @returns {Array} - Array of records within the date range
     */
    async getByDateRange(startDate, endDate) {
        try {
            return await RecordModel.find({
                recordDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            });
        } catch (error) {
            console.error('Error in getByDateRange:', error);
            throw error;
        }
    }
}

module.exports = Record;
