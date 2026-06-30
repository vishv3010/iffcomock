const STUDY_MATERIAL = {
    "iffco": {
        title: "About IFFCO & The GET Exam",
        content: `
            <div class="study-card">
                <h3>🏢 What is IFFCO?</h3>
                <p><strong>Indian Farmers Fertiliser Cooperative Limited (IFFCO)</strong> is one of India's biggest cooperative societies, completely owned by Indian Cooperatives. Founded in 1967 with just 57 cooperatives, it is today an amalgamation of over 36,000 Indian Cooperatives.</p>
                <p>IFFCO is primarily engaged in the production and distribution of fertilizers. Its core mission is to enable Indian farmers to prosper through timely supply of reliable, high-quality agricultural inputs and services in an environmentally sustainable manner.</p>
            </div>

            <div class="study-card">
                <h3>💻 Role of a GET (Computer Science)</h3>
                <p>As a Graduate Engineer Trainee (GET) in Computer Science, you will be handling IFFCO's extensive IT infrastructure. Your responsibilities will likely include:</p>
                <ul>
                    <li><strong>ERP Systems:</strong> Managing, maintaining, and customizing Oracle/SAP ERP systems used across all manufacturing plants and corporate offices.</li>
                    <li><strong>Networking & Security:</strong> Ensuring the massive corporate network connecting plants, regional offices, and marketing federations remains secure and highly available.</li>
                    <li><strong>Software Development:</strong> Building internal tools, data dashboards, and farmer-facing portals using modern web technologies and Java/C#.</li>
                    <li><strong>Data Analytics:</strong> Analyzing supply chain, production, and sales data for optimization and predictive maintenance.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>📝 The Preliminary Online Assessment Pattern</h3>
                <p>The preliminary exam is a high-speed, high-accuracy test designed to filter candidates before the final interview stage. It typically consists of:</p>
                <ul>
                    <li><strong>Technical Section (Core CS):</strong> Heavy focus on foundational subjects (Data Structures, DBMS, Operating Systems, Networking, and Object-Oriented Programming). Questions test conceptual clarity, definitions, and outputs rather than deep coding.</li>
                    <li><strong>Aptitude Section:</strong> Quantitative Aptitude, Logical Reasoning, and General Awareness/English. Speed and mental math are the key here.</li>
                    <li><strong>Time Management:</strong> You will usually have less than a minute per question. Do not get stuck on any single question. If a math problem takes more than 45 seconds to understand, skip it and come back later.</li>
                </ul>
                <div class="study-tip">
                    <strong>Exam Strategy:</strong> The exam usually has negative marking (commonly 1/4th or 0.25 marks per wrong answer). Only guess if you can confidently eliminate at least two options. Always finish the Technical section first—it is your strong suit and takes less calculation time than the Aptitude section.
                </div>
            </div>
        `
    },
    "dsa": {
        title: "Data Structures & Algorithms (DSA)",
        content: `
            <p>Data Structures and Algorithms form the absolute core of the technical assessment. Expect direct theoretical questions on time complexities, definitions, tree traversals, and sorting algorithms.</p>
            
            <div class="study-card">
                <h3>📚 Linear Data Structures (Basics)</h3>
                <ul>
                    <li><strong>Array:</strong> A collection of items stored at contiguous (adjacent) memory locations. 
                        <ul>
                            <li><em>Pros:</em> Direct access to elements using index <code>O(1)</code>.</li>
                            <li><em>Cons:</em> Fixed size (in static arrays), insertion/deletion in the middle requires shifting elements <code>O(n)</code>.</li>
                        </ul>
                    </li>
                    <li><strong>Linked List:</strong> Elements (nodes) are stored non-contiguously. Each node contains data and a pointer to the next node. 
                        <ul>
                            <li><em>Pros:</em> Dynamic size, fast insertion/deletion at the head <code>O(1)</code>.</li>
                            <li><em>Cons:</em> Sequential access only <code>O(n)</code>. Binary search cannot be applied directly.</li>
                            <li><em>Types:</em> Singly, Doubly (pointers to next and prev), Circular (last node points to first).</li>
                        </ul>
                    </li>
                    <li><strong>Stack:</strong> Follows LIFO (Last In, First Out). 
                        <ul>
                            <li><em>Operations:</em> <code>push()</code> (insert), <code>pop()</code> (remove), <code>peek()</code> (view top). All are <code>O(1)</code>.</li>
                            <li><em>Applications:</em> Depth-First Search (DFS), undo mechanisms, expression evaluation (Postfix/Prefix), managing function calls (Recursion).</li>
                        </ul>
                    </li>
                    <li><strong>Queue:</strong> Follows FIFO (First In, First Out). 
                        <ul>
                            <li><em>Operations:</em> <code>enqueue()</code> (insert at rear), <code>dequeue()</code> (remove from front). All are <code>O(1)</code>.</li>
                            <li><em>Applications:</em> Breadth-First Search (BFS), CPU task scheduling, printer spooling.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🌳 Non-Linear Data Structures (Trees & Graphs)</h3>
                <ul>
                    <li><strong>Binary Tree:</strong> A tree where each node has at most two children (left and right). 
                        <br><br><strong>Traversals:</strong>
                        <ul>
                            <li><em>In-order:</em> Left, Root, Right. (In a Binary Search Tree, this prints elements in sorted ascending order).</li>
                            <li><em>Pre-order:</em> Root, Left, Right. (Used to create a copy of the tree).</li>
                            <li><em>Post-order:</em> Left, Right, Root. (Used to delete the tree).</li>
                        </ul>
                    </li>
                    <li><strong>Binary Search Tree (BST):</strong> A binary tree where the left child is strictly smaller than the parent, and the right child is strictly greater. 
                        <ul>
                            <li><em>Search/Insert/Delete:</em> Average case is <code>O(log n)</code>. Worst-case (if the tree becomes a straight line/skewed) is <code>O(n)</code>.</li>
                        </ul>
                    </li>
                    <li><strong>AVL Tree:</strong> A self-balancing BST. The height difference (balance factor) between the left and right subtrees of any node cannot be more than 1 (it must be -1, 0, or 1). Guarantees <code>O(log n)</code> for all operations.</li>
                    <li><strong>Graph:</strong> A collection of Vertices (nodes) and Edges (lines connecting nodes). 
                        <ul>
                            <li><em>Representations:</em> Adjacency Matrix (2D array, good for dense graphs) or Adjacency List (Array of linked lists, good for sparse graphs).</li>
                            <li><em>Shortest Path:</em> Dijkstra's Algorithm (does not work with negative weights), Bellman-Ford (handles negative weights).</li>
                            <li><em>Minimum Spanning Tree (MST):</em> Kruskal's Algorithm (sorts edges), Prim's Algorithm (builds from a vertex).</li>
                        </ul>
                    </li>
                </ul>
            </div>
            
            <div class="study-card">
                <h3>⚡ Algorithm Time & Space Complexities</h3>
                <p>Memorize this table. Direct questions are frequently asked from it.</p>
                <table class="study-table">
                    <tr><th>Algorithm</th><th>Best Case</th><th>Average Case</th><th>Worst Case</th><th>Space Complexity</th></tr>
                    <tr><td>Bubble Sort</td><td>O(n) <em>(if already sorted)</em></td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td></tr>
                    <tr><td>Insertion Sort</td><td>O(n) <em>(if already sorted)</em></td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td></tr>
                    <tr><td>Selection Sort</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td></tr>
                    <tr><td>Merge Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td></tr>
                    <tr><td>Quick Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td></tr>
                    <tr><td>Heap Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td></tr>
                    <tr><td>Binary Search</td><td>O(1)</td><td>O(log n)</td><td>O(log n)</td><td>O(1)</td></tr>
                </table>
            </div>

            <div class="study-tip">
                <strong>Pro Tip:</strong> Questions often try to trick you by asking for the WORST case of Quick Sort, which is <code>O(n²)</code> (happens when the pivot chosen is consistently the smallest or largest element, like in an already sorted array). Merge Sort, however, is rock solid at <code>O(n log n)</code> in all cases, but it requires <code>O(n)</code> extra space.
            </div>
        `
    },
    "dbms": {
        title: "Database Management Systems (DBMS)",
        content: `
            <p>DBMS is a highly scored topic. Focus heavily on ACID properties, Keys, Normalization forms, and SQL syntax rules.</p>

            <div class="study-card">
                <h3>🔑 Database Keys & Definitions</h3>
                <ul>
                    <li><strong>Schema:</strong> The logical structure or blueprint of the database.</li>
                    <li><strong>Tuple:</strong> A single row or record in a table.</li>
                    <li><strong>Attribute:</strong> A column or field in a table.</li>
                    <li><strong>Super Key:</strong> Any set of attributes that can uniquely identify a tuple.</li>
                    <li><strong>Candidate Key:</strong> A minimal super key. It has no unnecessary attributes. There can be multiple candidate keys in a table.</li>
                    <li><strong>Primary Key:</strong> A candidate key chosen by the database designer to identify tuples uniquely. <em>Rule:</em> Cannot contain NULL values and must be completely unique.</li>
                    <li><strong>Foreign Key:</strong> An attribute in one table that references the primary key of another table. It enforces <strong>Referential Integrity</strong> (ensuring relationships between tables remain valid).</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🛡️ ACID Properties (Transaction Management)</h3>
                <p>These four properties guarantee that database transactions are processed reliably.</p>
                <ul>
                    <li><strong>Atomicity:</strong> "All or nothing." A transaction is either fully completed or completely rolled back. If money is deducted from Account A, it MUST be added to Account B, otherwise the whole transaction fails.</li>
                    <li><strong>Consistency:</strong> The database must remain in a valid state after any transaction (it must obey all defined constraints, cascades, and triggers).</li>
                    <li><strong>Isolation:</strong> Concurrent execution of transactions leaves the database in the same state as if they were executed sequentially one after the other.</li>
                    <li><strong>Durability:</strong> Once a transaction has been committed, it will remain so permanently, even in the event of power loss, server crashes, or errors.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>📏 Normalization Forms</h3>
                <p>Normalization is the process of organizing data to reduce redundancy and prevent insertion, deletion, and update anomalies.</p>
                <ul>
                    <li><strong>1NF (First Normal Form):</strong> Eliminates repeating groups. Every attribute/cell must be atomic (contain a single, indivisible value).</li>
                    <li><strong>2NF (Second Normal Form):</strong> Must be in 1NF. Eliminates <strong>partial dependencies</strong> (every non-prime attribute must be fully functionally dependent on the entire primary key, not just part of a composite key).</li>
                    <li><strong>3NF (Third Normal Form):</strong> Must be in 2NF. Eliminates <strong>transitive dependencies</strong>. "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key."</li>
                    <li><strong>BCNF (Boyce-Codd Normal Form):</strong> A stricter version of 3NF. For every functional dependency X → Y, X MUST be a super key.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>💻 Essential SQL Commands (Categorized)</h3>
                <ul>
                    <li><strong>DDL (Data Definition Language):</strong> Defines the schema.
                        <ul><li><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>, <code>RENAME</code></li></ul>
                    </li>
                    <li><strong>DML (Data Manipulation Language):</strong> Manipulates the actual data.
                        <ul><li><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></li></ul>
                    </li>
                    <li><strong>DQL (Data Query Language):</strong> Retrieves data.
                        <ul><li><code>SELECT</code></li></ul>
                    </li>
                    <li><strong>DCL (Data Control Language):</strong> Manages permissions.
                        <ul><li><code>GRANT</code>, <code>REVOKE</code></li></ul>
                    </li>
                    <li><strong>TCL (Transaction Control Language):</strong> Manages transactions.
                        <ul><li><code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></li></ul>
                    </li>
                </ul>
            </div>
            
            <div class="study-tip">
                <strong>Difference Alert (DELETE vs TRUNCATE vs DROP):</strong> 
                <br>• <code>DELETE</code> is DML, removes specific rows (can use WHERE), and CAN be rolled back.
                <br>• <code>TRUNCATE</code> is DDL, empties the entire table immediately, is much faster, and CANNOT be rolled back. Keeps the table structure.
                <br>• <code>DROP</code> is DDL, deletes the entire table AND its structure from the database permanently.
            </div>
        `
    },
    "os": {
        title: "Operating Systems (OS)",
        content: `
            <p>Operating Systems questions usually revolve around Process Management, Deadlocks, Memory Management, and CPU Scheduling.</p>

            <div class="study-card">
                <h3>⚙️ Process vs Thread</h3>
                <table class="study-table">
                    <tr><th>Feature</th><th>Process</th><th>Thread</th></tr>
                    <tr><td>Definition</td><td>An executing instance of a program.</td><td>A lightweight sub-process within a process.</td></tr>
                    <tr><td>Memory</td><td>Has its own isolated memory space.</td><td>Shares memory, data, and resources with sibling threads.</td></tr>
                    <tr><td>Overhead</td><td>Heavyweight. Context switching takes more time.</td><td>Lightweight. Context switching is extremely fast.</td></tr>
                    <tr><td>Failure</td><td>If a process crashes, it doesn't affect others.</td><td>If a thread crashes, the entire parent process crashes.</td></tr>
                </table>
            </div>

            <div class="study-card">
                <h3>🚦 Deadlocks</h3>
                <p>A deadlock occurs when a set of processes are blocked permanently because each process is holding a resource and waiting for another resource acquired by some other process.</p>
                <p><strong>The 4 Coffman Conditions (All 4 MUST hold simultaneously for a deadlock to occur):</strong></p>
                <ol>
                    <li><strong>Mutual Exclusion:</strong> At least one resource must be held in a non-shareable mode.</li>
                    <li><strong>Hold and Wait:</strong> A process must hold at least one resource and simultaneously wait for others.</li>
                    <li><strong>No Preemption:</strong> Resources cannot be forcibly taken away from a process; they must be released voluntarily.</li>
                    <li><strong>Circular Wait:</strong> A closed chain of processes exists, where P1 waits for P2, P2 waits for P3, and P3 waits for P1.</li>
                </ol>
            </div>

            <div class="study-card">
                <h3>🧠 Memory Management & Paging</h3>
                <ul>
                    <li><strong>External Fragmentation:</strong> Total memory space exists to satisfy a request, but it is not contiguous. (Solved by Paging).</li>
                    <li><strong>Internal Fragmentation:</strong> Memory allocated to a process is slightly larger than requested, wasting space inside the block. (Caused by Paging).</li>
                    <li><strong>Paging:</strong> Divides logical memory into fixed-size blocks (Pages) and physical memory into same-size blocks (Frames). The OS uses a Page Table to map them.</li>
                    <li><strong>Virtual Memory:</strong> A technique that gives the illusion of a very large main memory. It allows execution of processes larger than physical RAM by bringing in only required pages from the hard drive (Demand Paging).</li>
                    <li><strong>Thrashing:</strong> A critical state where the CPU is busy swapping pages in and out of the disk rather than executing actual instructions, leading to severe performance degradation.</li>
                </ul>
            </div>
            
            <div class="study-card">
                <h3>⏱️ CPU Scheduling Algorithms</h3>
                <ul>
                    <li><strong>FCFS (First Come First Serve):</strong> Non-preemptive. Simple, but suffers from the <strong>Convoy Effect</strong> (short processes get stuck waiting behind one massive long process).</li>
                    <li><strong>SJF (Shortest Job First):</strong> Preemptive/Non-preemptive. Guaranteed to give the minimum average waiting time. However, it cannot be implemented practically because future CPU burst times cannot be perfectly predicted.</li>
                    <li><strong>Round Robin:</strong> Preemptive. Every process gets a fixed time quantum (e.g., 4ms). If it doesn't finish, it goes to the back of the queue. Used heavily in interactive time-sharing systems.</li>
                </ul>
            </div>
        `
    },
    "networks": {
        title: "Computer Networks",
        content: `
            <p>Networking is highly relevant for enterprise IT roles. Focus heavily on the OSI model layers, TCP vs UDP, and IP Addressing fundamentals.</p>

            <div class="study-card">
                <h3>🌐 The OSI Model (7 Layers)</h3>
                <p>Always remember the order from bottom (Layer 1) to top (Layer 7). Mnemonic: <strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way.</p>
                <ol>
                    <li><strong>Physical Layer:</strong> Transmits raw bit streams over physical medium. Devices: Hubs, Cables, Repeaters.</li>
                    <li><strong>Data Link Layer:</strong> Node-to-node transfer. Handles error detection using MAC addresses. Devices: Switches, Bridges. (PDU: Frame).</li>
                    <li><strong>Network Layer:</strong> Routing and logical addressing using IP addresses. Determines the best path. Devices: Routers. (PDU: Packet).</li>
                    <li><strong>Transport Layer:</strong> End-to-end communication, reliability, multiplexing. Protocols: TCP, UDP. (PDU: Segment).</li>
                    <li><strong>Session Layer:</strong> Establishes, maintains, and terminates communication sessions between applications.</li>
                    <li><strong>Presentation Layer:</strong> Data formatting, translation, encryption, decryption, and compression (e.g., JPEG, SSL).</li>
                    <li><strong>Application Layer:</strong> Network applications acting as the interface for the user. Protocols: HTTP, FTP, SMTP, DNS.</li>
                </ol>
            </div>

            <div class="study-card">
                <h3>🔄 TCP vs UDP</h3>
                <table class="study-table">
                    <tr><th>Feature</th><th>TCP (Transmission Control Protocol)</th><th>UDP (User Datagram Protocol)</th></tr>
                    <tr><td>Connection</td><td>Connection-oriented (Requires 3-way handshake: SYN, SYN-ACK, ACK).</td><td>Connectionless (Just fires data packets blindly).</td></tr>
                    <tr><td>Reliability</td><td>Highly reliable. Guarantees delivery and correct ordering.</td><td>Unreliable. Packets can drop or arrive out of order.</td></tr>
                    <tr><td>Speed/Overhead</td><td>Slower due to heavy overhead/acknowledgments.</td><td>Extremely fast, minimal overhead.</td></tr>
                    <tr><td>Ideal Use Cases</td><td>Web browsing (HTTP), Emails (SMTP), File transfer (FTP).</td><td>Live video streaming, VoIP calls, Gaming, DNS queries.</td></tr>
                </table>
            </div>

            <div class="study-card">
                <h3>📍 IP Addressing & Subnetting</h3>
                <ul>
                    <li><strong>IPv4 vs IPv6:</strong> IPv4 is 32-bit (e.g., 192.168.1.1). IPv6 is 128-bit hexadecimal, created because we ran out of IPv4 addresses.</li>
                    <li><strong>MAC Address:</strong> A 48-bit physical hardware address burned permanently into the NIC (Network Interface Card) by the manufacturer.</li>
                    <li><strong>Classes of IPv4 Addresses:</strong>
                        <ul>
                            <li><strong>Class A:</strong> 1.0.0.0 to 126.0.0.0 (Default Subnet Mask: 255.0.0.0). Used for massive networks.</li>
                            <li><strong>Class B:</strong> 128.0.0.0 to 191.255.0.0 (Default Subnet Mask: 255.255.0.0).</li>
                            <li><strong>Class C:</strong> 192.0.0.0 to 223.255.255.0 (Default Subnet Mask: 255.255.255.0). Used for small home/office networks.</li>
                        </ul>
                    </li>
                    <li><strong>Loopback Address:</strong> 127.0.0.1. Used to ping your own machine to test if the local network stack is functioning.</li>
                </ul>
            </div>
            
            <div class="study-card">
                <h3>🔗 Important Ports to Memorize</h3>
                <p>In multiple-choice questions, ports are easy marks. Memorize these:</p>
                <ul>
                    <li><strong>FTP:</strong> 20 (Data), 21 (Control) - File transfers.</li>
                    <li><strong>SSH:</strong> 22 - Secure remote login (replaced Telnet).</li>
                    <li><strong>Telnet:</strong> 23 - Unsecure remote login.</li>
                    <li><strong>SMTP:</strong> 25 - Sending emails.</li>
                    <li><strong>DNS:</strong> 53 - Resolving domain names (google.com) to IP addresses.</li>
                    <li><strong>HTTP:</strong> 80 - Standard unencrypted web traffic.</li>
                    <li><strong>POP3:</strong> 110 - Receiving emails.</li>
                    <li><strong>HTTPS:</strong> 443 - Secure encrypted web traffic.</li>
                </ul>
            </div>
        `
    },
    "software_eng": {
        title: "Software Engineering & OOP",
        content: `
            <p>This section covers Software Development Life Cycle (SDLC) models, testing methodologies, and Object-Oriented Programming principles.</p>
            
            <div class="study-card">
                <h3>📦 Object-Oriented Programming (OOP) Pillars</h3>
                <ul>
                    <li><strong>Encapsulation:</strong> Wrapping data (variables) and code (methods) together into a single secure unit (class). It hides the internal state from the outside world using access modifiers (private, protected).</li>
                    <li><strong>Abstraction:</strong> Hiding complex, messy implementation details and showing only the essential, clean features of the object to the user. (e.g., you know how to use a steering wheel without knowing how the engine works).</li>
                    <li><strong>Inheritance:</strong> A mechanism where a new child class acquires the properties and behaviors of an existing parent class, promoting code reusability and establishing a parent-child relationship.</li>
                    <li><strong>Polymorphism:</strong> The ability of a message or function to be displayed in more than one form. 
                        <ul>
                            <li><em>Compile-time (Static):</em> Method Overloading (same method name in the same class, but with different parameters).</li>
                            <li><em>Run-time (Dynamic):</em> Method Overriding (child class provides a specific, new implementation of a method already defined in its parent class).</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🔄 Software Development Life Cycle (SDLC)</h3>
                <ul>
                    <li><strong>Waterfall Model:</strong> A strict, linear, sequential approach (Requirements -> Design -> Implementation -> Testing -> Deployment). Good for well-defined, unchanging requirements. It is very hard to go back once a phase is finished.</li>
                    <li><strong>Agile Model:</strong> Highly iterative and incremental. Highly flexible to changing requirements. Breaks work into small 2-4 week "sprints" focusing on rapid delivery of working software.</li>
                    <li><strong>Spiral Model:</strong> Focuses heavily on continuous risk analysis and iterative prototyping. Best for large, high-risk, expensive projects.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🧪 Software Testing Methodologies</h3>
                <ul>
                    <li><strong>Unit Testing:</strong> Testing individual, smallest components/functions in strict isolation (White-box testing, done by developers).</li>
                    <li><strong>Integration Testing:</strong> Testing how multiple modules communicate and work together.</li>
                    <li><strong>System Testing:</strong> Testing the fully integrated, complete application as a whole (Black-box testing, done by QA).</li>
                    <li><strong>Regression Testing:</strong> Re-running old tests to ensure recent new code changes haven't accidentally broken existing functionality.</li>
                    <li><strong>User Acceptance Testing (UAT):</strong> The final phase of testing done by the actual client/end-user to accept the software before production release.</li>
                </ul>
            </div>
        `
    },
    "aptitude": {
        title: "Aptitude, Reasoning & English",
        content: `
            <p>The Aptitude section is where many engineering students lose time. Knowing shortcuts is mandatory to clear the cutoff. Speed is more important than knowing the long mathematical proof.</p>
            
            <div class="study-card">
                <h3>🧮 Quantitative Shortcuts & Formulas</h3>
                <ul>
                    <li><strong>Percentage Reversal Trick:</strong> Calculating 16% of 25 in your head is hard. Reverse it: 25% of 16 is easy (it's a quarter of 16, so 4). <code>x% of y = y% of x</code>.</li>
                    <li><strong>Time, Speed & Distance Conversions:</strong>
                        <ul>
                            <li>km/hr to m/s ➔ multiply by <code>(5/18)</code></li>
                            <li>m/s to km/hr ➔ multiply by <code>(18/5)</code></li>
                            <li><em>Train problems:</em> If a train passes a pole or standing man, Distance = Length of train. If it passes a platform or bridge, Distance = Length of train + Length of platform.</li>
                        </ul>
                    </li>
                    <li><strong>Time & Work:</strong> If Person A can do a job in X days, A's 1-day work is 1/X. If A and B work together, their combined 1-day work is <code>(1/X) + (1/Y)</code>. 
                        <br><em>Shortcut for combined days:</em> <code>(X * Y) / (X + Y)</code>.</li>
                    <li><strong>Simple Interest:</strong> <code>SI = (P * R * T) / 100</code></li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🧩 Logical Reasoning Hacks</h3>
                <ul>
                    <li><strong>Blood Relations:</strong> Never guess based on real-life names (e.g., assuming "Kiran" is female). Always draw a family tree. Use a <code>+</code> or square for male, a <code>-</code> or circle for female. Use horizontal lines for siblings, vertical lines for generations, and double lines for marriages.</li>
                    <li><strong>Direction Sense:</strong> Always draw a small '+' sign on your rough sheet (N at top, S at bottom, W left, E right). Remember that the Pythogoras theorem (<code>a² + b² = c²</code>) is almost always required to find the shortest distance between the start and end points.</li>
                    <li><strong>Number Series:</strong> 
                        <ol>
                            <li>First, check the differences between consecutive numbers. If differences are constant, it's an Arithmetic series.</li>
                            <li>If differences are multiplying rapidly, it's Geometric.</li>
                            <li>Always check for hidden squares/cubes (e.g., is the sequence actually <code>n² - 1</code> or <code>n³ + 1</code>?).</li>
                        </ol>
                    </li>
                </ul>
            </div>

            <div class="study-card">
                <h3>📖 English & Grammar Basics</h3>
                <ul>
                    <li><strong>Subject-Verb Agreement:</strong> Singular subjects take singular verbs. Watch out for tricky phrases: "The team" is usually singular. "A pair of shoes" is singular. "Neither of the boys" is singular.</li>
                    <li><strong>Active/Passive Voice:</strong> In passive voice, the object becomes the subject. (Active: "The dog bit the man." Passive: "The man was bitten by the dog.") Tense generally remains the same, just the form changes.</li>
                    <li><strong>Prepositions:</strong> Memorize fixed prepositions. You are good <em>at</em> something (not good <em>in</em>). You congratulate someone <em>on</em> their success (not <em>for</em>). You are senior <em>to</em> someone (not senior <em>than</em>).</li>
                </ul>
            </div>
            
            <div class="study-tip">
                <strong>Golden Time Management Rule:</strong> In the aptitude section, if you read a Number Series or Puzzle and cannot figure out the underlying logic within 30 seconds, <strong>SKIP IT IMMEDIATELY</strong>. Do not let your ego waste 3 minutes on a 1-mark question. Mark it for review and return at the end of the exam.
            </div>
        `
    },
    "gk": {
        title: "General Knowledge & Awareness",
        content: `
            <p>The GK section is meant to be answered in seconds. You either know it or you don't. Here are high-frequency topics asked in PSU/Cooperative exams like IFFCO.</p>
            
            <div class="study-card">
                <h3>🌾 Agriculture & IFFCO Highlights</h3>
                <ul>
                    <li><strong>Green Revolution:</strong> Initiated in the 1960s in India. M.S. Swaminathan is known as the father of the Green Revolution in India.</li>
                    <li><strong>Major Crops:</strong> Kharif (sown in June-July: Rice, Maize, Cotton) and Rabi (sown in Oct-Nov: Wheat, Barley, Mustard).</li>
                    <li><strong>IFFCO Innovations:</strong> IFFCO introduced <strong>Nano Urea Liquid</strong> in 2021, the world's first nano fertilizer, heavily reducing the need for conventional bulk urea.</li>
                    <li><strong>Headquarters:</strong> IFFCO is headquartered in New Delhi, India.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🏛️ Indian Polity & Constitution</h3>
                <ul>
                    <li><strong>Fundamental Rights:</strong> Borrowed from the US Constitution. Covered in Part III (Articles 12-35).</li>
                    <li><strong>Important Articles:</strong> 
                        <ul>
                            <li>Article 14: Equality before law.</li>
                            <li>Article 21: Protection of life and personal liberty.</li>
                            <li>Article 32: Right to Constitutional Remedies (Heart and Soul of the Constitution).</li>
                        </ul>
                    </li>
                    <li><strong>Parliament:</strong> Consists of the President, Lok Sabha (Lower House), and Rajya Sabha (Upper House). Minimum age for Lok Sabha is 25, Rajya Sabha is 30.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🌍 Geography & Environment</h3>
                <ul>
                    <li><strong>Longest & Largest:</strong> The longest river in India is the Ganga. The largest freshwater lake in India is Wular Lake (J&K).</li>
                    <li><strong>Atmosphere:</strong> Nitrogen is the most abundant gas (78%), followed by Oxygen (21%).</li>
                    <li><strong>Important Lines:</strong> Tropic of Cancer passes through 8 Indian states. Standard Meridian of India is 82°30'E.</li>
                </ul>
            </div>

            <div class="study-card">
                <h3>🏆 Honors, Awards & Economy</h3>
                <ul>
                    <li><strong>Nobel Prize:</strong> The highest international award. Rabindranath Tagore was the first Indian to win it (Literature, 1913).</li>
                    <li><strong>Bharat Ratna:</strong> The highest civilian award of the Republic of India.</li>
                    <li><strong>RBI (Reserve Bank of India):</strong> Established in 1935, nationalized in 1949. Controls the monetary policy and regulates the banking system.</li>
                </ul>
            </div>
            
            <div class="study-tip">
                <strong>Current Affairs Tip:</strong> For the IFFCO exam, heavily focus on recent government schemes related to agriculture (like PM-KISAN), major technological launches (like ISRO missions), and recent global summits hosted by India (like G20).
            </div>
        `
    }
};
