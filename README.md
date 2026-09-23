# 📚 Smart Library Management System

A clean, modern, and simple Library Management System built with plain HTML, CSS, and JavaScript. Features **Student Portal**, **Librarian / Admin Portal**, and **Gemini AI Book Recommendations**.

Built with no frameworks or complex setup — runs directly in your browser!

---

## 🌟 Portals & Features

### 🎓 1. Student Portal
- **Browse & Search Catalog**: Search by book title, author, or filter by categories (*Fiction, Computer Science, Science, History, Self-Help*).
- **Borrow Books**: Click "Borrow Book" to issue books instantly (sets a 14-day return due date).
- **My Borrowed Books**: View your active loans and return books with a single click.
- **✨ AI Book Recommender**: Ask Gemini AI for personalized book suggestions based on any topic or interest!

### 🔑 2. Librarian / Admin Portal
- **Library Inventory Dashboard**: Real-time stats showing Total Books, Available Copies, and Issued Books.
- **Add New Books**: Easily add new titles, authors, categories, ISBNs, and copy counts.
- **Issued Books Log**: Track all currently issued out books and mark items as returned.
- **Inventory Control**: Delete or manage existing library books.

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
