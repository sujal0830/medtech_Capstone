// ConsultantRequest model definition using Sequelize ORM

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ConsultationRequest = sequelize.define("ConsultationRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
    defaultValue: "PENDING",
  },
}, {
  tableName: "consultation_requests",
  timestamps: true,
});

module.exports = ConsultationRequest;
