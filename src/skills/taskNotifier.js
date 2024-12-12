//defines the types of events that can occur
const TaskEvent = {
    System: 'system',//System-level events like connection/disconnection
    End: 'taskCompleted',// Signals that a task was completed
    Start: 'taskStarted',// Signals the creation of a task
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;// Sender of the event
        this.type = type;// Type of the event (e.g., 'system', 'taskCompleted', etc.)
        this.value = value;// Payload or data associated with the event
    }
}

class TaskEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        //Automatically adjusts the protocol (ws or wss) based on the current page's protocol & Connects to the WebSocket server at the /ws endpoint.
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        //onopen: Triggered when the WebSocket connection is established.
        this.socket.onopen = (event) => {
          this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
        };
        //onclose: Triggered when the connection is closed.
        this.socket.onclose = (event) => {
          this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
        };
        //onmessage: Processes incoming messages from the server.
        this.socket.onmessage = async (msg) => {
          try {
            const event = JSON.parse(await msg.data.text());
            this.receiveEvent(event);
          } catch {}
        };
      }
    
      //sends an event to the webSocket server.
      broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
        this.socket.addEventListener('open', function (event){
          socket.send(message);
          
        });
      }
    
      //Adding handlers allows components to register functions to handle events.
      addHandler(handler) {
        this.handlers.push(handler);
      }
    
      // Removes a previously registered handler.
      removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
      }
    
      //Dispatches an event to all registered handlers.
      receiveEvent(event) {
        this.events.push(event);
        this.events.forEach((e) => {
          this.handlers.forEach((handler) => {
            handler(e);
          });
        });
      }
    }

    const TaskNotifier = new TaskEventNotifier();
    export { TaskEvent, TaskNotifier};