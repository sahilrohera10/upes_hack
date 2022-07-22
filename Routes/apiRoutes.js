const router = require("express").Router();
const user = require("../controller/User");
const service = require("../controller/service");
const cart = require("../controller/cart");



router.post("/sendmail", user.sendMAil);
router.post("/Register", user.Register);
router.post("/Login", user.Login);
router.post("/SendMailforContact", user.sendmailforcontact);
router.post("/FillApplicationForm", user.ApplicationForm);
router.post("/GeneratePdf", user.PdfGenerate);




router.post("/AddServicetoCart",cart.AddServicetoCart);
router.delete("/DeleteServicefromCart/:customerId/:serviceId",cart.DeleteServicefromCart);
router.get("/GetServicefromCart/:customerId",cart.GetServicefromCart);



router.post("/AddService",service.AddService);
router.get("/GetService",service.GetService);
router.delete("/DeleteService/:serviceId",service.DeleteService);
router.put("/UpdateService",service.UpdateService);

module.exports = router;
