const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

//get model into routes
const User = mongoose.model('User');
const Project = mongoose.model('Project')

// http://localhost:3000/users/abc123
// take what is in param and find object in db, put it in req for later use
router.param('user', function(req, res, next, id){
    User.findById(id)
    .then(function(user){
        if(!user){
            return res.sendStatus(404);
        }
        req.user = user;
        return next();
    });
});

router.get('/', function(req, res, next){
    console.log('get users');
    User
        .find()
        .sort({createdAt: 'desc'})
        .then(function(users){
            //can't do this
            // return res.json({articles: articles});
            return res.json({
                users: users.map(function(user){
                    return user.toJSON();
                })
            });
        });    
});

/**
 * Get a user by ID.
 * GET /users/:user
 */
router.get('/:user', async function(req, res, next){
    console.log('get user by id', req.user);
    // await req.user.populate('projects').execPopulate()
    return res.json({ user: req.user.toJSON() });
});


// /**
//  * Update a user.
//  */
// router.put('/:user', async function(req, res, next){
//     console.log('update user-->', req.body);
//     let updatedUser = _.extend(req.user, req.body);
//     await updatedUser.save();
//     return res.json({ user: updatedUser.toJSON() });
// });

// /**
//  * Delete a user.
//  */
// router.delete('/:user', async function(req, res, next){
//     console.log('delete user');
//     await User.findByIdAndRemove(req.user.id);
//     return res.sendStatus(204);
// });

// /*******
//  * Entity relationships
//  */

//  /**
//   * Get a users projects
//   * /v1/users/userID/projects
//   */

  //TODO fix relationship 
router.get('/:user/projects', async function(req, res, next) {
    let project = await Project.find({ author: req.user })
    return res.json({
        articles: articles.map(function(article){
            return project.toJSON();
        })
    })
}) 
    
// /**
//  * Create a project for a user
//  * POST /v1/users/userID/project
//  */

//  //TODO fix relationship
// router.post('/:user/project', async function(req, res, next){
//     if(!user) {
//         return res.status(422).json( {
//             succsess: false, message: "User does not exist"
//         })
//     }

//     let project = new Project(req.body);
//     project.auther = req.user
//     await project.save();
//     req.user.projects.push(project)
//     await user.save()
//     return res.json({ project: project.toJSON() });
// });

// /*******
//  * Auth
//  */

 /**
  * Login 
  * POST /v1/users/login
  */
router.post('/login', async function(req, res, next) {
    if(!req.body.email) {
        return res.status(422).json({
            succsess: false,
            message: "Email can't be blank"
        })
    }
    let user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(422).json({
            succsess: false,
            message: "user not found"
        })
    }
    return res.json({ user: user.toJSON() })
})

/**
 * Register a new user
 * /v1/users/register
 */

router.post('/register', async function(req, res, next) {
    console.log("make user")
    if(!req.body.email) {
        return res.status(422).json({
            succsess: false,
            message: "Email can't be blank"
        })
    }
    if(!req.body.firstName) {
        return res.status(422).json({
            succsess: false,
            message: "First Name can't be blank"
        })
    }
    if(!req.body.lastName) {
        return res.status(422).json({
            succsess: false,
            message: "Last name can't be blank"
        })
    }
    let otherUsersEmail = await User.findOne({email: req.body.email})
    if(otherUsersEmail) {
        return res.status(422).json({
            succsess: false,
            message: "There is already a user with this Email"
        })
    }
    let user = new User(req.body);
    await user.save();
    return res.json({ user: user.toJSON() });
});


module.exports = router;
