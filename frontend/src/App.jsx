import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeComponent from './components/Home';
import Dashboard from './components/Dashboard';
import TailwindTest from './components/TailwindTest';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'dashboard'

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navigation
        currentPage={currentPage}
        onNavigateToHome={navigateToHome}
        onNavigateToDashboard={navigateToDashboard}
      />

      {/* Main Content */}
      <main>
        {currentPage === 'home' ? (
          <>
            <HomeComponent onNavigateToDashboard={navigateToDashboard} />
            
          </>
        ) : (
          <Dashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-lg font-semibold">Record Management System</span>
          </div>
          <p className="text-gray-400 mb-4">
            A modern CRUD application built with React, Node.js, and MongoDB Atlas
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>React 18</span>
            <span>•</span>
            <span>Node.js</span>
            <span>•</span>
            <span>MongoDB Atlas</span>
            <span>•</span>
            <span>Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
