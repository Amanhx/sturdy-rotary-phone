'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [showLinks, setShowLinks] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      const initData = window.Telegram.WebApp.initDataUnsafe;
      setUserData(initData.user); // { id, first_name, username, etc. }
    } else {
      setError('Open this in Telegram Mini App for full functionality.');
    }
  }, []);

  const handleAccessContent = async () => {
    if (!userData) {
      setError('User data not available.');
      return;
    }

    try {
      await axios.post('/api/sendToBot', { user: userData });
      setShowLinks(true);
    } catch (err) {
      setError('Failed to access content. Try again.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Private Content App</h1>
      
      <p>First, subscribe to our YouTube channel for updates:</p>
      <a 
        href="https://www.youtube.com/@Cielostatment?sub_confirmation=1" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'block', margin: '10px auto', padding: '10px', background: '#FF0000', color: 'white', textDecoration: 'none' }}
      >
        Subscribe to @Cielostatment
      </a>

      <button 
        onClick={handleAccessContent} 
        style={{ padding: '10px 20px', margin: '20px 0', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Access Private Content
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showLinks && (
        <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
          <h2>Private Content Here</h2>
          <p>Join these exclusive adult channels:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://t.me/+9oIxlOeKeSgyOWU8" target="_blank" rel="noopener noreferrer">Channel 1</a></li>
            <li><a href="https://t.me/+9RhmHe9iRwE1MmFk" target="_blank" rel="noopener noreferrer">Channel 2</a></li>
            <li><a href="https://t.me/+6aRUflYGBRo0MmU8" target="_blank" rel="noopener noreferrer">Channel 3</a></li>
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
