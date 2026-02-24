// Consultant model definition using Sequelize ORM

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Consultant = sequelize.define("Consultant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  specialization: {
    type: DataTypes.STRING(100),
  },
}, {
  tableName: "consultants",
  timestamps: true,
});

module.exports = Consultant;
