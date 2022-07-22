
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const  service = require("../models/service");
// const { User } = require("../models");
const express = require("express");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
module.exports={
AddService,
DeleteService,
GetService,
UpdateService
};








async function AddService(req, res, next) {
    try {
      const data = await service.create({
       name:req.body.Name,
       description:req.body.description
      });
  
      return res.status(200).json({ data });
    } catch (error) {
      console.log("error=>", error);
      return next(error);
    }
  }

  async function DeleteService(req, res, next) {
  const id = req.params.serviceId;
console.log("id->",id);


    try {
     await service.deleteOne({
        _id:id,
      });
  console.log("service deleted ")
      return res.status(200).json("service is deleted");
    } catch (error) {
      console.log("error=>", error);
      return next(error);
    }
  }

  async function GetService(req, res, next) {
    // const id = ObjectId(req.params.productId);
  
      try {
       const data= await service.find();
        console.log("data->",data);
    
        return res.status(200).json({data});
      } catch (error) {
        console.log("error=>", error);
        return next(error);
      }
    }

    async function UpdateService(req, res, next) {
      // const id = ObjectId(req.params.productId);
    
        try {
         await service.findOneAndUpdate({
            _id:req.body.ServiceId},{name:req.body.name,description:req.body.description}
          );
       
      console.log("service Updated ")
          return res.status(200).json("service is updated");
        } catch (error) {
          console.log("error=>", error);
          return next(error);
        }
      }
    