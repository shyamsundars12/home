const ServiceModel = require('../models/ServiceModel');
const moment = require("moment-timezone");
const uploadImage = require("../Helper/imageUploader.js");

module.exports = {
  createService: async (req, res) => {
    try {
      console.log(req.body);

      // Validate required fields
      if (!req.body.name || !req.body.price || !req.body.time || !req.body.desc) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Validate file upload
      if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "Image file is required" });
      }

      const image = req.files.image;
      const id = moment.utc().unix();
      const ext = image.name.split('.').pop();

      if (!ext) {
        return res.status(400).json({ error: "Invalid file extension" });
      }

      image.name = `${id}.${ext}`;
      const folderPath = "Services";

      // Move the uploaded file to a local folder
      const uploadPath = `src/assets/uploads/${image.name}`;
      image.mv(uploadPath, async (err) => {
        if (err) {
          console.error("File move error:", err);
          return res.status(500).json({ error: "Failed to upload image" });
        }

        // Upload the image to cloud storage
        const result = await uploadImage(id, folderPath, image.name);
        console.log(result);

        // Save service to the database
        const service = new ServiceModel({
          name: req.body.name,
          price: req.body.price,
          time: req.body.time,
          desc: req.body.desc,
          url: result.secure_url,
          imageId: result.public_id
        });

        const newService = await service.save();
        return res.status(201).json(newService);
      });
    } catch (err) {
      console.error("Error in createService:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getService: async (req, res) => {
    try {
      const services = await ServiceModel.find({});
      return res.json(services);
    } catch (err) {
      console.error("Error in getService:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getServiceById: async (req, res) => {
    const { serId } = req.body; // Get serId from request body
    try {
        const service = await ServiceModel.findById(serId);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        console.log(service);
        return res.json(service);
    } catch (err) {
        console.error("Error in getServiceById:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
},


  updateService: async (req, res) => {
    const { _id } = req.body;
    const updateData = req.body;

    try {
      const updatedService = await ServiceModel.findByIdAndUpdate(_id, updateData, { new: true });
      if (!updatedService) {
        return res.status(404).json({ error: "Service not found" });
      }
      return res.json(updatedService);
    } catch (err) {
      console.error("Error in updateService:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  InactiveService: async (req, res) => {
    const { _id } = req.body;

    try {
      const updatedService = await ServiceModel.findByIdAndUpdate(_id, { isActive: false }, { new: true });
      if (!updatedService) {
        return res.status(404).json({ error: "Service not found" });
      }
      return res.json(updatedService);
    } catch (err) {
      console.error("Error in InactiveService:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  ActiveService: async (req, res) => {
    const { _id } = req.body;

    try {
      const updatedService = await ServiceModel.findByIdAndUpdate(_id, { isActive: true }, { new: true });
      if (!updatedService) {
        return res.status(404).json({ error: "Service not found" });
      }
      return res.json(updatedService);
    } catch (err) {
      console.error("Error in ActiveService:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
