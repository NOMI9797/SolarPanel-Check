'use client';

import { useState, useEffect } from 'react';
import { Sun, Zap, Shield, Globe, Search, ArrowRight, Battery, Filter, Info, HelpCircle, Star, CheckCircle } from 'lucide-react';
import { solarBrands, SolarBrand } from '@/config/solarBrands';
import SerialScanner from '@/components/SerialScanner';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'premium' | 'standard' | 'budget'>('all');
  const [showHelp, setShowHelp] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBrandClick = (url: string) => {
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBrandDetected = (brand: SolarBrand) => {
    // Redirect to the brand's authentication page
    window.open(brand.url, '_blank', 'noopener,noreferrer');
  };

  // Generate search suggestions based on brands and features
  useEffect(() => {
    if (searchQuery.trim()) {
      const suggestions: string[] = [];
      solarBrands.forEach(brand => {
        if (brand.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          suggestions.push(brand.name);
        }
        brand.features.forEach(feature => {
          if (feature.toLowerCase().includes(searchQuery.toLowerCase())) {
            suggestions.push(feature);
          }
        });
      });
      setSearchSuggestions([...new Set(suggestions)].slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const filteredBrands = solarBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Brands', count: solarBrands.length, icon: Globe, color: 'bg-blue-100 text-blue-800' },
    { id: 'premium', name: 'Premium', count: solarBrands.filter(b => b.category === 'premium').length, icon: Star, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'standard', name: 'Standard', count: solarBrands.filter(b => b.category === 'standard').length, icon: Shield, color: 'bg-blue-100 text-blue-800' },
    { id: 'budget', name: 'Budget', count: solarBrands.filter(b => b.category === 'budget').length, icon: Battery, color: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Solar Panel Hub</h1>
                <p className="text-xs sm:text-sm text-gray-600">Authentication & Information Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Help</span>
              </button>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure Verification</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Help Tooltip */}
      {showHelp && (
        <div className="bg-blue-50 border-b border-blue-200 px-3 sm:px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 text-sm">
                <strong>How to use:</strong> Enter your solar panel serial number above, or browse brands below. 
                Each brand card will take you to their official verification system.
              </p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors duration-200 self-start sm:self-auto"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg">
              <Zap className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Find Your Solar Panel Brand
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6 px-4">
            Select your solar panel manufacturer below to access their official authentication 
            and barcode verification system. Get instant access to product information and warranty details.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-gray-500 px-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Instant Brand Detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Official Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-purple-500" />
              <span>Global Brands</span>
            </div>
          </div>
        </div>

        {/* Serial Number Scanner */}
        <SerialScanner onBrandDetected={handleBrandDetected} />

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Find Your Brand</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Search by name, features, or description</span>
                <span className="sm:hidden">Search brands</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for your solar panel brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white text-base"
                />
                
                {/* Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                      >
                        <div className="flex items-center space-x-2">
                          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-700 text-sm sm:text-base">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'premium' | 'standard' | 'budget')}
                  className="flex-1 sm:flex-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white text-base"
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
        </div>

        {/* Results Count */}
        <div className="text-center mb-4 sm:mb-6 px-4">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing <span className="font-semibold text-gray-900">{filteredBrands.length}</span> of <span className="font-semibold text-gray-900">{solarBrands.length}</span> brands
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className={`group relative bg-white rounded-xl border-2 ${brand.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95`}
              onClick={() => handleBrandClick(brand.url)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="p-4 sm:p-6 relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl">{brand.logo}</div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      brand.category === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                      brand.category === 'standard' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {brand.category}
                    </div>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {brand.name}
                </h3>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {brand.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {brand.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Click to verify</span>
                  </span>
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-lg border border-gray-100 px-4">
            <Search className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {searchQuery ? `No results found for "${searchQuery}"` : 'Try adjusting your search or filter criteria'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
              >
                Clear Filters
              </button>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
                >
                  Clear Search
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-4 text-xs sm:text-sm text-gray-500">
                💡 Try searching for: <span className="font-medium">Longi</span>, <span className="font-medium">Canadian</span>, <span className="font-medium">Jinko</span>, or <span className="font-medium">ARM</span>
              </div>
            )}
          </div>
        )}

        {/* Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use Solar Panel Hub?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="p-3 bg-blue-100 rounded-full w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Easy Access</h4>
              <p className="text-sm sm:text-base text-gray-600">Find your manufacturer&apos;s verification system in one click</p>
            </div>
            
            <div className="text-center group">
              <div className="p-3 bg-green-100 rounded-full w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Secure Verification</h4>
              <p className="text-sm sm:text-base text-gray-600">Direct access to official authentication systems</p>
            </div>
            
            <div className="text-center group">
              <div className="p-3 bg-yellow-100 rounded-full w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Global Brands</h4>
              <p className="text-sm sm:text-base text-gray-600">Support for major solar panel manufacturers worldwide</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Can&apos;t find your brand? Contact us to add more manufacturers.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
            Contact Support
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3 sm:mb-4">
            <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
            <span className="text-base sm:text-lg font-semibold">Solar Panel Hub</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
            Your trusted source for solar panel authentication and verification
          </p>
          <div className="text-xs text-gray-500">
            © 2024 Solar Panel Hub. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}
