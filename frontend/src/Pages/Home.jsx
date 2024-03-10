import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Cookies } from "react-cookie";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Home = () => {
  const [recipies, setRecipies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipies");
        setRecipies(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipies();
  }, []);

  const onDelete = (id) =>{
      const deletRecipies = async()=>{
        try{
          const response =  await axios.delete("http://localhost:3001/recipies/deleterecipies/"+id)
          console.log(response);
          window.location.reload();
        }
        catch(err){
          console.error(err)
        }
      
      }
      deletRecipies();
  }

  const handleClickOpen = (id) => {
    setSelectedRecipe(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(selectedRecipe);
    setOpen(false);
  };

  return (
    <>
    <Grid container spacing={3}>
      {recipies.map((recipie) => (
        <Grid item xs={12} sm={6} md={4} key={recipies._id}>
          <Card
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {recipie.recipiename}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                <strong>Ingredients:</strong> {recipie.ingredients}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Description:</strong> {recipie.descriptions}
              </Typography>
            </CardContent>
            <div
              style={{
                alignSelf: "flex-end",
                marginBottom: "10px",
                marginRight: "10px",
              }}
            >
              <Link to={`/updaterecipies/${recipie._id}`}>
              <Button
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
              
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClickOpen(recipie._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this recipe?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This recipe will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
  );
};

export default Home;
