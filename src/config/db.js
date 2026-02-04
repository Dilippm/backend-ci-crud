const mongoose = require("mongoose");

module.exports = async (uri) => {
  if (!uri) {
    throw new Error("MONGO_URI is required");
  }

  if (mongoose.connection.readyState === 1) {
    return; // already connected
  }

  await mongoose.connect(uri);
};
