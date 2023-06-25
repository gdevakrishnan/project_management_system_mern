const { default: mongoose } = require("mongoose");
const TaskModel = require("../models/TaskModel");

// To create a Task = POST
const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const task = await TaskModel.create({ title, description });
        res.status(200).json(task);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// To get all tasks from DB - GET
const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// To get a single task from DB - GET
const getSingleTask = async (req, res) => {
    const { id } = req.params;
    // params => Parameters
    // It was a URI of the URl

    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ message: "Task Not Found" });
    }
    // The above condition is used to check the given id is valid
    // It is a mandatory step when you handle a data with id

    try {
        const singleTask = await TaskModel.findById(id);
        res.status(200).json(singleTask);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// To Update a task - PATCH
const updateTask = async (req, res) => {
    const { id } = req.params;
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: "Task Not Found" });
    }

    try {
        const task = await TaskModel.findByIdAndUpdate({
            _id: id         // It first check the id if found in a database of not
        }, {
            ...req.body     // Then it will replace the old values by updated value we will send in the body req
        })
        res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// To delete a task - DELETE
const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!(mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: "Task Not Found" });
    }

    try {
        const task = await TaskModel.findByIdAndDelete(id);
        res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = { createTask, getTasks, getSingleTask, updateTask, deleteTask };