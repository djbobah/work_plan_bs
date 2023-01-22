const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/auto", require("./autos.routes"));
router.use("/users", require("./users.routes"));
router.use("/plan", require("./planRabot.routes"));

module.exports = router;
