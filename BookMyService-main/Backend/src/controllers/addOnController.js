const AddOnModel = require('../models/AddOnModel');
const ServiceModel = require('../models/ServiceModel');
const moment = require("moment-timezone")
const uploadImage = require("../Helper/imageUploader.js")
module.exports = {
  getAllItems: async (req, res) => {
    try {
      const addOns = await AddOnModel.find({});
      res.status(200).json(addOns);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getAddOnById: async (req, res) => {
    const addonId = req.body._id;
    // console.log(req.body)

    try {
      const addOns = await AddOnModel.findById(addonId);
      res.status(200).json(addOns);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getAddOnBySerId: async (req, res) => {
    console.log(req.body)
    const addOnSerId = req.body.serId;
    // console.log(req.body)

    try {
      const addOns = await AddOnModel.findOne({ serId: addOnSerId });
      if (addOns != null) {
        res.status(200).json({ "addOns": addOns.addOnList });
      } else{
        res.status(200).json({ "message" : false });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  },
  removeAddOn:async (req, res) => {
    const serId = req.body.serId;
   const  addOnId = req.body.addOnId;
    console.log(addOnId)
    try{
      const addOn = await AddOnModel.findOne({"serId" : serId});
      console.log(addOn)
      const addOnList = addOn.addOnList;
      
      console.log(addOnList)
      for (let i = 0; i < addOnList.length; i++) {
        if (addOnList[i]._id.toString() === addOnId) {
          addOnList.splice(i, 1);
          break; // Exit the loop after removing one item.
        }
      } 
      addOn.addOnList = addOnList;
      
      console.log(addOn);
      const newAddOn = await AddOnModel.findByIdAndUpdate(addOn._id,addOn);
      console.log(newAddOn);
      res.send("ok");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  addAddOns: async (req, res) => {
    const serId = req.body.serId;
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    console.log(req.body)
    const addOnRecord = {
      "name": name,
      "price": price,
      "desc": desc
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }
  const image = req.files.image;
  const id = moment.utc().unix()
  let ext = image.name;
  ext = ext.substring(ext.indexOf(".") + 1);
  image.name = id + "." + ext;
  folderPath = "AddOns";
  // console.log(image.name)
  // Move the uploaded file to a specific location (e.g., 'uploads/')
  image.mv('src/assets/uploads/' + image.name, async (err) => {
      if (err) {
          return res.status(500).send(err);
      }
      const result = await uploadImage(id,folderPath,image.name);
      addOnRecord.url = result.secure_url;
      console.log(result)
      addOnRecord.imageId = result.public_id;
      try {
        ser = await ServiceModel.findById(serId);
        let ResposeAck = {
          message: false
        };
        console.log(ser)
        if (ser != null) {
          addOn = await AddOnModel.findOne({ "serId": serId }, { addOnList: true, _id: true })
          if (addOn != null && addOn != "") {
            const _id = addOn._id;
            console.log(addOn.addOnList)
  
            const items = addOn.addOnList;
            console.log(items + "here")
            items.push(addOnRecord);
            addOn.addAddList = items;
            newAddOn = await AddOnModel.findByIdAndUpdate(_id, addOn);
  
          } else {
            const addOn = new AddOnModel({
              serId: serId,
              addOnList: addOnRecord
            });
            newAddOn = await addOn.save();
          }
          ResposeAck = {
            message: true
          }
        } else {
          console.log("not found")
        }
        res.json(ResposeAck)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
  })
    
  }
};
