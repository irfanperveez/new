const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc';
const authMiddleware = require('./authuser');

// ROUTE 1: Create a user account using: POST "/api/user/createuser". 
router.post('/createuser', async (req, res) => {


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
                phoneNumber: { [Op.eq]: phoneNumber }
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
                
            }
        }
        const authtoken = jwt.sign({data},JWT_SECRET);
        success = true;
        res.json({authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    
});
// ROUTE 3: Authenticate a user using JWT: POST "/api/user/profile".
    router.get("/profile12/:id", authMiddleware, async (req,res)=>{
      const userId = req.params.id;
      console.log(parseInt(userId));
      console.log(parseInt(req.user.data.user.id));
      
      try {
        if(parseInt(userId) !== parseInt(req.user.data.user.id)){
          return res.status(403).json({error: 'Details not match'});
         
        }
        const user = await User.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true, user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
});

// Route 4: create profiles to show details of users by post method entering phonenumber and getting details of required user.

router.post('/profiles_post', async (req, res) => {
    const { phoneNumber } = req.body;
    
  
    try {
      const user = await User.findOne({
        where: {
          phoneNumber: { [Op.eq]: phoneNumber }
        }
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const data = {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email
      };
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


