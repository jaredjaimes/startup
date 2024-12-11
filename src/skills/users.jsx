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
        //mock code
    }
}
