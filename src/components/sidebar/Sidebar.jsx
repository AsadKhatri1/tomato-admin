import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink className="sidebar-option" to="/add">
          <img className="icon" src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink className="sidebar-option" to="/list">
          <img className="icon" src={assets.list} alt="" />
          <p>Food List</p>
        </NavLink>
        <NavLink className="sidebar-option" to="/orders">
          <img className="icon" src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
