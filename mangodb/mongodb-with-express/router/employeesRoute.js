const express = require("express");

const EmployeesData = require("../module/employeesModule");
const {
  getEmployee,
  getAddress,
} = require("../controllers/employeeController");

const router = express.Router();

// ===== Get all employees ===
router.get("/", async (req, res) => {
  try {
    const employees = await EmployeesData.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Add an employee ===
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
    res.status(400).json({
      message: err.message,
    });
  }
});

// ===== Get an employee & address ===
router.get("./:name", getEmployee, (req, res) => {
  res.status(200).json(res.employee);
});

router.get("./:address", getAddress, (req, res) => {
  res.status(200).json(res.employee);
});

// ===== Update an employee ===
router.patch("./:name", getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.age != null) {
    res.employee.age = req.body.age;
  }
  if (req.body.address != null) {
    res.employee.address = req.body.address;
  }

  try {
    await res.employee.save();
    res.status(200).json({
      message: "Employee updated with success!",
      data: res.employee,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// ===== Delete an employee ===
router.delete("./:name", getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.status(200).json({
      message: "Employee has been deleted!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
