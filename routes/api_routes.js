

const api_router = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');
const reaction = require('../models/Reaction')

// Create a user
api_router.post('/users', async (req, res) => {
    const user = await User.create(req.body);
  
    res.send(user);
  });


// Get all users
api_router.get('/allUsers', async (req, res) => {
    const users = await User.find()
    // .populate('thoughts');
  
    res.send(users);
  });

// Get single user by ID
// http://localhost:3333/api/user?user_id=62fd83431b4c5f164d689ffd
api_router.get('/users', async (req, res) => {
    const user_id = req.query.user_id;
    const user = await User.findOne({ _id: user_id });

    res.send(user);
  });


// Put route to update user by ID.
//  http://localhost:3333/api/updateusers?user_id=62fd7525c0c4cec6467e9c4d
//  pass in { "username": "NEW USER NAME" }
api_router.put('/updateusers', async (req, res) => {
    const user_id = req.query.user_id;
    const new_username = req.body;
    const user = await User.findOne({ _id: user_id });

    await User.updateOne(user, new_username )
    
    await user.save();
    res.send(user);

})

// Delete a user by its ID. 

api_router.delete('/deleteusers', async (req, res) => {
    const user_id = req.query.user_id;
    const user = await User.findOne({ _id: user_id });
    user.remove();
  
    res.send('user deleted');
  });


// Post friend to a users friend array

api_router.post('/addFriend', async (req, res) => {
    const user_id = req.query.user_id;
    const user = await User.findOne({ _id: user_id });
    
    const friend = req.body;
    
    user.friends.push((friend));
    user.save();
  
    res.send(user.friends);
  });
  
// api_router.post('/addFriend', async (req, res) => {
//     const user_id = req.query.user_id;
// const { username, email } = req.body;

// const user = await User.findOne({ _id: user_id });
// const newUser = await User.create({
//     username, email
// });

// user.friends.push(newUser._id);
// user.save();

// res.send(user);
// });


// Delete a friend from a users friend array

api_router.delete('/posts', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.query.user_id });
      user.posts.id(req.query.post_id).remove();
      user.save();
    } catch (err) {
      console.log(err);
    }
  
    res.send('Post deleted successfully.');
  });


module.exports = api_router;  

