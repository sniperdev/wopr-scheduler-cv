import express from "express";
import {
  getDates,
  addDate,
  removeDate,
  getAllDates,
} from "../controllers/dates.js";

const router = express.Router();

router.post("/alldates", getDates);
router.get("/alldatesadmin", getAllDates);
router.post("/adddate", addDate);
router.post("/removedate", removeDate);

export default router;
