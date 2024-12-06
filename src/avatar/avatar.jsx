import React, { useState, useEffect } from "react";
import "./avatar.css";

export function Avatar() {
  // Load avatar from localStorage or set default values
  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem("avatar");
    return savedAvatar
      ? JSON.parse(savedAvatar)
      : { hair: "short", eyes: "blue", gender: "male" }; // Default avatar
  });

  // Options for customization
  const hairOptions = ["short", "long", "curly", "bald"];
  const eyeColors = ["blue", "green", "brown", "hazel"];
  const genderOptions = ["male", "female"];

  // Save avatar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("avatar", JSON.stringify(avatar));
  }, [avatar]);

  // Handlers for changes
  const handleAvatarChange = (key, value) => {
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      [key]: value,
    }));
  };

  return (
    <div className="avatar-container">
      <header>
        <h1>Avatar Customization</h1>
      </header>
      <main>
        <div className="avatar-preview">
          <h2>Your Avatar</h2>
          <p>
            <strong>Hair:</strong> {avatar.hair}
          </p>
          <p>
            <strong>Eyes:</strong> {avatar.eyes}
          </p>
          <p>
            <strong>Gender:</strong> {avatar.gender}
          </p>
        </div>
        <div className="avatar-controls">
          <h3>Customize Your Avatar</h3>
          <div className="control-group">
            <label htmlFor="hair">Hair:</label>
            <select
              id="hair"
              value={avatar.hair}
              onChange={(e) => handleAvatarChange("hair", e.target.value)}
            >
              {hairOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="eyes">Eye Color:</label>
            <select
              id="eyes"
              value={avatar.eyes}
              onChange={(e) => handleAvatarChange("eyes", e.target.value)}
            >
              {eyeColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={avatar.gender}
              onChange={(e) => handleAvatarChange("gender", e.target.value)}
            >
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Avatar Builder</p>
      </footer>
    </div>
  );
}

