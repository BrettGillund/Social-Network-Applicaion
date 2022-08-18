

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
// how to post the userId and friendId without the : being added within the string.
api_router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const user_id = req.query.user_id;
    const user = await User.findOne({ _id: user_id });
    const friend_id = req.params.friendId
    const friend = await User.findOne({_id: friend_id});
    console.log(user)
    console.log(friend)
    user.friends.push(friend._id);
    user.save();
    res.send(user)
});


// Delete a friend from a users friend array

api_router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const user = await User.findOne({ _id: user_id });
        const friend_id = req.params.friendId
        user.friends.id(friend_id).remove();
        user.save();
    } catch (err) {
        console.log(err);
    }
  
    res.send('Your friend has been removed. How sad!');
  });

// Post to create new thought
api_router.post('/thought', async (req, res) => {
  const user_id = req.query.userId;
  // const user_id = (req.body.userId)
  const user = await User.findOne({ _id: user_id });
  console.log(user);
  const thought = await Thought.create(req.body);


  user.thoughts.push(thought._id);
  user.save();
  res.send(thought);
});



// Get all thoughts 
api_router.get('/allThoughts', async (req, res) => {
  const thoughts = await Thought.find()
  // .populate('thoughts');

  res.send(thoughts);
});


// Get thought by ID
api_router.get('/thought', async (req, res) => {
  const thought_id = req.query.thought_id;
  const thought = await Thought.findOne({ _id: thought_id });

  console.log(thought)

  res.send(thought);
});

// update thought using a put route
api_router.put('/thought', async (req, res) => {
  const thought_id = req.query.thought_id;
  const new_thought = req.body;
  const thought = await User.findOne({ _id: thought_id });

  await Thought.updateOne(thought, new_thought )
  
  thought.save()
  res.send(thought);

})


// delete by passing in thought_id
api_router.delete('/thought', async (req, res) => {
const thought_id = req.query.thought_id;
const thought = await Thought.findOne({ _id: thought_id });
thought.remove();

res.send('thought deleted');
});


module.exports = api_router;  