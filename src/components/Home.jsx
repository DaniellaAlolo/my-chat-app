import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <h1 className="h1-main">HOME</h1>
      <button className="btn-login" onClick={() => navigate("/login")}>
         Login
      </button>
      <button className="btn-register" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
}

export default Home;
