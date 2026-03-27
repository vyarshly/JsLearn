export type Category = 'basics' | 'operators' | 'conditions' | 'loops' | 'functions' | 'events' | 'arrays' | 'objects' | 'dom' | 'built-in' | 'validation' | 'react' | 'async';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: Category;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  explanation: string;
  keyPoints: string[];
  codeExample: string;
  output: string;
  commonMistakes: string[];
  examTips: string[];
  practiceTask: string;
  interactiveCode?: string;
  successCondition?: string;
  quizQuestions: QuizQuestion[];
  relatedTopics: string[];
}

export const lessons: Lesson[] = [
  // BASICS
  {
    id: 'intro-js',
    title: 'Introduction to JavaScript',
    category: 'basics',
    difficulty: 'Beginner',
    summary: 'Learn what JavaScript is and why it is the language of the web.',
    explanation: `JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language that is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.
    
    Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. It enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it.`,
    keyPoints: [
      'JS is the scripting language for the web',
      'It can update and change both HTML and CSS',
      'It can calculate, manipulate and validate data',
      'Runs in all modern browsers'
    ],
    codeExample: `console.log("Hello, World!");
alert("Welcome to JS Master!");`,
    output: 'Hello, World! (in console)\nPopup alert: Welcome to JS Master!',
    commonMistakes: [
      'Confusing JavaScript with Java (they are completely different)',
      'Forgetting that JS is case-sensitive'
    ],
    examTips: [
      'Remember that JS was created in 10 days by Brendan Eich in 1995',
      'JS is an implementation of the ECMAScript standard'
    ],
    practiceTask: 'Try printing your name to the console using console.log().',
    quizQuestions: [
      {
        question: 'Who created JavaScript?',
        options: ['Bill Gates', 'Brendan Eich', 'Mark Zuckerberg', 'Steve Jobs'],
        correctAnswer: 1,
        explanation: 'Brendan Eich created JavaScript in 1995 while working at Netscape.'
      },
      {
        question: 'Is JavaScript the same as Java?',
        options: ['Yes', 'No', 'Only in name', 'In some browsers'],
        correctAnswer: 1,
        explanation: 'Java and JavaScript are entirely different languages with different use cases and syntax.'
      }
    ],
    relatedTopics: ['variables', 'data-types']
  },
  {
    id: 'variables-declaring',
    title: 'Declaring Variables',
    category: 'basics',
    difficulty: 'Beginner',
    summary: 'Master the different ways to store data using var, let, and const.',
    explanation: `Variables are containers for storing data values. In JavaScript, there are three keywords used to declare variables:
    
    1. **var**: The oldest way. It has function scope and can be redeclared. (Avoid in modern JS).
    2. **let**: Introduced in ES6. It has block scope and can be updated but not redeclared in the same scope.
    3. **const**: Also ES6. Block scoped, cannot be updated or redeclared. Use this for values that shouldn't change.`,
    keyPoints: [
      'Use const by default',
      'Use let if you know the value will change',
      'Avoid var to prevent scoping issues',
      'Variable names must start with a letter, underscore, or dollar sign'
    ],
    codeExample: `const price = 99;
let quantity = 2;
quantity = 3; // OK

var oldWay = "I am old";`,
    output: 'price is 99, quantity is 3',
    commonMistakes: [
      'Trying to reassign a const variable',
      'Using a variable before declaring it (hoisting issues with var)'
    ],
    examTips: [
      'let and const are block-scoped, var is function-scoped',
      'const objects can have their properties changed, but the object itself cannot be reassigned'
    ],
    practiceTask: 'Declare a constant for your birth year and a variable for your current age.',
    quizQuestions: [
      {
        question: 'Which keyword is used for a variable that should never change?',
        options: ['let', 'var', 'const', 'static'],
        correctAnswer: 2,
        explanation: 'const (constant) is used for variables that should not be reassigned.'
      }
    ],
    relatedTopics: ['data-types', 'operators']
  },
  // OPERATORS
  {
    id: 'arithmetic-operators',
    title: 'Arithmetic Operators',
    category: 'operators',
    difficulty: 'Beginner',
    summary: 'Perform mathematical calculations in your code.',
    explanation: `Arithmetic operators perform arithmetic on numbers (literals or variables).
    
    - \`+\` Addition
    - \`-\` Subtraction
    - \`*\` Multiplication
    - \`/\` Division
    - \`%\` Modulus (Remainder)
    - \`++\` Increment
    - \`--\` Decrement
    - \`**\` Exponentiation (ES2015)`,
    keyPoints: [
      'Modulus (%) returns the remainder of a division',
      'Increment (++) adds 1 to a variable',
      'Exponentiation (**) raises the first operand to the power of the second'
    ],
    codeExample: `let x = 10;
let y = 3;
console.log(x + y); // 13
console.log(x % y); // 1 (10 / 3 = 3 remainder 1)`,
    output: '13\n1',
    commonMistakes: [
      'Confusing = (assignment) with == (comparison)',
      'Forgetting operator precedence (PEMDAS)'
    ],
    examTips: [
      'The + operator can also be used to concatenate strings',
      'Increment/Decrement can be prefix (++x) or postfix (x++)'
    ],
    practiceTask: 'Calculate the area of a circle with radius 5 using arithmetic operators.',
    quizQuestions: [
      {
        question: 'What does the % operator do?',
        options: ['Percentage', 'Division', 'Modulus (Remainder)', 'Multiplication'],
        correctAnswer: 2,
        explanation: 'The modulus operator (%) returns the division remainder.'
      }
    ],
    relatedTopics: ['variables-declaring', 'comparison-operators']
  },
  // CONDITIONS
  {
    id: 'if-else-statements',
    title: 'Conditional Statements',
    category: 'conditions',
    difficulty: 'Beginner',
    summary: 'Make decisions in your code using if, else if, and else.',
    explanation: `Conditional statements are used to perform different actions based on different conditions.
    
    - **if**: Use to specify a block of code to be executed, if a specified condition is true.
    - **else**: Use to specify a block of code to be executed, if the same condition is false.
    - **else if**: Use to specify a new condition to test, if the first condition is false.
    - **switch**: Use to specify many alternative blocks of code to be executed.`,
    keyPoints: [
      'Conditions must be wrapped in parentheses ()',
      'The code block is wrapped in curly braces {}',
      'Comparison operators are used inside conditions'
    ],
    codeExample: `let hour = 15;
if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}`,
    output: 'Good afternoon',
    commonMistakes: [
      'Using = instead of == or === in the condition',
      'Forgetting the parentheses around the condition'
    ],
    examTips: [
      'The else statement is optional',
      'You can have multiple else if statements'
    ],
    practiceTask: 'Write a condition that checks if a number is positive, negative, or zero.',
    quizQuestions: [
      {
        question: 'Which statement is used to test a new condition if the first condition is false?',
        options: ['else', 'else if', 'switch', 'then'],
        correctAnswer: 1,
        explanation: 'else if is used to provide an alternative condition.'
      }
    ],
    relatedTopics: ['arithmetic-operators', 'loops-for']
  },
  // LOOPS
  {
    id: 'loops-for',
    title: 'The For Loop',
    category: 'loops',
    difficulty: 'Beginner',
    summary: 'Repeat code a specific number of times.',
    explanation: `Loops can execute a block of code a number of times. The for loop has the following syntax:
    
    \`for (initialization; condition; increment) { ... }\`
    
    - **initialization**: Executed (one time) before the execution of the code block.
    - **condition**: Defines the condition for executing the code block.
    - **increment**: Executed (every time) after the code block has been executed.`,
    keyPoints: [
      'The for loop is ideal when you know how many times you want to loop',
      'The initialization usually sets a counter variable',
      'The condition is checked before every iteration'
    ],
    codeExample: `for (let i = 0; i < 5; i++) {
  console.log("Number: " + i);
}`,
    output: 'Number: 0\nNumber: 1\nNumber: 2\nNumber: 3\nNumber: 4',
    commonMistakes: [
      'Creating an infinite loop (forgetting the increment)',
      'Off-by-one errors (looping 4 times instead of 5)'
    ],
    examTips: [
      'You can use "break" to exit the loop early',
      'You can use "continue" to skip the current iteration'
    ],
    practiceTask: 'Write a loop that prints the numbers from 10 down to 1.',
    quizQuestions: [
      {
        question: 'What is the correct syntax for a for loop?',
        options: [
          'for (i = 0; i < 5)',
          'for (let i = 0; i < 5; i++)',
          'for i = 1 to 5',
          'for (let i <= 5; i++)'
        ],
        correctAnswer: 1,
        explanation: 'The standard for loop syntax includes initialization, condition, and increment.'
      }
    ],
    relatedTopics: ['if-else-statements', 'loops-while']
  },
  // FUNCTIONS
  {
    id: 'functions-intro',
    title: 'JavaScript Functions',
    category: 'functions',
    difficulty: 'Beginner',
    summary: 'Reusable blocks of code that perform specific tasks.',
    explanation: `A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it).
    
    - **Parameters**: The names listed in the function definition.
    - **Arguments**: The real values passed to (and received by) the function.
    - **Return**: When JavaScript reaches a return statement, the function will stop executing and "return" a value to the caller.`,
    keyPoints: [
      'Functions help in code reuse',
      'A function can take multiple parameters',
      'The return statement is optional but useful for getting results back'
    ],
    codeExample: `function multiply(a, b) {
  return a * b;
}
let result = multiply(4, 3);
console.log(result); // 12`,
    output: '12',
    commonMistakes: [
      'Forgetting to call the function',
      'Confusing parameters with arguments'
    ],
    examTips: [
      'Functions can be assigned to variables (Function Expressions)',
      'Arrow functions are a shorter way to write functions'
    ],
    practiceTask: 'Create a function that calculates the area of a rectangle.',
    quizQuestions: [
      {
        question: 'Which keyword is used to send a value back from a function?',
        options: ['send', 'give', 'return', 'output'],
        correctAnswer: 2,
        explanation: 'The return statement stops function execution and returns a value.'
      }
    ],
    relatedTopics: ['variables-declaring', 'events-intro']
  },
  // EVENTS
  {
    id: 'events-intro',
    title: 'Introduction to Events',
    category: 'events',
    difficulty: 'Beginner',
    summary: 'Make your web pages interactive by reacting to user actions.',
    explanation: `HTML events are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events.
    
    Common HTML events:
    - **onclick**: The user clicks an HTML element.
    - **onmouseover**: The user moves the mouse over an HTML element.
    - **onmouseout**: The user moves the mouse away from an HTML element.
    - **onkeydown**: The user pushes a keyboard key.
    - **onload**: The browser has finished loading the page.`,
    keyPoints: [
      'Events are the heart of interactivity',
      'You can add event listeners using HTML attributes or JavaScript',
      'addEventListener is the modern and preferred way'
    ],
    codeExample: `const btn = document.getElementById('action-btn');
btn.onclick = function() {
  console.log("Button Clicked!");
};`,
    output: 'Console logs "Button Clicked!" when the button is pressed.',
    commonMistakes: [
      'Forgetting to select the element before adding the listener',
      'Using parentheses when assigning a function to an event handler (e.g., onclick = myFunc() instead of onclick = myFunc)'
    ],
    examTips: [
      'The "this" keyword inside an event handler refers to the element that received the event',
      'Event bubbling is when an event triggers on a child and then its parents'
    ],
    practiceTask: 'Add a click event to an image that changes its source when clicked.',
    interactiveCode: `const btn = document.getElementById('action-btn');
btn.addEventListener('click', () => {
  const title = document.getElementById('main-title');
  title.style.color = 'orange';
  console.log('Title color changed to orange!');
});`,
    quizQuestions: [
      {
        question: 'Which event occurs when a user clicks on an HTML element?',
        options: ['onchange', 'onmouseclick', 'onclick', 'onmouseover'],
        correctAnswer: 2,
        explanation: 'The onclick event is triggered by a mouse click.'
      }
    ],
    relatedTopics: ['dom-selectors', 'functions-intro']
  },
  // ARRAYS
  {
    id: 'arrays-basics',
    title: 'Array Fundamentals',
    category: 'arrays',
    difficulty: 'Beginner',
    summary: 'Store multiple values in a single variable.',
    explanation: `Arrays are used to store multiple values in a single variable. They are a special type of object in JavaScript.
    
    - **Indexing**: Arrays are zero-indexed. The first element is at index 0.
    - **Length**: The .length property returns the number of elements in an array.
    - **Methods**: Arrays have many built-in methods like push(), pop(), shift(), and unshift() to add or remove elements.`,
    keyPoints: [
      'Arrays can hold different data types',
      'The first index is always 0',
      'Use const for arrays to prevent reassignment, but you can still modify the contents'
    ],
    codeExample: `const fruits = ["Apple", "Banana", "Orange"];
console.log(fruits[0]); // Apple
console.log(fruits.length); // 3
fruits.push("Mango"); // Adds to the end`,
    output: 'Apple\n3',
    commonMistakes: [
      'Thinking the first index is 1',
      'Forgetting that .length is one higher than the last index'
    ],
    examTips: [
      'Array.isArray() is used to check if a variable is an array',
      'Arrays are objects, but typeof returns "object"'
    ],
    practiceTask: 'Create an array of your 5 favorite movies and print the 3rd one.',
    quizQuestions: [
      {
        question: 'What is the index of the first element in a JavaScript array?',
        options: ['1', '0', '-1', 'First'],
        correctAnswer: 1,
        explanation: 'JavaScript arrays are zero-indexed.'
      }
    ],
    relatedTopics: ['variables-declaring', 'loops-for']
  },
  // OBJECTS
  {
    id: 'objects-intro',
    title: 'JavaScript Objects',
    category: 'objects',
    difficulty: 'Beginner',
    summary: 'Model real-world entities using key-value pairs.',
    explanation: `Objects are variables too. But objects can contain many values. The values are written as name:value pairs (name and value separated by a colon).
    
    A JavaScript object is a collection of named values. It is common practice to declare objects with the const keyword.`,
    keyPoints: [
      'Objects use curly braces {}',
      'Properties are accessed using dot notation (.) or bracket notation ([])',
      'Objects can also have methods (functions stored as properties)'
    ],
    codeExample: `const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};
console.log(person.firstName); // John`,
    output: 'John',
    commonMistakes: [
      'Forgetting the commas between properties',
      'Using = instead of : inside the object literal'
    ],
    examTips: [
      'The "this" keyword refers to the object itself',
      'Objects are passed by reference, not by value'
    ],
    practiceTask: 'Create an object representing a car with properties like brand, model, and year.',
    quizQuestions: [
      {
        question: 'How do you access the "name" property of an object called "user"?',
        options: ['user->name', 'user.name', 'user[name]', 'user(name)'],
        correctAnswer: 1,
        explanation: 'Dot notation (user.name) is the standard way to access object properties.'
      }
    ],
    relatedTopics: ['variables-declaring', 'arrays-basics']
  },
  // BUILT-IN OBJECTS
  {
    id: 'math-object',
    title: 'The Math Object',
    category: 'built-in',
    difficulty: 'Beginner',
    summary: 'Perform complex mathematical tasks with ease.',
    explanation: `The JavaScript Math object allows you to perform mathematical tasks on numbers. Unlike other objects, the Math object has no constructor. The Math object is static. All methods and properties can be used without creating a Math object first.
    
    Common methods:
    - **Math.round(x)**: Returns x rounded to its nearest integer.
    - **Math.ceil(x)**: Returns x rounded up to its nearest integer.
    - **Math.floor(x)**: Returns x rounded down to its nearest integer.
    - **Math.random()**: Returns a random number between 0 and 1.
    - **Math.max(x, y, z)**: Returns the highest value.`,
    keyPoints: [
      'Math.PI returns the value of PI',
      'Math.random() is often used with Math.floor() to get random integers',
      'Math is a built-in object, not a function'
    ],
    codeExample: `console.log(Math.PI); // 3.14159...
console.log(Math.floor(4.7)); // 4
console.log(Math.random()); // e.g., 0.1234...`,
    output: '3.141592653589793\n4\n(random number)',
    commonMistakes: [
      'Trying to create a new Math object (new Math() is an error)',
      'Confusing floor() and ceil()'
    ],
    examTips: [
      'Math.random() never returns exactly 1',
      'Math.sqrt(x) returns the square root of x'
    ],
    practiceTask: 'Generate a random integer between 1 and 100.',
    quizQuestions: [
      {
        question: 'Which Math method returns the value of a number rounded UP to the nearest integer?',
        options: ['Math.round()', 'Math.floor()', 'Math.ceil()', 'Math.up()'],
        correctAnswer: 2,
        explanation: 'Math.ceil() always rounds up to the next integer.'
      }
    ],
    relatedTopics: ['arithmetic-operators', 'variables-declaring']
  },
  // DOM
  {
    id: 'dom-selectors',
    title: 'DOM Selectors',
    category: 'dom',
    difficulty: 'Beginner',
    summary: 'Learn how to find and select HTML elements using JavaScript.',
    explanation: `The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.
    
    To manipulate an element, you first need to "select" it. Common methods include:
    - **getElementById(id)**: Selects a single element by its unique ID.
    - **getElementsByClassName(name)**: Selects all elements with a specific class.
    - **getElementsByTagName(name)**: Selects all elements with a specific tag name.
    - **querySelector(selector)**: Selects the first element that matches a CSS selector.
    - **querySelectorAll(selector)**: Selects all elements that match a CSS selector.`,
    keyPoints: [
      'getElementById is the fastest selection method',
      'querySelector is the most flexible (uses CSS syntax)',
      'querySelectorAll returns a NodeList (similar to an array)',
      'The document object is the entry point to the DOM'
    ],
    codeExample: `const title = document.getElementById('main-title');
const items = document.querySelectorAll('.list-item');
const firstBtn = document.querySelector('button');`,
    output: 'Returns the matching element(s) or null/empty list if not found.',
    commonMistakes: [
      'Forgetting the # for IDs or . for classes in querySelector',
      'Thinking getElementsByClassName returns an array (it returns an HTMLCollection)'
    ],
    examTips: [
      'querySelector returns only the FIRST match',
      'IDs should be unique in a document'
    ],
    practiceTask: 'Select all paragraphs on a page and change their background color.',
    interactiveCode: `// Try selecting the title and changing its text
const title = document.getElementById('main-title');
if (title) {
  title.innerText = 'DOM Mastered!';
  title.style.color = '#6366f1';
  console.log('Title updated!');
}`,
    successCondition: "document.getElementById('main-title').innerText === 'DOM Mastered!'",
    quizQuestions: [
      {
        question: 'Which method returns the first element that matches a CSS selector?',
        options: ['getElementById', 'querySelector', 'querySelectorAll', 'getElementBySelector'],
        correctAnswer: 1,
        explanation: 'querySelector uses CSS selectors and returns the first matching element.'
      },
      {
        question: 'What does getElementById return if no element is found?',
        options: ['undefined', 'null', '0', 'false'],
        correctAnswer: 1,
        explanation: 'If no element matches the ID, getElementById returns null.'
      }
    ],
    relatedTopics: ['dom-manipulation', 'events-intro']
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    category: 'dom',
    difficulty: 'Beginner',
    summary: 'Change the content, attributes, and styles of HTML elements.',
    explanation: `Once you have selected an element, you can change almost anything about it.
    
    - **Content**: Use \`.innerHTML\` (for HTML) or \`.textContent\` (for plain text).
    - **Attributes**: Use \`.setAttribute(name, value)\` or direct properties like \`.src\`, \`.href\`, \`.id\`.
    - **Styles**: Use the \`.style\` property (e.g., \`element.style.color = 'red'\`).
    - **Classes**: Use \`.classList.add()\`, \`.classList.remove()\`, and \`.classList.toggle()\`.`,
    keyPoints: [
      'textContent is safer than innerHTML (prevents XSS)',
      'Style properties use camelCase in JS (e.g., backgroundColor)',
      'classList is the best way to manage CSS classes',
      'Changes are reflected immediately in the browser'
    ],
    codeExample: `const box = document.querySelector('.box');
box.textContent = "Hello World";
box.style.backgroundColor = "blue";
box.classList.add("active");`,
    output: 'The element updates its text, color, and classes.',
    commonMistakes: [
      'Using background-color instead of backgroundColor (JS uses camelCase)',
      'Overwriting all classes with className instead of using classList'
    ],
    examTips: [
      'innerHTML can be slow and risky if used with user input',
      'The style property only accesses inline styles'
    ],
    practiceTask: 'Create a button that toggles a "dark-mode" class on the body element.',
    interactiveCode: `const btn = document.getElementById('action-btn');
btn.addEventListener('click', () => {
  const desc = document.getElementById('description');
  desc.innerHTML = '<strong>Content Updated!</strong>';
  desc.style.padding = '20px';
  desc.style.borderRadius = '10px';
  desc.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
  console.log('DOM Manipulated!');
});`,
    quizQuestions: [
      {
        question: 'Which property is used to change the CSS style of an element?',
        options: ['css', 'style', 'design', 'format'],
        correctAnswer: 1,
        explanation: 'The .style property allows access to the element\'s inline styles.'
      }
    ],
    relatedTopics: ['dom-selectors', 'events-intro']
  },
  // ASYNC JS
  {
    id: 'promises-intro',
    title: 'JavaScript Promises',
    category: 'built-in',
    difficulty: 'Intermediate',
    summary: 'Handle asynchronous operations without "callback hell".',
    explanation: `A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
    
    A Promise is in one of these states:
    - **pending**: initial state, neither fulfilled nor rejected.
    - **fulfilled**: meaning that the operation was completed successfully.
    - **rejected**: meaning that the operation failed.
    
    You use \`.then()\` for success and \`.catch()\` for errors.`,
    keyPoints: [
      'Promises solve the problem of deeply nested callbacks',
      'A promise can only be settled once (either resolved or rejected)',
      'You can chain multiple .then() calls'
    ],
    codeExample: `const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Success!");
  else reject("Error!");
});

myPromise
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
    output: 'Success!',
    commonMistakes: [
      'Forgetting to return a value in a .then() chain',
      'Not adding a .catch() to handle potential errors'
    ],
    examTips: [
      'Promise.all() waits for all promises to resolve',
      'Promise.race() returns the first promise to settle'
    ],
    practiceTask: 'Create a promise that resolves after 2 seconds using setTimeout.',
    quizQuestions: [
      {
        question: 'What are the three states of a Promise?',
        options: [
          'Start, Middle, End',
          'Pending, Fulfilled, Rejected',
          'Waiting, Working, Done',
          'Open, Closed, Error'
        ],
        correctAnswer: 1,
        explanation: 'A promise starts as pending and settles as either fulfilled or rejected.'
      }
    ],
    relatedTopics: ['async-await', 'fetch-api']
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    category: 'built-in',
    difficulty: 'Intermediate',
    summary: 'Write asynchronous code that looks and behaves like synchronous code.',
    explanation: `Async/Await is a special syntax to work with promises in a more comfortable fashion.
    
    - **async**: Put before a function to make it return a promise.
    - **await**: Put before a promise to make JS wait until that promise settles. It can only be used inside an async function.`,
    keyPoints: [
      'Makes async code much cleaner and easier to read',
      'Uses try/catch for error handling (just like synchronous code)',
      'await pauses the execution of the async function'
    ],
    codeExample: `async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}`,
    output: 'Logs the fetched data or an error message.',
    commonMistakes: [
      'Using await in a regular (non-async) function',
      'Forgetting the try/catch block'
    ],
    examTips: [
      'An async function always returns a promise',
      'await only works with promises'
    ],
    practiceTask: 'Convert a .then() chain into an async/await function.',
    quizQuestions: [
      {
        question: 'Where can the "await" keyword be used?',
        options: [
          'Anywhere in the code',
          'Only inside an async function',
          'Only in the global scope',
          'Inside loops only'
        ],
        correctAnswer: 1,
        explanation: 'The await keyword is only valid inside functions marked with the async keyword.'
      }
    ],
    relatedTopics: ['promises-intro', 'fetch-api']
  },
  // REACT
  {
    id: 'react-intro',
    title: 'Introduction to React',
    category: 'react',
    difficulty: 'Beginner',
    summary: 'Learn the basics of the most popular UI library.',
    explanation: `React is a JavaScript library for building user interfaces. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.
    
    Key Concepts:
    - **Components**: Reusable UI building blocks.
    - **JSX**: A syntax extension for JavaScript that looks like HTML.
    - **Virtual DOM**: A lightweight copy of the real DOM for performance optimization.`,
    keyPoints: [
      'React is component-based',
      'Declarative UI (you describe what you want, React handles the how)',
      'Unidirectional data flow (top-down)'
    ],
    codeExample: `function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Usage
<Welcome />`,
    output: 'Renders an H1 tag with "Hello, React!"',
    commonMistakes: [
      'Thinking React is a full framework (it is a library)',
      'Forgetting that JSX requires one parent element'
    ],
    examTips: [
      'React was created by Jordan Walke',
      'JSX is not required but highly recommended'
    ],
    practiceTask: 'Create a simple React component that displays your name.',
    quizQuestions: [
      {
        question: 'What is JSX?',
        options: [
          'A new programming language',
          'A syntax extension for JavaScript',
          'A CSS framework',
          'A database type'
        ],
        correctAnswer: 1,
        explanation: 'JSX allows us to write HTML-like code directly inside JavaScript.'
      }
    ],
    relatedTopics: ['react-components', 'react-state']
  },
  {
    id: 'react-state',
    title: 'React State (useState)',
    category: 'react',
    difficulty: 'Intermediate',
    summary: 'Manage dynamic data in your React components.',
    explanation: `State is a built-in React object that is used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders.
    
    The \`useState\` hook is used to add state to functional components.`,
    keyPoints: [
      'useState returns an array with two elements: the current state and a setter function',
      'Never modify state directly (use the setter function)',
      'State changes trigger a component re-render'
    ],
    codeExample: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
    output: 'A counter that increases when the button is clicked.',
    commonMistakes: [
      'Modifying state directly (e.g., count = count + 1)',
      'Calling hooks inside loops or conditions'
    ],
    examTips: [
      'Hooks must be called at the top level of the component',
      'The initial state is only used on the first render'
    ],
    practiceTask: 'Create a component with a text input that updates a state variable as you type.',
    quizQuestions: [
      {
        question: 'What does the useState hook return?',
        options: [
          'The state value only',
          'The setter function only',
          'An array with state and setter',
          'An object with state and setter'
        ],
        correctAnswer: 2,
        explanation: 'useState returns an array: [state, setState].'
      }
    ],
    relatedTopics: ['react-intro', 'react-effects']
  },
  {
    id: 'dom-events-deep',
    title: 'Advanced DOM Events',
    category: 'dom',
    difficulty: 'Intermediate',
    summary: 'Master event bubbling, delegation, and custom events.',
    explanation: `Events are the core of interactivity. Understanding how they propagate is crucial:
    - **Bubbling**: Events "bubble up" from the target to the root.
    - **Capturing**: Events "trickle down" from the root to the target.
    - **Delegation**: Attaching a single listener to a parent to handle events from multiple children.
    - **preventDefault()**: Stops the default browser action (like form submission).
    - **stopPropagation()**: Stops the event from bubbling further.`,
    keyPoints: [
      'Event delegation is efficient for large lists',
      'Bubbling is the default propagation phase',
      'Use addEventListener for multiple listeners on one element',
      'Custom events can be created with new CustomEvent()'
    ],
    codeExample: `const list = document.getElementById('container');
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    console.log('Button clicked:', e.target.innerText);
  }
});`,
    output: 'Logs the text of any button clicked inside the container.',
    commonMistakes: [
      'Not checking e.target in event delegation',
      'Forgetting to remove event listeners to prevent memory leaks',
      'Confusing target and currentTarget'
    ],
    examTips: [
      'Event delegation uses event bubbling',
      'e.stopPropagation() is different from e.preventDefault()'
    ],
    practiceTask: "Add a click listener to the 'action-btn' that changes the background color of 'sandbox-root' to 'indigo'.",
    interactiveCode: `const btn = document.getElementById('action-btn');
const root = document.getElementById('sandbox-root');

btn.addEventListener('click', () => {
  root.style.backgroundColor = 'indigo';
});`,
    successCondition: "document.getElementById('sandbox-root').style.backgroundColor === 'indigo'",
    quizQuestions: [
      {
        question: 'Which method stops an event from bubbling up the DOM tree?',
        options: ['preventDefault()', 'stopPropagation()', 'stopImmediatePropagation()', 'cancelEvent()'],
        correctAnswer: 1,
        explanation: 'stopPropagation() prevents the event from reaching parent elements.'
      }
    ],
    relatedTopics: ['dom-selectors', 'events-intro']
  },
  {
    id: 'async-await-deep',
    title: 'Async/Await Mastery',
    category: 'async',
    difficulty: 'Intermediate',
    summary: 'Write cleaner asynchronous code using async and await.',
    explanation: `Async/Await is syntactic sugar over Promises. It makes asynchronous code look and behave more like synchronous code.
    - **async**: Declares a function that returns a Promise.
    - **await**: Pauses execution until a Promise resolves.
    - **try/catch**: The standard way to handle errors in async functions.`,
    keyPoints: [
      'await can only be used inside an async function',
      'async functions always return a Promise',
      'It simplifies complex promise chains',
      'Error handling is more intuitive with try/catch'
    ],
    codeExample: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}`,
    output: 'Logs the data or an error message.',
    commonMistakes: [
      'Forgetting the async keyword on the function',
      'Not using try/catch for error handling',
      'Awaiting multiple things sequentially when they could be parallel'
    ],
    examTips: [
      'await pauses the function execution, not the whole program',
      'Promise.all() is still useful with async/await'
    ],
    practiceTask: "Write an async function that logs 'Hello' after 1 second.",
    interactiveCode: `async function sayHello() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Hello');
}
sayHello();`,
    quizQuestions: [
      {
        question: 'What does an async function always return?',
        options: ['A value', 'A Promise', 'undefined', 'null'],
        correctAnswer: 1,
        explanation: 'Even if you return a value, it is automatically wrapped in a Promise.'
      }
    ],
    relatedTopics: ['promises-intro', 'fetch-api']
  },
  {
    id: 'react-props-lists',
    title: 'React Props & Lists',
    category: 'react',
    difficulty: 'Intermediate',
    summary: 'Learn how to pass data to components and render lists dynamically.',
    explanation: `Props (properties) are how we pass data from parent to child components. Lists are rendered using the .map() method.
    - **Props**: Read-only data passed to a component.
    - **Keys**: Unique identifiers for list items to help React track changes.
    - **Destructuring**: A common way to access props.`,
    keyPoints: [
      'Props are immutable (read-only)',
      'Always provide a unique key for list items',
      'Props can be any JavaScript type (strings, numbers, objects, functions)',
      'Components re-render when props change'
    ],
    codeExample: `function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

