// Patient model definition using Sequelize ORM

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Patient = sequelize.define("Patient", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
}, {
  tableName: "patients",
  timestamps: true,
});

module.exports = Patient;
