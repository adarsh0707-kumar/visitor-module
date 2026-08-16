import { useMemo, useState } from 'react';

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function CheckOut({ visitors, onCheckOut }) {
  const [query, setQuery] = useState('');
  const [justOut, setJustOut] = useState(null);

  const active = useMemo(
    () => visitors.filter((v) => !v.checkOutTime),
    [visitors]
  );

  const results = useMemo(() => {
    if (!query.trim()) return active;
    const q = query.toLowerCase();
    return active.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.host.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q)
    );
  }, [active, query]);

  function handleCheckOut(v) {
    onCheckOut(v.id);
    setJustOut({ ...v, checkOutTime: new Date().toISOString() });
  }

  return (
    <div className="checkout-layout">
      <div className="log-panel">
        <div className="log-controls">
          <input
            className="log-search"
            placeholder="Search visitors currently in the building…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {results.length === 0 ? (
          <div className="log-empty">
            {active.length === 0
              ? 'No visitors are currently checked in.'
              : 'No visitors match this search.'}
          </div>
        ) : (
          <table className="log-table">
            <thead>
              <tr>
                <th>Badge ID</th>
                <th>Visitor</th>
                <th>Host</th>
                <th>Arrived</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>
                    {v.name}
                    {v.company && <span style={{ color: 'var(--ink-soft)' }}> · {v.company}</span>}
                  </td>
                  <td>{v.host}</td>
                  <td>{formatTime(v.checkInTime)}</td>
                  <td>
                    <button className="checkout-btn" onClick={() => handleCheckOut(v)}>
                      Check out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="badge-panel">
        <p className="badge-panel-label">Departure Confirmation</p>
        {!justOut ? (
          <div className="badge-empty">
            Check a visitor out to see their departure confirmation here.
          </div>
        ) : (
          <div className="badge-card checkout-card" key={justOut.checkOutTime}>
            <div className="badge-hole" />
            <div className="badge-stamp checkout-stamp">CHECKED OUT</div>
            <div className="badge-top">
              <p className="badge-org">Reception · Departure</p>
              <p className="badge-name">{justOut.name}</p>
              {justOut.company && <p className="badge-company">{justOut.company}</p>}
            </div>
            <div className="badge-body">
              <div className="badge-row">
                <span>Visited</span>
                <span>{justOut.host}</span>
              </div>
              <div className="badge-row">
                <span>Arrived</span>
                <span>{formatTime(justOut.checkInTime)}</span>
              </div>
              <div className="badge-row">
                <span>Departed</span>
                <span>{formatTime(justOut.checkOutTime)}</span>
              </div>
              <p className="badge-id">{justOut.id}</p>
            </div>
            <div className="badge-stub" />
          </div>
        )}
      </div>
    </div>
  );
}
