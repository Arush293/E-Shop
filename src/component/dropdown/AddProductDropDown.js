import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  // eslint-disable-next-line
  const [order, setOrder] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value);
    setOrder(event.target.value);
    var data = props.data;
    if(event.target.value === "lowToHigh"){
      data.sort(fromLowToHigh);
      console.log("After Sorting Low to High");
      props.updateData(data);
    } else if(event.target.value === "highToLow"){
      data.sort(fromHighToLow);
      console.log("After Sorting High To Low");
      props.updateData(data);
    } else if(event.target.value === "default"){
      data.sort(defaultSort);
      console.log("After Sorting Default");
      props.updateData(data);
    }
  }

  function defaultSort(a,b){
    if(a.id<b.id){
      return -1;
    }
    if(a.id>b.id){
      return 1;
    }
    return 0;
  }

  function fromLowToHigh(a,b){
    if(a.price<b.price){
      return -1;
    }
    if(a.price>b.price){
      return 1;
    }
    return 0;
  }

  function fromHighToLow(a,b){
    if(a.price<b.price){
      return 1;
    }
    if(a.price>b.price){
      return -1;
    }
    return 0;
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order}
          label="Select..."
          onChange={handleChange}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="highToLow">Price: High to Low</MenuItem>
          <MenuItem value="latestToOldest">Newest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}