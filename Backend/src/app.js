const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
// app.use("/api/hospitals", require("./routes/hospital.routes"));
// app.use("/api/consultations", require("./routes/consultation.routes"));



module.exports = app;
