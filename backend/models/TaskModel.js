const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskModel = new Schema (
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('task', taskModel, 'tasks');