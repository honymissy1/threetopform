import { configureStore } from '@reduxjs/toolkit';
import ActiveTab from './reducer/TabReducer';


const store = configureStore({
  reducer: {
    ActiveTab
  },
});

export default store;
