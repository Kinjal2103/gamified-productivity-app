# 🎮 Gamified Productivity Web App

A full‑stack **gamified to‑do & productivity web application** designed to make task management engaging and motivating. The app combines classic productivity tools with **XP, levels, streaks**, and planned mini‑games & AI features to help users stay consistent and focused.

---

## 🚀 Features

### ✅ Core (Implemented)

* User authentication (JWT‑based login & signup)
* Create, update, delete tasks
* Task attributes:

  * Deadline
  * Priority level
  * Estimated time
* Smart **Next Task Suggestion** system
* Gamification system:

  * XP points for completing tasks
  * Levels based on XP
  * Daily streak tracking
* Responsive and interactive dashboard UI

---

## 🧩 Tech Stack

### Frontend

* React.js
* HTML, CSS, JavaScript
* Responsive UI design

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB (Mongoose ODM)

### Tools & Utilities

* Git & GitHub
* REST APIs
* Hoppscotch (API testing)

---

## 📂 Project Structure

```text
root/
├── backend/
│   ├── src/
│   │   ├── middleware/      # Authentication & request middlewares
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   └── utils/           # Helper / utility functions
│   ├── package.json
│   ├── package-lock.json
│   └── .env                 # Environment variables (ignored)
│
├── frontend/                # React (Vite) frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, media
│   │   ├── App.jsx          # Root React component
│   │   ├── App.css          # App-level styles
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
├── .gitignore
└── README.md
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kinjal2103/gamified-productivity-app.git
cd gamified-productivity-app
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

The app will run at:

* Frontend → `http://localhost:5173`
* Backend → `http://localhost:5000`

---

## 📈 Gamification Logic (Overview)

* Completing tasks → Gain XP
* XP thresholds → Level up
* Completing tasks daily → Maintain streaks
* Missing a day → Streak resets

---

### 🛠 Planned / Upcoming

* Focus mode (Pomodoro + distraction‑free UI)
* Calendar sync (Google Calendar)
* Streak rewards & badges
* Mini games (2048, Flappy Bird, etc.) as rewards
* AI‑based mood detection & song/movie recommendations
* 
## 🧠 Motivation Behind the Project

Traditional to‑do apps feel boring and repetitive. This project aims to **blend productivity with gaming psychology**, making consistency rewarding and enjoyable.

---

## 🔮 Future Scope

* Mobile app version (React Native)
* Social features (friends, leaderboards)
* AI task recommendations
* Personalized productivity insights

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 👤 Author

**Kinjal Agarwal**
B.Tech CSE, IIT Patna
GitHub: [https://github.com/Kinjal2103](https://github.com/Kinjal2103)

---

