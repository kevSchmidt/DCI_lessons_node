const express = require("express");

const {
  getEmployeeByName,
  getEmployeeByAddress,
  getEmployee,
  getAllEmployees,
  addEmployee,
  deleteEmployee,
  updatePartlyEmployee,
  updateCompletelyEmployee,
  updateManyEmployeesAddresses,
} = require("../controllers/employeeController");

const router = express.Router();

// ===== homepage route ===
router.route("/").get(getAllEmployees).post(addEmployee);

// ===== name route ===
router
  .route("/:name")
  .get(getEmployeeByName, getEmployee)
  .patch(getEmployeeByName, updatePartlyEmployee)
  .put(getEmployeeByName, updateCompletelyEmployee)
  .delete(getEmployeeByName, deleteEmployee);

// ===== address route ===
router.get("/:address", getEmployeeByAddress, (req, res) => {
  res.status(200).json(res.employee);
});

// ===== update route ===
router.put("/:update", getEmployeeByAddress, updateManyEmployeesAddresses);

module.exports = router;
