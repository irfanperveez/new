const Sequelize = require('sequelize');
const db = require('../Config/db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  }
  
});
User.sync().then(() => {
    console.log('User table created');
  });
module.exports = User; 



