import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import HomePage from "./screens/HomePage.tsx";
import EmployeeAttendance from "./screens/Listofemployee.tsx";
import EmployeeAttendanceRange from "./screens/rangeduration.tsx";
import NotFoundPage from "./screens/Notfound.tsx";
import LoginPage from "./screens/login.tsx";
import ProtectedRoute from "../src/libs/utils/ProtectedRoute.tsx";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/range"
        element={
          <ProtectedRoute>
            <EmployeeAttendanceRange />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
