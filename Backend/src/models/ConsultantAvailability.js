// ConsultantAvailability model definition using Sequelize ORM

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ConsultantAvailability = sequelize.define("ConsultantAvailability", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  available_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  available_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_booked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "consultant_availability",
  timestamps: true,
});

module.exports = ConsultantAvailability;
