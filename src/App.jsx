import { useState, useEffect, useMemo } from 'react';
import CheckInForm from './components/CheckInForm';
import Badge from './components/Badge';
import VisitorLog from './components/VisitorLog';
import CheckOut from './components/CheckOut';
import './App.css';

const STORAGE_KEY = 'visitor-module-log';

function loadVisitors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function nextBadgeId(visitors) {
  const n = visitors.length + 1;
  return `VIS-${String(n).padStart(4, '0')}`;
}

export default function App() {
  const [visitors, setVisitors] = useState(loadVisitors);
  const [tab, setTab] = useState('checkin');
  const [lastCheckedIn, setLastCheckedIn] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const inBuilding = useMemo(
    () => visitors.filter((v) => !v.checkOutTime).length,
    [visitors]
  );
  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return visitors.filter((v) => new Date(v.checkInTime).toDateString() === today).length;
  }, [visitors]);

  function handleCheckIn(entry) {
    const visitor = {
      ...entry,
      id: nextBadgeId(visitors),
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
    };
    setVisitors((prev) => [visitor, ...prev]);
    setLastCheckedIn(visitor);
  }

  function handleCheckOut(id) {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, checkOutTime: new Date().toISOString() } : v))
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-top">
          <div>
            <p className="eyebrow">Front Desk · Visitor Management Module</p>
            <h1>Reception Log</h1>
          </div>
          <div className="clock">
            <span className="clock-time">
              {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="clock-date">
              {now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="status-strip">
          <div className="status-item">
            <span className="status-value">{inBuilding}</span>
            <span className="status-label">In building</span>
          </div>
          <div className="status-divider" />
          <div className="status-item">
            <span className="status-value">{todayCount}</span>
            <span className="status-label">Signed in today</span>
          </div>
          <div className="status-divider" />
          <div className="status-item">
            <span className="status-value">{visitors.length}</span>
            <span className="status-label">Total logged</span>
          </div>
        </div>

        <nav className="tabs">
          <button
            className={tab === 'checkin' ? 'tab active' : 'tab'}
            onClick={() => setTab('checkin')}
          >
            Check In
          </button>
          <button
            className={tab === 'checkout' ? 'tab active' : 'tab'}
            onClick={() => setTab('checkout')}
          >
            Check Out
          </button>
          <button
            className={tab === 'log' ? 'tab active' : 'tab'}
            onClick={() => setTab('log')}
          >
            Visitor Log
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === 'checkin' && (
          <div className="checkin-layout">
            <CheckInForm onSubmit={handleCheckIn} />
            <Badge visitor={lastCheckedIn} />
          </div>
        )}
        {tab === 'checkout' && (
          <CheckOut visitors={visitors} onCheckOut={handleCheckOut} />
        )}
        {tab === 'log' && (
          <VisitorLog visitors={visitors} onCheckOut={handleCheckOut} />
        )}
      </main>

      <footer className="app-footer">
        Demo build — data stored locally in your browser only.
      </footer>
    </div>
  );
}
