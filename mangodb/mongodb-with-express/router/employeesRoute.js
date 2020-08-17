const express = require("express");
const router = express.Router();

const EmployeesData = require("../module/employeesModule");

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
    res.status(400).json({ message: err.message });
  }
});

// ===== Middleware ===
async function getEmployee(req, res, next) {
  let employee;
  try {
    // employee = await EmployeeData.findById(req.params.id);
    employee = await EmployeesData.findOne({ name: req.params.name });
    if (employee == null)
      return res.status(404).json({ message: "employee NOT FOUND" });
  } catch (err) {
    res.status(500),
      json({
        message: err.message,
      });
  }
  // res.employee = employee[0];
  res.employee = employee;
  next();
}

// ===== Get an employee ===
// router.get("./:id", getEmployee, (req, res))
router.get("./:name", getEmployee, (req, res) => {
  res.status(200).json(res.employee);
});

// ===== Update an employee ===
router.get("./:name", getEmployee, (req, res) => {});

// ===== Delete an employee ===
router.get("./:name", getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.status(200).json({ message: "Employee has been deleted!" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
