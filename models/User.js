const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        Unique: true,
        Required: true,
        Trimmed: true
    },
    email: {
        type: String,
        Unique: true,
        Required: true,
    },
    thoughts: [{
        type: SchemaTypes.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: SchemaTypes.ObjectId,
        ref: 'User' 
    }],
    },

);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;