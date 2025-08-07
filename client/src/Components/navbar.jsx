import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🔖 LinkSaver</h2>
      <div>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#333',
    color: 'white',
  },
  logo: {
    margin: 0,
  },
  link: {
    marginRight: '15px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Navbar;
