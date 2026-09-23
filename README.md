# 📚 ShelfSense: AI-Powered Smart Library Management System

**ShelfSense** is an AI-powered, modern, and simple Library Management System built with plain HTML, CSS, and JavaScript. Features **Student Portal**, **Librarian / Admin Portal**, and a **Right-Side Gemini AI Assistant Widget**.

Built with no complex frameworks — runs directly in your browser!

---

## 🌟 Portals & Features

### 🎓 1. Student Portal
- **Browse & Search Catalog**: Search by book title, author, or filter by categories (*Fiction, Computer Science, Science, History, Self-Help*).
- **Borrow Books with Name & ID**: Issue books instantly with Student Name & ID tracking and automated 14-day due date calculation.
- **My Borrowed Books & Overdue Tracker**: View active loans, overdue fine alerts (`₹20/day`), and return books with a single click.
- **🤖 ShelfSense AI Chatbot**: Ask the AI chatbot if any book is available, check stock count, or ask for recommendations! *(Student portal restricts book creation actions for security)*.

### 🔑 2. Librarian / Admin Portal
- **Library Inventory Dashboard**: Real-time stats showing Total Books, Available Copies, and Issued Books out.
- **🖼️ Book Cover Photo Rendering**: Displays book cover photos on every book card across all catalog and inventory views.
- **💬 Add Books via AI Chatbot**: Librarians can add books directly by talking to the AI in natural language.
- **📸 Multimodal AI Vision Cover Scanner**: Upload a photo of a book cover or purchase receipt (PNG, JPG, PDF) to auto-fill book details & cover preview!
- **Manual Book Entry Form**: Form to add titles, authors, categories, ISBNs, copy counts, and custom cover image URLs.
- **Issued Books Log**: Track all issued books, borrower names, student IDs, and mark items as returned.

---

## ✨ All Gemini AI & Firebase Features

1. **🤖 Conversational AI Book Assistant**: Ask stock availability (*"Is Clean Code available?"*), category queries, or get personalized recommendations.
2. **➕ AI Natural Language Book Creation**: Librarians can command the assistant to add books to inventory with automatic parsing.
3. **✨ AI Book Summaries & Key Takeaways**: Click **"✨ AI Summary"** on any catalog card to view a modal with overview, top 3 key takeaways, reading duration, and recommended audience.
4. **🧠 Interactive AI Book Trivia Quizzes**: Click **"🧠 AI Quiz"** to generate interactive 2-question trivia quizzes for any book with real-time answer checking & explanations.
5. **📸 Multimodal AI Vision Scanner**: Automatically OCR and parse book covers and receipts into full library records (`api/scan-book.js`).
6. **🔑 Firebase Google Authentication**: 1-click Sign in with Google popup with live profile avatar & auto-filling student names on book borrowing.
7. **🔥 Realtime Firebase Integration**: Real-time cloud synchronization for inventory and borrowed logs across multiple devices with fallback to `localStorage`.

---

## 📌 Next Steps Guide

### Step 1: Connect Firebase Realtime Database (Optional for Cloud Sync)
1. Open [Firebase Console](https://console.firebase.google.com/).
2. Click **Create Project** and enter project name `ShelfSense`.
3. Go to **Build → Realtime Database → Create Database** (Choose test mode: `{ ".read": true, ".write": true }`).
4. Go to **Project Settings (⚙️) → Web App (</>) → Register App**.
5. Copy your credentials into `firebase-config.js` in your project folder:
   ```javascript
   var firebaseConfig = {
       apiKey: "YOUR_FIREBASE_API_KEY",
       authDomain: "your-app.firebaseapp.com",
       databaseURL: "https://your-app-default-rtdb.firebaseio.com",
       projectId: "your-app-id",
       storageBucket: "your-app.appspot.com",
       messagingSenderId: "1234567890",
       appId: "1:1234567890:web:abcdef"
   };
   ```

### Step 2: Deploy to Vercel (For AI API Endpoints)
1. Push your repository to GitHub: `git push origin main`.
2. Go to [Vercel](https://vercel.com/) and click **Add New → Project**.
3. Import `arinchaurasia/Library_Management_System`.
4. Add Environment Variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `Your_Gemini_API_Key`
5. Click **Deploy**!

---

## 📁 Project Structure

```
Library Management System/
├── api/
│   ├── advice.js       → Vercel Serverless Function for Gemini AI Text & Assistant
│   └── scan-book.js    → Vercel Serverless Function for Gemini 1.5 Flash Vision Scanning
├── index.html          → Main UI structure (Student & Admin Portals + AI Modal)
├── style.css           → Modern gradient & glassmorphic styling + Book Covers & Modal
├── script.js           → Core app logic, catalog management, quiz & AI integration
├── firebase-config.js  → Firebase Realtime Database setup & credentials
└── README.md           → Project documentation
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure & portal tabs |
| **CSS3** | Modern gradients, glassmorphism, responsive grid, book covers |
| **JavaScript (ES6)** | DOM manipulation, state management, search/filter |
| **Firebase Realtime DB** | Cloud database synchronization across devices |
| **localStorage** | Instant local offline persistence |
| **Gemini AI API** | Intelligent recommendations, summaries, quizzes, and vision scanning |

---

Made by [Arin Chaurasia](https://github.com/arinchaurasia)
