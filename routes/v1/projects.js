const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

//get model into routes
const Project = mongoose.model('Project');

router.param('project', function(req, res, next, id) {
  Project.findById(id).then(function(project) {
    if (!project) {
      return res.sendStatus(404);
    }
    req.project = project;
    return next();
  });
});

// get all projects
router.get('/', function(request, response, next) {
  console.log('get projects');
  Project.find()
    .sort({ createdAt: 'desc' })
    // .populate('author')
    .then(function(projects) {
      console.log('get projects');
      return response.json({
        projects: projects.map(function(project) {
          return project.toJSON();
        })
      });
    });
});

// create a project
router.post('/', async function(request, response, next) {
  console.log('create project');
  let project = new Project(request.body);
  await project.save();
  return response.json({ project: project.toJSON() });
});

// get a project by id
router.get('/:project', function(request, response, next) {
  console.log('get project by id');
  return response.json({ project: request.project.toJSON() });
});

// update a project
router.put('/:project', async function(request, response, next) {
  console.log('update project');
  let updatedProject = _.extend(request.project, request.body);
  await updatedProject.save();
  return response.json({ project: updatedProject.toJSON() });
});

// delete a project
router.delete('/:project', async function(request, response, next) {
  console.log('delete project');
  await Project.findByIdAndRemove(request.project.id);
  return response.sendStatus(204);
});

module.exports = router;
