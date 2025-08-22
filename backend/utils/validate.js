/**
 * Validation utility functions for record data
 */

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;

  // Remove all non-digits and check if exactly 10 digits
  const digits = phone.replace(/\D/g, '');
  return /^\d{10}$/.test(digits);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;

  // Basic email validation - must contain @ and .
  return email.includes('@') && email.includes('.') && email.length > 5;
};

/**
 * Validate zipcode format (Indian 6-digit)
 * @param {string} zipcode - Zipcode to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const validateZipcode = (zipcode) => {
  if (!zipcode || typeof zipcode !== 'string') return false;

  // Indian zipcode validation - exactly 6 digits
  return /^\d{6}$/.test(zipcode);
};

/**
 * Validate date format
 * @param {Date|string} date - Date to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const validateDate = (date) => {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  } catch (error) {
    return false;
  }
};

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result with errors object
 */
const validateRequiredFields = (data, requiredFields) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  return errors;
};

/**
 * Validate record data
 * @param {Object} recordData - Record data to validate
 * @returns {Object} - Validation result with isValid boolean and errors object
 */
const validateRecord = (recordData) => {
  const requiredFields = ['name', 'phone', 'email', 'address', 'state', 'district', 'city', 'zipcode', 'recordDate'];

  // Check required fields
  const requiredErrors = validateRequiredFields(recordData, requiredFields);

  // Check phone format
  if (recordData.phone && !validatePhone(recordData.phone)) {
    requiredErrors.phone = 'Phone must be exactly 10 digits';
  }

  // Check email format
  if (recordData.email && !validateEmail(recordData.email)) {
    requiredErrors.email = 'Email must contain @ and .';
  }

  // Check zipcode format
  if (recordData.zipcode && !validateZipcode(recordData.zipcode)) {
    requiredErrors.zipcode = 'Zipcode must be exactly 6 digits';
  }

  // Check date format
  if (recordData.recordDate && !validateDate(recordData.recordDate)) {
    requiredErrors.recordDate = 'Record date must be a valid date';
  }

  return {
    isValid: Object.keys(requiredErrors).length === 0,
    errors: requiredErrors
  };
};

/**
 * Sanitize input data
 * @param {Object} data - Data to sanitize
 * @returns {Object} - Sanitized data
 */
const sanitizeData = (data) => {
  const sanitized = {};

  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].trim();
    } else {
      sanitized[key] = data[key];
    }
  });

  return sanitized;
};

module.exports = {
  validatePhone,
  validateEmail,
  validateZipcode,
  validateDate,
  validateRequiredFields,
  validateRecord,
  sanitizeData
};
