import React, { Component} from 'react';
import WithRouter from '../../Router';
import { connect } from 'react-redux';
import { updateParkingData } from '../ParkingSlots /ParkingSlice';
import {Grid , Button , Typography }  from '@mui/material';




export interface Props {
    navigate:  any;
    id: string;
    location: any;
    updateParkingData: (parkingData: any) => void;
    parkingData: Array<any>;
}

interface S {
    slotData: any;
    totalHrs: number;
    totalCharges: number;
}

interface SS {
    id: any;
}

class ParkingCharges extends Component<Props, S, SS> {
    carousel: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            slotData: this.props.location.state.slotData,
            totalCharges: 0,
            totalHrs: 0, 
        };
    };

    componentDidMount = () => {
        let slotData = this.state.slotData;
        let currentTime = new Date().getTime();
        let totalHrs = Math.abs(Math.floor((currentTime - slotData.time)/(1000 * 60*60)));
        let totalCharges = 0;
        if(totalHrs <= 2) {
            totalCharges = 10;
        } else {
            totalCharges = 10 + 10 * (totalHrs - 2);
        }
        this.setState({ totalHrs: totalHrs, totalCharges: totalCharges });
    }

    componentWillUnmount = () => {

    }
    
    onBack = () => {
        this.props.navigate(-1)
    }

    onExitCarRegistration = async () => {
        let availableParkingArea = JSON.parse(JSON.stringify(this.props.parkingData));
        let availableIndex = availableParkingArea.findIndex((carItem: any) => carItem.uniqueNo === this.state.slotData.uniqueNo);
        availableParkingArea[availableIndex]['isAvailable'] = true;
        this.props.updateParkingData(availableParkingArea);
        const response = await fetch('https://httpstat.us/200', {
            method : "POST",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body : JSON.stringify(this.props.parkingData)
          })
        alert('Payment Done.')
        this.props.navigate(-1);
    }

 
    render() {
        return (
            <Grid container style = {{padding : "10%" , gap : "10px" }} direction= "column" justifyContent="center" alignItems="center"  >
                <Grid style = {{border : "2px solid black", padding : "5%"}}>
                <Typography variant='h6'>Car Registration No: {this.state.slotData.carRegistrationNo}</Typography>
                <Typography id = 'deregister-time-spent' variant='h6'>Total Time: {this.state.totalHrs} hrs.</Typography>
                <Typography id = 'deregister-charge' variant='h6'>Total Price : $ {this.state.totalCharges}</Typography>
                <hr/>
                <Grid >
                <Button  id = 'deregister-back-button' onClick={() => this.onBack()}  variant="contained" color="primary" >Back</Button>
                <Button style = {{marginLeft : "20px"}}  variant="contained" color="primary"  data-testid="deregister-payment-button" onClick={() => this.onExitCarRegistration()}>Payment Taken</Button>
                </Grid>
                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(ParkingCharges));
export {ParkingCharges};