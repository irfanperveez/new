const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc';

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


// Route 5: create profiles to show details of users by get method using phoneNumber on postman

router.get('/profiles', async (req, res) => {
    const { phoneNumber } = req.query;
    
  
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

// Route 6: using profiles to delete data of users by delete method using phoneNumber on postman

  router.delete('/profiles_delete', async (req, res) => {
    const { phoneNumber } = req.query;
  
    try {
      const user = await User.findOne({
        where: {
          phoneNumber: phoneNumber
        }
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.destroy();
  
      res.json({ success: true, message: 'User data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route 7: using profiles to delete data of users by delete method using id (/profiles1/34) on postman

  router.delete('/profiles1/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.destroy();
  
      res.json({ success: true, message: 'User data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // Route 8: using profiles to delete data of users by delete method using id on postman

  router.delete('/profiles1/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await user.destroy();
  
      res.json({ success: true, message: 'User data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  //Route 9:  using profiles to update data of users by put method using id on postman

  router.put('/profiles/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber, email } = req.body;
  
    try {
      // Find the existing user by ID
      let user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's data
      user.name = name;
      user.phoneNumber = phoneNumber;
      user.email = email;
  
      // Save the updated user to the database
      await user.save();
  
      res.json({ success: true, message: 'User data updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
          module.exports = router;
