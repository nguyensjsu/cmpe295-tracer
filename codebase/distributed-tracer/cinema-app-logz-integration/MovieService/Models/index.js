const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movies = new Schema(
    {
        id: {
            type: Number
        },
        title: {
            type: String
        },
        runtime: {
            type: Number
        },
        format: {
            type: String
        },
        city: {
            type: String
        },
        releaseYear: {
            type: Number
        },
        releaseMonth: {
            type: Number
        },
        releaseDay: {
            type: Number
        }
    },
    {collection: "movies"}
);

module.exports = mongoose.model("movies", movies);