# Zerodha Kite Clone (React + Vite + Tailwind CSS)

A responsive, front-end clone of **Zerodha Kite Dashboard**, built using **React**, **Vite**, and **Tailwind CSS**.
This project simulates the post-login trading dashboard experience with mock data for charts, holdings, orders, and funds — no backend is required.

---

## 🚀 Features

* Responsive dashboard layout built with **Tailwind CSS**
* **Login system** with dummy credentials stored in `AppContext.jsx`
* Mock data for:

  * Instruments
  * Indices (NIFTY 50, SENSEX)
  * Watchlist and stocks
  * Orders and positions
* Interactive components:

  * Header with notifications & basket dropdowns
  * Sidebar with live mock instruments
  * Chart section using SVG-based sparkline
  * Orders, Holdings, Funds, and Bids pages
* **Privacy mode** toggle
* **LocalStorage-based auth** persistence
* Built using **React Router v6**

---

🚀 Live Demo Explore the live version of zerodha kite website here: 
https://zerodha-kite-blue.vercel.app

## 🧠 Project Structure

```
kite-clone/
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # Global state (AppContext.jsx)
│   ├── pages/               # Page-level components (Dashboard, Orders, Funds, etc.)
│   ├── utils/               # Mock data utilities
│   ├── App.jsx              # Main app router
│   └── main.jsx             # Entry file for Vite
│
├── index.html
├── package.json
└── tailwind.config.js
```

---

## 🔐 Dummy Login Credentials

The login credentials are defined inside `src/context/AppContext.jsx` under `loginDetails`:

| User ID    | Password | Name         | Email                                                             |
| ---------- | -------- | ------------ | ----------------------------------------------------------------- |
| **XJY837** | pass123  | Arpit Sharma | [arpitsharma199714@gmail.com](mailto:arpitsharma199714@gmail.com) |
| **KV8317** | kite123  | Kite User    | [user@example.com](mailto:user@example.com)                       |

You can use either of the above credentials to log in.

---

## 🛠️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/kite-clone.git
cd kite-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## 📱 Responsive Design

This project is built entirely using **Tailwind CSS utility classes**, ensuring it’s fully responsive for:

* Desktop
* Tablet
* Mobile

No external CSS files are required.

---

## 🧩 Technologies Used

* **React 18**
* **Vite** (for fast bundling)
* **React Router DOM 6**
* **Tailwind CSS** (latest version)

---

## 🧾 License

This project is intended for **educational and demonstration purposes only**.
All brand names and trademarks belong to their respective owners.

---

### 👨‍💻 Author

**Arpit Sharma**
Frontend Developer | React Enthusiast
