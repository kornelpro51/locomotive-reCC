var moment = require('moment')
var AWS = require('aws-sdk');

// ToDo Store Keys as ENV Variable
AWS.config.update({
	accessKeyId: 'AKIAI3AQ4SP7UF7JY5LQ',
	secretAccessKey: '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'
});

AWS.config.update({
	region: 'us-east-1'
});


var SQS = new AWS.SQS();
var QueueURL = 'https://sqs.us-east-1.amazonaws.com/750550549897/CardFlo';



module.exports = {

	// Recieve Message(s) from the queue
	pullMessages: function(maxMessages, callback) {

		return SQS.receiveMessage({
			QueueUrl: QueueURL,
			MaxNumberOfMessages: maxMessages,
			VisibilityTimeout: (maxMessages * 15) + 10 // 15 Seconds/Item + 10 Seconds For Overhead
		}, function(err, data) {
			if (err) {
				return console.log("Recieve Message Error: " + err)
			} else {
				//console.log(data)
				console.log("Message Received from Queue")
				return callback(data.Messages)
			}

		})


	},


	// When a cardFlo card returns in status deffered, queue it again as deffered
	pushMessage : function(body, response, delay) {

		SQS.sendMessage({
				QueueUrl: QueueURL,
				MessageBody: JSON.stringify(body),
				DelaySeconds: delay ? delay : 0
			},
			function(err, data) {
				if (err) {
					console.log(err)
				} else {
					//console.log(data)
					console.log("Message Pushed")

				}
			})

	},

	deleteMessage : function(message) {

		SQS.deleteMessage({
			QueueUrl: QueueURL,
			ReceiptHandle: message.ReceiptHandle
		}, function(err, data) {
			if (err) {
				console.log(err)
			} else {
				//console.log(data)
				console.log("Delete Requested")


			}
		})

	}



}