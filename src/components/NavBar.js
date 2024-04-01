import { AppBar, Box, Toolbar, Typography, Button, Stack} from '@mui/material';
import { Link } from 'react-router-dom';

 export default function Navbar() {
  
      
   return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "white"}}>
        <Toolbar>
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
            <Button>
                <Link style={{ textDecoration: "none", color: 'blue', fontFamily: "cursive", fontWeight:"bold" }} to={'/signup'}>Signup</Link>
             </Button>
            <Button>
                <Link style={{ textDecoration: "none", color: 'blue', fontFamily: "cursive", fontWeight:"bold" }} to={'/login'}>LogIn</Link>
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
   ) 
  }