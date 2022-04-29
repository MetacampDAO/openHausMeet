import { model, Schema } from "mongoose";

const membershipSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  group: { type: Schema.Types.ObjectId, ref: "groups" },
  joinDate: { type: Date, default: Date.now() },
  groupObjective: { type: String },
  eventsAttended: [{ type: Schema.Types.ObjectId, ref: "events" }],
});

const userModel = model("membership", membershipSchema);
export default userModel;
