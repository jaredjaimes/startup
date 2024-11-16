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
                        <button><NavLink className= "nav-button" to="index.html">Home</a></button>
                        <button><NavLink className= "nav-button" to="avatar.html">Avatar</a></button>
                        <button><NavLink className= "nav-button" to="skills.html">Skills</a></button>
                        <button><NavLink className= "nav-button" to="rankings.html">Rankings</a></button>
                    </menu>
                </nav>
                <hr />
            </header>

                <main> App componenets go here</main>

            <footer>
                <hr />
                <span className="text-reset">Jared Jaimes</span>
                <br />
                <NavLink to="https://github.com/jaredjaimes/startup.git">GitHub</a>
            </footer>

        </div>
    </BrowserRouter>
    
  );
}