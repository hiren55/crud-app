import React from 'react';
import { Edit, Trash2, ChevronUp, ChevronDown, User, Phone, Mail, Calendar, MapPin, Building2, Hash, Globe } from 'lucide-react';

const RecordGrid = ({
  records = [],
  loading,
  onEdit,
  onDelete,
  onSort,
  sortBy,
  sortOrder
}) => {
  // Safely handle records array
  const safeRecords = Array.isArray(records) ? records : [];

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Records</h2>
              <p className="text-blue-100 text-sm">Loading your data...</p>
            </div>
          </div>
        </div>
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Records</h3>
          <p className="text-gray-600">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  if (!safeRecords || safeRecords.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Records</h2>
              <p className="text-blue-100 text-sm">No records found</p>
            </div>
          </div>
        </div>
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Records Found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first record</p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            <User className="w-4 h-4 mr-2" />
            Click "Add New Record" to begin
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Records</h2>
              <p className="text-blue-100 text-sm">
                {safeRecords.length} record{safeRecords.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-white font-semibold text-lg">{safeRecords.length}</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>Name</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('phone')}
              >
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>Phone</span>
                  {getSortIcon('phone')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('email')}
              >
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>Email</span>
                  {getSortIcon('email')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('address')}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>Address</span>
                  {getSortIcon('address')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('recordDate')}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>Date</span>
                  {getSortIcon('recordDate')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('state')}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>State</span>
                  {getSortIcon('state')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('district')}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>District</span>
                  {getSortIcon('district')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('city')}
              >
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>City</span>
                  {getSortIcon('city')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
                onClick={() => onSort('zipcode')}
              >
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span>Zipcode</span>
                  {getSortIcon('zipcode')}
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safeRecords.map((record, index) => (
              <tr
                key={record.id || record._id}
                className="hover:bg-blue-50 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {record.name ? record.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{record.name}</div>
                      <div className="text-xs text-gray-500 font-mono">
                        ID: {(record.id || record._id || '').toString().slice(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      {record.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="text-sm text-gray-900 truncate max-w-xs" title={record.email}>
                      {record.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 font-medium">
                      {record.address}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 font-medium">
                      {formatDate(record.recordDate)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    <Globe className="w-3 h-3 mr-1" />
                    {record.state}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <MapPin className="w-3 h-3 mr-1" />
                    {record.district}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    <Building2 className="w-3 h-3 mr-1" />
                    {record.city}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {record.zipcode}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="inline-flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      title="Edit record"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(record.id || record._id)}
                      className="inline-flex items-center justify-center w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Total Records: <span className="font-semibold text-gray-900">{safeRecords.length}</span></span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Active Records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordGrid;