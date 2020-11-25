import React from 'react';
import { shallow, configure } from 'enzyme';
import {LandingPage} from './index';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
describe('<Home />', () => {
    it('renders Home Page', () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.exists('HeroContainer')).toEqual(true);
        expect(wrapper.exists('Contributors')).toEqual(true);
        expect(wrapper.exists('GuideCard')).toEqual(true);
    });
});