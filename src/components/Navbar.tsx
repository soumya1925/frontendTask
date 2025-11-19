import React from "react";
import { useNavigate } from "react-router-dom";
import { LOGOUT_URL } from "../services/api";

interface NavbarProps {
  userName: string;
  token: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, token }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/");
    }
  };

  return (
    <nav className="
      w-full bg-blue-600 text-white px-6 py-4 shadow-md
      flex flex-col gap-3 items-center justify-center
      md:flex-row md:justify-between md:gap-0
    ">
     
      <h1 className="text-2xl font-bold tracking-wide text-center">
        Task Management App
      </h1>

      
      <div className="
        flex flex-col items-center gap-2
        md:flex-row md:gap-4
      ">
        <span className="text-lg font-medium">
          Welcome, {userName}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
