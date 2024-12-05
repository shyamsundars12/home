const moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
const OrderModel = require("../models/OrderModel");
const ServiceModel = require("../models/ServiceModel");
const EmpSerModel = require("../models/EmployeeServiceModel");
const { default: mongoose } = require("mongoose");
module.exports = {
    
    createOrder: async (req, res) => {
        try {
            const serList = req.body.serList;
            let temp = [];
            const serDate = req.body.service_date;
            let i = 0;
            let orderId = new mongoose.Types.ObjectId();
            for (let ser of serList) {
                let empIdList = await EmpSerModel.distinct("empId", { "serList.serId": ser.serId }, { empId: true });
                serTimeList = [];
                const startTime = req.body.service_time;
                hour = startTime[0] + startTime[1]
                minute = startTime[3] + startTime[4]
                var st = moment({ hour: hour, minute: minute, seconds: 0 });
                let t = moment(st);
                serTimeList.push(t.add(-180, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                serTimeList.push(t.add(60, 'minute').format('HH:mm:ss'))
                console.log(serTimeList)
                let orderList = []
                let foundEmpId = null;
                let empFound = false;
                for (let eid of empIdList) {
                    const availOrderList = await OrderModel.findOne({ "empId": eid, service_date: serDate, service_startTime: { $in: serTimeList } })
                    console.log(availOrderList)
                    if (availOrderList != null && availOrderList != "") {
                        orderList.push(availOrderList)
                    } else {
                        foundEmpId = eid;
                        empFound = true;
                        break;
                    }
                }

                if (empFound) {
                    let serRes = await ServiceModel.findById(ser.serId, { time: true, price: true });
                    console.log(serRes);
                    let price = 0;
                    if (req.body.discount != "") {
                        price = serRes.price;
                    }
                    else {
                        price = serRes.price - req.body.discount;
                    }
                    let service_endTime = st.add(serRes.time, 'minute').format('HH:mm:ss');
                    var order = new OrderModel({
                        custId: req.body.custId,
                        serId: ser.serId,
                        orderId: orderId,
                        empId: foundEmpId,
                        booking_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
                        service_startTime: req.body.service_time,
                        service_endTime: service_endTime,
                        service_date: req.body.service_date,
                        address: req.body.address,
                        payment_mode: req.body.payment_mode,
                        amount: price,
                        status: "assigned",
                        promocode: req.body.promocode,
                    });
                    // console.log(order);
                    i++;
                    const newOrder = await order.save();
                    console.log(newOrder)

                }

            }
            let responseAck = {}
            console.log(i)
            if (i == 0) {
                console.log("employee not found")
                responseAck.serviceAssign = 0;
                responseAck.status = "employee not found"
                responseAck.code = 2
            }
            else if (i < serList.length) {
                console.log("employee not found")
                responseAck.serviceAssign = i;
                responseAck.status = "ok"
                responseAck.code = 1; // some employee assigned
            } else {
                console.log("employee assigned")
                responseAck.serviceAssign = i;
                responseAck.status = "success"
                responseAck.code = 0; //
            }
            res.json(responseAck);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    getOrder: async (req, res) => {
        try {
            const order = await OrderModel.find({});
            res.json(order);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await OrderModel.find({ orderId: req.body.orderId });
            res.json(order);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    getOrderByCustId: async (req, res) => {

        try {
            const order = await OrderModel.find({ custId: req.body.custId });
            res.json(order);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    getOrderByEmpId: async (req, res) => {

        try {
            const order = await OrderModel.find({ empId: req.body.empId });
            res.json(order);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    updateOrder: async (req, res) => {

        const id = req.body.id;
        const { empId, serList, service_datetime, address, payment_mode, status, isActive } = req.body;
    
        try {
            const order = await OrderModel.findByIdAndUpdate(id, { empId, serList, service_datetime, address, payment_mode, status, isActive }, { new: true });
            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    deleteOrder: async (req, res) => {

        const id = req.body.id;
        try {
            const order = await OrderModel.findByIdAndDelete(id);
            res.send(order);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    // Similar functions for updating and deleting empSer...
};
