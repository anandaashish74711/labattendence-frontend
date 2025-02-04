
import './App.css'


import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage.tsx';
import EmployeeAttendance from './screens/Listofemployee.tsx';  
import EmployeeAttendanceRange from './screens/rangeduration.tsx';  
import NotFoundPage from './screens/Notfound.tsx';



function App() {


  return (
 <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/employee" element={<EmployeeAttendance />} />
      <Route path="/employee/range" element={<EmployeeAttendanceRange />} />
     
      <Route path="*" element={<NotFoundPage />} /> {/* 404 Page */}
    </Routes>

  )
}

export default App
