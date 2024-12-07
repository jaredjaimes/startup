# Startup
Startup application for BYU CS260
### [notes](https://github.com/jaredjaimes/startup/blob/main/notes.md)

# Remember:
- Be simple: Do not start by implementing mutiple features. This project is about focusing on a core feature well.
- You can make it look nicer after you have made it work.
- **Demonstrating the technology is more important than complexity or creativity, and basic implementations of each of the course technologies is sufficient to demonstrate your mastery.**
- NOTE: MAke sure when deploying that you are in your startup file

## Elevator Pitch
Have you ever been stuck trying to complete the same life goal for years? Maybe you've tried getting in better shape, or have a better romantical life, but time and time again you lsot motivation and gave up. Well how about if I told you there was an app that made completeing tasks and reaching goals as addicting as video games, or learning languages on duolingo. Well introducing Life.io, this app allows users to create a virtual avatar that receives in app rewards when you complete a task, and lets you see your goal progress, so you actually see benefits immeadiatley after completeing a task. Making completing goals absolutely addicting.


## Key Features
- Secure login.
- Ability to customize and create your own avatar
- Ability to personalize goals and tasks to focus on
- Recieve rewards and items for avatar based on reaching goals
- ability to change goals and track progress.
- Ability to share progress and view progress of friends using the app.
- goals and progress are stored
- goal history and task completion is stored.
- Avatar rewards are stored.


## Technologies
#### HTML
3 HTML pages, one to organize and structure the login/ account creation, another for avatar creation/customization as well as creating main focus goals, another to create tasks for each focus goal that you want to accomplish. Then another page to view users highest rankings and friends progress. 

### CSS
Styling avatar, application tabs, goals, and tasks styled wit a variety of shapes, good color contrast, and good background space. 

### JavaScript
Provide the login information, display the avatar creation process as well as being able to interact with the avatar settings, display goal options, edit tasks, display goal progress, display other users progress, display high rankings.

### React
Page that displays avatar that reacts to user input for appearance, page that displays goals that react to user input to tract goals. 

### Web Service
Backend in service with endpoints for:
- Submitting goal information.
- Submitting progress for tracking goals.
- retrieving goal status.
- retrieving information of all users progress for high ranking in real time.

### DB/Login
Users login info, as well as, their goal history, and progress are stored in the database. You can't see others goals/ progress or share your progress unless authorized and having an account.

### WebSocket
Each user has goals that they are tracking and can share their progress, as well as, view the progress of others on their goals in realtime. There is also a ranking of those who have spent the most time on their goals that people can see in realtime.

## Sketch
![IMG_5687, Sketch of app design.](https://github.com/user-attachments/assets/401e004e-a216-4d06-af00-a9df5fd98df9)
![IMG_5691](https://github.com/user-attachments/assets/2b884d9c-1ca2-46b9-be01-523c034e38dc)


##HTML Deliverables:
For this deliverable I built out the structure of my application using HTML.

- [x] **HTML pages** - 4 html pages, one for the home and login, another for avatar creation, another for creating goals, and tasks for each goal, and the last one to show rankings and friends rankings.
- [x] **Links** - The login page automatically links to the avatar page. Each page contains links to go to the ranking page, skills page, and avatar page.
- [x] **Text** - Each of the skills, and quests are in text.
- [x] **Images** - There is an image in the home/ index page that shows someone ontop of a mounntain to motivate users. There is also a placeholder image where the users avatar will be.
- [x] **Database** - The rankings, leaderrboards and the friend progress represent data pulled from the database.
- [x] **Login**- Login in the index page, and username displayed on avatar.html page
- [x] **WebSocket** - The leaderboards display realtime leaders.
- [x] **3rd party placeholder** - authenticate login, and email.


## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- [x] **Header, footer, and main content body**:
- [x] **Navigation elements** - I dropped the underlines and changed the color for anchor elements.
- [x] **Responsive to window resizing** - My app looks great on all window sizes and devices
- [x] **Application elements** - Used good contrast and whitespace
- [x] **Application text content** - Consistent fonts
- [x] **Application images** - Have an image that I made as the background of the login/ index page.
- [ ] 

## React deliverable
➡️ The following is an example of the required information for the Startup React deliverable

For this deliverable I used JavaScript and React so that the application completely works for a single user.

 - [x] Bundled and transpiled - done! DId i do this? 
 - [x] Components - Login, skills, avatar, and ranking, the ranking is mock for websocket later and database storage.
 - [x] login - When you press create or the login button it redirects you to the skills page.
 - [x] database - Displayed the the player level and exp points, as well as avatar. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
 - [x] WebSocket - In my rankings pager I use a setInterval function that periodically reads updates from localStorage, making it like websocket.
 - [x] application logic - Have a login component that allows users to login and shows different login states based on wether user has logged in or not. Have a avater desrption component that display the overall discription of the avatar based on user input. Then we have a skills page that allows users to create and complete tasks to earn exp points which are tracked by the rankings page. 
 - [x] React Router - Routing between home, skills, avatar, and ranking components. We 
 - [x] Hooks - the useNavigate hook to redirect user to different page when login, the useState to track username to remember user, and to track the authentication state, and password, and manage avatar customization, tasks state and skill state, and useEffect to manage to broadcast side effects a and skill updates. 


## Service deliverable
➡️ The following is an example of the required information for the Startup Service deliverable

For this deliverable I added backend endpoints that receives votes and returns the voting totals.

 - [x] Node.js/Express HTTP service - done!
 - [x] Static middleware for frontend - yes, with app.use(express.static('public')); in indes.js. 
 - [x] Calls to third party endpoints - Yup, I added a motivational random quote much like the simon one to the login portion of my website. 
 - [x] Backend service endpoints - Placeholders for login that stores the current user on the server.
 - [x] Frontend calls service endpoints - using te fetch command in login. 


DB/Login deliverable
➡️ The following is an example of the required information for the Startup DB/Login deliverable

For this deliverable I associate the votes with the logged in user. I stored the votes in the database.

 MongoDB Atlas database created - done!
 Stores data in MongoDB - done!
 User registration - Creates a new account in the database.
 existing user - Stores the votes under the same user if the user already exists.
 Use MongoDB to store credentials - Stores both user and their votes.
 Restricts functionality - You cannot vote until you have logged in. This is restricted on the frontend only. 😔
WebSocket deliverable
➡️ The following is an example of the required information for the Startup WebSocket deliverable

For this deliverable I used webSocket to update the votes on the frontend in realtime.

 Backend listens for WebSocket connection - done!
 Frontend makes WebSocket connection - done!
 Data sent over WebSocket connection - done!
 WebSocket data displayed - All user votes display in realtime. I'm really proud that this is working. Way cool!

