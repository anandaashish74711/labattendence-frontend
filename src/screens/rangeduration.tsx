import { Search, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useGetAttendanceByDateRangeQuery } from '../redux/features/apiSlice';
import DatePicker from './calender';

const formatDate = (isoString: string) => {
  return format(new Date(isoString), 'dd MMM yyyy');
};

const EmployeeAttendancerange = () => {
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // Skip the query until both dates are selected
  const { data: employees, isLoading, isError } = useGetAttendanceByDateRangeQuery(
    { startDate: fromDate ?? '', endDate: toDate ?? '' },
    { skip: !shouldFetch }
  );

  // Check if we can fetch data whenever dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      
      // Only fetch if end date is same as or after start date
      if (end >= start) {
        setShouldFetch(true);
      } else {
        setShouldFetch(false);
      }
    } else {
      setShouldFetch(false);
    }
  }, [fromDate, toDate]);

  const handleFromDateChange = (date: Date) => {
    setFromDate(format(date, 'yyyy-MM-dd'));
  };

  const handleToDateChange = (date: Date) => {
    setToDate(format(date, 'yyyy-MM-dd'));
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
          
          <span><DatePicker onDateSelect={handleFromDateChange} /></span>
          <span><DatePicker onDateSelect={handleToDateChange} /></span>
          
          <button 
            className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
              shouldFetch 
                ? 'border-blue-500 text-blue-500' 
                : 'border-gray-200 text-gray-400'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {!shouldFetch ? (
        <div className="p-6 text-center text-gray-500">
          Please select both start and end dates to view attendance data.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Emp. ID</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Employee Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Days Present</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Days Absent</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Total Hours</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Avg. Hours/Day</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Clock-in & Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees?.records?.length > 0 ? (
                employees.records.map((employee: any) => (
                  <tr key={employee.userid} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="p-4 text-sm text-gray-900">{employee.userid}</td>
                    <td className="p-4 text-sm text-gray-900">{employee.username}</td>
                    <td className="p-4 text-sm text-gray-900">{employee.days_present}</td>
                    <td className="p-4 text-sm text-gray-900">{employee.days_absent}</td>
                    <td className="p-4 text-sm text-gray-900">{employee.total_hours}</td>
                    <td className="p-4 text-sm text-gray-900">{employee.average_hours_per_day}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-red-500">{formatDate(employee.first_checkin)}</span>
                        <span className="text-sm text-gray-400">—</span>
                        <span className="text-sm text-green-500">{formatDate(employee.last_checkout)}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No users are present.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendancerange;