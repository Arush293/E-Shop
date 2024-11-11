import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect } from 'react';
import axios from 'axios';

export default function ColorToggleButton(props) {

  const [alignment, setAlignment] = React.useState('web');
  const [data,setProductData] = React.useState()
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(()=>{
    getProducts()
  },[])

  var filteredData = [];

  const Products = props.data;

  function filterData(event) {
    console.log(event.target.value);
    for (var i = 0; i < data.length; i++) {
      if (data[i].category === event.target.value) {
        filteredData.push(data[i]);
      }
    }
    console.log(filterData)
    props.updateData(filteredData);
  }

  function allData() {
    props.updateData(data);
  }

  function getProducts() {
    const token = sessionStorage.getItem('token');
    const SIGNIN_URL = "http://localhost:8080/api/products";
    const config = {
      headers: { "x-auth-token":token }
    };
    try {
      return axios.get(SIGNIN_URL, config).then((response) => {
        setProductData(response.data)
      })
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all" onClick={allData}>All</ToggleButton>
      {Products.map((card, i) => {
        return (
          <div>
            <ToggleButton
              value={card} onClick={filterData}
            >              {card.toUpperCase()}
            </ToggleButton>
          </div>
        )
      })}
    </ToggleButtonGroup>
  );
}