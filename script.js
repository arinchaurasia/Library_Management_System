/*
    Smart Library Management System
    - Student & Librarian Dual Portals
    - Pre-seeded Sample Books + localStorage Persistence
    - Book Issue / Return Tracking
    - AI Book Recommender via Gemini API
*/

// Initial Sample Books Catalog
var sampleBooks = [
    { id: "B101", title: "Clean Code", author: "Robert C. Martin", category: "Computer Science", totalCopies: 5, availableCopies: 3 },
    { id: "B102", title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Computer Science", totalCopies: 4, availableCopies: 2 },
    { id: "B103", title: "Atomic Habits", author: "James Clear", category: "Self-Help", totalCopies: 6, availableCopies: 4 },
    { id: "B104", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", totalCopies: 3, availableCopies: 1 },
    { id: "B105", title: "Sapiens: A Brief History", author: "Yuval Noah Harari", category: "History", totalCopies: 5, availableCopies: 5 },
    { id: "B106", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", totalCopies: 4, availableCopies: 4 }
];


// ========================
//  DOM Elements
// ========================

// Portal Switchers
var studentTabBtn = document.getElementById("studentTabBtn");
var adminTabBtn   = document.getElementById("adminTabBtn");
var studentPortal = document.getElementById("studentPortal");
var adminPortal   = document.getElementById("adminPortal");

// Stats
var statTotalBooks     = document.getElementById("statTotalBooks");
var statAvailableBooks = document.getElementById("statAvailableBooks");
var statIssuedBooks    = document.getElementById("statIssuedBooks");

// Student View
var searchInput     = document.getElementById("searchInput");
var categoryFilter  = document.getElementById("categoryFilter");
var catalogList     = document.getElementById("catalogList");
var myBorrowedList  = document.getElementById("myBorrowedList");

// AI Chatbot Sidebar View
var chatInput   = document.getElementById("chatInput");
var sendChatBtn = document.getElementById("sendChatBtn");
var chatHistory = document.getElementById("chatHistory");

// Admin View
var bookTitle           = document.getElementById("bookTitle");
var bookAuthor          = document.getElementById("bookAuthor");
var bookCategory        = document.getElementById("bookCategory");
var bookIsbn            = document.getElementById("bookIsbn");
var bookCopies          = document.getElementById("bookCopies");
var addBookBtn          = document.getElementById("addBookBtn");
var issuedLogList       = document.getElementById("issuedLogList");
var adminInventoryList  = document.getElementById("adminInventoryList");


// State & Storage
var books = [];
var borrowedBooks = [];
var currentPortal = "student";

var quickChipsContainer = document.getElementById("quickChipsContainer");
var chatbotSubtitle     = document.getElementById("chatbotSubtitle");


// ========================
//  Initialization
// ========================

function init() {
    loadData();
    setupEventListeners();
    renderAll();
    renderQuickChips();
}

function loadData() {
    var storedBooks = localStorage.getItem("lib_books");
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    } else {
        books = sampleBooks;
        saveBooks();
    }

    var storedBorrowed = localStorage.getItem("lib_borrowed");
    if (storedBorrowed) {
        borrowedBooks = JSON.parse(storedBorrowed);
    }
}

function saveBooks() {
    localStorage.setItem("lib_books", JSON.stringify(books));
}

function saveBorrowed() {
    localStorage.setItem("lib_borrowed", JSON.stringify(borrowedBooks));
}


// ========================
//  Event Listeners
// ========================

function setupEventListeners() {
    studentTabBtn.addEventListener("click", function() { switchPortal("student"); });
    adminTabBtn.addEventListener("click", function() { switchPortal("admin"); });

    searchInput.addEventListener("input", renderCatalog);
    categoryFilter.addEventListener("change", renderCatalog);

    addBookBtn.addEventListener("click", addNewBook);

    sendChatBtn.addEventListener("click", function() {
        sendChatMessage(chatInput.value.trim());
    });

    chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendChatMessage(chatInput.value.trim());
        }
    });
}


// ========================
//  Portal Switcher
// ========================

function switchPortal(portal) {
    currentPortal = portal;
    if (portal === "student") {
        studentTabBtn.classList.add("active");
        adminTabBtn.classList.remove("active");
        studentPortal.classList.add("active");
        adminPortal.classList.remove("active");
        if (chatbotSubtitle) chatbotSubtitle.innerText = "Check availability & get recommendations";
    } else {
        adminTabBtn.classList.add("active");
        studentTabBtn.classList.remove("active");
        adminPortal.classList.add("active");
        studentPortal.classList.remove("active");
        if (chatbotSubtitle) chatbotSubtitle.innerText = "Check availability, recommendations & add books";
    }
    renderQuickChips();
}

