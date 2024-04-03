import { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Stack, Tooltip,IconButton,Menu,MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
//import Search from './Finder/Search';


 export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = localStorage.getItem('token')
  const navBasedOnRole = () => {
    
    const {role} = jwtDecode(token)
    //console.log(role)
    

    if(role === "finder") {
      return (
        <>
          <Tooltip title="view wishlist">
          <IconButton>
              <Link to={"/wishlist"}><FcLike style={{fontSize: "35px"}}/></Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="view profile">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <FaUser style={{color: "blue", fontSize: "28px"}}/>
            </IconButton>
            
          </Tooltip>
      <Menu
        sx={
          { mt: "45px", "& .MuiMenu-paper": 
            { backgroundColor: "white", color: "blue", fontWeight: "bold"}, 
          }
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
       keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={'/profile'} style={{textDecoration: 'none', color: "blue"}}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={'/paymentHistory'} style={{textDecoration: 'none',color: "blue"}}>Payment History</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Menu>
        </>
      )
    } else if(role === "admin") {
      return (
        <>
          <Button>Admin</Button>
        </>
      )
    } else if(role === "owner") {
      return (
        <>
          <Button>Owner</Button>
        </>
      )
    }
  }
  
      
   return (
    <Box sx={{ flexGrow: 1 ,}}>
      <AppBar position="static" style={{backgroundColor: "white", zIndex: 1000 }}>
        <Toolbar  >
        <Stack direction="row" alignItems="center" spacing={1} sx={{flexGrow: 1}}>
            <img src='/Cozy.png' alt='CozyHaven Logo' width="50px" height="50px"/>
            <Typography 
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                color="blue"
                fontWeight="bold"
                fontFamily="Squada One, cursive"
            >CozyHaven</Typography>
        </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
            {!token ? (
                <>
                <Button>
                  <Link style={{ textDecoration: "none", color: 'blue', fontFamily: "cursive", fontWeight:"bold" }} to={'/signup'}>Signup</Link>
                </Button>
                <Button>
                  <Link style={{ textDecoration: "none", color: 'blue', fontFamily: "cursive", fontWeight:"bold" }} to={'/login'}>LogIn</Link>
                </Button>
                </>
              
            ) : 
            navBasedOnRole()
            }
            </Stack>
        </Toolbar>
      </AppBar>
      {/* <Search/> */}
    </Box>
   ) 
  }