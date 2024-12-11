import React from 'react';

import { TaskEvent , TaskNotifier } from './taskNotifier';
import './users.css';

export function Users(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        TaskNotifier.addHandler(handleTaskEvent);
    
        return () => {
          TaskNotifier.removeHandler(handleTaskEvent);
        };
      });

    function handleTaskEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === TaskEvent.End) {
                message = `completed a task`;
            } else if (event.type === TaskEvent.Start) {
                message = `started a new task`;
            } else if (event.type === TaskEvent.System) {
                message = event.value.msg;
            }

      messageArray.push(
        <div key={i} className='event'>
          <span className={'player-event'}>{event.from.split('@')[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return(
    <div className= 'users'>
        User
        <span className='user-name'>{userName}</span>
        <div id='user-messages'>{createMessageArray()}</div>
    </div>
  );

}
