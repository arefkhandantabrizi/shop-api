const ZarinpalCheckout = require("zarinpal-checkout");
const { Router } = require("express");
const config = require("config");

const router = Router();

const zarinpal = ZarinpalCheckout.create(config.get("merchantID"), false);

router.post("/", async (req, res) => {
  try {
    const response = await zarinpal.PaymentRequest({
      Amount: req.body.Amount, // In Tomans
      CallbackURL: "https://tolidimelina.ir/validate",
      Description: req.body.username,
      Email: "admin@tolidimelina.ir",
      Mobile: req.body.phone,
    });
    if (response.status === 100) {
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
