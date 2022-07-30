const otp = require("../models/otp");
const User = require("../models/User");
const form = require("../models/applicationform");
// const { User } = require("../models");
const express = require("express");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document
const doc = new PDFDocument();
module.exports = {
  sendMAil,
  Register,
  sendmailforcontact,
  Login,
  sendmailtoCustomer,
  // ApplicationForm,
  // PdfGenerate
};

async function Register(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.Email });
    if (user) {
      console.log(" Already registered ");
      return res.status(300).json({ message: "already registered" });
      // return next();
    }

    const salt = await bcrypt.genSalt(10);
    const Secpassword = await bcrypt.hash(req.body.Password, salt);
    const votp = await otp.findOne({ emailid: req.body.Email });

    console.log("votp->", votp.otp);
    console.log("here");
    const botp = req.body.otp;
    console.log("there");

    console.log({ botp });
    if (votp.otp == botp) {
      console.log("if check done");
      const data = await User.create({
        email: req.body.Email,
        name: req.body.Name,
        password: Secpassword,
        contactNo: req.body.contactNo,
      });
      console.log("data entered :", data);
      res.status(200).json("register done");
      return next();
    } else {
      console.log("invalid otp");
      return res.status(303).json({ message: "Invalid Otp" });
    }
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function sendMAil(req, res, next) {
  try {
    const val = Math.floor(1000 + Math.random() * 9000);
    console.log("val->", val);
    const user = await otp.findOne({ emailid: req.body.Email });
    console.log("user->", user);
    if (user) {
      await otp.updateOne({ emailid: req.body.Email }, { otp: val });
      console.log("here");
    } else {
      await otp.create({
        emailid: req.body.Email,
        otp: val,
      });
      console.log("there");

      // }

      const tranporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "campuskart05@gmail.com",
          pass: "tbiqxiuxllqrzviu",
        },
      });

      const mailOptions = {
        from: "campuskart05@gmail.com",
        to: req.body.Email,
        subject: "otp for user verification",
        text: `please enter this otp ${val} with your given email id.`,
      };

      tranporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("send");
          res.send("success");
        }
      });

      // console.log("data entered : ", data);
    }
    return res.status(200).json({ message: "mail sent succesfully" });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ message: error });
  }
}

async function sendmailtoCustomer(req, res, next) {
  // const val = Math.floor(1000 + Math.random() * 9000);

  try {
    const id = req.body.id;
    await form.updateOne({ _id: id }, { status: req.body.message });

    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "contact.technomaits@gmail.com",
        pass: "qhtpgbivqupkszzf",
      },
    });

    const mailOptions = {
      from: "contact.technomaits@gmail.com",
      to: req.body.Email,
      subject: `Respone From Admin Regarding Your Request`,
      text: req.body.message,
    };
    // console.log(text);

    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });

    // console.log("data entered : ", data);

    return res.status(200).json("mail sent succesfully");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function Login(req, res, next) {
  const { Email, Password } = req.body;
  console.log("user email", Email);
  console.log("user password", Password);
  if (!Email || !Password)
    return res
      .status(400)
      .json({ message: "Please provide email and password " });
  console.log("still on");

  try {
    const data = await User.find({ email: Email });

    if (!data) {
      console.log("No user exist with this email.");
      return res.status(401).json({ message: "No user exist with this email" });
    }
    // console.log("data->",data);
    const pass = await User.findOne({ email: Email });
    // console.log("pass->",pass);
    // console.log("password->",pass.password);
    if (!bcrypt.compareSync(Password, pass.password)) {
      return res.status(402).json({ message: "Password Incorrect" });
    } else {
      // const data = await Users.findAll({ where: { email: req.body.Email } });
      console.log("Login Successfully done now");
      return res.status(200).json({ pass });
    }

    // return next();
  } catch (err) {
    console.log("Error in getUsers : ", err);
    return res.status(400).json(err);
  }
}

async function sendmailforcontact(req, res, next) {
  // const val = Math.floor(1000 + Math.random() * 9000);

  try {
    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "contact.technomaits@gmail.com",
        pass: "qhtpgbivqupkszzf",
      },
    });

    const mailOptions = {
      from: req.body.Email,
      to: "contact.technomaits@gmail.com",
      subject: `${req.body.name} wants to contact from ${req.body.Email}`,
      text: req.body.message,
    };
    // console.log(text);

    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });

    // console.log("data entered : ", data);

    return res.status(200).json("mail sent succesfully");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

//   async function ApplicationForm(req, res, next) {
//     try {
//       const data = await form.create({
//        name:req.body.name,
//        customerId:req.body.customerId,
//        email:req.body.Email,
//        contactNo:req.body.contactNo,
//        services:req.body.services,
//       });
//   console.log("data->",data.services);
//       return res.status(200).json({ data });
//     } catch (error) {
//       console.log("error=>", error);
//       return next(error);
//     }
//   }

//   async function PdfGenerate(req, res, next) {

//     try{
// // Pipe its output somewhere, like to a file or HTTP response
// // See below for browser usage
// doc.pipe(fs.createWriteStream(req.body.name));

// // Embed a font, set the font size, and render some text
// doc
//   // .font('fonts/PalatinoBold.ttf')
//   .fontSize(25)

//   // .text("email=",req.body.email, 100, 100)
//   .text(req.body.number, 100, 100);

// // Finalize PDF file
// doc.end();
//       return res.status(200).json();

//     }catch(error){
//       console.log("error=>", error);
//       return next(error);
//     }
//   }
