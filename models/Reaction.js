const { Schema, Types } = require('mongoose'); //This may need to be a Schema, model???

const reactionSchema = new Schema({
    reactionId: {
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
        default: Date.now,
    },
    },
    {
        toJSON: {
        getters: true,
        },
    }
);

module.exports = reactionSchema;