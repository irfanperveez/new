const express = require('express');
const User = require('../model/User');
const router = express.Router();
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc';


// ROUTE 1: Create a user account by using: POST "/api/user/createuser". 
router.post('/createuser', async (req, res) => {
    
    try {
      const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        phone_number: req.body.phone_number,   
      });
      const authtoken = jwt.sign({"name":user.name},JWT_SECRET);
      res.json({ authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
  
  
  // ROUTE 2: Authenticate a user using: POST "/api/user/login". 
  router.post('/login', async (req, res) => {
    let success = false;

  
    const { phone_number, password } = req.body;
    try {
      let user = await User.findOne({ phone_number });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
  
      if (!(password==user.password)) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
          user: {
              id: user.id,
              name:user.name,
              phone_number:user.phone_number,
            }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken,data })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  module.exports = router
  