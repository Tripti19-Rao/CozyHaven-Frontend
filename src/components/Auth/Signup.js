import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  Alert,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import {toast , ToastContainer} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // // Extend yup with password validation methods


export default function Signup() {
  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState({});

  const basicSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      //taking refernce and value inside array is valid in that field
      .oneOf([yup.ref("password"), null], "Password must match")
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      //taking refernce and value inside array is valid in that field
      .oneOf([yup.ref("password"), null], "Password must match")
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),
    role: yup
      .string()
      .required("Role is required")
      //only finder and owner is allowed
      .oneOf(["finder", "owner"], "Invalid role"),
  });

  const onSubmit = async (values, actions) => {
    const formData = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    try {
      await axios.post(
        "http://localhost:3055/api/users/register",
        formData
      );
      actions.resetForm();
      setServerErrors({});
      toast.success("Successfully Registered!",{
        autoClose:1000,
        onClose:()=>navigate('/login')
      });
    } catch (err) {
      setServerErrors(err.response.data);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  return (
    <div>
      <Grid container spacing={0} height="auto">
        <ToastContainer />
        <Grid item xs={6}>
          <img
            src="/sign.jpg"
            alt="Signup Page Banner"
            style={{ margin: "100px", height: "370px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "#6698E1",
              height: "100vh",
              position: "relative",
            }}
          >
            <Box
              //height={600}
              width={430}
              // alignItems="center"
              // gap={4}
              p={4}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                border: "1px solid grey",
                backgroundColor: "#FFFFFF",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                overflowY: "auto", // Enable vertical scrolling if content exceeds box height
                maxHeight: "100vh", // Set a maximum height to prevent box from taking up the entire viewport
              }}
            >
              <Stack spacing={2} direction="column">
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
                {serverErrors.errors &&
                  serverErrors.errors.map((ele) => {
                    return (
                      <Alert
                        severity="error"
                        style={{ position: "sticky", marginBottom: "20px" }}
                      >
                        {ele.msg}
                      </Alert>
                    );
                  })}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="outlined"
                  error={errors.username && touched.username}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.username && touched.username ? (
                      <span style={{ color: "red" }}>{errors.username}</span>
                    ) : null
                  }
                />
                {/* <br /> */}
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  error={errors.email && touched.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.email && touched.email ? (
                      <span style={{ color: "red" }}>{errors.email}</span>
                    ) : null
                  }
                />
                {/* <br /> */}
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={errors.password && touched.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password ? (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    ) : null
                  }
                />
                <TextField
                  margin="dense"
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={errors.confirmPassword && touched.confirmPassword}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.confirmPassword && touched.confirmPassword ? (
                      <span style={{ color: "red" }}>
                        {errors.confirmPassword}
                      </span>
                    ) : null
                  }
                />
                {/* <br /> */}
                <FormControl>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{ textAlign: "left", fontSize: "17px" }}
                  >
                    Select Role
                  </FormLabel>
                  {errors.role && touched.role ? (
                    <FormHelperText style={{ color: "red" }}>
                      {errors.role}
                    </FormHelperText>
                  ) : null}
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="role"
                    value={values.role}
                    error={errors.role && touched.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    row
                  >
                    <FormControlLabel
                      value="owner"
                      control={<Radio />}
                      label="Owner"
                    />
                    <FormControlLabel
                      value="finder"
                      control={<Radio />}
                      label="Finder"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#5785FD",
                  marginLeft: "150px ",
                  width: "100px",
                }}
              >
                Submit
              </Button>
              <Grid container spacing={2} style={{marginTop: '2px'}}>
                <Grid item xs={5}>
                  <Divider style={{border: "1px solid black"}}/>
                </Grid>
                <Grid item xs={1} style={{padding: "5px",marginLeft: "15px",marginRight: "10px"}}>
                  <Typography
                    //variant="body1"
                    // fontWeight="bold"
                    fontFamily="Prociono"
                    textAlign="center"
                    fontSize="16px"
                    sx={{color: "#737373"}}
                  >OR</Typography>
                </Grid>
                <Grid item xs={5} style={{paddingLeft: "4px"}}>
                  <Divider style={{border: "1px solid black"}}/>
                </Grid>
                </Grid>
                <Typography
                  //variant="body1"
                  // fontWeight="bold"
                  fontFamily="Prociono"
                  textAlign="center"
                  fontSize="16px"
                  sx={{color: "black"}}
                  >Already have an account? <Link to={"/login"}>Click here</Link>
                </Typography>
             </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import { Grid, Box, Stack, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
// import { useFormik } from 'formik'

// export default function Signup() {
//   const formik = useFormik()
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       username,
//       email,
//       password,
//       role,
//     };
//     try {
//       const response = await axios.post(
//         "http://localhost:3055/api/user/register",
//         formData
//       );
//       console.log(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (

// <div >
//       <Grid container spacing={0} height="auto">
//         <Grid item xs={6}>
//           <img
//             src="/sign.jpg"
//             alt="Your Image"
//             style={{ margin: "100px", height: "370px" }}
//           />
//         </Grid>
//         <Grid item xs={6} sx={{ backgroundColor: "#6698E1" , height:"100%" }}>
//           <Box
//             height={499}
//             width={430}
//             my={4}
//             alignItems="center"
//             gap={4}
//             p={2}
//             m={15}
//             sx={{ border: "2px solid grey", backgroundColor: "#FFFFFF" }}
//           ><Stack spacing={2} direction="column">
//             <Typography
//               variant="body1"
//               fontWeight="bold"
//               fontFamily="Squada One, cursive"
//               textAlign="center"
//               fontSize="25px"
//             >
//               CozyHaven
//             </Typography>
//             {/* <br /> */}

//             <TextField
//               autoFocus
//               margin="dense"
//               id="username"
//               label="Username"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//               }}
//             />
//             {/* <br /> */}
//             <TextField

//               margin="dense"
//               id="email"
//               label="Email"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//             {/* <br /> */}
//             <TextField

//               margin="dense"
//               id="username"
//               label="Password"
//               type="password"
//               fullWidth
//               variant="outlined"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             /><TextField

//             margin="dense"
//             id="username"
//             label="Confirm Password"
//             type="password"
//             fullWidth
//             variant="outlined"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//             {/* <br /> */}
//             <FormControl>
//               <FormLabel id="demo-controlled-radio-buttons-group">
//                 Role
//               </FormLabel>
//               <RadioGroup
//                 aria-labelledby="demo-controlled-radio-buttons-group"
//                 name="controlled-radio-buttons-group"
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                 }}
//                 row
//               >
//                 <FormControlLabel
//                   value="female"
//                   control={<Radio />}
//                   label="Owner"
//                 />
//                 <FormControlLabel
//                   value="male"
//                   control={<Radio />}
//                   label="Finder"
//                 />
//               </RadioGroup>
//             </FormControl>
//             </Stack>

//             <Button variant="contained" sx={{backgroundColor:'#5785FD', marginLeft:'150px ',width:'100px'}}>Submit</Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </div>

//   );
// }
