import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authslice"; // Import the logout action
import { Button } from "@/components/ui/button";
import { CalendarCheck, CalendarRange, LogOut } from "lucide-react";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Card Container */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-xl text-center">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Employee Attendance System
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Track employee attendance efficiently with ease.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/employee">
            <Button className="flex items-center gap-2 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-all duration-300">
              <CalendarCheck size={20} /> Daily Attendance
            </Button>
          </Link>

          <Link to="/employee/range">
            <Button className="flex items-center gap-2 px-6 py-3 text-lg bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition-all duration-300">
              <CalendarRange size={20} /> Attendance Range
            </Button>
          </Link>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-300" />

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 text-lg bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition-all duration-300 w-full"
        >
          <LogOut size={20} /> Logout
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Employee Attendance System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default HomePage;
