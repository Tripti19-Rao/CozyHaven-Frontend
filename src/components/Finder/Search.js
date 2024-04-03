import { useState, useContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//import searchResultsReducer from "../../Reducer/searchResultsReducers";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import SearchContext from "../../ContextApi/searchContext";

export default function Search() {
  const {searchDispatch} = useContext(SearchContext)

  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});

  const basicSchema = yup.object().shape({
    address: yup.string().required("City & Area is required"),
    gender: yup
      .string()
      .oneOf(["female", "male", "co-living", ""], "Please select the gender"),
    sharing: yup.number(),
  });

  const onSubmit = async() => {
    // const formData = {
    //   address: values.address,
    //   gender: values.gender,
    //   sharing: values.sharing,
    // };
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('address', values.address);
        queryParams.append('sharing', values.sharing);
        queryParams.append('gender', values.gender);

        const response = await axios.get(`http://localhost:3055/api/buildings/search?${queryParams.toString()}`)
        //console.log(response.data)
        searchDispatch({type: 'SET_BUILDINGS',payload: response.data})
        navigate('/search-results')
    } catch (err) {
      setServerErrors(err.response.data);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      address: "",
      gender: "",
      sharing: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <div>
      <Typography
        variant="body1"
        fontWeight="bold"
        fontFamily="San Serif"
        textAlign="center"
        fontSize="50px"
        style={{ marginTop: "100px" }}
      >
        CozyHaven
      </Typography>
      <img
        src="/search.jpg"
        alt="Signup Page Banner"
        style={{ marginLeft: "150px", height: "450px", position: "relative" }}
      />
      <Box
        //height={600}
        width={430}
        // alignItems="center"
        // gap={4}
        p={4}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          overflowY: "auto", // Enable vertical scrolling if content exceeds box height
          maxHeight: "100vh", // Set a maximum height to prevent box from taking up the entire viewport>
        }}
      >
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
          id="address"
          label="City & Area"
          type="text"
          fullWidth
          variant="outlined"
          error={errors.address && touched.address}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.address && touched.address ? (
              <span style={{ color: "red" }}>{errors.username}</span>
            ) : null
          }
        />
        <div style={{ display: "flex", marginTop: "30px", gap: "30px" }}>
          <FormControl
            variant="outlined"
            fullWidth
            error={errors.gender && touched.gender}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={values.gender}
              onBlur={handleBlur}
              label="Gender"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("gender", e.target.value); // Manually set the field value for Formik
              }}
              style={{ width: "200px" }}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"co-living"}>Co-living</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            error={errors.sharing && touched.sharing}
          >
            <InputLabel id="sharing-label">Sharing</InputLabel>
            <Select
              labelId="sharing-label"
              id="sharing"
              name="sharing"
              value={values.sharing}
              onChange={(e) => {
                handleChange(e);
                setFieldValue("sharing", e.target.value); // Manually set the field value for Formik
              }}
              onBlur={handleBlur}
              label="Sharing"
              style={{ width: "200px" }}
            >
              <MenuItem value={1}>Single</MenuItem>
              <MenuItem value={2}>2-Sharing</MenuItem>
              <MenuItem value={3}>3-Sharing</MenuItem>
            </Select>
          </FormControl>
          {/* <Select defaultValue={"male"}style={{  width: '200px' }}>
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"co"}>Co-living</MenuItem>
                </Select> */}
          {/* <Select  defaultValue={"1"} style={{  width: '200px' }}>
                    <MenuItem value={1}>Single</MenuItem>
                    <MenuItem value={2}>2-Sharing</MenuItem>
                    <MenuItem value={3}>3-Sharing</MenuItem>
                </Select> */}
        </div>
        <Button
          variant="contained"
          type="submit"
          endIcon={<FaSearch />}
          sx={{
            backgroundColor: "#5785FD",
            marginTop: "30px",
            marginLeft: "150px ",
            width: "100px",
            fontWeight: "bold",
          }}
        >
          Search <FaSearch />
        </Button>
      </Box>
    </div>
  );
}
