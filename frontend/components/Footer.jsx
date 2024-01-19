import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div>
      <footer className="bg-success text-light py-4">
        <div className="container text-center fs-5 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
          <h3 className='fst-italic mb-3 mb-md-0'>WellnessBox</h3>

          <p className="mb-0">&copy; 2024 <span className='fst-italic'>WellnessBox</span> All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
