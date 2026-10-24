/**
 * PythonCraft — Interactive Python Learning Platform
 * Complete Client-Side Application Logic
 * Modern Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Theme Management (Dark / Light Mode)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem('pythoncraft_theme');
    if (savedTheme) {
      htmlElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pythoncraft_theme', newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  // =========================================================================
  // 2. Mobile Navigation Menu
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking any nav item
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('main section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 3. Curriculum Data Model (Beginner, Intermediate, Advanced)
  // =========================================================================
  const curriculumData = [
    // ---------------- BEGINNER TIER ----------------
    {
      id: 'b1',
      tier: 'beginner',
      tierLabel: 'Beginner',
      lessonNum: '01',
      title: 'Variables & Data Types',
      desc: 'Learn how to declare variables, understand dynamic typing, and work with integers, floats, strings, and booleans.',
      previewCode: `# Declaring variables\nuser_name = "Alex"\nage = 24\nheight = 1.78\nis_enrolled = True\n\nprint(f"{user_name} is {age} years old.")\nprint(f"Type of age: {type(age)}")`,
      modalContent: `
        <h4>What are Variables?</h4>
        <p>In Python, variables are named containers for storing data values. Unlike languages such as C++ or Java, Python has no command for declaring a variable and types are dynamically inferred at runtime.</p>
        <h4>Fundamental Data Types:</h4>
        <ul>
          <li><strong>int</strong>: Whole numbers without decimals (e.g., <code>42</code>, <code>-7</code>)</li>
          <li><strong>float</strong>: Real numbers with a fractional point (e.g., <code>3.14159</code>, <code>-0.5</code>)</li>
          <li><strong>str</strong>: Sequences of characters enclosed in quotes (e.g., <code>"Hello"</code>, <code>'Python'</code>)</li>
          <li><strong>bool</strong>: Logical values: either <code>True</code> or <code>False</code></li>
        </ul>
        <h4>Type Checking & Conversion:</h4>
        <p>Use the built-in <code>type()</code> function to inspect types, and functions like <code>int()</code>, <code>float()</code>, or <code>str()</code> to explicitly convert between them.</p>
      `,
      playgroundSnippet: `# Lesson 1: Variables & Data Types\nname = "Pythonista"\nage = 25\npi = 3.14159\nis_learning = True\n\nprint("Hello,", name)\nprint("Age next year:", age + 1)\nprint("Float value:", pi)\nprint("Learning status:", is_learning)\nprint("Variable types:", type(name), type(age), type(pi), type(is_learning))`
    },
    {
      id: 'b2',
      tier: 'beginner',
      tierLabel: 'Beginner',
      lessonNum: '02',
      title: 'Operators & Input',
      desc: 'Master arithmetic, comparison, and logical operators, along with gathering dynamic user inputs from the console.',
      previewCode: `# Arithmetic & Comparison\na = 10\nb = 3\nprint(f"Division: {a / b:.2f}")\nprint(f"Floor Div: {a // b}, Modulo: {a % b}")\nprint(f"Power: {a ** b}")`,
      modalContent: `
        <h4>Python Operators:</h4>
        <p>Operators perform operations on variables and values.</p>
        <ul>
          <li><strong>Arithmetic:</strong> <code>+</code> (Add), <code>-</code> (Subtract), <code>*</code> (Multiply), <code>/</code> (True float division), <code>//</code> (Floor division), <code>%</code> (Modulo/Remainder), <code>**</code> (Exponentiation)</li>
          <li><strong>Comparison:</strong> <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
          <li><strong>Logical:</strong> <code>and</code>, <code>or</code>, <code>not</code></li>
        </ul>
        <h4>Reading Input:</h4>
        <p>The <code>input(prompt)</code> function pauses execution and waits for user text. Remember: <code>input()</code> always returns a <strong>string</strong>, so cast it using <code>int()</code> or <code>float()</code> if you need numbers.</p>
      `,
      playgroundSnippet: `# Lesson 2: Operators & Math Expressions\nx = 17\ny = 5\n\nprint("x + y =", x + y)\nprint("x - y =", x - y)\nprint("x * y =", x * y)\nprint("Float Div x / y =", x / y)\nprint("Floor Div x // y =", x // y)\nprint("Modulo (remainder) x % y =", x % y)\nprint("x to the power of 2 =", x ** 2)\nprint("Is x > y and y > 0?", x > y and y > 0)`
    },
    {
      id: 'b3',
      tier: 'beginner',
      tierLabel: 'Beginner',
      lessonNum: '03',
      title: 'Conditional Statements',
      desc: 'Control execution paths using if, elif, and else branching logic with clean indentation standards.',
      previewCode: `score = 88\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\nprint(f"Final Grade: {grade}")`,
      modalContent: `
        <h4>Decision Making in Python</h4>
        <p>Conditional statements inspect expressions that evaluate to <code>True</code> or <code>False</code> and branch program execution accordingly.</p>
        <h4>Syntax Rules:</h4>
        <ul>
          <li>Always conclude conditional lines with a colon (<code>:</code>).</li>
          <li>Python relies on <strong>indentation</strong> (usually 4 spaces) rather than curly braces <code>{}</code> to define blocks of code.</li>
          <li><code>elif</code> is short for "else if" and can be chained multiple times.</li>
        </ul>
        <h4>Ternary Operator (Conditional Expression):</h4>
        <p><code>status = "Adult" if age >= 18 else "Minor"</code></p>
      `,
      playgroundSnippet: `# Lesson 3: Conditionals (if, elif, else)\ntemperature = 22\nis_raining = False\n\nif temperature > 25 and not is_raining:\n    print("It's a warm and sunny day! Perfect for a walk.")\nelif temperature > 15:\n    print("Mild pleasant weather. Enjoy your afternoon.")\nelse:\n    print("It's chilly outside, don't forget a warm jacket!")\n\nstatus = "Warm" if temperature >= 20 else "Cold"\nprint("Status evaluation:", status)`
    },
    {
      id: 'b4',
      tier: 'beginner',
      tierLabel: 'Beginner',
      lessonNum: '04',
      title: 'Loops (For & While)',
      desc: 'Iterate over ranges and sequences with for loops, control repetitive tasks with while loops, and use break & continue.',
      previewCode: `# Range & For Loop\nfor i in range(1, 6):\n    if i == 4:\n        continue\n    print(f"Step {i}: {i * i}")`,
      modalContent: `
        <h4>Repetition and Iteration</h4>
        <p>Loops allow you to execute a code block repeatedly without rewriting statements.</p>
        <h4>For Loops & range():</h4>
        <p>The <code>range(start, stop, step)</code> generates an immutable sequence of numbers. <code>stop</code> is exclusive (not included in the output).</p>
        <h4>While Loops:</h4>
        <p>Executes as long as the test condition remains <code>True</code>. Be sure to increment or update the counter to avoid infinite loops!</p>
        <h4>Loop Controls:</h4>
        <ul>
          <li><code>break</code>: Immediately terminates the innermost loop.</li>
          <li><code>continue</code>: Skips the rest of the current iteration and jumps to the next step.</li>
          <li><code>else</code> block in loops: Runs when loop finishes naturally (not triggered by break).</li>
        </ul>
      `,
      playgroundSnippet: `# Lesson 4: For and While Loops\nprint("--- Counting with For Loop & range() ---")\nfor num in range(1, 6):\n    print(f"{num} squared is {num ** 2}")\n\nprint("\\n--- Countdown with While Loop ---")\ncount = 3\nwhile count > 0:\n    print("T-minus", count)\n    count -= 1\nprint("Blast off! 🚀")`
    },

    // ---------------- INTERMEDIATE TIER ----------------
    {
      id: 'i1',
      tier: 'intermediate',
      tierLabel: 'Intermediate',
      lessonNum: '05',
      title: 'Functions & Scope',
      desc: 'Structure reusable code with functions, parameter passing, return values, variable scope, and lambda expressions.',
      previewCode: `def calculate_total(price, tax_rate=0.08):\n    """Calculates final price with tax."""\n    return price * (1 + tax_rate)\n\nprint(f"Total: {calculate_total(100):.2f}")`,
      modalContent: `
        <h4>Creating Clean Functions</h4>
        <p>Functions are modular blocks of reusable code initiated using the <code>def</code> keyword.</p>
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Parameters & Default Arguments:</strong> Give parameters default values to make arguments optional.</li>
          <li><strong>*args and **kwargs:</strong> <code>*args</code> collects positional arguments into a tuple; <code>**kwargs</code> collects keyword arguments into a dictionary.</li>
          <li><strong>Variable Scope (LEGB):</strong> Local, Enclosing, Global, Built-in hierarchy.</li>
          <li><strong>Docstrings:</strong> Multi-line strings right after <code>def</code> for documentation.</li>
        </ul>
      `,
      playgroundSnippet: `# Lesson 5: Functions, Default Arguments & Lambda\ndef greet(name, title="Developer"):\n    return f"Greetings, {title} {name}!"\n\ndef add_all(*numbers):\n    return sum(numbers)\n\n# Anonymous lambda function for squaring\nsquare = lambda n: n ** 2\n\nprint(greet("Sarah"))\nprint(greet("Ada", "Pioneer"))\nprint("Sum of (2, 4, 6, 8, 10):", add_all(2, 4, 6, 8, 10))\nprint("Lambda 7 squared:", square(7))`
    },
    {
      id: 'i2',
      tier: 'intermediate',
      tierLabel: 'Intermediate',
      lessonNum: '06',
      title: 'Lists & List Comprehensions',
      desc: 'Explore dynamic arrays, indexing, slicing, powerful built-in methods, and elegant list comprehensions.',
      previewCode: `numbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers if x % 2 == 1]\nprint(f"Odd squares: {squares}")`,
      modalContent: `
        <h4>Ordered & Mutable Sequences</h4>
        <p>Lists are versatile, ordered collections that can hold mixed data types.</p>
        <h4>List Slicing:</h4>
        <p><code>list[start:stop:step]</code> lets you extract sub-lists. Negative indices count backward from the end (<code>list[-1]</code> is the last element).</p>
        <h4>List Comprehensions:</h4>
        <p>Provides a concise syntax to create lists based on existing lists: <code>[expression for item in iterable if condition]</code>.</p>
      `,
      playgroundSnippet: `# Lesson 6: Lists, Methods & Comprehensions\nfruits = ["apple", "banana", "cherry", "date"]\nfruits.append("elderberry")\nprint("All fruits:", fruits)\nprint("First three fruits (slice):", fruits[:3])\nprint("Reversed fruits:", fruits[::-1])\n\n# List comprehension: Length of each fruit with > 5 chars\nlong_fruits = [f.upper() for f in fruits if len(f) > 5]\nprint("Uppercase long fruit names:", long_fruits)`
    },
    {
      id: 'i3',
      tier: 'intermediate',
      tierLabel: 'Intermediate',
      lessonNum: '07',
      title: 'Dictionaries & Sets',
      desc: 'Organize data with fast key-value lookups using dictionaries and manage unique elements with mathematical sets.',
      previewCode: `student = {"name": "Elena", "score": 95}\nstudent["passed"] = True\nfor key, val in student.items():\n    print(f"{key}: {val}")`,
      modalContent: `
        <h4>Hash Map Collections</h4>
        <p>Dictionaries store pairs of <code>key: value</code>. Keys must be unique and immutable (strings, numbers, tuples).</p>
        <h4>Dictionary Methods:</h4>
        <ul>
          <li><code>dict.get(key, default)</code>: Safely retrieves values without crashing on missing keys.</li>
          <li><code>dict.keys()</code>, <code>dict.values()</code>, <code>dict.items()</code>: Convenient iteration views.</li>
        </ul>
        <h4>Sets:</h4>
        <p>Unordered collections of unique elements. Perfect for removing duplicates and doing set math: union (<code>|</code>), intersection (<code>&amp;</code>), and difference (<code>-</code>).</p>
      `,
      playgroundSnippet: `# Lesson 7: Dictionaries and Sets\nuser_profile = {\n    "username": "coder_42",\n    "role": "Engineer",\n    "languages": ["Python", "JavaScript"]\n}\n\nprint("Username:", user_profile.get("username"))\nprint("Country (safe get with default):", user_profile.get("country", "Unknown"))\n\n# Sets for uniqueness and Venn operations\nfront_end = {"HTML", "CSS", "JavaScript"}\nback_end = {"Python", "SQL", "JavaScript"}\n\nprint("Common languages (Intersection):", front_end & back_end)\nprint("All unique skills (Union):", front_end | back_end)`
    },
    {
      id: 'i4',
      tier: 'intermediate',
      tierLabel: 'Intermediate',
      lessonNum: '08',
      title: 'Object-Oriented Programming (OOP)',
      desc: 'Model real-world systems with Classes, instances, constructors (__init__), encapsulated methods, and inheritance.',
      previewCode: `class Hero:\n    def __init__(self, name, power):\n        self.name = name\n        self.power = power\n    def strike(self):\n        return f"{self.name} uses {self.power}!"`,
      modalContent: `
        <h4>Object-Oriented Programming Principles</h4>
        <p>OOP organizes software design around data, or objects, rather than functions and logic alone.</p>
        <h4>Core Pillars:</h4>
        <ul>
          <li><strong>Classes &amp; Objects:</strong> A class is a blueprint; an object is an instantiated instance.</li>
          <li><strong>The <code>__init__</code> Constructor:</strong> Initializes attributes when a new instance is created.</li>
          <li><strong>The <code>self</code> Parameter:</strong> A reference to the current instance of the class.</li>
          <li><strong>Inheritance:</strong> Allows a child class to inherit attributes and methods from a parent class using <code>class Child(Parent):</code> and <code>super()</code>.</li>
        </ul>
      `,
      playgroundSnippet: `# Lesson 8: Object-Oriented Programming (Classes & Inheritance)\nclass Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n\n    def speak(self):\n        return f"{self.name} makes a sound."\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, species="Canine")\n        self.breed = breed\n\n    def speak(self):\n        return f"{self.name} the {self.breed} barks: Woof! 🐾"\n\npet = Dog("Buddy", "Golden Retriever")\nprint("Species:", pet.species)\nprint(pet.speak())`
    },

    // ---------------- ADVANCED TIER ----------------
    {
      id: 'a1',
      tier: 'advanced',
      tierLabel: 'Advanced',
      lessonNum: '09',
      title: 'Error & Exception Handling',
      desc: 'Write robust, crash-resilient code using try, except, else, finally blocks, and custom error raising.',
      previewCode: `try:\n    result = 100 / 0\nexcept ZeroDivisionError as err:\n    print(f"Caught error: {err}")\nfinally:\n    print("Execution complete.")`,
      modalContent: `
        <h4>Defensive Programming</h4>
        <p>Exceptions are runtime events that disrupt normal instruction flow. Handling exceptions prevents programs from crashing abruptly.</p>
        <h4>The Complete Try Block Structure:</h4>
        <ul>
          <li><code>try:</code> Code block to monitor for potential errors.</li>
          <li><code>except SpecificError as e:</code> Catches and resolves specific exceptions.</li>
          <li><code>else:</code> Executes only if NO errors were raised in the <code>try</code> block.</li>
          <li><code>finally:</code> Always runs, regardless of whether an exception occurred (ideal for clean-up tasks).</li>
        </ul>
        <h4>Triggering Exceptions:</h4>
        <p>Use <code>raise ValueError("Invalid argument")</code> to explicitly trigger an exception.</p>
      `,
      playgroundSnippet: `# Lesson 9: Exception Handling\ndef safe_divide(a, b):\n    try:\n        res = a / b\n    except ZeroDivisionError:\n        return "⚠️ Error: Cannot divide by zero!"\n    except TypeError:\n        return "⚠️ Error: Both inputs must be numbers!"\n    else:\n        return f"✅ Calculation result: {res}"\n    finally:\n        print(f"--> [Logged division attempt: {a} / {b}]")\n\nprint(safe_divide(20, 4))\nprint(safe_divide(15, 0))\nprint(safe_divide(10, 'text'))`
    },
    {
      id: 'a2',
      tier: 'advanced',
      tierLabel: 'Advanced',
      lessonNum: '10',
      title: 'File Handling & Context Managers',
      desc: 'Read, write, and append data safely with context managers (the with statement) to guarantee resource cleanup.',
      previewCode: `# Context manager syntax\n# with open('data.txt', 'w') as f:\n#     f.write("Safe storage")\n\n# Simulated file memory stream:\nstream = ["log line 1", "log line 2"]\nprint("\\n".join(stream))`,
      modalContent: `
        <h4>Working with Files</h4>
        <p>File handling involves opening, reading, writing, and closing files on disk.</p>
        <h4>File Access Modes:</h4>
        <ul>
          <li><code>'r'</code>: Read mode (default). Raises error if file doesn't exist.</li>
          <li><code>'w'</code>: Write mode. Overwrites existing contents or creates a new file.</li>
          <li><code>'a'</code>: Append mode. Appends new data to the end of the file.</li>
        </ul>
        <h4>The <code>with</code> Statement (Context Manager):</h4>
        <p>Always prefer the <code>with</code> statement because it automatically closes file streams even if exceptions are thrown during read/write operations!</p>
      `,
      playgroundSnippet: `# Lesson 10: File Operations & In-Memory Simulation\n# Note: In-browser sandbox simulates persistent text buffers\nsimulated_filesystem = {}\n\ndef write_file(filename, content):\n    simulated_filesystem[filename] = content\n    return f"Saved {len(content)} characters to '{filename}'"\n\ndef read_file(filename):\n    return simulated_filesystem.get(filename, "File not found!")\n\n# Writing to a simulated file\nprint(write_file("notes.txt", "1. Learn Python\\n2. Build Projects\\n3. Master Software Engineering"))\n\n# Reading from the simulated file\nprint("\\n--- File Contents ---")\nprint(read_file("notes.txt"))`
    },
    {
      id: 'a3',
      tier: 'advanced',
      tierLabel: 'Advanced',
      lessonNum: '11',
      title: 'Modules & Standard Library',
      desc: 'Harness the batteries-included Python standard library by importing math, random, datetime, and custom module spaces.',
      previewCode: `import math\nimport random\n\nprint("Pi:", math.pi)\nprint("Random int (1-10):", random.randint(1, 10))`,
      modalContent: `
        <h4>"Batteries Included" Philosophy</h4>
        <p>Python provides an extensive standard library. You import modules using the <code>import</code> statement.</p>
        <h4>Popular Standard Modules:</h4>
        <ul>
          <li><code>math</code>: Trigonometry, factorials, logs, and constants (pi, e).</li>
          <li><code>random</code>: Pseudorandom number generators and sampling.</li>
          <li><code>datetime</code>: Date manipulation and timestamps.</li>
          <li><code>json</code>: Parsing and serializing JSON datasets.</li>
        </ul>
        <h4>Import Styles:</h4>
        <p><code>import math</code>, <code>from math import sqrt, pi</code>, or <code>import math as m</code> (aliasing).</p>
      `,
      playgroundSnippet: `# Lesson 11: Standard Modules (math and algorithms)\nimport math\n\nangle_deg = 45\nangle_rad = math.radians(angle_deg)\n\nprint("Angle:", angle_deg, "degrees")\nprint("Sine:", round(math.sin(angle_rad), 4))\nprint("Cosine:", round(math.cos(angle_rad), 4))\nprint("Hypotenuse of (3, 4):", math.hypot(3, 4))\nprint("Factorial of 5:", math.factorial(5))\nprint("Square root of 144:", math.sqrt(144))`
    }
  ];

  // =========================================================================
  // 4. Curriculum Rendering & Filter Controller
  // =========================================================================
  const curriculumGrid = document.getElementById('curriculumGrid');
  const tierTabs = document.querySelectorAll('.tier-tab');

  function renderCurriculum(filterTier = 'all') {
    if (!curriculumGrid) return;
    curriculumGrid.innerHTML = '';

    const filtered = filterTier === 'all' 
      ? curriculumData 
      : curriculumData.filter(item => item.tier === filterTier);

    filtered.forEach(lesson => {
      const card = document.createElement('article');
      card.className = 'lesson-card';
      card.setAttribute('data-tier', lesson.tier);

      card.innerHTML = `
        <div class="lesson-card-header">
          <span class="lesson-tier-tag tier-tag-${lesson.tier}">${lesson.tierLabel}</span>
          <span class="lesson-number">#${lesson.lessonNum}</span>
        </div>
        <h3 class="lesson-title">${escapeHTML(lesson.title)}</h3>
        <p class="lesson-desc">${escapeHTML(lesson.desc)}</p>
        <pre class="lesson-code-snippet"><code>${formatSyntaxHighlighting(lesson.previewCode)}</code></pre>
        <div class="lesson-card-actions">
          <button class="btn btn-secondary btn-sm btn-card-action btn-view-lesson" data-lesson-id="${lesson.id}">
            Deep Dive
          </button>
          <button class="btn btn-primary btn-sm btn-card-action btn-load-playground" data-lesson-id="${lesson.id}">
            Try in Editor
          </button>
        </div>
      `;
      curriculumGrid.appendChild(card);
    });

    // Attach event handlers to card buttons
    attachCurriculumCardEvents();
  }

  function attachCurriculumCardEvents() {
    // Deep dive modal trigger
    document.querySelectorAll('.btn-view-lesson').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-lesson-id');
        openLessonModal(id);
      });
    });

    // Load in playground trigger
    document.querySelectorAll('.btn-load-playground').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-lesson-id');
        loadLessonIntoPlayground(id);
      });
    });
  }

  tierTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tierTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const tier = tab.getAttribute('data-tier');
      renderCurriculum(tier);
    });
  });

  renderCurriculum('all');

  // =========================================================================
  // 5. Lesson Modal Dialog Controller
  // =========================================================================
  const lessonModal = document.getElementById('lessonModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalRunInPlaygroundBtn = document.getElementById('modalRunInPlaygroundBtn');
  const modalTierBadge = document.getElementById('modalTierBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  let activeModalLessonId = null;

  function openLessonModal(lessonId) {
    const lesson = curriculumData.find(item => item.id === lessonId);
    if (!lesson || !lessonModal) return;

    activeModalLessonId = lesson.id;
    modalTierBadge.textContent = `${lesson.tierLabel} Tier — Lesson #${lesson.lessonNum}`;
    modalTitle.textContent = lesson.title;
    modalBody.innerHTML = lesson.modalContent;

    lessonModal.classList.add('open');
    lessonModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLessonModal() {
    if (!lessonModal) return;
    lessonModal.classList.remove('open');
    lessonModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModalLessonId = null;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeLessonModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeLessonModal);
  if (lessonModal) {
    lessonModal.addEventListener('click', (e) => {
      if (e.target === lessonModal) closeLessonModal();
    });
  }

  if (modalRunInPlaygroundBtn) {
    modalRunInPlaygroundBtn.addEventListener('click', () => {
      if (activeModalLessonId) {
        loadLessonIntoPlayground(activeModalLessonId);
        closeLessonModal();
      }
    });
  }

  function loadLessonIntoPlayground(lessonId) {
    const lesson = curriculumData.find(item => item.id === lessonId);
    if (!lesson) return;

    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
      codeEditor.value = lesson.playgroundSnippet;
      updateLineNumbers();
      updateLineCol();
      showToast(`Loaded "${lesson.title}" into Playground`, 'info');
      
      const playgroundEl = document.getElementById('playground');
      if (playgroundEl) {
        playgroundEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Hero Preview button
  const heroTryBtn = document.getElementById('heroTryBtn');
  if (heroTryBtn) {
    heroTryBtn.addEventListener('click', () => {
      const heroCode = `# Welcome to PythonCraft!\ndef create_developer(name, passion):\n    skills = ["Logic", "Problem Solving", "Python"]\n    return {\n        "dev": name,\n        "level": "Mastery",\n        "skills": skills,\n        "ready": True\n    }\n\nuser = create_developer("You", "Coding")\nprint(f"🚀 Welcome, {user['dev']}! Ready for {user['level']}?")\nprint("Skills inventory:", user["skills"])`;
      const codeEditor = document.getElementById('codeEditor');
      if (codeEditor) {
        codeEditor.value = heroCode;
        updateLineNumbers();
        document.getElementById('playground').scrollIntoView({ behavior: 'smooth' });
        showToast('Loaded welcome snippet into Playground', 'info');
      }
    });
  }

  // =========================================================================
  // 6. Interactive Code Playground & Preset Templates
  // =========================================================================
  const codeEditor = document.getElementById('codeEditor');
  const lineNumbers = document.getElementById('lineNumbers');
  const lineColCounter = document.getElementById('lineColCounter');
  const snippetSelect = document.getElementById('snippetSelect');
  const runCodeBtn = document.getElementById('runCodeBtn');
  const clearCodeBtn = document.getElementById('clearCodeBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const terminalOutput = document.getElementById('terminalOutput');
  const executionStatus = document.getElementById('executionStatus');
  const terminalInputBar = document.getElementById('terminalInputBar');
  const terminalInputField = document.getElementById('terminalInputField');
  const terminalInputPrompt = document.getElementById('terminalInputPrompt');
  const terminalInputSubmitBtn = document.getElementById('terminalInputSubmitBtn');

  // Curated Preset Snippets
  const codeSnippets = {
    hello: `# Hello World & Dynamic Typing\ngreeting = "Welcome to PythonCraft!"\nversion = 3.12\nis_fun = True\n\nprint(greeting)\nprint(f"Python Version: {version} | Is Coding Fun? {is_fun}")\nprint(f"Type check: {type(greeting)}, {type(version)}")`,

    conditionals: `# Logic & Conditional Branching\nscore = 85\nattendance_rate = 0.92\n\nif score >= 90 and attendance_rate >= 0.8:\n    result = "Passed with Honors! 🌟"\nelif score >= 70:\n    result = "Passed successfully! ✅"\nelse:\n    result = "Requires improvement. 📚"\n\nprint(f"Score: {score}%, Attendance: {attendance_rate * 100}%")\nprint(f"Status: {result}")`,

    loops: `# For and While Loops\nprint("Counting square numbers:")\nfor i in range(1, 6):\n    print(f"{i} * {i} = {i ** 2}")\n\nprint("\\nCountdown with while:")\nseconds = 3\nwhile seconds > 0:\n    print(f"Starting in {seconds}...")\n    seconds -= 1\nprint("GO! 🚀")`,

    functions: `# Functions with *args and Return Values\ndef generate_report(title, *stats, author="System"):\n    print(f"=== {title.upper()} ===")\n    print(f"Report generated by: {author}")\n    total = sum(stats)\n    avg = total / len(stats) if stats else 0\n    return {"total": total, "average": avg, "count": len(stats)}\n\nmetrics = generate_report("Q3 Performance", 84, 92, 78, 96, author="Lead Dev")\nprint("Calculated Metrics:", metrics)`,

    lists: `# Lists, Slicing & List Comprehension\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Filter even numbers and compute cube\ncubes_of_evens = [n**3 for n in numbers if n % 2 == 0]\n\nprint("Original list:", numbers)\nprint("Sub-slice [2:6]:", numbers[2:6])\nprint("Cubes of even numbers:", cubes_of_evens)`,

    dicts: `# Dictionaries & Frequency Counter\ntext = "python is simple python is elegant python is powerful"\nwords = text.split()\n\nfreq = {}\nfor word in words:\n    freq[word] = freq.get(word, 0) + 1\n\nprint("Word Frequencies:")\nfor word, count in freq.items():\n    print(f"  {word:10} -> {count} times")`,

    oop: `# Object-Oriented Programming (Bank Account Model)\nclass BankAccount:\n    def __init__(self, owner, balance=0.0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.balance += amount\n            print(f"Deposited \${amount:.2f}. New balance: \${self.balance:.2f}")\n\n    def withdraw(self, amount):\n        if 0 < amount <= self.balance:\n            self.balance -= amount\n            print(f"Withdrew \${amount:.2f}. Remaining balance: \${self.balance:.2f}")\n        else:\n            print("⚠️ Insufficient funds or invalid amount.")\n\nacc = BankAccount("Ada Lovelace", 150.0)\nprint(f"Account holder: {acc.owner}")\nacc.deposit(50.0)\nacc.withdraw(80.0)`,

    errors: `# Error & Exception Handling\ndef safe_convert_and_divide(numerator_str, denominator_str):\n    try:\n        num = float(numerator_str)\n        den = float(denominator_str)\n        res = num / den\n    except ValueError:\n        return "Error: Both arguments must be numeric strings!"\n    except ZeroDivisionError:\n        return "Error: Cannot divide by zero!"\n    else:\n        return f"Result: {res}"\n    finally:\n        print("[Operation ended]")\n\nprint(safe_convert_and_divide("100", "4"))\nprint(safe_convert_and_divide("50", "0"))\nprint(safe_convert_and_divide("abc", "2"))`,

    files: `# File Stream Operations (Simulated Environment)\nclass VirtualFile:\n    def __init__(self, name):\n        self.name = name\n        self.buffer = ""\n    def write(self, data):\n        self.buffer += data\n    def read(self):\n        return self.buffer\n\n# Using virtual context\nfile = VirtualFile("server_config.yaml")\nfile.write("host: localhost\\nport: 8080\\nenv: production")\n\nprint(f"File '{file.name}' created.")\nprint("Content:")\nprint(file.read())`,

    modules: `# Standard Modules Simulation\nimport math\n\nprint("--- Math Module Explorations ---")\nradius = 5\narea = math.pi * (radius ** 2)\nprint(f"Circle area with r={radius}: {area:.2f}")\nprint(f"Square root of 81: {math.sqrt(81)}")\nprint(f"Ceiling of 4.2: {math.ceil(4.2)}")\nprint(f"Floor of 4.8: {math.floor(4.8)}")`,

    fibonacci: `# Fibonacci Algorithm Benchmark\ndef fibonacci_sequence(n):\n    seq = [0, 1]\n    while len(seq) < n:\n        seq.append(seq[-1] + seq[-2])\n    return seq[:n]\n\nterms = 12\nfib = fibonacci_sequence(terms)\nprint(f"First {terms} Fibonacci numbers:")\nprint(fib)`
  };

  // Set default initial snippet
  if (codeEditor) {
    codeEditor.value = codeSnippets.hello;
  }

  // Update line numbers gutter
  function updateLineNumbers() {
    if (!codeEditor || !lineNumbers) return;
    const lines = codeEditor.value.split('\n').length;
    let numbersHtml = '';
    for (let i = 1; i <= lines; i++) {
      numbersHtml += `${i}<br>`;
    }
    lineNumbers.innerHTML = numbersHtml;
  }

  function updateLineCol() {
    if (!codeEditor || !lineColCounter) return;
    const pos = codeEditor.selectionStart;
    const textBefore = codeEditor.value.substring(0, pos);
    const line = textBefore.split('\n').length;
    const col = pos - textBefore.lastIndexOf('\n');
    lineColCounter.textContent = `Line ${line}, Col ${col}`;
  }

  if (codeEditor) {
    updateLineNumbers();
    updateLineCol();

    codeEditor.addEventListener('input', () => {
      updateLineNumbers();
      updateLineCol();
    });

    codeEditor.addEventListener('keyup', updateLineCol);
    codeEditor.addEventListener('click', updateLineCol);

    // Sync scroll between textarea and line gutter
    codeEditor.addEventListener('scroll', () => {
      lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Support Tab key indentation inside editor
    codeEditor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
        codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        updateLineNumbers();
      }

      // Keyboard Shortcut: Ctrl+Enter or Cmd+Enter to execute code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runPythonCode();
      }
    });
  }

  // Handle Preset Dropdown Selection
  if (snippetSelect) {
    snippetSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      if (codeSnippets[selected] && codeEditor) {
        codeEditor.value = codeSnippets[selected];
        updateLineNumbers();
        updateLineCol();
        showToast(`Loaded ${selected} example`, 'info');
      }
    });
  }

  // Clear Code Button
  if (clearCodeBtn) {
    clearCodeBtn.addEventListener('click', () => {
      if (codeEditor) {
        codeEditor.value = '';
        updateLineNumbers();
        updateLineCol();
        codeEditor.focus();
        showToast('Editor cleared', 'info');
      }
    });
  }

  // Copy Code Button
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', async () => {
      if (!codeEditor) return;
      try {
        await navigator.clipboard.writeText(codeEditor.value);
        copyBtnText.textContent = 'Copied!';
        showToast('Code copied to clipboard', 'success');
        setTimeout(() => {
          copyBtnText.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        showToast('Failed to copy code', 'danger');
      }
    });
  }

  // Clear Terminal Button
  if (clearTerminalBtn) {
    clearTerminalBtn.addEventListener('click', () => {
      if (terminalOutput) {
        terminalOutput.innerHTML = '<p class="term-dim"># Terminal cleared. Ready for execution.</p>';
      }
    });
  }

  // =========================================================================
  // 7. Python Execution Engine (Skulpt Interpreter + Resilient Fallback)
  // =========================================================================
  let isExecuting = false;

  async function runPythonCode() {
    if (isExecuting || !codeEditor) return;
    const pythonCode = codeEditor.value;

    if (!pythonCode.trim()) {
      showToast('Editor is empty. Write or select Python code to run.', 'warning');
      return;
    }

    setExecutionState('running');
    clearTerminal();

    const startTime = performance.now();

    // Check if Skulpt is available from CDN
    if (typeof Sk !== 'undefined') {
      executeWithSkulpt(pythonCode, startTime);
    } else {
      // Fallback engine if Skulpt failed to load or is offline
      executeWithFallbackEngine(pythonCode, startTime);
    }
  }

  function setExecutionState(state) {
    if (!executionStatus) return;
    executionStatus.className = `status-indicator ${state}`;
    if (state === 'running') {
      isExecuting = true;
      executionStatus.textContent = 'Running...';
      if (runCodeBtn) runCodeBtn.disabled = true;
    } else if (state === 'ready') {
      isExecuting = false;
      executionStatus.textContent = 'Idle';
      if (runCodeBtn) runCodeBtn.disabled = false;
    } else if (state === 'error') {
      isExecuting = false;
      executionStatus.textContent = 'Error';
      if (runCodeBtn) runCodeBtn.disabled = false;
    }
  }

  function clearTerminal() {
    if (terminalOutput) {
      terminalOutput.innerHTML = '';
    }
  }

  function appendTerminal(text, type = 'out') {
    if (!terminalOutput) return;
    const span = document.createElement('span');
    span.className = `term-${type}`;
    span.textContent = text;
    terminalOutput.appendChild(span);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function appendTerminalMeta(msg) {
    if (!terminalOutput) return;
    const div = document.createElement('div');
    div.className = 'term-meta';
    div.textContent = msg;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Execution via Skulpt Client-Side Compiler
  function executeWithSkulpt(prog, startTime) {
    Sk.pre = 'output';
    Sk.configure({
      output: function (text) {
        appendTerminal(text, 'out');
      },
      read: function (file) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][file] === undefined) {
          throw new Error(`File not found: '${file}'`);
        }
        return Sk.builtinFiles['files'][file];
      },
      inputfun: function (promptText) {
        return handleTerminalInput(promptText);
      },
      inputfunTakesPrompt: true,
      __future__: Sk.python3
    });

    const myPromise = Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody('<stdin>', false, prog, true);
    });

    myPromise.then(
      () => {
        const elapsed = (performance.now() - startTime).toFixed(1);
        appendTerminalMeta(`\n[Process completed in ${elapsed} ms with exit code 0]`);
        setExecutionState('ready');
      },
      (err) => {
        appendTerminal(`\nTraceback (most recent call last):\n${err.toString()}\n`, 'error');
        setExecutionState('error');
      }
    );
  }

  // Interactive input() promise handler for Skulpt
  function handleTerminalInput(promptText) {
    return new Promise((resolve) => {
      if (!terminalInputBar || !terminalInputField) {
        resolve('');
        return;
      }

      terminalInputPrompt.textContent = promptText || 'Input: ';
      terminalInputBar.classList.remove('hidden');
      terminalInputField.value = '';
      terminalInputField.focus();

      function submitHandler() {
        const val = terminalInputField.value;
        terminalInputBar.classList.add('hidden');
        appendTerminal(`${promptText || ''}${val}\n`, 'out');
        terminalInputSubmitBtn.removeEventListener('click', submitHandler);
        terminalInputField.removeEventListener('keydown', keyHandler);
        resolve(val);
      }

      function keyHandler(e) {
        if (e.key === 'Enter') {
          submitHandler();
        }
      }

      terminalInputSubmitBtn.addEventListener('click', submitHandler);
      terminalInputField.addEventListener('keydown', keyHandler);
    });
  }

  // High-fidelity fallback Python execution emulator (if CDN fails or offline)
  function executeWithFallbackEngine(code, startTime) {
    try {
      appendTerminal('# [Running on Built-in Client Python Simulator]\n', 'dim');
      const lines = code.split('\n');
      const vars = {};
      
      lines.forEach(rawLine => {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) return;

        // Simulate basic print(...)
        const printMatch = line.match(/^print\((.*)\)$/);
        if (printMatch) {
          let inner = printMatch[1];
          // Handle f-string simulation or basic strings
          if (inner.startsWith('f"') || inner.startsWith("f'")) {
            inner = inner.slice(2, -1).replace(/\{([^}]+)\}/g, (_, expr) => {
              try { return evalSimulatedExpr(expr.trim(), vars); } catch (e) { return `{${expr}}`; }
            });
            appendTerminal(inner + '\n', 'out');
          } else if (inner.startsWith('"') || inner.startsWith("'")) {
            appendTerminal(inner.slice(1, -1) + '\n', 'out');
          } else {
            const evaluated = evalSimulatedExpr(inner, vars);
            appendTerminal(String(evaluated) + '\n', 'out');
          }
          return;
        }

        // Simulate basic variable assignment (e.g. x = 10)
        const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.*)$/);
        if (assignMatch) {
          const varName = assignMatch[1];
          const valExpr = assignMatch[2];
          vars[varName] = evalSimulatedExpr(valExpr, vars);
          return;
        }
      });

      const elapsed = (performance.now() - startTime).toFixed(1);
      appendTerminalMeta(`\n[Process completed in ${elapsed} ms with exit code 0]`);
      setExecutionState('ready');
    } catch (err) {
      appendTerminal(`Traceback Error: ${err.message}\n`, 'error');
      setExecutionState('error');
    }
  }

  function evalSimulatedExpr(expr, scope) {
    if (expr in scope) return scope[expr];
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;
    if (!isNaN(expr)) return Number(expr);
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    return expr;
  }

  if (runCodeBtn) {
    runCodeBtn.addEventListener('click', runPythonCode);
  }

  // =========================================================================
  // 8. Quizzes & Live Challenges Engine
  // =========================================================================
  const quizData = [
    {
      id: 'q1',
      tier: 'beginner',
      topic: 'Variables & Types',
      question: 'What is the output and data type of `type(3.14)` in Python?',
      code: 'result = type(3.14)\nprint(result)',
      options: [
        '<class \'int\'>',
        '<class \'float\'>',
        '<class \'decimal\'>',
        '<class \'number\'>'
      ],
      correctIndex: 1,
      explanation: 'In Python, any numeric literal containing a decimal point is represented by the native `<class \'float\'>` IEEE-754 double-precision type.'
    },
    {
      id: 'q2',
      tier: 'beginner',
      topic: 'Operators',
      question: 'What does the `//` operator perform in Python?',
      code: 'print(17 // 4)',
      options: [
        'Floating-point division returning 4.25',
        'Modulo operation returning remainder 1',
        'Floor division returning largest integer <= division (4)',
        'Bitwise left shift'
      ],
      correctIndex: 2,
      explanation: 'The `//` operator performs floor division, discarding the fractional part and rounding down to the nearest integer.'
    },
    {
      id: 'q3',
      tier: 'beginner',
      topic: 'Loops & Range',
      question: 'What values will `range(1, 6, 2)` generate in an iteration loop?',
      code: 'for n in range(1, 6, 2):\n    print(n, end=" ")',
      options: [
        '1, 2, 3, 4, 5',
        '1, 3, 5',
        '1, 3, 5, 7',
        '2, 4, 6'
      ],
      correctIndex: 1,
      explanation: '`range(start, stop, step)` starts at 1, steps by +2 each iteration, and stops before reaching 6. So it yields 1, 3, and 5.'
    },
    {
      id: 'q4',
      tier: 'intermediate',
      topic: 'Lists & Slicing',
      question: 'What is the output of the negative step slice `letters[::-1]`?',
      code: 'letters = ["a", "b", "c", "d"]\nprint(letters[::-1])',
      options: [
        '[\'d\', \'c\', \'b\', \'a\']',
        '[\'a\', \'b\', \'c\', \'d\']',
        '[\'d\']',
        'IndexError: step cannot be negative'
      ],
      correctIndex: 0,
      explanation: 'Specifying a step of `-1` without start and stop bounds reverses the sequence completely in an efficient, idiomatic way.'
    },
    {
      id: 'q5',
      tier: 'intermediate',
      topic: 'Dictionaries',
      question: 'Which method safely retrieves a value from a dictionary without raising a KeyError?',
      code: 'user = {"role": "Admin"}\n# Which call is safe for "email"?',
      options: [
        'user["email"]',
        'user.fetch("email", None)',
        'user.get("email", "Not Set")',
        'user.find("email")'
      ],
      correctIndex: 2,
      explanation: 'The `.get(key, default)` method returns the default value (or `None`) if the key is not present, avoiding an unhandled `KeyError`.'
    },
    {
      id: 'q6',
      tier: 'intermediate',
      topic: 'OOP & self',
      question: 'Why is `self` explicitly included as the first parameter in Python instance methods?',
      code: 'class Car:\n    def drive(self):\n        pass',
      options: [
        '`self` is a required keyword enforced by the compiler',
        'It points to the specific object instance that called the method',
        'It represents the global class variable scope',
        'It binds the method to the parent superclass'
      ],
      correctIndex: 1,
      explanation: 'By convention, `self` represents the instance of the class and allows access to its unique attributes and methods.'
    },
    {
      id: 'q7',
      tier: 'advanced',
      topic: 'Exception Handling',
      question: 'When does the `else` clause in a `try...except...else` block execute?',
      code: 'try:\n    perform_action()\nexcept Exception:\n    handle_error()\nelse:\n    execute_this()',
      options: [
        'Only if an exception is caught and resolved',
        'Always, right before the program terminates',
        'Only if NO exception was raised in the try block',
        'Whenever the finally block is absent'
      ],
      correctIndex: 2,
      explanation: 'The `else` clause in exception handling runs strictly when the code inside the `try` block executes successfully without raising errors.'
    },
    {
      id: 'q8',
      tier: 'advanced',
      topic: 'Context Managers',
      question: 'What is the primary advantage of using the `with` statement when opening files?',
      code: 'with open("log.txt", "r") as file:\n    data = file.read()',
      options: [
        'It automatically executes file operations in parallel threads',
        'It guarantees the file will be closed automatically even if exceptions occur',
        'It encrypts file contents during read/write cycles',
        'It enables global file caching across modules'
      ],
      correctIndex: 1,
      explanation: 'The `with` statement leverages context managers (`__enter__` and `__exit__`), guaranteeing resource deallocation and file closing upon block exit.'
    }
  ];

  // Live Score State
  let quizScore = 0;
  let quizAnsweredCount = 0;
  let quizStreak = 0;

  const quizGrid = document.getElementById('quizGrid');
  const quizScoreText = document.getElementById('quizScoreText');
  const quizAccuracyText = document.getElementById('quizAccuracyText');
  const quizStreakText = document.getElementById('quizStreakText');
  const resetQuizBtn = document.getElementById('resetQuizBtn');
  const quizFilterPills = document.querySelectorAll('.filter-pill');
  const loadChallengeBtn = document.getElementById('loadChallengeBtn');

  function renderQuizzes(tierFilter = 'all') {
    if (!quizGrid) return;
    quizGrid.innerHTML = '';

    const filtered = tierFilter === 'all'
      ? quizData
      : quizData.filter(q => q.tier === tierFilter);

    filtered.forEach(q => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.setAttribute('data-quiz-id', q.id);

      const letters = ['A', 'B', 'C', 'D'];
      const optionsHtml = q.options.map((opt, idx) => `
        <button class="quiz-option-btn" data-opt-index="${idx}">
          <span class="quiz-option-letter">${letters[idx]}</span>
          <span class="quiz-option-text">${escapeHTML(opt)}</span>
        </button>
      `).join('');

      card.innerHTML = `
        <div class="quiz-card-header">
          <span class="quiz-topic-badge">${q.topic}</span>
          <span class="lesson-tier-tag tier-tag-${q.tier}">${q.tier}</span>
        </div>
        <div class="quiz-question">${escapeHTML(q.question)}</div>
        ${q.code ? `<pre class="quiz-code-block"><code>${formatSyntaxHighlighting(q.code)}</code></pre>` : ''}
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class="quiz-explanation" id="exp-${q.id}">
          <strong>💡 Rationale:</strong> ${escapeHTML(q.explanation)}
        </div>
      `;

      quizGrid.appendChild(card);
    });

    attachQuizOptionEvents();
  }

  function attachQuizOptionEvents() {
    document.querySelectorAll('.quiz-card').forEach(card => {
      const quizId = card.getAttribute('data-quiz-id');
      const question = quizData.find(q => q.id === quizId);
      const optionButtons = card.querySelectorAll('.quiz-option-btn');
      const expBox = card.querySelector('.quiz-explanation');

      optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.getAttribute('data-opt-index'), 10);
          const isCorrect = selectedIdx === question.correctIndex;

          // Disable further clicks on this card
          optionButtons.forEach(b => {
            b.disabled = true;
            b.style.pointerEvents = 'none';
          });

          // Visual states
          if (isCorrect) {
            btn.classList.add('correct');
            quizScore++;
            quizStreak++;
            showToast('Correct answer! +1 point', 'success');
          } else {
            btn.classList.add('wrong');
            // Reveal the correct one
            optionButtons[question.correctIndex].classList.add('correct');
            quizStreak = 0;
            showToast('Incorrect answer. Check explanation.', 'danger');
          }

          quizAnsweredCount++;
          updateQuizDashboard();

          // Reveal explanation
          if (expBox) {
            expBox.classList.add('visible');
          }
        });
      });
    });
  }

  function updateQuizDashboard() {
    if (quizScoreText) {
      quizScoreText.textContent = `${quizScore} / ${quizAnsweredCount}`;
    }
    if (quizAccuracyText) {
      const acc = quizAnsweredCount > 0 ? Math.round((quizScore / quizAnsweredCount) * 100) : 0;
      quizAccuracyText.textContent = `${acc}%`;
    }
    if (quizStreakText) {
      quizStreakText.textContent = `🔥 ${quizStreak}`;
    }
  }

  function resetQuiz() {
    quizScore = 0;
    quizAnsweredCount = 0;
    quizStreak = 0;
    updateQuizDashboard();
    renderQuizzes(getActiveQuizFilter());
    showToast('Quiz scores and progress reset', 'info');
  }

  function getActiveQuizFilter() {
    const activePill = document.querySelector('.filter-pill.active');
    return activePill ? activePill.getAttribute('data-quiz-tier') : 'all';
  }

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', resetQuiz);
  }

  quizFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      quizFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tier = pill.getAttribute('data-quiz-tier');
      renderQuizzes(tier);
    });
  });

  renderQuizzes('all');

  // Mini Challenge "Solve in Playground" button
  if (loadChallengeBtn) {
    loadChallengeBtn.addEventListener('click', () => {
      const challengeCode = `# Coding Challenge: Reverse Words in a String\n# Given a sentence, reverse the word order.\n\nsentence = "Python is amazingly fun"\n\n# Your logic here:\nwords = sentence.split()\nreversed_words = words[::-1]\nresult = " ".join(reversed_words)\n\nprint("Original:", sentence)\nprint("Reversed:", result)\n\n# Verification check\nexpected = "fun amazingly is Python"\nassert result == expected, "Challenge failed!"\nprint("🎉 Challenge Solved Successfully!")`;
      if (codeEditor) {
        codeEditor.value = challengeCode;
        updateLineNumbers();
        document.getElementById('playground').scrollIntoView({ behavior: 'smooth' });
        showToast('Challenge loaded into Playground', 'info');
      }
    });
  }

  // =========================================================================
  // 9. Toast Notification System
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  // =========================================================================
  // 10. Syntax Highlighting Tokenizer for Code Previews
  // =========================================================================
  function formatSyntaxHighlighting(code) {
    const escaped = escapeHTML(code);
    
    return escaped
      // Comments
      .replace(/(#.*$)/gm, '<span class="token-comment">$1</span>')
      // Strings (double or single quotes)
      .replace(/(".*?"|'.*?'|f".*?"|f'.*?)/g, '<span class="token-string">$1</span>')
      // Keywords
      .replace(/\b(def|return|if|elif|else|for|while|in|class|import|from|as|try|except|finally|raise|with|lambda|and|or|not|is|assert|pass|break|continue)\b/g, '<span class="token-keyword">$1</span>')
      // Built-in functions / values
      .replace(/\b(print|type|len|range|sum|min|max|round|open|super|int|float|str|bool|list|dict|set|True|False|None)\b/g, '<span class="token-builtin">$1</span>')
      // Numbers
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>');
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial welcome toast
  setTimeout(() => {
    showToast('Welcome to PythonCraft! Ready to code?', 'info');
  }, 1000);
});
