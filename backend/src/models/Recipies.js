import mongoose from "mongoose";

const RecipieSchema = new mongoose.Schema({
  recipiename: { type: String, required: true },
  ingredients: { type: String, required: true },
  descriptions: { type: String, required: true },
  userowner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
});

export const RecipieModel = mongoose.model("recipies", RecipieSchema);
