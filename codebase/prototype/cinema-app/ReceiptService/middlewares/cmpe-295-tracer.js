const headersForResponse = ["x-request-id", "x-b3-traceid", "x-b3-spanid", "x-b3-parentspanid"];
const headersToPropagate = ["x-request-id", "x-b3-traceid", "x-b3-spanid", "x-b3-sampled", "x-b3-flags",
    "x-ot-span-context", "end-user", "user-agent", "x-cmpe295-header", "x-b3-parentspanid"];

module.exports = {
    headerTransferMiddleware: (request, response, next) => {
        let headers = {};
        headersForResponse.map(header => {
            if (request.headers[header]) headers[header] = request.headers[header]
        });
        response.set('x-response-headers', JSON.stringify(headers))
        next();
    },
    getHeadersToPropagate: (req) => {
        let headers = {};
        headersToPropagate.map(header => {
            if (req.headers[header]) headers[header] = req.headers[header]
        });
        return headers;
    }
};