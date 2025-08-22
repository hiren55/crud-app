import axios from 'axios';

// API Configuration
const API_CONFIG = {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    }
};

// Create axios instance with default configuration
const apiClient = axios.create(API_CONFIG);

// Request interceptor for logging and common headers
apiClient.interceptors.request.use(
    (config) => {
        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data);
        }
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling and logging
apiClient.interceptors.response.use(
    (response) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
        }
        return response;
    },
    (error) => {
        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ API Error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                method: error.config?.method,
                data: error.response?.data,
                message: error.message
            });
        }
        return Promise.reject(error);
    }
);

// Error handler utility
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        switch (status) {
            case 400:
                return {
                    error: 'Bad Request',
                    message: data?.message || 'Invalid data provided',
                    details: data?.errors || data
                };
            case 401:
                return {
                    error: 'Unauthorized',
                    message: 'Authentication required',
                    details: data
                };
            case 403:
                return {
                    error: 'Forbidden',
                    message: 'Access denied',
                    details: data
                };
            case 404:
                return {
                    error: 'Not Found',
                    message: data?.message || 'Resource not found',
                    details: data
                };
            case 422:
                return {
                    error: 'Validation Error',
                    message: 'Data validation failed',
                    details: data?.errors || data
                };
            case 500:
                return {
                    error: 'Server Error',
                    message: 'Internal server error occurred',
                    details: data
                };
            default:
                return {
                    error: 'API Error',
                    message: data?.message || 'An unexpected error occurred',
                    details: data
                };
        }
    } else if (error.request) {
        // Request was made but no response received
        return {
            error: 'Network Error',
            message: 'No response received from server',
            details: 'Check your internet connection and try again'
        };
    } else {
        // Something else happened
        return {
            error: 'Request Error',
            message: error.message || 'Failed to make request',
            details: error
        };
    }
};

// Records API
export const recordsAPI = {
    // Get all records with pagination, search, and sorting
    getAll: async (params = {}) => {
        try {
            const response = await apiClient.get('/records', { params });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get single record by ID
    getById: async (id) => {
        try {
            const response = await apiClient.get(`/records/${id}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Create new record
    create: async (recordData) => {
        try {
            const response = await apiClient.post('/records', recordData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Update existing record
    update: async (id, recordData) => {
        try {
            const response = await apiClient.put(`/records/${id}`, recordData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Delete record
    delete: async (id) => {
        try {
            const response = await apiClient.delete(`/records/${id}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get total count of records
    getCount: async () => {
        try {
            const response = await apiClient.get('/records/count/total');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get records by state
    getByState: async (state) => {
        try {
            const response = await apiClient.get(`/records/state/${state}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get records by district
    getByDistrict: async (district) => {
        try {
            const response = await apiClient.get(`/records/district/${district}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get records by city
    getByCity: async (city) => {
        try {
            const response = await apiClient.get(`/records/city/${city}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get records by zipcode
    getByZipcode: async (zipcode) => {
        try {
            const response = await apiClient.get(`/records/zipcode/${zipcode}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get records by date range
    getByDateRange: async (startDate, endDate) => {
        try {
            const response = await apiClient.get('/records/date-range', {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};

// Location API
export const locationAPI = {
    // Get all states
    getStates: async () => {
        try {
            const response = await apiClient.get('/location/states');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get districts for a specific state
    getDistricts: async (state) => {
        try {
            const response = await apiClient.get(`/location/districts/${state}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get all location data (states and districts)
    getAll: async () => {
        try {
            const response = await apiClient.get('/location/all');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};

// Export the configured axios instance for custom requests
export { apiClient };

// Export error handler for custom error handling
export { handleApiError };

// Default export for convenience
export default {
    records: recordsAPI,
    location: locationAPI
};
