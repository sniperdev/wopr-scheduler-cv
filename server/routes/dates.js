import express from "express";
import {
  getDates,
  addDate,
  removeDate,
  getAllDates,
  readyWorkShifts,
  getReadyShifts,
  getUnaddedShifts,
} from "../controllers/dates.js";

const router = express.Router();

router.post("/alldates", getDates);
router.get("/alldatesadmin", getAllDates);
router.post("/adddate", addDate);
router.post("/removedate", removeDate);
router.post("/readyworkshifts", readyWorkShifts);
router.get("/getreadysshifts", getReadyShifts);
router.get("/getunaddedshifts", getUnaddedShifts);

export default router;
