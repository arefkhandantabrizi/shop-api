const ZarinpalCheckout = require("zarinpal-checkout");
const { Router } = require("express");
const config = require("config");

const router = Router();

const zarinpal = ZarinpalCheckout.create(config.get("merchantID"), false);

router.post("/", async (req, res) => {
  try {
    const response = await zarinpal.PaymentVerification({
      Amount: req.body.Amount, // In Tomans
      Authority: req.body.Authority,
    });

    res.send(response);
    // if (response.status === -21) {
    //   res.send("Empty!");
    // } else {
    //   res.send(response.RefID);
    // }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
