const express = require("express");

const {
  getEmployee,
  getAddress,
  getAllEmployee,
  addNewEmployee,
  getOneEmployee,
  updateOneEmployee,
  deleteOneEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

// ===== homepage ===
router.route("/").get(getAllEmployee).post(addNewEmployee);

// ===== name ===
router
  .route("/:name")
  .get(getEmployee, getOneEmployee)
  .patch(getEmployee, updateOneEmployee)
  .delete(getEmployee, deleteOneEmployee);

// ===== address ===
router.get("/search/:address", getAddress, (req, res) => {
  res.status(200).json(res.employee);
});

module.exports = router;
