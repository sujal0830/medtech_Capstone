const router = require("express").Router();
const controller = require("../controllers/hospital.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

/*
 Admin only
*/

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  controller.createHospital
);

router.get(
  "/",
  authenticate,
  controller.getHospitals
);

router.post(
  "/:id/departments",
  authenticate,
  authorize(["ADMIN"]),
  controller.createDepartment
);

router.get(
  "/:id/departments",
  authenticate,
  controller.getDepartmentsByHospital
);

module.exports = router;
