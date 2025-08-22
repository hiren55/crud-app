import React from 'react';
import { ArrowRight, Database, Users, Search, Edit, Plus } from 'lucide-react';
import About from './About';

function Home({ onNavigateToDashboard }) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <h1 className="text-6xl font-bold text-gray-900 mb-6">
                                Record Management System
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                A powerful, modern CRUD application built with React and Node.js.
                                Manage your records with Indian address structure, advanced search,
                                sorting, and real-time updates.
                            </p>
                            <button
                                onClick={onNavigateToDashboard}
                                className="btn btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto hover:scale-105 transition-transform"
                            >
                                Get Started
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Database className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">MongoDB Atlas Integration</h3>
                                <p className="text-gray-600">
                                    Cloud-based database with automatic scaling, backups, and high availability.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Indian Address Structure</h3>
                                <p className="text-gray-600">
                                    Complete address fields including State, District, City, and Zipcode with validation.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Search & Sort</h3>
                                <p className="text-gray-600">
                                    Powerful search across all fields with sorting, pagination, and real-time updates.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Edit className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">CRUD Operations</h3>
                                <p className="text-gray-600">
                                    Create, Read, Update, and Delete records with full validation and error handling.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Plus className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern UI/UX</h3>
                                <p className="text-gray-600">
                                    Beautiful, responsive design with smooth animations and intuitive user interface.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Database className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Updates</h3>
                                <p className="text-gray-600">
                                    Instant grid updates without page refresh, live search, and dynamic content.
                                </p>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Built With Modern Technologies</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-blue-600 font-bold text-lg">R</span>
                                    </div>
                                    <p className="font-semibold text-gray-900">React 18</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-green-600 font-bold text-lg">N</span>
                                    </div>
                                    <p className="font-semibold text-gray-900">Node.js</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-purple-600 font-bold text-lg">M</span>
                                    </div>
                                    <p className="font-semibold text-gray-900">MongoDB</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-orange-600 font-bold text-lg">V</span>
                                    </div>
                                    <p className="font-semibold text-gray-900">Vite</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-12 text-white">
                            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Experience the power of modern record management with our comprehensive CRUD application.
                            </p>
                            <button
                                onClick={onNavigateToDashboard}
                                className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 flex items-center gap-3 mx-auto"
                            >
                                Launch Dashboard
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <About />
        </>
    );
}

export default Home;
