const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        Unique: true,
        Required: true,
        Trimmed: true // check if this is what needs to be passed in
    },
    email: {
        type: String,
        Unique: true,
        Required: true,
        // VALID EMAIL Must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: [{
        type: SchemaTypes.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: SchemaTypes.ObjectId, //need to figure out which type will reference the User model//
        ref: 'User' //do we need to have a schema reference itself?
    }],
    },
    // {
    //     toJSON: {
    //       virtuals: true,
    //     },
    // },

);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;