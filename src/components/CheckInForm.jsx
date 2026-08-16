import { useState } from 'react';

const PURPOSES = ['Meeting', 'Interview', 'Delivery', 'Vendor / Contractor', 'Other'];

const empty = { name: '', company: '', host: '', purpose: PURPOSES[0] };

export default function CheckInForm({ onSubmit }) {
  const [form, setForm] = useState(empty);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.host.trim()) return;
    onSubmit({ ...form, name: form.name.trim(), company: form.company.trim(), host: form.host.trim() });
    setForm(empty);
  }

  return (
    <form className="checkin-form" onSubmit={handleSubmit}>
      <h2>Check In a Visitor</h2>
      <p className="form-hint">A badge is generated the moment you submit.</p>

      <div className="field">
        <label htmlFor="name">Visitor name</label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Priya Nair"
          required
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Acme Corp"
          />
        </div>
        <div className="field">
          <label htmlFor="host">Visiting / host</label>
          <input
            id="host"
            value={form.host}
            onChange={(e) => update('host', e.target.value)}
            placeholder="Rohan Mehta"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="purpose">Purpose of visit</label>
        <select
          id="purpose"
          value={form.purpose}
          onChange={(e) => update('purpose', e.target.value)}
        >
          {PURPOSES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn">Check In &amp; Print Badge</button>
    </form>
  );
}
