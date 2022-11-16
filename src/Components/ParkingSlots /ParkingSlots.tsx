import React, { Component} from 'react';
import WithRouter from '../../Router';
import { connect } from 'react-redux';
import { updateParkingData } from './ParkingSlice';
import {Grid , Button, TextField , Box} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export interface Props {
    navigate:  any;
    id: string;
    parkingData: Array<any>;
    location: any;
    updateParkingData: (parkingData: any) => void;
}

interface S {
    parkingSlots: string;
    parkingData: Array<any>;
    carRegistrationNo: string;

    
}

interface SS {
    id: any;
}

class ParkingSlots extends Component<Props, S, SS> {
    carousel: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            parkingSlots: this.props.location.state.parkingSlots,
            parkingData: [],
            carRegistrationNo: '',
        };
    };

    componentDidMount = () => {
        if(this.props.parkingData && this.props.parkingData.length === 0) {
            let parkingData: Array<any> = [];
            for(let i = 0; i < Number(this.state.parkingSlots); i++) {
                parkingData.push({
                    isAvailable: true,
                    carRegistrationNo: '',
                    uniqueNo: i
                })
            }
            this.setState({ parkingData: parkingData }, () => {
            });
        } else {
            this.setState({ parkingData: this.props.parkingData });
        }
    }

    componentWillUnmount = () => {

    }



    carRegistration = () => {
        if (this.state.carRegistrationNo.trim().length === 0) {
            const notify = () => toast("Car Registration No is empty");
            notify();
            return;
        }
        let availableParkingArea = this.state.parkingData;
        let availableRegistrationIndex = availableParkingArea.findIndex((item: any) => item.carRegistrationNo.toLowerCase() === this.state.carRegistrationNo.toLowerCase());
        if(availableRegistrationIndex !== -1) {
            const notify = () => toast("Already Car Registered with this No.");
            notify();
            return;
        }
        let availableIndex = availableParkingArea.findIndex((item: any) => item.isAvailable === true);
        if (availableIndex === -1) {
            const notify = () => toast("Parking is full !");
            notify();
            return;
        }

        let availableIndexes: any = [];
        availableParkingArea.map((item: any, index: any) => {
            if (item.isAvailable) {
                availableIndexes.push(index);
            }
        });

        let randomIndex = Math.floor((Math.random() * availableIndexes.length));
        availableParkingArea[availableIndexes[randomIndex]].isAvailable = false;
        availableParkingArea[availableIndexes[randomIndex]].carRegistrationNo = this.state.carRegistrationNo;
         availableParkingArea[availableIndexes[randomIndex]].time = new Date().getTime();
       
        this.setState({ parkingData: availableParkingArea, carRegistrationNo: ''}, () => {
            this.props.updateParkingData(JSON.parse(JSON.stringify(this.state.parkingData)));
            const notify = () => toast("Car Registered Succesfully !");
            notify();
        });
    }



    handleChangeTextInput = (event: any) => {
        event?.preventDefault();
        this.setState({ carRegistrationNo: event.target.value });
    }


    onPressSlot = (item: any) => {
        this.props.navigate(`/parkingCharges`, { state: { slotData: item }});
    }

    renderSlotsList = () => {
        return (
            <div>
            <Grid  container style = {{padding : "3%", gap : "20px"}} direction= "row" justifyContent="center" alignItems="center">
                {this.state.parkingData.map((item: any, index: any) => {
                    return (
                        <Box 
               style={{lineHeight: "50px", textAlign: "center", border : "1px solid black", backgroundColor: item.isAvailable ? "grey" : "green"  ,color:"#000", margin: "0px 15px"}}
               sx={{
                 width: 50,
                 height: 50,
               }}
               data-testid="parking-drawing-{item.isAvailable === false ? space-{item.uniqueNo + 1} : registered-{item.uniqueNo + 1}}"
               onClick={() => !item.isAvailable && this.onPressSlot(item)} key={index}
               >
                <div id = "parking-drawing-space-number-{item.uniqueNo + 1}">  {item.uniqueNo + 1}</div>
               
                 </Box>
                    )
                })}
            </Grid>
            </div>
        )
    }

    render() {
        return (
            <Grid container style = {{padding : "3%", gap : "40px"}} direction= "column" justifyContent="center" alignItems="center">
                {this.renderSlotsList()}
                <TextField autoComplete='off' data-testid="parking-drawing-registration-input"  placeholder='Enter Car Registration No'  value={this.state.carRegistrationNo} onChange={(event) => this.handleChangeTextInput(event)} />
                <Button variant ="contained" color="primary" data-testid="parking-drawing-add-car-button" onClick={() => this.carRegistration()} >Car Register</Button>
                <ToastContainer toastStyle={{ backgroundColor: "#283044" , color : "#fff" }}/>
            </Grid>
        )
    }
};




const mapStateToProps = (state: any) => ({
    parkingData: state.parking.parkingData
});

const mapDispatchToProps = {
    updateParkingData: updateParkingData
};

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(ParkingSlots));
export {ParkingSlots};