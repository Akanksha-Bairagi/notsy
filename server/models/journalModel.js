const mongoose = require('mongoose');

// Validation function to ensure no empty strings in images array
function arrayLimit(val) {
    return val.every(image => image.trim() !== '');
}

// Embedded schema for todo items
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { _id: false });  // Disable _id for embedded schema

// Main schema for journals
const journalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { 
        type: [String], 
        validate: [arrayLimit, 'Images array cannot contain empty strings'] 
    },
    todoList: [todoSchema]
});

// Log model actions
journalSchema.pre('save', function(next) {
    console.log('A journal is being saved:', this);
    next();
});

journalSchema.post('save', function(doc) {
    console.log('A journal has been saved:', doc);
});

const Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;
