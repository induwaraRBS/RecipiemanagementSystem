import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const Updaterecipie = () => {
  const userID = useGetUserID();

  const { id } = useParams();
  const [recipie, setRecipie] = useState({
    recipiename: "",
    ingredients: "",
    descriptions: "",
    userowner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipie({ ...recipie, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3001/recipies/updaterecipies/" + id,
        recipie
      );
      alert("recipie updated");
      console.log(response);
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Updaterecipie;
