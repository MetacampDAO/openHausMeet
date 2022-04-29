import express, { Response } from "express";
import UserDatabase from "../models/userSchema";
import passport from "passport";
import { isLoggin } from "../middleware/auth";
import "dotenv/config";
import "../config/passport";

const router = express.Router();

// SIGNUP/SIGNIN WITH GOOGLE
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// GOOGLE AUTH CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `/login`,
  }),
  (req, res) => {
    if (req.authInfo) res.redirect(`http://localhost:3000/settings`);
    else res.redirect(`http://localhost:3000/`);
  }
);

// LOGOUT
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("http://localhost:3000");
});

// GET USER INFO
router.get("/", (req, res) => {
  res.json(req.user);
});

// UPDATE PROFILE //! Require Midderware (isLoggin) for validation
router.put("/update/:id", (req: any, res: Response) => {
  const id = req.params.id;
  UserDatabase.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, updatedData) => {
      if (err) res.status(400).json({ error: err });
      else res.status(200).json(updatedData);
    }
  );
});

export default router;
