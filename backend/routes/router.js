const express = require("express");
const verifyToken = require("../middlewares/auth");
const router = express.Router();
const controller = require("../controllers/controller");

router.post("/login", controller.login);

router.post("/agency-client/create", verifyToken, controller.create);
router.put("/client/update/:clientId", verifyToken, controller.update);
router.get("/agency/top-client", verifyToken, controller.topClient);

module.exports = router;
