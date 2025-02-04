import { configureStore } from '@reduxjs/toolkit';
// Import your slice (we'll create one next)
import { apiSlice } from './features/apiSlice';

export const store = configureStore({
  reducer: {
    // If you're using RTK Query (like for apiSlice), add the reducer path
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // If you're using middleware like RTK Query, add it to the middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
