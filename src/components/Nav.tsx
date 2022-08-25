import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav(): JSX.Element {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink
            to="/twitter-tweet-system/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/twitter-tweet-system/new"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
