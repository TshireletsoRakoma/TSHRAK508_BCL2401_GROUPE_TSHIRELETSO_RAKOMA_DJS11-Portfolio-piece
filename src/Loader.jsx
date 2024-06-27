import React from 'react';
import './Loader.css'; // Import CSS for styling

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
