import { model, Schema } from "mongoose";

const userSchema = new Schema({
  // From Google
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, required: true },
  // From Form
  country: { type: String }, // Required
  introduction: { type: String }, // Required
  website: { type: String },
  github: { type: String },
  twitter: { type: String },
  // isValidated: { type: Boolean, default: false },
  membership: [{ type: Schema.Types.ObjectId, ref: "membership" }],
  // networkRequest: [{ type: Schema.Types.ObjectId, ref: "networkRequest" }],
  // network: [{ type: Schema.Types.ObjectId, ref: "users" }],
  interest: [{ type: Schema.Types.ObjectId, ref: "interests" }],
  groups: [{ type: Schema.Types.ObjectId, ref: "groups" }],
  // 0: Everyone can view
  // 1: Only friends
  // 2: Only host
  privacy: { type: Number, default: 0 },
  // Require to be signer to validate?
  walletAddress: { type: String },
});

const userModel = model("users", userSchema);
export default userModel;