function renderQuickChips() {
    if (!quickChipsContainer) return;
    if (currentPortal === "student") {
        quickChipsContainer.innerHTML = ''
            + '<button class="chip-btn" onclick="sendQuickChip(\'Is Clean Code available?\')">Is Clean Code available?</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Which Computer Science books are in stock?\')">CS books in stock?</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Recommend a good self-help book\')">Recommend self-help book</button>';
    } else {
        quickChipsContainer.innerHTML = ''
            + '<button class="chip-btn" onclick="sendQuickChip(\'Add 3 copies of Clean Architecture by Robert Martin under Computer Science\')">➕ Add book via AI Chat</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Is Clean Code available?\')">Is Clean Code available?</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Which Computer Science books are in stock?\')">CS books in stock?</button>';
    }
}


// ========================
//  Render Master Function
// ========================

function renderAll() {
    renderStats();
    renderCatalog();
    renderMyBorrowed();
    renderAdminInventory();
    renderIssuedLog();
}


// ========================
//  Render Stats
// ========================

function renderStats() {
    var totalCount = 0;
    var availableCount = 0;

    for (var i = 0; i < books.length; i++) {
        totalCount += books[i].totalCopies;
        availableCount += books[i].availableCopies;
    }

    var issuedCount = totalCount - availableCount;

    statTotalBooks.innerText = totalCount;
    statAvailableBooks.innerText = availableCount;
    statIssuedBooks.innerText = issuedCount;
}


// ========================
//  Student: Catalog Render
// ========================

function renderCatalog() {
    var query = searchInput.value.toLowerCase().trim();
    var category = categoryFilter.value;

    catalogList.innerHTML = "";

    var filtered = books.filter(function(book) {
        var matchesQuery = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        var matchesCategory = (category === "All" || book.category === category);
        return matchesQuery && matchesCategory;
    });

    if (filtered.length === 0) {
        catalogList.innerHTML = '<p class="empty-msg">No matching books found in library.</p>';
        return;
    }

    for (var i = 0; i < filtered.length; i++) {
        var book = filtered[i];
        var isAvailable = book.availableCopies > 0;

        var card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = ''
            + '<div class="book-info">'
            + '    <h4>' + book.title + '</h4>'
            + '    <div class="author">by ' + book.author + '</div>'
            + '</div>'
            + '<div class="book-meta">'
            + '    <span class="badge badge-category">' + book.category + '</span>'
            + '    <span class="badge ' + (isAvailable ? 'badge-available' : 'badge-issued') + '">'
            +          (isAvailable ? book.availableCopies + ' Available' : 'Out of Stock')
            + '    </span>'
            + '</div>'
            + (isAvailable
                ? '<button class="action-btn borrow-btn" onclick="borrowBook(\'' + book.id + '\')">📖 Borrow Book</button>'
                : '<button class="action-btn" disabled style="opacity: 0.5; cursor: not-allowed;">Unavailable</button>');

        catalogList.appendChild(card);
    }
}


// ========================
//  Student: Borrow Book
// ========================

function borrowBook(bookId) {
    var book = books.find(function(b) { return b.id === bookId; });

    if (!book || book.availableCopies <= 0) {
        alert("Sorry, this book is currently out of stock!");
        return;
    }

    var studentName = prompt("Enter your Name:");
    if (!studentName || !studentName.trim()) return;

    var studentId = prompt("Enter your Student ID (e.g. ST-101):") || "ST-REG";

    book.availableCopies -= 1;

    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14-day loan period

    var item = {
        id: "BR-" + Date.now(),
        bookId: book.id,
        title: book.title,
        author: book.author,
        studentName: studentName.trim(),
        studentId: studentId.trim(),
        borrowDate: new Date().toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString(),
        dueTimestamp: dueDate.getTime()
    };

    borrowedBooks.push(item);

    saveBooks();
    saveBorrowed();
    renderAll();

    alert("Successfully borrowed '" + book.title + "'! Return due on " + item.dueDate);
}


// ========================
//  Student: My Borrowed Books
// ========================

function renderMyBorrowed() {
    myBorrowedList.innerHTML = "";

    if (borrowedBooks.length === 0) {
        myBorrowedList.innerHTML = '<p class="empty-msg">You have not borrowed any books yet.</p>';
        return;
    }

    for (var i = 0; i < borrowedBooks.length; i++) {
        var item = borrowedBooks[i];

        var card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = ''
            + '<div class="book-info">'
            + '    <h4>' + item.title + '</h4>'
            + '    <div class="author">by ' + item.author + '</div>'
            + '</div>'
            + '<div class="book-meta">'
            + '    <span style="font-size: 11px; color: #64748b;">Due: ' + item.dueDate + '</span>'
            + '</div>'
            + '<button class="action-btn return-btn" onclick="returnBook(\'' + item.id + '\')">↩️ Return Book</button>';

        myBorrowedList.appendChild(card);
    }
}


