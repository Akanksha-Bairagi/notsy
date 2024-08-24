import React from 'react';
import { Link } from 'react-router-dom';

// Define the styles as JavaScript objects
const navbarStyle = {
  position: 'sticky',  // Make it stick to the top
  top: 0,
  left: 0,  // Ensure it starts from the very left
  right: 0, // Ensure it extends to the very right
  width: '100%',
  backgroundColor:'#5072A7',  // Dark background for the navbar
  color: 'white',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',  // Space between items
  alignItems: 'center',
  zIndex: 1000,  // Ensure it stays above other content
  boxSizing: 'border-box',  // Make padding included in width
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '10px 15px',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#555',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
};

const buttonHoverStyle = {
  backgroundColor: '#777',
};

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/journals/new" style={linkStyle}>Create Journal</Link>

      <button 
        style={buttonStyle} 
        onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        Option 1
      </button>
    </nav>
  );
}

export default Navbar;
