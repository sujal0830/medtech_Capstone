// Centralized model index for Sequelize ORM

const sequelize = require("../config/db");

const User = require("./user");
const Department = require("./department");
const Consultant = require("./consultant");
const Patient = require("./patient");
const ConsultantAvailability = require("./consultantavailability");
const ConsultationRequest = require("./consultationRequest");
const Appointment = require("./appointment");

// Relations
User.hasOne(Consultant, { foreignKey: "user_id" });
Consultant.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Patient, { foreignKey: "user_id" });
Patient.belongsTo(User, { foreignKey: "user_id" });

Department.hasMany(Consultant, { foreignKey: "department_id" });
Consultant.belongsTo(Department, { foreignKey: "department_id" });

Consultant.hasMany(ConsultantAvailability, { foreignKey: "consultant_id" });
ConsultantAvailability.belongsTo(Consultant, { foreignKey: "consultant_id" });

Patient.hasMany(ConsultationRequest, { foreignKey: "patient_id" });
ConsultationRequest.belongsTo(Patient, { foreignKey: "patient_id" });

Department.hasMany(ConsultationRequest, { foreignKey: "department_id" });
ConsultationRequest.belongsTo(Department, { foreignKey: "department_id" });

Patient.hasMany(Appointment, { foreignKey: "patient_id" });
Consultant.hasMany(Appointment, { foreignKey: "consultant_id" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id" });
Appointment.belongsTo(Consultant, { foreignKey: "consultant_id" });
Appointment.belongsTo(ConsultantAvailability, { foreignKey: "availability_id" });

module.exports = {
  sequelize,
  User,
  Department,
  Consultant,
  Patient,
  ConsultantAvailability,
  ConsultationRequest,
  Appointment,
};
