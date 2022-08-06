"use strict";
// const {invoiceData , leaveApplication } = require("../../models")
const form = require("../models/applicationform");
// const db = require("../../models");
// const BaseRepo = require("../Repository/BaseRepository");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");
const nodemailer = require("nodemailer");

// const leaveapplication = require("../models/leaveapplication");
module.exports = {
  // InsertBillData ,
  // GetBillHistory ,
  DownloadApplication,
  DownloadingApplication,
  ApplicationForm,
  GetPendingApplicationForm,
  GetApplicationFormbyCustomerId,
  DeleteApplicationForm,
  GetInProcessApplicationForm,
  GetPendingApplicationsbynumber,
  ApplicationStatusUpdate,
  AddCoupon,
};

async function AddCoupon(req, res, next) {
  let amount = req.body.amount;
  console.log("amount here=>", amount);
  const Id = req.body.id;
  const data = await form.findOne({ _id: Id });
  const CouponCode = req.body.CouponCode;
  const length = Math.ceil(Math.log10(CouponCode + 1));
  try {
    let num;
    if (data.CouponCode == CouponCode) {
      console.log("in");
      if (length === 4) {
        num = (5 * amount) / 100;
        amount = amount - num;
      } else if (length === 5) {
        num = (10 * amount) / 100;
        amount = amount - num;
        console.log("num", num);
      } else if (length === 6) {
        num = (15 * amount) / 100;
        amount = amount - num;
      }

      console.log("amount=>", amount);
      await form.updateOne(
        {
          _id: Id,
        },
        { Payment: amount }
      );
      console.log("amount after discount:", amount);
      return res.status(200).json({ "Total Amount:": amount });
    } else {
      console.log("Invalid Code");
      return res.status(401).json("Invalid Code");
    }
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function ApplicationStatusUpdate(req, res, next) {
  const id = req.body.id;
  const NumofServices = req.body.numOfService;

  let val;

  if (NumofServices == 2) {
    val = Math.floor(1000 + Math.random() * 9000);
  } else if (NumofServices == 3) {
    val = Math.floor(10000 + Math.random() * 9000);
  } else if (NumofServices > 3) {
    val = Math.floor(100000 + Math.random() * 9000);
  }

  try {
    const data = await form.updateOne(
      {
        _id: id,
      },
      {
        DoneStatus: req.body.ProjectStatus,
        Payment: req.body.payment,
        CouponCode: val,
      }
    );
    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "contact.technomaits@gmail.com",
        pass: "qhtpgbivqupkszzf",
      },
    });
    let mailOptions;

    if (req.body.numOfService) {
      mailOptions = {
        from: "contact.technomaits@gmail.com",
        to: req.body.Email,
        subject: `Respone From Admin Regarding Your Project`,
        text: `Your Project is Completed.Your Bill Amount is ${req.body.payment}.
   and your coupon code is ${val} `,
      };
    } else {
      mailOptions = {
        from: "contact.technomaits@gmail.com",
        to: req.body.Email,
        subject: `Respone From Admin Regarding Your Project`,
        text: `Your Project is Completed.Your Bill Amount is ${req.body.payment}.
    `,
      };
    }

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

    console.log("HI");
    console.log(data);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}
