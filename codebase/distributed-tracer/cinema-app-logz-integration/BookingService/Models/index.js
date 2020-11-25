const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let booking = new Schema(
    {
        bookingid: {
            type: String
        },
        userid: {
            type: String
        },
        cinemaid: {
            type: Number
        },
        movieid: {
            type: Number
        },
        show: {
            type: String
        },
        seats: {
            type: Number
        },
        amount: {
            type: Number
        },
    },
    {collection: "booking"}
);

module.exports = mongoose.model("booking", booking);