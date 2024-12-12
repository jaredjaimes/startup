const TaskEvent = {
  System: 'system',
  End: 'taskCompleted',
  Start: 'taskStarted',
};

class EventMessage {
  constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
  }
}

class TaskEventNotifier {
  events = [];
  handlers = [];
  messageQueue = [];

  constructor() {
      let port = 4001; // Match backend server port
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

      // Triggered when the WebSocket connection is established
      this.socket.onopen = () => {
          console.log("WebSocket connected");
          while (this.messageQueue.length > 0) {
              this.socket.send(this.messageQueue.shift());
          }
          this.receiveEvent(new EventMessage('System', TaskEvent.System, { msg: 'connected' }));
      };

      // Triggered when the WebSocket connection is closed
      this.socket.onclose = () => {
          console.warn("WebSocket disconnected");
          this.receiveEvent(new EventMessage('System', TaskEvent.System, { msg: 'disconnected' }));
      };

      // Processes incoming messages from the server
      this.socket.onmessage = async (msg) => {
          try {
              // Handle Blob data and convert to text if necessary
              const data = msg.data instanceof Blob ? await msg.data.text() : msg.data;
              const event = JSON.parse(data); // Parse the JSON data
              this.receiveEvent(event);
          } catch (err) {
              console.error("Failed to parse WebSocket message:", err);
          }
      };

      // Triggered if there's a WebSocket error
      this.socket.onerror = (err) => {
          console.error("WebSocket error observed:", err);
      };
  }

  // Broadcasts an event to the WebSocket server
  broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
      const message = JSON.stringify(event);

      if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(message);
      } else if (this.socket.readyState === WebSocket.CONNECTING) {
          this.messageQueue.push(message);
          this.socket.addEventListener('open', () => {
              this.socket.send(message);
          }, { once: true });
      } else {
          console.error("WebSocket is not in a state to send messages.");
      }
  }

  // Adds a handler to listen for incoming events
  addHandler(handler) {
      this.handlers.push(handler);
  }

  // Removes a previously registered handler
  removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
  }

  // Dispatches an event to all registered handlers
  receiveEvent(event) {
      this.events.push(event);
      this.handlers.forEach((handler) => handler(event));
  }
}

// Create a singleton instance of TaskEventNotifier
const TaskNotifier = new TaskEventNotifier();
export { TaskEvent, TaskNotifier };






//Before the fixing code to add message queue
// //defines the types of events that can occur
// const TaskEvent = {
//     System: 'system',//System-level events like connection/disconnection
//     End: 'taskCompleted',// Signals that a task was completed
//     Start: 'taskStarted',// Signals the creation of a task
// };

// class EventMessage {
//     constructor(from, type, value) {
//         this.from = from;// Sender of the event
//         this.type = type;// Type of the event (e.g., 'system', 'taskCompleted', etc.)
//         this.value = value;// Payload or data associated with the event
//     }
// }

// class TaskEventNotifier {
//     events = [];
//     handlers = [];

//     constructor() {
//         let port = window.location.port;
//         //Automatically adjusts the protocol (ws or wss) based on the current page's protocol & Connects to the WebSocket server at the /ws endpoint.
//         const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//         this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
//         //onopen: Triggered when the WebSocket connection is established.
//         this.socket.onopen = (event) => {
//           this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
//         };
//         //onclose: Triggered when the connection is closed.
//         this.socket.onclose = (event) => {
//           this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
//         };
//         //onmessage: Processes incoming messages from the server.
//         this.socket.onmessage = async (msg) => {
//           try {
//             const event = JSON.parse(await msg.data.text());
//             this.receiveEvent(event);
//           } catch {}
//         };
//       }
    
//       //sends an event to the webSocket server.
//       // broadcastEvent(from, type, value) {
//       //   const event = new EventMessage(from, type, value);
//       //   this.socket.send(JSON.stringify(event));
//       //   this.socket.addEventListener('open', function (event){
//       //     socket.send(message);
          
//       //   });
//       //   socket.addEventListener('error', function (event) {
//       //     console.error("WebSocket error observed:", event);
//       //   });

//       //   if (this.socket.readyState === WebSocket.OPEN){
//       //     this.socket.send(message);
//       //   } else {
//       //     this.socket.addEventListener('open', function (event){
//       //       socket.send(message);
//       //     });
//       //   }
//       // }
//       broadcastEvent(from, type, value) {
//         const event = new EventMessage(from, type, value);
//         const message = JSON.stringify(event);
      
//         if (this.socket.readyState === WebSocket.OPEN) {
//           this.socket.send(message);
//         } else if (this.socket.readyState === WebSocket.CONNECTING) {
//           this.socket.addEventListener('open', () => {
//             this.socket.send(message);
//           }, { once: true }); // Ensure the listener is triggered only once
//         } else {
//           console.error("WebSocket is not in a state to send messages.");
//         }
//       }
    
//       //Adding handlers allows components to register functions to handle events.
//       addHandler(handler) {
//         this.handlers.push(handler);
//       }
    
//       // Removes a previously registered handler.
//       removeHandler(handler) {
//         this.handlers.filter((h) => h !== handler);
//       }
    
//       //Dispatches an event to all registered handlers.
//       receiveEvent(event) {
//         this.events.push(event);
//         this.events.forEach((e) => {
//           this.handlers.forEach((handler) => {
//             handler(e);
//           });
//         });
//       }
//     }

//     const TaskNotifier = new TaskEventNotifier();
//     export { TaskEvent, TaskNotifier};