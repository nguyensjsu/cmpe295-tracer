const services = () => ([
    {name: "n0", "label": "Frontend"},
    {name: "n1", "label": "Browse"},
    {name: "n2", "label": "Inventory"},
    {name: "n3", "label": "Recommendation"},
    {name: "n4", "label": "Discounts"},
    {name: "n5", "label": "RegionalOffers"},
    {name: "n6", "label": "HolidayOffers"}
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

exports.services = services ;
exports.links = links ;