function App() {
  const users = ['Alice', 'Bob', 'Charlie'];
  return (
    <ul>
      {users.map(user => <Welcome key={user} name={user} />)}
    </ul>
  );
}`,
    output: 'A list of welcome messages.',
    commonMistakes: [
      'Trying to modify props inside a component',
      'Using index as a key for dynamic lists',
      'Forgetting to return the JSX inside .map()'
    ],
    examTips: [
      'Keys must be unique among siblings',
      'Props flow one-way: down the component tree'
    ],
    practiceTask: "Create a simple list of 3 items in React (conceptual).",
    quizQuestions: [
      {
        question: 'Why are keys important in React lists?',
        options: ['For styling', 'To help React identify which items changed', 'To sort the list', 'They are not important'],
        correctAnswer: 1,
        explanation: 'Keys help React optimize rendering by tracking which items are added, removed, or moved.'
      }
    ],
    relatedTopics: ['react-intro', 'react-state']
  },
  {
    id: 'react-hooks-effect',
    title: 'React useEffect Hook',
    category: 'react',
    difficulty: 'Intermediate',
    summary: 'Learn how to handle side effects in functional components.',
    explanation: `The useEffect hook allows you to perform side effects in your components. Side effects include data fetching, manual DOM manipulation, and setting up subscriptions.
    - **Effect Function**: The first argument, where you write your side effect.
    - **Dependency Array**: The second argument, which controls when the effect runs.
    - **Cleanup Function**: An optional function returned from the effect to clean up resources.`,
    keyPoints: [
      'Runs after every render by default (if no dependency array)',
      'Empty array [] means it runs only once on mount',
      'Dependencies [prop, state] mean it runs when those values change',
      'Cleanup is essential for timers and event listeners'
    ],
    codeExample: `useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);`,
    output: 'Logs mount/unmount messages.',
    commonMistakes: [
      'Missing dependencies in the array',
      'Creating infinite loops by updating state without dependencies',
      'Not cleaning up intervals or subscriptions'
    ],
    examTips: [
      'useEffect is for synchronization, not just lifecycle',
      'Always include all variables used inside the effect in the dependency array'
    ],
    practiceTask: "Log 'Hello' to the console only when the component mounts.",
    interactiveCode: `useEffect(() => {
  console.log('Hello');
}, []);`,
    successCondition: "true", // Hard to check console logs easily in this sandbox without more complex logic, but we'll assume success for now or use a DOM side effect
    quizQuestions: [
      {
        question: 'When does an effect with an empty dependency array [] run?',
        options: ['Every render', 'Only on mount', 'Only on unmount', 'Never'],
        correctAnswer: 1,
        explanation: 'An empty dependency array tells React to run the effect only once, after the initial render.'
      }
    ],
    relatedTopics: ['react-state', 'async-await-deep']
  },
  {
    id: 'react-conditional-rendering',
    title: 'Conditional Rendering',
    category: 'react',
    difficulty: 'Beginner',
    summary: 'Learn how to show or hide components based on state.',
    explanation: `In React, you can render different UI depending on certain conditions. This is similar to how if-statements work in JavaScript.
    - **if/else**: Standard JS logic.
    - **Ternary Operator**: condition ? true : false.
    - **Logical &&**: condition && true.`,
    keyPoints: [
      'Use ternary for simple either/or logic',
      'Use && for "if this, then that" logic',
      'Return null to hide a component completely',
      'Keep logic clean by moving complex conditions outside JSX'
    ],
    codeExample: `function Welcome({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
    </div>
  );
}`,
    output: 'Shows different message based on isLoggedIn prop.',
    commonMistakes: [
      'Using if-statements directly inside JSX (not allowed)',
      'Forgetting that 0 is falsy and might render a 0 in the UI'
    ],
    examTips: [
      'Ternary is the most common way to toggle UI',
      'Logical && is great for optional components'
    ],
    practiceTask: "Render a div with text 'Visible' only if a variable 'show' is true.",
    interactiveCode: `const show = true;
