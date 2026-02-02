'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // full screen bana de

      const initData = tg.initDataUnsafe;
      if (initData?.user) {
        setUser(initData.user);
      } else {
        setMessage('User data not found. Open in Telegram Mini App.');
      }
    } else {
      setMessage('Please open this link inside Telegram Mini App.');
    }
  }, []);

  const handleAccess = async () => {
    if (!user) {
      setMessage('No user data available.');
      return;
    }

    if (localStorage.getItem('accessed')) {
      setShowContent(true);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/sendToBot', {
        userId: user.id,
        firstName: user.first_name,
        username: user.username || 'N/A',
        languageCode: user.language_code || 'N/A',
      });

      if (res.data.success) {
        localStorage.setItem('accessed', 'true');
        setShowContent(true);
      } else {
        setMessage('Failed to register access. Try again.');
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center',
      background: '#121212',
      color: '#fff',
      minHeight: '100vh',
    }}>
      <h1 style={{ color: '#ff4081' }}>Exclusive Private Content</h1>

      <p style={{ margin: '20px 0' }}>
        Pehle hamare YouTube channel ko subscribe kar lo updates ke liye:
      </p>

      <a
        href="https://www.youtube.com/@Cielostatment?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#ff0000',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          marginBottom: '30px',
        }}
      >
        Subscribe @Cielostatment Now
      </a>

      <button
        onClick={handleAccess}
        disabled={loading || showContent}
        style={{
          padding: '14px 30px',
          background: showContent ? '#4caf50' : '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: loading || showContent ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        {loading ? 'Processing...' : showContent ? 'Access Granted!' : 'Access Private Content'}
      </button>

      {message && <p style={{ color: '#ff9800', margin: '10px 0' }}>{message}</p>}

      {showContent && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#1e1e1e',
          borderRadius: '12px',
          animation: 'fadeIn 0.8s',
        }}>
          <h2 style={{ color: '#ff4081' }}>Private Adult Content Here 🔥</h2>
          <p>Join these exclusive channels:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '15px 0' }}>
              <a href="https://t.me/+9oIxlOeKeSgyOWU8" target="_blank" rel="noopener noreferrer" style={{ color: '#8bc34a', textDecoration: 'none' }}>
                → Channel 1 (Join Now)
              </a>
            </li>
            <li style={{ margin: '15px 0' }}>
              <a href="https://t.me/+9RhmHe9iRwE1MmFk" target="_blank" rel="noopener noreferrer" style={{ color: '#8bc34a', textDecoration: 'none' }}>
                → Channel 2 (Join Now)
              </a>
            </li>
            <li style={{ margin: '15px 0' }}>
              <a href="https://t.me/+6aRUflYGBRo0MmU8" target="_blank" rel="noopener noreferrer" style={{ color: '#8bc34a', textDecoration: 'none' }}>
                → Channel 3 (Join Now)
              </a>
            </li>
          </ul>
          <p style={{ fontSize: '14px', color: '#aaa', marginTop: '20px' }}>
            Data saved successfully. Enjoy!
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
