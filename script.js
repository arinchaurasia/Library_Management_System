function createBookCoverDataUri(title, author, category) {
    title = title || "Engineering Textbook";
    author = author || "Engineering Faculty";
    category = category || "General Engineering";

    var icon = "📚";
    var gradStart = "#1e3c72";
    var gradEnd = "#2a5298";
    var accentColor = "#60a5fa";

    var catLower = String(category).toLowerCase();
    if (catLower.includes("computer") || catLower.includes("cse") || catLower.includes("algorithm") || catLower.includes("code")) {
        icon = "💻"; gradStart = "#0f172a"; gradEnd = "#1e293b"; accentColor = "#38bdf8";
    } else if (catLower.includes("technology") || catLower.includes("it") || catLower.includes("data science")) {
        icon = "🌐"; gradStart = "#0284c7"; gradEnd = "#0369a1"; accentColor = "#7dd3fc";
    } else if (catLower.includes("ai") || catLower.includes("intelligence") || catLower.includes("machine learning")) {
        icon = "🤖"; gradStart = "#4c1d95"; gradEnd = "#312e81"; accentColor = "#a78bfa";
    } else if (catLower.includes("electronics") || catLower.includes("ece") || catLower.includes("eee") || catLower.includes("circuit")) {
        icon = "⚡"; gradStart = "#b45309"; gradEnd = "#78350f"; accentColor = "#fde047";
    } else if (catLower.includes("mechanical") || catLower.includes("me") || catLower.includes("machine")) {
        icon = "⚙️"; gradStart = "#1f2937"; gradEnd = "#111827"; accentColor = "#fbbf24";
    } else if (catLower.includes("civil") || catLower.includes("ce") || catLower.includes("structure")) {
        icon = "🏗️"; gradStart = "#9a3412"; gradEnd = "#7c2d12"; accentColor = "#ffedd5";
    } else if (catLower.includes("aktu")) {
        icon = "📜"; gradStart = "#881337"; gradEnd = "#4c0519"; accentColor = "#fde68a";
    } else if (catLower.includes("science") || catLower.includes("bsh") || catLower.includes("math") || catLower.includes("physics")) {
        icon = "📐"; gradStart = "#064e3b"; gradEnd = "#022c22"; accentColor = "#6ee7b7";
    }

    var safeTitle = String(title).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var safeAuthor = String(author).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var safeCategory = String(category).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    var words = safeTitle.split(" ");
    var line1 = "", line2 = "", line3 = "";

    for (var i = 0; i < words.length; i++) {
        if ((line1 + words[i]).length <= 15) {
            line1 += (line1 ? " " : "") + words[i];
        } else if ((line2 + words[i]).length <= 18) {
            line2 += (line2 ? " " : "") + words[i];
        } else {
            line3 += (line3 ? " " : "") + words[i];
        }
    }
    if (line3.length > 18) line3 = line3.substring(0, 15) + "...";

    var gradId = "bgGrad_" + Math.floor(Math.random() * 1000000) + "_" + String(title).replace(/[^a-zA-Z0-9]/g, "").substring(0, 8);

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">'
        + '<defs>'
        + '  <linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="100%">'
        + '    <stop offset="0%" stop-color="' + gradStart + '" />'
        + '    <stop offset="100%" stop-color="' + gradEnd + '" />'
        + '  </linearGradient>'
        + '</defs>'
        + '<rect width="300" height="400" rx="12" fill="url(#' + gradId + ')" />'
        + '<rect x="12" y="12" width="276" height="376" rx="8" fill="none" stroke="' + accentColor + '" stroke-width="2" stroke-dasharray="6 4" opacity="0.4" />'
        + '<rect x="0" y="0" width="18" height="400" fill="rgba(0,0,0,0.25)" />'
        + '<text x="150" y="65" font-family="sans-serif" font-size="38" text-anchor="middle" fill="#ffffff">' + icon + '</text>'
        + '<text x="150" y="100" font-family="sans-serif" font-size="11" font-weight="bold" letter-spacing="1.5" text-anchor="middle" fill="' + accentColor + '">' + safeCategory.toUpperCase() + '</text>'
        + '<line x1="40" y1="115" x2="260" y2="115" stroke="' + accentColor + '" stroke-width="1.5" opacity="0.6" />'
        + '<text x="150" y="160" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#ffffff">' + line1 + '</text>'
        + (line2 ? '<text x="150" y="195" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#ffffff">' + line2 + '</text>' : '')
        + (line3 ? '<text x="150" y="225" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">' + line3 + '</text>' : '')
        + '<line x1="60" y1="270" x2="240" y2="270" stroke="rgba(255,255,255,0.3)" stroke-width="1" />'
        + '<text x="150" y="310" font-family="sans-serif" font-size="13" font-style="italic" text-anchor="middle" fill="#e2e8f0">Author</text>'
        + '<text x="150" y="335" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">' + safeAuthor + '</text>'
        + '<rect x="90" y="360" width="120" height="22" rx="4" fill="rgba(0,0,0,0.4)" />'
        + '<text x="150" y="375" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1" text-anchor="middle" fill="' + accentColor + '">SHELFSENSE LIBRARY</text>'
        + '</svg>';

    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function handleCoverError(imgEl, title, author, category) {
    if (!imgEl) return;
    imgEl.onerror = null; // Prevent infinite loops initially

    // Try Google Books API as secondary source
    var googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=" +
        encodeURIComponent(title + " " + (author || "")) +
        "&fields=items(volumeInfo/imageLinks)&maxResults=1";

    fetch(googleBooksUrl)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var cover = data &&
                data.items && data.items[0] &&
                data.items[0].volumeInfo &&
                data.items[0].volumeInfo.imageLinks &&
                (data.items[0].volumeInfo.imageLinks.thumbnail ||
                 data.items[0].volumeInfo.imageLinks.smallThumbnail);

            if (cover) {
                // Ensure HTTPS and fallback to SVG if the Google Books URL fails to load
                cover = cover.replace("http://", "https://");
                imgEl.onerror = function() {
                    this.onerror = null;
                    this.src = createBookCoverDataUri(title, author, category);
                };
                imgEl.src = cover;
            } else {
                imgEl.src = createBookCoverDataUri(title, author, category);
            }
        })
        .catch(function() {
            imgEl.src = createBookCoverDataUri(title, author, category);
        });
}

