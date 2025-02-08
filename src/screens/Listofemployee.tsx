import { Search, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useGetAttendanceByDateQuery } from '../redux/features/apiSlice';
import DatePicker from './calender';

const formatTime = (isoString: string) => {
  return format(new Date(isoString), 'h:mm a'); 
};

const EmployeeAttendance = () => {
  // Initialize with current date in yyyy-MM-dd format
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Set current date on component mount
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setSelectedDate(today);
  }, []);

  // Fetch data based on the selected date
  const { data: employees, isLoading, isError } = useGetAttendanceByDateQuery(
    // If no date is selected (initial render), use current date
    selectedDate || format(new Date(), 'yyyy-MM-dd')
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(format(date, 'yyyy-MM-dd'));
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 flex justify-center items-center">
        <div className="text-gray-600">Loading attendance data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 flex justify-center items-center">
        <div className="text-red-600">Error loading attendance data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow">
      {/* Header with filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <select className="appearance-none bg-gray-50 rounded-md px-4 py-2 pr-8 border border-gray-200">
            <option>All</option>
            <option>Present</option>
            <option>Absent</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md">
            <span><DatePicker onDateSelect={handleDateChange} /></span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
     <table className="w-full">
  <thead className="bg-gray-50">
    <tr>
      <th className="w-8 p-4 text-left">
        <input type="checkbox" className="rounded border-gray-300" />
      </th>
      <th className="p-4 text-left text-sm font-medium text-gray-600">Emp. ID</th>
      <th className="p-4 text-left text-sm font-medium text-gray-600">Employee Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-600">Clock-in & Out</th>
              
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">
    {employees?.records?.length > 0 ? (
      employees.records.map((employee: any) => (
        <tr key={employee.id} className="hover:bg-gray-50">
          <td className="p-4">
            <input type="checkbox" className="rounded border-gray-300" />
          </td>
          <td className="p-4 text-sm text-gray-900">{employee.userid}</td>
          <td className="p-4 text-sm text-gray-900">{employee.username}</td>
          <td className="p-4 text-sm text-gray-900">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-red-500">{formatTime(employee.checkin)}</span>
              <span className="text-sm text-gray-400">{employee.duration || '—'}</span>
              <span className="text-sm text-green-500">{formatTime(employee.checkout)}</span>
             
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={4} className="p-6 text-center text-gray-500">
          No attendance records found for the selected date.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default EmployeeAttendance;