const bookingModel = require("../../Models");
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const {v4: uuidv4} = require('uuid');
const {paymentCall: paymentCall, cinemaDetailsCall: cinemaDetailsCall, notificationCall: notificationCall, bookCinemaCall: bookCinemaCall} = require('../../Services');
const errResponse = {
    message: "Unable to book. Please contact support"
};

module.exports = async (req, res) => {
    try {
        const cinemaId = req.body.cinemaId;
        const movieId = req.body.movieId;
        const showTime = req.body.showTime;
        const seats = req.body.seats;
        //1. get amount from cinema service
        const cinemaDetails = await cinemaDetailsCall(req, cinemaId, movieId);
        if (!cinemaDetails.data || cinemaDetails.data.moviePremieres.length === 0 || cinemaDetails.data.moviePremieres.shows.length === 0) {
            responseWrapper(res).status(500).json({message: "no shows to book"});
        }
        const showDetails = cinemaDetails.data.moviePremieres.shows.find(show => show.time === showTime);
        if (!showDetails || showDetails.seatsEmpty < seats) {
            responseWrapper(res).status(500).json({message: "no shows to book"});
        }

        // 2. make payment through payment service
        const paymentData = {
            "cardNumber": req.body.cardNumber,
            "nameOnCard": req.body.nameOnCard,
            "expMonth": req.body.expMonth,
            "cvv": req.body.cvv,
            "cardType": req.body.cardType,
            "amount": showDetails.price
        };
        await paymentCall(req, paymentData);

        // 3. save booking details in database
        const bookingId = uuidv4();
        await bookingModel.create({
            "bookingid": bookingId,
            "userid": req.body.userId,
            "cinemaid": cinemaId,
            "movieid": movieId,
            "show": showTime,
            "seats": seats,
            "amount": showDetails.price
        });


        // 4. allocate seat in cinema service
        // 5. notification service
        const cinemaAllocateData = {
            "cinemaid": cinemaId,
            "movieid": movieId,
            "show": showTime,
            "seats": seats,
        };
        const notificationData = {
            "nameOnCard": req.body.nameOnCard,
            "amount": showDetails.price,
            "bookingId": bookingId,
            "email": req.body.email,
            "cinemaid": cinemaId,
            "movieid": movieId,
        };

        Promise.all(
            [
                bookCinemaCall(req, cinemaAllocateData),
                notificationCall(req, notificationData)
            ]).then(d => responseWrapper(res).status(200).send("Successfully booked"))

    } catch (e) {
        responseWrapper(res).status(500).send(e);
    }
};