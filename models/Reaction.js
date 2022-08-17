const { Schema, Types } = require('mongoose'); //This may need to be a Schema, model???

const reactionSchema = new Schema({
    ReactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        Required: true,
        maxLength: 280,
    },

    username: {
        type: String,
        Required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // check out if this is formating the timestamp on query using a getter method - Reference: https://stackoverflow.com/questions/70724966/how-to-use-getter-or-setter-with-mongoose-timestamps
    },

    },
    {
        toJSON: {
        getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;