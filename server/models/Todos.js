const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
    todos: [String],
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel 