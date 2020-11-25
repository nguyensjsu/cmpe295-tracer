import React from 'react';
import { mount, configure } from 'enzyme';
import {default as Graph} from './Graph';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

const nodes = [
    {
        ip: "0.0.0.0",
        label: "cmpe295-movies-service",
        name: "cmpe295-movies-service"
    },{
        ip: "0.0.0.0",
        label: "cmpe295-booking-service",
        name: "cmpe295-booking-service"
    }
];
const links= [
    {
        source:{
            ip: "0.0.0.0",
            label: "cmpe295-movies-service",
            name: "cmpe295-movies-service"
        },
        target:{
            ip: "0.0.0.0",
            label: "cmpe295-booking-service",
            name: "cmpe295-booking-service"
        }
    },{
        source:{
            ip: "0.0.0.0",
            label: "cmpe295-booking-service",
            name: "cmpe295-booking-service"
        },
        target:{
            ip: "0.0.0.0",
            label: "cmpe295-movies-service",
            name: "cmpe295-movies-service"
        }
    }

];

configure({adapter: new Adapter()});
describe('<GraphDiagram />', () => {

    it('renders GraphDiagram Page', () => {
        const wrapper = mount(<Graph nodes={nodes} links={links}/>);
        expect(wrapper.length).toEqual(1);
    });

    it('svg displays all the nodes', () => {
        const wrapper = mount(<Graph nodes={nodes} links={links}/>);
        const html = wrapper.find('svg').html();
        const totalNodes = (html.match(/<circle/g) || []).length;
        expect(totalNodes).toEqual(2);

    });
    it('svg displays all the links', () => {
        const wrapper = mount(<Graph nodes={nodes} links={links}/>);
        const html = wrapper.find('svg').html();
        const totalNodes = (html.match(/<line/g) || []).length;
        expect(totalNodes).toEqual(2);
    });
});