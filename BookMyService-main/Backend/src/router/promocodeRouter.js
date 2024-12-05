const express = require("express");
const PromocodeModel = require("../models/PromocodeModel");
const router = express.Router();


router.post("/createPromocode", async (req, res) => {

    try {
        const promocode = new PromocodeModel({
            name : req.body.name,
            promocode : req.body.promocode,
            terms : req.body.terms,
            valid_till : req.body.valid_till,
            isPercent : req.body.isPercent,
            min : req.body.min,
            max : req.body.max
        });
        const newPromocode = await promocode.save();
        res.json(newPromocode);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
);

router.post("/getPromocode", async (req, res) => {

    try {
        const promocode = await PromocodeModel.find({});
        res.json(promocode);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
router.post("/getPromocodeById", async (req, res) => {

    try {
        const promocode = await PromocodeModel.find({_id:req.body.promoId});
        res.json(promocode);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});

router.post("/updatePromocode", async (req, res) => {

    const id  = req.body.id;
    const  {name,promocode,terms,valid_till,isPercent,min,max,isActive}  = req.body;

    try {
        const promocode = await PromocodeModel.findByIdAndUpdate(id, { name,promocode,terms,valid_till,isPercent,min,max,isActive}, { new: true });
        res.send(promocode);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/deletePromocode", async (req, res) => {

    const id  = req.body.id;
    try {
        const promocode = await PromocodeModel.findByIdAndDelete(id);
        res.send(promocode);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});




module.exports = router