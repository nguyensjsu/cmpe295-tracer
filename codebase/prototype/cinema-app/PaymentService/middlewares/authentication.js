module.exports = (request, response, next) => {
    try {
        if (request.method === "OPTIONS") {
            next()
        } else if (request.url === "/health") {
            next();
        } else {
            //api call
            next()
        }
    } catch (e) {
        console.log(e);
        response.status(401).json({message: 'unauthorized'});
    }
};
