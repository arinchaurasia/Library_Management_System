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
- **💬 Add Books via AI Chatbot**: Librarians can add books directly by talking to the AI in natural language (e.g. *"Add 5 copies of Deep Learning by Ian Goodfellow under Computer Science"*).
- **📸 Multimodal AI Vision Cover Scanner**: Upload a photo of a book cover or purchase receipt (PNG, JPG, PDF) and Gemini 1.5 Flash Vision auto-detects title, author, category, ISBN, and copy counts!
- **Manual Book Entry Form**: Form to add titles, authors, categories, ISBNs, and copy counts manually.
- **Issued Books Log**: Track all issued books, borrower names, student IDs, and mark items as returned.

---

## ✨ All Gemini AI Features Integrated

1. **🤖 Conversational AI Book Assistant**: Ask stock availability (*"Is Clean Code available?"*), category queries, or get personalized recommendations.
2. **➕ AI Natural Language Book Creation**: Librarians can command the assistant to add books to inventory with automatic parsing.
3. **✨ AI Book Summaries & Key Takeaways**: Click **"✨ AI Summary"** on any catalog card to view a modal with overview, top 3 key takeaways, reading duration, and recommended audience.
4. **🧠 Interactive AI Book Trivia Quizzes**: Click **"🧠 AI Quiz"** to generate interactive 2-question trivia quizzes for any book with real-time answer checking & explanations.
5. **📸 Multimodal AI Vision Scanner**: Automatically OCR and parse book covers and receipts into full library records (`api/scan-book.js`).
6. **⚡ Offline & Local Fallback Engine**: Zero connection errors — functions seamlessly on Vercel with real Gemini API keys or locally via intelligent mock fallback handlers.

---

## 🚀 How to Run

1. Clone or download this project folder.
2. Open `index.html` directly in your web browser or open with Live Server in VS Code.
3. Switch between **Student Portal** and **Librarian Portal** using the toggle pill at the top!

---

## 📁 Project Structure

```
Library Management System/
├── api/
│   ├── advice.js       → Vercel Serverless Function for Gemini AI Text & Assistant
│   └── scan-book.js    → Vercel Serverless Function for Gemini 1.5 Flash Vision Scanning
├── index.html          → Main UI structure (Student & Admin Portals + AI Modal)
├── style.css           → Modern gradient & glassmorphic styling + Modal styles
├── script.js           → Core app logic, catalog management, quiz & AI integration
└── README.md           → Project documentation
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure & portal tabs |
| **CSS3** | Modern gradients, glassmorphism, responsive grid, modal popups |
| **JavaScript (ES6)** | DOM manipulation, state management, search/filter |
| **localStorage** | Instant persistence for books & loan records |
| **Gemini AI API** | Intelligent recommendations, summaries, quizzes, and multimodal vision scanning |

---

## 🔒 Vercel Deployment

To deploy on **Vercel** with secure AI key management:
1. Import this repository into Vercel.
2. Add `GEMINI_API_KEY` under **Project Settings → Environment Variables**.
3. Click **Deploy**.

---

Made by [Arin Chaurasia](https://github.com/arinchaurasia)