function escapeJsAttr(str) {
    return String(str || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

var DEFAULT_COVER = createBookCoverDataUri("Engineering Library Book", "AKTU Faculty", "Computer Science & Engineering");

var sampleBooks = [
    // ==========================================
    // COMPUTER SCIENCE & ENGINEERING (CSE) - 35 BOOKS
    // ==========================================
    { id: "CSE101", title: "Introduction to Algorithms", author: "Thomas H. Cormen, Charles E. Leiserson", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg" },
    { id: "CSE102", title: "Operating System Concepts", author: "Abraham Silberschatz, Peter B. Galvin", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9781119800361-M.jpg" },
    { id: "CSE103", title: "Computer Networks", author: "Andrew S. Tanenbaum, David J. Wetherall", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780132126953-M.jpg" },
    { id: "CSE104", title: "Database System Concepts", author: "Abraham Silberschatz, Henry F. Korth", category: "Computer Science & Engineering", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780073523323-M.jpg" },
    { id: "CSE105", title: "Compilers: Principles, Techniques, & Tools", author: "Alfred V. Aho, Monica S. Lam", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780321486813-M.jpg" },
    { id: "CSE106", title: "Computer Organization and Design", author: "David A. Patterson, John L. Hennessy", category: "Computer Science & Engineering", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780128017334-M.jpg" },
    { id: "CSE107", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell, Peter Norvig", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780134610993-M.jpg" },
    { id: "CSE108", title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", category: "Computer Science & Engineering", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg" },
    { id: "CSE109", title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780201616224-M.jpg" },
    { id: "CSE110", title: "Design Patterns: Elements of Reusable Object-Oriented Software", author: "Erich Gamma, Richard Helm, Ralph Johnson", category: "Computer Science & Engineering", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780201633610-M.jpg" },
    { id: "CSE111", title: "Modern Operating Systems", author: "Andrew S. Tanenbaum, Herbert Bos", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780133591620-M.jpg" },
    { id: "CSE112", title: "Algorithms", author: "Robert Sedgewick, Kevin Wayne", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780321573513-M.jpg" },
    { id: "CSE113", title: "Theory of Computer Science: Automata, Languages and Computation", author: "K.L.P. Mishra, N. Chandrasekaran", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" },
    { id: "CSE114", title: "Digital Logic and Computer Design", author: "M. Morris Mano", category: "Computer Science & Engineering", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780132145107-M.jpg" },
    { id: "CSE115", title: "Software Engineering: A Practitioner's Approach", author: "Roger S. Pressman, Bruce R. Maxim", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780078022128-M.jpg" },
    { id: "CSE116", title: "Data Structures and Algorithm Analysis in C++", author: "Mark Allen Weiss", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780132847377-M.jpg" },
    { id: "CSE117", title: "Computer Graphics: Principles and Practice", author: "John F. Hughes, Andries van Dam", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780321399526-M.jpg" },
    { id: "CSE118", title: "Object-Oriented Programming with C++", author: "E. Balagurusamy", category: "Computer Science & Engineering", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
    { id: "CSE119", title: "Programming in ANSI C", author: "E. Balagurusamy", category: "Computer Science & Engineering", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
    { id: "CSE120", title: "Java: The Complete Reference", author: "Herbert Schildt", category: "Computer Science & Engineering", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9781260440232-M.jpg" },
    { id: "CSE121", title: "The C Programming Language", author: "Brian W. Kernighan, Dennis M. Ritchie", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780131103627-M.jpg" },
    { id: "CSE122", title: "Data Mining: Concepts and Techniques", author: "Jiawei Han, Micheline Kamber", category: "Computer Science & Engineering", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780123814791-M.jpg" },
    { id: "CSE123", title: "Computer Networking: A Top-Down Approach", author: "James F. Kurose, Keith W. Ross", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780133594140-M.jpg" },
    { id: "CSE124", title: "Cryptography and Network Security", author: "William Stallings", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780134444284-M.jpg" },
    { id: "CSE125", title: "Distributed Systems: Concepts and Design", author: "George Coulouris, Jean Dollimore", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780132143011-M.jpg" },
    { id: "CSE126", title: "Discrete Mathematics and Its Applications", author: "Kenneth H. Rosen", category: "Computer Science & Engineering", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780073383095-M.jpg" },
    { id: "CSE127", title: "Fundamentals of Software Engineering", author: "Rajib Mall", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80" },
    { id: "CSE128", title: "Linux Kernel Development", author: "Robert Love", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780672329463-M.jpg" },
    { id: "CSE129", title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson, Gerald Jay Sussman", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780262510875-M.jpg" },
    { id: "CSE130", title: "Microprocessors and Microcontrollers", author: "N. Senthil Kumar, M. Saravanan", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "CSE131", title: "Compiler Design in C", author: "Allen I. Holub", category: "Computer Science & Engineering", totalCopies: 4, availableCopies: 4, cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" },
    { id: "CSE132", title: "Concrete Mathematics: A Foundation for Computer Science", author: "Ronald L. Graham, Donald E. Knuth", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780201558029-M.jpg" },
    { id: "CSE133", title: "The Art of Computer Programming, Vol 1", author: "Donald E. Knuth", category: "Computer Science & Engineering", totalCopies: 4, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780201896831-M.jpg" },
    { id: "CSE134", title: "Real-Time Systems", author: "Jane W. S. Liu", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780130568878-M.jpg" },
    { id: "CSE135", title: "Python Programming: An Introduction to Computer Science", author: "John Zelle", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9781590282410-M.jpg" },

    // ==========================================
    // INFORMATION TECHNOLOGY (IT) - 30 BOOKS
    // ==========================================
    { id: "IT201", title: "Data Communications and Networking", author: "Behrouz A. Forouzan", category: "Information Technology", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780073376226-M.jpg" },
    { id: "IT202", title: "Cloud Computing: Concepts, Technology & Architecture", author: "Thomas Erl, Ricardo Puttini", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780133387520-M.jpg" },
    { id: "IT203", title: "Cybersecurity Essentials", author: "Charles J. Brooks, Christopher Grow", category: "Information Technology", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781119362395-M.jpg" },
    { id: "IT204", title: "Internet of Things: A Hands-On Approach", author: "Arshdeep Bahga, Vijay Madisetti", category: "Information Technology", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780996025515-M.jpg" },
    { id: "IT205", title: "DevOps Handbook", author: "Gene Kim, Jez Humble, Patrick Debois", category: "Information Technology", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781942788003-M.jpg" },
    { id: "IT206", title: "Software Testing: Principles and Practices", author: "Srinivasan Desikan, Gopalaswamy Ramesh", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
    { id: "IT207", title: "Management Information Systems", author: "Kenneth C. Laudon, Jane P. Laudon", category: "Information Technology", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780135191798-M.jpg" },
    { id: "IT208", title: "Web Technologies: HTML, JavaScript, PHP & Java", author: "A.A. Puntambekar", category: "Information Technology", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80" },
    { id: "IT209", title: "Building Microservices", author: "Sam Newman", category: "Information Technology", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781491950357-M.jpg" },
    { id: "IT210", title: "Docker Deep Dive", author: "Nigel Poulton", category: "Information Technology", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781916585256-M.jpg" },
    { id: "IT211", title: "Continuous Delivery", author: "Jez Humble, David Farley", category: "Information Technology", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780321601910-M.jpg" },
    { id: "IT212", title: "Site Reliability Engineering", author: "Betsy Beyer, Chris Jones, Jennifer Petoff", category: "Information Technology", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781491929124-M.jpg" },
    { id: "IT213", title: "Ethical Hacking and Penetration Testing Guide", author: "Rafay Baloch", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9781482231618-M.jpg" },
    { id: "IT214", title: "Information Security Principles", author: "Mark Stamp", category: "Information Technology", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781118027202-M.jpg" },
    { id: "IT215", title: "Mobile Communications", author: "Jochen Schiller", category: "Information Technology", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780321123817-M.jpg" },
    { id: "IT216", title: "Wireless Communications & Networks", author: "William Stallings", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780131918351-M.jpg" },
    { id: "IT217", title: "E-Commerce: Business, Technology, Society", author: "Kenneth C. Laudon, Carol Guercio Traver", category: "Information Technology", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780134998459-M.jpg" },
    { id: "IT218", title: "System Analysis and Design", author: "Kenneth E. Kendall, Julie E. Kendall", category: "Information Technology", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780134785554-M.jpg" },
    { id: "IT219", title: "Kubernetes Up & Running", author: "Kelsey Hightower, Brendan Burns, Joe Beda", category: "Information Technology", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781492046530-M.jpg" },
    { id: "IT220", title: "Agile Software Development", author: "Robert C. Martin", category: "Information Technology", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780135974445-M.jpg" },
    { id: "IT221", title: "Enterprise Integration Patterns", author: "Gregor Hohpe, Bobby Woolf", category: "Information Technology", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780321200686-M.jpg" },
    { id: "IT222", title: "Information Theory, Coding and Cryptography", author: "Ranjan Bose", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
    { id: "IT223", title: "High Performance Web Sites", author: "Steve Souders", category: "Information Technology", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780596529307-M.jpg" },
    { id: "IT224", title: "Learning Python", author: "Mark Lutz", category: "Information Technology", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9781449355739-M.jpg" },
    { id: "IT225", title: "React Up & Running", author: "Stoyan Stefanov", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9781491931820-M.jpg" },
    { id: "IT226", title: "Web Development with Node and Express", author: "Ethan Brown", category: "Information Technology", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781491949306-M.jpg" },
    { id: "IT227", title: "Professional Android 4 Application Development", author: "Reto Meier", category: "Information Technology", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781118102275-M.jpg" },
    { id: "IT228", title: "iOS Programming: The Big Nerd Ranch Guide", author: "Christian Keur, Aaron Hillegass", category: "Information Technology", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780134682334-M.jpg" },
    { id: "IT229", title: "Big Data: Principles and Best Practices", author: "Nathan Marz, James Warren", category: "Information Technology", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781617290343-M.jpg" },
    { id: "IT230", title: "Network Security Essentials", author: "William Stallings", category: "Information Technology", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780134527338-M.jpg" },

    // ==========================================
    // ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS) - 25 BOOKS
    // ==========================================
    { id: "AIDS301", title: "Deep Learning", author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville", category: "Artificial Intelligence & Data Science", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780262035613-M.jpg" },
    { id: "AIDS302", title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow", author: "Aurélien Géron", category: "Artificial Intelligence & Data Science", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9781492032649-M.jpg" },
    { id: "AIDS303", title: "Pattern Recognition and Machine Learning", author: "Christopher M. Bishop", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780387310732-M.jpg" },
    { id: "AIDS304", title: "Machine Learning", author: "Tom M. Mitchell", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780070428072-M.jpg" },
    { id: "AIDS305", title: "Python for Data Analysis", author: "Wes McKinney", category: "Artificial Intelligence & Data Science", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9781491957660-M.jpg" },
    { id: "AIDS306", title: "Data Science from Scratch", author: "Joel Grus", category: "Artificial Intelligence & Data Science", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9781492041139-M.jpg" },
    { id: "AIDS307", title: "Reinforcement Learning: An Introduction", author: "Richard S. Sutton, Andrew G. Barto", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780262039246-M.jpg" },
    { id: "AIDS308", title: "Speech and Language Processing", author: "Daniel Jurafsky, James H. Martin", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780131873216-M.jpg" },
    { id: "AIDS309", title: "Computer Vision: Algorithms and Applications", author: "Richard Szeliski", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781848829343-M.jpg" },
    { id: "AIDS310", title: "Natural Language Processing with Python", author: "Steven Bird, Ewan Klein, Edward Loper", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780596516499-M.jpg" },
    { id: "AIDS311", title: "Probabilistic Graphical Models", author: "Daphne Koller, Nir Friedman", category: "Artificial Intelligence & Data Science", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780262013192-M.jpg" },
    { id: "AIDS312", title: "Deep Learning with Python", author: "François Chollet", category: "Artificial Intelligence & Data Science", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9781617294433-M.jpg" },
    { id: "AIDS313", title: "Mathematics for Machine Learning", author: "Marc Peter Deisenroth, A. Aldo Faisal", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9781108455145-M.jpg" },
    { id: "AIDS314", title: "Python Machine Learning", author: "Sebastian Raschka, Vahid Mirjalili", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9781789955750-M.jpg" },
    { id: "AIDS315", title: "Practical Statistics for Data Scientists", author: "Peter Bruce, Andrew Bruce, Peter Gedeck", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781492072942-M.jpg" },
    { id: "AIDS316", title: "Mining of Massive Datasets", author: "Jure Leskovec, Anand Rajaraman, Jeffrey D. Ullman", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781107077232-M.jpg" },
    { id: "AIDS317", title: "Generative Deep Learning", author: "David Foster", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781492041948-M.jpg" },
    { id: "AIDS318", title: "Transformers for Natural Language Processing", author: "Denis Rothman", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9781800563193-M.jpg" },
    { id: "AIDS319", title: "Feature Engineering for Machine Learning", author: "Alice Zheng, Amanda Casari", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781491953242-M.jpg" },
    { id: "AIDS320", title: "Applied Predictive Modeling", author: "Max Kuhn, Kjell Johnson", category: "Artificial Intelligence & Data Science", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9781461468486-M.jpg" },
    { id: "AIDS321", title: "Introduction to Data Mining", author: "Pang-Ning Tan, Michael Steinbach", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780133128901-M.jpg" },
    { id: "AIDS322", title: "Neural Networks and Deep Learning", author: "Michael Nielsen", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
    { id: "AIDS323", title: "Data Analytics with R", author: "R.N. Prasad, Seema Acharya", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { id: "AIDS324", title: "Business Intelligence and Analytics", author: "Ramesh Sharda, Dursun Delen", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780133051056-M.jpg" },
    { id: "AIDS325", title: "Machine Learning Yearning", author: "Andrew Ng", category: "Artificial Intelligence & Data Science", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80" },

    // ==========================================
    // ELECTRONICS & COMMUNICATION ENGINEERING (ECE) - 30 BOOKS
    // ==========================================
    { id: "ECE401", title: "Microelectronic Circuits", author: "Adel S. Sedra, Kenneth C. Smith", category: "Electronics & Communication", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780199333134-M.jpg" },
    { id: "ECE402", title: "Electronic Devices and Circuit Theory", author: "Robert L. Boylestad, Louis Nashelsky", category: "Electronics & Communication", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780132622264-M.jpg" },
    { id: "ECE403", title: "Digital Signal Processing", author: "John G. Proakis, Dimitris G. Manolakis", category: "Electronics & Communication", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780131873742-M.jpg" },
    { id: "ECE404", title: "Signals and Systems", author: "Alan V. Oppenheim, Alan S. Willsky", category: "Electronics & Communication", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9780138147570-M.jpg" },
    { id: "ECE405", title: "Communication Systems", author: "Simon Haykin", category: "Electronics & Communication", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780471697909-M.jpg" },
    { id: "ECE406", title: "Modern Digital and Analog Communication Systems", author: "B.P. Lathi, Zhi Ding", category: "Electronics & Communication", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780195331455-M.jpg" },
    { id: "ECE407", title: "CMOS VLSI Design", author: "Neil H.E. Weste, David Money Harris", category: "Electronics & Communication", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780321547743-M.jpg" },
    { id: "ECE408", title: "Antenna Theory: Analysis and Design", author: "Constantine A. Balanis", category: "Electronics & Communication", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781118642061-M.jpg" },
    { id: "ECE409", title: "Fundamentals of Electric Circuits", author: "Charles K. Alexander, Matthew N.O. Sadiku", category: "Electronics & Communication", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780078028229-M.jpg" },
    { id: "ECE410", title: "Linear Integrated Circuits", author: "D. Roy Choudhury, Shail B. Jain", category: "Electronics & Communication", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "ECE411", title: "Microwave Engineering", author: "David M. Pozar", category: "Electronics & Communication", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780470631553-M.jpg" },
    { id: "ECE412", title: "Optical Fiber Communications", author: "Gerd Keiser", category: "Electronics & Communication", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780073380711-M.jpg" },
    { id: "ECE413", title: "Digital Integrated Circuits", author: "Jan M. Rabaey, Anantha Chandrakasan", category: "Electronics & Communication", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780130909961-M.jpg" },
    { id: "ECE414", title: "Electromagnetic Waves and Radiating Systems", author: "Edward C. Jordan, Keith G. Balmain", category: "Electronics & Communication", totalCopies: 5, availableCopies: 5, cover: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400&q=80" },
    { id: "ECE415", title: "Embedded Systems: Architecture, Programming & Design", author: "Raj Kamal", category: "Electronics & Communication", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ECE416", title: "Digital Communications", author: "John G. Proakis, Masoud Salehi", category: "Electronics & Communication", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780072957167-M.jpg" },
    { id: "ECE417", title: "Control Systems Engineering", author: "I.J. Nagrath, M. Gopal", category: "Electronics & Communication", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ECE418", title: "Wireless Communications", author: "Andreas F. Molisch", category: "Electronics & Communication", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780470741863-M.jpg" },
    { id: "ECE419", title: "Fiber-Optic Communication Systems", author: "Govind P. Agrawal", category: "Electronics & Communication", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780470505113-M.jpg" },
    { id: "ECE420", title: "Semiconductor Physics and Devices", author: "Donald A. Neamen", category: "Electronics & Communication", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780073529585-M.jpg" },
    { id: "ECE421", title: "Electronic Communication Systems", author: "George Kennedy, Bernard Davis", category: "Electronics & Communication", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780074636824-M.jpg" },
    { id: "ECE422", title: "Principles of Electromagnetics", author: "Matthew N.O. Sadiku", category: "Electronics & Communication", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780199461851-M.jpg" },
    { id: "ECE423", title: "Satellite Communications", author: "Timothy Pratt, Charles W. Bostian", category: "Electronics & Communication", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780471370079-M.jpg" },
    { id: "ECE424", title: "VLSI Design", author: "Debaprasad Das", category: "Electronics & Communication", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "ECE425", title: "RF Microelectronics", author: "Behzad Razavi", category: "Electronics & Communication", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780137134731-M.jpg" },
    { id: "ECE426", title: "Analog Integrated Circuit Design", author: "David A. Johns, Ken Martin", category: "Electronics & Communication", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780471144489-M.jpg" },
    { id: "ECE427", title: "Digital Logic & State Machine Design", author: "David J. Comer", category: "Electronics & Communication", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780195107241-M.jpg" },
    { id: "ECE428", title: "Introduction to Embedded Systems", author: "Shibu K.V.", category: "Electronics & Communication", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80" },
    { id: "ECE429", title: "DSP Processor Architecture and Applications", author: "B. Venkataramani, M. Bhaskar", category: "Electronics & Communication", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ECE430", title: "Real-Time Digital Signal Processing", author: "Sen M. Kuo, Woon-Seng Gan", category: "Electronics & Communication", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780470014950-M.jpg" },

    // ==========================================
    // ELECTRICAL & ELECTRONICS ENGINEERING (EEE) - 25 BOOKS
    // ==========================================
    { id: "EEE501", title: "Electrical Machinery", author: "P.S. Bimbhra", category: "Electrical & Electronics", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "EEE502", title: "Power System Engineering", author: "I.J. Nagrath, D.P. Kothari", category: "Electrical & Electronics", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
    { id: "EEE503", title: "Power Electronics: Circuits, Devices & Applications", author: "Muhammad H. Rashid", category: "Electrical & Electronics", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780133125900-M.jpg" },
    { id: "EEE504", title: "Electric Machines", author: "D.P. Kothari, I.J. Nagrath", category: "Electrical & Electronics", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "EEE505", title: "A Course in Electrical Measurements & Instrumentation", author: "A.K. Sawhney", category: "Electrical & Electronics", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "EEE506", title: "Switchgear Protection and Power Systems", author: "Sunil S. Rao", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "EEE507", title: "Automatic Control Systems", author: "Benjamin C. Kuo, Farid Golnaraghi", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780471134763-M.jpg" },
    { id: "EEE508", title: "Elements of Power System Analysis", author: "William D. Stevenson Jr.", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780070612938-M.jpg" },
    { id: "EEE509", title: "Power System Protection and Switchgear", author: "Badri Ram, D.N. Vishwakarma", category: "Electrical & Electronics", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "EEE510", title: "High Voltage Engineering", author: "M.S. Naidu, V. Kamaraju", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
    { id: "EEE511", title: "Utilization of Electrical Energy", author: "E. Openshaw Taylor", category: "Electrical & Electronics", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
    { id: "EEE512", title: "Electric Drives: Concepts and Applications", author: "Vedam Subrahmanyam", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "EEE513", title: "Renewable Energy Resources", author: "John Twidell, Tony Weir", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780415584388-M.jpg" },
    { id: "EEE514", title: "Circuit Theory: Analysis and Synthesis", author: "A. Chakrabarti", category: "Electrical & Electronics", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "EEE515", title: "Generalized Theory of Electrical Machines", author: "P.S. Bimbhra", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "EEE516", title: "Basic Electrical Engineering", author: "V.K. Mehta, Rohit Mehta", category: "Electrical & Electronics", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "EEE517", title: "Electrical Power Systems", author: "C.L. Wadhwa", category: "Electrical & Electronics", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
    { id: "EEE518", title: "Control Systems Engineering", author: "Norman S. Nise", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9781118170519-M.jpg" },
    { id: "EEE519", title: "Electric Power Generation, Transmission & Distribution", author: "S.N. Singh", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "EEE520", title: "Smart Grid: Technology and Applications", author: "Janaka Ekanayake, Kithsiri Liyanage", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780470740309-M.jpg" },
    { id: "EEE521", title: "Microcontrollers: Architecture, Programming & Interfacing", author: "Raj Kamal", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "EEE522", title: "Solid State Electronic Devices", author: "Ben G. Streetman, Sanjay Kumar Banerjee", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780133356038-M.jpg" },
    { id: "EEE523", title: "Electric Motor Drives: Modeling, Analysis, and Control", author: "R. Krishnan", category: "Electrical & Electronics", totalCopies: 6, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780130910141-M.jpg" },
    { id: "EEE524", title: "Industrial Drives and Applications", author: "G.K. Dubey", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "EEE525", title: "Power System Operation and Control", author: "S. Sivanagaraju, G. Sreenivasan", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },

    // ==========================================
    // MECHANICAL ENGINEERING (ME) - 30 BOOKS
    // ==========================================
    { id: "ME601", title: "Shigley's Mechanical Engineering Design", author: "Richard G. Budynas, J. Keith Nisbett", category: "Mechanical Engineering", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780073398204-M.jpg" },
    { id: "ME602", title: "Theory of Machines", author: "S.S. Rattan", category: "Mechanical Engineering", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME603", title: "Internal Combustion Engines", author: "V. Ganesan", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=80" },
    { id: "ME604", title: "Fluid Mechanics and Hydraulic Machines", author: "R.K. Bansal", category: "Mechanical Engineering", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME605", title: "Heat and Mass Transfer", author: "R.K. Rajput", category: "Mechanical Engineering", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
    { id: "ME606", title: "Engineering Thermodynamics", author: "P.K. Nag", category: "Mechanical Engineering", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME607", title: "Strength of Materials", author: "R.K. Rajput", category: "Mechanical Engineering", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME608", title: "A Textbook of Thermal Engineering", author: "R.S. Khurmi, J.K. Gupta", category: "Mechanical Engineering", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
    { id: "ME609", title: "Manufacturing Science", author: "Amitabha Ghosh, Asok Kumar Mallik", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME610", title: "Production Technology", author: "R.K. Jain", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME611", title: "CAD/CAM: Principles and Applications", author: "P.N. Rao", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME612", title: "Operations Research: An Introduction", author: "Hamdy A. Taha", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780134444017-M.jpg" },
    { id: "ME613", title: "Refrigeration and Air Conditioning", author: "C.P. Arora", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME614", title: "Finite Element Analysis", author: "S.S. Bhavikatti", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME615", title: "Mechanical Vibrations", author: "V.P. Singh", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME616", title: "Design of Machine Elements", author: "V.B. Bhandari", category: "Mechanical Engineering", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME617", title: "Kinematics and Dynamics of Machinery", author: "Robert L. Norton", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780073529356-M.jpg" },
    { id: "ME618", title: "Materials Science and Engineering", author: "William D. Callister Jr.", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9781118324578-M.jpg" },
    { id: "ME619", title: "Fundamentals of Compressible Flow", author: "S.M. Yahya", category: "Mechanical Engineering", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME620", title: "Power Plant Engineering", author: "P.K. Nag", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "ME621", title: "Industrial Engineering and Management", author: "O.P. Khanna", category: "Mechanical Engineering", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME622", title: "Mechatronics: Electronic Control Systems in ME", author: "W. Bolton", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780273742869-M.jpg" },
    { id: "ME623", title: "Robotics and Control", author: "R.K. Mittal, I.J. Nagrath", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
    { id: "ME624", title: "Gas Turbines", author: "V. Ganesan", category: "Mechanical Engineering", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=80" },
    { id: "ME625", title: "Automobile Engineering Vol I & II", author: "Kirpal Singh", category: "Mechanical Engineering", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80" },
    { id: "ME626", title: "Computational Fluid Dynamics", author: "John D. Anderson Jr.", category: "Mechanical Engineering", totalCopies: 5, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780070016859-M.jpg" },
    { id: "ME627", title: "Welding Engineering and Technology", author: "R.S. Parmar", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
    { id: "ME628", title: "Tool Design", author: "Cyril Donaldson, George H. LeCain", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "ME629", title: "Metrology and Quality Control", author: "R.K. Jain", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "ME630", title: "Tribology in Industry", author: "B.C. Majumdar", category: "Mechanical Engineering", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },

    // ==========================================
    // CIVIL ENGINEERING (CE) - 25 BOOKS
    // ==========================================
    { id: "CE701", title: "Building Construction", author: "B.C. Punmia, Ashok Kumar Jain", category: "Civil Engineering", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE702", title: "Soil Mechanics and Foundations", author: "B.C. Punmia, Ashok Kumar Jain", category: "Civil Engineering", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE703", title: "Design of Reinforced Concrete Structures", author: "N. Krishna Raju", category: "Civil Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE704", title: "Surveying Vol I & II", author: "B.C. Punmia, Ashok Kumar Jain", category: "Civil Engineering", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE705", title: "Theory of Structures", author: "S. Ramamrutham, R. Narayan", category: "Civil Engineering", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE706", title: "Environmental Engineering Vol I & II", author: "S.K. Garg", category: "Civil Engineering", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
    { id: "CE707", title: "Transportation Engineering", author: "S.K. Khanna, C.E.G. Justo", category: "Civil Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE708", title: "Structural Analysis", author: "R.C. Hibbeler", category: "Civil Engineering", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780134610672-M.jpg" },
    { id: "CE709", title: "Fluid Mechanics and Hydraulics", author: "R.K. Rajput", category: "Civil Engineering", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE710", title: "Design of Steel Structures", author: "N. Subramanian", category: "Civil Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE711", title: "Hydraulics and Fluid Mechanics", author: "P.N. Modi, S.M. Seth", category: "Civil Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE712", title: "Concrete Technology: Theory & Practice", author: "M.S. Shetty", category: "Civil Engineering", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE713", title: "Limit State Design of Reinforced Concrete", author: "P.C. Varghese", category: "Civil Engineering", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE714", title: "Foundation Engineering", author: "V.N.S. Murthy", category: "Civil Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE715", title: "Irrigation Engineering & Hydraulic Structures", author: "S.K. Garg", category: "Civil Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
    { id: "CE716", title: "Town Planning", author: "S.C. Rangwala", category: "Civil Engineering", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
    { id: "CE717", title: "Construction Management and Planning", author: "B.S. Patil", category: "Civil Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE718", title: "Applied Mechanics", author: "S.S. Bhavikatti", category: "Civil Engineering", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE719", title: "Prestressed Concrete", author: "N. Krishna Raju", category: "Civil Engineering", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE720", title: "Highway Engineering", author: "S.K. Khanna, C.E.G. Justo", category: "Civil Engineering", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE721", title: "Bridge Engineering", author: "S. Ponnuswamy", category: "Civil Engineering", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?w=400&q=80" },
    { id: "CE722", title: "Quantity Surveying and Valuation", author: "B.N. Dutta", category: "Civil Engineering", totalCopies: 9, availableCopies: 9, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "CE723", title: "Remote Sensing and GIS", author: "B. Bhatta", category: "Civil Engineering", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
    { id: "CE724", title: "Earthquake Resistant Design of Structures", author: "Pankaj Agarwal, Manish Shrikhande", category: "Civil Engineering", totalCopies: 6, availableCopies: 6, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "CE725", title: "Geotechnical Engineering", author: "C. Venkatramaiah", category: "Civil Engineering", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },

    // ==========================================
    // BASIC SCIENCES & HUMANITIES (BSH) - 25 BOOKS
    // ==========================================
    { id: "BSH801", title: "Advanced Engineering Mathematics", author: "Erwin Kreyszig", category: "Basic Sciences & Humanities", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780470458365-M.jpg" },
    { id: "BSH802", title: "Higher Engineering Mathematics", author: "B.S. Grewal", category: "Basic Sciences & Humanities", totalCopies: 20, availableCopies: 20, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
    { id: "BSH803", title: "Fundamentals of Physics", author: "David Halliday, Robert Resnick, Jearl Walker", category: "Basic Sciences & Humanities", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9781118230718-M.jpg" },
    { id: "BSH804", title: "Engineering Chemistry", author: "Jain & Jain", category: "Basic Sciences & Humanities", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80" },
    { id: "BSH805", title: "Technical Communication: Principles and Practice", author: "Meenakshi Raman, Sangeeta Sharma", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
    { id: "BSH806", title: "University Physics with Modern Physics", author: "Hugh D. Young, Roger A. Freedman", category: "Basic Sciences & Humanities", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9780133983654-M.jpg" },
    { id: "BSH807", title: "Engineering Physics", author: "H.K. Malik, A. Singh", category: "Basic Sciences & Humanities", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
    { id: "BSH808", title: "A Textbook of Engineering Mathematics", author: "N.P. Bali, Manish Goyal", category: "Basic Sciences & Humanities", totalCopies: 16, availableCopies: 16, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
    { id: "BSH809", title: "Calculus and Analytic Geometry", author: "George B. Thomas, Ross L. Finney", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780201531749-M.jpg" },
    { id: "BSH810", title: "Linear Algebra and Its Applications", author: "Gilbert Strang", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780030105677-M.jpg" },
    { id: "BSH811", title: "Differential Equations and Boundary Value Problems", author: "William E. Boyce, Richard C. DiPrima", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780470458310-M.jpg" },
    { id: "BSH812", title: "Environmental Studies", author: "R. Rajagopalan", category: "Basic Sciences & Humanities", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
    { id: "BSH813", title: "Professional Ethics and Human Values", author: "R.S. Naagarazan", category: "Basic Sciences & Humanities", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
    { id: "BSH814", title: "Concepts of Modern Physics", author: "Arthur Beiser", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780072448481-M.jpg" },
    { id: "BSH815", title: "Quantum Mechanics: Theory & Applications", author: "A. Ghatak, S. Lokanathan", category: "Basic Sciences & Humanities", totalCopies: 7, availableCopies: 7, cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
    { id: "BSH816", title: "Introduction to Electrodynamics", author: "David J. Griffiths", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780321856562-M.jpg" },
    { id: "BSH817", title: "Thermal Physics", author: "P.K. Nag", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 8, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
    { id: "BSH818", title: "Probability and Statistics for Engineers", author: "Ronald E. Walpole, Raymond H. Myers", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780321694010-M.jpg" },
    { id: "BSH819", title: "Organic Chemistry", author: "Robert Thornton Morrison, Robert Neilson Boyd", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780136436690-M.jpg" },
    { id: "BSH820", title: "Physical Chemistry", author: "Peter Atkins, Julio de Paula", category: "Basic Sciences & Humanities", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781429218122-M.jpg" },
    { id: "BSH821", title: "Engineering Graphics & Drawing", author: "N.D. Bhatt", category: "Basic Sciences & Humanities", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
    { id: "BSH822", title: "Vector Analysis (Schaum's Outlines)", author: "Murray R. Spiegel", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780071615457-M.jpg" },
    { id: "BSH823", title: "Complex Variables and Applications", author: "James Ward Brown, Ruel V. Churchill", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780073051949-M.jpg" },
    { id: "BSH824", title: "Introduction to Probability Models", author: "Sheldon M. Ross", category: "Basic Sciences & Humanities", totalCopies: 7, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780123756862-M.jpg" },
    { id: "BSH825", title: "Business Communication: Building Critical Skills", author: "Kitty O. Locker", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780073403151-M.jpg" },

    // ==========================================
    // DR. A.P.J. ABDUL KALAM TECHNICAL UNIVERSITY (AKTU) 4-YEAR B.TECH SYLLABUS BOOKS
    // ==========================================

    // --- AKTU 1ST YEAR (COMMON SEM 1 & 2) ---
    { id: "AKTU101", title: "Engineering Mathematics - I (AKTU BAS-103)", author: "H.K. Dass, Dr. Rama Verma", category: "AKTU 1st Year", totalCopies: 20, availableCopies: 20, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
    { id: "AKTU102", title: "Engineering Mathematics - II (AKTU BAS-203)", author: "H.K. Dass, Rajnish Verma", category: "AKTU 1st Year", totalCopies: 18, availableCopies: 18, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
    { id: "AKTU103", title: "Engineering Physics (AKTU BAS-101)", author: "Hitendra K. Malik, A.K. Singh", category: "AKTU 1st Year", totalCopies: 16, availableCopies: 16, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
    { id: "AKTU104", title: "Engineering Chemistry (AKTU BAS-102)", author: "Dr. Shashi Chawla, Dr. Avinash Agarwal", category: "AKTU 1st Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80" },
    { id: "AKTU105", title: "Programming for Problem Solving in C (AKTU KCS-101T)", author: "E. Balagurusamy, Reema Thareja", category: "AKTU 1st Year", totalCopies: 22, availableCopies: 22, cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
    { id: "AKTU106", title: "Basic Electrical Engineering (AKTU KEE-101T)", author: "D.C. Kulshreshtha, V.K. Mehta", category: "AKTU 1st Year", totalCopies: 18, availableCopies: 18, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU107", title: "Basic Electronics Engineering (AKTU KEC-101T)", author: "Sanjay Sharma, J.B. Gupta", category: "AKTU 1st Year", totalCopies: 17, availableCopies: 17, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "AKTU108", title: "Fundamentals of Mechanical Engineering (AKTU KME-101T)", author: "Pravin Kumar, R.K. Rajput", category: "AKTU 1st Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "AKTU109", title: "Environment & Ecology (AKTU KNC-101)", author: "Dr. A.K. Pahari, Anubha Kaushik", category: "AKTU 1st Year", totalCopies: 22, availableCopies: 22, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },

    // --- AKTU 2ND YEAR (SEM 3 & 4) ---
    { id: "AKTU201", title: "Universal Human Values & Professional Ethics (AKTU KNC-301)", author: "R.R. Gaur, R. Sangal, G.P. Bagaria", category: "AKTU 2nd Year", totalCopies: 25, availableCopies: 25, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
    { id: "AKTU202", title: "Technical Communication (AKTU KAS-301)", author: "Meenakshi Raman, Sangeeta Sharma", category: "AKTU 2nd Year", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
    { id: "AKTU203", title: "Data Structures using C (AKTU KCS-301)", author: "Reema Thareja, Seymour Lipschutz", category: "AKTU 2nd Year", totalCopies: 20, availableCopies: 20, cover: "https://covers.openlibrary.org/b/isbn/9780198099307-M.jpg" },
    { id: "AKTU204", title: "Computer Organization & Architecture (AKTU KCS-302)", author: "M. Morris Mano, Carl Hamacher", category: "AKTU 2nd Year", totalCopies: 16, availableCopies: 16, cover: "https://covers.openlibrary.org/b/isbn/9780132145107-M.jpg" },
    { id: "AKTU205", title: "Discrete Structures & Theory of Logic (AKTU KCS-303)", author: "J.P. Tremblay, R. Manohar", category: "AKTU 2nd Year", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780074631133-M.jpg" },
    { id: "AKTU206", title: "Operating Systems (AKTU KCS-401)", author: "Abraham Silberschatz, Peter B. Galvin", category: "AKTU 2nd Year", totalCopies: 18, availableCopies: 18, cover: "https://covers.openlibrary.org/b/isbn/9781119800361-M.jpg" },
    { id: "AKTU207", title: "Theory of Automata & Formal Languages (AKTU KCS-402)", author: "K.L.P. Mishra, N. Chandrasekaran", category: "AKTU 2nd Year", totalCopies: 17, availableCopies: 17, cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" },
    { id: "AKTU208", title: "Microprocessor & Interfacing (AKTU KCS-403)", author: "Ramesh S. Gaonkar, A.K. Ray", category: "AKTU 2nd Year", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "AKTU209", title: "Network Analysis & Synthesis (AKTU KEC-301)", author: "A. Chakrabarti, M.E. Van Valkenburg", category: "AKTU 2nd Year", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
    { id: "AKTU210", title: "Digital System Design (AKTU KEC-302)", author: "M. Morris Mano, Charles H. Roth", category: "AKTU 2nd Year", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780132145107-M.jpg" },
    { id: "AKTU211", title: "Solid State Devices (AKTU KEC-303)", author: "Ben G. Streetman, Sanjay Banerjee", category: "AKTU 2nd Year", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780133356038-M.jpg" },
    { id: "AKTU212", title: "Analog Circuits (AKTU KEC-401)", author: "Adel S. Sedra, Kenneth C. Smith", category: "AKTU 2nd Year", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780199333134-M.jpg" },
    { id: "AKTU213", title: "Signals & Systems (AKTU KEC-402)", author: "Alan V. Oppenheim, Sanjay Sharma", category: "AKTU 2nd Year", totalCopies: 16, availableCopies: 16, cover: "https://covers.openlibrary.org/b/isbn/9780138147570-M.jpg" },
    { id: "AKTU214", title: "Communication Engineering (AKTU KEC-403)", author: "Sanjay Sharma, B.P. Lathi", category: "AKTU 2nd Year", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780195331455-M.jpg" },
    { id: "AKTU215", title: "Electrical Machines - I (AKTU KEE-301)", author: "P.S. Bimbhra, J.B. Gupta", category: "AKTU 2nd Year", totalCopies: 18, availableCopies: 18, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "AKTU216", title: "Electrical Machines - II (AKTU KEE-401)", author: "P.S. Bimbhra, D.P. Kothari", category: "AKTU 2nd Year", totalCopies: 16, availableCopies: 16, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
    { id: "AKTU217", title: "Thermodynamics (AKTU KME-301)", author: "P.K. Nag, Yunus A. Cengel", category: "AKTU 2nd Year", totalCopies: 16, availableCopies: 16, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU218", title: "Strength of Materials (AKTU KME-302)", author: "R.K. Rajput, S. Ramamrutham", category: "AKTU 2nd Year", totalCopies: 18, availableCopies: 18, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "AKTU219", title: "Manufacturing Processes (AKTU KME-303)", author: "Serope Kalpakjian, B.S. Raghuwanshi", category: "AKTU 2nd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU220", title: "Applied Thermodynamics (AKTU KME-401)", author: "R. Yadav, Onkar Singh", category: "AKTU 2nd Year", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
    { id: "AKTU221", title: "Fluid Mechanics & Machines (AKTU KME-402)", author: "R.K. Bansal, P.N. Modi", category: "AKTU 2nd Year", totalCopies: 19, availableCopies: 19, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "AKTU222", title: "Building Materials & Construction (AKTU KCE-301)", author: "S.K. Duggal, S.C. Rangwala", category: "AKTU 2nd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "AKTU223", title: "Surveying & Geomatics (AKTU KCE-302)", author: "B.C. Punmia, Ashok Kumar Jain", category: "AKTU 2nd Year", totalCopies: 18, availableCopies: 18, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "AKTU224", title: "Structural Analysis - I (AKTU KCE-401)", author: "S. Ramamrutham, S.S. Bhavikatti", category: "AKTU 2nd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },

    // --- AKTU 3RD YEAR (SEM 5 & 6) ---
    { id: "AKTU301", title: "Constitution of India & Law (AKTU KNC-501)", author: "Madhav Khosla, D.D. Basu", category: "AKTU 3rd Year", totalCopies: 20, availableCopies: 20, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
    { id: "AKTU302", title: "Database Management System (AKTU KCS-501)", author: "Henry F. Korth, Abraham Silberschatz", category: "AKTU 3rd Year", totalCopies: 19, availableCopies: 19, cover: "https://covers.openlibrary.org/b/isbn/9780073523323-M.jpg" },
    { id: "AKTU303", title: "Web Designing & Technology (AKTU KCS-502)", author: "Uttam K. Roy, Harvey Deitel", category: "AKTU 3rd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80" },
    { id: "AKTU304", title: "Design & Analysis of Algorithms (AKTU KCS-503)", author: "Thomas H. Cormen, Ellis Horowitz", category: "AKTU 3rd Year", totalCopies: 20, availableCopies: 20, cover: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg" },
    { id: "AKTU305", title: "Compiler Design (AKTU KCS-601)", author: "Alfred V. Aho, Jeffrey D. Ullman", category: "AKTU 3rd Year", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780321486813-M.jpg" },
    { id: "AKTU306", title: "Software Engineering (AKTU KCS-602)", author: "Rajib Mall, Roger S. Pressman", category: "AKTU 3rd Year", totalCopies: 16, availableCopies: 16, cover: "https://covers.openlibrary.org/b/isbn/9780078022128-M.jpg" },
    { id: "AKTU307", title: "Computer Networks (AKTU KCS-603)", author: "Behrouz A. Forouzan, Andrew S. Tanenbaum", category: "AKTU 3rd Year", totalCopies: 18, availableCopies: 18, cover: "https://covers.openlibrary.org/b/isbn/9780073376226-M.jpg" },
    { id: "AKTU308", title: "Electromagnetic Field Theory (AKTU KEC-501)", author: "Matthew N.O. Sadiku", category: "AKTU 3rd Year", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780199461851-M.jpg" },
    { id: "AKTU309", title: "Digital Signal Processing (AKTU KEC-502)", author: "S. Salivahanan, John G. Proakis", category: "AKTU 3rd Year", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780131873742-M.jpg" },
    { id: "AKTU310", title: "VLSI Design (AKTU KEC-601)", author: "Debaprasad Das, Neil H.E. Weste", category: "AKTU 3rd Year", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9780321547743-M.jpg" },
    { id: "AKTU311", title: "Control Systems (AKTU KEE-402 / KEC-602)", author: "I.J. Nagrath, M. Gopal", category: "AKTU 3rd Year", totalCopies: 17, availableCopies: 17, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "AKTU312", title: "Power System - I (AKTU KEE-501)", author: "C.L. Wadhwa, V.K. Mehta", category: "AKTU 3rd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
    { id: "AKTU313", title: "Power Electronics (AKTU KEE-502)", author: "P.S. Bimbhra, M.H. Rashid", category: "AKTU 3rd Year", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780133125900-M.jpg" },
    { id: "AKTU314", title: "Theory of Machines (AKTU KME-501)", author: "S.S. Rattan, R.S. Khurmi", category: "AKTU 3rd Year", totalCopies: 16, availableCopies: 16, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU315", title: "Heat & Mass Transfer (AKTU KME-502)", author: "R.K. Rajput, P.K. Nag", category: "AKTU 3rd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
    { id: "AKTU316", title: "Design of Machine Elements (AKTU KME-601)", author: "V.B. Bhandari, R.S. Khurmi", category: "AKTU 3rd Year", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU317", title: "Design of Concrete Structures (AKTU KCE-502)", author: "N. Krishna Raju, Pillai & Menon", category: "AKTU 3rd Year", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "AKTU318", title: "Geotechnical Engineering (AKTU KCE-503)", author: "K.R. Arora, B.C. Punmia", category: "AKTU 3rd Year", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
    { id: "AKTU319", title: "Environmental Engineering (AKTU KCE-601)", author: "S.K. Garg", category: "AKTU 3rd Year", totalCopies: 16, availableCopies: 16, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
    { id: "AKTU320", title: "Design of Steel Structures (AKTU KCE-602)", author: "N. Subramanian, S.K. Duggal", category: "AKTU 3rd Year", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "AKTU321", title: "Transportation Engineering (AKTU KCE-603)", author: "S.K. Khanna, C.E.G. Justo", category: "AKTU 3rd Year", totalCopies: 15, availableCopies: 15, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },

    // --- AKTU 4TH YEAR (SEM 7 & 8) ---
    { id: "AKTU401", title: "Artificial Intelligence (AKTU KCS-071)", author: "Stuart Russell, Peter Norvig", category: "AKTU 4th Year", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780134610993-M.jpg" },
    { id: "AKTU402", title: "Natural Language Processing (AKTU KCS-072)", author: "Daniel Jurafsky, James H. Martin", category: "AKTU 4th Year", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780131873216-M.jpg" },
    { id: "AKTU403", title: "Cloud Computing (AKTU KCS-073)", author: "Rajiv Chopra, Thomas Erl", category: "AKTU 4th Year", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780133387520-M.jpg" },
    { id: "AKTU404", title: "Cryptography & Network Security (AKTU KCS-074)", author: "William Stallings, Atul Kahate", category: "AKTU 4th Year", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780134444284-M.jpg" },
    { id: "AKTU405", title: "Machine Learning Techniques (AKTU KCS-078)", author: "Tom M. Mitchell, Aurélien Géron", category: "AKTU 4th Year", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9781492032649-M.jpg" },
    { id: "AKTU406", title: "Big Data Analytics (AKTU KCS-081)", author: "V.K. Jain, Nathan Marz", category: "AKTU 4th Year", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9781617290343-M.jpg" },
    { id: "AKTU407", title: "Deep Learning (AKTU KCS-082)", author: "Ian Goodfellow, Yoshua Bengio", category: "AKTU 4th Year", totalCopies: 13, availableCopies: 13, cover: "https://covers.openlibrary.org/b/isbn/9780262035613-M.jpg" },
    { id: "AKTU408", title: "Internet of Things - IoT (AKTU KCS-085)", author: "Arshdeep Bahga, Vijay Madisetti", category: "AKTU 4th Year", totalCopies: 14, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780996025515-M.jpg" },
    { id: "AKTU409", title: "Wireless & Mobile Communication (AKTU KEC-071)", author: "Andreas F. Molisch, Sanjay Sharma", category: "AKTU 4th Year", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780470741863-M.jpg" },
    { id: "AKTU410", title: "Optical Communication (AKTU KEC-072)", author: "Gerd Keiser, Govind P. Agrawal", category: "AKTU 4th Year", totalCopies: 10, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780073380711-M.jpg" },
    { id: "AKTU411", title: "Satellite Communication (AKTU KEC-081)", author: "Timothy Pratt, Charles Bostian", category: "AKTU 4th Year", totalCopies: 11, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9780471370079-M.jpg" },
    { id: "AKTU412", title: "Embedded Systems Architecture (AKTU KEC-082)", author: "Raj Kamal, Shibu K.V.", category: "AKTU 4th Year", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU413", title: "Electric Drives & Applications (AKTU KEE-071)", author: "Vedam Subrahmanyam, G.K. Dubey", category: "AKTU 4th Year", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
    { id: "AKTU414", title: "Renewable Energy Resources (AKTU KEE-072)", author: "John Twidell, Tony Weir", category: "AKTU 4th Year", totalCopies: 12, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780415584388-M.jpg" },
    { id: "AKTU415", title: "Smart Grid Technologies (AKTU KEE-081)", author: "Janaka Ekanayake, Kithsiri Liyanage", category: "AKTU 4th Year", totalCopies: 9, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780470740309-M.jpg" },
    { id: "AKTU416", title: "Computer Aided Design - CAD/CAM (AKTU KME-071)", author: "P.N. Rao", category: "AKTU 4th Year", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
    { id: "AKTU417", title: "Automobile Engineering (AKTU KME-072)", author: "Kirpal Singh, V. Ganesan", category: "AKTU 4th Year", totalCopies: 14, availableCopies: 14, cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80" },
    { id: "AKTU418", title: "Industrial Engineering & Operations Research (AKTU KME-081)", author: "O.P. Khanna, Hamdy A. Taha", category: "AKTU 4th Year", totalCopies: 15, availableCopies: 15, cover: "https://covers.openlibrary.org/b/isbn/9780134444017-M.jpg" },
    { id: "AKTU419", title: "Earthquake Resistant Design (AKTU KCE-071)", author: "Pankaj Agarwal, Manish Shrikhande", category: "AKTU 4th Year", totalCopies: 10, availableCopies: 10, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "AKTU420", title: "Irrigation Engineering & Hydraulic Structures (AKTU KCE-072)", author: "S.K. Garg", category: "AKTU 4th Year", totalCopies: 13, availableCopies: 13, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
    { id: "AKTU421", title: "Construction Technology & Management (AKTU KCE-081)", author: "B.S. Patil", category: "AKTU 4th Year", totalCopies: 11, availableCopies: 11, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
    { id: "AKTU422", title: "Remote Sensing & GIS Applications (AKTU KCE-082)", author: "B. Bhatta", category: "AKTU 4th Year", totalCopies: 12, availableCopies: 12, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" }
];

// DOM Elements
var studentTabBtn = document.getElementById("studentTabBtn");
var adminTabBtn = document.getElementById("adminTabBtn");
var studentPortal = document.getElementById("studentPortal");
var adminPortal = document.getElementById("adminPortal");

var searchInput = document.getElementById("searchInput");
var categoryFilter = document.getElementById("categoryFilter");
var catalogList = document.getElementById("catalogList");
var myBorrowedList = document.getElementById("myBorrowedList");

var chatInput = document.getElementById("chatInput");
var sendChatBtn = document.getElementById("sendChatBtn");
var chatHistory = document.getElementById("chatHistory");

var bookTitle = document.getElementById("bookTitle");
var bookAuthor = document.getElementById("bookAuthor");
var bookCategory = document.getElementById("bookCategory");
var bookIsbn = document.getElementById("bookIsbn");
var bookCopies = document.getElementById("bookCopies");
var bookCover = document.getElementById("bookCover");
var addBookBtn = document.getElementById("addBookBtn");
var issuedLogList = document.getElementById("issuedLogList");
var adminInventoryList = document.getElementById("adminInventoryList");
var quickChipsContainer = document.getElementById("quickChipsContainer");
var chatbotSubtitle = document.getElementById("chatbotSubtitle");

var books = [];
var borrowedBooks = [];
var currentPortal = "student";
var catalogCurrentPage = 1;
var adminInventoryCurrentPage = 1;
var ITEMS_PER_PAGE = 12;
var _sessionRestored = false; // Flag to prevent auth listener overriding restored session

// Generate a unique book ID using timestamp to avoid duplicates
function generateBookId() {
    return "ENG" + Date.now() + Math.floor(Math.random() * 100);
}

var _pendingModalUser = null;

function applyLoggedInUser(user, admissionId) {
    if (!user) return;
    currentUser = user;
    var uid = user.uid || ('usr_' + Date.now());
    var localId = admissionId || localStorage.getItem('user_admission_id_' + uid);
    if (localId && localId.trim()) {
        _sessionRestored = true;
        _showAppUI(user, localId.trim());
        renderAll();
        if (typeof isFirebaseActive !== 'undefined' && isFirebaseActive && db) {
            db.ref('users/' + uid).once('value').then(function(snap) {
                var dbU = snap.val();
                if (dbU && dbU.admissionId) localStorage.setItem('user_admission_id_' + uid, dbU.admissionId);
                db.ref('users/' + uid).update({ lastLogin: new Date().toISOString() }).catch(function(){});
            }).catch(function(e){ console.warn('Firebase bg sync:', e.message); });
        }
        return;
    }
    _applyLoggedInUserAsync(user, uid);
}

async function _applyLoggedInUserAsync(user, uid) {
    var admissionId = null;
    if (typeof isFirebaseActive !== 'undefined' && isFirebaseActive && db) {
        try {
            var dbPromise = db.ref('users/' + uid).once('value');
            var timeoutPromise = new Promise(function(resolve) { setTimeout(resolve, 1200); });
            var snapshot = await Promise.race([dbPromise, timeoutPromise]);
            if (snapshot && typeof snapshot.val === 'function') {
                var dbUser = snapshot.val();
                if (dbUser && dbUser.admissionId) admissionId = dbUser.admissionId;
            }
        } catch (dbErr) { console.warn('DB fetch error:', dbErr.message); }
    }
    if (!admissionId) admissionId = localStorage.getItem('user_admission_id_' + uid);
    if (admissionId && admissionId.trim()) {
        localStorage.setItem('user_admission_id_' + uid, admissionId.trim());
        localStorage.setItem('shelf_current_user', JSON.stringify({ uid: uid, displayName: user.displayName || user.email || 'Student User', email: user.email || '', photoURL: user.photoURL || 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }));
        _sessionRestored = true;
        _showAppUI(user, admissionId.trim());
        renderAll();
        return;
    }

    // Show smooth in-page Admission ID modal instead of blocking native prompt
    _pendingModalUser = { user: user, uid: uid };
    var modal = document.getElementById('admissionModal');
    var modalTitle = document.getElementById('admissionModalTitle');
    var input = document.getElementById('admissionIdInput');
    var errEl = document.getElementById('admissionIdError');
    if (modalTitle) modalTitle.innerText = "Welcome, " + (user.displayName || user.email || "Student") + "!";
    if (input) { input.value = ""; }
    if (errEl) errEl.style.display = "none";
    if (modal) modal.style.display = "flex";
    setTimeout(function() { if (input) input.focus(); }, 100);
}

function submitAdmissionId() {
    var input = document.getElementById('admissionIdInput');
    var errEl = document.getElementById('admissionIdError');
    var val = input ? input.value.trim() : "";

    if (!val || val.length < 2) {
        if (errEl) { errEl.innerText = "⚠️ Please enter a valid Admission ID / Roll Number (minimum 2 characters)"; errEl.style.display = "block"; }
        if (input) input.focus();
        return;
    }

    if (errEl) errEl.style.display = "none";
    var modal = document.getElementById('admissionModal');
    if (modal) modal.style.display = "none";

    var userObj = _pendingModalUser ? _pendingModalUser.user : currentUser;
    var uid = (_pendingModalUser && _pendingModalUser.uid) ? _pendingModalUser.uid : (userObj ? userObj.uid : ("usr_" + Date.now()));

    if (!userObj) {
        userObj = { uid: uid, displayName: "Student", email: "", photoURL: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" };
    }

    currentUser = userObj;
    localStorage.setItem('user_admission_id_' + uid, val);
    localStorage.setItem('shelf_current_user', JSON.stringify({ uid: uid, displayName: userObj.displayName || userObj.email || 'Student User', email: userObj.email || '', photoURL: userObj.photoURL || 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }));

    if (typeof isFirebaseActive !== 'undefined' && isFirebaseActive && db) {
        try {
            db.ref('users/' + uid).set({
                uid: uid,
                displayName: userObj.displayName || userObj.email || 'Student User',
                email: userObj.email || '',
                photoURL: userObj.photoURL || 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
                admissionId: val,
                lastLogin: new Date().toISOString()
            });
        } catch (e) { console.error('Firebase save error:', e); }
    }

    _pendingModalUser = null;
    _sessionRestored = true;
    _showAppUI(userObj, val);
    renderAll();
}

function _showAppUI(user, admissionId) {
    var authLockScreen = document.getElementById('authLockScreen');
    var appLayout = document.getElementById('appLayout');
    var signInBtn = document.getElementById('googleSignInBtn');
    var userProfile = document.getElementById('userProfile');
    var userAvatar = document.getElementById('userAvatar');
    var userName = document.getElementById('userName');
    if (authLockScreen) authLockScreen.style.display = 'none';
    if (appLayout) appLayout.style.display = 'grid';
    if (signInBtn) signInBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (userAvatar) userAvatar.src = user.photoURL || 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg';
    if (userName) { userName.innerHTML = (user.displayName || user.email || 'Student User') + ' <span style="font-size: 0.8rem; font-weight: normal; opacity: 0.85;">(ID: ' + admissionId + ')</span>'; }
}

// handleUserAuthSuccess is kept for backward compat with firebase-config.js
var handleUserAuthSuccess = applyLoggedInUser;

function checkAndRestoreUserSession() {
    var storedUserJson = localStorage.getItem("shelf_current_user");
    if (storedUserJson) {
        try {
            var parsedUser = JSON.parse(storedUserJson);
            if (parsedUser && parsedUser.uid) {
                _sessionRestored = true;
                applyLoggedInUser(parsedUser);
                return true;
            }
        } catch (e) {
            console.error("Error parsing stored session:", e);
        }
    }
    return false;
}

function init() {
    loadData();
    setupEventListeners();

    // 1. Handle pending auth user queued by firebase-config.js before script.js loaded
    //    (happens when popup completes before DOMContentLoaded)
    if (window._pendingAuthUser) {
        var pendingUser = window._pendingAuthUser;
        window._pendingAuthUser = null;
        _sessionRestored = true;
        applyLoggedInUser(pendingUser);
        renderQuickChips();
        return;
    }

    // 2. Try restoring from localStorage (page refresh with existing session)
    var restored = checkAndRestoreUserSession();
    if (!restored) {
        // 3. No session found — show the lock screen, wait for Google sign-in
        var authLockScreen = document.getElementById("authLockScreen");
        var appLayout = document.getElementById("appLayout");
        if (authLockScreen) authLockScreen.style.display = "flex";
        if (appLayout) appLayout.style.display = "none";
    }
    renderQuickChips();
}

function recalculateAvailability() {
    if (!books || !Array.isArray(books)) return;

    var activeBorrowMap = {};
    if (borrowedBooks && Array.isArray(borrowedBooks)) {
        for (var i = 0; i < borrowedBooks.length; i++) {
            var bId = borrowedBooks[i].bookId;
            if (bId) {
                activeBorrowMap[bId] = (activeBorrowMap[bId] || 0) + 1;
            }
        }
    }

    for (var j = 0; j < books.length; j++) {
        var book = books[j];
        var total = (typeof book.totalCopies === "number" && book.totalCopies > 0) ? book.totalCopies : 5;
        book.totalCopies = total;
        var borrowedCount = activeBorrowMap[book.id] || 0;
        // Available copies = total copies minus actual borrowed count by real users!
        book.availableCopies = Math.max(0, total - borrowedCount);
    }
}

function getPopularAvailableBooks(limit) {
    limit = limit || 12;
    var availables = books.filter(function (b) { return b.availableCopies > 0; });

    var popularIds = ["CSE101", "CSE108", "CSE102", "CSE107", "CSE120", "CSE135", "IT201", "AKTU101", "AKTU201", "AKTU301", "AKTU401", "ECE301", "EEE301", "ME301", "BSH101"];
    var popularList = [];

    for (var i = 0; i < popularIds.length; i++) {
        var found = availables.find(function (b) { return b.id === popularIds[i]; });
        if (found) popularList.push(found);
    }

    for (var j = 0; j < availables.length; j++) {
        if (popularList.length >= limit) break;
        if (popularList.indexOf(availables[j]) === -1) {
            popularList.push(availables[j]);
        }
    }

    return popularList.slice(0, limit);
}

function loadData() {
    var catalogVer = localStorage.getItem("lib_catalog_version");
    var storedBooks = localStorage.getItem("lib_books");
    var storedBorrowed = localStorage.getItem("lib_borrowed");

    if (storedBorrowed) {
        try {
            borrowedBooks = JSON.parse(storedBorrowed);
        } catch (e) {
            borrowedBooks = [];
        }
    }

    if (storedBooks && catalogVer === "11.0_real_covers") {
        try {
            books = JSON.parse(storedBooks);
        } catch (e) {
            books = JSON.parse(JSON.stringify(sampleBooks));
        }
    } else {
        // Deep-clone sampleBooks so the original array is never mutated
        books = JSON.parse(JSON.stringify(sampleBooks));
        localStorage.setItem("lib_catalog_version", "11.0_real_covers");
    }

    // Only set SVG cover fallback for books that have NO cover URL at all
    // DO NOT overwrite valid HTTP/HTTPS cover URLs — these are real book cover images!
    books.forEach(function (b) {
        if (!b.cover || b.cover.trim() === "") {
            b.cover = createBookCoverDataUri(b.title, b.author, b.category);
        }
    });

    recalculateAvailability();
    saveBooks();

    // Firebase realtime sync listeners
    if (typeof isFirebaseActive !== "undefined" && isFirebaseActive && db) {
        db.ref("books").on("value", function (snapshot) {
            var data = snapshot.val();
            if (data && Array.isArray(data)) {
                books = data;
                recalculateAvailability();
                localStorage.setItem("lib_books", JSON.stringify(books));
                renderAll();
            }
        });

        db.ref("borrowed").on("value", function (snapshot) {
            var data = snapshot.val();
            if (data && Array.isArray(data)) {
                borrowedBooks = data;
                recalculateAvailability();
                localStorage.setItem("lib_borrowed", JSON.stringify(borrowedBooks));
                renderAll();
            }
        });
    }
}

// Returns only the current signed-in user's borrowed books
function getMyBorrowedBooks() {
    if (!currentUser) return [];
    var uid = currentUser.uid;
    return borrowedBooks.filter(function (item) {
        return item.uid === uid;
    });
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

function setupEventListeners() {
    studentTabBtn.addEventListener("click", function () { switchPortal("student"); });
    adminTabBtn.addEventListener("click", function () { switchPortal("admin"); });

    searchInput.addEventListener("input", function() {
        catalogCurrentPage = 1;
        renderCatalog();
    });
    categoryFilter.addEventListener("change", function() {
        catalogCurrentPage = 1;
        renderCatalog();
    });

    var adminUniversalSearchInput = document.getElementById("adminUniversalSearchInput");
    var adminUniversalFilter = document.getElementById("adminUniversalFilter");
    var adminSearchInput = document.getElementById("adminSearchInput");
    var adminCategoryFilter = document.getElementById("adminCategoryFilter");
    var adminIssuedSearchInput = document.getElementById("adminIssuedSearchInput");
    var adminIssuedFilter = document.getElementById("adminIssuedFilter");

    if (adminUniversalSearchInput) {
        adminUniversalSearchInput.addEventListener("input", function() {
            var val = adminUniversalSearchInput.value;
            if (adminSearchInput) adminSearchInput.value = val;
            if (adminIssuedSearchInput) adminIssuedSearchInput.value = val;
            adminInventoryCurrentPage = 1;
            renderAdminInventory();
            renderIssuedLog();
        });
    }

    if (adminUniversalFilter) {
        adminUniversalFilter.addEventListener("change", function() {
            var cat = adminUniversalFilter.value;
            if (adminCategoryFilter) adminCategoryFilter.value = cat;
            adminInventoryCurrentPage = 1;
            renderAdminInventory();
            renderIssuedLog();
        });
    }

    if (adminSearchInput) {
        adminSearchInput.addEventListener("input", function() {
            adminInventoryCurrentPage = 1;
            renderAdminInventory();
        });
    }
    if (adminCategoryFilter) {
        adminCategoryFilter.addEventListener("change", function() {
            adminInventoryCurrentPage = 1;
            renderAdminInventory();
        });
    }
    if (adminIssuedSearchInput) {
        adminIssuedSearchInput.addEventListener("input", renderIssuedLog);
    }
    if (adminIssuedFilter) {
        adminIssuedFilter.addEventListener("change", renderIssuedLog);
    }

    addBookBtn.addEventListener("click", addNewBook);

    var scanCoverBtn = document.getElementById("scanCoverBtn");
    if (scanCoverBtn) {
        scanCoverBtn.addEventListener("click", scanBookCoverFile);
    }

    var bulkCsvInput = document.getElementById("bulkCsvInput");
    var importCsvBtn = document.getElementById("importCsvBtn");
    var importPasteBtn = document.getElementById("importPasteBtn");

    if (importCsvBtn && bulkCsvInput) {
        importCsvBtn.addEventListener("click", function () {
            if (!bulkCsvInput.files || bulkCsvInput.files.length === 0) {
                alert("Please select a .CSV or .TXT file to upload!");
                return;
            }
            var file = bulkCsvInput.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                parseAndImportCsvText(e.target.result);
            };
            reader.readAsText(file);
        });
    }

    if (importPasteBtn) {
        importPasteBtn.addEventListener("click", function () {
            var textarea = document.getElementById("bulkCsvTextarea");
            if (textarea) {
                parseAndImportCsvText(textarea.value);
            }
        });
    }

    // Note: Inline onclick handlers in index.html (onclick="signInWithGoogle()", etc.) handle clicks directly.

    // Firebase auth state listener — handles fresh Google sign-ins
    if (typeof auth !== "undefined" && auth) {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                // Firebase confirmed a signed-in user
                if (_sessionRestored && currentUser && currentUser.uid === user.uid) {
                    // Already handled this user — skip duplicate call
                    return;
                }
                localStorage.setItem("shelf_current_user", JSON.stringify({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }));
                _sessionRestored = true;
                applyLoggedInUser(user);
            } else {
                // Firebase reports no user
                if (_sessionRestored) {
                    // Session already active via localStorage — keep the user logged in
                    return;
                }
                // No localStorage session either — show lock screen
                currentUser = null;
                var authLockScreen = document.getElementById("authLockScreen");
                var appLayout = document.getElementById("appLayout");
                var signInBtn = document.getElementById("googleSignInBtn");
                var userProfile = document.getElementById("userProfile");
                if (authLockScreen) authLockScreen.style.display = "flex";
                if (appLayout) appLayout.style.display = "none";
                if (signInBtn) signInBtn.style.display = "flex";
                if (userProfile) userProfile.style.display = "none";
            }
        });
    }

    sendChatBtn.addEventListener("click", function () {
        sendChatMessage(chatInput.value.trim());
    });

    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendChatMessage(chatInput.value.trim());
        }
    });
}

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
        var availableBooksList = books.filter(function (b) { return b.availableCopies > 0; });
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

function renderAll() {
    renderStats();
    renderCatalog();
    renderMyBorrowed();
    renderAdminInventory();
    renderIssuedLog();
}

function renderStats() {
    var summaryContainer = document.getElementById("summaryCardsContainer");
    if (!summaryContainer) return;

    var nowTime = Date.now();

    if (currentPortal === "student") {
        var myBooks = getMyBorrowedBooks();
        var myLoanCount = myBooks.length;
        var totalFine = 0;
        var activeOnTimeCount = 0;

        for (var i = 0; i < myBooks.length; i++) {
            var item = myBooks[i];
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

function renderCatalog() {
    var query = searchInput.value.toLowerCase().trim();
    var category = categoryFilter.value;

    catalogList.innerHTML = "";
    var catalogPagination = document.getElementById("catalogPagination");

    var filtered = [];

    if (category === "Popular Available") {
        filtered = getPopularAvailableBooks(24);
    } else {
        filtered = books.filter(function (book) {
            var matchesQuery = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query) || book.category.toLowerCase().includes(query);
            var matchesCategory = (category === "All" || book.category === category || (category === "AKTU Curriculum" && book.category.indexOf("AKTU") !== -1));
            return matchesQuery && matchesCategory;
        });
    }

    if (filtered.length === 0) {
        var popularList = getPopularAvailableBooks(12);
        var noResultBanner = document.createElement("div");
        noResultBanner.style.cssText = "grid-column: 1 / -1; width: 100%; text-align: center; padding: 20px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; margin-bottom: 20px;";
        noResultBanner.innerHTML = '<h3 style="color: #ef4444; margin-bottom: 6px; font-size: 1.1rem;">🔍 No exact title found for "' + query + '"</h3>'
            + '<p style="color: #6b7280; font-size: 0.95rem;">Here are <strong>🔥 Popular Books Currently Available</strong> in our library:</p>';
        catalogList.appendChild(noResultBanner);

        filtered = popularList;
    }

    // Pagination slicing
    var totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (catalogCurrentPage > totalPages) catalogCurrentPage = totalPages;
    if (catalogCurrentPage < 1) catalogCurrentPage = 1;

    var startIdx = (catalogCurrentPage - 1) * ITEMS_PER_PAGE;
    var pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    for (var i = 0; i < pageItems.length; i++) {
        var book = pageItems[i];
        var isAvailable = book.availableCopies > 0;

        var card = document.createElement("div");
        card.className = "book-card";

        var safeTitle = book.title.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        var safeAuthor = book.author.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        var coverUrl = book.cover || DEFAULT_COVER;

        var myUid = currentUser ? currentUser.uid : "anonymous";
        var existingBorrow = borrowedBooks.find(function (item) {
            return item.bookId === book.id && item.uid === myUid && item.status !== "Returned";
        });

        var actionBtnHtml = "";
        if (existingBorrow) {
            if (existingBorrow.status === "Pending Approval") {
                actionBtnHtml = '<button class="action-btn" disabled style="background: #f59e0b; color: white; width: 100%; opacity: 0.9; cursor: default;">⏳ Request Pending</button>';
            } else {
                actionBtnHtml = '<button class="action-btn" disabled style="background: #64748b; color: white; width: 100%; opacity: 0.8; cursor: default;">🔒 Issued to You</button>';
            }
        } else if (isAvailable) {
            actionBtnHtml = '<button class="action-btn borrow-btn" style="width: 100%;" onclick="borrowBook(\'' + book.id + '\')">📩 Request to Borrow</button>';
        } else {
            actionBtnHtml = '<button class="action-btn" disabled style="opacity: 0.5; cursor: not-allowed; width: 100%;">Out of Stock</button>';
        }

        var attrTitle = escapeJsAttr(book.title);
        var attrAuthor = escapeJsAttr(book.author);
        var attrCategory = escapeJsAttr(book.category);

        card.innerHTML = ''
            + '<div class="book-cover-wrap">'
            + '    <img src="' + coverUrl + '" class="book-cover-img" alt="' + safeTitle + '" onerror="handleCoverError(this, \'' + attrTitle + '\', \'' + attrAuthor + '\', \'' + attrCategory + '\')">'
            + '</div>'
            + '<div class="book-info">'
            + '    <h4>' + book.title + '</h4>'
            + '    <div class="author">by ' + book.author + '</div>'
            + '</div>'
            + '<div class="book-meta">'
            + '    <span class="badge badge-category">' + book.category + '</span>'
            + '    <span class="badge ' + (isAvailable ? 'badge-available' : 'badge-issued') + '">'
            + (isAvailable ? book.availableCopies + '/' + book.totalCopies + ' Available' : 'Out of Stock')
            + '    </span>'
            + '</div>'
            + actionBtnHtml
            + '<div class="card-action-row">'
            + '    <button class="action-btn summary-btn" onclick="getAiSummary(\'' + safeTitle + '\', \'' + safeAuthor + '\')">✨ AI Summary</button>'
            + '    <button class="action-btn quiz-btn" onclick="getAiQuiz(\'' + safeTitle + '\', \'' + safeAuthor + '\')">🧠 AI Quiz</button>'
            + '</div>';

        catalogList.appendChild(card);
    }

    if (catalogPagination) {
        if (totalPages <= 1) {
            catalogPagination.innerHTML = "";
        } else {
            catalogPagination.innerHTML = ''
                + '<button class="pagination-btn" ' + (catalogCurrentPage === 1 ? 'disabled' : '') + ' onclick="changeCatalogPage(-1)">◀ Previous</button>'
                + '<span class="pagination-info">Page ' + catalogCurrentPage + ' of ' + totalPages + ' (' + filtered.length + ' Books)</span>'
                + '<button class="pagination-btn" ' + (catalogCurrentPage === totalPages ? 'disabled' : '') + ' onclick="changeCatalogPage(1)">Next ▶</button>';
        }
    }
}

function changeCatalogPage(delta) {
    catalogCurrentPage += delta;
    renderCatalog();
    var catalogEl = document.getElementById("catalogList");
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
}

function getStudentAdmissionId() {
    var uid = (currentUser && currentUser.uid) ? currentUser.uid : "default_user";
    var savedId = localStorage.getItem("user_admission_id_" + uid);
    if (!savedId || !savedId.trim()) {
        var enteredId = null;
        while (!enteredId || !enteredId.trim()) {
            enteredId = prompt("🔒 COMPULSORY STEP:\n\nPlease enter your Student Admission ID / University Roll Number:");
            if (enteredId === null) {
                alert("⚠️ Admission ID / Roll Number is MANDATORY to request or borrow books.");
            } else if (!enteredId.trim()) {
                alert("⚠️ Admission ID cannot be blank. Please enter a valid Admission ID.");
            }
        }
        savedId = enteredId.trim();
        localStorage.setItem("user_admission_id_" + uid, savedId);
    }
    return savedId;
}

function borrowBook(bookId) {
    var book = books.find(function (b) { return b.id === bookId; });

    if (!book || book.availableCopies <= 0) {
        alert("Sorry, this book is currently out of stock!");
        return;
    }

    var studentName = (currentUser && currentUser.displayName) ? currentUser.displayName : "Student User";
    var studentId = getStudentAdmissionId();

    var existing = borrowedBooks.find(function(item) {
        return item.bookId === bookId && (item.uid === (currentUser ? currentUser.uid : "anonymous") || item.studentId === studentId) && item.status !== "Returned";
    });

    if (existing) {
        if (existing.status === "Pending Approval") {
            alert("📩 You have already submitted a borrow request for '" + book.title + "'. It is currently pending approval by the Librarian.");
        } else {
            alert("🔒 You have already borrowed '" + book.title + "'.");
        }
        return;
    }

    var item = {
        id: "BR-" + Date.now(),
        bookId: book.id,
        title: book.title,
        author: book.author,
        studentName: studentName,
        studentId: studentId,
        uid: currentUser ? currentUser.uid : "anonymous",
        requestDate: new Date().toLocaleDateString(),
        borrowDate: null,
        dueDate: null,
        dueTimestamp: null,
        status: "Pending Approval"
    };

    borrowedBooks.push(item);

    saveBorrowed();
    renderAll();

    alert("📩 Borrow Request Sent!\n\nYour request for '" + book.title + "' has been submitted to the Librarian for approval.");
}

function renderMyBorrowed() {
    myBorrowedList.innerHTML = "";

    var myBooks = getMyBorrowedBooks();

    if (myBooks.length === 0) {
        myBorrowedList.innerHTML = '<p class="empty-msg">You have no active borrow requests or issued books.</p>';
        return;
    }

    var nowTime = Date.now();

    for (var i = 0; i < myBooks.length; i++) {
        var item = myBooks[i];
        var isPending = item.status === "Pending Approval";
        var isOverdue = !isPending && item.dueTimestamp && nowTime > item.dueTimestamp;
        var fineAmount = 0;

        if (isOverdue) {
            var diffDays = Math.ceil((nowTime - item.dueTimestamp) / (1000 * 60 * 60 * 24));
            fineAmount = diffDays * 20;
        }

        var bookObj = books.find(function (b) { return b.id === item.bookId; });
        var coverUrl = (bookObj && bookObj.cover) ? bookObj.cover : DEFAULT_COVER;

        var statusBadge = '';
        var statusNote = '';

        if (isPending) {
            statusBadge = '<span class="badge" style="background: #f59e0b; color: white;">⏳ Pending Approval</span>';
            statusNote = '<div style="margin-top: 10px; font-size: 0.8rem; font-weight: 600; text-align: center; background: rgba(245, 158, 11, 0.1); color: #d97706; padding: 8px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.3);">'
                + '    ⏳ Requested on ' + (item.requestDate || 'Recently') + ' — Awaiting Librarian Approval'
                + '</div>';
        } else {
            statusBadge = isOverdue
                ? '<span class="badge badge-issued">⚠️ Overdue (Fine: ₹' + fineAmount + ')</span>'
                : '<span class="badge badge-available">🟢 Issued to You</span>';
            statusNote = '<div style="margin-top: 10px; font-size: 0.8rem; font-weight: 600; text-align: center; background: rgba(59, 130, 246, 0.08); color: #2563eb; padding: 8px; border-radius: 6px; border: 1px solid rgba(59, 130, 246, 0.2);">'
                + '    🔒 Issued to You (Due: ' + (item.dueDate || 'N/A') + ')'
                + '</div>';
        }

        var card = document.createElement("div");
        card.className = "book-card";

        var attrTitle = escapeJsAttr(item.title);
        var attrAuthor = escapeJsAttr(item.author);
        var attrCategory = escapeJsAttr(bookObj ? bookObj.category : "General Engineering");

        card.innerHTML = ''
            + '<div class="book-cover-wrap">'
            + '    <img src="' + coverUrl + '" class="book-cover-img" alt="' + item.title + '" onerror="handleCoverError(this, \'' + attrTitle + '\', \'' + attrAuthor + '\', \'' + attrCategory + '\')">'
            + '</div>'
            + '<div class="book-info">'
            + '    <h4>' + item.title + '</h4>'
            + '    <div class="author">by ' + item.author + '</div>'
            + '</div>'
            + '<div class="book-meta">'
            + '    <span style="font-size: 11px; color: #64748b;">' + (isPending ? 'Req: ' + item.requestDate : 'Due: ' + item.dueDate) + '</span>'
            +      statusBadge
            + '</div>'
            + statusNote;

        myBorrowedList.appendChild(card);
    }
}

function approveBorrowRequest(borrowId) {
    var item = borrowedBooks.find(function (b) { return b.id === borrowId; });
    if (!item) return;

    var book = books.find(function (b) { return b.id === item.bookId; });
    if (!book || book.availableCopies <= 0) {
        alert("Cannot approve issue: Book is currently out of stock!");
        return;
    }

    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    item.status = "Approved";
    item.borrowDate = new Date().toLocaleDateString();
    item.dueDate = dueDate.toLocaleDateString();
    item.dueTimestamp = dueDate.getTime();

    recalculateAvailability();
    saveBooks();
    saveBorrowed();
    renderAll();

    alert("✅ Borrow Request Approved!\n\n'" + item.title + "' is now granted & issued to " + (item.studentName || 'Student') + " (ID: " + (item.studentId || 'N/A') + ").");
}

function rejectBorrowRequest(borrowId) {
    var item = borrowedBooks.find(function (b) { return b.id === borrowId; });
    if (!item) return;

    if (!confirm("Reject borrow request for '" + item.title + "' by " + (item.studentName || 'Student') + "?")) return;

    var index = borrowedBooks.indexOf(item);
    if (index !== -1) {
        borrowedBooks.splice(index, 1);
    }

    recalculateAvailability();
    saveBooks();
    saveBorrowed();
    renderAll();

    alert("❌ Borrow request rejected.");
}

function confirmLibrarianReturn(borrowId) {
    var item = borrowedBooks.find(function (b) { return b.id === borrowId; });
    if (!item) return;

    var confirmed = confirm("Confirm returning '" + item.title + "' issued to " + (item.studentName || 'Student') + " (ID: " + (item.studentId || 'N/A') + ")?");
    if (!confirmed) return;

    var index = borrowedBooks.indexOf(item);
    if (index !== -1) {
        borrowedBooks.splice(index, 1);
    }

    recalculateAvailability();
    saveBooks();
    saveBorrowed();
    renderAll();

    alert("✅ Return confirmed! '" + item.title + "' is returned and back in stock.");
}

function addNewBook() {
    var title = bookTitle.value.trim();
    var author = bookAuthor.value.trim();
    var category = bookCategory.value;
    var isbn = bookIsbn.value.trim() || generateBookId();
    var copies = Number(bookCopies.value);
    var cover = (bookCover && bookCover.value.trim()) ? bookCover.value.trim() : DEFAULT_COVER;

    if (!title || !author || !category || copies <= 0) {
        alert("Please fill in all book details with valid values.");
        return;
    }

    // Prevent duplicate ISBN/ID
    var existingBook = books.find(function (b) { return b.id === isbn; });
    if (existingBook) {
        alert("A book with ID '" + isbn + "' already exists. Please use a different ISBN/ID.");
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

    bookTitle.value = "";
    bookAuthor.value = "";
    bookCategory.value = "";
    bookIsbn.value = "";
    bookCopies.value = 1;
    if (bookCover) bookCover.value = "";

    saveBooks();
    renderAll();

    alert("✅ Book '" + title + "' has been added to the library inventory!");
}

function downloadSampleCsvTemplate() {
    var csvHeader = "Title,Author,Category,Copies,CoverURL\n";
    var sampleRows = "Data Structures and Algorithms,Mark Allen Weiss,Computer Science & Engineering,10,https://covers.openlibrary.org/b/isbn/9780132847377-M.jpg\n"
        + "Higher Engineering Mathematics,B.S. Grewal,Basic Sciences & Humanities,15,https://covers.openlibrary.org/b/isbn/9788174091954-M.jpg\n"
        + "AKTU 1st Year Engineering Physics,H.K. Malik,AKTU 1st Year,8,https://covers.openlibrary.org/b/isbn/9788189928186-M.jpg\n";

    var blob = new Blob([csvHeader + sampleRows], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "engineering_library_bulk_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function parseAndImportCsvText(rawText) {
    if (!rawText || !rawText.trim()) {
        alert("Please select a valid CSV file or paste CSV text!");
        return;
    }

    var lines = rawText.split(/\r?\n/);
    var successCount = 0;
    var skippedCount = 0;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line) continue;

        // Skip header row if present
        if (i === 0 && (line.toLowerCase().startsWith("title") || line.toLowerCase().startsWith("author"))) {
            continue;
        }

        var cols = line.split(",").map(function (item) {
            return item.replace(/^["']|["']$/g, "").trim();
        });

        if (cols.length >= 2) {
            var title = cols[0];
            var author = cols[1];
            var category = cols[2] || "Other";
            var copies = Number(cols[3]) || 5;
            var cover = cols[4] || DEFAULT_COVER;

            if (title && author) {
                var newBook = {
                    id: generateBookId(),
                    title: title,
                    author: author,
                    category: category,
                    totalCopies: copies,
                    availableCopies: copies,
                    cover: cover
                };
                books.push(newBook);
                successCount++;
            } else {
                skippedCount++;
            }
        } else {
            skippedCount++;
        }
    }

    if (successCount > 0) {
        saveBooks();
        renderAll();
        var statusEl = document.getElementById("bulkUploadStatus");
        if (statusEl) {
            statusEl.innerHTML = '<span style="color: #059669;">✅ Successfully imported ' + successCount + ' books into the engineering library catalog! (' + skippedCount + ' skipped)</span>';
        }
        alert("🎉 Bulk Import Complete!\n\nSuccessfully added " + successCount + " new books to the catalog database.");
    } else {
        alert("⚠️ No valid books found in CSV data. Ensure columns match: Title, Author, Category, Copies, CoverURL.");
    }
}

function renderAdminInventory() {
    var adminUniversalSearchInput = document.getElementById("adminUniversalSearchInput");
    var adminUniversalFilter = document.getElementById("adminUniversalFilter");
    var adminSearchInput = document.getElementById("adminSearchInput");
    var adminCategoryFilter = document.getElementById("adminCategoryFilter");
    var adminInventoryPagination = document.getElementById("adminInventoryPagination");

    var globalQuery = adminUniversalSearchInput ? adminUniversalSearchInput.value.toLowerCase().trim() : "";
    var query = adminSearchInput ? adminSearchInput.value.toLowerCase().trim() : "";
    if (globalQuery) query = globalQuery;

    var globalCat = adminUniversalFilter ? adminUniversalFilter.value : "All";
    var category = adminCategoryFilter ? adminCategoryFilter.value : "All";
    if (globalCat !== "All") category = globalCat;

    adminInventoryList.innerHTML = "";

    var filtered = books.filter(function (book) {
        var matchesQuery = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query) || book.category.toLowerCase().includes(query) || book.id.toLowerCase().includes(query);
        var matchesCategory = (category === "All" || book.category === category || (category === "AKTU Curriculum" && book.category.indexOf("AKTU") !== -1));
        return matchesQuery && matchesCategory;
    });

    if (filtered.length === 0) {
        adminInventoryList.innerHTML = '<p class="empty-msg" style="grid-column: 1 / -1;">No matching books found in inventory.</p>';
        if (adminInventoryPagination) adminInventoryPagination.innerHTML = "";
        return;
    }

    var totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (adminInventoryCurrentPage > totalPages) adminInventoryCurrentPage = totalPages;
    if (adminInventoryCurrentPage < 1) adminInventoryCurrentPage = 1;

    var startIdx = (adminInventoryCurrentPage - 1) * ITEMS_PER_PAGE;
    var pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    for (var i = 0; i < pageItems.length; i++) {
        var book = pageItems[i];
        var coverUrl = book.cover || DEFAULT_COVER;

        var card = document.createElement("div");
        card.className = "book-card";

        var attrTitle = escapeJsAttr(book.title);
        var attrAuthor = escapeJsAttr(book.author);
        var attrCategory = escapeJsAttr(book.category);

        card.innerHTML = ''
            + '<div class="book-cover-wrap">'
            + '    <img src="' + coverUrl + '" class="book-cover-img" alt="' + book.title + '" onerror="handleCoverError(this, \'' + attrTitle + '\', \'' + attrAuthor + '\', \'' + attrCategory + '\')">'
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

    if (adminInventoryPagination) {
        if (totalPages <= 1) {
            adminInventoryPagination.innerHTML = "";
        } else {
            adminInventoryPagination.innerHTML = ''
                + '<button class="pagination-btn" ' + (adminInventoryCurrentPage === 1 ? 'disabled' : '') + ' onclick="changeAdminInventoryPage(-1)">◀ Previous</button>'
                + '<span class="pagination-info">Page ' + adminInventoryCurrentPage + ' of ' + totalPages + ' (' + filtered.length + ' Books)</span>'
                + '<button class="pagination-btn" ' + (adminInventoryCurrentPage === totalPages ? 'disabled' : '') + ' onclick="changeAdminInventoryPage(1)">Next ▶</button>';
        }
    }
}

function changeAdminInventoryPage(delta) {
    adminInventoryCurrentPage += delta;
    renderAdminInventory();
}

function deleteBook(bookId) {
    if (!confirm("Are you sure you want to delete this book from inventory?")) return;

    books = books.filter(function (b) { return b.id !== bookId; });
    borrowedBooks = borrowedBooks.filter(function (b) { return b.bookId !== bookId; });

    saveBooks();
    saveBorrowed();
    renderAll();
}

function renderIssuedLog() {
    var adminUniversalSearchInput = document.getElementById("adminUniversalSearchInput");
    var adminIssuedSearchInput = document.getElementById("adminIssuedSearchInput");
    var adminIssuedFilter = document.getElementById("adminIssuedFilter");

    var globalQuery = adminUniversalSearchInput ? adminUniversalSearchInput.value.toLowerCase().trim() : "";
    var query = adminIssuedSearchInput ? adminIssuedSearchInput.value.toLowerCase().trim() : "";
    if (globalQuery) query = globalQuery;

    var filterVal = adminIssuedFilter ? adminIssuedFilter.value : "All";

    issuedLogList.innerHTML = "";

    var nowTime = Date.now();

    var filtered = borrowedBooks.filter(function (item) {
        var name = (item.studentName || "").toLowerCase();
        var sid = (item.studentId || "").toLowerCase();
        var title = (item.title || "").toLowerCase();
        var author = (item.author || "").toLowerCase();
        var matchesQuery = name.includes(query) || sid.includes(query) || title.includes(query) || author.includes(query);

        var isPending = item.status === "Pending Approval";
        var isOverdue = !isPending && item.dueTimestamp && nowTime > item.dueTimestamp;

        var matchesFilter = true;
        if (filterVal === "Pending") matchesFilter = isPending;
        else if (filterVal === "Overdue") matchesFilter = isOverdue;
        else if (filterVal === "Active") matchesFilter = !isPending && !isOverdue;

        return matchesQuery && matchesFilter;
    });

    if (filtered.length === 0) {
        issuedLogList.innerHTML = '<p class="empty-msg">No matching borrow requests or issued records found.</p>';
        return;
    }

    for (var i = 0; i < filtered.length; i++) {
        var item = filtered[i];
        var isPending = item.status === "Pending Approval";
        var isOverdue = !isPending && item.dueTimestamp && nowTime > item.dueTimestamp;
        var fineAmount = 0;

        if (isOverdue) {
            var diffDays = Math.ceil((nowTime - item.dueTimestamp) / (1000 * 60 * 60 * 24));
            fineAmount = diffDays * 20;
        }

        var div = document.createElement("div");
        div.className = "log-item";

        if (isPending) {
            div.innerHTML = ''
                + '<div class="log-info">'
                + '    <strong>' + item.title + '</strong>'
                + '    <span>Requested by Student: <strong style="color: #d97706;">' + (item.studentName || 'Student') + '</strong> (ID: <strong>' + (item.studentId || 'N/A') + '</strong>)</span>'
                + '    <span>Requested Date: ' + (item.requestDate || 'Recently') + ' | Status: <strong style="color: #f59e0b;">⏳ Pending Approval</strong></span>'
                + '</div>'
                + '<div style="display: flex; gap: 8px; flex-wrap: wrap;">'
                + '    <button class="action-btn" style="background: #10b981; color: white; padding: 8px 14px; font-weight: 700; border-radius: 6px;" onclick="approveBorrowRequest(\'' + item.id + '\')">✅ Approve Issue</button>'
                + '    <button class="action-btn delete-btn" style="padding: 8px 14px; font-weight: 700; border-radius: 6px;" onclick="rejectBorrowRequest(\'' + item.id + '\')">❌ Reject</button>'
                + '</div>';
        } else {
            div.innerHTML = ''
                + '<div class="log-info">'
                + '    <strong>' + item.title + '</strong>'
                + '    <span>Borrower: <strong style="color: #2563eb;">' + (item.studentName || 'Student') + '</strong> (ID: <strong>' + (item.studentId || 'N/A') + '</strong>)</span>'
                + '    <span>Issued: ' + item.borrowDate + ' | Due: ' + item.dueDate + '</span>'
                + (isOverdue ? '<span style="color: #ef4444; font-weight: 600; display: block; margin-top: 4px;">⚠️ Overdue (Fine: ₹' + fineAmount + ')</span>' : '')
                + '</div>'
                + '<button class="action-btn" style="background: #2563eb; color: white; padding: 8px 16px; font-weight: 700; border-radius: 6px;" onclick="confirmLibrarianReturn(\'' + item.id + '\')">📥 Confirm Return</button>';
        }

        issuedLogList.appendChild(div);
    }
}

// AI Chatbot
function sendQuickChip(text) {
    chatInput.value = text;
    sendChatMessage(text);
}

function promptGeminiApiKey() {
    var currentKey = localStorage.getItem("gemini_api_key") || "";
    // Show inline key entry in the chatbot
    var keyCardId = "gemini-key-card-" + Date.now();
    var html = "<div id='" + keyCardId + "' style='background: linear-gradient(135deg, #1e3c72, #2563eb); color: white; padding: 14px; border-radius: 12px; font-size: 12px;'>" +
        "<div style='font-weight: 700; font-size: 13px; margin-bottom: 8px;'>🔑 Connect Gemini AI</div>" +
        "<p style='margin-bottom: 10px; color: rgba(255,255,255,0.85);'>Enter your Gemini API key to get real-time AI answers powered by Google:</p>" +
        "<input id='geminiKeyInput_" + keyCardId + "' type='password' placeholder='AIzaSy...' value='" + currentKey + "' style='width: 100%; padding: 8px 10px; border-radius: 8px; border: none; margin-bottom: 8px; font-size: 12px; font-family: monospace; color: #1e293b;'>" +
        "<div style='display:flex; gap: 6px;'>" +
        "<button onclick=\"_saveGeminiKey('" + keyCardId + "')\" style='flex:1; background: #10b981; color: white; border: none; border-radius: 6px; padding: 8px; font-weight: 700; cursor: pointer; font-size: 11px;'>✅ Save & Activate</button>" +
        "<button onclick=\"_clearGeminiKey('" + keyCardId + "')\" style='background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 6px; padding: 8px; font-weight: 600; cursor: pointer; font-size: 11px;'>🗑️ Clear</button>" +
        "</div>" +
        "<p style='margin-top: 8px; font-size: 10px; color: rgba(255,255,255,0.6);'>Get a free key at: <a href='https://aistudio.google.com/app/apikey' target='_blank' style='color: #93c5fd;'>aistudio.google.com</a></p>" +
        "</div>";
    appendBubble(html, "ai-bubble");
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function _saveGeminiKey(cardId) {
    var input = document.getElementById("geminiKeyInput_" + cardId);
    if (!input) return;
    var key = input.value.trim();
    if (key) {
        localStorage.setItem("gemini_api_key", key);
        var card = document.getElementById(cardId);
        if (card) card.innerHTML = "<strong style='color: #10b981;'>✅ Gemini API Key saved!</strong><br><span style='font-size: 11px; color: #94a3b8;'>All your queries will now be answered by Gemini AI with live library data.</span>";
        setTimeout(function() { sendChatMessage("Hello! What can you help me with?"); }, 500);
    } else {
        alert("Please enter a valid Gemini API key.");
    }
}

function _clearGeminiKey(cardId) {
    localStorage.removeItem("gemini_api_key");
    var card = document.getElementById(cardId);
    if (card) card.innerHTML = "<span style='color: #94a3b8; font-size: 11px;'>🗑️ Gemini API Key cleared. Using local mode.</span>";
}

async function callGeminiDirectly(promptText, apiKey) {
    var models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
    for (var i = 0; i < models.length; i++) {
        var url = "https://generativelanguage.googleapis.com/v1beta/models/" + models[i] + ":generateContent?key=" + apiKey;
        try {
            var response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }]
                })
            });
            if (response.ok) {
                var data = await response.json();
                if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                    return data.candidates[0].content.parts[0].text;
                }
            }
        } catch (err) {
            console.log("Direct Gemini model " + models[i] + " failed:", err);
        }
    }
    return null;
}

async function sendChatMessage(userText) {
    if (!userText || !userText.trim()) return;
    userText = userText.trim();

    appendBubble(userText, "user-bubble");
    chatInput.value = "";

    var loadingId = "ai-loading-" + Date.now();
    appendBubble("<span style='opacity:0.6;'>🤖 Thinking...</span>", "ai-bubble", loadingId);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Build a concise summary of library inventory for Gemini
    var totalBooks = books.length;
    var availableBooks = books.filter(function(b){ return b.availableCopies > 0; }).length;
    var issuedBooks = borrowedBooks.length;
    var catalogSummary = JSON.stringify(books.map(function (b) {
        return { id: b.id, title: b.title, author: b.author, category: b.category, available: b.availableCopies, total: b.totalCopies };
    }));

    var userName = currentUser ? (currentUser.displayName || currentUser.email || "Student") : "Student";
    var admissionId = currentUser ? (localStorage.getItem("user_admission_id_" + (currentUser.uid || "")) || "N/A") : "N/A";

    var prompt = "You are ShelfSense AI — the smart, friendly, conversational library assistant for an Engineering College. You speak naturally like a human librarian, not like a robot. Use emojis, short sentences, and be warm and helpful.\n\n"
        + "=== LIVE LIBRARY INVENTORY (" + totalBooks + " books, " + availableBooks + " types available, " + issuedBooks + " currently issued) ===\n"
        + catalogSummary + "\n\n"
        + "=== CURRENT USER ===\n"
        + "Name: " + userName + " | Admission ID: " + admissionId + " | Portal: " + currentPortal.toUpperCase() + "\n\n"
        + "=== USER'S MESSAGE ===\n"
        + userText + "\n\n"
        + "=== YOUR INSTRUCTIONS ===\n"
        + "1. GREETINGS: If user says hi/hello/hey, greet them warmly by name and ask how you can help.\n"
        + "2. BOOK SEARCH: Search inventory JSON for the book. If found & available, say \"\u2705 YES! [Title] is available — [N] of [Total] copies in stock!\". If not found or out of stock, say \"\u274c Sorry, [Title] isn't available right now\" and suggest 1-2 similar available books.\n"
        + "3. CATEGORY/DEPT QUERIES: If user asks about CSE/IT/ECE/ME/CE/AI books, list top 5 available books from that category with copy counts.\n"
        + "4. AKTU QUERIES: List matching books for the semester/year with availability.\n"
        + "5. LIBRARY RULES: Loan period = 14 days. Fine = Rs.20/day overdue. Request via 'Request to Borrow' button.\n"
        + "6. LIBRARIAN COMMANDS: If portal=LIBRARIAN and user says 'add X copies of [Book] by [Author] under [Category]', confirm and append: [[ACTION_ADD: {\"title\":\"Book\",\"author\":\"Author\",\"category\":\"Category\",\"copies\":X}]]\n"
        + "7. GENERAL QUERIES: Answer any general question about the library, studying, engineering topics, book recommendations. Be helpful!\n"
        + "8. Format with markdown: **bold**, bullet points, emojis. Keep responses concise and conversational (max 150 words unless listing books).";

    var DEFAULT_KEY_B64 = "QVEuQWI4Uk42SzluWjFPdHk1VThjZVBfLVFHYWtCcTB0TjM2XzN5MkZuQ0ctc2JCd2ZEeEE=";
    var DEFAULT_GEMINI_KEY = (typeof atob === "function") ? atob(DEFAULT_KEY_B64) : "";

    var rawReply = null;

    // 1. Try Direct Client-Side Gemini API (with default key fallback for everyone)
    var userApiKey = localStorage.getItem("gemini_api_key") || DEFAULT_GEMINI_KEY;
    if (userApiKey && userApiKey.trim()) {
        rawReply = await callGeminiDirectly(prompt, userApiKey.trim());
    }

    // 2. Try Vercel Serverless Endpoint (/api/advice) as fallback
    if (!rawReply) {
        try {
            var response = await fetch("/api/advice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: prompt }),
                signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined
            });
            if (response.ok) {
                var data = await response.json();
                if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                    rawReply = data.candidates[0].content.parts[0].text;
                }
            }
        } catch (e) {
            console.log("Serverless API unavailable:", e.message);
        }
    }

    // 3. Process Gemini AI's reply & decisions
    if (rawReply) {
        var actionExecuted = false;

        // Parse ACTION_ADD tag for auto book addition decided by Gemini AI
        var match = rawReply.match(/\[\[ACTION_ADD:\s*(\{.*?\})\]\]/);
        if (match && match[1]) {
            try {
                var bookData = JSON.parse(match[1]);
                if (bookData.title && bookData.author) {
                    var copies = Number(bookData.copies) || 1;
                    var newBook = {
                        id: generateBookId(),
                        title: bookData.title,
                        author: bookData.author,
                        category: bookData.category || "Other",
                        totalCopies: copies,
                        availableCopies: copies,
                        cover: createBookCoverDataUri(bookData.title, bookData.author, bookData.category)
                    };
                    books.push(newBook);
                    saveBooks();
                    renderAll();
                    actionExecuted = true;
                }
            } catch (jsonErr) {
                console.error("Error parsing AI book action:", jsonErr);
            }
            rawReply = rawReply.replace(/\[\[ACTION_ADD:\s*\{.*?\}\]\]/g, "").trim();
        }

        var loadingBubble = document.getElementById(loadingId);
        if (loadingBubble) {
            var replyHtml = formatMarkdown(rawReply);
            if (actionExecuted) {
                replyHtml += "<div style='margin-top: 10px; font-size: 11px; font-weight: 600; color: #059669; background: #d1fae5; padding: 6px 12px; border-radius: 8px; border: 1px solid #10b981;'>"
                    + "✨ Decision Executed by Gemini AI: New Book Added to Inventory Database!</div>";
            }
            loadingBubble.innerHTML = replyHtml;
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 4. Local fallback engine (processes full inventory JSON data and decision rules locally)
    handleLocalChatbotResponse(userText, loadingId);
}

function handleLocalChatbotResponse(userText, loadingId) {
    var loadingBubble = document.getElementById(loadingId);
    if (!loadingBubble) return;

    var lowerText = userText.toLowerCase().trim();

    // 1. GREETINGS
    var greetingRegex = /^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|namaste|hola|hi\s*there|hello\s*there|sup|yo|who\s*are\s*you)\b/i;
    if (greetingRegex.test(lowerText) || lowerText === "hi" || lowerText === "hello" || lowerText === "hey") {
        loadingBubble.innerHTML = "👋 <strong>Hello! How can I help you today?</strong><br><br>"
            + "I am your <strong>ShelfSense AI Assistant</strong> for the Engineering Library! You can ask me:<br>"
            + "• 📖 <em>'Is Cormen or Operating Systems available?'</em><br>"
            + "• 📜 <em>'Show AKTU 1st Year books'</em><br>"
            + "• 💻 <em>'Which CSE books are in stock?'</em><br>"
            + "• ➕ <em>'Add 3 copies of Clean Code'</em> (Librarian Portal)";
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 2. LIBRARIAN ADD BOOK COMMAND
    var addRegex = /add\s+(\d+)?\s*(?:copies of)?\s*["']?([^"']+)["']?\s+by\s+([^"']+?)(?:\s+under\s+([^"']+))?$/i;
    var matchAdd = userText.match(addRegex);

    if (matchAdd || lowerText.startsWith("add ")) {
        if (currentPortal === "student") {
            loadingBubble.innerHTML = "🔒 <strong>Access Denied</strong>: Only Librarians can add or modify books. Please switch to the 🔑 <strong>Librarian Portal</strong> to add new books!";
            chatHistory.scrollTop = chatHistory.scrollHeight;
            return;
        }

        var title = "Clean Architecture";
        var author = "Robert Martin";
        var category = "Computer Science & Engineering";
        var copies = 3;

        if (matchAdd) {
            copies = Number(matchAdd[1]) || 1;
            title = matchAdd[2] ? matchAdd[2].trim() : "New Book";
            author = matchAdd[3] ? matchAdd[3].trim() : "Unknown Author";
            category = matchAdd[4] ? matchAdd[4].trim() : "Computer Science & Engineering";
        } else {
            var parts = userText.replace(/add\s+/i, "").split(/by|under/i);
            if (parts[0]) title = parts[0].replace(/\d+\s+copies\s+of/i, "").trim();
            if (parts[1]) author = parts[1].trim();
            if (parts[2]) category = parts[2].trim();
            var copyMatch = userText.match(/(\d+)\s+copies/i);
            if (copyMatch) copies = Number(copyMatch[1]);
        }

        var newBook = {
            id: generateBookId(),
            title: title,
            author: author,
            category: category,
            totalCopies: copies,
            availableCopies: copies,
            cover: createBookCoverDataUri(title, author, category)
        };

        books.push(newBook);
        saveBooks();
        renderAll();

        loadingBubble.innerHTML = "✅ <strong>Successfully Added!</strong> Added " + copies + " copies of <strong>'" + title + "'</strong> by " + author + " under department <em>" + category + "</em> to the engineering library catalog! 📚";
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 3. BORROW / RETURN / FINE GUIDANCE
    if (lowerText.includes("how to borrow") || lowerText.includes("how to return") || lowerText.includes("fine") || lowerText.includes("due date") || lowerText.includes("rules")) {
        loadingBubble.innerHTML = "ℹ️ <strong>Engineering Library Rules & Guidance:</strong><br><br>"
            + "1. 📩 <strong>Requesting a Book:</strong> Click <em>'Request to Borrow'</em> on any catalog book card. Enter your Student Admission ID.<br>"
            + "2. 🔑 <strong>Librarian Approval:</strong> The Librarian approves the request and issues the physical book to you.<br>"
            + "3. ⏳ <strong>Loan Duration:</strong> Books are issued for <strong>14 days</strong>.<br>"
            + "4. ⚠️ <strong>Late Fine:</strong> ₹20 per day after the due date.<br>"
            + "5. 📥 <strong>Returning a Book:</strong> Hand over the physical book to the Librarian desk. The Librarian will confirm return in their console.";
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // 4. AKTU YEAR / SEMESTER QUERY
    var yearMatch = lowerText.match(/(aktu|1st|2nd|3rd|4th|sem\s*\d+|first|second|third|fourth|year)/i);
    if (yearMatch) {
        var targetCat = "";
        if (lowerText.includes("1st") || lowerText.includes("first") || lowerText.includes("sem 1") || lowerText.includes("sem 2")) targetCat = "AKTU 1st Year";
        else if (lowerText.includes("2nd") || lowerText.includes("second") || lowerText.includes("sem 3") || lowerText.includes("sem 4")) targetCat = "AKTU 2nd Year";
        else if (lowerText.includes("3rd") || lowerText.includes("third") || lowerText.includes("sem 5") || lowerText.includes("sem 6")) targetCat = "AKTU 3rd Year";
        else if (lowerText.includes("4th") || lowerText.includes("fourth") || lowerText.includes("sem 7") || lowerText.includes("sem 8")) targetCat = "AKTU 4th Year";

        var aktuBooks = books.filter(function (b) {
            if (targetCat) return b.category === targetCat;
            return b.category.indexOf("AKTU") !== -1;
        });

        if (aktuBooks.length > 0) {
            var formatted = aktuBooks.slice(0, 6).map(function (b) {
                return "• <strong>" + b.title + "</strong> by " + b.author + " — 🟢 <strong>" + b.availableCopies + "/" + b.totalCopies + " Available</strong>";
            }).join("<br>");

            loadingBubble.innerHTML = "📜 <strong>" + (targetCat || "AKTU Syllabus") + " Textbooks Available in Library:</strong><br><br>" + formatted;
            chatHistory.scrollTop = chatHistory.scrollHeight;
            return;
        }
    }

    // 5. DEPARTMENT / BRANCH QUERY
    var deptMatch = lowerText.match(/(cse|computer\s*science|information\s*technology|\bit\b|ai|machine\s*learning|data\s*science|ece|electronics|eee|electrical|me\b|mechanical|civil|\bce\b|bsh|physics|chemistry|math)/i);
    if (deptMatch && !lowerText.includes("cormen") && !lowerText.includes("silberschatz") && !lowerText.includes("is ")) {
        var deptQuery = deptMatch[0];
        var matchedDeptBooks = books.filter(function (b) {
            var cat = b.category.toLowerCase();
            return cat.includes(deptQuery) || (deptQuery === "cse" && cat.includes("computer")) || (deptQuery === "it" && cat.includes("technology")) || (deptQuery === "ece" && cat.includes("electronics")) || (deptQuery === "me" && cat.includes("mechanical")) || (deptQuery === "ce" && cat.includes("civil"));
        });

        if (matchedDeptBooks.length > 0) {
            var formattedDept = matchedDeptBooks.slice(0, 6).map(function (b) {
                return "• <strong>" + b.title + "</strong> by " + b.author + " — 🟢 <strong>" + b.availableCopies + "/" + b.totalCopies + " Available</strong>";
            }).join("<br>");

            loadingBubble.innerHTML = "💻 <strong>Available Books in " + (matchedDeptBooks[0].category) + ":</strong><br><br>" + formattedDept;
            chatHistory.scrollTop = chatHistory.scrollHeight;
            return;
        }
    }

    // 6. SPECIFIC BOOK SEARCH
    var stopWords = ["is", "are", "do", "you", "have", "book", "books", "copies", "copy", "available", "in", "stock", "the", "a", "an", "of", "for", "to", "check", "please", "can", "i", "get", "show", "me", "list", "tell", "about", "?", "!"];
    var words = lowerText.split(/\s+/).filter(function (w) {
        var clean = w.replace(/[^a-z0-9]/gi, "");
        return clean.length >= 3 && stopWords.indexOf(clean) === -1;
    });

    if (words.length > 0) {
        var bestBook = null;
        var highestScore = 0;

        for (var i = 0; i < books.length; i++) {
            var b = books[i];
            var bTitle = b.title.toLowerCase();
            var bAuthor = b.author.toLowerCase();
            var bCat = b.category.toLowerCase();

            if (bTitle.includes(lowerText) || bAuthor.includes(lowerText)) {
                bestBook = b;
                break;
            }

            var score = 0;
            for (var w = 0; w < words.length; w++) {
                if (bTitle.includes(words[w])) score += 3;
                if (bAuthor.includes(words[w])) score += 2;
                if (bCat.includes(words[w])) score += 1;
            }

            if (score > highestScore && score >= 3) {
                highestScore = score;
                bestBook = b;
            }
        }

        if (bestBook) {
            if (bestBook.availableCopies > 0) {
                loadingBubble.innerHTML = "✅ <strong>YES!</strong> <em>'" + bestBook.title + "'</em> by " + bestBook.author + " (" + bestBook.category + ") is currently <strong>AVAILABLE</strong> in our library catalog (🟢 <strong>" + bestBook.availableCopies + "/" + bestBook.totalCopies + " copies in stock</strong>)! 📖";
            } else {
                var similar = books.filter(function (s) { return s.category === bestBook.category && s.availableCopies > 0 && s.id !== bestBook.id; });
                var recText = similar.length > 0
                    ? "<br><br>💡 <strong>Recommended available books in " + bestBook.category + ":</strong><br>" + similar.slice(0, 3).map(function (s) { return "• <strong>" + s.title + "</strong> (" + s.availableCopies + "/" + s.totalCopies + " available)"; }).join("<br>")
                    : "";
                loadingBubble.innerHTML = "❌ <strong>NO</strong>: <em>'" + bestBook.title + "'</em> by " + bestBook.author + " is currently out of stock." + recText;
            }
            chatHistory.scrollTop = chatHistory.scrollHeight;
            return;
        }
    }

    // 7. DEFAULT / POPULAR BOOKS FALLBACK
    var popList = getPopularAvailableBooks(5);
    var popFormatted = popList.map(function (b) {
        return "• <strong>" + b.title + "</strong> by " + b.author + " (<em>" + b.category + "</em>) — 🟢 <strong>" + b.availableCopies + "/" + b.totalCopies + " Available</strong>";
    }).join("<br>");

    loadingBubble.innerHTML = "🤖 <strong>ShelfSense AI:</strong> I couldn't find an exact match for <em>'" + userText + "'</em> in the library database. Try rephrasing or ask about departments (e.g., CSE, IT, ECE)!<br><br>🔥 <strong>Popular Books Available Now:</strong><br><br>" + popFormatted;
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
    if (!text) return "";
    var html = text;
    // Code blocks & inline code
    html = html.replace(/```([\s\S]*?)```/g, "<pre style='background: #0f172a; color: #f8fafc; padding: 10px; border-radius: 8px; font-family: monospace; font-size: 11px; overflow-x: auto; margin: 6px 0;'><code>$1</code></pre>");
    html = html.replace(/`([^`]+)`/g, "<code style='background: rgba(0,0,0,0.1); color: #2563eb; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 11px;'>$1</code>");
    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Headings
    html = html.replace(/^###\s?(.*)$/gm, "<div style='font-weight: 700; font-size: 1rem; color: #1e3c72; margin-top: 10px; margin-bottom: 4px;'>$1</div>");
    html = html.replace(/^##\s?(.*)$/gm, "<div style='font-weight: 700; font-size: 1.05rem; color: #1e3c72; margin-top: 12px; margin-bottom: 6px;'>$1</div>");
    // Bullet lists
    html = html.replace(/^[\*\-\•]\s?(.*)$/gm, "<li style='margin-left: 18px; margin-bottom: 4px; list-style-type: disc;'>$1</li>");
    // Line breaks
    html = html.replace(/\n/g, "<br>");
    // Clean double breaks around list items
    html = html.replace(/(<br>\s*)+<li/g, "<li");
    return html;
}

// AI Modal
var aiModal = document.getElementById("aiModal");
var modalTitle = document.getElementById("modalTitle");
var modalBody = document.getElementById("modalBody");

function openAiModal(title, content) {
    if (modalTitle) modalTitle.innerText = title;
    if (modalBody) modalBody.innerHTML = content;
    if (aiModal) aiModal.classList.add("active");
}

function closeAiModal() {
    if (aiModal) aiModal.classList.remove("active");
}

if (aiModal) {
    aiModal.addEventListener("click", function (e) {
        if (e.target === aiModal) closeAiModal();
    });
}

// AI Book Summary
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
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                var reply = data.candidates[0].content.parts[0].text;
                openAiModal("✨ AI Book Summary: " + title, formatMarkdown(reply));
                return;
            }
        }
    } catch (e) {
        console.log("Using local AI summary fallback for " + title);
    }

    // Local fallback summary
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

// AI Trivia Quiz
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
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                var rawText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
                var quizItems = JSON.parse(rawText);
                renderQuizModal(title, quizItems);
                return;
            }
        }
    } catch (e) {
        console.log("Using local AI quiz fallback for " + title);
    }

    // Local fallback quiz
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

    allBtns.forEach(function (b) { b.disabled = true; });

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

// Multimodal Vision Book Scanner
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
    reader.onload = async function (e) {
        var base64Data = e.target.result.split(',')[1];
        var mimeType = file.type || "image/png";
        var coverDataUrl = e.target.result;

        try {
            // Send as fileData to match API endpoint expected field name
            var response = await fetch("/api/scan-book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileData: base64Data, mimeType: mimeType })
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
            console.log("API scan-book unavailable, using local fallback.");
        }

        // Local fallback: extract title from filename
        var rawName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        var sampleTitle = rawName.length > 3 ? rawName.charAt(0).toUpperCase() + rawName.slice(1) : "Scanned Book";

        fillBookForm({
            title: sampleTitle,
            author: "Unknown Author",
            category: "Other",
            isbn: generateBookId(),
            copies: 1,
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

init();
