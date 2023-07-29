const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({tasks: tasks})
  } catch (error) {
    res.status(500).json(error)
  }
}

const createTask = async (req, res) => {
  try {
    const tasks = await Task.create(req.body)
    res.status(201).json('task will be created')
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const deleteTask = async (req, res) => {
  const {id} = req.params
  try {
    const task = await Task.findOneAndDelete({_id: id})
    if (!task) {
      return res.status(404).json('task not found')
    }
    res.status(200).json('delete is successfull')
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const updateTask = async (req, res) => {
  const {id} = req.params
  try {
    const task = await Task.findOneAndUpdate({_id: id}, req.body, {
      new: true,
      runValidators: true
    })
    if (!task) {
      res.status(404).json('task not found')
    }
    res.status(200).json({task})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

router.route('/').get(getAllTasks).post(createTask)

router.route('/:id').delete(deleteTask).patch(updateTask)

module.exports = router