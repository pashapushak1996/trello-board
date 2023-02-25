const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
}, { timestamps: true });

module.exports = model('Card', cardSchema);
