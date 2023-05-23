const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/campuzz_DB");
const db = mongoose.connection;


db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DB");
});
// db.grantRolesToUser('prateeksha', [{ role: 'root', db: 'admin' }])

module.exports = db;