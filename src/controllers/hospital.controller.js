const pool = require("../config/db");

exports.createHospital = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name)
      return res.status(400).json({ message: "Hospital name required" });

    const result = await pool.query(
      "INSERT INTO hospitals(name,address) VALUES($1,$2) RETURNING *",
      [name, address || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create hospital" });
  }
};


exports.getHospitals = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM hospitals ORDER BY id"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
};


exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const hospitalId = req.params.id;

    if (!name)
      return res.status(400).json({ message: "Department name required" });

    const result = await pool.query(
      `INSERT INTO departments(hospital_id,name)
       VALUES($1,$2)
       RETURNING *`,
      [hospitalId, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create department" });
  }
};


exports.getDepartmentsByHospital = async (req, res) => {
  try {
    const hospitalId = req.params.id;

    const result = await pool.query(
      "SELECT * FROM departments WHERE hospital_id=$1 ORDER BY id",
      [hospitalId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};
