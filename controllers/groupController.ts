import express from "express";
import GroupDatabase from "../models/groupSchema";
import "dotenv/config";
import { isLoggin } from "../middleware/auth";

const router = express.Router();

// TODO: isLoggin

// GET ALL GROUP
router.get("/", (req, res) => {
  GroupDatabase.find({}, (err: any, groups: any) => {
    if (err) res.status(500).json({ error: "Database Error" });
    else res.status(200).json(groups);
  });
});

// GET SPECIFIC GROUP
router.get("/:id", (req, res) => {
  const id = req.params.id;
  GroupDatabase.findById(id, (err: any, group: any) => {
    if (err) res.status(500).json({ error: "Database Error" });
    else res.status(200).json(group);
  });
});

// CREATE NEW GROUP
router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  const data = { ...req.body, owner: userId };
  GroupDatabase.create(data, (err: any, createdGroup: any) => {
    if (err) res.status(500).json({ error: "Database Error" });
    else res.status(200).json(createdGroup);
  });
});

// UPLOAD GROUP
router.put("/:id", (req, res) => {
  const id = req.params.id;
  req.body = { ...req.body, lastUpdate: Date.now() };

  GroupDatabase.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, updatedData) => {
      if (err) res.status(400).json({ error: err });
      else res.status(200).json(updatedData);
    }
  );
});

// DELETE GROUP
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  GroupDatabase.findByIdAndDelete(id, (err: any, deletedGroup: any) => {
    if (err) res.status(400).json({ error: err });
    else res.status(200).json({ id });
  });
});

export default router;
