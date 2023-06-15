const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc';

// ROUTE 1: Create a user account using: POST "/api/user/createuser". 
router.post('/createuser', async (req, res) => {

    try {
        const user = await User.create({
            name: req.body.name,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        });

        console.log(user)
        const authtoken = jwt.sign({ "name": user.name }, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Authenticate a user using: POST "/api/user/login". 
router.post('/login', async (req, res) => {
    let success = false;
    const { phoneNumber, password } = req.body;
    try {
        let user = await User.findOne({
            where: {
                phoneNumber: { [Op.like]: phoneNumber }
            }
        });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        if (!(password == user.password)) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct password" });

        }
        if (!(email == user.email)) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct password" });
        }
        const data = {
            user: {
                id: user.id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                email: user.email
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken, data })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
  