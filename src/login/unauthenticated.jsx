// import React from 'react';

// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';
// import { MessageDialog } from './messageDialog';

// export function Unauthenticated(props) {
//   const [userName, setUserName] = React.useState(props.userName);
//   const [password, setPassword] = React.useState('');
//   const [displayError, setDisplayError] = React.useState(null);
//   const navigate = useNavigate(); // gets the navigate function from react-router-dom.

//   async function loginUser() {
//     loginOrCreate(`/api/auth/login`);
//   }

//   async function createUser() {
//     loginOrCreate(`/api/auth/create`);
//   }

//   async function loginOrCreate(endpoint) {
//     const response = await fetch(endpoint, {
//       method: 'post',
//       body: JSON.stringify({ email: userName, password: password }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//     if (response?.status === 200) {
//       localStorage.setItem('userName', userName);
//       props.onLogin(userName);
//       navigate('/skills');
//     } else {
//       const body = await response.json();
//       setDisplayError(`⚠ Error: ${body.msg}`);
//     }
//   }

//   return (
//     <>
//       <div>
//         <div className='input-group mb-3'>
//           <span className='input-group-text'>@</span>
//           <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
//         </div>
//         <div className='input-group mb-3'>
//           <span className='input-group-text'>🔒</span>
//           <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
//         </div>
//         <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
//           Login
//         </Button>
//         <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
//           Create
//         </Button>
//       </div>

//       <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
//     </>
//   );
// }

// import React from 'react';

// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';
// import { MessageDialog } from './messageDialog';

// export function Unauthenticated(props) {
//   const [userName, setUserName] = React.useState(props.userName);
//   const [password, setPassword] = React.useState('');
//   const [displayError, setDisplayError] = React.useState(null);
//   const navigate = useNavigate();

//   async function loginUser() {
//     await loginOrCreate(`/api/auth/login`);
//   }

//   async function createUser() {
//     await loginOrCreate(`/api/auth/create`);
//   }

//   async function loginOrCreate(endpoint) {
//     try {
//       const response = await fetch(endpoint, {
//         method: 'post',
//         body: JSON.stringify({ email: userName, password: password }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       });

//       if (response.ok) {
//         localStorage.setItem('userName', userName);
//         props.onLogin(userName);
//         navigate('/skills');
//       } else {
//         const body = await response.json();
//         setDisplayError(`⚠ Error: ${body.msg}`);
//       }
//     } catch (error) {
//       setDisplayError(`⚠ Error: ${error.message}`);
//     }
//   }

//   return (
//     <>
//       <div>
//         <div className="input-group mb-3">
//           <span className="input-group-text">@</span>
//           <input
//             className="form-control"
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             placeholder="your@email.com"
//           />
//         </div>
//         <div className="input-group mb-3">
//           <span className="input-group-text">🔒</span>
//           <input
//             className="form-control"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="password"
//           />
//         </div>
//         <Button variant="primary" onClick={loginUser} disabled={!userName || !password}>
//           Login
//         </Button>
//         <Button variant="secondary" onClick={createUser} disabled={!userName || !password}>
//           Create
//         </Button>
//       </div>
//       {displayError && <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />}
//     </>
//   );
// }

import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function loginUser() {
    await loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    await loginOrCreate('/api/auth/create');
  }

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ email: userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userName', userName); // Store username in localStorage
        props.onLogin(userName); // Call the onLogin handler with the username
        navigate('/skills'); // Redirect to the skills page
      } else {
        const errorResponse = await response.json();
        setDisplayError(`⚠ Error: ${errorResponse.msg}`);
      }
    } catch (error) {
      setDisplayError(`⚠ Error: ${error.message}`);
    }
  }

  return (
    <>
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <Button variant="primary" onClick={loginUser} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant="secondary" onClick={createUser} disabled={!userName || !password}>
          Create Account
        </Button>
      </div>
      {displayError && <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />}
    </>
  );
}
