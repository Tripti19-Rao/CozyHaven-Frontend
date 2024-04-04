import React, { useState, useMemo, useRef, useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import BuildingContext from "../../ContextApi/BuildingContext";

//import icons
// import { makeStyles } from '@mui/styles';
import IconButton from "@mui/material/IconButton";
import WifiIcon from "@mui/icons-material/Wifi";
import HotTubIcon from "@mui/icons-material/HotTub";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { GiWashingMachine } from "react-icons/gi";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PowerIcon from "@mui/icons-material/Power";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
//import icons end

// const useStyles = makeStyles({
//   selected: {
//     backgroundColor: 'grey', // Change the background color for selected icons
//   },
// });
export default function BuildingForm() {
  const { buildings } = useContext(BuildingContext);

  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  // const [open, setOpen] = useState(false);

  //icons logic starts here
  const [selectedIds, setSelectedIds] = useState([]);
  console.log(selectedIds);

  const handleItemClick = (id) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      setSelectedIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds((prevIds) => [...prevIds, id]);
    }
  };

  const getIconComponent = (name) => {
    switch (name) {
      case "Wifi":
        return <WifiIcon />;
      case "Hot-water":
        return <HotTubIcon />;
      case "Breakfast":
        return <FreeBreakfastIcon />;
      case "Lunch":
        return <RiceBowlIcon />;
      case "Dinner":
        return <DinnerDiningIcon />;
      case "Washing-machine":
        return <GiWashingMachine />;
      case "Fridge":
        return <KitchenIcon />;
      case "Purified-water":
        return <WaterDropIcon />;
      case "Parking":
        return <LocalParkingIcon />;
      case "Security":
        return <GppGoodIcon />;
      case "Powerbackup":
        return <PowerIcon />;
      case "House-keeping":
        return <CleaningServicesIcon />;
      default:
        return null;
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //my logic
  const handleButtonClick = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      handleNext();
    }
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // Add any additional reset logic here if needed
  };

  //additional stuffs including map to find
  const textwidth = 500;
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: "../../home.png",
    iconSize: [38, 38], // size of the icon
  });
  const mapStyle = { height: "80vh", overflow: "hidden" };
  const center = { lat: lat, lng: lng };

  const handleAddress = (e) => {
    e.preventDefault();
    setShow(false); // Hide the map and marker before fetching new coordinates
    const formattedAddress = encodeURIComponent(address);
    const config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/search?text=${formattedAddress}&apiKey=4ada555398574a3a99558dbf92cd4ff7`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        const coordinates = response.data.features[0].geometry.coordinates;
        const newLng = coordinates[0];
        const newLat = coordinates[1];
        setLng(newLng);
        setLat(newLat);
        setShow(true); // Show the map and marker with new coordinates
        console.log(`New lng and lat is ${newLng} and ${newLat}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function DraggableMarker() {
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
            console.log(marker.getLatLng()); //final lat and long
          }
        },
      }),
      []
    );
    return (
      <Marker
        icon={customIcon}
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      ></Marker>
    );
  }
  //additional stuffs ends heree
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div style={{ marginLeft: "250px" }}>
            {/* Your form elements for Step 1 */}
            {/* <Divider aria-hidden="true" /> */}
            <Stack
              spacing={3}
              direction="column"
              sx={{
                width: "900px",
                height: "350px",
                margin: "10px",
                justifyContent: "center",
                allignitems: "center",
              }}
            >
              <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                style={{ width: textwidth }}
                // fullWidth                  // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{ width: textwidth }}
              >
                Upload a Profile Picture of your buildings
                <VisuallyHiddenInput type="file" />
              </Button>
              <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Gender"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                style={{ width: textwidth }}
                // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />
              <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Contact"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                style={{ width: textwidth }}
                // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />
            </Stack>
          </div>
        );
      case 1:
        return (
          <div style={{ marginLeft: "250px" }}>
            {/* Your form elements for Step 1 */}
            {/* <Divider aria-hidden="true" /> */}
            <Stack
              spacing={3}
              direction="column"
              sx={{
                width: "600px",
                height: "350px",
                margin: "10px",
                justifyContent: "center",
                allignitems: "center",
              }}
            >
              <Typography
                //variant="body1"
                // fontWeight="bold"
                fontFamily="Prociono"
                fontSize="20px"
                sx={{ color: "#737373" }}
              >
                Tell us where is your PG
              </Typography>
              <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Address"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                style={{ width: textwidth }}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                // fullWidth                  // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />
              <Button
                variant="contained"
                onClick={handleAddress}
                sx={{
                  backgroundColor: "#5785FD",
                  width: "100px",
                }}
              >
                Submit
              </Button>
              {show && (
                <MapContainer center={center} zoom={13} style={mapStyle}>
                  <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                  />
                  <DraggableMarker />
                </MapContainer>
              )}
            </Stack>
          </div>
        );
      case 2:
        return (
          <div>
            <Grid
              container
              sx={{
                height: "335px",
                marginLeft: "100px",
                padding: "20px",
                marginTop: "35px",
              }}
            >
              <Grid item xs={6}>
                {buildings.amenities.slice(0, 6).map((item) => (
                  <div key={item._id}>
                    <IconButton
                      aria-label={item.name.toLowerCase()}
                      onClick={() => handleItemClick(item._id)}
                      color={
                        selectedIds.includes(item._id) ? "inherit" : "#808080"
                      }
                    >
                      {getIconComponent(item.name)}
                    </IconButton>
                    {item.name}
                  </div>
                ))}
              </Grid>
              <Grid item xs={6}>
                {buildings.amenities.slice(6).map((item) => (
                  <div key={item._id}>
                    <IconButton
                      aria-label={item.name.toLowerCase()}
                      onClick={() => handleItemClick(item._id)}
                      color={
                        selectedIds.includes(item._id) ? "inherit" : "#808080"
                      }
                    >
                      {getIconComponent(item.name)}
                    </IconButton>
                    {item.name}
                  </div>
                ))}
              </Grid>
            </Grid>
          </div>
        );
      case 3:
        return (
          <div>
            {/* Your form elements for Step 4 */}
            <input type="text" placeholder="Step 4 Field" />
          </div>
        );
      case 4:
        return (
          <div>
            {/* Your form elements for Step 5 */}
            <input type="text" placeholder="Step 4 Field" />
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      {/* <Button onClick={() => setOpen(true)}>Open Modal</Button> */}
      {/* <Modal  open={open} onClose={() => setOpen(false)}> */}
      <div>
        <Box
          sx={{
            bgcolor: "background.paper",
            // boxShadow: 24,
            p: 4,
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <div>{getStepContent(activeStep)}</div>
                <div style={{ marginLeft: "450px" }}>
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ marginRight: "20px" }}
                  >
                    Back
                  </Button>
                  {/* <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button> */}
                  {/* //mine */}
                  <Button variant="contained" onClick={handleButtonClick}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  {/* //min end */}
                </div>
              </div>
            )}
          </div>
        </Box>
      </div>
      {/* </Box> */}
      {/* </Modal> */}
    </div>
  );
}

// import BuildingContext from '../../ContextApi/BuildingContext'
// import React from 'react';

// export default function BuildingForm() {

//   return (
//    <div>

//    </div>
//   )
// }
