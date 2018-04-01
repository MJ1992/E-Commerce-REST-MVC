//to generate the standard response
module.exports.generate = function(error, message, status, data) {
    var Response = {
        error: error,
        message: message,
        status: status,
        data: data
    };
    return Response;
};