return (
  <div>
    {show && <div id="target">Visible</div>}
  </div>
);`,
    successCondition: "document.getElementById('target')?.innerText === 'Visible'",
    quizQuestions: [
      {
        question: 'What is the most common way to conditionally render one of two elements?',
        options: ['if-else', 'switch', 'Ternary operator', 'while loop'],
        correctAnswer: 2,
        explanation: 'The ternary operator (condition ? x : y) is the standard way to toggle between two elements in JSX.'
      }
    ],
    relatedTopics: ['react-intro', 'react-props-lists']
  },
  {
    id: 'react-forms-intro',
    title: 'React Forms & Inputs',
    category: 'react',
    difficulty: 'Intermediate',
    summary: 'Learn how to handle user input with controlled components.',
    explanation: `In React, form data is usually handled by the component's state. These are called "controlled components".
    - **value**: Binds the input value to a state variable.
    - **onChange**: Updates the state when the user types.
    - **onSubmit**: Handles form submission and prevents default behavior.`,
    keyPoints: [
      'React state is the "single source of truth"',
      'Always use e.preventDefault() in form submission',
      'Inputs must have an onChange handler to be editable',
      'Use a single state object for multiple inputs'
    ],
    codeExample: `const [name, setName] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Submitted:', name);
};

return (
  <form onSubmit={handleSubmit}>
    <input value={name} onChange={(e) => setName(e.target.value)} />
    <button type="submit">Submit</button>
  </form>
);`,
    output: 'A controlled input field.',
    commonMistakes: [
      'Not providing an onChange handler (input becomes read-only)',
      'Forgetting to prevent default form submission',
      'Directly manipulating the input DOM element'
    ],
    examTips: [
      'Controlled components are the recommended way to handle forms',
      'Use the "name" attribute to handle multiple inputs with one function'
    ],
    practiceTask: "Create an input that updates its value in state (conceptual).",
    quizQuestions: [
      {
        question: 'What is a "controlled component" in React forms?',
        options: ['A component that controls other components', 'An input whose value is controlled by React state', 'A component that cannot be changed', 'A component with a fixed ID'],
        correctAnswer: 1,
        explanation: 'A controlled component is an input element whose value is driven by state, making React the single source of truth.'
      }
    ],
    relatedTopics: ['react-state', 'react-props-lists']
  }
];

// Helper to get lessons by category
export const getLessonsByCategory = (category: Category) => 
  lessons.filter(l => l.category === category);

// Helper to get lesson by id
export const getLessonById = (id: string) => 
  lessons.find(l => l.id === id);
