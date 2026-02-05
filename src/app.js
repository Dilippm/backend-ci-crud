const express = require("express");

const app = express();
app.use(express.json());

app.use("/users", require("./routes/user.routes"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
