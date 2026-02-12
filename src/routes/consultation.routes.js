const router = require("express").Router();
const controller = require("../controllers/consultation.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

/*
 Patient creates consultation file
*/
router.post(
  "/",
  authenticate,
  authorize(["PATIENT"]),
  controller.createConsultationFile
);

/*
 Consultant views assigned files
*/
router.get(
  "/my",
  authenticate,
  authorize(["CONSULTANT"]),
  controller.getMyConsultations
);

module.exports = router;
