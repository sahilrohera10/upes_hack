const cart = require("../models/cart");

const express = require("express");

module.exports = {
  AddServicetoCart,
  GetServicefromCart,
  DeleteServicefromCart,
};

async function AddServicetoCart(req, res, next) {
  try {
    const user = await cart.findOne({
      serviceId: req.body.serviceId,
      customerId: req.body.customerId,
    });

    if (user) {
      console.log("Service Already added in Your Cart ");
      return res.status(300).json("Service already added");
    } else {
      const data = await cart.create({
        name: req.body.name,
        customerId: req.body.customerId,
        serviceId: req.body.serviceId,
        imageId: req.body.imageId,
      });

      return res.status(200).json({ success: true, data });
    }
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function GetServicefromCart(req, res, next) {
  try {
    const data = await cart.find({ customerId: req.params.customerId });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}
async function DeleteServicefromCart(req, res, next) {
  try {
    const data = await cart.deleteOne({
      customerId: req.params.customerId,
      serviceId: req.params.serviceId,
    });

    return res.status(200).json({ success: true }, "Service delete from cart");
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}
