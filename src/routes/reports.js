import Router from "express";
import Report from "../models/report.js";
import currentUtcTime from "../utils/currentUtcTime.js";
import utcConvert from "../utils/utcConvert.js";
import daysLeft from "../utils/daysLeft.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  /*convert to utc days and hour here*/
  const { days, hour } = utcConvert(req.body.days, req.body.hour);
  const report = new Report({ ...req.body, days, hour });
  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/check", async (req, res) => {
  /*gets utc days and hour here*/
  const { day, hour } = currentUtcTime();
  try {
    await Report.updateMany(
      {
        treated: false,
        hour,
        days: { $in: [day], $nin: [...daysLeft(day)] },
      },
      { $set: { treated: true } }
    );
    const sentReports = await Report.find(
      {
        hour,
        days: day,
      },
      { recipients: 1 }
    );
    res.status(200).json(sentReports);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.put("/uncheckall", async (req, res) => {
  try {
    await Report.updateMany({}, { $set: { treated: false } });
    res.status(200).json({ message: "Reports have been updated" });
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
