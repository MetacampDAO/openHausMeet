import express from "express";
import EventDatabase from "../models/eventSchema";
import "dotenv/config";
import { isLoggin } from "../middleware/auth";

const router = express.Router();

// TODO: isLoggin

// GET ALL MEMBERSHIP IN GROUP
router.get("/:groupId", (req, res) => {
  const group = req.params.groupId;

  EventDatabase.find({ group }, (err: any, groups: any) => {
    if (err) res.status(500).json({ error: "Database Error" });
    else res.status(200).json(groups);
  });
});

// GET SPECIFIC MEMBERSHIP
router.get("/:group/:user", (req, res) => {
  const { user, group } = req.params;
  EventDatabase.findOne({ user, group })
    .populate("user")
    // .populate("group")
    .exec((err: any, group: any) => {
      if (err) res.status(500).json({ error: "Database Error" });
      // Check if session belong to admin, else display private
      else if (group.user.privacy == 2)
        res.status(200).json(group.user.privacy);
      else res.status(200).json(group);
    });
});

// CREATE NEW GROUP
router.post("/:group/:user", (req, res) => {
  const { user, group } = req.params;
  const data = { ...req.body, user, group, joinDate: Date.now() };

  EventDatabase.findOne({ user, group }, (err: any, group: any) => {
    if (err) res.status(500).json({ error: "Database Error" });
    else if (group)
      res.status(400).json({ error: "Membership Already Created" });
    else {
      EventDatabase.create(data, (err: any, createdGroup: any) => {
        if (err) res.status(500).json({ error: "Database Error" });
        else res.status(200).json(createdGroup);
      });
    }
  });
});

// UPLOAD GROUP
router.put("/:membership", (req, res) => {
  const { membership } = req.params;

  EventDatabase.findByIdAndUpdate(
    membership,
    { ...req.body },
    { new: true },
    (err, updatedData) => {
      if (err) res.status(400).json({ error: err });
      else res.status(200).json(updatedData);
    }
  );
});

// DELETE GROUP
router.delete("/:membership", (req, res) => {
  const { membership } = req.params;

  EventDatabase.findByIdAndDelete(membership, (err: any, deletedGroup: any) => {
    if (err) res.status(400).json({ error: err });
    else res.status(200).json({ membership });
  });
});

export default router;
