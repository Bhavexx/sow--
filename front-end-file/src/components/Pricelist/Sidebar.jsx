import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User"
          className="user-avatar"
        />
      </div>
      <ul className="menu">
        <li>Invoices</li>
        <li>Customers</li>
        <li>My Business</li>
        <li>Invoice Journal</li>
        <li><Link to="/pricelist">Price List</Link></li>
        <li>Multiple Invoicing</li>
        <li>Unpaid Invoices</li>
        <li>Offer</li>
        <li>Inventory Control</li>
        <li>Member Invoicing</li>
        <li>Import/Export</li>
        <li>Log out</li>
      </ul>
    </div>
  );
};

export default Sidebar;