async function ApplicationForm(req, res, next) {
  try {
    const data = await form.create({
      name: req.body.name,
      customerId: req.body.customerId,
      email: req.body.Email,
      contactNo: req.body.contactNo,
      services: req.body.services,
      status: req.body.status,
      payment: "pending",
      url: req.body.url,
      DoneStatus: req.body.DoneStatus,
      Payment: req.body.payment,
    });

    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "contact.technomaits@gmail.com",
        pass: "qhtpgbivqupkszzf",
      },
    });

    // var arr = req.body.services;

    const mailOptions = {
      from: req.body.Email,
      to: "contact.technomaits@gmail.com",
      subject: `${req.body.name} submits an application from ${req.body.Email}`,
      // text: `These are some services they required ${req.body.services}`,

      html: `<p style = "font-weight: bold">Customer requested some services <br>
      <br>
       For further Process ,Go to your Admin Panel.
       </p>
     `,
    };
    console.log("There");
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

    // console.log("in progress...");

    console.log("data->", data.services);
    return res.status(200).json({ status: true, data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function GetPendingApplicationForm(req, res, next) {
  try {
    const data = await form.find({ status: "pending" }).sort({ date: -1 });
    console.log("data->", data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function GetPendingApplicationsbynumber(req, res, next) {
  const n = req.params.applications;

  try {
    const data = await form
      .find({ status: "pending" })
      .limit(n)
      .sort({ date: -1 })
      .select("name")
      .select("email")
      .select("url");
    console.log("data->", data);

    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}
async function GetInProcessApplicationForm(req, res, next) {
  try {
    const data = await form
      .find({ status: { $ne: "pending" } })
      .sort({ date: -1 });
    console.log("data->", data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function DeleteApplicationForm(req, res, next) {
  const id = req.body.id;
  try {
    await form.deleteOne({
      _id: id,
    });
    // console.log("data->",data.services);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function GetApplicationFormbyCustomerId(req, res, next) {
  try {
    const ids = req.params.customerId;
    const data = await form.find({ customerId: ids }).sort({ date: -1 });
    console.log("data->", data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}

async function DownloadApplication(req, res, next) {
  // const services = req.body.services
  console.log("tart");
  function createInvoice() {
    let doc = new PDFDocument({ margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc);
    generateTableRow(doc);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream("Application.pdf"));
  }

  function generateHeader(doc) {
    doc
      .image("image.jpeg", 50, 35, { width: 75 })
      .fillColor("black")
      .fontSize(20)
      .fontSize(20)
      .text("YOUR APPLICATION", 30, 140)

      .fontSize(10)
      //  .fillColor('black')
      .fillColor("#444444")
      .text("ALPHA IT SERVICES", 200, 50, { align: "right" }, { width: 100 })
      .text(" 203, Valley View, IT Park, Dehradun, Uttarakhand", 200, 65, {
        align: "right",
      })
      .text("info@alphaitservices.in", 200, 80, { align: "right" })
      .moveDown();
  }

  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text("Enjoy Your Time", 40, 700, { align: "center", width: 500 });
  }

  function generateCustomerInformation(doc) {
    //	const shipping = invoice.shipping;
    console.log("entered");

    doc
      //	.text( 'date :', req.body.date, 50, 215)
      //.text('Balance Due: Rs.5000', 50, 215)

      .text(`Name :    ${req.body.Name}`, 50, 200)
      .text(`Phone:  ${req.body.contactNo}`, 50, 215)
      .text(`Email :  ${req.body.Email}`, 50, 230)

      .moveDown();
    console.log("at last");
  }

  function generateTableRow(doc) {
    // const services = req.body.services;
    console.log("entered 2");
    doc.fontSize(10).text("Services:", 50, 290);

    // for (var j = 0; j < services.length; j++){

    //     doc.text( req.body.services[j],  50, 310)

    //     }
    var arr = req.body.services;

    var margin = 310;
    var serialNo = 1;
    for (var i = 0; i < arr.length; i++) {
      doc.text(serialNo++, 50, margin);
      //  doc.text(".")
      doc.text(arr[i], 100, margin);
      margin = margin + 20;
      //   serialNo=serialNo+5;
    }

    doc
      .fontSize(10)
      .text(`Application Status:  ${req.body.status}`, 50, 245)
      .text(`Payment : Rs. ${req.body.payment} /-`, 50, 260);
    // .text('DISCRIPTION' , 150 , 280)
    // .text( req.body.services, 150, 310)

    // .text('UNIT COST', 260 , 280)
    // .text( req.body.unitCosting, 260, 310)

    // .text('QUANTITY', 340 , 280)
    // .text( req.body.Quant, 340, 310)

    // .text('LINE TOTAL',420 , 280)
    // .text( req.body.unitCosting * req.body.Quant ,420, 310)

    // .text(`GST :    ${req.body.tax}`,380 , 500)

    // .text(`TOTAL : ${(req.body.unitCosting * req.body.Quant) + (req.body.unitCosting * req.body.Quant * 18)/100} ` , 380 , 530)

    console.log("at last 2");
  }

  // function generateTableRow(doc) {
  //     console.log("entered 2");
  // 	doc.fontSize(
  // 		10,
  // 		).text('Item', 50)
  // 		.text('Discription', 150)
  // 		.text('Unit Cost', 280, { width: 90, align: 'right' })
  // 		.text('Quantity', 370, { width: 90, align: 'right' })
  // 		.text('Line Total', 0, { align: 'right' })

  // 		.moveDown();
  //         console.log("at last 2");

  // }

  createInvoice();
  const filePath = "./Application.pdf";
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) console.log("file not exist");
    else console.log("exist");
  });
  res.download(filePath);
  //   return res.status(200).json({message : 'pdf generated'});
}

async function DownloadingApplication(req, res, next) {
  console.log("in dwnld");
  const file = "./Application.pdf";
  res.download(file);
}
