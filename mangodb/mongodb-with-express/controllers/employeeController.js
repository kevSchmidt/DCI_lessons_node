const EmployeesData = require("../module/employeesModule");

async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await EmployeesData.findOne({ name: req.params.name });

    if (employee == null)
      return res.status(404).json({
        message: "employee NOT FOUND",
      });
  } catch (err) {
    res.status(500), json({ message: err.message });
  }
  res.employee = employee;
  next();
}

async function getAddress(req, res, next) {
  let employee;
  try {
    employee = await EmployeesData.find({ address: req.params.address });

    if (employee == null)
      return res.status(404).json({
        message: "address NOT FOUND",
      });
  } catch (err) {
    res.status(500), json({ message: err.message });
  }
  res.employee = employee;
  next();
}

module.exports = { getEmployee, getAddress };
