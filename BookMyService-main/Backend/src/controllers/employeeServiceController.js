const EmpSerModel = require('../models/EmployeeServiceModel');
const ServiceModel = require('../models/ServiceModel');
module.exports = {
  getAllEmpSers: async (req, res) => {
    try {
      const empSer = await EmpSerModel.find({});
      res.status(200).json(empSer);
    }
    catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  addService: async (req, res) => {
    try {
      const empId = req.body.empId;
      const serId = req.body.serId;
      console.log(empId)
      const empSer = await EmpSerModel.findOne({ "empId": empId });
      console.log(empSer)
      if (empSer == null || empSer == '') {

        const serList = {
          serId: serId
        }
        const empSerNew = new EmpSerModel({
          empId: req.body.empId,
          serList: serList
        });
        const response = await empSerNew.save();

        res.status(200).json("created new");
      } else {
        const isNew = await EmpSerModel.findOne({ "serList.serId": serId, empId: empId });
        if (isNew == '' || isNew == null) {

          const _id = empSer._id;

          const serList = empSer.serList;
          console.log(empSer)
          serList.push({ serId: serId });
          empSer.serList = serList;
          const newEmpSer = await EmpSerModel.findByIdAndUpdate(_id, empSer)
          res.status(200).json("added");
        }
        else {
          res.status(200).json("already exists");
        }
      }
    }
    catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  },
  removeService: async (req, res) => {
    console.log(req.body)
    try {
      const empId = req.body.empId;
      const serId = req.body.serId;
    
      const empSer = await EmpSerModel.findOne({ "empId": empId });
      const _id = empSer._id;
      if (empSer == null || empSer == '') {
        res.status(200).json("employee does not have any services");
      } else {
        const isNew = await EmpSerModel.findOne({ "serList.serId": serId, empId: empId });
        if (isNew == '' || isNew == null) {
          res.status(200).json("service does not exists");
        }
        else {
          const serList = empSer.serList;
          for (let i = 0; i < serList.length; i++) {
            if (serList[i].serId.toString() === serId) {
              serList.splice(i, 1);
              break; // Exit the loop after removing one item.
            }
          }
          empSer.serList = serList;

          // console.log(customer);
          const newEmpSer = await EmpSerModel.findByIdAndUpdate(_id, empSer);
          res.status(200).json("removed");
        }
      }
    }
    catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  },
  getEmpSerByEmpId: async (req, res) => {
    try {
      const responseAck = {

      };
      const empSer = await EmpSerModel.findOne({ empId: req.body._id }, { "serList.serId": true });
      if (empSer != null) {
        let empSerList = empSer.serList.map(({ serId }) => serId)
        const servicesToBeAdded = await ServiceModel.find({ _id: { $nin: empSerList } })
        const existingServices = await ServiceModel.find({ _id: { $in: empSerList } })
        responseAck.existingSer = existingServices;
        responseAck.nonExistingSer = servicesToBeAdded;
      } else {
        const servicesToBeAdded = await ServiceModel.find({ isActive: true })
        responseAck.nonExistingSer = servicesToBeAdded;
        responseAck.existingSer = [];
      }

      res.status(200).json(responseAck);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
  getEmpSerBySerId: async (req, res) => {
    try {
      const empSer = await EmpSerModel.find({ serId: req.body.serId });
      res.status(200).json(empSer);
    }
    catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  updateEmpSer: async (req, res) => {

    const id = req.body.id;
    const { serList } = req.body;
    try {
      const empSer = await EmpSerModel.findByIdAndUpdate(id, { serList }, { new: true });
      res.status(200).json(empSer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  deleteEmpSer: async (req, res) => {

    const id = req.body.id;
    try {
      const empSer = await EmpSerModel.findByIdAndDelete(id);
      res.send(empSer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  // Similar functions for updating and deleting empSer...
};