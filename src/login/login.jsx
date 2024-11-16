import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export function Login() {
  return (
    <main>
      <div className="form-container">
        <p>Login to make your goals a reality</p>
        <form method="get" action="avatar.html">
          <div className="input-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <span>@</span>
            <input type="email" id="email" name="email" className="form-control" placeholder="your@email.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <span>🔒</span>
            <input type="password" id="password" name="password" className="form-control" placeholder="password" required />
          </div>
          <div className="input-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <span>👤</span>
            <input type="text" id="name" name="name" className="form-control" placeholder="First name" />
          </div>
          <div className="login-buttons">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary">Create</button>
          </div>
        </form>
      </div>
    </main>
  );
}
