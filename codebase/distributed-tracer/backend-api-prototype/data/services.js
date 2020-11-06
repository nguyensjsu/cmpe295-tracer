const services = () => ([
    {name: "n0", "label": "Frontend", "ip":"10.1.2.0"},
    {name: "n1", "label": "Browse", "ip":"10.1.2.1"},
    {name: "n2", "label": "Inventory", "ip":"10.1.2.2"},
    {name: "n3", "label": "Recommendation", "ip":"10.1.2.3"},
    {name: "n4", "label": "Discounts", "ip":"10.1.2.4"},
    {name: "n5", "label": "RegionalOffers", "ip":"10.1.2.5"},
    {name: "n6", "label": "HolidayOffers", "ip":"10.1.2.6"}
]);

const links = () => ([
    {
        type: "GET: /browse",
        source: 0,
        target: 1,
        timestamp: new Date("Wed Sep 30 2020 18:00:08 GMT-0700 (Pacific Daylight Time)")
    },
    {
        type: "GET: /browse",
        source: 1,
        target: 2,
        timestamp: new Date("Wed Sep 30 2020 18:02:08 GMT-0700 (Pacific Daylight Time)")
    },
    {
        type: "GET: /browse",
        source: 1,
        target: 3,
        timestamp: new Date("Wed Sep 30 2020 18:02:08 GMT-0700 (Pacific Daylight Time)")
    },
    {
        type: "GET: /browse",
        source: 1,
        target: 4,
        timestamp: new Date("Wed Sep 30 2020 18:02:08 GMT-0700 (Pacific Daylight Time)")
    },
    {
        type: "GET: /browse",
        source: 4,
        target: 5,
        timestamp: new Date("Wed Sep 30 2020 18:02:08 GMT-0700 (Pacific Daylight Time)")
    },
    {
        type: "GET: /browse",
        source: 5,
        target: 6,
        timestamp: new Date("Wed Sep 29 2020 18:02:08 GMT-0700 (Pacific Daylight Time)")
    },
]);

const logs = () => ([
    "Node0 n0 This are the logs 1 for node0",
    "Node0 n0 This are the logs 2 for node0",
    "Node0 n0 This are the logs 3 for node0",
    "Node1 n1 This are the logs for node1",
    "Node2 n2 This are the logs for node2",
    "Node3 n3 This are the logs for node3"
]);

exports.services = services ;
exports.links = links ;
exports.logs = logs ;
