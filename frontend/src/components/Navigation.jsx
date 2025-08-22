import React from 'react';
import { Database, ArrowLeft } from 'lucide-react';

function Navigation({ currentPage, onNavigateToHome, onNavigateToDashboard }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Record Management System</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {currentPage === 'dashboard' && (
              <button
                onClick={onNavigateToHome}
                className="btn btn-outline flex items-center gap-2 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            )}
            
            {currentPage === 'home' && (
              <button
                onClick={onNavigateToDashboard}
                className="btn btn-primary flex items-center gap-2 hover:bg-blue-700"
              >
                <Database className="w-4 h-4" />
                Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
