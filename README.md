# Visitor Management Module — Working Demo

A functional preview of the **Visitor Management** module described in the "Visitor, Task, CRM" project brief — check-in/check-out, instant badge generation, QR codes, and a searchable visitor history, built as a standalone proof of concept ahead of the full three-module system (Task Management + lightweight CRM).

**Live demo:** https://visitor-module-seven.vercel.app/
**Repo:** https://github.com/adarsh0707-kumar/visitor-module

## What it does

- **Check in a visitor** — name, company, host, and purpose of visit
- **Instant badge generation** — a printable ID badge with a unique badge number and QR code, generated the moment a visitor checks in
- **Searchable visitor log** — filter by "in building" / "checked out", search by name, company, host, or badge ID
- **Check-out flow** — mark a visitor as departed from the log
- **Live status strip** — visitors currently in the building, signed in today, and total logged

## Stack

- React 19 + Vite
- `qrcode.react` for badge QR codes
- Plain CSS (custom properties, no framework) — kept dependency-light for a fast demo build
- Data persisted to `localStorage` for this demo; in the full build this maps directly onto a REST API + PostgreSQL table, matching the shared-database architecture requested in the brief

## Running locally

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
npm run preview
```

## Notes for the full project

This is a scoped demo of one module to show working code, not the final architecture. For the complete "Visitor, Task, CRM" system this would be rebuilt with:

- A Node/Express (or similar) REST API backing all three modules
- PostgreSQL as the shared relational database
- Single sign-on across Visitor, Task, and CRM modules
- Real badge printing via a connected thermal/label printer instead of browser print

---

Built by [Adarsh Kumar](https://github.com/adarsh0707-kumar) as a working sample for a Freelancer.com proposal.
