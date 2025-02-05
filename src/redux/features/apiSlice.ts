import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.2216.208:5000/' }), // Your base URL
  endpoints: (builder) => ({
    getData: builder.query<any, void>({
      query: () => '/attendance',
    }),
    getAttendanceByDate: builder.query<any, string>({
      query: (date) => `/attendance-by-date?date=${date}`, // Fetch attendance by date
    }),
    
    getAttendanceByDateRange: builder.query<any, { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) => `/total-hours-by-date-range?startDate=${startDate}&endDate=${endDate}`,
    }),
  
  }),

});

// Export hooks for usage in functional components
export const { useGetDataQuery, useGetAttendanceByDateQuery ,useGetAttendanceByDateRangeQuery } = apiSlice;
