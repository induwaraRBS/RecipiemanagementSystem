import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipiesRouter } from "./routes/recipies.js";

const port = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipies", recipiesRouter);

//mongodb connection
mongoose.connect(
  "mongodb+srv://induwara:Testassignment123@recipes.m2nh20l.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes"
);

app.listen(port, () => console.log("Server Started"));
