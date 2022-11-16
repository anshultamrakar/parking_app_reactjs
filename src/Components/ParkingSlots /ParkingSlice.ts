
import { createSlice } from '@reduxjs/toolkit'

export interface LOCATION_STATE {
  parkingData: Array<any>;
}

const initialState: LOCATION_STATE = {
  parkingData: []
}


export const parkingSlice = createSlice({
  name: 'Parking',
  initialState,
  reducers: {
    updateParkingData: (state, action) => {
       state.parkingData = action.payload;
    }
  },
})

 

export const { updateParkingData } = parkingSlice.actions

export default parkingSlice.reducer;