import { QRCodeSVG } from 'qrcode.react';

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Badge({ visitor }) {
  return (
    <div className="badge-panel">
      <p className="badge-panel-label">Badge Preview</p>

      {!visitor ? (
        <div className="badge-empty">
          Check a visitor in to generate their badge here.
        </div>
      ) : (
        <>
          <div className="badge-card" key={visitor.id}>
            <div className="badge-hole" />
            <div className="badge-stamp">CHECKED IN</div>
            <div className="badge-top">
              <p className="badge-org">Reception · Visitor Pass</p>
              <p className="badge-name">{visitor.name}</p>
              {visitor.company && <p className="badge-company">{visitor.company}</p>}
            </div>
            <div className="badge-body">
              <div className="badge-row">
                <span>Visiting</span>
                <span>{visitor.host}</span>
              </div>
              <div className="badge-row">
                <span>Purpose</span>
                <span>{visitor.purpose}</span>
              </div>
              <div className="badge-row">
                <span>Arrived</span>
                <span>{formatTime(visitor.checkInTime)}</span>
              </div>
              <div className="badge-qr">
                <QRCodeSVG
                  value={`${visitor.id} | ${visitor.name} | ${visitor.checkInTime}`}
                  size={104}
                  fgColor="#1B2A32"
                />
              </div>
              <p className="badge-id">{visitor.id}</p>
            </div>
            <div className="badge-stub" />
          </div>

          <button className="print-btn" onClick={() => window.print()}>
            Print This Badge
          </button>
        </>
      )}
    </div>
  );
}
