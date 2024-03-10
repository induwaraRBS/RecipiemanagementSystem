import React from "react";
import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

const Createrecipe = () => {
  const userID = useGetUserID();
  const [recipie, setRecipie] = useState({
    recipiename: "",
    ingredients: "",
    descriptions: "",
    userowner: userID,
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipie({ ...recipie, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipies", recipie);
      alert("recipie created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1">
          Add Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="recipeName"
            label="Recipe Name"
            name="recipiename"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="ingredients"
            label="Ingredients"
            name="ingredients"
            multiline
            rows={4}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="descriptions"
            multiline
            rows={4}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            color="error"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Createrecipe;
