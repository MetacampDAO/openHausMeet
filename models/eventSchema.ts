import { model, Schema } from "mongoose";

const eventSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "groups" },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  featurePicture: { type: String },
  description: { type: String, required: true },
  location: { type: String, required: true },
  onlineMeetLink: { type: String },
  maxCapacity: { type: Number, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "users" }],
  host: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

const listingModel = model("events", eventSchema);
export default listingModel;
