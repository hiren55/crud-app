import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Users, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import RecordForm from './RecordForm';
import RecordGrid from './RecordGrid';
import { recordsAPI } from '../utils/api';
import { locationAPI } from '../utils/api';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [states, setStates] = useState([]); // <-- Add state for states list

  // Fetch records with pagination, search, and sorting
  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await recordsAPI.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        sortBy,
        sortOrder
      });

      // Ensure we have the correct data structure
      if (result && result.records) {
        setRecords(result.records || []);
        setTotalPages(result.totalPages || 1);
        setTotalRecords(result.totalRecords || 0);
      } else {
        // Fallback for unexpected data structure
        setRecords([]);
        setTotalPages(1);
        setTotalRecords(0);
        console.warn('Unexpected API response structure:', result);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch records');
      console.error('Error fetching records:', err);
      setRecords([]);
      setTotalPages(1);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch states for dashboard stats
  const fetchStates = async () => {
    try {
      const result = await locationAPI.getStates();
      setStates(Array.isArray(result) ? result : []);
    } catch (err) {
      setStates([]);
    }
  };

  // Add new record
  const addRecord = async (recordData) => {
    try {
      setLoading(true);
      setError('');

      const result = await recordsAPI.create(recordData);

      if (result) {
        setRecords(prev => [result, ...prev]);
        setSuccess('Record added successfully!');
        setShowForm(false);

        // Refresh the list to get updated pagination
        setTimeout(() => {
          fetchRecords();
        }, 100);
      }

    } catch (err) {
      setError(err.message || 'Failed to add record');
      console.error('Error adding record:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update record
  const updateRecord = async (id, recordData) => {
    try {
      setLoading(true);
      setError('');

      const result = await recordsAPI.update(id, recordData);

      if (result) {
        setRecords(prev =>
          prev.map(record =>
            record.id === id ? result : record
          )
        );

        setSuccess('Record updated successfully!');
        setEditingRecord(null);
      }

    } catch (err) {
      setError(err.message || 'Failed to update record');
      console.error('Error updating record:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const deleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      await recordsAPI.delete(id);

      setRecords(prev => prev.filter(record => record.id !== id));
      setSuccess('Record deleted successfully!');

      // Refresh the list to get updated pagination
      setTimeout(() => {
        fetchRecords();
      }, 100);

    } catch (err) {
      setError(err.message || 'Failed to delete record');
      console.error('Error deleting record:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Fetch records and states on mount
  useEffect(() => {
    fetchRecords();
    fetchStates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📊 Record Management Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your records with ease - Create, Read, Update, and Delete
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalRecords}</h3>
              <p className="text-gray-600">Total Records</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{new Date().getDate()}</h3>
              <p className="text-gray-600">Today's Date</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{states.length}</h3>
              <p className="text-gray-600">States</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-4">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{pageSize}</h3>
              <p className="text-gray-600">Records per Page</p>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="alert alert-error mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">✅</span>
                <span>{success}</span>
              </div>
            </div>
          )}

          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary flex items-center gap-2 px-6 py-2"
            >
              <Plus className="w-5 h-5" />
              Add Record
            </button>
          </div>

          {/* Record Form */}
          {showForm && (
            <RecordForm
              onSubmit={addRecord}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          )}

          {/* Edit Form */}
          {editingRecord && (
            <RecordForm
              record={editingRecord}
              onSubmit={(data) => updateRecord(editingRecord.id, data)}
              onCancel={() => setEditingRecord(null)}
              loading={loading}
            />
          )}

          {/* Records Grid */}
          <RecordGrid
            records={records}
            loading={loading}
            onEdit={setEditingRecord}
            onDelete={deleteRecord}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Records per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={8}>8</option>
                  <option value={16}>16</option>
                  <option value={24}>24</option>
                  <option value={32}>32</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Total: {totalRecords} records
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
