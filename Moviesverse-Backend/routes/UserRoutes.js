import { addUserDetails, getDetails } from "../controllers/UserController.js";
import express from "express";


const router = express.Router();

router.post("/adduserdetails", addUserDetails);
router.post("/getDetails", getDetails);

export default router;
