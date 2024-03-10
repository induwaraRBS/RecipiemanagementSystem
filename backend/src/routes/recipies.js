import express from "express";
import mongoose from "mongoose";
import { RecipieModel } from "../models/Recipies.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

//get all Recipies of the users
router.get("/", async (req, res) => {
  try {
    const response = await RecipieModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
//create a new Recipies
router.post("/", async (req, res) => {
  const recipie = new RecipieModel(req.body);
  try {
    const response = await recipie.save({});
    res.json(response);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});
//find recipie by ID of the user
router.put("/", async (req, res) => {
  try {
    const recipie = await RecipieModel.findById(req.body.recipieID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipies.push(recipie);
    await user.save();
    res.json({ savedRecipies: user.savedRecipies });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});
//update the recipie
router.put("/updaterecipies/:id", async (req, res) => {
  const recipeId = req.params.id;
  const { recipiename, ingredients, descriptions } = req.body;
  console.log("checking");
  try {
    const updatedRecipe = await RecipieModel.findByIdAndUpdate(
      recipeId,
      { recipiename, ingredients, descriptions },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (err) {
    res.json(err);
  }
});
//delet the recipie
router.delete("/deleterecipies/:id", async (req, res) => {
  const recipeId = req.params.id;
  console.log("checking");
  try {
    const deletRecipe = await RecipieModel.findByIdAndDelete(recipeId);

    if (!deletRecipe) {
      return res.json({ message: "Recipe Not Found" });
    }

    res.json(deletRecipe);
  } catch (err) {
    res.json(err);
  }
});

export { router as recipiesRouter };
