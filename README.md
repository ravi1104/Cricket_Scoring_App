# Cricket Match Backend (NestJS + Mongoose + Redis)

A backend service built with **NestJS**, **Mongoose**, and **Redis** to manage cricket matches, commentary, and live updates.

## Features

- Start new matches with incremental 4-digit IDs (e.g., `0001`, `0002`)
- Add commentary to matches
- Publish commentary updates via Redis Pub/Sub
- Store last 10 commentary events in Redis for quick access
- Pause/Resume matches
- List ongoing/paused matches

---

## Requirements

- **Node.js** ≥ 18
- **MongoDB**
- **Redis**
- **npm** or **yarn**

---

## Installation

```bash
git clone https://github.com/ravi1104/Cricket_Scoring_App.git
cd backend
npm install
npm start
cd backend
npm install
npm run dev
