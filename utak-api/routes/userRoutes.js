const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

const auth = require("../auth");


router.post("/register",(req, res) =>{
	userControllers.registerUser(req.body).then(result => res.send(result));
});

router.post("/checkEmail", (req, res) =>{
	userControllers.checkEmailExists(req.body).then(result => res.send(result));
});

router.post("/login", (req, res)=>{
	userControllers.login(req.body).then(result => res.send(result));
});

router.get("/details", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization);

	userControllers.getProfile({userId: userData.id}).then(result => res.send(result));
});

router.get("/menu", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization);

	userControllers.getMenu({userId: userData.id}).then(result => res.send(result));
});

router.post("/create", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin){
		res.send(false)
	}
	else{
		userControllers.create(userData.id, req.body).then(result => res.send(result));
	}
});

router.get("/items", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin){
		res.send(false)
	}
	else{
		userControllers.items(userData.id).then(result => res.send(result));
	}
})

router.patch("/size/:item", auth.verify, (req, res)=> {
	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin){
		res.send(false)
	}
	else{
		userControllers.size(userData.id,req.params.item, req.body).then(result => res.send(result));
	}
})



module.exports = router;