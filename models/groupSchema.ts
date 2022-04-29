import { model, Schema } from "mongoose";

const groupSchema = new Schema({
  groupName: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String },
  // interest: [{ type: Schema.Types.ObjectId, ref: "interests" }],
  interest: [{ type: String }],
  members: [{ type: Schema.Types.ObjectId, ref: "membership" }],
  owner: { type: Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now() },
  lastUpdate: { type: Date, default: Date.now() },
  requireApproval: { type: Boolean, default: false },
  pendingRequest: [{ type: Schema.Types.ObjectId, ref: "membership" }],
});

const listingModel = model("groups", groupSchema);
export default listingModel;
