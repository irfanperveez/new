const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// ROUTE 1: Create a project  using: POST "/api/project/createuser". 
router.post('/createproject', async (req, res) => {

    try {
        const project = await Project.create({
            title: req.body.title,
            status: req.body.status
          
        });
       
        res.json({ project})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Show detail of project by using: get request and adding status on postman.

router.get('/projectdetails', async (req, res) => {
    const { title } = req.query;

        try {
            const project = await Project.findOne({
              where: {
                title: { [Op.eq]: title }
              }
            });
        
      if (!project) {
        return res.status(404).json({ error: 'Project not found' }); }
      const data = {
        title: project.title,
        status: project.status
      };
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


 
  // ROUTE 3: Delete details of projects by using status detail on postman

  router.delete('/project_delete', async (req, res) => {
    const { status } = req.query;
  
    try {
      const project = await Project.findOne({
        where: {
          status: status
        }
      });
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      await project.destroy();
  
      res.json({ success: true, message: 'Project data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Route 4: using projects to delete data of project by delete method using id (/project/2) on postman

  router.delete('/', async (req, res) => {
    const projectId = req.params.id;
  
    try {
      const project = await Project.findByPk(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      await project.destroy();
  
      res.json({ success: true, message: 'Project data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  //Route 9:  using (project/update) to update data of project by put method using id (/project/update/2)on postman

  router.put('/project/update/:id', async (req, res) => {
    const { id } = req.params;
    const {title, status } = req.body;
  
    try {
      // Find the existing user by ID
      let project = await Project.findByPk(id);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Update the project's data
      project.title = title;
      project.status = status;
  
      // Save the updated user to the database
      await project.save();
  
      res.json({ success: true, message: 'Project data updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;




