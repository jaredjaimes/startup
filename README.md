# Startup
Startup application for BYU CS260
###[notes](https://github.com/jaredjaimes/startup/blob/main/notes.md)

## Elevator Pitch
Have you ever been stuck trying to complete the same life goal over and over for years? Maybe you've tried to save a certain amount of money. Maybe you've tried to be in better shape, or have a better social life,, but time and time again you forgot, or just lost motivation. Well how about if I told you theree was an app that made completeing tasks addicting like playing video games or learning languages on duolingo. Well welcome to Life.io, this app alows user to create a virtual avatar that receives in app rewards when you complete a task, and lets you see your goal progress, so you actually see benefits immeadiatley after completeing a task. Making completing goals absolutely satisffying. 


## Key Features
- Secure login over HTTPS
- Option to customize and create your own avatar
- Option to choose which goals to focus on
- Recieve rewards and items for avatar based on reaching goals
- ability to change goals and track progress.
- ABility to share progress and view progress of friends using the app.
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
