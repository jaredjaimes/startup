// import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
// import { Login } from './login/login';
// import { Avatar } from './avatar/avatar';
// import { Rankings } from './rankings/rankings';
// import { Skills } from './skills/skills';

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './app.css';

// export default function App() {
//   return (

//     <BrowserRouter>
//         <div>

//             <header>
//                 <h1>Olaga.io<sup>&reg;</sup></h1>
//                 <nav>
//                     <menu>
//                         <button><NavLink className= "nav-button" to=''>Home</NavLink></button>
//                         <button><NavLink className= "nav-button" to='avatar'>Avatar</NavLink></button>
//                         <button><NavLink className= "nav-button" to='skills'>Skills</NavLink></button>
//                         <button><NavLink className= "nav-button" to='rankings'>Rankings</NavLink></button>
//                     </menu>
//                 </nav>
//                 <hr />
//             </header>

//             <Routes>
//                 <Route path='/' element={<Login />} exact />
//                 <Route path='/avatar' element={<Avatar/>} />
//                 <Route path='/rankings' element={<Rankings />} />
//                 <Route path='/skills' element={<Skills />} />
//                 <Route path='*' element={<NotFound />} />
//             </Routes>

//             <footer>
//                 <hr />
//                 <span className="text-reset">Jared Jaimes</span>
//                 <br />
//                 <NavLink to="https://github.com/jaredjaimes/startup.git">GitHub</NavLink>
//             </footer>

//         </div>
//     </BrowserRouter>
    
//   );

//   function NotFound() {
//     return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
//   }
// }

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Avatar } from './avatar/avatar';
import { Rankings } from './rankings/rankings';
import { Skills } from './skills/skills';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>Olaga.io<sup>&reg;</sup></h1>
          <nav>
            <menu>
              <button>
                <NavLink className="nav-button" to="">
                  Home
                </NavLink>
              </button>
              <button>
                <NavLink className="nav-button" to="avatar">
                  Avatar
                </NavLink>
              </button>
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
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/skills" element={<Skills />} />
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
