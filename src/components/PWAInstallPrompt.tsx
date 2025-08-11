'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, CheckCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as NavigatorWithStandalone).standalone === true) {
      setIsInstalled(true);
      setIsStandalone(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  // Don't show if already installed or in standalone mode
  if (isInstalled || isStandalone || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <Download className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Install Solar Panel Hub
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Get the full app experience! Install Solar Panel Hub on your device for quick access, offline functionality, and a native app feel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleInstallClick}
              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Install App</span>
            </button>
            
            <button
              onClick={handleDismiss}
              className="px-4 py-3 text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>
          
          <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Smartphone className="h-3 w-3" />
              <span>Mobile App</span>
            </div>
            <div className="flex items-center space-x-2">
              <Monitor className="h-3 w-3" />
              <span>Desktop App</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3" />
              <span>Offline Ready</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
} 