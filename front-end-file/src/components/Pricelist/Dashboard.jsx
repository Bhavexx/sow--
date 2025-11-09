import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <h1>Welcome to Dashboard</h1>
          <p>This is your main dashboard area.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
