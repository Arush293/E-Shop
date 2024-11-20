/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ProductDetails() {

  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    getProductDetails()
  }, []);

  function getProductDetails() {
    if (token) {
      axios
        .get(`http://localhost:8080/api/products/${id}`, {
          headers: {
            'x-auth-token': token,
          },
        })
        .then((response) => {
          setData(response.data);
        })
    }
    else {
      window.location.replace('/login');
    }
  }

  function handleChange(event) {
    setQuantity(event.target.value)
    sessionStorage.setItem('quantity', event.target.value);
  }

  return (
    <div style={{ margin: 0 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <img src={data.imageUrl} alt="product_image" height="250em" width="200em" style={{ marginRight: "40%" }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            iPhone 12 <Chip label={`Available Quantity: ${data.availableItems}`} style={{ background: '#3f51b5', color: "white" }} />
          </Typography>
          <Typography variant="p">
            Category: {data.category}
          </Typography> <br /><br />
          <Typography variant="p" fontSize="12px"><i>{data.description}</i></Typography><br /><br />
          <Typography variant="p" fontSize="22px" color="red"> {data.price} </Typography> <br /><br />
          <div style={{ width: "20em" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Enter Quantity"
              name="quantity"
              autoComplete="quantity"
              autoFocus
              onChange={handleChange}
              value={quantity}
            />
          </div>
          <div style={{ width: "8em" }}>
            <Button disabled={!(quantity >= 1)} type="submit" fullWidth variant="contained" style={{ background: '#3f51b5' }} onClick={() =>
              navigate("/placeOrder", {
                state: { ...data, quantity: quantity },
              })
            }>PLACE ORDER</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}