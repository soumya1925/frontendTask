import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TaskTable from "../components/TaskTable";

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = location.state?.token;
  const user = location.state?.user;

  if (!token || !user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={user.name} token={token} />

      <main className="flex-1 p-6">
        <TaskTable token={token} />
      </main>

      <Footer />
    </div>
  );
}
