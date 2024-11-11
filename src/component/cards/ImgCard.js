import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import '../../assets/index.css';
import { SuccessToast, ErrorToast } from "../../Common/Toasts/Toasts";

export default function MediaCard(props) {

  const role = sessionStorage.getItem('role');

  const [open, setOpen] = React.useState(false);
  const route = `/productDetails/${props.id}`
  const editRoute = `modifyProduct/${props.id}`
  sessionStorage.setItem('productId', props.id)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function redirect() {
    window.location.replace(editRoute)
  }

  function deleteProduct() {
    const token = sessionStorage.getItem('token');
    const REGISTRATION_URL = `http://localhost:8080/api/products/${props.id}`;
    const config = {
      headers: { 'x-auth-token': token },
    };
    try {
      axios.delete(REGISTRATION_URL, config).then(() => {
        handleClose();
        SuccessToast('Product deleted successfully')
        window.location.replace('/products');
      })
    } catch (err) {
      ErrorToast('Please check')
      console.log(err);
    }
  }


  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          sx={{ height: 160 }}
          image={props.imageUrl}
          title="Addidas"
        />
        <CardContent style={{ 'height': 140 }}>
          <div style={{ 'display': 'block', 'justify-content': 'space-between', 'align-items': 'center' }}>
            <Typography gutterBottom variant="h6" component="div">
              {props.heading}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              ₹{props.price}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions sx={{
          alignSelf: "stretch",
          display: "flex",
          justifyContent: role === 'ADMIN' ? "space-between" : "flex-start",
          margin: "0 10px",
        }}>
          <Button size="small" href={route} variant='contained' style={{ background: '#3f51b5' }}>Buy</Button>
          <div className='actions'>
            {role === 'ADMIN' ? <EditIcon onClick={redirect} sx={{ fontSize: 'medium', cursor: 'pointer' }} /> : ''}
            {role === 'ADMIN' ? <DeleteIcon onClick={handleClickOpen} sx={{ fontSize: 'medium', cursor: 'pointer','margin-left':20 }} /> : ''}
          </div>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm deletion of product!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={deleteProduct}>Ok</Button>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}