const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { findById, findByIdAndUpdate } = require("../models/User");

module.exports.registerUser = (reqBody) =>{
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
		mobileNo: reqBody.mobileNo
	})

    return User.find({email: reqBody.email}).then(result => {
		if(result.length === 0){
            return newUser.save().then((user, error) =>{
                if(error){
                    return false;
                }
                else{
                    return true;
                }
            })
        }
        else{
            return false
        }
    })

};

module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0){
			return true;
		}

		else{
			return false;
		}
	});
};

module.exports.login = (reqBody) => {
    return User.findOne({email: reqBody.email}).then(result => {
        if(result == null){
            return false
        }
        else{
            const passwordMatch = bcrypt.compareSync(reqBody.password, result.password);

            if(passwordMatch){
                return{access: auth.accessToken(result)};
            }
            else{
                return false
            }
        }
    })
};

module.exports.getProfile = (data) =>{
	return User.findById(data.userId).then(result =>{
		result.password = ""

		return result;
	})
};

module.exports.getMenu = (data) =>{
	return User.findById(data.userId).then(result =>{
		if(result.items.length === 0){
            return false;
        }
        else{
            return result.items;
        }
	})
};

module.exports.create = (userId, reqBody) => {

    let item = {
        category: reqBody.category,
        name: reqBody.name,
        price: reqBody.price,
        size: {
            small: reqBody.small,
            priceSmall: reqBody.priceSmall,
            medium: reqBody.medium,
            priceMedium: reqBody.priceMedium,
            large: reqBody.large,
            priceLarge: reqBody.priceLarge
        },
        cost: reqBody.cost,
        stocks: reqBody.stocks

    }

    return User.findById(userId).then(result=> {
        
        result.items.push({
            category: reqBody.category,
            name: reqBody.name,
            price: reqBody.price,
            cost: reqBody.cost,
            stocks: reqBody.stocks
    
        });

        return result.save().then((success, err) => {
            if(err){
                return false;
            }
            else{
                return true;
            }
            
        })
    })
};

module.exports.items = (userId) => {
    return User.findById(userId).then(result => {
        // console.log(result.items[result.items.length - 1])
        return result.items[result.items.length - 1]
    })
};

module.exports.size = async (userId, itemId, reqBody) => {
    let updateSize = {
        small: reqBody.small,
        priceSmall: reqBody.priceSmall,
        medium: reqBody.medium,
        priceMedium: reqBody.priceMedium,
        large: reqBody.large,
        priceLarge: reqBody.priceLarge
    }

    let updateUser = await User.findById(userId).then(result => {


        result.items.map((item) => {
            if(result.items.length !== 0 && item.id === itemId){
                
                item.size.small = reqBody.small
                item.size.priceSmall = reqBody.priceSmall
                item.size.medium = reqBody.medium
                item.size.priceMedium = reqBody.priceMedium
                item.size.large = reqBody.large
                item.size.priceLarge = reqBody.priceLarge

                return result.save().then((success, err) => {
                    if(err){
                        return false;
                    }
                    else{
                        return true;
                    }
                })
            }
        })
        
    })

    if(updateUser){
        return true;
    }
    else{
        return false;
    }
}