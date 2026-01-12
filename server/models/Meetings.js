const mongoose = require("mongoose")

const MeetingSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
    name: String,
    link: String,
    time: String,
})

const MeetingModel = mongoose.model("meetings", MeetingSchema)
module.exports = MeetingModel 