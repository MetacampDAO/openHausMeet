// DEPENDENCIES
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";
//* REQUIRE CONTROLLER | EXPRESS ROUTING
import users from "./controllers/usersController";
import group from "./controllers/groupController";
import membership from "./controllers/membershipController";
import events from "./controllers/eventController";
import passport from "passport";
import auth from "./config/passport";

// PASSPORT CONFIG
auth(passport);

// CONFIG
const app = express();
const PORT = process.env.PORT || 5000;

//* MONGOOSE CONFIG
mongoose.connect(process.env.MONGODB_URI as string);

//* SERVER LINKED => DATABASE
mongoose.connection.once("open", () => {
  console.log("Connected to mongo");
});

//* MIDDLEWARE
app.use(
  session({
    secret: process.env.PASSPORT_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

//* ROUTES
app.use("/api/v1/user", users);
app.use("/api/v1/group", group);
app.use("/api/v1/membership", membership);
app.use("/api/v1/event", events);

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
