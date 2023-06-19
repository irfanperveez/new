const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc';

// ROUTE 1: Create a user account using: POST "/api/user/createuser". 
router.post('/createuser', async (req, res, next) => {


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    

    try {
        const user = await User.create({
            name: req.body.name,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
            
            
        });
        const data={
            "name":user.name,
            "phoneNumber":user.phoneNumber,
            "email": user.email,
        }
        

        const authtoken = jwt.sign( {data},JWT_SECRET);
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

        const passwordCompare =await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
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
        const authtoken = jwt.sign("abc",JWT_SECRET);
        success = true;
        res.json({ success, authtoken, data })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    
});
router.post("/profile", (req,res)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
       
        console.log(data);
        res.send(data)
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
})
function verifyToken(req, res, next){
   
}
module.exports = router;
