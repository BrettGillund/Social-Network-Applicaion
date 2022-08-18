const { Schema, model, SchemaTypes } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        Required: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        Required: true,
    },
    reactions: [{
        type: SchemaTypes.ObjectId,
        ref: 'Reaction' //do we need to have a schema reference itself?
    }]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
    // { // not sure if this getter is necessary. 
    //     toJSON: {
    //     getters: true,
    //     },
    //     id: false,
    // }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;