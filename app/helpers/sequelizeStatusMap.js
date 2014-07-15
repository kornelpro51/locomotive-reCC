module.exports =   {

	Sell: {
		payoutType	 	:	{'Check' : 0 , 'Amazon' : 1, 'PayPal' : 2, 'Direct Deposit' : 3, 'Prepaid' : 4}, 

		orderType		:	{'Physical' : 0 , 'Digital' : 1},

		status			:	{'Pending' : 0, 'Received' : 1, 'Verified' : 2, 'Prepaid' : 3, 'Hold' : 4, 'Fraud' : 5, 'Deleted' : 6}
	},

	Buy : {
		payMethod		:	{'Credit Card' : 0, 'PayPal' : 1, 'ACH' : 2},

		status			:	{'Pending' : 0, 'Processing' : 1, 'Fuflfillment' : 2, 'Shipped' : 3 , 'Incomplete' : 4}
	},

	Card : {
		  cardType 		: 	{'Physical' : 0, 'Digital' : 1, 'Paper' : 2},

	    status 			: 	{'Hidden' : 0, 'Available' : 1},

	    verification 	: 	{'Pending' : 0, 'Requested' : 1, 'Verified' : 2, 'Adjusted' : 3}


	},

	User : {
		ACL 			: 	{'Customer' : 1, 'Associate' : 100, 'Manager' : 200, 'Admin' : 300}
	},

	Merchant : {
		isActive 		:	{'BuySide' : 0, 'SellSide' : 1, 'Both' : 2, 'None' : 3},
		passbookType 	:   {'Aztec' : 0, 'PDF417' : 1, 'QR' : 2, 'None' : 3},
		type			:	{'Digital Only' : 0, 'In Store Only' : 1, 'Both' : 2}
	}

}
