import React from 'react';
import { mount, configure } from 'enzyme';
import {default as Sequence} from './Sequence';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

let labels = [
    {
        ip: "10.0.0.0",
        label: "User",
        name: "User"
    }, {
        ip: "0.0.0.0",
        label: "cmpe295-movies-service",
        name: "cmpe295-movies-service"
    }, {
        ip: "0.0.0.0",
        label: "cmpe295-booking-service",
        name: "cmpe295-booking-service"
    }
];

let logs = [
    {
        appName: "cmpe295-movies-service",
        authority: "cmpe295-movies-service:8080",
        body: "{}",
        bytes_sent: "147",
        downstream_local_address: "10.0.2.10:8080",
        downstream_remote_address: "10.0.2.9:53674",
        duration: "21",
        log_source: "istio",
        log_type: "REQUEST",
        method: "GET",
        parentSpanId: "584d5390c5aa6b6a",
        path: "/movies/1",
        protocol: "HTTP/1.1",
        request_id: "b062abae-dec7-4ffe-a063-5ebe808eda2e",
        response_code: "200",
        response_flags: "-",
        route_name: "default",
        spanId: "e4038c5e4b6783a1|782392|1606283340144",
        start_time: "2020-11-25T05:49:00.153Z",
        upstream_cluster: "inbound|8080||",
        upstream_host: "127.0.0.1:8080",
        upstream_local_address: "127.0.0.1:49558",
        upstream_service_time: "20",
        upstream_transport_failure_reason: null,
        user_agent: "Apache-HttpClient/4.5.12 (Java/11.0.8)",
        x_forwarded_for: null
    },
    {
        appName: "cmpe295-movies-service",
        authority: null,
        body: "body",
        bytes_sent: null,
        downstream_local_address: null,
        downstream_remote_address: null,
        duration: null,
        log_source: "envoy",
        log_type: "RESPONSE",
        method: null,
        parentSpanId: "e4038c5e4b6783a1",
        path: null,
        protocol: null,
        request_id: "b062abae-dec7-4ffe-a063-5ebe808eda2e",
        response_code: null,
        response_flags: null,
        route_name: null,
        spanId: "9fb3153f5cdc9c2e|782392|1606283340172",
        start_time: null,
        upstream_cluster: null,
        upstream_host: null,
        upstream_local_address: null,
        upstream_service_time: null,
        upstream_transport_failure_reason: null,
        user_agent: null,
        x_forwarded_for: null
    },
    {
        appName: "cmpe295-booking-service",
        authority: "34.94.1.56:80",
        body: "body",
        bytes_sent: "19",
        downstream_local_address: "10.0.1.10:8080",
        downstream_remote_address: "10.168.0.2:8517",
        duration: "4150",
        log_source: "istio",
        log_type: "REQUEST",
        method: "POST",
        parentSpanId: "EMPTY",
        path: "/book",
        protocol: "HTTP/1.1",
        request_id: "b062abae-dec7-4ffe-a063-5ebe808eda2e",
        response_code: "200",
        response_flags: "-",
        route_name: "default",
        spanId: "EMPTY|EMPTY|EMPTY",
        start_time: "2020-11-25T05:49:00.110Z",
        upstream_cluster: "inbound|8080||",
        upstream_host: "127.0.0.1:8080",
        upstream_local_address: "127.0.0.1:53196",
        upstream_service_time: "4149",
        upstream_transport_failure_reason: null,
        user_agent: "Apache-HttpClient/4.5.12 (Java/11.0.8)",
        x_forwarded_for: null
    }
];

configure({adapter: new Adapter()});
describe('<SequenceDiagram />', () => {
    it('renders SequenceDiagram Page', () => {
        const wrapper = mount(<Sequence labels={labels} logs={logs}/>);
        expect(wrapper.length).toEqual(1);
    });
    it('renders svg', () => {
        const wrapper = mount(<Sequence labels={labels} logs={logs}/>);
        const html = wrapper.find('svg').at(1).html();
        const totalNodes = (html.match(/<rect/g) || []).length;
        expect(totalNodes).toEqual(3);
    })
});
