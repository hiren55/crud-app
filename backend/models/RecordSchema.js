/**
 * Record Schema - MongoDB Schema definition using Mongoose
 */

const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function (v) {
        // Remove all non-digits and check if exactly 10 digits
        const digits = v.replace(/\D/g, '');
        return /^\d{10}$/.test(digits);
      },
      message: 'Phone must be exactly 10 digits'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return v.includes('@') && v.includes('.') && v.length > 5;
      },
      message: 'Email must contain @ and . and be at least 6 characters long'
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [10, 'Address must be at least 10 characters long'],
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    minlength: [2, 'City must be at least 2 characters long'],
    maxlength: [100, 'City cannot exceed 100 characters']
  },
  zipcode: {
    type: String,
    required: [true, 'Zipcode is required'],
    trim: true,
    validate: {
      validator: function (v) {
        // Indian zipcode validation (6 digits)
        return /^\d{6}$/.test(v);
      },
      message: 'Zipcode must be exactly 6 digits'
    }
  },
  recordDate: {
    type: Date,
    required: [true, 'Record date is required'],
    default: Date.now
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
recordSchema.index({ name: 1 });
recordSchema.index({ email: 1 });
recordSchema.index({ state: 1, district: 1, city: 1 });
recordSchema.index({ recordDate: -1 });
recordSchema.index({ createdAt: -1 });

// Virtual for formatted phone number
recordSchema.virtual('formattedPhone').get(function () {
  const digits = this.phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  return this.phone;
});

// Virtual for formatted record date (Indian format)
recordSchema.virtual('formattedRecordDate').get(function () {
  if (this.recordDate) {
    return this.recordDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  return '';
});

// Pre-save middleware to format phone number
recordSchema.pre('save', function (next) {
  if (this.isModified('phone')) {
    const digits = this.phone.replace(/\D/g, '');
    if (digits.length === 10) {
      this.phone = `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  }
  next();
});

// Static method to search records
recordSchema.statics.searchRecords = function (query, options = {}) {
  const {
    page = 1,
    limit = 8,
    sortBy = 'name',
    sortOrder = 'asc'
  } = options;

  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  return this.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};

// Static method to get total count
recordSchema.statics.getTotalCount = function (query = {}) {
  return this.countDocuments(query).exec();
};

module.exports = mongoose.model('Record', recordSchema);
