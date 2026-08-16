import { useMemo, useState } from 'react';

function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function VisitorLog({ visitors, onCheckOut }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return visitors.filter((v) => {
      if (filter === 'in' && v.checkOutTime) return false;
      if (filter === 'out' && !v.checkOutTime) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.host.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q)
      );
    });
  }, [visitors, query, filter]);

  return (
    <div className="log-panel">
      <div className="log-controls">
        <input
          className="log-search"
          placeholder="Search by name, company, host, or badge ID…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="log-filter">
          <button
            className={filter === 'all' ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'in' ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setFilter('in')}
          >
            In building
          </button>
          <button
            className={filter === 'out' ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setFilter('out')}
          >
            Checked out
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="log-empty">No visitors match this view yet.</div>
      ) : (
        <table className="log-table">
          <thead>
            <tr>
              <th>Badge ID</th>
              <th>Visitor</th>
              <th>Host</th>
              <th>Arrived</th>
              <th>Departed</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>
                  {v.name}
                  {v.company && <span style={{ color: 'var(--ink-soft)' }}> · {v.company}</span>}
                </td>
                <td>{v.host}</td>
                <td>{formatDateTime(v.checkInTime)}</td>
                <td>{formatDateTime(v.checkOutTime)}</td>
                <td>
                  <span className={`pill ${v.checkOutTime ? 'out' : 'in'}`}>
                    {v.checkOutTime ? 'Checked out' : 'In building'}
                  </span>
                </td>
                <td>
                  <button
                    className="checkout-btn"
                    disabled={!!v.checkOutTime}
                    onClick={() => onCheckOut(v.id)}
                  >
                    Check out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
