import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import { shallow, ShallowWrapper, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ParkingHome } from './ParkingHome';



configure({ adapter: new Adapter() });


const componentsProps = {
    navigate: jest.fn(),
    id: 'ParkingHome',
    updateParkingData: jest.fn()
}

describe('ParkingHome component test cases', () => {

    beforeEach(() => {
        global.fetch = jest.fn()
    })

    it('ParkingHome root file loads properly', () => {
        const tree: any = renderer.create(<ParkingHome {...componentsProps} />).toJSON();
        expect(tree.children.length).toBe(1);
        // expect(tree).toMatchSnapshot();
    });

    it('ParkingHome Component testing users', () => {
        let wrapper: ShallowWrapper;
        let instance: ParkingHome;
        wrapper = shallow(<ParkingHome {...componentsProps} />)
        instance = wrapper.instance() as ParkingHome;
        let inputComponent = wrapper.findWhere((node) => node.prop("data-testid") === "parking-create-text-input");
        inputComponent.simulate('change', { preventDefault: jest.fn(), target: { value: 'ind' } });
        let buttonComponent = wrapper.findWhere((node) => node.prop("data-testid") === "parking-create-submit-button");
        buttonComponent.simulate("click");
        instance.componentWillUnmount();
    });
});