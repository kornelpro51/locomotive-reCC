var responseGenerator = function (success, message, data) {

return {'success':success, 'data': data, 'message':message }

}

module.exports = responseGenerator;