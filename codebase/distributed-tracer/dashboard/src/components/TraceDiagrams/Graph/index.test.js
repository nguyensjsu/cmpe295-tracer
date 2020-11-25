import React from 'react';
import { mount, configure } from 'enzyme';
import {default as GraphDiagram} from './index';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
describe('<GraphDiagram />', () => {
    it('renders GraphDiagram Page', () => {
        const match = { params: { uuid: '123' }};
        const wrapper = mount(<GraphDiagram match={match}/>);
        expect(wrapper.length).toEqual(1);
        expect(wrapper.exists('Graph')).toEqual(true);
        expect(wrapper.exists('DetailsPanel')).toEqual(true);
    });
});