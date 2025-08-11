'use client';

import { Wifi, WifiOff, RefreshCw, Home, Search, Info } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg">
            <WifiOff className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You&apos;re Offline
        </h1>
        
        <p className="text-gray-600 mb-6">
          Don&apos;t worry! Solar Panel Hub works offline too. You can still access previously loaded content and use the app features.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Wifi className="h-4 w-4 text-green-500" />
            <span>App is cached and works offline</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Search className="h-4 w-4 text-blue-500" />
            <span>Search through cached brands</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Info className="h-4 w-4 text-yellow-500" />
            <span>View brand information</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>Pro tip:</strong> Install Solar Panel Hub as an app for better offline experience!
          </p>
        </div>
      </div>
    </div>
  );
} 