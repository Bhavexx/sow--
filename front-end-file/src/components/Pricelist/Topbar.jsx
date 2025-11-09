import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Price List</h2>
      </div>
      <div className="topbar-right">
        <button className="notification-btn">🔔</button>
        <div className="user-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="profile-pic"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
