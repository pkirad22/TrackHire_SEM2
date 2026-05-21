// src/Components/Loader.jsx
import React from 'react';

export default function Loader({ color = "bg-indigo-600", size = "h-2 w-2" }) {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className={`${size} ${color} rounded-full animate-bounce`} style={{ animationDelay: '0s', animationDuration: '0.8s' }}></div>
      <div className={`${size} ${color} rounded-full animate-bounce`} style={{ animationDelay: '0.15s', animationDuration: '0.8s' }}></div>
      <div className={`${size} ${color} rounded-full animate-bounce`} style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}></div>
    </div>
  );
}