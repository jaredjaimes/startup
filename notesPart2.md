### gitignore file:
```
# dependencies
node_modules
/.pnp
.pnp.js

# production
/build
/dist

# misc
.DS_Store

npm-debug.log*
.vscode
dbConfig.json
```
Summary of what it does: 
This .gitignore file is configured to:
- Ignore dependencies and build artifacts (node_modules, build, dist, .pnp).
- Ignore files that are specific to your local system or development environment (.DS_Store, .vscode, npm-debug.log*).
- Prevent sensitive or developer-specific files like dbConfig.json from being tracked.
- By including these rules, your repository will only track the essential source files and configuration needed for others to build and run the project, reducing unnecessary clutter and improving security.

## REACT
### React Components:
#### Function Components:
- The component is taking some peice of the application and making a component/ lego block of the application. Basically, a component is a reusable module that renders a part of out overall application.
- When creating a React component, the component's name MUST start with an upper case letter. Like literally all names start with a capital letter.
Example:
```
const header = (
  <header>
    <h1>Mozilla Developer Network</h1>
  </header>
);
```
Your browser can't read JSX without help. So use a tool like Babel, and that turns the header expression to something like this:
```
const header = React.createElement(
  "header",
  null,
  React.createElement("h1", null, "Mozilla Developer Network"),
);
```
- To create a new React application, we use Vite.
- And in order to use Vite you need Node.js installed.
- After the long process, Vite will give you everything you need to develop a React application.
- The src directory is where you will spend most of your time. Source code of the application will be there.
- The package.json, and the package-lock.json files contain the metadata about the project. You don't need to understand the files.
Example:
This file contains our first component, <App />:
```
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```
The App.jsx file consists of three main parts: some import statements at the top, the App() function in the middle, and an export statement at the bottom. Most React components follow this pattern.
For the import:
##### Import:
```
import { useState } from "react";
{/* The first statement imports the useState hook from the react library. Hooks are a way of using React's features inside a component. */}

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
{/* After that, we import reactLogo and viteLogo. Note that their import paths start with ./ and / respectively and that they end with the .svg extension at the end. This tells us that these imports are local, referencing our own files rather than npm packages. */}

import "./App.css";
{/* Tells Vite to add the referenced CSS file to the final code output, so that it can be used in the browser. */}
```
##### Function:
The App() function returns a JSX expression. This expression defines what your browser ultimately renders to the DOM.
- Just under the return keyword is a special bit of syntax: <>. This is a fragment. React components have to return a single JSX element, and fragments allow us to do that without rendering arbitrary <div>s in the browser. You'll see fragments in many React applications.
##### Export:
This export statement makes our App() function available to other modules.

##### Adding attributes/ style:
- when adding attributes change the class to className because class is reserved for a reserved word in JavaScript.
Example:
```
<img className="avatar" />
```
and then in CSS file:
```
.avatar {
  border-radius: 50%;
}
```
##### Expressions as content:
```
const subject = "React";
function App() {
  // code omitted for brevity
  <h1>Hello, {subject}!</h1>
}
```
"Hello, React!" rendered.
Example:
```
{/* Hello, React :)! */}
<h1>Hello, {subject + ' :)'}!</h1>
{/* Hello, REACT */}
<h1>Hello, {subject.toUpperCase()}</h1>
{/* Hello, 4! */}
<h1>Hello, {2 + 2}!</h1>
```
##### Componenet Props:
- In React, the flow of data is unidirectional: props can only be passed from parent components down to child components.
- Let's open main.jsx and give our <App /> component its first prop.
- Add a prop of subject to the <App /> component call, with a value of Clarice. When you are done, it should look something like this:
- ```
  <App subject="Clarice" />
  ```
Back in the App.jsx
```
jsx
Copy to Clipboard
function App(props) {
  return (
    <>
      <header>
        <h1>Hello, {props.subject}!</h1>
        <button type="button" className="primary">
          Click me!
        </button>
      </header>
    </>
  );
}
```
#### Nested Components:
Create a button component:
```
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```
nest this component into another:
```
//The export default keywords specify the main component in the file.
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
Note: You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper:
```
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```
##### if statements:
normal way:
```
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```
If you prefer more compact code, you can use the conditional ? operator. Unlike if, it works inside JSX:
```
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```
When you don’t need the else branch, you can also use a shorter logical && syntax:
```
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```
##### Rendering lists:
```
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```
##### Responding to Events:
You can respond to events by declaring event handler functions inside your components:
```
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
##### Updating the screen:
Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.
- First, import useState from React:
```
import { useState } from 'react';
```
Now you can declare a state variable inside your component:
```
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```
- You’ll get two things from useState: the current state (count), and the function that lets you update it (setCount). You can give them any names, but the convention is to write [something, setSomething].
- The first time the button is displayed, count will be 0 because you passed 0 to useState(). When you want to change state, call setCount() and pass the new value to it. Clicking this button will increment the counter:
```
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```
React will call your component function again. This time, count will be 1. Then it will be 2. And so on.

##### Using Hooks:
- Functions starting with use are called Hooks.
- Note: useState is a built-in Hook provided by React. 

#### Babel:
- When creating jsx and you want to convert that to javascript then put it through a program called babel and it converts it to javascript. 
