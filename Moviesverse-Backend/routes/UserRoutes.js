const { addUserDetails, getDetails } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/adduserdetails", addUserDetails);
router.post("/getDetails", getDetails);

module.exports = router;
