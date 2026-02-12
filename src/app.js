const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/hospitals", require("./routes/hospital.routes"));
app.use("/api/consultations", require("./routes/consultation.routes"));



module.exports = app;
