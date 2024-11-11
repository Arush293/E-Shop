import React, {  useEffect,useState } from "react";
import PrimarySearchAppBar from "./navbar/Navbar.js";
import ProductDetails from "./detail/ProductDetails.js";
import ColorToggleButton from "./toggle/toggleFilter.js";
import "../assets/index.css";
import axios from 'axios';

/*
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}
*/

export default function Details(){

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategories();
  }, [])

  function getCategories(){
  
    const token = sessionStorage.getItem('token');
    axios.get("http://localhost:8080/api/products/categories", {
          headers: {
            'x-auth-token':token,
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

  function updateData(data) {
    console.log("Updated Data :: ");
    console.log(data);
 }

  return (
    <div style={{margin: 0}}>
      <PrimarySearchAppBar />
    <div style={{textAlign: "center", marginTop: "2%"}}>
    <ColorToggleButton data={categoryList} updateData={updateData} />
    </div>
      <div style={{ margin: "auto", width: "50%", marginTop: "7%"}}>
        <ProductDetails />
      </div>
    </div>
  );
}