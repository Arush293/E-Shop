import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import '../../assets/navbar.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const CenteredContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 4,
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(props) {

  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('role');
  var checkLogIn = false;
  if(token){
    checkLogIn = true;
  }

  function logout (){
    sessionStorage.clear();
    window.location.replace("/");
  }

  function handleChange(event){
    console.log(event.target.value);
    props.updateSearch(event.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#3f51b5'}}>
        <Toolbar 
        sx={{
            justifyContent: "space-between"
          }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            E-Shop
          </Typography>
          <CenteredContent>
          <Search sx={{ alignItems: "center", justifyContent: "center",flex: 0.7}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={handleChange}
            />
          </Search>
          </CenteredContent>
            <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {checkLogIn ? <Link href="/products" className='headerlinks' style={{ textDecoration: 'underline' }}>Home</Link> : ''}
                    {role === 'ADMIN' ? <Link href="/addProduct" className='headerlinks' style={{ textDecoration: 'underline' }}>Add Product</Link> : ''}
                    {!checkLogIn ? <Link href='/login'  className='headerlinks' style={{ textDecoration: 'underline' }}>Login</Link> : ''}
                    {!checkLogIn ? <Link  href='/signup' className='headerlinks' style={{ textDecoration: 'underline' }}>Sign Up</Link> : ''}
                    {checkLogIn ? <Button variant="contained" className='logout' href='/' onClick={logout}>Logout</Button> : ''}
                </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}