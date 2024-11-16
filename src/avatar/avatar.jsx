import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './avatar.css';

export function Avatar() {
  return (
    <main>
      {/* Main content of the document */}
      <h2>Hello, Jared Jaimes</h2>
      <hr />

      <div className="form-group">
        <label htmlFor="gender" className="form-label">Gender:</label>
        <select id="gender" className="form-control">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="hairStyle" className="form-label">Hair Style:</label>
        <select id="hairStyle" className="form-control">
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="curly">Curly</option>
          <option value="bald">Bald</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="eyeColor" className="form-label">Eye Color:</label>
        <input type="color" id="eyeColor" className="form-control" defaultValue="#000000" />
      </div>

      <div className="form-group">
        <label htmlFor="build" className="form-label">Build:</label>
        <select id="build" className="form-control">
          <option value="tall">Tall</option>
          <option value="short">Short</option>
          <option value="bulky">Bulky</option>
          <option value="fat">Fat</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="skinColor" className="form-label">Skin Color:</label>
        <input type="color" id="skinColor" className="form-control" defaultValue="#000000" />
      </div>

      <div className="image-container">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAe1BMVEX..."
          alt="Man on mountain"
          className="avatar-image"
        />
      </div>
    </main>
  );
}
