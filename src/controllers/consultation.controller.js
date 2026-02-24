// const consultationModel = require("../models/consultation.model");

// exports.createConsultationFile = async (req, res) => {
//   try {
//     const patientId = req.user.id;
//     const { hospital_id, department_id, description } = req.body;

//     if (!hospital_id || !department_id || !description)
//       return res.status(400).json({ message: "Missing fields" });

//     const consultant =
//       await consultationModel.findAvailableConsultant(
//         hospital_id,
//         department_id
//       );

//     let consultantId = null;
//     let status = "SUBMITTED";

//     if (consultant) {
//       consultantId = consultant.id;
//       status = "ASSIGNED";
//     }

//     const file =
//       await consultationModel.createConsultationFile(
//         patientId,
//         hospital_id,
//         department_id,
//         description,
//         consultantId,
//         status
//       );

//     res.status(201).json(file);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create consultation file" });
//   }
// };


exports.getMyConsultations = async (req, res) => {
  try {
    const userId = req.user.id;

    const consultant =
      await consultationModel.findConsultantByUserId(userId);

    if (!consultant)
      return res.status(404).json({ message: "Consultant profile not found" });

    const consultations =
      await consultationModel.getConsultationsByConsultantId(
        consultant.id
      );

    res.json(consultations);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch consultations" });
  }
};
