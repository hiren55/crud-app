import React, { useState, useEffect } from 'react';
import { X, Save, User, Phone, Mail, MapPin, Calendar, Building2, Globe } from 'lucide-react';
import { locationAPI } from '../utils/api';

function RecordForm({ record, onSubmit, onCancel, loading, isEditing = false }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        state: '',
        district: '',
        city: '',
        zipcode: '',
        recordDate: new Date().toISOString().split('T')[0] // Default to today
    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [errors, setErrors] = useState({});
    const [loadingStates, setLoadingStates] = useState(false);

    // Initialize form data if editing
    useEffect(() => {
        if (record) {
            setFormData({
                name: record.name || '',
                phone: record.phone || '',
                email: record.email || '',
                address: record.address || '',
                state: record.state || '',
                district: record.district || '',
                city: record.city || '',
                zipcode: record.zipcode || '',
                recordDate: record.recordDate ? new Date(record.recordDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
        }
    }, [record]);

    // Fetch states on component mount
    useEffect(() => {
        fetchStates();
    }, []);

    // Fetch districts when state changes
    useEffect(() => {
        if (formData.state) {
            fetchDistricts(formData.state);
        } else {
            setDistricts([]);
            setFormData(prev => ({ ...prev, district: '' }));
        }
    }, [formData.state]);

    const fetchStates = async () => {
        try {
            setLoadingStates(true);
            const result = await locationAPI.getStates();
            setStates(result);
        } catch (error) {
            console.error('Error fetching states:', error);
            setStates([]);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchDistricts = async (state) => {
        try {
            const result = await locationAPI.getDistricts(state);
            setDistricts(result);

            // Reset district if current district is not in the new state's districts
            if (formData.district && !result.includes(formData.district)) {
                setFormData(prev => ({ ...prev, district: '' }));
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
            setDistricts([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
            newErrors.email = 'Email must contain @ and .';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        if (!formData.district) {
            newErrors.district = 'District is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.zipcode.trim()) {
            newErrors.zipcode = 'Zipcode is required';
        } else if (!/^\d{6}$/.test(formData.zipcode)) {
            newErrors.zipcode = 'Zipcode must be exactly 6 digits';
        }

        if (!formData.recordDate) {
            newErrors.recordDate = 'Record date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Convert date string to Date object
            const submitData = {
                ...formData,
                recordDate: new Date(formData.recordDate)
            };
            onSubmit(submitData);
        }
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');

        // Format as (xxx)-xxx-xxxx
        if (digits.length <= 3) {
            return digits;
        } else if (digits.length <= 6) {
            return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
        } else {
            return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        }
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const formatted = formatPhoneNumber(value);
        setFormData(prev => ({ ...prev, phone: formatted }));

        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            {isEditing ? (
                                <User className="w-6 h-6 text-white" />
                            ) : (
                                <User className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {isEditing ? 'Edit Record' : 'Add New Record'}
                            </h2>
                            <p className="text-blue-100 text-sm">
                                {isEditing ? 'Update existing record information' : 'Fill in the details to create a new record'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onCancel}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
                        disabled={loading}
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Form Body */}
            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.name 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="Enter your full name"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.name}</span>
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.phone 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="(123)-456-7890"
                                        maxLength="14"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.phone}</span>
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.email 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="Enter your email address"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.email}</span>
                                    </p>
                                )}
                            </div>

                            {/* Record Date */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Record Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        name="recordDate"
                                        value={formData.recordDate}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.recordDate 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        disabled={loading}
                                    />
                                </div>
                                {errors.recordDate && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.recordDate}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Information Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Address Information</h3>
                        </div>

                        {/* Full Address */}
                        <div className="space-y-2 mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Complete Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                                        errors.address 
                                            ? 'border-red-300 bg-red-50' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Enter your complete address"
                                    rows="3"
                                    disabled={loading}
                                />
                            </div>
                            {errors.address && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                    <span>⚠</span>
                                    <span>{errors.address}</span>
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* State */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.state 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        disabled={loading || loadingStates}
                                    >
                                        <option value="">
                                            {loadingStates ? 'Loading...' : 'Select State'}
                                        </option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.state && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.state}</span>
                                    </p>
                                )}
                            </div>

                            {/* District */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    District <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.district 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        } ${!formData.state ? 'opacity-50' : ''}`}
                                        disabled={loading || !formData.state}
                                    >
                                        <option value="">
                                            {!formData.state ? 'Select state first' : 'Select District'}
                                        </option>
                                        {districts.map((district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.district && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.district}</span>
                                    </p>
                                )}
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.city 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="Enter city"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.city && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.city}</span>
                                    </p>
                                )}
                            </div>

                            {/* Zipcode */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Zipcode <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={formData.zipcode}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                            errors.zipcode 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="123456"
                                        maxLength="6"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.zipcode && (
                                    <p className="text-sm text-red-600 flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>{errors.zipcode}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center space-x-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Saving...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Save className="w-5 h-5" />
                                    <span>{isEditing ? 'Update Record' : 'Save Record'}</span>
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecordForm;