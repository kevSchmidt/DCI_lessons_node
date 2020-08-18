const EmployeesData = require("../module/employeesModule");

// ===== Get employee by name ===
const getEmployee = async (req, res, next) => {
  let employee;
  try {
    employee = await EmployeesData.findOne({ name: req.params.name });

    if (employee == null)
      return res.status(404).json({
        message: "Employee NOT FOUND",
      });
  } catch (err) {
    res.status(500), json({ message: err.message });
  }
  res.employee = employee;
  next();
};

// ===== Get employee by address ===
const getAddress = async (req, res, next) => {
  let employee;
  try {
    employee = await EmployeesData.find({ address: req.params.address });

    if (employee == null)
      return res.status(404).json({
        message: "Address NOT FOUND",
      });
  } catch (err) {
    res.status(500), json({ message: err.message });
  }
  res.employee = employee;
  next();
};

// ===== Get an employee ===
const getOneEmployee = (req, res) => {
  res.status(200).json(res.employee);
};

// ===== Get all employees ===
const getAllEmployee = async (req, res) => {
  try {
    const employees = await EmployeesData.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===== Add an employee ===
const addNewEmployee = async (req, res) => {
  const employee = new EmployeesData({
    name: req.body.name,
    age: req.body.age,
    add: req.body.address,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// ===== Update an employee ===
const updateOneEmployee = async (req, res) => {
  console.log(req.body);
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
    res.status(200).json({ message: "Employee Updated", data: res.employee });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// ===== Delete an employee ===
const deleteOneEmployee = async (req, res) => {
  try {
    await res.employee.remove();
    res.status(200).json({ message: "Employee Deleted" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getEmployee,
  getAddress,
  getAllEmployee,
  updateOneEmployee,
  getOneEmployee,
  addNewEmployee,
  deleteOneEmployee,
};
