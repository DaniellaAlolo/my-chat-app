import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Style.module.css";

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
    <div className={styles.container}>
      <div>
        <SideNav />
      </div>
      <h1>Profile</h1>
      <div className={styles.userInfoWrapper}>
        <p className={styles.userInfo}>Update your profile delow</p>
        <span>
          <img
            src={user.avatar}
            alt="User Avatar"
            className={styles.profileAvatar}
          />
        </span>
      </div>
      <form onSubmit={handleUpdateProfile} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Avatar:</label>
          <input
            type="text"
            value={avatar}
            className={styles.input}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Update Profile
        </button>
      </form>

      <button onClick={handleDeleteAccount} className={styles.deleteAccountBtn}>
        Delete Account
      </button>
      {/*<button className={styles.chatBtn} onClick={() => navigate("/chat")}>
        Chat
      </button> */}
    </div>
  );
};

export default Profile;
