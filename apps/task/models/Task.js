var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    title: String,
    task_created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: String,
    state: Number, // 0: Not Started, 1: WIP, 2: Done
    active:  {
        type: Boolean,
        default: true,
        select: false
    }
}, { timestamps: true });

taskSchema.pre(/^find/, function (next) {
    // This points to the current query
    this.find({ active: { $ne: false } })
    next()
})

module.exports = mongoose.model('Task', taskSchema);