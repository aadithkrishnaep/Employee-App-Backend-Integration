// Task1: initiate app and run server at 3000
const express = require("express");
const app = new express();
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const { employeeModel } = require("./model/employeeList");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist", "Frontend")));
app.use(express.static(path.join(__dirname, "dist", "FrontEnd")));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Task2: create mongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGODB_URL ||
  "mongodb+srv://userone:userone123@cluster0.mongodb.net/EmployeeDB?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Database Connected successfully to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error.message || error);
  });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist", async (req, res) => {
  try {
    const docs = await employeeModel.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch employees" });
  }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id", async (req, res) => {
  try {
    const doc = await employeeModel.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch employee" });
  }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post("/api/employeelist", async (req, res) => {
  try {
    const newEmployee = new employeeModel({
      name: req.body.name,
      location: req.body.location,
      position: req.body.position || req.body.designation,
      salary: req.body.salary
    });
    const savedDoc = await newEmployee.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to add employee" });
  }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", async (req, res) => {
  try {
    const result = await employeeModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ status: "ok", result: result });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to delete employee" });
  }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put("/api/employeelist", async (req, res) => {
  try {
    const id = req.body._id || req.body.id;
    const updated = await employeeModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position || req.body.designation,
        salary: req.body.salary
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ status: "ok", result: updated });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update employee" });
  }
});

// Support update with ID in URL parameter for standard REST clients: PUT '/api/employeelist/:id'
app.put("/api/employeelist/:id", async (req, res) => {
  try {
    const updated = await employeeModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position || req.body.designation,
        salary: req.body.salary
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ status: "ok", result: updated });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update employee" });
  }
});

//! dont delete this code. it connects the front end file.
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "Frontend", "index.html"));
});

//Server listening on http://localhost:3000/api/
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
