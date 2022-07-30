const router = require("express").Router();
const user = require("../controller/User");
const service = require("../controller/service");
const cart = require("../controller/cart");
const application = require("../controller/Application");
const payment = require("../controller/Payment");

//USER APIS
router.post("/sendmail", user.sendMAil);
router.post("/Register", user.Register);
router.post("/Login", user.Login);
router.post("/SendMailforContact", user.sendmailforcontact);
router.post("/SendMailtoCustomer", user.sendmailtoCustomer);

//APPLICATION APIS
router.post("/FillApplicationForm", application.ApplicationForm);
router.post("/DownloadApplication", application.DownloadApplication);
router.get("/DownloadingApplication", application.DownloadingApplication);
router.get("/GetPendingApplicationForm", application.GetPendingApplicationForm);
router.get(
  "/GetInProcessApplicationForm",
  application.GetInProcessApplicationForm
);
router.delete("/DeleteApplicationForm", application.DeleteApplicationForm);

router.get(
  "/GetAllApplicationFormbyId/:customerId",
  application.GetApplicationFormbyCustomerId
);

//CART APIS
router.post("/AddServicetoCart", cart.AddServicetoCart);
router.delete(
  "/DeleteServicefromCart/:customerId/:serviceId",
  cart.DeleteServicefromCart
);
router.get("/GetServicefromCart/:customerId", cart.GetServicefromCart);

//SERVICES APIS
router.post("/AddService", service.AddService);
router.get("/GetService", service.GetService);
router.get("/GetSomeService/:services", service.GetSomeService);
router.delete("/DeleteService/:serviceId", service.DeleteService);
router.put("/UpdateService", service.UpdateService);

//PAYMENT GATEWAY APIS
router.post("/initiatePayment", payment.initiatePayment);
router.post("/verifyPayment", payment.verifyPayment);

module.exports = router;
