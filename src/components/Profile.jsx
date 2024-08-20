import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateUserProfile, deleteUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(user.user);
    setEmail(user.email);
    setAvatar(user.avatar);
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { username, email, avatar };
    updateUserProfile(updatedUser);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      deleteUser();
    }
  };

  return (
    <div className="profile-container">
      <div className="header">
        <SideNav /> {/* Lägg till SideNav här för att alltid visa den */}
      </div>
      <h1>Profile</h1>
      <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      <p>{user.user}</p>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleDeleteAccount} style={{ color: "red" }}>
        Delete Account
      </button>
      <button className="btn-regiter" onClick={() => navigate("/chat")}>
        Chat
      </button>
    </div>
  );
};

export default Profile;
