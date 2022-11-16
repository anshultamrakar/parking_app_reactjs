import { Routes, Route } from 'react-router-dom';
import ParkingHome from './Components/ParkingHome/ParkingHome';
import ParkingSlots from './Components/ParkingSlots /ParkingSlots';
import ParkingCharges from './Components/ParkingCharges/ParkingCharges';
import {AppBar, Typography, Toolbar}  from '@mui/material';

function App() {
  return (
    <div>
       <header>
             <AppBar position="static">
    <Toolbar variant="dense">
        <Typography variant="h6" color="inherit"> Car Parking System</Typography>
    </Toolbar>
    </AppBar>
             </header>
      <Routes>
        <Route path='/' element={<ParkingHome />} />
        <Route path='parkingSlots' element={<ParkingSlots />} />
        <Route path='parkingCharges' element={<ParkingCharges />} />
       
      </Routes>
    </div>
      
  );
}

export default App;
