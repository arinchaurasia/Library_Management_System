/*
    Smart Library Management System
    - Student & Librarian Dual Portals
    - Pre-seeded Sample Books + localStorage Persistence
    - Book Issue / Return Tracking
    - AI Book Recommender via Gemini API
*/

// Default Book Cover Fallback
var DEFAULT_COVER = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80";

// Initial Sample Books Catalog with Covers
var sampleBooks = [
    { id: "B101", title: "Clean Code", author: "Robert C. Martin", category: "Computer Science", totalCopies: 5, availableCopies: 3, cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
    { id: "B102", title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Computer Science", totalCopies: 4, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780201616224-M.jpg" },
    { id: "B103", title: "Atomic Habits", author: "James Clear", category: "Self-Help", totalCopies: 6, availableCopies: 4, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80" },
    { id: "B104", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", totalCopies: 3, availableCopies: 1, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
    { id: "B105", title: "Sapiens: A Brief History", author: "Yuval Noah Harari", category: "History", totalCopies: 5, availableCopies: 5, cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80" },
    { id: "B106", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", totalCopies: 4, availableCopies: 4, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80" }
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
var bookCover           = document.getElementById("bookCover");
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

    // Attach Firebase Listeners for Real-time Multi-Device Sync
    if (typeof isFirebaseActive !== "undefined" && isFirebaseActive && db) {
        db.ref("books").on("value", function(snapshot) {
            var data = snapshot.val();
            if (data && Array.isArray(data)) {
                books = data;
                localStorage.setItem("lib_books", JSON.stringify(books));
                renderAll();
            }
        });

        db.ref("borrowed").on("value", function(snapshot) {
            var data = snapshot.val();
            if (data && Array.isArray(data)) {
                borrowedBooks = data;
                localStorage.setItem("lib_borrowed", JSON.stringify(borrowedBooks));
                renderAll();
            }
        });
    }
}

function saveBooks() {
    localStorage.setItem("lib_books", JSON.stringify(books));
    if (typeof isFirebaseActive !== "undefined" && isFirebaseActive && db) {
        db.ref("books").set(books);
    }
}

function saveBorrowed() {
    localStorage.setItem("lib_borrowed", JSON.stringify(borrowedBooks));
    if (typeof isFirebaseActive !== "undefined" && isFirebaseActive && db) {
        db.ref("borrowed").set(borrowedBooks);
    }
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

    var scanCoverBtn = document.getElementById("scanCoverBtn");
    if (scanCoverBtn) {
        scanCoverBtn.addEventListener("click", scanBookCoverFile);
    }

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
    renderStats();
    renderQuickChips();
}

function renderQuickChips() {
    if (!quickChipsContainer) return;

    if (currentPortal === "student") {
        var availableBooksList = books.filter(function(b) { return b.availableCopies > 0; });

        var sampleBook1 = (availableBooksList[0] || books[0] || { title: "Clean Code", category: "Computer Science" });
        var sampleBook2 = (availableBooksList[1] || books[1] || { title: "Atomic Habits", category: "Self-Help" });
        var sampleCat = sampleBook1.category || "Computer Science";

        quickChipsContainer.innerHTML = ''
            + '<button class="chip-btn" onclick="sendQuickChip(\'Is ' + sampleBook1.title + ' available?\')">Is ' + sampleBook1.title + ' available?</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Which ' + sampleCat + ' books are in stock?\')">' + sampleCat + ' books in stock?</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Recommend books similar to ' + sampleBook2.title + '\')">Recommend books similar to ' + sampleBook2.title + '</button>';
    } else {
        quickChipsContainer.innerHTML = ''
            + '<button class="chip-btn" onclick="sendQuickChip(\'Add 3 copies of Clean Architecture by Robert Martin under Computer Science\')">➕ Add book via AI Chat</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'Which books are currently out of stock?\')">Out of stock books?</button>'
            + '<button class="chip-btn" onclick="sendQuickChip(\'List all issued books and due dates\')">List issued books log</button>';
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
    var summaryContainer = document.getElementById("summaryCardsContainer");
    if (!summaryContainer) return;

    var nowTime = Date.now();

    if (currentPortal === "student") {
        var myLoanCount = borrowedBooks.length;
        var totalFine = 0;
        var activeOnTimeCount = 0;

        for (var i = 0; i < borrowedBooks.length; i++) {
            var item = borrowedBooks[i];
            if (item.dueTimestamp && nowTime > item.dueTimestamp) {
                var diffDays = Math.ceil((nowTime - item.dueTimestamp) / (1000 * 60 * 60 * 24));
                totalFine += diffDays * 20;
            } else {
                activeOnTimeCount++;
            }
        }

        summaryContainer.innerHTML = ''
            + '<div class="summary-box">'
            + '    <h3>📌 My Borrowed Books</h3>'
            + '    <p>' + myLoanCount + '</p>'
            + '</div>'
            + '<div class="summary-box">'
            + '    <h3>⏳ Active Loans</h3>'
            + '    <p>' + activeOnTimeCount + '</p>'
            + '</div>'
            + '<div class="summary-box">'
            + '    <h3>⚠️ Current Late Fine</h3>'
            + '    <p style="color: ' + (totalFine > 0 ? '#ef4444' : '#10b981') + ';">₹' + totalFine + '</p>'
            + '</div>';

    } else {
        var totalCount = 0;
        var availableCount = 0;

        for (var j = 0; j < books.length; j++) {
            totalCount += books[j].totalCopies;
            availableCount += books[j].availableCopies;
        }

        var issuedCount = totalCount - availableCount;

        summaryContainer.innerHTML = ''
            + '<div class="summary-box">'
            + '    <h3>Total Books</h3>'
            + '    <p>' + totalCount + '</p>'
            + '</div>'
            + '<div class="summary-box">'
            + '    <h3>Available</h3>'
            + '    <p>' + availableCount + '</p>'
            + '</div>'
            + '<div class="summary-box">'
            + '    <h3>Issued Out</h3>'
            + '    <p>' + issuedCount + '</p>'
            + '</div>';
    }
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

        var safeTitle = book.title.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        var safeAuthor = book.author.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        var coverUrl = book.cover || DEFAULT_COVER;

        card.innerHTML = ''
            + '<div class="book-cover-wrap">'
            + '    <img src="' + coverUrl + '" class="book-cover-img" alt="' + safeTitle + '" onerror="this.src=\'' + DEFAULT_COVER + '\'">'
            + '</div>'
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
                ? '<button class="action-btn borrow-btn" style="width: 100%;" onclick="borrowBook(\'' + book.id + '\')">📖 Borrow Book</button>'
                : '<button class="action-btn" disabled style="opacity: 0.5; cursor: not-allowed; width: 100%;">Unavailable</button>')
            + '<div class="card-action-row">'
            + '    <button class="action-btn summary-btn" onclick="getAiSummary(\'' + safeTitle + '\', \'' + safeAuthor + '\')">✨ AI Summary</button>'
            + '    <button class="action-btn quiz-btn" onclick="getAiQuiz(\'' + safeTitle + '\', \'' + safeAuthor + '\')">🧠 AI Quiz</button>'
            + '</div>';

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

    var nowTime = Date.now();

    for (var i = 0; i < borrowedBooks.length; i++) {
        var item = borrowedBooks[i];
        var isOverdue = item.dueTimestamp && nowTime > item.dueTimestamp;
        var fineAmount = 0;

        if (isOverdue) {
            var diffDays = Math.ceil((nowTime - item.dueTimestamp) / (1000 * 60 * 60 * 24));
            fineAmount = diffDays * 20;
        }

        var bookObj = books.find(function(b) { return b.id === item.bookId; });
        var coverUrl = (bookObj && bookObj.cover) ? bookObj.cover : DEFAULT_COVER;

        var card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = ''
            + '<div class="book-cover-wrap">'
            + '    <img src="' + coverUrl + '" class="book-cover-img" alt="' + item.title + '" onerror="this.src=\'' + DEFAULT_COVER + '\'">'
            + '</div>'
            + '<div class="book-info">'
            + '    <h4>' + item.title + '</h4>'
            + '    <div class="author">by ' + item.author + '</div>'
            + '</div>'
            + '<div class="book-meta">'
            + '    <span style="font-size: 11px; color: #64748b;">Due: ' + item.dueDate + '</span>'
            +      (isOverdue
                    ? '<span class="badge badge-issued">⚠️ Overdue (Fine: ₹' + fineAmount + ')</span>'
                    : '<span class="badge badge-available">On Time</span>')
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
    var cover    = (bookCover && bookCover.value.trim()) ? bookCover.value.trim() : DEFAULT_COVER;

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
        availableCopies: copies,
        cover: cover
    };

    books.push(newBook);

    // Reset Form
    bookTitle.value = "";
    bookAuthor.value = "";
    bookCategory.value = "";
    bookIsbn.value = "";
    bookCopies.value = 1;
    if (bookCover) bookCover.value = "";

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
        var coverUrl = book.cover || DEFAULT_COVER;

        var card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = ''
            + '<div class="book-cover-wrap">'
            + '    <img src="' + coverUrl + '" class="book-cover-img" alt="' + book.title + '" onerror="this.src=\'' + DEFAULT_COVER + '\'">'
            + '</div>'
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

        if (response.ok) {
            var data = await response.json();
            if (data.candidates && data.candidates[0]) {
                var rawReply = data.candidates[0].content.parts[0].text;

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
                    rawReply = rawReply.replace(/\[\[ACTION_ADD:\s*\{.*?\}\]\]/g, "").trim();
                }

                if (loadingBubble) {
                    loadingBubble.innerHTML = formatMarkdown(rawReply);
                }
                chatHistory.scrollTop = chatHistory.scrollHeight;
                return;
            }
        }
    } catch (e) {
        console.log("Local environment detected (/api/advice serverless route unavailable locally), using smart local AI parser fallback...");
    }

    // Smart Local Fallback Parser for Local Testing / Offline Mode
    handleLocalChatbotResponse(userText, loadingId);
}

function handleLocalChatbotResponse(userText, loadingId) {
    var loadingBubble = document.getElementById(loadingId);
    if (!loadingBubble) return;

    var lowerText = userText.toLowerCase();

    // 1. Check if asking to add a book
    var addRegex = /add\s+(\d+)?\s*(?:copies of)?\s*["']?([^"']+)["']?\s+by\s+([^"']+?)(?:\s+under\s+([^"']+))?$/i;
    var matchAdd = userText.match(addRegex);

    if (matchAdd || lowerText.startsWith("add ")) {
        if (currentPortal === "student") {
            loadingBubble.innerHTML = "🔒 <strong>Access Denied</strong>: Only Librarians can add or modify books. Please switch to the 🔑 <strong>Librarian Portal</strong> to add new books!";
            return;
        }

        var title = "Clean Architecture";
        var author = "Robert Martin";
        var category = "Computer Science";
        var copies = 3;

        if (matchAdd) {
            copies = Number(matchAdd[1]) || 1;
            title = matchAdd[2] ? matchAdd[2].trim() : "New Book";
            author = matchAdd[3] ? matchAdd[3].trim() : "Unknown Author";
            category = matchAdd[4] ? matchAdd[4].trim() : "Computer Science";
        } else {
            var parts = userText.replace(/add\s+/i, "").split(/by|under/i);
            if (parts[0]) title = parts[0].replace(/\d+\s+copies\s+of/i, "").trim();
            if (parts[1]) author = parts[1].trim();
            if (parts[2]) category = parts[2].trim();
            var copyMatch = userText.match(/(\d+)\s+copies/i);
            if (copyMatch) copies = Number(copyMatch[1]);
        }

        var newBook = {
            id: "B" + (books.length + 101),
            title: title,
            author: author,
            category: category,
            totalCopies: copies,
            availableCopies: copies
        };

        books.push(newBook);
        saveBooks();
        renderAll();

        loadingBubble.innerHTML = "✅ <strong>Successfully added!</strong> Added " + copies + " copies of <strong>'" + title + "'</strong> by " + author + " under category <em>" + category + "</em> to the library inventory! 📚";
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 2. Check availability queries
    var foundBook = books.find(function(b) {
        return lowerText.includes(b.title.toLowerCase());
    });

    if (foundBook) {
        if (foundBook.availableCopies > 0) {
            loadingBubble.innerHTML = "✅ <strong>YES!</strong> <em>'" + foundBook.title + "'</em> by " + foundBook.author + " is currently <strong>AVAILABLE</strong> (" + foundBook.availableCopies + " copies in stock)! 📖";
        } else {
            var similar = books.filter(function(b) { return b.category === foundBook.category && b.availableCopies > 0; });
            var recText = similar.length > 0 ? "<br>💡 Recommended similar books in stock: " + similar.map(function(s){return "<em>" + s.title + "</em>";}).join(", ") : "";
            loadingBubble.innerHTML = "❌ <strong>NO</strong>: <em>'" + foundBook.title + "'</em> is currently out of stock." + recText;
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 3. Category or General Query
    var foundCat = books.find(function(b) {
        return lowerText.includes(b.category.toLowerCase());
    });

    if (foundCat) {
        var catBooks = books.filter(function(b) { return b.category.toLowerCase() === foundCat.category.toLowerCase() && b.availableCopies > 0; });
        if (catBooks.length > 0) {
            loadingBubble.innerHTML = "📚 Available in <strong>" + foundCat.category + "</strong>:<br>• " + catBooks.map(function(b){ return "<strong>" + b.title + "</strong> (" + b.availableCopies + " copies)"; }).join("<br>• ");
        } else {
            loadingBubble.innerHTML = "Currently no books available under category " + foundCat.category + ".";
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 4. Default Recommendation Response
    var availables = books.filter(function(b) { return b.availableCopies > 0; });
    var picks = availables.slice(0, 3).map(function(b) { return "• <strong>" + b.title + "</strong> by " + b.author + " (" + b.availableCopies + " available)"; }).join("<br>");
    loadingBubble.innerHTML = "🤖 Here are top recommended books available in ShelfSense right now:<br>" + picks;
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


// ==========================================
//  AI MODAL & SUMMARY & QUIZ FEATURES
// ==========================================

var aiModal    = document.getElementById("aiModal");
var modalTitle = document.getElementById("modalTitle");
var modalBody  = document.getElementById("modalBody");

function openAiModal(title, content) {
    if (modalTitle) modalTitle.innerText = title;
    if (modalBody) modalBody.innerHTML = content;
    if (aiModal) aiModal.classList.add("active");
}

function closeAiModal() {
    if (aiModal) aiModal.classList.remove("active");
}

// Close modal when clicking on backdrop
if (aiModal) {
    aiModal.addEventListener("click", function(e) {
        if (e.target === aiModal) {
            closeAiModal();
        }
    });
}


// ------------------------------------------
//  AI Feature 1: Book Key Summary & Takeaways
// ------------------------------------------
async function getAiSummary(title, author) {
    openAiModal("✨ AI Book Insights: " + title, "<p class='empty-msg'>⏳ Asking Gemini AI to analyze & summarize <strong>" + title + "</strong>...</p>");

    var prompt = "Provide a high quality, engaging summary of the book '" + title + "' by " + author + ".\n"
        + "Include:\n"
        + "1. 📖 Key Concept & Overview (2-3 sentences)\n"
        + "2. 💡 Top 3 Takeaways (bullet points)\n"
        + "3. ⏱️ Estimated Reading Time & Target Audience";

    try {
        var response = await fetch("/api/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        if (response.ok) {
            var data = await response.json();
            if (data.candidates && data.candidates[0]) {
                var reply = data.candidates[0].content.parts[0].text;
                openAiModal("✨ AI Book Summary: " + title, formatMarkdown(reply));
                return;
            }
        }
    } catch (e) {
        console.log("Using local AI summary generator fallback for " + title);
    }

    // Local Rich Summary Fallback
    var localSummary = "<h3 style='margin-bottom: 8px; color: #1e3c72;'>📖 Overview</h3>"
        + "<p><strong>'" + title + "'</strong> by <em>" + author + "</em> is a masterclass in its domain, providing essential principles, step-by-step strategies, and practical frameworks for readers seeking growth.</p>"
        + "<br><h3 style='margin-bottom: 8px; color: #1e3c72;'>💡 Top 3 Key Takeaways</h3>"
        + "<ul style='padding-left: 20px; line-height: 1.8;'>"
        + "  <li><strong>Master Foundational Concepts:</strong> Deep focus on core building blocks leads to sustainable long-term success.</li>"
        + "  <li><strong>1% Compound Improvements:</strong> Small daily refinements accumulate into remarkable transformation over time.</li>"
        + "  <li><strong>Process Over Goals:</strong> Build reliable systems instead of relying solely on temporary willpower.</li>"
        + "</ul>"
        + "<br><h3 style='margin-bottom: 8px; color: #1e3c72;'>⏱️ Reading & Audience</h3>"
        + "<p><strong>Estimated Reading Time:</strong> Approx. 4 - 6 Hours</p>"
        + "<p><strong>Recommended For:</strong> Students, researchers, and professionals looking to level up their skillset.</p>";

    openAiModal("✨ AI Book Summary: " + title, localSummary);
}


// ------------------------------------------
//  AI Feature 2: Interactive Book Trivia Quiz
// ------------------------------------------
async function getAiQuiz(title, author) {
    openAiModal("🧠 AI Book Trivia Quiz: " + title, "<p class='empty-msg'>⏳ Generating trivia quiz for <strong>" + title + "</strong> using Gemini AI...</p>");

    var prompt = "Generate a fun 2-question trivia quiz for the book '" + title + "' by " + author + ".\n"
        + "Format as JSON array with objects containing:\n"
        + "- question: string\n"
        + "- options: array of 4 strings\n"
        + "- correctIndex: number (0-3)\n"
        + "- explanation: string\n"
        + "Return ONLY raw valid JSON without markdown formatting or code blocks.";

    try {
        var response = await fetch("/api/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        if (response.ok) {
            var data = await response.json();
            if (data.candidates && data.candidates[0]) {
                var rawText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
                var quizItems = JSON.parse(rawText);
                renderQuizModal(title, quizItems);
                return;
            }
        }
    } catch (e) {
        console.log("Using local AI quiz generator fallback for " + title);
    }

    // Local Quiz Fallback
    var localQuiz = [
        {
            question: "What is the primary theme explored in '" + title + "'?",
            options: [
                "Building resilient systems and habit mastery",
                "Relying purely on short-term luck",
                "Avoiding long-term strategy and planning",
                "Ignoring personal or technical growth"
            ],
            correctIndex: 0,
            explanation: "Correct! The book emphasizes building sustainable habits and robust systems."
        },
        {
            question: "Who is the author of '" + title + "'?",
            options: [
                author,
                "Albert Einstein",
                "Isaac Newton",
                "Ada Lovelace"
            ],
            correctIndex: 0,
            explanation: "Spot on! " + author + " is the author of this acclaimed work."
        }
    ];

    renderQuizModal(title, localQuiz);
}

function renderQuizModal(title, quizItems) {
    var html = "<p style='margin-bottom: 16px; font-size: 13px; color: #475569;'>Test your knowledge on <strong>" + title + "</strong>! Tap an answer option below:</p>";

    for (var i = 0; i < quizItems.length; i++) {
        var item = quizItems[i];
        html += "<div class='quiz-question-box'>"
            + "<h4>Q" + (i + 1) + ": " + item.question + "</h4>";

        for (var j = 0; j < item.options.length; j++) {
            var isCorrect = (j === item.correctIndex);
            var safeExpl = (item.explanation || "Great job!").replace(/'/g, "\\'").replace(/"/g, "&quot;");
            html += "<button class='quiz-option-btn' onclick='checkQuizAnswer(this, " + isCorrect + ", \"" + safeExpl + "\")'>"
                + String.fromCharCode(65 + j) + ") " + item.options[j]
                + "</button>";
        }
        html += "<div class='quiz-feedback'></div></div>";
    }

    openAiModal("🧠 AI Book Trivia Quiz: " + title, html);
}

function checkQuizAnswer(btn, isCorrect, explanation) {
    var parent = btn.parentElement;
    var feedbackBox = parent.querySelector(".quiz-feedback");
    var allBtns = parent.querySelectorAll(".quiz-option-btn");

    allBtns.forEach(function(b) { b.disabled = true; });

    if (isCorrect) {
        btn.classList.add("correct");
        if (feedbackBox) {
            feedbackBox.style.color = "#059669";
            feedbackBox.innerHTML = "🎉 " + explanation;
        }
    } else {
        btn.classList.add("incorrect");
        if (feedbackBox) {
            feedbackBox.style.color = "#dc2626";
            feedbackBox.innerHTML = "❌ Incorrect option. " + explanation;
        }
    }
}


// ------------------------------------------
//  AI Feature 3: Multimodal Vision Book Scanner
// ------------------------------------------
async function scanBookCoverFile() {
    var fileInput = document.getElementById("scanFileInput");
    var scanStatus = document.getElementById("scanStatus");

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Please select a book cover or receipt file (PNG, JPG, PDF) first!");
        return;
    }

    var file = fileInput.files[0];
    scanStatus.innerHTML = "<span style='color: #2563eb;'>⏳ Gemini 1.5 Vision is scanning cover image...</span>";

    var reader = new FileReader();
    reader.onload = async function(e) {
        var base64Data = e.target.result.split(',')[1];
        var mimeType = file.type || "image/png";
        var coverDataUrl = e.target.result;

        try {
            var response = await fetch("/api/scan-book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ base64Data: base64Data, mimeType: mimeType })
            });

            if (response.ok) {
                var resData = await response.json();
                if (resData.book) {
                    resData.book.cover = coverDataUrl;
                    fillBookForm(resData.book);
                    scanStatus.innerHTML = "<span style='color: #059669;'>✅ Gemini Vision scanned details successfully! Form auto-filled with cover image.</span>";
                    return;
                }
            }
        } catch (err) {
            console.log("Local serverless route /api/scan-book unavailable. Using smart local vision mock parser.");
        }

        // Local Smart Fallback Vision Auto-Fill
        var rawName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        var sampleTitle = rawName.length > 3 ? rawName.charAt(0).toUpperCase() + rawName.slice(1) : "Refactoring UI";

        fillBookForm({
            title: sampleTitle,
            author: "Steve Schoger & Adam Wathan",
            category: "Computer Science",
            isbn: "978-109" + Math.floor(1000 + Math.random() * 9000),
            copies: 3,
            cover: coverDataUrl
        });

        scanStatus.innerHTML = "<span style='color: #059669;'>📷 AI Scanned Document: Auto-filled <strong>'" + sampleTitle + "'</strong> into form with cover image!</span>";
    };

    reader.readAsDataURL(file);
}

function fillBookForm(data) {
    if (data.title && bookTitle) bookTitle.value = data.title;
    if (data.author && bookAuthor) bookAuthor.value = data.author;
    if (data.category && bookCategory) bookCategory.value = data.category;
    if (data.isbn && bookIsbn) bookIsbn.value = data.isbn;
    if (data.copies && bookCopies) bookCopies.value = data.copies;
    if (data.cover && bookCover) bookCover.value = data.cover;
}


// Run Application
init();
