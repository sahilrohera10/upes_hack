const  cart = require("../models/cart");


const express = require("express");

module.exports={
AddServicetoCart,
GetServicefromCart,
DeleteServicefromCart
};

async function AddServicetoCart(req, res, next) {
    try {
      const data = await cart.create({
       name:req.body.name,
       customerId:req.body.customerId,
       serviceId:req.body.serviceId
      });
  
      return res.status(200).json({ data });
    } catch (error) {
      console.log("error=>", error);
      return next(error);
    }
  }

  async function GetServicefromCart(req, res, next) {
    try {
      const data = await cart.find({customerId:req.params.customerId});
  
      return res.status(200).json({ data });
    } catch (error) {
      console.log("error=>", error);
      return next(error);
    }
  }
  async function DeleteServicefromCart(req, res, next) {
    try {
      const data = await cart.deleteOne({customerId:req.params.customerId,serviceId:req.params.serviceId});
  
      return res.status(200).json("Service delete from cart");
    } catch (error) {
      console.log("error=>", error);
      return next(error);
    }
  }

