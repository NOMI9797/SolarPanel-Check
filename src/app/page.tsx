'use client';

import { useState } from 'react';
import { Sun, Zap, Shield, Globe, Search, ArrowRight, Battery, Filter } from 'lucide-react';
import { solarBrands, SolarBrand } from '@/config/solarBrands';
import SerialScanner from '@/components/SerialScanner';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'premium' | 'standard' | 'budget'>('all');

  const handleBrandClick = (url: string, brandName: string) => {
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBrandDetected = (brand: SolarBrand) => {
    // Redirect to the brand's authentication page
    window.open(brand.url, '_blank', 'noopener,noreferrer');
  };

  const filteredBrands = solarBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Brands', count: solarBrands.length },
    { id: 'premium', name: 'Premium', count: solarBrands.filter(b => b.category === 'premium').length },
    { id: 'standard', name: 'Standard', count: solarBrands.filter(b => b.category === 'standard').length },
    { id: 'budget', name: 'Budget', count: solarBrands.filter(b => b.category === 'budget').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Solar Panel Hub</h1>
                <p className="text-sm text-gray-600">Authentication & Information Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure Verification</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg">
              <Zap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Solar Panel Brand
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your solar panel manufacturer below to access their official authentication 
            and barcode verification system. Get instant access to product information and warranty details.
          </p>
        </div>

        {/* Serial Number Scanner */}
        <SerialScanner onBrandDetected={handleBrandDetected} />

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your solar panel brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredBrands.length} of {solarBrands.length} brands
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className={`group relative bg-white rounded-xl border-2 ${brand.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105`}
              onClick={() => handleBrandClick(brand.url, brand.name)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{brand.logo}</div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {brand.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {brand.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {brand.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Click to verify</span>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      brand.category === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                      brand.category === 'standard' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {brand.category}
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use Solar Panel Hub?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Access</h4>
              <p className="text-gray-600">Find your manufacturer's verification system in one click</p>
            </div>
            
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Verification</h4>
              <p className="text-gray-600">Direct access to official authentication systems</p>
            </div>
            
            <div className="text-center">
              <div className="p-3 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Brands</h4>
              <p className="text-gray-600">Support for major solar panel manufacturers worldwide</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Can't find your brand? Contact us to add more manufacturers.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sun className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold">Solar Panel Hub</span>
          </div>
          <p className="text-gray-400 text-sm">
            Your trusted source for solar panel authentication and verification
          </p>
          <div className="mt-4 text-xs text-gray-500">
            © 2024 Solar Panel Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
