const PaytmChecksum = require("paytmchecksum");

const axios = require("axios");

module.exports = {
  initiatePayment,
  verifyPayment,
};

async function initiatePayment(req, res, next) {
  const customerId = req.body.cId;

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

    let { data } = await axios({
      method: "POST",
      url: `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=vBUmvE10378565146022&orderId=${req.body.orderId}`,
      data: paytmParams,
    });

    console.log("data ", data);
    if (data && data.body.resultInfo.resultCode !== "0000") {
      return next({
        message: "Something went wrong while creating transition token",
        status: 500,
      });
    }

    return res.status(200).send(data.body);
  } catch (err) {
    console.log("in err", err);
    return res.send(err);
  }
}

async function verifyPayment(req, res, next) {
  return res.send(req.body);
}
