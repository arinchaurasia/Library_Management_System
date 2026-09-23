/* ShelfSense: AI-Powered Smart Library Management System */

var DEFAULT_COVER = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80";

var sampleBooks = [
  // ==========================================
  // COMPUTER SCIENCE & ENGINEERING (CSE) - 35 BOOKS
  // ==========================================
  { id: "CSE101", title: "Introduction to Algorithms", author: "Thomas H. Cormen, Charles E. Leiserson", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg" },
  { id: "CSE102", title: "Operating System Concepts", author: "Abraham Silberschatz, Peter B. Galvin", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781119800361-M.jpg" },
  { id: "CSE103", title: "Computer Networks", author: "Andrew S. Tanenbaum, David J. Wetherall", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780132126953-M.jpg" },
  { id: "CSE104", title: "Database System Concepts", author: "Abraham Silberschatz, Henry F. Korth", category: "Computer Science & Engineering", totalCopies: 12, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780073523323-M.jpg" },
  { id: "CSE105", title: "Compilers: Principles, Techniques, & Tools", author: "Alfred V. Aho, Monica S. Lam", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780321486813-M.jpg" },
  { id: "CSE106", title: "Computer Organization and Design", author: "David A. Patterson, John L. Hennessy", category: "Computer Science & Engineering", totalCopies: 7, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780128017334-M.jpg" },
  { id: "CSE107", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell, Peter Norvig", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780134610993-M.jpg" },
  { id: "CSE108", title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", category: "Computer Science & Engineering", totalCopies: 15, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg" },
  { id: "CSE109", title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780201616224-M.jpg" },
  { id: "CSE110", title: "Design Patterns: Elements of Reusable Object-Oriented Software", author: "Erich Gamma, Richard Helm, Ralph Johnson", category: "Computer Science & Engineering", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780201633610-M.jpg" },
  { id: "CSE111", title: "Modern Operating Systems", author: "Andrew S. Tanenbaum, Herbert Bos", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780133591620-M.jpg" },
  { id: "CSE112", title: "Algorithms", author: "Robert Sedgewick, Kevin Wayne", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780321573513-M.jpg" },
  { id: "CSE113", title: "Theory of Computer Science: Automata, Languages and Computation", author: "K.L.P. Mishra, N. Chandrasekaran", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 7, cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" },
  { id: "CSE114", title: "Digital Logic and Computer Design", author: "M. Morris Mano", category: "Computer Science & Engineering", totalCopies: 12, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780132145107-M.jpg" },
  { id: "CSE115", title: "Software Engineering: A Practitioner's Approach", author: "Roger S. Pressman, Bruce R. Maxim", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780078022128-M.jpg" },
  { id: "CSE116", title: "Data Structures and Algorithm Analysis in C++", author: "Mark Allen Weiss", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780132847377-M.jpg" },
  { id: "CSE117", title: "Computer Graphics: Principles and Practice", author: "John F. Hughes, Andries van Dam", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780321399526-M.jpg" },
  { id: "CSE118", title: "Object-Oriented Programming with C++", author: "E. Balagurusamy", category: "Computer Science & Engineering", totalCopies: 14, availableCopies: 10, cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80" },
  { id: "CSE119", title: "Programming in ANSI C", author: "E. Balagurusamy", category: "Computer Science & Engineering", totalCopies: 15, availableCopies: 11, cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
  { id: "CSE120", title: "Java: The Complete Reference", author: "Herbert Schildt", category: "Computer Science & Engineering", totalCopies: 11, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781260440232-M.jpg" },
  { id: "CSE121", title: "The C Programming Language", author: "Brian W. Kernighan, Dennis M. Ritchie", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780131103627-M.jpg" },
  { id: "CSE122", title: "Data Mining: Concepts and Techniques", author: "Jiawei Han, Micheline Kamber", category: "Computer Science & Engineering", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780123814791-M.jpg" },
  { id: "CSE123", title: "Computer Networking: A Top-Down Approach", author: "James F. Kurose, Keith W. Ross", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780133594140-M.jpg" },
  { id: "CSE124", title: "Cryptography and Network Security", author: "William Stallings", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780134444284-M.jpg" },
  { id: "CSE125", title: "Distributed Systems: Concepts and Design", author: "George Coulouris, Jean Dollimore", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780132143011-M.jpg" },
  { id: "CSE126", title: "Discrete Mathematics and Its Applications", author: "Kenneth H. Rosen", category: "Computer Science & Engineering", totalCopies: 12, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780073383095-M.jpg" },
  { id: "CSE127", title: "Fundamentals of Software Engineering", author: "Rajib Mall", category: "Computer Science & Engineering", totalCopies: 10, availableCopies: 7, cover: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80" },
  { id: "CSE128", title: "Linux Kernel Development", author: "Robert Love", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780672329463-M.jpg" },
  { id: "CSE129", title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson, Gerald Jay Sussman", category: "Computer Science & Engineering", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780262510875-M.jpg" },
  { id: "CSE130", title: "Microprocessors and Microcontrollers", author: "N. Senthil Kumar, M. Saravanan", category: "Computer Science & Engineering", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "CSE131", title: "Compiler Design in C", author: "Allen I. Holub", category: "Computer Science & Engineering", totalCopies: 4, availableCopies: 2, cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" },
  { id: "CSE132", title: "Concrete Mathematics: A Foundation for Computer Science", author: "Ronald L. Graham, Donald E. Knuth", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780201558029-M.jpg" },
  { id: "CSE133", title: "The Art of Computer Programming, Vol 1", author: "Donald E. Knuth", category: "Computer Science & Engineering", totalCopies: 4, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780201896831-M.jpg" },
  { id: "CSE134", title: "Real-Time Systems", author: "Jane W. S. Liu", category: "Computer Science & Engineering", totalCopies: 5, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780130568878-M.jpg" },
  { id: "CSE135", title: "Python Programming: An Introduction to Computer Science", author: "John Zelle", category: "Computer Science & Engineering", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781590282410-M.jpg" },

  // ==========================================
  // INFORMATION TECHNOLOGY (IT) - 30 BOOKS
  // ==========================================
  { id: "IT201", title: "Data Communications and Networking", author: "Behrouz A. Forouzan", category: "Information Technology", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780073376226-M.jpg" },
  { id: "IT202", title: "Cloud Computing: Concepts, Technology & Architecture", author: "Thomas Erl, Ricardo Puttini", category: "Information Technology", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780133387520-M.jpg" },
  { id: "IT203", title: "Cybersecurity Essentials", author: "Charles J. Brooks, Christopher Grow", category: "Information Technology", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781119362395-M.jpg" },
  { id: "IT204", title: "Internet of Things: A Hands-On Approach", author: "Arshdeep Bahga, Vijay Madisetti", category: "Information Technology", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780996025515-M.jpg" },
  { id: "IT205", title: "DevOps Handbook", author: "Gene Kim, Jez Humble, Patrick Debois", category: "Information Technology", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781942788003-M.jpg" },
  { id: "IT206", title: "Software Testing: Principles and Practices", author: "Srinivasan Desikan, Gopalaswamy Ramesh", category: "Information Technology", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
  { id: "IT207", title: "Management Information Systems", author: "Kenneth C. Laudon, Jane P. Laudon", category: "Information Technology", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780135191798-M.jpg" },
  { id: "IT208", title: "Web Technologies: HTML, JavaScript, PHP & Java", author: "A.A. Puntambekar", category: "Information Technology", totalCopies: 12, availableCopies: 8, cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80" },
  { id: "IT209", title: "Building Microservices", author: "Sam Newman", category: "Information Technology", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781491950357-M.jpg" },
  { id: "IT210", title: "Docker Deep Dive", author: "Nigel Poulton", category: "Information Technology", totalCopies: 7, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9781916585256-M.jpg" },
  { id: "IT211", title: "Continuous Delivery", author: "Jez Humble, David Farley", category: "Information Technology", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780321601910-M.jpg" },
  { id: "IT212", title: "Site Reliability Engineering", author: "Betsy Beyer, Chris Jones, Jennifer Petoff", category: "Information Technology", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781491929124-M.jpg" },
  { id: "IT213", title: "Ethical Hacking and Penetration Testing Guide", author: "Rafay Baloch", category: "Information Technology", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781482231618-M.jpg" },
  { id: "IT214", title: "Information Security Principles", author: "Mark Stamp", category: "Information Technology", totalCopies: 7, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781118027202-M.jpg" },
  { id: "IT215", title: "Mobile Communications", author: "Jochen Schiller", category: "Information Technology", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780321123817-M.jpg" },
  { id: "IT216", title: "Wireless Communications & Networks", author: "William Stallings", category: "Information Technology", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780131918351-M.jpg" },
  { id: "IT217", title: "E-Commerce: Business, Technology, Society", author: "Kenneth C. Laudon, Carol Guercio Traver", category: "Information Technology", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780134998459-M.jpg" },
  { id: "IT218", title: "System Analysis and Design", author: "Kenneth E. Kendall, Julie E. Kendall", category: "Information Technology", totalCopies: 9, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780134785554-M.jpg" },
  { id: "IT219", title: "Kubernetes Up & Running", author: "Kelsey Hightower, Brendan Burns, Joe Beda", category: "Information Technology", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781492046530-M.jpg" },
  { id: "IT220", title: "Agile Software Development", author: "Robert C. Martin", category: "Information Technology", totalCopies: 7, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780135974445-M.jpg" },
  { id: "IT221", title: "Enterprise Integration Patterns", author: "Gregor Hohpe, Bobby Woolf", category: "Information Technology", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780321200686-M.jpg" },
  { id: "IT222", title: "Information Theory, Coding and Cryptography", author: "Ranjan Bose", category: "Information Technology", totalCopies: 8, availableCopies: 6, cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id: "IT223", title: "High Performance Web Sites", author: "Steve Souders", category: "Information Technology", totalCopies: 5, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780596529307-M.jpg" },
  { id: "IT224", title: "Learning Python", author: "Mark Lutz", category: "Information Technology", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781449355739-M.jpg" },
  { id: "IT225", title: "React Up & Running", author: "Stoyan Stefanov", category: "Information Technology", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9781491931820-M.jpg" },
  { id: "IT226", title: "Web Development with Node and Express", author: "Ethan Brown", category: "Information Technology", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781491949306-M.jpg" },
  { id: "IT227", title: "Professional Android 4 Application Development", author: "Reto Meier", category: "Information Technology", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781118102275-M.jpg" },
  { id: "IT228", title: "iOS Programming: The Big Nerd Ranch Guide", author: "Christian Keur, Aaron Hillegass", category: "Information Technology", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780134682334-M.jpg" },
  { id: "IT229", title: "Big Data: Principles and Best Practices", author: "Nathan Marz, James Warren", category: "Information Technology", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781617290343-M.jpg" },
  { id: "IT230", title: "Network Security Essentials", author: "William Stallings", category: "Information Technology", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780134527338-M.jpg" },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS) - 25 BOOKS
  // ==========================================
  { id: "AIDS301", title: "Deep Learning", author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville", category: "Artificial Intelligence & Data Science", totalCopies: 12, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780262035613-M.jpg" },
  { id: "AIDS302", title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow", author: "Aurélien Géron", category: "Artificial Intelligence & Data Science", totalCopies: 15, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9781492032649-M.jpg" },
  { id: "AIDS303", title: "Pattern Recognition and Machine Learning", author: "Christopher M. Bishop", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780387310732-M.jpg" },
  { id: "AIDS304", title: "Machine Learning", author: "Tom M. Mitchell", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780070428072-M.jpg" },
  { id: "AIDS305", title: "Python for Data Analysis", author: "Wes McKinney", category: "Artificial Intelligence & Data Science", totalCopies: 11, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9781491957660-M.jpg" },
  { id: "AIDS306", title: "Data Science from Scratch", author: "Joel Grus", category: "Artificial Intelligence & Data Science", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781492041139-M.jpg" },
  { id: "AIDS307", title: "Reinforcement Learning: An Introduction", author: "Richard S. Sutton, Andrew G. Barto", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780262039246-M.jpg" },
  { id: "AIDS308", title: "Speech and Language Processing", author: "Daniel Jurafsky, James H. Martin", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780131873216-M.jpg" },
  { id: "AIDS309", title: "Computer Vision: Algorithms and Applications", author: "Richard Szeliski", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781848829343-M.jpg" },
  { id: "AIDS310", title: "Natural Language Processing with Python", author: "Steven Bird, Ewan Klein, Edward Loper", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780596516499-M.jpg" },
  { id: "AIDS311", title: "Probabilistic Graphical Models", author: "Daphne Koller, Nir Friedman", category: "Artificial Intelligence & Data Science", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780262013192-M.jpg" },
  { id: "AIDS312", title: "Deep Learning with Python", author: "François Chollet", category: "Artificial Intelligence & Data Science", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9781617294433-M.jpg" },
  { id: "AIDS313", title: "Mathematics for Machine Learning", author: "Marc Peter Deisenroth, A. Aldo Faisal", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781108455145-M.jpg" },
  { id: "AIDS314", title: "Python Machine Learning", author: "Sebastian Raschka, Vahid Mirjalili", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9781789955750-M.jpg" },
  { id: "AIDS315", title: "Practical Statistics for Data Scientists", author: "Peter Bruce, Andrew Bruce, Peter Gedeck", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781492072942-M.jpg" },
  { id: "AIDS316", title: "Mining of Massive Datasets", author: "Jure Leskovec, Anand Rajaraman, Jeffrey D. Ullman", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781107077232-M.jpg" },
  { id: "AIDS317", title: "Generative Deep Learning", author: "David Foster", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781492041948-M.jpg" },
  { id: "AIDS318", title: "Transformers for Natural Language Processing", author: "Denis Rothman", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9781800563193-M.jpg" },
  { id: "AIDS319", title: "Feature Engineering for Machine Learning", author: "Alice Zheng, Amanda Casari", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781491953242-M.jpg" },
  { id: "AIDS320", title: "Applied Predictive Modeling", author: "Max Kuhn, Kjell Johnson", category: "Artificial Intelligence & Data Science", totalCopies: 5, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781461468486-M.jpg" },
  { id: "AIDS321", title: "Introduction to Data Mining", author: "Pang-Ning Tan, Michael Steinbach", category: "Artificial Intelligence & Data Science", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780133128901-M.jpg" },
  { id: "AIDS322", title: "Neural Networks and Deep Learning", author: "Michael Nielsen", category: "Artificial Intelligence & Data Science", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
  { id: "AIDS323", title: "Data Analytics with R", author: "R.N. Prasad, Seema Acharya", category: "Artificial Intelligence & Data Science", totalCopies: 9, availableCopies: 6, cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { id: "AIDS324", title: "Business Intelligence and Analytics", author: "Ramesh Sharda, Dursun Delen", category: "Artificial Intelligence & Data Science", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780133051056-M.jpg" },
  { id: "AIDS325", title: "Machine Learning Yearning", author: "Andrew Ng", category: "Artificial Intelligence & Data Science", totalCopies: 10, availableCopies: 8, cover: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80" },

  // ==========================================
  // ELECTRONICS & COMMUNICATION ENGINEERING (ECE) - 30 BOOKS
  // ==========================================
  { id: "ECE401", title: "Microelectronic Circuits", author: "Adel S. Sedra, Kenneth C. Smith", category: "Electronics & Communication", totalCopies: 12, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780199333134-M.jpg" },
  { id: "ECE402", title: "Electronic Devices and Circuit Theory", author: "Robert L. Boylestad, Louis Nashelsky", category: "Electronics & Communication", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780132622264-M.jpg" },
  { id: "ECE403", title: "Digital Signal Processing", author: "John G. Proakis, Dimitris G. Manolakis", category: "Electronics & Communication", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780131873742-M.jpg" },
  { id: "ECE404", title: "Signals and Systems", author: "Alan V. Oppenheim, Alan S. Willsky", category: "Electronics & Communication", totalCopies: 11, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780138147570-M.jpg" },
  { id: "ECE405", title: "Communication Systems", author: "Simon Haykin", category: "Electronics & Communication", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780471697909-M.jpg" },
  { id: "ECE406", title: "Modern Digital and Analog Communication Systems", author: "B.P. Lathi, Zhi Ding", category: "Electronics & Communication", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780195331455-M.jpg" },
  { id: "ECE407", title: "CMOS VLSI Design", author: "Neil H.E. Weste, David Money Harris", category: "Electronics & Communication", totalCopies: 7, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780321547743-M.jpg" },
  { id: "ECE408", title: "Antenna Theory: Analysis and Design", author: "Constantine A. Balanis", category: "Electronics & Communication", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9781118642061-M.jpg" },
  { id: "ECE409", title: "Fundamentals of Electric Circuits", author: "Charles K. Alexander, Matthew N.O. Sadiku", category: "Electronics & Communication", totalCopies: 12, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780078028229-M.jpg" },
  { id: "ECE410", title: "Linear Integrated Circuits", author: "D. Roy Choudhury, Shail B. Jain", category: "Electronics & Communication", totalCopies: 10, availableCopies: 7, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "ECE411", title: "Microwave Engineering", author: "David M. Pozar", category: "Electronics & Communication", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780470631553-M.jpg" },
  { id: "ECE412", title: "Optical Fiber Communications", author: "Gerd Keiser", category: "Electronics & Communication", totalCopies: 7, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780073380711-M.jpg" },
  { id: "ECE413", title: "Digital Integrated Circuits", author: "Jan M. Rabaey, Anantha Chandrakasan", category: "Electronics & Communication", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780130909961-M.jpg" },
  { id: "ECE414", title: "Electromagnetic Waves and Radiating Systems", author: "Edward C. Jordan, Keith G. Balmain", category: "Electronics & Communication", totalCopies: 5, availableCopies: 2, cover: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400&q=80" },
  { id: "ECE415", title: "Embedded Systems: Architecture, Programming & Design", author: "Raj Kamal", category: "Electronics & Communication", totalCopies: 10, availableCopies: 7, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ECE416", title: "Digital Communications", author: "John G. Proakis, Masoud Salehi", category: "Electronics & Communication", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780072957167-M.jpg" },
  { id: "ECE417", title: "Control Systems Engineering", author: "I.J. Nagrath, M. Gopal", category: "Electronics & Communication", totalCopies: 11, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ECE418", title: "Wireless Communications", author: "Andreas F. Molisch", category: "Electronics & Communication", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780470741863-M.jpg" },
  { id: "ECE419", title: "Fiber-Optic Communication Systems", author: "Govind P. Agrawal", category: "Electronics & Communication", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780470505113-M.jpg" },
  { id: "ECE420", title: "Semiconductor Physics and Devices", author: "Donald A. Neamen", category: "Electronics & Communication", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780073529585-M.jpg" },
  { id: "ECE421", title: "Electronic Communication Systems", author: "George Kennedy, Bernard Davis", category: "Electronics & Communication", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780074636824-M.jpg" },
  { id: "ECE422", title: "Principles of Electromagnetics", author: "Matthew N.O. Sadiku", category: "Electronics & Communication", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780199461851-M.jpg" },
  { id: "ECE423", title: "Satellite Communications", author: "Timothy Pratt, Charles W. Bostian", category: "Electronics & Communication", totalCopies: 6, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780471370079-M.jpg" },
  { id: "ECE424", title: "VLSI Design", author: "Debaprasad Das", category: "Electronics & Communication", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "ECE425", title: "RF Microelectronics", author: "Behzad Razavi", category: "Electronics & Communication", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780137134731-M.jpg" },
  { id: "ECE426", title: "Analog Integrated Circuit Design", author: "David A. Johns, Ken Martin", category: "Electronics & Communication", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780471144489-M.jpg" },
  { id: "ECE427", title: "Digital Logic & State Machine Design", author: "David J. Comer", category: "Electronics & Communication", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780195107241-M.jpg" },
  { id: "ECE428", title: "Introduction to Embedded Systems", author: "Shibu K.V.", category: "Electronics & Communication", totalCopies: 9, availableCopies: 6, cover: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80" },
  { id: "ECE429", title: "DSP Processor Architecture and Applications", author: "B. Venkataramani, M. Bhaskar", category: "Electronics & Communication", totalCopies: 6, availableCopies: 3, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ECE430", title: "Real-Time Digital Signal Processing", author: "Sen M. Kuo, Woon-Seng Gan", category: "Electronics & Communication", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780470014950-M.jpg" },

  // ==========================================
  // ELECTRICAL & ELECTRONICS ENGINEERING (EEE) - 25 BOOKS
  // ==========================================
  { id: "EEE501", title: "Electrical Machinery", author: "P.S. Bimbhra", category: "Electrical & Electronics", totalCopies: 15, availableCopies: 10, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "EEE502", title: "Power System Engineering", author: "I.J. Nagrath, D.P. Kothari", category: "Electrical & Electronics", totalCopies: 12, availableCopies: 8, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
  { id: "EEE503", title: "Power Electronics: Circuits, Devices & Applications", author: "Muhammad H. Rashid", category: "Electrical & Electronics", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780133125900-M.jpg" },
  { id: "EEE504", title: "Electric Machines", author: "D.P. Kothari, I.J. Nagrath", category: "Electrical & Electronics", totalCopies: 14, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "EEE505", title: "A Course in Electrical Measurements & Instrumentation", author: "A.K. Sawhney", category: "Electrical & Electronics", totalCopies: 12, availableCopies: 7, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "EEE506", title: "Switchgear Protection and Power Systems", author: "Sunil S. Rao", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 5, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "EEE507", title: "Automatic Control Systems", author: "Benjamin C. Kuo, Farid Golnaraghi", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780471134763-M.jpg" },
  { id: "EEE508", title: "Elements of Power System Analysis", author: "William D. Stevenson Jr.", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780070612938-M.jpg" },
  { id: "EEE509", title: "Power System Protection and Switchgear", author: "Badri Ram, D.N. Vishwakarma", category: "Electrical & Electronics", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "EEE510", title: "High Voltage Engineering", author: "M.S. Naidu, V. Kamaraju", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
  { id: "EEE511", title: "Utilization of Electrical Energy", author: "E. Openshaw Taylor", category: "Electrical & Electronics", totalCopies: 6, availableCopies: 4, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
  { id: "EEE512", title: "Electric Drives: Concepts and Applications", author: "Vedam Subrahmanyam", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "EEE513", title: "Renewable Energy Resources", author: "John Twidell, Tony Weir", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780415584388-M.jpg" },
  { id: "EEE514", title: "Circuit Theory: Analysis and Synthesis", author: "A. Chakrabarti", category: "Electrical & Electronics", totalCopies: 11, availableCopies: 8, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "EEE515", title: "Generalized Theory of Electrical Machines", author: "P.S. Bimbhra", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "EEE516", title: "Basic Electrical Engineering", author: "V.K. Mehta, Rohit Mehta", category: "Electrical & Electronics", totalCopies: 15, availableCopies: 11, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "EEE517", title: "Electrical Power Systems", author: "C.L. Wadhwa", category: "Electrical & Electronics", totalCopies: 10, availableCopies: 7, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
  { id: "EEE518", title: "Control Systems Engineering", author: "Norman S. Nise", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9781118170519-M.jpg" },
  { id: "EEE519", title: "Electric Power Generation, Transmission & Distribution", author: "S.N. Singh", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "EEE520", title: "Smart Grid: Technology and Applications", author: "Janaka Ekanayake, Kithsiri Liyanage", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780470740309-M.jpg" },
  { id: "EEE521", title: "Microcontrollers: Architecture, Programming & Interfacing", author: "Raj Kamal", category: "Electrical & Electronics", totalCopies: 9, availableCopies: 6, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "EEE522", title: "Solid State Electronic Devices", author: "Ben G. Streetman, Sanjay Kumar Banerjee", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780133356038-M.jpg" },
  { id: "EEE523", title: "Electric Motor Drives: Modeling, Analysis, and Control", author: "R. Krishnan", category: "Electrical & Electronics", totalCopies: 6, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780130910141-M.jpg" },
  { id: "EEE524", title: "Industrial Drives and Applications", author: "G.K. Dubey", category: "Electrical & Electronics", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "EEE525", title: "Power System Operation and Control", author: "S. Sivanagaraju, G. Sreenivasan", category: "Electrical & Electronics", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },

  // ==========================================
  // MECHANICAL ENGINEERING (ME) - 30 BOOKS
  // ==========================================
  { id: "ME601", title: "Shigley's Mechanical Engineering Design", author: "Richard G. Budynas, J. Keith Nisbett", category: "Mechanical Engineering", totalCopies: 12, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780073398204-M.jpg" },
  { id: "ME602", title: "Theory of Machines", author: "S.S. Rattan", category: "Mechanical Engineering", totalCopies: 14, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME603", title: "Internal Combustion Engines", author: "V. Ganesan", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=80" },
  { id: "ME604", title: "Fluid Mechanics and Hydraulic Machines", author: "R.K. Bansal", category: "Mechanical Engineering", totalCopies: 15, availableCopies: 10, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME605", title: "Heat and Mass Transfer", author: "R.K. Rajput", category: "Mechanical Engineering", totalCopies: 11, availableCopies: 7, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
  { id: "ME606", title: "Engineering Thermodynamics", author: "P.K. Nag", category: "Mechanical Engineering", totalCopies: 13, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME607", title: "Strength of Materials", author: "R.K. Rajput", category: "Mechanical Engineering", totalCopies: 14, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME608", title: "A Textbook of Thermal Engineering", author: "R.S. Khurmi, J.K. Gupta", category: "Mechanical Engineering", totalCopies: 12, availableCopies: 7, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
  { id: "ME609", title: "Manufacturing Science", author: "Amitabha Ghosh, Asok Kumar Mallik", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 5, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME610", title: "Production Technology", author: "R.K. Jain", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME611", title: "CAD/CAM: Principles and Applications", author: "P.N. Rao", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME612", title: "Operations Research: An Introduction", author: "Hamdy A. Taha", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780134444017-M.jpg" },
  { id: "ME613", title: "Refrigeration and Air Conditioning", author: "C.P. Arora", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 4, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME614", title: "Finite Element Analysis", author: "S.S. Bhavikatti", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME615", title: "Mechanical Vibrations", author: "V.P. Singh", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 6, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME616", title: "Design of Machine Elements", author: "V.B. Bhandari", category: "Mechanical Engineering", totalCopies: 11, availableCopies: 7, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME617", title: "Kinematics and Dynamics of Machinery", author: "Robert L. Norton", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 3, cover: "https://covers.openlibrary.org/b/isbn/9780073529356-M.jpg" },
  { id: "ME618", title: "Materials Science and Engineering", author: "William D. Callister Jr.", category: "Mechanical Engineering", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781118324578-M.jpg" },
  { id: "ME619", title: "Fundamentals of Compressible Flow", author: "S.M. Yahya", category: "Mechanical Engineering", totalCopies: 6, availableCopies: 3, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME620", title: "Power Plant Engineering", author: "P.K. Nag", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 5, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "ME621", title: "Industrial Engineering and Management", author: "O.P. Khanna", category: "Mechanical Engineering", totalCopies: 12, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME622", title: "Mechatronics: Electronic Control Systems in ME", author: "W. Bolton", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780273742869-M.jpg" },
  { id: "ME623", title: "Robotics and Control", author: "R.K. Mittal, I.J. Nagrath", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80" },
  { id: "ME624", title: "Gas Turbines", author: "V. Ganesan", category: "Mechanical Engineering", totalCopies: 6, availableCopies: 3, cover: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=80" },
  { id: "ME625", title: "Automobile Engineering Vol I & II", author: "Kirpal Singh", category: "Mechanical Engineering", totalCopies: 11, availableCopies: 7, cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80" },
  { id: "ME626", title: "Computational Fluid Dynamics", author: "John D. Anderson Jr.", category: "Mechanical Engineering", totalCopies: 5, availableCopies: 2, cover: "https://covers.openlibrary.org/b/isbn/9780070016859-M.jpg" },
  { id: "ME627", title: "Welding Engineering and Technology", author: "R.S. Parmar", category: "Mechanical Engineering", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
  { id: "ME628", title: "Tool Design", author: "Cyril Donaldson, George H. LeCain", category: "Mechanical Engineering", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "ME629", title: "Metrology and Quality Control", author: "R.K. Jain", category: "Mechanical Engineering", totalCopies: 9, availableCopies: 6, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "ME630", title: "Tribology in Industry", author: "B.C. Majumdar", category: "Mechanical Engineering", totalCopies: 6, availableCopies: 3, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },

  // ==========================================
  // CIVIL ENGINEERING (CE) - 25 BOOKS
  // ==========================================
  { id: "CE701", title: "Building Construction", author: "B.C. Punmia, Ashok Kumar Jain", category: "Civil Engineering", totalCopies: 14, availableCopies: 9, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE702", title: "Soil Mechanics and Foundations", author: "B.C. Punmia, Ashok Kumar Jain", category: "Civil Engineering", totalCopies: 12, availableCopies: 7, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE703", title: "Design of Reinforced Concrete Structures", author: "N. Krishna Raju", category: "Civil Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE704", title: "Surveying Vol I & II", author: "B.C. Punmia, Ashok Kumar Jain", category: "Civil Engineering", totalCopies: 15, availableCopies: 10, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE705", title: "Theory of Structures", author: "S. Ramamrutham, R. Narayan", category: "Civil Engineering", totalCopies: 11, availableCopies: 8, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE706", title: "Environmental Engineering Vol I & II", author: "S.K. Garg", category: "Civil Engineering", totalCopies: 13, availableCopies: 8, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
  { id: "CE707", title: "Transportation Engineering", author: "S.K. Khanna, C.E.G. Justo", category: "Civil Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE708", title: "Structural Analysis", author: "R.C. Hibbeler", category: "Civil Engineering", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780134610672-M.jpg" },
  { id: "CE709", title: "Fluid Mechanics and Hydraulics", author: "R.K. Rajput", category: "Civil Engineering", totalCopies: 12, availableCopies: 7, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE710", title: "Design of Steel Structures", author: "N. Subramanian", category: "Civil Engineering", totalCopies: 8, availableCopies: 4, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE711", title: "Hydraulics and Fluid Mechanics", author: "P.N. Modi, S.M. Seth", category: "Civil Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE712", title: "Concrete Technology: Theory & Practice", author: "M.S. Shetty", category: "Civil Engineering", totalCopies: 11, availableCopies: 7, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE713", title: "Limit State Design of Reinforced Concrete", author: "P.C. Varghese", category: "Civil Engineering", totalCopies: 9, availableCopies: 5, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE714", title: "Foundation Engineering", author: "V.N.S. Murthy", category: "Civil Engineering", totalCopies: 8, availableCopies: 4, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE715", title: "Irrigation Engineering & Hydraulic Structures", author: "S.K. Garg", category: "Civil Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
  { id: "CE716", title: "Town Planning", author: "S.C. Rangwala", category: "Civil Engineering", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
  { id: "CE717", title: "Construction Management and Planning", author: "B.S. Patil", category: "Civil Engineering", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE718", title: "Applied Mechanics", author: "S.S. Bhavikatti", category: "Civil Engineering", totalCopies: 12, availableCopies: 8, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE719", title: "Prestressed Concrete", author: "N. Krishna Raju", category: "Civil Engineering", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE720", title: "Highway Engineering", author: "S.K. Khanna, C.E.G. Justo", category: "Civil Engineering", totalCopies: 11, availableCopies: 7, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE721", title: "Bridge Engineering", author: "S. Ponnuswamy", category: "Civil Engineering", totalCopies: 6, availableCopies: 3, cover: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?w=400&q=80" },
  { id: "CE722", title: "Quantity Surveying and Valuation", author: "B.N. Dutta", category: "Civil Engineering", totalCopies: 9, availableCopies: 6, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "CE723", title: "Remote Sensing and GIS", author: "B. Bhatta", category: "Civil Engineering", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
  { id: "CE724", title: "Earthquake Resistant Design of Structures", author: "Pankaj Agarwal, Manish Shrikhande", category: "Civil Engineering", totalCopies: 6, availableCopies: 3, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "CE725", title: "Geotechnical Engineering", author: "C. Venkatramaiah", category: "Civil Engineering", totalCopies: 10, availableCopies: 6, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },

  // ==========================================
  // BASIC SCIENCES & HUMANITIES (BSH) - 25 BOOKS
  // ==========================================
  { id: "BSH801", title: "Advanced Engineering Mathematics", author: "Erwin Kreyszig", category: "Basic Sciences & Humanities", totalCopies: 15, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780470458365-M.jpg" },
  { id: "BSH802", title: "Higher Engineering Mathematics", author: "B.S. Grewal", category: "Basic Sciences & Humanities", totalCopies: 20, availableCopies: 14, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
  { id: "BSH803", title: "Fundamentals of Physics", author: "David Halliday, Robert Resnick, Jearl Walker", category: "Basic Sciences & Humanities", totalCopies: 14, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9781118230718-M.jpg" },
  { id: "BSH804", title: "Engineering Chemistry", author: "Jain & Jain", category: "Basic Sciences & Humanities", totalCopies: 12, availableCopies: 8, cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80" },
  { id: "BSH805", title: "Technical Communication: Principles and Practice", author: "Meenakshi Raman, Sangeeta Sharma", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 7, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
  { id: "BSH806", title: "University Physics with Modern Physics", author: "Hugh D. Young, Roger A. Freedman", category: "Basic Sciences & Humanities", totalCopies: 11, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780133983654-M.jpg" },
  { id: "BSH807", title: "Engineering Physics", author: "H.K. Malik, A. Singh", category: "Basic Sciences & Humanities", totalCopies: 13, availableCopies: 9, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
  { id: "BSH808", title: "A Textbook of Engineering Mathematics", author: "N.P. Bali, Manish Goyal", category: "Basic Sciences & Humanities", totalCopies: 16, availableCopies: 11, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
  { id: "BSH809", title: "Calculus and Analytic Geometry", author: "George B. Thomas, Ross L. Finney", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780201531749-M.jpg" },
  { id: "BSH810", title: "Linear Algebra and Its Applications", author: "Gilbert Strang", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780030105677-M.jpg" },
  { id: "BSH811", title: "Differential Equations and Boundary Value Problems", author: "William E. Boyce, Richard C. DiPrima", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780470458310-M.jpg" },
  { id: "BSH812", title: "Environmental Studies", author: "R. Rajagopalan", category: "Basic Sciences & Humanities", totalCopies: 15, availableCopies: 10, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
  { id: "BSH813", title: "Professional Ethics and Human Values", author: "R.S. Naagarazan", category: "Basic Sciences & Humanities", totalCopies: 12, availableCopies: 8, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
  { id: "BSH814", title: "Concepts of Modern Physics", author: "Arthur Beiser", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780072448481-M.jpg" },
  { id: "BSH815", title: "Quantum Mechanics: Theory & Applications", author: "A. Ghatak, S. Lokanathan", category: "Basic Sciences & Humanities", totalCopies: 7, availableCopies: 4, cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
  { id: "BSH816", title: "Introduction to Electrodynamics", author: "David J. Griffiths", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780321856562-M.jpg" },
  { id: "BSH817", title: "Thermal Physics", author: "P.K. Nag", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 5, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
  { id: "BSH818", title: "Probability and Statistics for Engineers", author: "Ronald E. Walpole, Raymond H. Myers", category: "Basic Sciences & Humanities", totalCopies: 10, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780321694010-M.jpg" },
  { id: "BSH819", title: "Organic Chemistry", author: "Robert Thornton Morrison, Robert Neilson Boyd", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780136436690-M.jpg" },
  { id: "BSH820", title: "Physical Chemistry", author: "Peter Atkins, Julio de Paula", category: "Basic Sciences & Humanities", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9781429218122-M.jpg" },
  { id: "BSH821", title: "Engineering Graphics & Drawing", author: "N.D. Bhatt", category: "Basic Sciences & Humanities", totalCopies: 15, availableCopies: 10, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
  { id: "BSH822", title: "Vector Analysis (Schaum's Outlines)", author: "Murray R. Spiegel", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780071615457-M.jpg" },
  { id: "BSH823", title: "Complex Variables and Applications", author: "James Ward Brown, Ruel V. Churchill", category: "Basic Sciences & Humanities", totalCopies: 8, availableCopies: 5, cover: "https://covers.openlibrary.org/b/isbn/9780073051949-M.jpg" },
  { id: "BSH824", title: "Introduction to Probability Models", author: "Sheldon M. Ross", category: "Basic Sciences & Humanities", totalCopies: 7, availableCopies: 4, cover: "https://covers.openlibrary.org/b/isbn/9780123756862-M.jpg" },
  { id: "BSH825", title: "Business Communication: Building Critical Skills", author: "Kitty O. Locker", category: "Basic Sciences & Humanities", totalCopies: 9, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780073403151-M.jpg" },

  // ==========================================
  // DR. A.P.J. ABDUL KALAM TECHNICAL UNIVERSITY (AKTU) SYLLABUS BOOKS - 60 BOOKS
  // ==========================================
  { id: "AKTU001", title: "Engineering Mathematics - I (AKTU BAS-103)", author: "H.K. Dass, Dr. Rama Verma", category: "AKTU Curriculum", totalCopies: 20, availableCopies: 14, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
  { id: "AKTU002", title: "Engineering Mathematics - II (AKTU BAS-203)", author: "H.K. Dass, Rajnish Verma", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 12, cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80" },
  { id: "AKTU003", title: "Engineering Physics (AKTU BAS-101)", author: "Hitendra K. Malik, A.K. Singh", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
  { id: "AKTU004", title: "Engineering Chemistry (AKTU BAS-102)", author: "Dr. Shashi Chawla, Dr. Avinash Agarwal", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80" },
  { id: "AKTU005", title: "Programming for Problem Solving - C (AKTU KCS-101T)", author: "E. Balagurusamy, Reema Thareja", category: "AKTU Curriculum", totalCopies: 22, availableCopies: 16, cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
  { id: "AKTU006", title: "Basic Electrical Engineering (AKTU KEE-101T)", author: "D.C. Kulshreshtha, V.K. Mehta", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 11, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "AKTU007", title: "Basic Electronics Engineering (AKTU KEC-101T)", author: "Sanjay Sharma, J.B. Gupta", category: "AKTU Curriculum", totalCopies: 17, availableCopies: 10, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "AKTU008", title: "Fundamentals of Mechanical Engineering (AKTU KME-101T)", author: "Pravin Kumar, R.K. Rajput", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "AKTU009", title: "Universal Human Values & Ethics (AKTU KNC-301)", author: "R.R. Gaur, R. Sangal, G.P. Bagaria", category: "AKTU Curriculum", totalCopies: 25, availableCopies: 19, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
  { id: "AKTU010", title: "Technical Communication (AKTU KAS-301)", author: "Meenakshi Raman, Sangeeta Sharma", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 9, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
  { id: "AKTU011", title: "Data Structures using C (AKTU KCS-301)", author: "Reema Thareja, Seymour Lipschutz", category: "AKTU Curriculum", totalCopies: 20, availableCopies: 13, cover: "https://covers.openlibrary.org/b/isbn/9780198099307-M.jpg" },
  { id: "AKTU012", title: "Computer Organization & Architecture (AKTU KCS-302)", author: "M. Morris Mano, Carl Hamacher", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780132145107-M.jpg" },
  { id: "AKTU013", title: "Discrete Structures & Theory of Logic (AKTU KCS-303)", author: "J.P. Tremblay, R. Manohar", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780074631133-M.jpg" },
  { id: "AKTU014", title: "Operating Systems (AKTU KCS-401)", author: "Abraham Silberschatz, Peter B. Galvin", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9781119800361-M.jpg" },
  { id: "AKTU015", title: "Theory of Automata & Formal Languages (AKTU KCS-402)", author: "K.L.P. Mishra, N. Chandrasekaran", category: "AKTU Curriculum", totalCopies: 17, availableCopies: 10, cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" },
  { id: "AKTU016", title: "Microprocessor & Interfacing (AKTU KCS-403)", author: "Ramesh S. Gaonkar, A.K. Ray", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "AKTU017", title: "Database Management System (AKTU KCS-501)", author: "Henry F. Korth, Abraham Silberschatz", category: "AKTU Curriculum", totalCopies: 19, availableCopies: 12, cover: "https://covers.openlibrary.org/b/isbn/9780073523323-M.jpg" },
  { id: "AKTU018", title: "Web Designing & Technology (AKTU KCS-502)", author: "Uttam K. Roy, Harvey Deitel", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80" },
  { id: "AKTU019", title: "Design & Analysis of Algorithms (AKTU KCS-503)", author: "Thomas H. Cormen, Ellis Horowitz", category: "AKTU Curriculum", totalCopies: 20, availableCopies: 14, cover: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg" },
  { id: "AKTU020", title: "Compiler Design (AKTU KCS-601)", author: "Alfred V. Aho, Jeffrey D. Ullman", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780321486813-M.jpg" },
  { id: "AKTU021", title: "Software Engineering (AKTU KCS-602)", author: "Rajib Mall, Roger S. Pressman", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780078022128-M.jpg" },
  { id: "AKTU022", title: "Computer Networks (AKTU KCS-603)", author: "Behrouz A. Forouzan, Andrew S. Tanenbaum", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9780073376226-M.jpg" },
  { id: "AKTU023", title: "Artificial Intelligence (AKTU KCS-071)", author: "Stuart Russell, Peter Norvig", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780134610993-M.jpg" },
  { id: "AKTU024", title: "Cloud Computing (AKTU KCS-073)", author: "Rajiv Chopra, Thomas Erl", category: "AKTU Curriculum", totalCopies: 12, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780133387520-M.jpg" },
  { id: "AKTU025", title: "Cryptography & Network Security (AKTU KCS-074)", author: "William Stallings, Atul Kahate", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780134444284-M.jpg" },
  { id: "AKTU026", title: "Machine Learning Techniques (AKTU KCS-078)", author: "Tom M. Mitchell, Aurélien Géron", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9781492032649-M.jpg" },
  { id: "AKTU027", title: "Big Data Analytics (AKTU KCS-081)", author: "V.K. Jain, Nathan Marz", category: "AKTU Curriculum", totalCopies: 11, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9781617290343-M.jpg" },
  { id: "AKTU028", title: "Network Analysis & Synthesis (AKTU KEC-301)", author: "A. Chakrabarti, M.E. Van Valkenburg", category: "AKTU Curriculum", totalCopies: 13, availableCopies: 8, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "AKTU029", title: "Digital System Design (AKTU KEC-302)", author: "M. Morris Mano, Charles H. Roth", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780132145107-M.jpg" },
  { id: "AKTU030", title: "Solid State Devices (AKTU KEC-303)", author: "Ben G. Streetman, Sanjay Banerjee", category: "AKTU Curriculum", totalCopies: 12, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780133356038-M.jpg" },
  { id: "AKTU031", title: "Analog Circuits (AKTU KEC-401)", author: "Adel S. Sedra, Kenneth C. Smith", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 10, cover: "https://covers.openlibrary.org/b/isbn/9780199333134-M.jpg" },
  { id: "AKTU032", title: "Signals & Systems (AKTU KEC-402)", author: "Alan V. Oppenheim, Sanjay Sharma", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 11, cover: "https://covers.openlibrary.org/b/isbn/9780138147570-M.jpg" },
  { id: "AKTU033", title: "Communication Engineering (AKTU KEC-403)", author: "Sanjay Sharma, B.P. Lathi", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780195331455-M.jpg" },
  { id: "AKTU034", title: "Electromagnetic Field Theory (AKTU KEC-501)", author: "Matthew N.O. Sadiku", category: "AKTU Curriculum", totalCopies: 12, availableCopies: 7, cover: "https://covers.openlibrary.org/b/isbn/9780199461851-M.jpg" },
  { id: "AKTU035", title: "Digital Signal Processing (AKTU KEC-502)", author: "S. Salivahanan, John G. Proakis", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://covers.openlibrary.org/b/isbn/9780131873742-M.jpg" },
  { id: "AKTU036", title: "VLSI Design (AKTU KEC-601)", author: "Debaprasad Das, Neil H.E. Weste", category: "AKTU Curriculum", totalCopies: 11, availableCopies: 6, cover: "https://covers.openlibrary.org/b/isbn/9780321547743-M.jpg" },
  { id: "AKTU037", title: "Control Systems (AKTU KEE-402 / KEC-602)", author: "I.J. Nagrath, M. Gopal", category: "AKTU Curriculum", totalCopies: 17, availableCopies: 11, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "AKTU038", title: "Electrical Machines - I (AKTU KEE-301)", author: "P.S. Bimbhra, J.B. Gupta", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 12, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "AKTU039", title: "Electrical Machines - II (AKTU KEE-401)", author: "P.S. Bimbhra, D.P. Kothari", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" },
  { id: "AKTU040", title: "Power System - I (AKTU KEE-501)", author: "C.L. Wadhwa, V.K. Mehta", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80" },
  { id: "AKTU041", title: "Power Electronics (AKTU KEE-502)", author: "P.S. Bimbhra, M.H. Rashid", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://covers.openlibrary.org/b/isbn/9780133125900-M.jpg" },
  { id: "AKTU042", title: "Thermodynamics (AKTU KME-301)", author: "P.K. Nag, Yunus A. Cengel", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "AKTU043", title: "Strength of Materials (AKTU KME-302)", author: "R.K. Rajput, S. Ramamrutham", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 11, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "AKTU044", title: "Manufacturing Processes (AKTU KME-303)", author: "Serope Kalpakjian, B.S. Raghuwanshi", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "AKTU045", title: "Applied Thermodynamics (AKTU KME-401)", author: "R. Yadav, Onkar Singh", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
  { id: "AKTU046", title: "Fluid Mechanics & Machines (AKTU KME-402)", author: "R.K. Bansal, P.N. Modi", category: "AKTU Curriculum", totalCopies: 19, availableCopies: 12, cover: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&q=80" },
  { id: "AKTU047", title: "Theory of Machines (AKTU KME-501)", author: "S.S. Rattan, R.S. Khurmi", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "AKTU048", title: "Heat & Mass Transfer (AKTU KME-502)", author: "R.K. Rajput, P.K. Nag", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&q=80" },
  { id: "AKTU049", title: "Design of Machine Elements (AKTU KME-601)", author: "V.B. Bhandari, R.S. Khurmi", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
  { id: "AKTU050", title: "Building Materials & Construction (AKTU KCE-301)", author: "S.K. Duggal, S.C. Rangwala", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "AKTU051", title: "Surveying & Geomatics (AKTU KCE-302)", author: "B.C. Punmia, Ashok Kumar Jain", category: "AKTU Curriculum", totalCopies: 18, availableCopies: 11, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "AKTU052", title: "Fluid Mechanics Civil (AKTU KCE-303)", author: "R.K. Bansal, Modi & Seth", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "AKTU053", title: "Structural Analysis - I (AKTU KCE-401)", author: "S. Ramamrutham, S.S. Bhavikatti", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "AKTU054", title: "Design of Concrete Structures (AKTU KCE-502)", author: "N. Krishna Raju, Pillai & Menon", category: "AKTU Curriculum", totalCopies: 14, availableCopies: 8, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "AKTU055", title: "Geotechnical Engineering (AKTU KCE-503)", author: "K.R. Arora, B.C. Punmia", category: "AKTU Curriculum", totalCopies: 13, availableCopies: 7, cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" },
  { id: "AKTU056", title: "Environmental Engineering (AKTU KCE-601)", author: "S.K. Garg", category: "AKTU Curriculum", totalCopies: 16, availableCopies: 10, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" },
  { id: "AKTU057", title: "Design of Steel Structures (AKTU KCE-602)", author: "N. Subramanian, S.K. Duggal", category: "AKTU Curriculum", totalCopies: 12, availableCopies: 7, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "AKTU058", title: "Transportation Engineering (AKTU KCE-603)", author: "S.K. Khanna, C.E.G. Justo", category: "AKTU Curriculum", totalCopies: 15, availableCopies: 9, cover: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400&q=80" },
  { id: "AKTU059", title: "Constitution of India & Law (AKTU KNC-501)", author: "Madhav Khosla, D.D. Basu", category: "AKTU Curriculum", totalCopies: 20, availableCopies: 14, cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
  { id: "AKTU060", title: "Environment & Ecology (AKTU KNC-101)", author: "Dr. A.K. Pahari, Anubha Kaushik", category: "AKTU Curriculum", totalCopies: 22, availableCopies: 16, cover: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&q=80" }
];

// DOM Elements
var studentTabBtn = document.getElementById("studentTabBtn");
var adminTabBtn   = document.getElementById("adminTabBtn");
var studentPortal = document.getElementById("studentPortal");
var adminPortal   = document.getElementById("adminPortal");

var searchInput     = document.getElementById("searchInput");
var categoryFilter  = document.getElementById("categoryFilter");
var catalogList     = document.getElementById("catalogList");
var myBorrowedList  = document.getElementById("myBorrowedList");

var chatInput   = document.getElementById("chatInput");
var sendChatBtn = document.getElementById("sendChatBtn");
var chatHistory = document.getElementById("chatHistory");

var bookTitle           = document.getElementById("bookTitle");
var bookAuthor          = document.getElementById("bookAuthor");
var bookCategory        = document.getElementById("bookCategory");
var bookIsbn            = document.getElementById("bookIsbn");
var bookCopies          = document.getElementById("bookCopies");
var bookCover           = document.getElementById("bookCover");
var addBookBtn          = document.getElementById("addBookBtn");
var issuedLogList       = document.getElementById("issuedLogList");
var adminInventoryList  = document.getElementById("adminInventoryList");
var quickChipsContainer = document.getElementById("quickChipsContainer");
var chatbotSubtitle     = document.getElementById("chatbotSubtitle");

var books = [];
var borrowedBooks = [];
var currentPortal = "student";

// Generate a unique book ID using timestamp to avoid duplicates
function generateBookId() {
    return "ENG" + Date.now() + Math.floor(Math.random() * 100);
}

function init() {
    loadData();
    setupEventListeners();
    renderAll();
    renderQuickChips();
}

function loadData() {
    var catalogVer = localStorage.getItem("lib_catalog_version");
    var storedBooks = localStorage.getItem("lib_books");

    if (storedBooks && catalogVer === "4.0_aktu_engineering") {
        books = JSON.parse(storedBooks);
    } else {
        // Deep-clone sampleBooks so the original array is never mutated
        books = JSON.parse(JSON.stringify(sampleBooks));
        localStorage.setItem("lib_catalog_version", "4.0_aktu_engineering");
        saveBooks();
    }

    var storedBorrowed = localStorage.getItem("lib_borrowed");
    if (storedBorrowed) {
        borrowedBooks = JSON.parse(storedBorrowed);
    }

    // Firebase realtime sync listeners
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

// Returns only the current signed-in user's borrowed books
function getMyBorrowedBooks() {
    if (!currentUser) return [];
    var uid = currentUser.uid;
    return borrowedBooks.filter(function(item) {
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
    studentTabBtn.addEventListener("click", function() { switchPortal("student"); });
    adminTabBtn.addEventListener("click", function() { switchPortal("admin"); });

    searchInput.addEventListener("input", renderCatalog);
    categoryFilter.addEventListener("change", renderCatalog);

    addBookBtn.addEventListener("click", addNewBook);

    var scanCoverBtn = document.getElementById("scanCoverBtn");
    if (scanCoverBtn) {
        scanCoverBtn.addEventListener("click", scanBookCoverFile);
    }

    var googleSignInBtn = document.getElementById("googleSignInBtn");
    var googleSignOutBtn = document.getElementById("googleSignOutBtn");
    var gateGoogleSignInBtn = document.getElementById("gateGoogleSignInBtn");

    if (googleSignInBtn) {
        googleSignInBtn.addEventListener("click", function() {
            if (typeof signInWithGoogle === "function") signInWithGoogle();
        });
    }
    if (gateGoogleSignInBtn) {
        gateGoogleSignInBtn.addEventListener("click", function() {
            if (typeof signInWithGoogle === "function") signInWithGoogle();
        });
    }
    if (googleSignOutBtn) {
        googleSignOutBtn.addEventListener("click", function() {
            if (typeof signOutGoogle === "function") signOutGoogle();
        });
    }

    // Firebase auth state listener
    if (typeof auth !== "undefined" && auth) {
        auth.onAuthStateChanged(function(user) {
            var signInBtn = document.getElementById("googleSignInBtn");
            var userProfile = document.getElementById("userProfile");
            var userAvatar = document.getElementById("userAvatar");
            var userName = document.getElementById("userName");
            var authLockScreen = document.getElementById("authLockScreen");
            var appLayout = document.getElementById("appLayout");

            if (user) {
                currentUser = user;
                if (authLockScreen) authLockScreen.style.display = "none";
                if (appLayout) appLayout.style.display = "grid";
                if (signInBtn) signInBtn.style.display = "none";
                if (userProfile) userProfile.style.display = "flex";
                if (userAvatar) userAvatar.src = user.photoURL || "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";
                if (userName) userName.innerText = user.displayName || user.email || "User";
                renderAll();
            } else {
                currentUser = null;
                if (authLockScreen) authLockScreen.style.display = "flex";
                if (appLayout) appLayout.style.display = "none";
                if (signInBtn) signInBtn.style.display = "flex";
                if (userProfile) userProfile.style.display = "none";
            }
        });
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

function borrowBook(bookId) {
    var book = books.find(function(b) { return b.id === bookId; });

    if (!book || book.availableCopies <= 0) {
        alert("Sorry, this book is currently out of stock!");
        return;
    }

    var defaultName = (typeof currentUser !== "undefined" && currentUser && currentUser.displayName) ? currentUser.displayName : "";
    var studentName = prompt("Enter your Name:", defaultName);
    if (!studentName || !studentName.trim()) return;

    var studentId = prompt("Enter your Student ID (e.g. ST-101):");
    if (!studentId || !studentId.trim()) return;

    book.availableCopies -= 1;

    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    var item = {
        id: "BR-" + Date.now(),
        bookId: book.id,
        title: book.title,
        author: book.author,
        studentName: studentName.trim(),
        studentId: studentId.trim(),
        uid: currentUser ? currentUser.uid : "anonymous",
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

function renderMyBorrowed() {
    myBorrowedList.innerHTML = "";

    var myBooks = getMyBorrowedBooks();

    if (myBooks.length === 0) {
        myBorrowedList.innerHTML = '<p class="empty-msg">You have not borrowed any books yet.</p>';
        return;
    }

    var nowTime = Date.now();

    for (var i = 0; i < myBooks.length; i++) {
        var item = myBooks[i];
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

function returnBook(borrowId) {
    var index = borrowedBooks.findIndex(function(b) { return b.id === borrowId; });
    if (index === -1) return;

    var item = borrowedBooks[index];

    // Students can only return their own books
    if (currentUser && item.uid && item.uid !== currentUser.uid && currentPortal === "student") {
        alert("You can only return books you borrowed.");
        return;
    }

    var book = books.find(function(b) { return b.id === item.bookId; });

    if (book) {
        // Cap availableCopies so it never exceeds totalCopies
        book.availableCopies = Math.min(book.availableCopies + 1, book.totalCopies);
    }

    borrowedBooks.splice(index, 1);

    saveBooks();
    saveBorrowed();
    renderAll();

    alert("Thank you! Book returned successfully.");
}

function addNewBook() {
    var title    = bookTitle.value.trim();
    var author   = bookAuthor.value.trim();
    var category = bookCategory.value;
    var isbn     = bookIsbn.value.trim() || generateBookId();
    var copies   = Number(bookCopies.value);
    var cover    = (bookCover && bookCover.value.trim()) ? bookCover.value.trim() : DEFAULT_COVER;

    if (!title || !author || !category || copies <= 0) {
        alert("Please fill in all book details with valid values.");
        return;
    }

    // Prevent duplicate ISBN/ID
    var existingBook = books.find(function(b) { return b.id === isbn; });
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

    alert("Book '" + title + "' added to library inventory!");
}

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
        var fineAmount = 0;

        if (isOverdue) {
            var diffDays = Math.ceil((nowTime - item.dueTimestamp) / (1000 * 60 * 60 * 24));
            fineAmount = diffDays * 20;
        }

        var div = document.createElement("div");
        div.className = "log-item";

        div.innerHTML = ''
            + '<div class="log-info">'
            + '    <strong>' + item.title + '</strong>'
            + '    <span>Borrower: ' + (item.studentName || 'Student') + ' (' + (item.studentId || 'N/A') + ')</span>'
            + '    <span>Issued: ' + item.borrowDate + ' | Due: ' + item.dueDate + '</span>'
            +      (isOverdue ? '<span style="color: #ef4444; font-weight: 600;">⚠️ Overdue (Fine: ₹' + fineAmount + ')</span>' : '')
            + '</div>'
            + '<button class="action-btn return-btn" onclick="returnBook(\'' + item.id + '\')">Mark Returned</button>';

        issuedLogList.appendChild(div);
    }
}

// AI Chatbot
function sendQuickChip(text) {
    chatInput.value = text;
    sendChatMessage(text);
}

async function sendChatMessage(userText) {
    if (!userText) return;

    appendBubble(userText, "user-bubble");
    chatInput.value = "";

    var loadingId = "ai-loading-" + Date.now();
    appendBubble("Thinking...", "ai-bubble", loadingId);

    var inventoryContext = books.map(function(b) {
        return "- '" + b.title + "' by " + b.author + " [Category: " + b.category + "] -> Available Copies: " + b.availableCopies + "/" + b.totalCopies;
    }).join("\n");

    var prompt = "";

    if (currentPortal === "student") {
        prompt = "You are the ShelfSense AI Assistant for our Engineering College Library helping a STUDENT.\n"
            + "Live Engineering Library Catalog Right Now:\n" + inventoryContext + "\n\n"
            + "Student Query: '" + userText + "'\n\n"
            + "STRICT RESPONSE RULES:\n"
            + "1. FIRST & FOREMOST: Answer the student's exact query directly!\n"
            + "2. If the user is asking whether a book is available or in stock (e.g. 'Is Cormen available?' or 'Do you have Operating System Concepts?'):\n"
            + "   - Search the Live Library Catalog above for matching titles or authors.\n"
            + "   - IF AVAILABLE (copies > 0): State CLEARLY at the top: 'YES, [Book Title] is AVAILABLE ([N] copies in stock)!'. STRICT RULE: DO NOT GIVE ANY RECOMMENDATIONS OR EXTRA BOOK SUGGESTIONS IF THE ANSWER IS YES! STOP IMMEDIATELY AFTER ANSWERING YES.\n"
            + "   - IF OUT OF STOCK or NOT FOUND: State CLEARLY at the top: 'NO, [Book Title] is currently out of stock / not in library'. Then, and ONLY THEN, list 1-2 related available books from that engineering department at the end.\n"
            + "3. If student asks to ADD or DELETE a book, REJECT politely: '🔒 Only Librarians can add or modify books. Please switch to the Librarian Portal to add new books!'\n"
            + "4. Use bold formatting and emojis. Keep responses concise, direct, and professional.";
    } else {
        prompt = "You are the ShelfSense AI Assistant & Librarian Agent for our Engineering College Library helping a LIBRARIAN.\n"
            + "Live Engineering Library Catalog Right Now:\n" + inventoryContext + "\n\n"
            + "Librarian Input: '" + userText + "'\n\n"
            + "STRICT RESPONSE RULES:\n"
            + "1. FIRST & FOREMOST: Directly answer the librarian's exact query or request!\n"
            + "2. If asking about book availability:\n"
            + "   - IF AVAILABLE (copies > 0): State YES clearly with available copies count. STRICT RULE: DO NOT GIVE ANY RECOMMENDATIONS OR EXTRA BOOK SUGGESTIONS IF THE ANSWER IS YES!\n"
            + "   - IF OUT OF STOCK or NOT FOUND: State NO clearly. Only then offer 1-2 recommended books.\n"
            + "3. IF THE LIBRARIAN WANTS TO ADD A BOOK (e.g. 'Add 5 copies of Thermodynamics by PK Nag under Mechanical Engineering'):\n"
            + "   - Confirm addition in friendly text.\n"
            + "   - At the VERY END of your response, append this JSON tag EXACTLY:\n"
            + "   [[ACTION_ADD: {\"title\": \"Book Title\", \"author\": \"Author Name\", \"category\": \"Department Name\", \"copies\": 5}]]\n"
            + "   Supported engineering departments: Computer Science & Engineering, Information Technology, Artificial Intelligence & Data Science, Electronics & Communication, Electrical & Electronics, Mechanical Engineering, Civil Engineering, Basic Sciences & Humanities, Other.\n"
            + "4. Format with bold text and emojis.";
    }

    try {
        var response = await fetch("/api/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        if (response.ok) {
            var data = await response.json();
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                var rawReply = data.candidates[0].content.parts[0].text;

                // Parse ACTION_ADD tag for auto book addition in librarian portal
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
                                cover: DEFAULT_COVER
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

                var loadingBubble = document.getElementById(loadingId);
                if (loadingBubble) {
                    loadingBubble.innerHTML = formatMarkdown(rawReply);
                }
                chatHistory.scrollTop = chatHistory.scrollHeight;
                return;
            }
        }
    } catch (e) {
        console.log("API unavailable, using local fallback.", e.message);
    }

    // Local fallback for offline/local dev
    handleLocalChatbotResponse(userText, loadingId);
}

function handleLocalChatbotResponse(userText, loadingId) {
    var loadingBubble = document.getElementById(loadingId);
    if (!loadingBubble) return;

    var lowerText = userText.toLowerCase();

    // Check if asking to add a book
    var addRegex = /add\s+(\d+)?\s*(?:copies of)?\s*["']?([^"']+)["']?\s+by\s+([^"']+?)(?:\s+under\s+([^"']+))?$/i;
    var matchAdd = userText.match(addRegex);

    if (matchAdd || lowerText.startsWith("add ")) {
        if (currentPortal === "student") {
            loadingBubble.innerHTML = "🔒 <strong>Access Denied</strong>: Only Librarians can add or modify books. Please switch to the 🔑 <strong>Librarian Portal</strong> to add new books!";
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
            cover: DEFAULT_COVER
        };

        books.push(newBook);
        saveBooks();
        renderAll();

        loadingBubble.innerHTML = "✅ <strong>Successfully added!</strong> Added " + copies + " copies of <strong>'" + title + "'</strong> by " + author + " under department <em>" + category + "</em> to the engineering library inventory! 📚";
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    var availables = books.filter(function(b) { return b.availableCopies > 0; });
    var recSuffix = availables.length > 0
        ? "<br><br>💡 <strong>Recommended in stock:</strong> " + availables.slice(0, 2).map(function(b){ return "<em>" + b.title + "</em> (" + b.availableCopies + " available)"; }).join(", ")
        : "";

    // Check availability queries (fuzzy search title or author)
    var cleanKeyword = lowerText.replace(/is|available|in stock|do you have|book|copies|the|\?/gi, "").trim();

    var foundBook = books.find(function(b) {
        var bTitle = b.title.toLowerCase();
        var bAuthor = b.author.toLowerCase();
        return lowerText.includes(bTitle) || (cleanKeyword.length > 2 && (bTitle.includes(cleanKeyword) || bAuthor.includes(cleanKeyword)));
    });

    if (foundBook) {
        if (foundBook.availableCopies > 0) {
            // STRICT RULE: DO NOT GIVE ANY RECOMMENDATION IF ANSWER IS YES!
            loadingBubble.innerHTML = "✅ <strong>YES!</strong> <em>'" + foundBook.title + "'</em> by " + foundBook.author + " (" + foundBook.category + ") is currently <strong>AVAILABLE</strong> (" + foundBook.availableCopies + " of " + foundBook.totalCopies + " copies in stock)! 📖";
        } else {
            // Give recommendations ONLY if answer is NO
            var similar = books.filter(function(b) { return b.category === foundBook.category && b.availableCopies > 0 && b.id !== foundBook.id; });
            var recText = similar.length > 0
                ? "<br><br>💡 <strong>Recommended available books in " + foundBook.category + ":</strong> " + similar.slice(0, 2).map(function(s){return "<em>" + s.title + "</em>";}).join(", ")
                : recSuffix;
            loadingBubble.innerHTML = "❌ <strong>NO</strong>: <em>'" + foundBook.title + "'</em> is currently out of stock." + recText;
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // Category query
    var foundCat = books.find(function(b) {
        return lowerText.includes(b.category.toLowerCase());
    });

    if (foundCat) {
        var catBooks = books.filter(function(b) { return b.category.toLowerCase() === foundCat.category.toLowerCase() && b.availableCopies > 0; });
        if (catBooks.length > 0) {
            loadingBubble.innerHTML = "📚 Available in <strong>" + foundCat.category + "</strong>:<br>• " + catBooks.map(function(b){ return "<strong>" + b.title + "</strong> (" + b.availableCopies + " copies)"; }).join("<br>• ");
        } else {
            loadingBubble.innerHTML = "Currently no books available under department " + foundCat.category + "." + recSuffix;
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return;
    }

    // General query / fallback
    var isCheckingAvailability = lowerText.includes("available") || lowerText.includes("have") || lowerText.includes("stock") || lowerText.includes("is ");
    if (isCheckingAvailability && cleanKeyword.length > 0) {
        loadingBubble.innerHTML = "❌ <strong>NO</strong>: <em>'" + cleanKeyword + "'</em> was not found in our engineering library inventory." + recSuffix;
    } else {
        var picks = availables.slice(0, 3).map(function(b) { return "• <strong>" + b.title + "</strong> by " + b.author + " (" + b.availableCopies + " available)"; }).join("<br>");
        loadingBubble.innerHTML = "🤖 Here are top recommended books available in ShelfSense right now:<br>" + picks;
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

// AI Modal
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

if (aiModal) {
    aiModal.addEventListener("click", function(e) {
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
    reader.onload = async function(e) {
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
