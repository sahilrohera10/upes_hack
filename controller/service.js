
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const path = require("path");

const  service = require("../models/service");
// const { User } = require("../models");
const express = require("express");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
const multer = require("multer");

module.exports={
AddService,
DeleteService,
GetService,
UpdateService
};



async function AddService(req, res, next) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "ImgUploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    });

    const maxSize = 1 * 2000 * 2000;

    var upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
          return cb(null, true);
        }

        cb(
          "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
      },

      // mypic is the name of file attribute
    }).single("image");

    upload(req, res, async function (err) {
      if (err) {
        // ERROR occurred (here it can be occurred due
        // to uploading image of size greater than
        // 1MB or uploading different file type)
        return res.send(err);
      } else {
        // productsData.update({ imageId: req.file.filename }, { where: { id: 2 } });
        const data = await service.create({
          imageId: req.file.filename,
          name:req.body.Name,
          description:req.body.description
         });
     

        console.log("data uploaded :", data);
        return res.status(200).json("Services Added successfully");
        // SUCCESS, image successfully uploaded
        // res.send("Success, Image uploaded!");
      }
    });
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}





// async function AddService(req, res, next) {
//     try {
//       const data = await service.create({
//        name:req.body.Name,
//        description:req.body.description
//       });
  
//       return res.status(200).json({ data });
//     } catch (error) {
//       console.log("error=>", error);
//       return next(error);
//     }
//   }

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
    