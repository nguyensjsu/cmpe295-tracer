const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let moviePremieresSchema = new Schema(
    {
        movieId: {
            type: Number
        },
        shows: [{
            screen: {
                type: Number
            },
            time: {
                type: String
            },
            capacity: {
                type: Number
            },
            seatsEmpty: {
                type: Number
            },
            seatsOccupied: {
                type: Number
            },
            price: {
                type: Number
            }
        }]
    }
);
let cinema = new Schema(
    {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        moviePremieres:[moviePremieresSchema]
    },
    {collection: "cinema"}
);

module.exports = mongoose.model("cinema", cinema);