import express from "express";
import { getDates, addDate, removeDate } from "../controllers/dates.js";

const router = express.Router();

router.post("/alldates", getDates);
router.post("/adddate", addDate);
router.post("/removedate", removeDate);

export default router;
