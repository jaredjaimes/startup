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

# The internet:
It is not a bubble cloud. The internet is a wire buried in the ground. Two servers can connect to that wire to communicate. Webpages are files on the servers hard drive. Each server has a unique ip address. These help computers find each other. We also give them names to make them better for us to understand. Computers arent servers because, it is not connected directly to the internet. COmputers are clients because it is connected indirectly to the internet through an internet service provider. When ever info travels through the internet the internet breaks it down into packets to be smaller and then when it gets to destination they reform it in correct order of packets. What's to keep your packets from accidently going to bosses screen? Thats why IP addresses are important. Everyhting connected to the internet or indirectly has an ip adress. WHere two parts or more of the internet intersect there is a peice of equipment called a router that help packets find there way to their destination. 

Note: You can run traceroute to in console utility to see the route the computer takes through the internet to get to a certain destination. 

### Web Servers:
A web server is a computing device that is hosting a web service that knows how to accept incomming internet connections and speak the HTTP application protocol.
- Web page is basically a collection of raw materials. Web server is a peice of software that puts those raw materials in a web page.

### Domain Name:
YOu can see the domain name using dig in console. This hsows the domain name and all the different IP addresses associated with it. They do thiis in case of errors.
Domains are broken into root domain and sub domains. The TLD or top level domain represent things like com, edu, or click. so a root domain is somehting like, byu.edu, google.com etc, where sub domain is something like travel.byu.edu, or finance.byu.edu.

### DNS: 
Once a domain name is in the registry it can be listed with a domain name system (DNS) server and associated with an IP address. Of course you must also lease the IP address before you can use it to uniquely identify a device on the internet, but that is a topic for another time. Every DNS server in the world references a few special DNS servers that are considered the authoritative name servers for associating a domain name with an IP address.

The DNS database records that facilitate the mapping of domain names to IP addresses come in several flavors. The main ones we are concerned with are the address (A) and the canonical name (CNAME) records. An A record is a straight mapping from a domain name to IP address. A CNAME record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map byu.com to the same IP address as byu.edu so that either one could be used.

When you enter a domain name into a browser, the browser first checks to see if it has the name already in its cache of names. If it does not, it contacts a DNS server and gets the IP address. The DNS server also keeps a cache of names. If the domain name is not in the cache, it will request the name from an authoritative name server. If the authority does not know the name then you get an unknown domain name error. If the process does resolve, then the browser makes the HTTP connection to the associated IP address.

As you can see, there is a lot of levels of name caching. This is done for performance reasons, but it also can be frustrating when you are trying to update the information associated with your domain name. This is where the time to live (TTL) setting for a domain record comes into play. You can set this to be something short like 5 minutes or as long as several days. The different caching layers should then honor the TTL and clear their cache after the requested period has passed.


## Web Services: 
Up to this point, your entire application is loaded from your web server and runs on the user's browser. It starts when the browser requests the index.html file from the web server. The index.html, in turn, references other HTML, CSS, JavaScript, or image files. All of these files, that are running on the browser, comprise the frontend of your application.

From our front end JAvaScript we can make requests to external services running anywhere in the world. This gets us external datat that we can inject into the DOM for the user to read. 
- To make a webserver request, we supply the URL of the web service to the fetch function that is built into the browser.
- We need to create our own web service.
- Our web service willl provide  the static frontend files along with functions to handle fetch requests for things like storing data persistently, providing security and runnning tasks, executing application logic that you don;t want your user to be able to see, and communicating with other users.
- Note: the functionality provided by your web service represents the backend of your application.
- Generally the functions provided by a web service are called endpoints, or sometimes APIs. You access the web service endpoints from your frontend JavaScript with the fetch function. In the picture below, the backend web service is not only providing the static files that make up the frontend, but also providing the web service endpoints that the frontend calls to do things like get a user, create a user, or get high scores.

