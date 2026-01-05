'use client';

export default function PageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Transparent Blurred Background */}
      <div className="absolute inset-0  backdrop-blur-md"></div>
      
      {/* Content */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Smooth Spinner */}
        <div className="relative w-14 h-14">
          <svg 
            className="w-14 h-14 animate-spin" 
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
            
            {/* Background Light Circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="6"
            />
            
            {/* Gradient Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#spinnerGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="220"
              strokeDashoffset="73"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        
        {/* Loading Text */}
        <p className="text-sm font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

