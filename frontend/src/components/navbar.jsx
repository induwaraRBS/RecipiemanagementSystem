import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/userauth");
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/createrecipies">Add Recipies</Link>
      {!cookies.access_token ? (
        <Link to="/userauth">User</Link>
      ) : (
        <Link onClick={logout}>Logout</Link>
      )}
      <Link to="/" onClick={() => window.location.reload()}>
        Refresh Page
      </Link>
    </div>
  );
};

export default Navbar;
