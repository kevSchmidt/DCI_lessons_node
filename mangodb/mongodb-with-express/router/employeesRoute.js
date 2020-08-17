const express = require("express");
const router = express.Router();

const EmployeesData = require("../module/employeesModule");

router.get("/", async (req, res) => {
  try {
    const employees = await EmployeesData.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const employee = new EmployeesData({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
