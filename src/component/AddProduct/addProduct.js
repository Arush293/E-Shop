/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import PrimarySearchAppBar from '../navbar/Navbar';
import CreatableSelect from 'react-select/creatable';
import { SuccessToast, ErrorToast } from "../../Common/Toasts/Toasts";


// TODO remove, this demo shouldn't need to reset the theme.
async function addProductRequest(addProductRequestData) {
  const ADD_PRODUCT_URL = "http://localhost:8080/api/products";
  const token = sessionStorage.getItem('token')
  console.log("Product Request Data :: ");
  const config = {
    headers: { "x-auth-token": token }
  };
  try {
    var response = await axios.post(ADD_PRODUCT_URL, addProductRequestData, config);
    console.log(response)
    SuccessToast(`Product ${addProductRequestData.name} added successfully`)
    setTimeout(() => {
      window.location.replace("/products");
    }, 300)

  } catch (err) {
    ErrorToast(`Please check product details`)
  }
}


const defaultTheme = createTheme();

export default function AddProduct() {

  const [categoryList, setCategoryList] = React.useState([]);
  const [category, setCategory] = React.useState()

  const [nameError, setNameError] = React.useState(false);
  const [manufacturerError, setManufacturerError] = React.useState(false);
  const [availableItemsError, setAvailableItemsError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);
  const token = sessionStorage.getItem('token');

  React.useEffect(() => {
    getCategories();
  }, [])

  function getCategories() {
    if (token) {
      axios.get("http://localhost:8080/api/products/categories", {
        headers: {
          'x-auth-token': token,
        },
      })
        .then(function (response) {
          console.log(response.data)
          setCategoryList(response.data);
        })
        .catch(function (err) {
          console.log(err)
        });
    }
    else{
      window.location.replace('/login')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameError(false)
    setManufacturerError(false)
    setAvailableItemsError(false)
    setPriceError(false)
    const data = new FormData(event.currentTarget);
    var addProductRequestData = {
      "id": "12345",
      "name": data.get('name'),
      "category": category.value,
      "price": data.get('price'),
      "description": data.get('description'),
      "manufacturer": data.get('manufacturer'),
      "availableItems": data.get('availableItems'),
      "imageUrl": data.get('imageUrl')
    };
    if (data.get('name') === '') {
      setNameError(true)
    }
    if (data.get('price') === '') {
      setPriceError(true)
    }
    if (data.get('manufacturer') === '') {
      setManufacturerError(true)
    }
    if (data.get('availableItems') === '') {
      setAvailableItemsError(true)
    }
    console.log(addProductRequestData);
    if (data.get('name') && data.get('price') && data.get('manufacturer') && data.get('availableItems')) {
      addProductRequest(addProductRequestData);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PrimarySearchAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              error={nameError}
            />
            <CreatableSelect
              className="basic-single"
              name="category"
              fullWidth
              margin='normal'
              classNamePrefix="Category"
              getOptionValue={(item) => item}
              options={categoryList.map((item) => ({
                label: item,
                value: item,
              }))}
              isClearable
              value={category}
              onChange={(data) => setCategory(data)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Manufacturer"
              name="manufacturer"
              error={manufacturerError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              variant="outlined"
              name="availableItems"
              label="Available Items"
              error={availableItemsError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              name="price"
              label="Price"
              variant="outlined"
              error={priceError}
            />
            <TextField
              margin="normal"
              fullWidth
              name="imageURL"
              label="Image URL"
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              name="productDescription"
              label="Product Description"
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: '#3f51b5' }}
            >
              Save Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}