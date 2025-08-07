import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/navbar';

const Home = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const token = localStorage.getItem('token');

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookmarks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookmarks', { url }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUrl('');
      fetchBookmarks();
    } catch (err) {
      alert('Failed to save bookmark');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookmarks();
    } catch (err) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div style={styles.container}>
        <Navbar />
      <h1>📚 My Bookmarks</h1>
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Save</button>
      </form>
      <div style={styles.bookmarkList}>
        {bookmarks.map((bm) => (
          <div key={bm._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <img src={bm.favicon} alt="icon" style={styles.favicon} />
              <a href={bm.url} target="_blank" rel="noopener noreferrer" style={styles.title}>
                {bm.title}
              </a>
            </div>
            <p style={styles.summary}>{bm.summary?.slice(0, 300) || 'No summary'}</p>
            <button onClick={() => handleDelete(bm._id)} style={styles.delete}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 40px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  bookmarkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  card: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  favicon: {
    width: '20px',
    height: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#333',
  },
  summary: {
    marginTop: '10px',
    color: '#555',
  },
  delete: {
    marginTop: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
