const moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
const distanceCalc = require('../Helper/distanceFinder')
const OrderModel = require("../models/OrderModel");
const AddOnModel = require("../models/AddOnModel");
const ServiceModel = require("../models/ServiceModel");
const EmpSerModel = require("../models/EmployeeServiceModel");
const EmployeeModel = require("../models/EmployeeModel");
const emailSender = require("../Helper/otpHelper")
const { default: mongoose } = require("mongoose");
const CustomerModel = require('../models/CustomerModel');
const { response } = require('express');
const stripe = require('stripe')("sk_test_51O2WDWSDtYEklcYFMYUjPxx6mOCNQLz9xQnNs9mXKVa5wfVJdsSwMV8sYMmREvId03RHBm8Xs6ayDaF6cgvJg5Up003VkJPTVB")
module.exports = {
    checkAvailability: async (req, res) => {
        try {
            const serId = req.body.serId;
            const date = req.body.date
            const time = req.body.time
            const empIdList = await EmpSerModel.distinct("empId", { "serList.serId": serId }, { empId: true });
            // console.log(empIdList)
            serTimeList = [];
            const startTime = time;
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
            // console.log(serTimeList)
            let orderList = []
            let foundEmpId = null;
            let empFound = false;
            for (let eid of empIdList) {
                // console.log(eid)
                const availOrderList = await OrderModel.findOne({ "empId": eid, service_date: date, service_startTime: { $in: serTimeList }, isActive: true })
                // console.log(availOrderList)
                if (availOrderList != null && availOrderList != "") {
                    orderList.push(availOrderList)
                } else {
                    foundEmpId = eid;
                    empFound = true;
                    break;
                }
            }
            if (empFound) {
                responseAck = {
                    message: true
                }
            } else {
                responseAck = {
                    message: false
                }
            }
            // console.log(responseAck)
            res.json(responseAck);
        }
        catch (err) {
            res.json({
                message: err
            });
        }
    },
    createOrder: async (req, res) => {
        try {
            const { custId, address, lat, lng, service_date, serList, payment_method, promocode, discount } = req.body;
    
            // Validate inputs
            if (!custId || !address || !lat || !lng || !service_date || !serList || serList.length === 0) {
                return res.json({ status: 'error', message: 'Missing required fields' });
            }
    
            // Find customer and get their cart
            const customer = await CustomerModel.findById(custId, { cart: true });
            if (!customer) return res.json({ status: 'error', message: 'Customer not found' });
    
            // Update the address with latitude and longitude
            address.lat = lat;
            address.lng = lng;
    
            const orderId = moment().unix() * 2;
            let assignedEmployeeCount = 0;
            let totalServices = serList.length;
    
            for (const ser of serList) {
                // Get list of employees for the service
                const empIdList = await EmpSerModel.distinct("empId", { "serList.serId": ser.serId });
    
                let foundEmployee = false;
                let empId = null;
    
                // Process employee availability
                for (const eid of empIdList) {
                    const availOrderList = await OrderModel.findOne({
                        empId: eid,
                        service_date,
                        service_startTime: { $in: generateServiceTimeSlots(ser.time) },
                        isActive: true
                    });
    
                    if (!availOrderList) {
                        const employee = await EmployeeModel.findById(eid, { address: true });
                        const distance = distanceCalc(lat, lng, employee.address[0].lat, employee.address[0].lng);
                        if (distance <= 10) {
                            empId = eid;
                            foundEmployee = true;
                            break;
                        }
                    }
                }
    
                if (foundEmployee) {
                    // Service details and pricing
                    const service = await ServiceModel.findById(ser.serId);
                    if (!service) continue;
    
                    const price = discount ? service.price - discount : service.price;
                    const service_endTime = calculateServiceEndTime(ser.time, service.time);
    
                    // Create new order
                    const order = new OrderModel({
                        custId,
                        serId: ser.serId,
                        orderId,
                        empId,
                        booking_datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        service_startTime: ser.time,
                        service_endTime,
                        service_date,
                        address,
                        payment_mode: payment_method || "Cash",
                        amount: price,
                        status: "assigned",
                        promocode: promocode || null
                    });
    
                    await order.save();
                    assignedEmployeeCount++;
                }
            }
    
            // Prepare the response
            let responseAck = {
                serviceAssign: assignedEmployeeCount,
                status: assignedEmployeeCount === totalServices ? "success" : "employee not found",
                code: assignedEmployeeCount === totalServices ? 0 : 2,
                orderId: assignedEmployeeCount === totalServices ? orderId : null
            };
    
            // If some services were not assigned an employee, delete those orders
            if (assignedEmployeeCount < totalServices) {
                await OrderModel.deleteMany({ orderId });
            }
    
            res.json(responseAck);
        } catch (err) {
            console.error(err);
            res.json({ status: 'error', message: err.message });
        }
        function generateServiceTimeSlots(startTime) {
            const [hour, minute] = startTime.split(":");
            const baseTime = moment({ hour, minute });
            let timeSlots = [];
        
            for (let i = 0; i < 7; i++) {
                timeSlots.push(baseTime.add(i * 60, 'minutes').format('HH:mm:ss'));
            }
        
            return timeSlots;
        }
        
        // Helper function to calculate service end time based on start time and duration
        function calculateServiceEndTime(startTime, duration) {
            const [hour, minute] = startTime.split(":");
            const startMoment = moment({ hour, minute });
            return startMoment.add(duration, 'minutes').format('HH:mm:ss');
        }
    },
    
    // Helper function to generate service time slots based on service start time
    
    test: async (req, res) => {
        try {
            // console.log(moment().unix());
            res.send("he;;pw");
        }
        catch (err) {
            res.send(err);
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

            const custId = req.body.custId;
            const completedOrders = await OrderModel.aggregate(
                [
                    { $match: { custId: new mongoose.Types.ObjectId(custId), status: { $not: { $eq: "assigned" } } } },
                    { $sort: { service_date: -1 } },

                    {
                        $lookup: {
                            from: "services",
                            localField: "serId",
                            foreignField: "_id",
                            as: "serviceDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "employees",
                            localField: "empId",
                            foreignField: "_id",
                            as: "employeeDetails",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            orderId: 1,
                            serId: 1,
                            empId: 1,
                            custId: 1,
                            status: 1,
                            amount: 1,
                            service_startTime: 1,
                            service_endTime: 1,
                            service_date: 1,
                            payment_mode: 1,
                            booking_datetime: 1,
                            feedActive: 1,
                            "serviceDetails.name": 1,
                            "serviceDetails.price": 1,
                            "serviceDetails.avgRating": 1,
                            "serviceDetails.url": 1,
                            "serviceDetails.url": 1,
                            "employeeDetails.fname": 1,
                            "employeeDetails.lname": 1,
                            "employeeDetails.contact_no": 1,
                            "employeeDetails.rating": 1,

                        }
                    }

                ],
            )
            const pendingOrders = await OrderModel.aggregate(
                [
                    { $match: { custId: new mongoose.Types.ObjectId(custId), status: "assigned" } },
                    { $sort: { service_date: -1 } },

                    {
                        $lookup: {
                            from: "services",
                            localField: "serId",
                            foreignField: "_id",
                            as: "serviceDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "employees",
                            localField: "empId",
                            foreignField: "_id",
                            as: "employeeDetails",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            orderId: 1,
                            serId: 1,
                            empId: 1,
                            custId: 1,
                            status: 1,
                            amount: 1,
                            service_startTime: 1,
                            service_endTime: 1,
                            service_date: 1,
                            payment_mode: 1,
                            booking_datetime: 1,
                            "serviceDetails.name": 1,
                            "serviceDetails.price": 1,
                            "serviceDetails.avgRating": 1,
                            "serviceDetails.url": 1,
                            "serviceDetails.url": 1,
                            "employeeDetails.fname": 1,
                            "employeeDetails.lname": 1,
                            "employeeDetails.contact_no": 1,
                            "employeeDetails.rating": 1,

                        }
                    }

                ],
            )
            // console.log(completedOrders)
            res.json({ completedOrders: completedOrders, pendingOrders: pendingOrders });
        }
        catch (err) {
            console.log(err)
            res.json({
                message: err
            });
        }
    },
    getOrderTodayByEmpId: async (req, res) => {
        try {
            const empId = req.body.empId;
            const date = moment().format('YYYY-MM-DD');
            // console.log(date)
            const pendingOrders = await OrderModel.aggregate(
                [
                    { $match: { empId: new mongoose.Types.ObjectId(empId), service_date: date, status: "assigned" } },
                    { $sort: { service_date: -1 } },

                    {
                        $lookup: {
                            from: "services",
                            localField: "serId",
                            foreignField: "_id",
                            as: "serviceDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "customers",
                            localField: "custId",
                            foreignField: "_id",
                            as: "customerDetails",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            orderId: 1,
                            serId: 1,
                            empId: 1,
                            custId: 1,
                            status: 1,
                            amount: 1,
                            service_startTime: 1,
                            service_endTime: 1,
                            service_date: 1,
                            payment_mode: 1,
                            booking_datetime: 1,
                            "serviceDetails.name": 1,
                            "serviceDetails.price": 1,
                            "serviceDetails.avgRating": 1,
                            "serviceDetails.url": 1,
                            "serviceDetails.url": 1,
                            "customerDetails.fname": 1,
                            "customerDetails.lname": 1,
                            "customerDetails.contact_no": 1,
                            "customerDetails.address": 1,

                        }
                    }

                ],
            )
            // console.log(pendingOrders)
            res.json({ pendingOrders: pendingOrders });
        }
        catch (err) {
            console.log(err)
            res.send(
                err
            );
        }
    },
    startService: async (req, res) => {
        try {
            const orderId = req.body.orderId;
            const order = await OrderModel.findById(orderId, { status: true, empId: true })
            if (order == null) {
                res.json({ message: false });
            } else {
                if (order.status === "active") {
                    res.send({ message: false });
                } else {
                    order.status = 'active';
                    await OrderModel.findByIdAndUpdate(orderId, order);
                    res.json({ message: true })
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Invalid Action");
        }
    },
    getServiceCompOTP: async (req, res) => {
        try {
            const orderId = req.body.orderId;
            const order = await OrderModel.findById(orderId, { status: true, empId: true })
            if (order == null) {
                res.json({ message: false });
            } else {
                if (order.status === "active") {
                    order.status = 'completed';
                    await OrderModel.findByIdAndUpdate(orderId, order);
                    res.json({ message: true })
                } else {
                    res.send({ message: false });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Invalid Action");
        }
    },
    endService: async (req, res) => {
        try {
            const orderId = req.body.orderId;
            const order = await OrderModel.findById(orderId, { status: true, empId: true })
            if (order == null) {
                res.json({ message: false });
            } else {
                if (order.status === "active") {
                    order.status = 'completed';
                    await OrderModel.findByIdAndUpdate(orderId, order);
                    res.json({ message: true })
                } else {
                    res.send({ message: false });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Invalid Action");
        }
    },
    getOrderUpcomingByEmpId: async (req, res) => {
        try {
            const empId = req.body.empId;
            const date = moment().format('YYYY-MM-DD');
            console.log(date)
            const upcomingOrders = await OrderModel.aggregate(
                [
                    { $match: { empId: new mongoose.Types.ObjectId(empId), service_date: { $not: { $eq: date } }, status: "assigned" } },
                    { $sort: { service_date: -1 } },

                    {
                        $lookup: {
                            from: "services",
                            localField: "serId",
                            foreignField: "_id",
                            as: "serviceDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "customers",
                            localField: "custId",
                            foreignField: "_id",
                            as: "customerDetails",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            orderId: 1,
                            serId: 1,
                            empId: 1,
                            custId: 1,
                            status: 1,
                            amount: 1,
                            service_startTime: 1,
                            service_endTime: 1,
                            service_date: 1,
                            payment_mode: 1,
                            booking_datetime: 1,
                            "serviceDetails.name": 1,
                            "serviceDetails.price": 1,
                            "serviceDetails.avgRating": 1,
                            "serviceDetails.url": 1,
                            "serviceDetails.url": 1,
                            "customerDetails.fname": 1,
                            "customerDetails.lname": 1,
                            "customerDetails.contact_no": 1,
                            "customerDetails.address": 1,

                        }
                    }

                ],
            )
            // console.log(upcomingOrders)
            res.json({ upcomingOrders: upcomingOrders });
        }
        catch (err) {
            console.log(err)
            res.send(
                err
            );
        }
    },
    createCheckout: async (req, res) => {

        // console.log(req.body)
        const services = req.body.products
        console.log(services)
        const lineItems = services.map((services)=>({
            price_data:{
                
                currency:"inr",
                product_data:{
                    name: services.serviceDetails.name,
                },
                unit_amount : services.serviceDetails.price * 100,
            },
            quantity : "1",
        }));
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/Customer/Checkout/success`,
            cancel_url: `http://localhost:3000/Customer/Checkout/failed`,
        });
        console.log("session Data:")
        console.log(session)
        // session.orderId = 10001;
        res.json({id:session.id});

    },
    success : async (req, res) => {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        // const customer = await stripe.customers.retrieve(session.customer);
        console.log("orderId")
        console.log(session.status)
        // console.log(customer)
        
        // res.send(`<html><body><h1>Thanks for your order!</h1></body></html>`);
        res.redirect("http://localhost:3000/Customer/CustOrder");
        res.end();
    },
    getHistoryByEmpId: async (req, res) => {
        try {
            const empId = req.body.empId;
            // const date = moment().format('YYYY-MM-DD');
            // console.log(date)
            const history = await OrderModel.aggregate(
                [
                    { $match: { empId: new mongoose.Types.ObjectId(empId), status: "completed" } },
                    { $sort: { service_date: -1 } },

                    {
                        $lookup: {
                            from: "services",
                            localField: "serId",
                            foreignField: "_id",
                            as: "serviceDetails",
                        },
                    },
                    {
                        $lookup: {
                            from: "customers",
                            localField: "custId",
                            foreignField: "_id",
                            as: "customerDetails",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            orderId: 1,
                            serId: 1,
                            empId: 1,
                            custId: 1,
                            status: 1,
                            amount: 1,
                            service_startTime: 1,
                            service_endTime: 1,
                            service_date: 1,
                            payment_mode: 1,
                            booking_datetime: 1,
                            "serviceDetails.name": 1,
                            "serviceDetails.price": 1,
                            "serviceDetails.avgRating": 1,
                            "serviceDetails.url": 1,
                            "serviceDetails.url": 1,
                            "customerDetails.fname": 1,
                            "customerDetails.lname": 1,
                            "customerDetails.contact_no": 1,
                            "customerDetails.address": 1,

                        }
                    }

                ],
            )
            // console.log(history)
            res.json({ "history": history });
        }
        catch (err) {
            console.log(err)
            res.send(
                err
            );
        }
    },
    paymentDeclined:async (req, res) => {

        const orderId = req.body.orderId;

        try {
            status = "cancelled";
            isActive = false;
            const order = await OrderModel.updateMany({orderId:orderId}, { status, isActive });
            res.json({ "message": true });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }, 
    cancelOrder: async (req, res) => {

        const id = req.body.id;
        try {
            status = "cancelled";
            isActive = false;
            const order = await OrderModel.findByIdAndUpdate(id, { status, isActive });
            res.json({ "message": true });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
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

    sendOTP: async (req, res) => {

        const id = req.body.orderId;
        const otp = Math.round(Math.random() * (987654 - 123456) + 123456);
        // console.log(otp)
        try {
            // const orderOLD = await OrderModel.find({"orderId" : id},{_id:true});
            // console.log(orderOLD);
            const order = await OrderModel.findById(id);
            if (order.otp != null) {
                const oldOTPs = order.otp;
                oldOTPs.push(otp);
                order.otp = oldOTPs
            } else {
                const otparr = [otp];
                order.otp = otparr;
            }
            const addOnList = order.addOns
            let total = 0;
            for (const item of addOnList) {
                const addOnData = await AddOnModel.aggregate([
                    { $unwind: "$addOnList" },
                    {
                        $match: {
                            "addOnList._id": new mongoose.Types.ObjectId(item.item)
                        }
                    },
                    { $project: { addOnList: 1 } }

                ])
                total += parseInt(addOnData[0].addOnList.price);
            }
            total += order.amount;
            const newOrder = await OrderModel.findByIdAndUpdate(id, order)
                .then(async () => {
                    const data = {}
                    const newOrder = await OrderModel.findById(id, { serId: true, custId: true, service_startTime: true });
                    const service = await ServiceModel.findById(newOrder.serId, { price: true, name: true });
                    const customer = await CustomerModel.findById(newOrder.custId, { email: true });
                    const responseAck = emailSender.sendOrderCompletionOTP(customer.email ?? "sgrana447@gmail.com", {
                        "name": service.name,
                        "price": total,
                        "startTime": newOrder.service_startTime,
                        "otp": otp
                    }).then(async () => {
                        // console.log(responseAck);
                    });
                }).then(() => {
                    res.json({ message: true });
                }).catch((error) => {
                    console.log(error)
                    res.json({ message: false, code: 1 });
                });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    addAddons: async (req, res) => {
        // console.log(req.body)
        try {
            const orderId = req.body.orderId;
            const addOnId = { item: req.body.addOnId };
            const order = await OrderModel.findById(orderId);
            const addOns = order.addOns;
            // console.log(addOn)
            if (addOns === '' || addOns === null) {
                addOns.push(addOnId);
            } else {
                addOns.push(addOnId);
            }
            order.addOns = addOns;


            const newOrder = await OrderModel.findByIdAndUpdate(orderId, order);

            res.send(newOrder)

        } catch (err) {
            console.log(err);
            res.json(err)
        }
    },
   
    getAddOns: async (req, res) => {
        try {
            const orderId = req.body.orderId;
            const order = await OrderModel.findById(orderId);
            const serId = order.serId;
            const addOnList = order.addOns
            // console.log(addOnList)
            let addOnRes = []
            let total = 0;
            for (const item of addOnList) {
                const addOnData = await AddOnModel.aggregate([
                    { $unwind: "$addOnList" },
                    {
                        $match: {
                            "addOnList._id": new mongoose.Types.ObjectId(item.item)
                        }
                    },
                    { $project: { addOnList: 1 } }

                ])

                addOnRes.push(addOnData[0])
                total += parseInt(addOnData[0].addOnList.price);
            }

            // addOnRes.total = total;
            // console.log(addOnRes)
            res.json({ addOnList: addOnRes, subtotal: total })
        } catch (err) {
            console.log(err);
            res.json(err)
        }
    },
    removeAddOns: async (req, res) => {
        try {
            const orderId = req.body.orderId;
            const addOnId = { item: req.body.addOnId };
            const order = await OrderModel.findById(orderId);
            const serId = order.serId;
            // const addOn = await AddOnModel.find({"addOnList._id":addOnId})

            const addOns = order.addOns;
            for (let i = 0; i < addOns.length; i++) {
                if (addOns[i].item.toString() === addOnId.item) {
                    addOns.splice(i, 1);
                    break; // Exit the loop after removing one item.
                }
            }
            order.addOns = addOns;
            const newOrder = await OrderModel.findByIdAndUpdate(orderId, order);
            res.send(newOrder)
            // res.json("ok")

        } catch (err) {
            console.log(err);
            res.json(err)
        }
    },
    completeOrder: async (req, res) => {

        const id = req.body.orderId;
        const otp = req.body.otp;
        try {
            const order = await OrderModel.findOne({ _id: id, otp: { $in: otp } })
            const addOnList = order.addOns
            let total = 0;
            for (const item of addOnList) {
                const addOnData = await AddOnModel.aggregate([
                    { $unwind: "$addOnList" },
                    {
                        $match: {
                            "addOnList._id": new mongoose.Types.ObjectId(item.item)
                        }
                    },
                    { $project: { addOnList: 1 } }

                ])
                total += parseInt(addOnData[0].addOnList.price);
            }
            total += order.amount;
            if (order != null) {
                order.status = "completed";
                const empId = order.empId;
                const emp = await EmployeeModel.findByIdAndUpdate(empId, { isBusy: false });
                order.amount += total;
                await OrderModel.findByIdAndUpdate(id, order);
                res.json({ message: true })
            } else {
                res.json({ message: false, code: 1 }) // code 1 : incorrect OTP
            }
            //    console.log(order)
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
    getactiveService: async (req, res) => {
        try {
            // Perform aggregation to get service details
            const details = await OrderModel.aggregate([
                {
                    $match: { status: 'working' } // Add any additional match conditions if needed
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "serId",
                        foreignField: "_id",
                        as: "serviceDetails",
                    },
                },
                {
                    $lookup: {
                        from: "customers",
                        localField: "custId",
                        foreignField: "_id",
                        as: "customerDetails",
                    },
                },
                {
                    $lookup: {
                        from: "employees",
                        localField: "empId",
                        foreignField: "_id",
                        as: "employeeDetails",
                    },
                },
            ]);


            res.json(details);
        } catch (err) {
            res.json({
                message: err
            });
        }
    },
    activeService: async (req, res) => {
        const orderId = req.body.orderId;
        try {
            const order = await OrderModel.findById(orderId);

            const empId = order.empId;

            const emp = await EmployeeModel.findById(empId);
            if (emp.isBusy == null || emp.isBusy === false) {
                await EmployeeModel.findByIdAndUpdate(empId, { isBusy: true }, { new: true })
                order.status = "working";
                const newOrder = await OrderModel.findByIdAndUpdate(orderId, order);
                // console.log(newOrder)
                res.json(newOrder)
            } else {
                res.json({ "message": false, code: 1 })
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while activating the order' });
        }

    },

    // Similar functions for updating and deleting empSer...
};
