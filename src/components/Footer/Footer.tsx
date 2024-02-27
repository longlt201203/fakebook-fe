// Footer.tsx
import React from 'react';
import './Footer.css'; // Make sure to create and import your CSS file

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Fakebook - All rights reserved.</p>
        {/* You can add additional footer content here */}
      </div>
    </footer>
  );
};

export default Footer;
