import React from 'react';
import '../loading.css'; // Import the loading CSS

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img
        src="https://i.postimg.cc/ThJKmL0V/logo-png.png"
        alt="Loading..."
        className="loading-logo"
      />
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;
