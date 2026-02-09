const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const task = await Task.findOne({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new NotFoundError(`No job with id ${taskId}`);
    res.status(StatusCodes.OK).son({ task });
  }
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  const {
    body: { name },
    user: { userId },
    params: { id: taskId },
  } = req;

  if (name === "" || task === "") {
    throw new BadRequestError("Name or task fields cannot be empty");
  }
  const task = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  throw new NotFoundError(`No task with id ${taskId}`);
};

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findByIdAndDelete({ _id: taskId, createdBy: userId });

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
