
import React, { Component } from 'react';
import WithRouter from '../../Router';
import { connect } from 'react-redux';
import { updateParkingData } from '../ParkingSlots /ParkingSlice';
import {Grid , Button , TextField}  from '@mui/material';

export interface Props {
    navigate: any;
    id: string;
    updateParkingData: (parkingData: any) => void;
}

interface S {
    parkingSlots: any;
}

interface SS {
    id: any;
}

class ParkingHome extends Component<Props, S, SS> {
    carousel: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            parkingSlots: '',
        };
    };

    componentDidMount = async () => {
        this.props.updateParkingData([]);
    }

    componentWillUnmount = () => {

    }

    handleChangeTextInput = (event: any) => {
        event?.preventDefault();
        this.setState({ parkingSlots: event.target.value });
    }

    onSubmitButton = async () => {
        this.props.navigate(`/parkingSlots`, { state: { parkingSlots: this.state.parkingSlots }});
    }

    renderInputCountryForm = () => {
        return (
            <div>
              
             <Grid container style = {{marginTop : "150px", gap : "40px"}} direction= "column" justifyContent="center" alignItems="center" > 
                <Grid>
                    <TextField  data-testid="parking-create-text-input"  style = {{width : "200px"}} type = "number" placeholder='Enter number of slots' inputProps={{min : 1, max : 20 }}
                    onChange = {(e) => this. handleChangeTextInput(e)}
                     required autoComplete='off'/>
                </Grid>
                <Grid>
                    <Button data-testid="parking-create-submit-button"   variant="contained" color="primary" onClick={() => this.onSubmitButton ()}>
                        Submit
                    </Button>
                </Grid>
             </Grid>
            </div>
        )
    }

    render() {
        return (
            <div className='mainContainer'>
                {this.renderInputCountryForm()}
            </div>
        )
    }
};

const mapStateToProps = (state: any) => ({
    parkingData: state.parking.parkingData
});

const mapDispatchToProps = {
    updateParkingData: updateParkingData
};

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(ParkingHome));
export {ParkingHome};


