const { Schema, model } = require('mongoose');

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

module.exports = model('List', listSchema);
