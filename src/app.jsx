import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Login } from './login/login';
// import { Avatar } from './avatar/avatar';
import { Rankings } from './rankings/rankings';
import { Skills } from './skills/skills';
import { AuthState } from './login/authState';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>Olaga.io<sup>&reg;</sup></h1>
          <nav>
            <menu>
              <button>
                <NavLink className="nav-button" to="/">
                  Home
                </NavLink>
              </button>
              {/* Conditional rendering for authenticated routes */}
              {authState === AuthState.Authenticated && (
                <>
                  {/* <button>
                    <NavLink className="nav-button" to="avatar">
                      Avatar
                    </NavLink>
                  </button> */}
                  <button>
                    <NavLink className="nav-button" to="skills">
                      Skills
                    </NavLink>
                  </button>
                  <button>
                    <NavLink className="nav-button" to="rankings">
                      Rankings
                    </NavLink>
                  </button>
                </>
              )}
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(newUserName, newAuthState) => {
                  setAuthState(newAuthState);
                  setUserName(newUserName);
                  localStorage.setItem('userName', newUserName);
                }}
              />
            }
            exact
          />
          {/* Authenticated Routes */}
          {authState === AuthState.Authenticated && (
            <>
              {/* <Route path="/avatar" element={<Avatar />} /> */}
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/skills" element={<Skills />} />
            </>
          )}
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Jared Jaimes</span>
          <br />
          <NavLink to="https://github.com/jaredjaimes/startup.git">GitHub</NavLink>
        </footer>
      </div>
    </BrowserRouter>
  );

  function NotFound() {
    return (
      <main className="container-fluid bg-secondary text-center">
        404: Return to sender. Address unknown.
      </main>
    );
  }
}

//---------------------------------------------------------
// import React from 'react';
// import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

// import { Login } from './login/login';
// import { Avatar } from './avatar/avatar';
// import { Rankings } from './rankings/rankings';
// import { Skills } from './skills/skills';
// import { AuthState } from './login/authState';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './app.css';

// export default function App() {
//   const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
//   const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
//   const [authState, setAuthState] = React.useState(currentAuthState);

//   return (
//     <BrowserRouter>
//       <div className='body bg-dark text-light'>
//         <header className='container-fluid'>
//           <nav className='navbar fixed-top navbar-dark'>
//             <div className='navbar-brand'>
//               Simon<sup>&reg;</sup>
//             </div>
//             <menu className='navbar-nav'>
//               <li className='nav-item'>
//                 <NavLink className='nav-link' to=''>
//                   Login
//                 </NavLink>
//               </li>
//               {authState === AuthState.Authenticated && (
//                 <li className='nav-item'>
//                     <NavLink className="nav-link" to="avatar">
//                       Avatar
//                     </NavLink>
//                 </li>   
//               )}
//               {authState === AuthState.Authenticated && (
//                 <li className='nav-item'>
//                   <NavLink className="nav-link" to="skills">
//                       Skills
//                   </NavLink>
//                 </li>
//               )}
//               {authState === AuthState.Authenticated && (
//                 <li className='nav-item'>
//                   <NavLink className="nav-link" to="rankings">
//                       Rankings
//                   </NavLink>
//                 </li>
//               )}
//             </menu>
//           </nav>
//           <hr />
//         </header>

//         <Routes>
//           {/* Login Route */}
//           <Route
//             path="/"
//             element={
//               <Login
//                 userName={userName}
//                 authState={authState}
//                 onAuthChange={(userName, authState) => {
//                   setAuthState(authState);
//                   setUserName(userName);
//                 }}
//               />
//             }
//             exact
//           />
//             <Route path="/avatar" element={<Avatar userName={userName} />} />
//             <Route path="/rankings" element={<Rankings />} />
//             <Route path="/skills" element={<Skills />} />
//             <Route path='*' element={<NotFound />} />
//         </Routes>

//         <footer>
//           <hr />
//           <span className="text-reset">Jared Jaimes</span>
//           <br />
//           <NavLink to="https://github.com/jaredjaimes/startup.git">GitHub</NavLink>
//         </footer>
//       </div>
//     </BrowserRouter>
//   );

//   function NotFound() {
//     return (
//       <main className="container-fluid bg-secondary text-center">
//         404: Return to sender. Address unknown.
//       </main>
//     );
//   }
// }