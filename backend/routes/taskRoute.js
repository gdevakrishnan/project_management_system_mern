const express = require('express');
const { createTask, getTasks, getSingleTask, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getSingleTask);
router.patch('/:id', updateTask);
//       ':id'    // => It is a Param
// => to handle with params of the of uri of the url
router.delete('/:id', deleteTask);

module.exports = router;