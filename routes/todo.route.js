const { Router } = require("express");
const { todoModel } = require("../model/todo.model.js");


const todo = Router();

todo.post("/", async (req, res) => {
  let obj = req.body;
  const  timeStamp=new Date().toUTCString();
  if (obj.length === undefined || obj.length === 1) {
    try {
      console.log(obj)
      const data = await new todoModel({...obj,created_on:timeStamp,status:false});
      data.save();
      res.status(200).send({ mesg: "New todo has been added." });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    try {
      await todoModel.insertMany(obj);
      res.status(200).send({ mesg: "All the given todo has been added." });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
});

todo.get("/", async (req, res) => {
  const {userId}=req.body;
  const { page, limit } = req.query;
  const newPage = page || 1;
  let newLimit = limit || {};
  const newSkip = (newPage - 1) * newLimit;
  let obj = req.query;
  let filtering = {userId};

  try {
    const data = await todoModel.find(filtering).skip(newSkip).limit(newLimit);
    res.status(200).send({ notes: data });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

todo.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await todoModel.findById(id);
    res.status(200).send({ "todo with given id": data });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});
todo.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  try {
    const data = await todoModel.findByIdAndUpdate(id, obj);
    res.status(200).send({ mesg: "updated successfully" });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});
todo.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await todoModel.findByIdAndDelete(id);
    res.status(200).send({ mesg: "deleted successfully" });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

module.exports = { todo };
