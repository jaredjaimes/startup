### DOM:
The DOM is a programming interface. It represents the page so that programs can change the structure, style, and content fo the document. The DOM represents the documents nodes and objects. 
- Nodes represent building blocks of DOM, like a tree-like representation of a HTML. Each node in the DOM represent a single element, attribute, text, or other component of the document.
- Objects are collections of key-value pairs, where keus are strings(or symbols) and the values can be any data type(including other objects). Think of them as containers that hold related data.

|Data type (Interface)|	Description|
|---------------------|------------|
|Document	|When a member returns an object of type document (e.g., the ownerDocument property of an element returns the document to which it belongs), this object is the root document object itself. The DOM document Reference chapter describes the document object.|
|Node	|Every object located within a document is a node of some kind. In an HTML document, an object can be an element node but also a text node or attribute node.|
|NodeList	|A nodeList is an array of elements, like the kind that is returned by the method document.querySelectorAll(). Items in a nodeList are accessed by index in either of two ways: list.item(1), list[1] These two are equivalent. In the first, item() is the single method on the nodeList object. The latter uses the typical array syntax to fetch the second item in the list.|
|Attr	|When an attribute is returned by a member (e.g., by the createAttribute() method), it is an object reference that exposes a special (albeit small) interface for attributes. Attributes are nodes in the DOM just like elements are, though you may rarely use them as such.|
|NamedNodeMap	|A namedNodeMap is like an array, but the items are accessed by name or index, though this latter case is merely a convenience for enumeration, as they are in no particular order in the list. A namedNodeMap has an item() method for this purpose, and you can also add and remove items from a namedNodeMap.|

The following is a brief list of common APIs in web and XML page scripting using the DOM.
- [document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- document.querySelectorAll()
- document.createElement()
- Element.innerHTML
- Element.setAttribute()
- Element.getAttribute()
- EventTarget.addEventListener()
- HTMLElement.style
- Node.appendChild()
- window.onload
- window.scrollTo()

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
##### State: 
Component state is created by calling the React.useState hook function. The useState function returns a variable that contains the current state and a function to update the state. The following example creates a state variable called clicked and toggles the click state in the updateClicked function that gets called when the paragraph text is clicked.
```
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```
You should note that you can use JSX even without a function. A simple variable representing JSX will work anyplace you would otherwise provide a component.
```
const hello = <div>Hello</div>;

ReactDOM.render(hello, document.getElementById('root'));
```
##### Render function:
One of the primary purposes of a component is to generate the user interface. This is done with the component's render function. Whatever is returned from the render function is inserted into the component HTML element.

##### Adding Properties:
React components also allow you to pass information to them in the form of element properties. The component receives the properties in its constructor and then can display them when it renders.

JSX
```
<div>Component: <Demo who="Walke" /><div>
```
React component
```
function Demo(props) {
  return <b>Hello {props.who}</b>;
}
```
Resulting HTML
```
<div>Component: <b>Hello Walke</b></div>
```

##### State:

##### Using Hooks:
- Functions starting with 'use' are called Hooks.
- Note: useState is a built-in Hook provided by React. 

#### Babel:
- When creating jsx and you want to convert that to javascript then put it through a program called babel and it converts it to javascript. 

### Vite:
Vite is a toolchain that bundles your code quickly. It has great debugging support, and allows you to easily support JSX. 
Explore the files that Vite Creates:
|Directory|	File|	Purpose|
|---------|-----|--------|
||index.html|	Primary page for the application. This is the starting point to load all of the JSX components beginning with main.jsx.|
||package.json|	NPM definition for package dependencies and script commands. This is what maps npm run dev to actually start up Vite.|
||package-lock.json|	Version constraints for included packages (do not edit this).|
||vite.config.js|	Configuration setting for Vite. Specifically this sets up React for development.|
||vite.svg|	Vite logo for use as favicon and for display in the app.|
||main.jsx|	Entry point for code execution. This simply loads the App component found in App.jsx.|
||index.css|	CSS for the entire application.|
||App.jsx|	JSX for top level application component. This displays the logs and implements the click counter.|
||App.css|	CSS for the top level application component.|	
||react.svg|	React logo for display in the app.|

Note: The main files in the application are index.html, main.jsx, and App.jsx. The browser loads index.html which provides the HTML element (#root) that the React application will be injected into. It also includes the script element to load main.jsx.

### Router:
React Router is the most popular routing library in React.
- In order to use it then you need to install it. You do this by running npm i react-router-dom.
- Once you have this library installed you have to 3 things left to do in order to use the react router.
- 1. Setup the router.
  2. define the routes
  3. handle the navigation.

###### Setup:
To set it up, import the specific router you need. (BrowserRouter for the web and NativeRouter for mobile) and wrap your entire application in that router.
  ```
  ...
  import { BrowserRouter } from "react-router-dom"
  ...
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  ...
  )
  ```
Generally you will import your router in the index.js page of your application and it will wrap your App component.

###### Define Routes
This is generally done at the top level of your application, such as in the App component. (however, it can be done wherever you want).
```
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { BookList } from "./BookList"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookList />} />
    </Routes>
  )
}
```
It can be as simple as defining a single Route component for each route in your application and then putting all those Route components in a single Routes component and it will render the content in the element prop of the Route that has a path that matches the URL. 

###### Handling Navigation:
React Router uses its own custom Link component to handle navigation. This Link component is just a wrapper around an anchor tag that helps ensure all the routing and conditional re-rendering is handled properly. So  you use Link instead of the anchor tag, and instead of the 'href', you will use 'to', instead. 
- remember a anchor tag is <a> that defines a hyperlink.
```
import { Route, Routes, Link } from "react-router-dom"
import { Home } from "./Home"
import { BookList } from "./BookList"

export function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </>
  )
}
```
### Advanced Route Definitions:
The 5 main techniques:
1. Dynamic Routing
2. Routing Priority
3. Nested Routes
4. Multiple Routes
5. useRoutes Hook
Note: I was way to lazy to write all the notes for the rest of this subject so here is a link to it all.
- [Ultimate React Router v6 Guide](https://blog.webdevsimplified.com/2022-07/react-router/)

### Summary notes from making a component with react. 
- [Getting started with React.js: simple todo list.](https://youtu.be/BaRtXhcD9O4?si=bHiqzbPAyZ8z2YO7)

- Each component class has a thing called render(); Render renders the actual jsx into html. Render is called at component initialization and every time the state updates.
  ```
  render(){
      return(
          <div>
            <h4>todo list</h4>
          </div>
      );
  }
  ```
- You have to program where this component will be in. So in html, put the
  ```
  <script>
    ReactDOM.render(
        React.createElement(TodoList),
        document.getElementById('todo')
    );
  </script>
  ```
  This creates the todo list and renders it into the todo div.
Component State:
- This describes how the component should render, what it should or shouldn't show.
- And state is basically a javasctipt object containing values, objects, and arrays.
- You can establish the initial state in a contructor.
  ```
  contructor(props){
    super(props);
    //since you need the state to be empty when you intialize it then:
    this.state = {
        items: []
    };
  }
  ```

