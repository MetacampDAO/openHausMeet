import { model, Schema } from "mongoose";

const interestSchema = new Schema({
  name: { type: String, required: true },
  popularity: { type: Number, default: 0 },
});

const listingModel = model("interests", interestSchema);
export default listingModel;