// ========================
//  Return Book
// ========================

function returnBook(borrowId) {
    var index = borrowedBooks.findIndex(function(b) { return b.id === borrowId; });

    if (index === -1) return;

    var item = borrowedBooks[index];
    var book = books.find(function(b) { return b.id === item.bookId; });

    if (book) {
        book.availableCopies += 1;
    }

    borrowedBooks.splice(index, 1);

    saveBooks();
    saveBorrowed();
    renderAll();

    alert("Thank you! Book returned successfully.");
}


// ========================
//  Admin: Add New Book
// ========================

function addNewBook() {
    var title    = bookTitle.value.trim();
    var author   = bookAuthor.value.trim();
    var category = bookCategory.value;
    var isbn     = bookIsbn.value.trim() || ("B" + (books.length + 101));
    var copies   = Number(bookCopies.value);

    if (!title || !author || !category || copies <= 0) {
        alert("Please fill in all book details with valid values.");
        return;
    }

    var newBook = {
        id: isbn,
        title: title,
        author: author,
        category: category,
        totalCopies: copies,
        availableCopies: copies
    };

    books.push(newBook);

    // Reset Form
    bookTitle.value = "";
    bookAuthor.value = "";
    bookCategory.value = "";
    bookIsbn.value = "";
    bookCopies.value = 1;

    saveBooks();
    renderAll();

    alert("Book '" + title + "' added to library inventory!");
}


// ========================
//  Admin: Inventory & Logs
// ========================

function renderAdminInventory() {
    adminInventoryList.innerHTML = "";

    if (books.length === 0) {
        adminInventoryList.innerHTML = '<p class="empty-msg">No books in inventory.</p>';
        return;
    }

    for (var i = 0; i < books.length; i++) {
        var book = books[i];

        var card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = ''
            + '<div class="book-info">'
            + '    <h4>' + book.title + '</h4>'
            + '    <div class="author">Author: ' + book.author + ' | ID: ' + book.id + '</div>'
            + '</div>'
            + '<div class="book-meta">'
            + '    <span class="badge badge-category">' + book.category + '</span>'
            + '    <span style="font-size: 11px; font-weight: 600;">' + book.availableCopies + ' / ' + book.totalCopies + ' Copies</span>'
            + '</div>'
            + '<button class="action-btn delete-btn" onclick="deleteBook(\'' + book.id + '\')">🗑️ Delete</button>';

        adminInventoryList.appendChild(card);
    }
}

function deleteBook(bookId) {
    if (!confirm("Are you sure you want to delete this book from inventory?")) return;

    books = books.filter(function(b) { return b.id !== bookId; });
    borrowedBooks = borrowedBooks.filter(function(b) { return b.bookId !== bookId; });

    saveBooks();
    saveBorrowed();
    renderAll();
}

function renderIssuedLog() {
    issuedLogList.innerHTML = "";

    if (borrowedBooks.length === 0) {
        issuedLogList.innerHTML = '<p class="empty-msg">No books currently issued out.</p>';
        return;
    }

    var nowTime = Date.now();

    for (var i = 0; i < borrowedBooks.length; i++) {
        var item = borrowedBooks[i];
        var isOverdue = item.dueTimestamp && nowTime > item.dueTimestamp;

        var div = document.createElement("div");
        div.className = "log-item";

        div.innerHTML = ''
            + '<div class="log-info">'
            + '    <strong>' + item.title + '</strong>'
            + '    <span>Borrower: ' + (item.studentName || 'Student') + ' (' + (item.studentId || 'ID: ST-01') + ')</span>'
            + '    <span>Issued: ' + item.borrowDate + ' | Due: ' + item.dueDate + '</span>'
            +      (isOverdue ? '<span style="color: #ef4444; font-weight: 600;">⚠️ Overdue (Fine: ₹20/day)</span>' : '')
            + '</div>'
            + '<button class="action-btn return-btn" onclick="returnBook(\'' + item.id + '\')">Mark Returned</button>';

        issuedLogList.appendChild(div);
    }
}


// ========================
//  AI Chatbot & Assistant Logic
// ========================

function sendQuickChip(text) {
    chatInput.value = text;
    sendChatMessage(text);
}

