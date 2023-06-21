 const Sequelize = require('sequelize');
 const db = require('../Config/db');

const Project = db.define('project', {

  title: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
  
});
Project.sync().then(() => {
    console.log('Project table created');
  });
module.exports = Project; 



