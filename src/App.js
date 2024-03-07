// App.js
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import Membership from "./components/Membership";
import User from "./components/User";

const App = () => {
  // const location = useLocation();

  useEffect(() => {
    const handleMainClick = (event) => {};

    document.addEventListener("click", handleMainClick);

    return () => {
      document.removeEventListener("click", handleMainClick);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/User" element={<User />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