![backEnd](https://github.com/user-attachments/assets/d22a167d-da31-4c83-90d7-777b6d91df00)

- Your backend web service can also use fetch to make requests to other web services.
- For example, in the image below the frontend uses fetch to request the user's data from the backend web service. The backend then uses fetch to call two other web services, one to get the user's data from the database, and another one to request subway routes that are near the user's home. That data is then combined together by the backend web service and returned to the frontend for display in the browser.

![backEndFetch](https://github.com/user-attachments/assets/337897c8-1491-4cd8-854e-c8be08be166c)

### URL:
The unifrom resource locator(URL) represents the location of a web resource. A web resource can be anything from a web page, font, image, database record. or JSON object. 

Looking at the different parts of a URL is a good way to understand what it represents. Here is an example URL that represents the summary of accepted CS 260 BYU students that is accessible using secure HTTP.
```
https://byu.edu:443/cs/260/student?filter=accepted#summary
```
The URL syntax uses the following convention. Notice the delimiting punctuation between the parts of the URL. Most parts of the URL are optional. The only ones that are required are the scheme, and the domain name.
```
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
```
|Part|	Example|	Meaning|
|----|---------|---------|
|Scheme|	https|	The protocol required to ask for the resource. For web applications, this is usually HTTPS. But it could be any internet protocol such as FTP or MAILTO.|
|Domain name|	byu.edu|	The domain name that owns the resource represented by the URL.|
|Port|	3000|	The port specifies the numbered network port used to connect to the domain server. Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose. The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS.|
|Path|	/school/byu/user/8014|	The path to the resource on the domain. The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema.|
|Parameters|	filter=names&highlight=intro,summary|	The parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string.|
|Anchor	|summary	|The anchor usually represents a sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. The anchor is also sometimes called the hash, or fragment ID.|

### Ports:
- When you connect to a device on the internet you need both an IP address and a numbered port.
- Port numbers allow a single device to support multiple protocols (e.g. HTTP, HTTPS, FTP, or SSH) as well as different types of services (e.g. search, document, or authentication). 

he internet governing body, IANA, defines the standard usage for port numbers. Ports from 0 to 1023 represent standard protocols. 

Here is a list of common port numbers that you might come across.

|Port|	Protocol|
|----|----------|
|20|	File Transfer Protocol (FTP) for data transfer|
|22|	Secure Shell (SSH) for connecting to remote devices|
|25|	Simple Mail Transfer Protocol (SMTP) for sending email|
|53|	Domain Name System (DNS) for looking up IP addresses|
|80|	Hypertext Transfer Protocol (HTTP) for web requests|
|110|	Post Office Protocol (POP3) for retrieving email|
|123|	Network Time Protocol (NTP) for managing time|
|161|	Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers|
|194|	Internet Relay Chat (IRC) for chatting|
|443|	HTTP Secure (HTTPS) for secure web requests|

### HTTP:
Hypertext Transfer Protocol (HTTP) is how the web talks. When a web browser makes a request to a web server it does it using the HTTP protocol. 
- Just like becoming fluent in a foreign language makes a visit to another country more enjoyable, understanding how to speak HTTP helps you communicate effectively when talking on the web.
- When a web client (e.g. a web browser) and a web server talk they exchange HTTP requests and responses. The browser will make an HTTP request and the server will generate an HTTP response.

- The first line of the HTTP request contains the verb of the request, followed by the path, parameters, and anchor of the URL, and finally the version of HTTP being used.
```
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
```
EX: 
```
GET /hypertext/WWW/Helping.html HTTP/1.1
Host: info.cern.ch
Accept: text/html
```
In the above example, we are asking to GET a resource found at the path /hypertext/WWW/Helping.html. The version used by the request is HTTP/1.1. This is followed by two headers. The first specifies the requested host (i.e. domain name). The second specifies what type of resources the client will accept. The resource type is always a MIME type as defined by internet governing body IANA. In this case we are asking for HTML.

There are several verbs that describe what the HTTP request is asking for. The list below only describes the most common ones.

|Verb|	Meaning|
|----|---------|
|GET|	Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.|
|POST|	Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.|
|PUT|	Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource.|
|DELETE|	Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.|
|OPTIONS|	Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.|

### Cookies:
HTTP itself is stateless. This means that one HTTP request does not know anything about a previous or future request. However, that does not mean that a server or client cannot track state across requests. One common method for tracking state is the cookie. Cookies are generated by a server and passed to the client as an HTTP header.
```
HTTP/2 200
Set-Cookie: myAppCookie=tasty; SameSite=Strict; Secure; HttpOnly
```
The client then caches the cookie and returns it as an HTTP header back to the server on subsequent requests.
```
HTTP/2 200
Cookie: myAppCookie=tasty
```
This allows the server to remember things like the language preference of the user, or the user's authentication credentials. A server can also use cookies to track, and share, everything that a user does. However, there is nothing inherently evil about cookies; the problem comes from web applications that use them as a means to violate a user's privacy or inappropriately monetize their data.

### Fetch:
Today, the fetch API is the preferred way to make HTTP requests. The fetch function is built into the browser's JavaScript runtime. This means you can call it from JavaScript code running in a browser.
- The basic usage of fetch takes a URL and returns a promise. The promise then function takes a callback function that is asynchronously called when the requested URL content is obtained. If the returned content is of type application/json you can use the json function on the response object to convert it to a JavaScript object.

# Node Web Service:
With JavaScript we can write code that listens on a network port (e.g. 80, 443, 3000, or 8080), receives HTTP requests, processes them, and then responds. We can use this to create a simple web service that we then execute using Node.js.

Node.js creates a simple web server. This works great for small projects, but to build a full ready application you need a framework. This is where Node package Express comes in. 
1. Express provides support for:
2. Routing requests for service endpoints
3. Manipulating HTTP requests with JSON body content
4. Generating HTTP responses
5. Using middleware to add functionality

Everything in Express revolves around creating and using HTTP routing and middleware functions.
- You create an Express application by using NPM to install the Express package and then calling the express constructor to create the Express application and listen for HTTP requests on a desired port.
```
➜ npm install express
```
```
const express = require('express');
const app = express();

app.listen(8080);
```
With the app object you can now add HTTP routing and middleware functions to the application.

... Notes on express and troublehoot 502 code.

### SOP:
To combat this problem the Same Origin Policy (SOP) was created. Simply stated SOP only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. A request from byu.iinstructure.com for service endpoints that are made to byu.instructure.com would fail because the domains do not match. This provides significant security, but it also introduces complications when building web applications. For example, if you want build a service that any web application can use it would also violate the SOP and fail. In order to address this, the concept of Cross Origin Resource Sharing (CORS) was invented.

CORS allows the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed. The server may say that all origins are allowed, for example if they are a general purpose image provider, or only a specific origin is allowed, for example if they are a bank's authentication service. If the server doesn't specify what origin is allowed then the browser assumes that it must be the same origin.

### Service Design: 
Web services are usually provided over HTTP, and so HTTP greatly influences the design of the service. The HTTP verbs such as GET, POST, PUT, and DELETE often mirror the designed actions of a web service. For example, a web service for managing comments might list the comments (GET), create a comment (POST), update a comment (PUT), and delete a comment (DELETE). Likewise, the MIME content types defined by IANA are a natural fit for defining the types of content that you want to provide (e.g. HTML, PNG, MP3, and MP4). The goal is to leverage those technologies as much as possible so that you don't have to recreate the functionality they provide and instead take advantage of the significant networking infrastructure built up around HTTP. This includes caching servers that increase your performance, edge servers that bring your content closer, and replication servers that provide redundant copies of your content and make your application more resilient to network failures.

### Endpoints:
A web service is usually divided up into multiple service endpoints. Each endpoint provides a single functional purpose. All of the criteria that you would apply to creating well designed code functions also applies when exposing service endpoints.

HTTP
![webServicesHTTPEndpoints](https://github.com/user-attachments/assets/df585c7b-fbda-4518-b969-e1281b2f100b)

⚠ Note that service endpoints are often called an Application Programming Interface (API). This is a throwback to old desktop applications and the programming interfaces that they exposed. Sometimes the term API refers to the entire collection of endpoints, and sometimes it is used to refer to a single endpoint.

Here are some things you should consider when designing your service's endpoints.

Grammatical - With HTTP everything is a resource (think noun or object). You act on the resource with an HTTP verb. For example, you might have an order resource that is contained in a store resource. You then create, get, update, and delete order resources on the store resource.

Readable - The resource you are referencing with an HTTP request should be clearly readable in the URL path. For example, an order resource might contain the path to both the order and store where the order resource resides: /store/provo/order/28502. This makes it easier to remember how to use the endpoint because it is human readable.

Discoverable - As you expose resources that contain other resources you can provide the endpoints for the aggregated resources. This makes it so someone using your endpoints only needs to remember the top level endpoint and then they can discover everything else. For example, if you have a store endpoint that returns information about a store you can include an endpoint for working with a store in the response.

### Development and production environments:
The advantage of using an automated deployment process is that it is reproducible. You don't accidentally delete a file, or misconfigure something with an stray keystroke. Also, having a automated script encourages you to iterate quickly because it is so much easier to deploy your code. You can add a small feature, deploy it out to production, and get feedback within minutes from your users.

Our deployment scripts change with each new technology that we have to deploy. Initially, they just copy up a directory of HTML files, but soon they include the ability to modify the configuration of your web server, run transpiler tools, and bundle your code into a deployable package.

You run a deployment script from a console window in your development environment with a command like the following.
```
./deployService.sh -k ~/prod.pem -h yourdomain.click -s simon
```
The -k parameter provides the credential file necessary to access your production environment. The -h parameter is the domain name of your production environment. The -s parameter represents the name of the application you are deploying (either simon or startup).
