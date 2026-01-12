const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    projectDesc: String,
    whatsappLink: String,
    googleLink: String,
    projectUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
})

const ProjectModel = mongoose.model("projects", ProjectSchema)
module.exports = ProjectModel 