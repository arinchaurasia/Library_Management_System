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
- **Manual Book Entry Form**: Form to add titles, authors, categories, ISBNs, and copy counts manually.
- **Issued Books Log**: Track all issued books, borrower names, student IDs, and mark items as returned.

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
│   └── advice.js       → Vercel Serverless Function for Gemini AI
├── index.html          → Main UI structure (Student & Admin Portals)
├── style.css           → Modern gradient & glassmorphic styling
├── script.js           → Core app logic, catalog management & AI integration
└── README.md           → Project documentation
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure & portal tabs |
| **CSS3** | Modern gradients, glassmorphism, responsive grid |
| **JavaScript (ES6)** | DOM manipulation, state management, search/filter |
| **localStorage** | Instant persistence for books & loan records |
| **Gemini AI API** | Intelligent book recommendations |

---

## 🔒 Vercel Deployment

To deploy on **Vercel** with secure AI key management:
1. Import this repository into Vercel.
2. Add `GEMINI_API_KEY` under **Project Settings → Environment Variables**.
3. Click **Deploy**.

---

Made by [Arin Chaurasia](https://github.com/arinchaurasia)