async function sendChatMessage(userText) {
    if (!userText) return;

    // Append User Message Bubble
    appendBubble(userText, "user-bubble");
    chatInput.value = "";

    // Append AI Loading Bubble
    var loadingId = "ai-loading-" + Date.now();
    appendBubble("Thinking...", "ai-bubble", loadingId);

    // Build Live Inventory Context
    var inventoryContext = books.map(function(b) {
        return "- '" + b.title + "' by " + b.author + " [Category: " + b.category + "] -> Available Copies: " + b.availableCopies + "/" + b.totalCopies;
    }).join("\n");

    var prompt = "";

    if (currentPortal === "student") {
        prompt = "You are the ShelfSense AI Assistant for our library helping a STUDENT.\n"
            + "Live Inventory Right Now:\n" + inventoryContext + "\n\n"
            + "Student Input: '" + userText + "'\n\n"
            + "STRICT RULES FOR STUDENT PORTAL:\n"
            + "1. Students are ONLY allowed to search for books, check availability, or ask for book recommendations.\n"
            + "2. IF the student asks or commands you to ADD or DELETE a book (e.g. 'Add book XYZ'), REJECT politely and state: '🔒 Only Librarians can add or modify books. Please switch to the Librarian Portal to add new books to the library inventory!'\n"
            + "3. IF asking about availability, state YES or NO clearly with current available stock count from live inventory.\n"
            + "4. Keep response friendly, short (2-3 sentences), and use emojis.";
    } else {
        prompt = "You are the ShelfSense AI Assistant & Librarian Agent for our library helping a LIBRARIAN.\n"
            + "Live Inventory Right Now:\n" + inventoryContext + "\n\n"
            + "Librarian Input: '" + userText + "'\n\n"
            + "STRICT RULES FOR LIBRARIAN PORTAL:\n"
            + "1. IF THE LIBRARIAN WANTS TO ADD A BOOK (e.g., 'Add 5 copies of Clean Code by Robert Martin under Computer Science' or 'Add book XYZ'), extract title, author, category, and copy count. At the END of your friendly response, append this JSON tag EXACTLY:\n"
            + "[[ACTION_ADD: {\"title\": \"Book Title\", \"author\": \"Author Name\", \"category\": \"Category Name\", \"copies\": 5}]]\n"
            + "Supported categories: Fiction, Science, History, Computer Science, Self-Help, Other.\n"
            + "2. IF asking about availability or inventory, answer with YES or NO clearly based on live inventory with available stock count.\n"
            + "3. Keep response concise, friendly, and use emojis.";
    }

    try {
        var response = await fetch("/api/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        var data = await response.json();

        var loadingBubble = document.getElementById(loadingId);

        if (response.ok && data.candidates && data.candidates[0]) {
            var rawReply = data.candidates[0].content.parts[0].text;

            // Check if response contains [[ACTION_ADD: {...}]]
            var match = rawReply.match(/\[\[ACTION_ADD:\s*(\{.*?\})\]\]/);

            if (match && match[1]) {
                try {
                    var bookData = JSON.parse(match[1]);
                    if (bookData.title && bookData.author) {
                        var copies = Number(bookData.copies) || 1;
                        var newBook = {
                            id: "B" + (books.length + 101),
                            title: bookData.title,
                            author: bookData.author,
                            category: bookData.category || "Other",
                            totalCopies: copies,
                            availableCopies: copies
                        };

                        books.push(newBook);
                        saveBooks();
                        renderAll();
                    }
                } catch (jsonErr) {
                    console.error("Error parsing AI book action:", jsonErr);
                }

                // Strip raw action code from display
                rawReply = rawReply.replace(/\[\[ACTION_ADD:\s*\{.*?\}\]\]/g, "").trim();
            }

            if (loadingBubble) {
                loadingBubble.innerHTML = formatMarkdown(rawReply);
            }
        } else {
            if (loadingBubble) {
                loadingBubble.innerHTML = "❌ AI response failed. Please try again.";
            }
        }
    } catch (e) {
        console.error("Chat error:", e);
        var loadingBubble = document.getElementById(loadingId);
        if (loadingBubble) {
            loadingBubble.innerHTML = "❌ Connection error.";
        }
    }

    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function appendBubble(text, className, id) {
    var div = document.createElement("div");
    div.className = "chat-bubble " + className;
    if (id) div.id = id;
    div.innerHTML = text;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function formatMarkdown(text) {
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/###\s?(.*)/g, "<strong>$1</strong>");
    text = text.replace(/##\s?(.*)/g, "<strong>$1</strong>");
    text = text.replace(/\n/g, "<br>");
    return text;
}



// Run Application
init();
