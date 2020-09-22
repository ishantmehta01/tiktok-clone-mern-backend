import mongoose from "mongoose";

const tiktokVideosSchema = mongoose.Schema({
  src: String,
  //   id: String,
  channel: String,
  description: String,
  song: String,
  likes: String,
  messages: String,
  shares: String
});

export default mongoose.model("tiktokViddeos", tiktokVideosSchema);
