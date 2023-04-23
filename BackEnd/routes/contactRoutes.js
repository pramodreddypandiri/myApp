import express from "express";
import { storeContactDetails } from "../controllers/contactController.js";

const router = express.Router();

// store contact details route
router.post('/store-contact', storeContactDetails)

export default router