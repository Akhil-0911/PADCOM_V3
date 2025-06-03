import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-24 h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-medical-primary/20 animate-ping-slow"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-2 rounded-full bg-medical-primary/30 animate-ping"></div>
          
          {/* Inner spinning ring */}
          <div className="absolute inset-3 rounded-full border-4 border-medical-primary border-t-transparent animate-spin"></div>
          
          {/* Center medical cross */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 text-medical-primary animate-pulse">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 text-center">
          <div className="text-xl font-semibold text-medical-primary animate-pulse">
            Loading PADCOM
          </div>
          <div className="text-sm text-gray-500">
            Preparing your medical analysis environment...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 