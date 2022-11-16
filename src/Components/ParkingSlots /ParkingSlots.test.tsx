import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, ShallowWrapper, configure, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ParkingSlots } from './ParkingSlots';

configure({ adapter: new Adapter() });


const componentsProps = {
    navigate: jest.fn(),
    id: 'ParkingSlots',
    parkingData: [],
    location: {
        state: {
            parkingSlots: 2
        }
    },
    updateParkingData: jest.fn()
}

const componentsProps1 = {
    navigate: jest.fn(),
    id: 'ParkingSlots',
    parkingData: [{
        isAvailable: true,
        carRegistrationNo: '123',
        uniqueNo: 1
    }],
    location: {
        state: {
            parkingSlots: 0
        }
    },
    updateParkingData: jest.fn()
}

const componentsProps2 = {
    navigate: jest.fn(),
    id: 'ParkingSlots',
    parkingData: [],
    location: {
        state: {
            parkingSlots: 0
        }
    },
    updateParkingData: jest.fn()
}

const componentsProps3 = {
    navigate: jest.fn(),
    id: 'ParkingSlots',
    parkingData: [{
        isAvailable: false,
        carRegistrationNo: '111',
        uniqueNo: 1
    }],
    location: {
        state: {
            parkingSlots: 0
        }
    },
    updateParkingData: jest.fn()
}

const componentsProps4 = {
    navigate: jest.fn(),
    id: 'ParkingSlots',
    parkingData: [{
        isAvailable: true,
        carRegistrationNo: '',
        arriveTime : "",
        uniqueNo: 3
    }],
    location: {
        state: {
            parkingSlots: 0
        }
    },
    updateParkingData: jest.fn()
}

describe('ParkingSlots test cases ', () => {
    
    beforeEach(() => {
        global.fetch = jest.fn()
        window.alert = jest.fn();
    })

    it('ParkingSlots root file loads properly', () => {
        const tree: any = renderer.create(<ParkingSlots {...componentsProps} />).toJSON();
        // expect(tree).toMatchSnapshot();
    });

    it('ParkingSlots Empty Data Component testing users' , () => {
        let wrapper: ShallowWrapper;
        let instance: ParkingSlots;
        wrapper = shallow(<ParkingSlots {...componentsProps} />)
        instance = wrapper.instance() as ParkingSlots;
        let inputComponent = wrapper.findWhere((node) => node.prop("data-testid") === "parking-drawing-registration-input");
        inputComponent.simulate('change', { preventDefault: jest.fn(), target: { value: 'ind' } });
        let buttonComponent = wrapper.findWhere((node) => node.prop("data-testid") === "parking-drawing-add-car-button");
        buttonComponent.simulate("click");
        instance.componentWillUnmount();
    });




    it(' ParkingSlots Data Component testing users', () => {
        let wrapper: ShallowWrapper;
        let instance: ParkingSlots;
        wrapper = shallow(<ParkingSlots {...componentsProps1} />)
        instance = wrapper.instance() as ParkingSlots;
        instance.setState({ carRegistrationNo: '' }, () => {
            instance.carRegistration();
        })
        instance.setState({ carRegistrationNo: '123' }, () => {
            instance.carRegistration();
        })
        instance.componentWillUnmount();
    });

    it(' ParkingSlots non empty parking Slot', () => {
        let wrapper: ShallowWrapper;
        let instance: ParkingSlots;
        wrapper = shallow(<ParkingSlots {...componentsProps2} />)
        instance = wrapper.instance() as ParkingSlots;
        instance.setState({ carRegistrationNo: '233' }, () => {
            instance.carRegistration();
        })
        instance.componentWillUnmount();
    });

    // it(' ParkingSlots Cell testing users', () => {
    //     let wrapper: ShallowWrapper;
    //     let instance: ParkingSlots;
    //     wrapper = shallow(<ParkingSlots {...componentsProps3} />)
    //     instance = wrapper.instance() as ParkingSlots;
    //     instance.state.parkingData.forEach((item:any) => {
    //         let buttonComponent = wrapper.findWhere((node) => node.prop("data-testid") === "parking-drawing-registered");
    //         buttonComponent.simulate("click");
    //     })
    //     instance.carRegistration();
    //     instance.componentWillUnmount();
    // });

    it(' Available ParkingSlots Cell testing users ', () => {
        let wrapper: ShallowWrapper;
        let instance: ParkingSlots;
        wrapper = shallow(<ParkingSlots {...componentsProps4} />)
        instance = wrapper.instance() as ParkingSlots;
        instance.setState({ carRegistrationNo: '233' }, () => {
            instance.carRegistration();
        })
        instance.componentWillUnmount();
    });
});