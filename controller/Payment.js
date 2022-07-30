const PaytmChecksum = require("paytmchecksum");

const axios = require("axios");

module.exports = {
  initiatePayment,
  verifyPayment,
  // purchasedCourseList,
  // purchasedCourseDetail
};

async function initiatePayment(req, res, next) {
  const customerId = req.body.cId;
  // const classId = req.user.myClass;

  // const missingFields = checkMissingFields(req.body, ['subjectId', 'modulePurchased', 'orderId', 'amount']);

  // if (missingFields.length) {
  //   return next({ message: "Some fields are missing", fields: missingFields, status: 400 });
  // }
  // else if (!isValidMongoObjectId(req.body.subjectId)) {
  //   return next({ message: "Invalid Subject", status: 400 });
  // }
  // else if (!Array.isArray(req.body.modulePurchased) || !req.body.modulePurchased.length) {
  //   return next({ message: "Invalid entry for modulePurchased", status: 400 });
  // }

  let paytmParams = {};

  paytmParams.body = {
    requestType: "Payment",
    mid: "vBUmvE10378565146022",
    websiteName: "WEBSTAGING",
    orderId: req.body.orderId,
    callbackUrl: "/verifyPayment",
    txnAmount: {
      value: req.body.amount,
      currency: "INR",
    },
    userInfo: {
      custId: customerId,
    },
  };

  try {
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      "8vlGDiJ&ldlfsRTh"
    );

    paytmParams.head = {
      signature: checksum,
    };

    // const post_data = JSON.stringify(paytmParams);

    //   const result = await initiateTransaction(post_data, req.body.orderId);

    let { data } = await axios({
      method: "POST",
      url: `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=vBUmvE10378565146022&orderId=${req.body.orderId}`,
      data: paytmParams,
    });

    // https://securegw-stage.paytm.in/order/release

    console.log("data ", data);
    if (data && data.body.resultInfo.resultCode !== "0000") {
      return next({
        message: "Something went wrong while creating transition token",
        status: 500,
      });
    }

    //   const order = await BaseRepo.baseDetail(coursePurchaseModel, {
    //     searchParams: {
    //       userId,
    //       classId,
    //       subjectId: req.body.subjectId,
    //       modulePurchased: req.body.modulePurchased
    //     }
    //   });
    //   console.log("existed order =>", order);
    //   if (order) {
    //     await BaseRepo.baseUpdate(coursePurchaseModel, { _id: order._id }, {
    //       orderId: req.body.orderId,
    //       amount: req.body.amount,
    //       status: "Pending"
    //     });
    //   }
    //   else {
    //     await BaseRepo.baseCreate(coursePurchaseModel, {
    //       ...req.body,
    //       userId,
    //       classId,
    //       status: "Pending"
    //     })
    //   }
    return res.status(200).send(data.body);
  } catch (err) {
    console.log("in err", err);
    return res.send(err);
  }
}

async function verifyPayment(req, res, next) {
  return res.send(req.body);
  // console.log("req body in postransaction", req.body);
  // try {
  //   const checksumHash = (req.body.CHECKSUMHASH) ? req.body.CHECKSUMHASH : "";
  //   const paytmParams = _.omit(req.body, ["CHECKSUMHASH"]);

  //   const isValidChecksum = PaytmChecksum.verifySignature(
  //     paytmParams,
  //      "8vlGDiJ&ldlfsRTh",
  //     checksumHash
  //   );

  //   const order = await BaseRepo.baseDetail(coursePurchaseModel, {
  //     searchParams: {
  //       orderId: paytmParams.ORDERID,
  //     }
  //   });

  //   if (!order)
  //     return next({ message: "No order record found", status: 400 });

  //   const TXN_Data = _.omit(paytmParams, ["MID"]);
  //   if (!isValidChecksum || paytmParams.STATUS === "TXN_FAILURE") {
  //     await BaseRepo.baseUpdate(coursePurchaseModel, { _id: order._id }, {
  //       status: "Failure",
  //       data: JSON.stringify(TXN_Data),
  //       transactionDate: new Date(TXN_Data.TXNDATE)
  //     });
  //     return next({ message: "Transaction Failed", status: 500 });
  //   }
  //   if (paytmParams.STATUS === "TXN_SUCCESS") {
  //     await BaseRepo.baseUpdate(coursePurchaseModel, { _id: order._id }, {
  //       status: "Success",
  //       data: JSON.stringify(TXN_Data),
  //       transactionDate: new Date(TXN_Data.TXNDATE)
  //     });

  //     //add user access

  //     let access = await BaseRepo.baseAggregate(userGameAccessModel, [
  //       {
  //         $match: {
  //           userId: order.userId,
  //           classId: order.classId
  //         }
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           'curr': {
  //             $filter: {
  //               input: "$modules",
  //               as: "module",
  //               cond: { $eq: ["$$module.subjectId", order.subjectId] }
  //             }
  //           }
  //         }
  //       }
  //     ]);

  //     const modules = {
  //       subjectId: ObjectId(order.subjectId),
  //       modulePurchased: order.modulePurchased
  //     }

  //     if (access && access.length) {
  //       const topicFound = access[0].curr.length;
  //       if (topicFound) {
  //         await BaseRepo.baseUpdate(userGameAccessModel, { _id: access[0]._id, "modules.subjectId": order.subjectId }, { $push: { "modules.$.modulePurchased": {$each: modules.modulePurchased}}});
  //       }
  //       else {
  //         await BaseRepo.baseUpdate(userGameAccessModel, { _id: access[0]._id }, { $push: { "modules": modules } });
  //       }
  //     }
  //     else {
  //       const data = {
  //         userId: order.userId,
  //         classId: order.classId,
  //         modules
  //       }
  //       await BaseRepo.baseCreate(userGameAccessModel, data);
  //     }

  //   }

  //   console.log("transaction complete ==> ", data);
  //   res.redirect('http://192.168.1.37:3000/Admin/Orders')
  //   return next();
  // }
  // catch (err) {
  //   return next(err);
  // }
}
