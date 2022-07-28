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
// const leaveapplication = require("../models/leaveapplication");
module.exports = {
  // InsertBillData ,
  // GetBillHistory ,
  DownloadInvoice,
  DownloadingTheBill,
  ApplicationForm,
};

async function ApplicationForm(req, res, next) {
  try {
    const data = await form.create({
      name: req.body.name,
      customerId: req.body.customerId,
      email: req.body.Email,
      contactNo: req.body.contactNo,
      services: req.body.services,
    });
    console.log("data->", data.services);
    return res.status(200).json({ status: true, data });
  } catch (error) {
    console.log("error=>", error);
    return next(error);
  }
}
// async function GetBillHistory(req , res , next){
//     const data = await invoiceData.findAll({order : [['id' , 'DESC']]});

//     res.status(200).json({data});
// }

async function DownloadInvoice(req, res, next) {
  // const services = req.body.services
  console.log("tart");
  function createInvoice() {
    let doc = new PDFDocument({ margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc);
    generateTableRow(doc);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream("Form.pdf"));
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
    const services = req.body.services;
    console.log("entered 2");
    doc.fontSize(10).text("Services:", 50, 280);

    // for (var j = 0; j < services.length; j++){

    //     doc.text( req.body.services[j],  50, 310)

    //     }
    var arr = req.body.services;

    var margin = 300;
    var serialNo = 1;
    for (var i = 0; i < arr.length; i++) {
      doc.text(serialNo++, 50, margin);
      doc.text(arr[i], 100, margin);
      margin = margin + 20;
      //   serialNo=serialNo+5;
    }

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
  const filePath = "./Form.pdf";
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) console.log("file not exist");
    else console.log("exist");
  });
  res.download(filePath);
  //   return res.status(200).json({message : 'pdf generated'});
}

async function DownloadingTheBill(req, res, next) {
  console.log("in dwnld");
  const file = "./Form.pdf";
  res.download(file);
}
