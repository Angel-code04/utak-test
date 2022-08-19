const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Passwword is required"]
	},
	isAdmin :{
		type: Boolean,
		default: false
	},
	mobileNo :{
		type: String,
		required: [true, "Mobile number is required"]
	},
	createdOn:{
		type: Date,
		default: new Date()
	},
	items: [
		{
			category: {
				type: String,
				required: [true, "Category is required"]
			},
			name: {
				type: String,
				required: [true, "Name of item is required"]
			},

			size: {
				
					small: {
						type: Boolean,
						default: false
					},
					priceSmall: {
						type: Number,
						default: 0
					},
					medium: {
						type: Boolean,
						default: false
					},
					priceMedium: {
						type: Number,
						default: 0
					},
					large: {
						type: Boolean,
						default: false
					},
					priceLarge: {
						type: Number,
						default: 0
					}
				},
			price: {
				type: Number,
				default: 0
			},
			cost: {
				type: Number,
				required: [true, "Cost is required"] 
			},
			stocks: {
				type: Number,
				required: [true, "Stocks is required"]
			}

		}
	]
})

module.exports = mongoose.model("User", userSchema);