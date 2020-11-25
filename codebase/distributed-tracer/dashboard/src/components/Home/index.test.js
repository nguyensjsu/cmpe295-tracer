import React from 'react';
import { shallow, configure } from 'enzyme';
import {default as Home} from './index';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
describe('<Home />', () => {
    it('renders Home Page', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.exists('LandingPage')).toEqual(true);
    });
});