# Startup
Startup application for BYU CS260
###[notes](https://github.com/jaredjaimes/startup/blob/main/notes.md)

## Elevator Pitch
Have you ever been stuck trying to complete the same goal over and over for years? I have. I also know what it's like to spend hours completeing tasks in video games or learning on duolingo. Well how about if there was an application that made your productivy a game, with achievements and social interactions that make doing tasks in real life fun. You'll be able to do a task in real life and immeaditley receive a reward thorugh the application. You can track hours spent on goals and actualy see progress happpening to encourage you to finish them. Who needs games taking all your time when you can have a game that works for you. 

## Key Features
- Secure login over HTTPS
- Option to customize and create your own avatar
- Option to choose which goals to focus on
- Recieve rewards and items for avatar based on reaching goals
- ability to change goals and track progress.
- ABility to share progress and view progress of friends using the app.
- goals and progress are stored
- goal history and task completion is stored.


## Technologies
#### HTML
4 HTML pages, one to login, another for character creation, another to create tasks/goals that you want to accomplish, and then a page to log an track goals. 

### CSS
Styling avatar, application and tabs styling with contrast, size variation, and good background space. 

### JavaScript
provide the login information, display the avatar creation, display goal options, display goal progress, display other users progress.

### React
Page that displays avatar that reacts to user input for appearance, page that displays goals that react to user input and track them. 

### Web Service
Backend in service with endpoints for:
- Submitting goal information.
- Submitting progress for tracking goals.
- retrieving goal status.
- Display user avatar. 

### DB/Login
Users login info, as well as, their goal history, and progress are stored in the databasw. You can't see others goals/ progress or share your progress unless authorized and having an account.

### WebSocket
Each user has goals that they are tracking and can share their progress, as well as, view the progress of others on their goals in realtime. There is also a ranking of those who have spent the most time on their goals that people can see in realtime.

## Sketch
