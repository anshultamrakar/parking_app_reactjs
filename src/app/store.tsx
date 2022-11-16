import { configureStore } from '@reduxjs/toolkit';
import parkingReducer from '../Components/ParkingSlots /ParkingSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  parking: parkingReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
  devTools: true
})

export default store;
