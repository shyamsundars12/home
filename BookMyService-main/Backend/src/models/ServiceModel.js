const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true },
  desc: { type: String, required: true },
  address: { type: String }, // Add this field if needed
  url: { type: String },
  imageId: { type: String },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Service', ServiceSchema);
