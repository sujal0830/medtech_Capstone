const pool = require("../config/db");

const findAvailableConsultant = async (hospitalId, departmentId) => {
  const result = await pool.query(
    `SELECT id
     FROM consultants
     WHERE hospital_id = $1
       AND department_id = $2
       AND is_available = true
     LIMIT 1`,
    [hospitalId, departmentId]
  );

  return result.rows[0];
};

const createConsultationFile = async (
  patientId,
  hospitalId,
  departmentId,
  description,
  consultantId,
  status
) => {
  const result = await pool.query(
    `INSERT INTO consultation_files
     (patient_id, hospital_id, department_id, description, consultant_id, status)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      patientId,
      hospitalId,
      departmentId,
      description,
      consultantId,
      status
    ]
  );

  return result.rows[0];
};

const findConsultantByUserId = async (userId) => {
  const result = await pool.query(
    "SELECT id FROM consultants WHERE user_id = $1",
    [userId]
  );

  return result.rows[0];
};

const getConsultationsByConsultantId = async (consultantId) => {
  const result = await pool.query(
    `SELECT *
     FROM consultation_files
     WHERE consultant_id = $1
     ORDER BY created_at DESC`,
    [consultantId]
  );

  return result.rows;
};

module.exports = {
  findAvailableConsultant,
  createConsultationFile,
  findConsultantByUserId,
  getConsultationsByConsultantId
};
