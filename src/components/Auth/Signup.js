import { useState } from "react";
import axios from "axios";
import { Grid, Box, Stack, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
      role,
    };
    try {
      const response = await axios.post(
        "http://localhost:3055/api/user/register",
        formData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (

<div >
      <Grid container spacing={0} height="auto">
        <Grid item xs={6}>
          <img
            src="/sign.jpg"
            alt="Your Image"
            style={{ margin: "100px", height: "370px" }}
          />
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: "#6698E1" , height:"100%" }}>
          <Box
            height={499}
            width={430}
            my={4}
            alignItems="center"
            gap={4}
            p={2}
            m={15}
            sx={{ border: "2px solid grey", backgroundColor: "#FFFFFF" }}
          ><Stack spacing={2} direction="column">
            <Typography
              variant="body1"
              fontWeight="bold"
              fontFamily="Squada One, cursive"
              textAlign="center"
              fontSize="25px"
            >
              CozyHaven
            </Typography>
            {/* <br /> */}
            
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {/* <br /> */}
            <TextField
              
              margin="dense"
              id="email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* <br /> */}
            <TextField
              
              margin="dense"
              id="username"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            /><TextField
              
            margin="dense"
            id="username"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
            {/* <br /> */}
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Role
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                row 
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Owner"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Finder"
                />
              </RadioGroup>
            </FormControl>
            </Stack>

            <Button variant="contained" sx={{backgroundColor:'#5785FD', marginLeft:'150px ',width:'100px'}}>Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </div>

  );
}
