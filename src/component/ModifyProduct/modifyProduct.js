/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
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
import { useParams } from "react-router-dom";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddProduct() {

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState()
  const token = sessionStorage.getItem('token');

  const { id } = useParams();


  const [nameError, setNameError] = useState(false);
  const [manufacturerError, setManufacturerError] = useState(false);
  const [availableItemsError, setAvailableItemsError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [availableItems, setAvailableItems] = useState();
  const [price, setPrice] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    getData()
  }, [])

  function getData(){
    if(token){
      getCategories();
      getProductDetails();
    }
    else{
      window.location.replace('/login');
    }
  }

  async function modifyProductRequest(modifyProductRequestData) {
    const ADD_PRODUCT_URL = `http://localhost:8080/api/products/${id}`;
    console.log("Product Request Data :: ");
    const config = {
      headers: { "x-auth-token": token }
    };
    try {
      var response = await axios.put(ADD_PRODUCT_URL, modifyProductRequestData, config);
      console.log(response)
      SuccessToast(`Product ${modifyProductRequestData.name} added successfully`)
      setTimeout(() => {
        window.location.replace("/products");
      }, 300)

    } catch (err) {
      ErrorToast(`Please check product details`)
    }
  }

  function getProductDetails() {
    const id = sessionStorage.getItem('productId')
    axios
      .get(`http://localhost:8080/api/products/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then((response) => {
        const data = response.data;
        setName(data.name);
        const categoryName = data.category;
        setCategory({ label: categoryName, value: categoryName });
        setManufacturer(data.manufacturer);
        setAvailableItems(data.availableItems);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setProductDescription(data.description);
      })
  }

  function getCategories() {
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setNameError(false)
    setManufacturerError(false)
    setAvailableItemsError(false)
    setPriceError(false)
    var modifyProductRequestData = {
      "id": id,
      "name": name,
      "category": category.value,
      "price": parseInt(price),
      "description": productDescription,
      "manufacturer": manufacturer,
      "availableItems": availableItems,
      "imageUrl": imageUrl
    };
    if (name === '') {
      setNameError(true)
    }
    if (price === '') {
      setPriceError(true)
    }
    if (manufacturer === '') {
      setManufacturerError(true)
    }
    if (availableItems === '') {
      setAvailableItemsError(true)
    }
    console.log(modifyProductRequestData);
    if (name && price && manufacturer && availableItems) {
      modifyProductRequest(modifyProductRequestData);
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
            Modify Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              value={name}
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
              onChange={(e) => setManufacturer(e.target.value)}
              error={manufacturerError}
              value={manufacturer}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              variant="outlined"
              name="availableItems"
              label="Available Items"
              onChange={(e) => setAvailableItems(e.target.value)}
              error={availableItemsError}
              value={
                availableItems !== undefined
                  ? Number(availableItems)
                  : availableItems
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              name="price"
              label="Price"
              variant="outlined"
              onChange={(e) => setPrice(e.target.value)}
              error={priceError}
              value={price !== undefined ? Number(price) : price}
            />
            <TextField
              margin="normal"
              fullWidth
              name="imageURL"
              label="Image URL"
              variant="outlined"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />
            <TextField
              margin="normal"
              fullWidth
              name="productDescription"
              label="Product Description"
              variant="outlined"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: '#3f51b5' }}
            >
              Modify Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}