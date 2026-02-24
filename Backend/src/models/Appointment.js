// Appointment model definition using Sequelize ORM

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("CONFIRMED", "CANCELLED", "COMPLETED"),
    defaultValue: "CONFIRMED",
  },
}, {
  tableName: "appointments",
  timestamps: true,
});

module.exports = Appointment;
