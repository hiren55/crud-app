import React from 'react';
import { CheckCircle, Shield, Zap, Globe } from 'lucide-react';

function About() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Record Management System?
            </h2>
            <p className="text-lg text-gray-600">
              Built with modern technologies and best practices for optimal performance and user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Validation</h3>
                <p className="text-gray-600">
                  Client-side and server-side validation for all fields including Indian address structure, 
                  phone numbers, and email formats.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  MongoDB Atlas cloud database with automatic backups, encryption, and high availability 
                  for your data security.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Built with Vite for instant hot reloads, React 18 for optimal performance, and 
                  optimized database queries for fast data retrieval.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Ready</h3>
                <p className="text-gray-600">
                  Cloud-based infrastructure that scales automatically, accessible from anywhere 
                  in the world with responsive design for all devices.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Perfect for Indian Businesses
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our system is specifically designed to handle Indian address structures with proper 
                validation for states, districts, cities, and 6-digit zipcodes.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">10</span>
                  </div>
                  <p className="text-gray-600">States</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">80+</span>
                  </div>
                  <p className="text-gray-600">Districts</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">6</span>
                  </div>
                  <p className="text-gray-600">Digit Zipcode</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">∞</span>
                  </div>
                  <p className="text-gray-600">Cities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
