import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN UI
import { CalendarCheck, CalendarRange } from "lucide-react"; // Icons for better UX

const HomePage: React.FC = () => {
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
