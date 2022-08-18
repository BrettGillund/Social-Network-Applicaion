const api_router = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');
const {reactionSchema} = require('../models/Reaction')

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
api_router.get('/users/:userId', async (req, res) => {
    const user_id = req.params.userId;
    const user = await User.findOne({ _id: user_id });

    res.send(user);
  });


// Put route to update user by ID.
//  pass in { "username": "NEW USER NAME" }
api_router.put('/users/:userId', async (req, res) => {
    const user_id = req.params.userId;
    const new_username = req.body;
    const user = await User.findOne({ _id: user_id });

    await User.updateOne(user, new_username )
    
    await user.save();
    res.send(user);

})

// Delete a user by its ID. 
api_router.delete('/users/:userId', async (req, res) => {
    const user_id = req.params.userId;
    const user = await User.findOne({ _id: user_id });
    user.remove();
  
    res.send('user deleted');
  });


// Post friend to a users friend array
api_router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const user_id = req.params.userId;
    const friend_id = req.params.friendId;
        console.log(user_id)

    const user = await User.findOne({ _id: user_id });
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
        const user_id = req.params.userId;
        const user = await User.findOne({ _id: user_id });
        const friend_id = req.params.friendId
        user.friends.remove(friend_id);
        user.save();
    } catch (err) {
        console.log(err);
    }
  
    res.send('Your friend has been removed. How sad!');
  });

// Post to create new thought
api_router.post('/thought/:userId', async (req, res) => {
  const user_id = req.params.userId;
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

  res.send(thoughts);
});


// Get thought by ID
api_router.get('/thought/:thoughtId', async (req, res) => {
  const thought_id = req.params.thoughtId;
  const thought = await Thought.findOne({ _id: thought_id });

  console.log(thought)

  res.send(thought);
});

// update thought using a put route
api_router.put('/thought/:thoughtId', async (req, res) => {
  const thought_id = req.params.thoughtId;
  const new_thought = req.body;
  const thought = await Thought.findOne({ _id: thought_id });

  await Thought.updateOne(thought, new_thought )
  
  res.send(thought);

})


// delete by passing in thought_id
api_router.delete('/thought/:thoughtId', async (req, res) => {
const thought_id = req.params.thoughtId;
const thought = await Thought.findOne({ _id: thought_id });
thought.remove();

res.send('thought deleted');
});


// Post to create new reaction to a thought
api_router.post('/thought/:thoughtId/reactions', async (req, res) => {
  const thought_id = req.params.thoughtId;
  await Thought.findOneAndUpdate(
    { _id: thought_id },
    { $addToSet: { reactions: req.body }},
    { runValidators: true, new: true }
    );
  
  res.send('reaction posted');
});

// Delete to remove a reaction from a thought
api_router.delete('/thought/:thoughtId/reactions/:reactionid', async (req, res) => {

  await Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: {reactionId: req.params.reactionid}}},
    { runValidators: true, new: true },
    )

  res.send('reaction deleted');
});


module.exports = api_router;  