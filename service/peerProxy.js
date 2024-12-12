const { WebSocketServer } = require('ws');
const uuid = require('uuid');

const HEARTBEAT_INTERVAL = 10000; // Define the interval in milliseconds

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

    if (pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Notify the client of the heartbeat interval
    ws.send(JSON.stringify({ type: 'heartbeat', interval: HEARTBEAT_INTERVAL }));

    ws.on('message', (data) => {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    ws.on('close', () => {
      const pos = connections.findIndex((c) => c.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, HEARTBEAT_INTERVAL);

  wss.on('error', (err) => {
    console.error('WebSocket Server Error:', err);
  });
}

module.exports = { peerProxy };


//after it works
// const { WebSocketServer } = require('ws');
// const uuid = require('uuid');

// function peerProxy(httpServer) {
//   const wss = new WebSocketServer({ noServer: true });

//   // Handle the protocol upgrade from HTTP to WebSocket
//   httpServer.on('upgrade', (request, socket, head) => {
//     const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

//     if (pathname === '/ws') {
//       wss.handleUpgrade(request, socket, head, (ws) => {
//         wss.emit('connection', ws, request);
//       });
//     } else {
//       socket.destroy();
//     }
//   });

//   let connections = [];

//   wss.on('connection', (ws) => {
//     const connection = { id: uuid.v4(), alive: true, ws: ws };
//     connections.push(connection);

//     ws.on('message', (data) => {
//       connections.forEach((c) => {
//         if (c.id !== connection.id) {
//           c.ws.send(data);
//         }
//       });
//     });

//     ws.on('close', () => {
//       const pos = connections.findIndex((c) => c.id === connection.id);
//       if (pos >= 0) {
//         connections.splice(pos, 1);
//       }
//     });

//     ws.on('pong', () => {
//       connection.alive = true;
//     });
//   });

//   setInterval(() => {
//     connections.forEach((c) => {
//       if (!c.alive) {
//         c.ws.terminate();
//       } else {
//         c.alive = false;
//         c.ws.ping();
//       }
//     });
//   }, 10000);

//   wss.on('error', (err) => {
//     console.error('WebSocket Server Error:', err);
//   });
// }

// module.exports = { peerProxy };




//Before big changes
// const { WebSocketServer } = require('ws');
// const uuid = require('uuid');

// function peerProxy(httpServer) {
//   // Create a websocket object
//   const wss = new WebSocketServer({ noServer: true });

//   // Handle the protocol upgrade from HTTP to WebSocket
//   httpServer.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, function done(ws) {
//       wss.emit('connection', ws, request);
//     });
//   });

//   // Keep track of all the connections so we can forward messages
//   let connections = [];

//   wss.on('connection', (ws) => {
//     const connection = { id: uuid.v4(), alive: true, ws: ws };
//     connections.push(connection);

//     // Forward messages to everyone except the sender
//     ws.on('message', function message(data) {
//       connections.forEach((c) => {
//         if (c.id !== connection.id) {
//           c.ws.send(data);
//         }
//       });
//     });

//     // Remove the closed connection so we don't try to forward anymore
//     ws.on('close', () => {
//       const pos = connections.findIndex((o, i) => o.id === connection.id);

//       if (pos >= 0) {
//         connections.splice(pos, 1);
//       }
//     });

//     // Respond to pong messages by marking the connection alive
//     ws.on('pong', () => {
//       connection.alive = true;
//     });
//   });

//   // Keep active connections alive
//   setInterval(() => {
//     connections.forEach((c) => {
//       // Kill any connection that didn't respond to the ping last time
//       if (!c.alive) {
//         c.ws.terminate();
//       } else {
//         c.alive = false;
//         c.ws.ping();
//       }
//     });
//   }, 10000);
// }

// module.exports = { peerProxy };