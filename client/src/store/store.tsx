import { configureStore } from '@reduxjs/toolkit';
import reducer from '../slice/slice';


export const store = configureStore({
  reducer: {
    state : reducer,
  },
  preloadedState: window.localStorage.state ? JSON.parse(window.localStorage.state) : {}
});




export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;