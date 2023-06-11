import express from "express";
import {
  getDates,
  addDate,
  removeDate,
  getAllDates,
  readyWorkShifts,
  getReadyShifts,
} from "../controllers/dates.js";

const router = express.Router();

router.post("/alldates", getDates);
router.get("/alldatesadmin", getAllDates);
router.post("/adddate", addDate);
router.post("/removedate", removeDate);
router.post("/readyworkshifts", readyWorkShifts);
router.post("/getreadysshifts", getReadyShifts);

export default router;
