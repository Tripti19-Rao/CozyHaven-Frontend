import { useContext, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Stack, Tooltip,IconButton,Menu,MenuItem,FormControl,Select,InputLabel} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import SearchContext from '../ContextApi/searchContext';

//import Search from './Finder/Search';


 export default function Navbar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const {searchResults} = useContext(SearchContext)
  const [gender, setGender] = useState('')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose()
    localStorage.clear()
    navigate('/login')
  }

  const token = localStorage.getItem('token')
  const navBasedOnRole = () => {
    
    const {role} = jwtDecode(token)
    

    if(role === "finder") {
      //console.log(id,role)
      return (
        <>
          {searchResults.isSearched && (
            <>
            <FormControl
            sx={{ m: 1, minWidth: 120}}
          >
            <InputLabel id="gender-label"  size="small">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              size="small"
              value={gender}
              onChange={(e)=>{setGender(e.target.value)}}
              //sx={{ '&:focus': { backgroundColor: '#B6D1F8', borderRadius: '16px' } }}
              // value={values.gender}
              // onBlur={handleBlur}
              // label="Gender"
              // onChange={(e) => {
              //   handleChange(e);
              //   setFieldValue("gender", e.target.value); // Manually set the field value for Formik
              // }}
             //style={{ width: "200px" }}
            >
              <MenuItem value=" ">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="co-living">Co-living</MenuItem>
            </Select>
          </FormControl>
            </>
          )}
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
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
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
      <AppBar position="fixed" style={{ backgroundColor: "white", zIndex: 1000,  boxShadow: "none"}}>
        <Toolbar  >
        <Stack direction="row" alignItems="center" spacing={1} sx={{flexGrow: 1}}>
            <img src='/Cozy.png' alt='CozyHaven Logo' width="50px" height="50px"/>
            {/* <Typography 
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                color="blue"
                fontWeight="bold"
                fontFamily="Squada One, cursive"
            >CozyHaven</Typography> */}
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