import { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Stack, Tooltip,IconButton,Menu,MenuItem} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { handleLogout } from '../Actions/UserActions';

//import Search from './Finder/Search';


 export default function Navbar() {
  const navigate = useNavigate()
  const usersDispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose()
    localStorage.clear()
    usersDispatch(handleLogout)
    navigate('/login')
  }

  const token = localStorage.getItem('token')
  const navBasedOnRole = () => {
    
    const {role} = jwtDecode(token)
    

    if(role === "finder") {
      //console.log(id,role)
      return (
        <>
          <Tooltip title="view wishlist">
          <IconButton>
              <Link to={"/wishlist"}><FcLike style={{fontSize: "35px"}}/></Link>
            </IconButton>
          </Tooltip>
          <Tooltip title="view profile">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <FaUser style={{color: "#27438e", fontSize: "28px"}}/>
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
          <Link to={'/profile'} style={{textDecoration: 'none', color: "#27438e"}}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={'/paymentHistory'} style={{textDecoration: 'none',color: "#27438e"}}>Payment History</Link>
        </MenuItem>
        <MenuItem onClick={handleLogOut} style={{textDecoration: 'none',color: "#27438e"}}>Log Out</MenuItem>
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
          <Tooltip title="view Profile">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Typography>Owner</Typography>
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
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </Menu>
          {/* <Button>Owner</Button> */}
        </>
      )
    }
  }
  
      
   return (
    <Box sx={{ flexGrow: 1 ,}}>
      <AppBar position="fixed" style={{ backgroundColor: "white", zIndex: 1000,  }}>
        <Toolbar  >
        <Stack direction="row" alignItems="center" spacing={1} sx={{flexGrow: 1}}>
            <img src='/logo.png' alt='CozyHaven Logo' width="50px" height="50px"/>
            <Typography 
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                color="#27438e"
                fontWeight="bold"
                // fontFamily="Squada One, cursive"
            >CozyHaven</Typography>
        </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
            {!token ? (
                <>
                <Button>
                  <Link style={{ textDecoration: "none", color: '#27438e', fontWeight:"bold" }} to={'/signup'}>Signup</Link>
                </Button>
                <Button>
                  <Link style={{ textDecoration: "none", color: '#27438e', fontWeight:"bold" }} to={'/login'}>LogIn</Link>
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