import { configureStore } from '@reduxjs/toolkit';
import ActiveTab from './reducer/TabReducer';
import Database from './reducer/DatabaseReducer';

const store = configureStore({
  reducer: {
    ActiveTab,
    Database
  },
});

export default store;
