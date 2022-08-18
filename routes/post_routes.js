// Post to create new thought
api_router.post('/thought', async (req, res) => {
    const thought_id = req.query.thought_id;
    const user = await User.findOne({ _id: '62fd8087de91742271b0cefb' });
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

  api_router.put('/thought', async (req, res) => {
    const thought_id = req.query.thought_id;
    const new_thought = req.body;
    const thought = await User.findOne({ _id: thought_id });

    await Thought.updateOne(thought, new_thought )
    
    res.send(thought);

})

api_router.delete('/thought', async (req, res) => {
  const thought_id = req.query.thought_id;
  const user = await User.findOne({ _id: thought_id });
  user.remove();

  res.send('user deleted');
});