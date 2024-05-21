import { useParams } from "react-router-dom";
import {
  Grid,
  Chip,
  Typography,
  Rating,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Tabs ,
  Tab,
  Box,
  Divider
} from "@mui/material";
import PropTypes from 'prop-types';
import { useContext ,useState, useEffect } from "react";
import axios from "axios"
import BuildingContext from "../../ContextApi/BuildingContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Carousel } from "react-responsive-carousel";
import {isEmpty} from 'lodash'
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";





//tab start

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

//tab end


export default function ViewBuildingForm() {
  const { id } = useParams();
  const { buildings, buildingsDispatch} = useContext(BuildingContext);

  const building = buildings?.data?.find((ele) => ele._id === id);
  console.log(building);

//tab start
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//tab end


  const customIcon = new Icon({
    iconUrl: "../../home.png",
    iconSize: [38, 38],
  });

  const genderImg = (gender) => {
    console.log(gender.charAt(0).toUpperCase() + gender.slice(1));
    if (gender === "female") {
      return "https://cdn-icons-png.flaticon.com/128/657/657051.png";
    } else if (gender === "male") {
      return "https://cdn-icons-png.flaticon.com/128/657/657052.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/128/20/20373.png";
    }
  };

  useEffect(() => {
    (async () => {
      try {
          const checkResponse = await axios.get(
            `http://localhost:3055/api/${id}/reviews`,
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          );
          console.log("Reviews", checkResponse.data);
          buildingsDispatch({type:'SET_REVIEWS', payload:checkResponse.data})
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    !isEmpty(building) && (<div>
      <Grid container height="100vh">
        <Grid
          item
          xs={4}
          sx={{
            position: "fixed",
            backgroundColor: "#6698E1",
            //backgroundColor: '#EAF5FD',
            height: "100vh",
            width: "500px",
            zIndex: 1, // Ensure it's above other content
            alignItems: "center",
          }}
        >
          <Typography
            fontFamily="Roboto"
            fontWeight="bold"
            fontSize="25px"
            mt={15}
            ml={14}
            mb={3}
            sx={{ color: "white" }}
          >
            Building Location
          </Typography>
          <Paper
            elevation={12}
            style={{
              overflow: "hidden",
              width: "400px",
              height: "450px",
              marginLeft: "50px",
              borderRadius: "10px",
            }}
          >
            <MapContainer
              center={[building.geolocation.lat, building.geolocation.lng]}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" //leafletjs.com -- copy the url
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
              />

              <Marker
                position={[building.geolocation.lat, building.geolocation.lng]}
                icon={customIcon}
              >
                <Popup>{building.name}</Popup>
              </Marker>
            </MapContainer>
          </Paper>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "60px",
            paddingTop: "100px",
            marginLeft: "35%",
          }}
        >
          <Grid container>
            <Grid item xs={9}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  fontSize="30px"
                  fontFamily="Roboto"
                  fontWeight="bold"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {building.name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <Chip
                label={
                  building.gender.charAt(0).toUpperCase() +
                  building.gender.slice(1)
                }
                avatar={<img src={genderImg(building.gender)} alt="" />}
                sx={{
                  backgroundColor: "#EAF5FD",
                  marginLeft: "60px",
                  marginTop: "10px",
                }}
              />
            </Grid>
          </Grid>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="read-only"
              value={+building.rating}
              precision={0.5}
              readOnly
            />
            <Typography
              fontSize={15}
              fontWeight="bold"
              style={{ marginLeft: "8px" }}
            >
              {building.rating}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "590px",
              }}
            >
    
            </div>
          </div>
          <Card sx={{ maxWidth: 850, maxHeight:'auto', marginTop: 1, marginBottom: 2 }}>
            <CardMedia
              component="img"
              alt="Building image"
              height="430"
              src={building.profilePic}
            />
            <CardContent>
            
              <Typography mb={1} color="text.secondary">
                {building.address}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px",
                  color: "#178feb",
                }}
              >
                <PhoneIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: "#178feb",
                    marginRight: "10px",
                  }}
                />
                {building.contact}
              </Typography>
              
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                {" "}
                Deposit :
                <CurrencyRupeeIcon sx={{ width: "16px", height: "16px" }} />
                {building.deposit}/-
              </Typography>

              <div style={{display:'flex'}}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "20px",
                }}
              >
                {" "}
                Amenities :
                </Typography>

                {building.amenities.map((id) => {
                  const matchingAmenity = buildings.amenities.find(
                    (element) => element._id === id
                  );
                  if (matchingAmenity) {
                    return (
                      <img
                        key={matchingAmenity._id}
                        src={matchingAmenity.iconName}
                        alt={matchingAmenity.name}
                        style={{
                          height: "30px",
                          width: "30px",
                          paddingLeft: "15px",
                          filter:
                            "invert(29%) sepia(72%) saturate(5023%) hue-rotate(203deg) brightness(95%) contrast(95%)",
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </div>
              

              
        <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Amenties Pictures" {...a11yProps(0)} />
                  <Tab label="Rules" {...a11yProps(1)} />
                  <Tab label="License" {...a11yProps(2)} />
                  <Tab label="Reviews" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
              <Box
                style={{
                  width: "90vh",
                  height: "430px",
                  marginLeft: "50px",
                  // marginBottom: "30px",
                }}
              >
                <Carousel showThumbs={false} infiniteLoop >
                  {building.amenitiesPic.map((pic, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={pic}
                          alt={`amenities ${index}`}
                          style={{
                            width: "800px",
                            height: "430px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </Box>

              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
              <div
                    dangerouslySetInnerHTML={{ __html: building.rules }}
                    style={{
                      height:'430px',
                      border: "1px solid #ccc",
                      padding: "10px",
                      backgroundColor: "#fff",
                      overflowY: "auto",
                        paddingRight: "20px", // Add padding to accommodate scrollbar width
                        //scrollbarWidth: "none", // Hide scrollbar for Firefox
                        //msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                        // "&::WebkitScrollbar": {
                        //   display: "none", // Hide scrollbar for Chrome/Safari/Opera
                        // },
                    }}
                  />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2} >
              <Box
                  component="img"
                  style={{
                    height: "430px",
                    width: "90vh",
                    borderRadius: "5px",
                    marginLeft:"50px",
                    objectFit: "contain", 
                  }}
                  src={building.license}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                    <Box
                      style={{
                        width: "100vh",
                        height: "430px",
                        marginLeft: "40px",
                        overflowY: "auto",
                        paddingRight: "20px", // Add padding to accommodate scrollbar width
                        scrollbarWidth: "none", // Hide scrollbar for Firefox
                        msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                        "&::WebkitScrollbar": {
                          display: "none", // Hide scrollbar for Chrome/Safari/Opera
                        },
                        // marginBottom: "30px",
                      }}
                    >
                      <Grid container mb={1}>
                        <Grid item xs={6}>
                          <Typography
                            fontWeight="bold"
                            fontSize="30px"
                            mt={2}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            {building.rating}/5
                            <StarIcon
                              sx={{
                                fontSize: "30px",
                                marginLeft: "5px",
                                verticalAlign: "middle",
                                color: "#faaf00",
                              }}
                            />
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {/* {role === "finder" && check && (
                            <Button
                              variant="contained"
                              sx={{ float: "right" }}
                              onClick={handleReviewOpen}
                            >
                              Add Review
                            </Button>
                          )} */}
                        </Grid>
                      </Grid>
                      <Divider mb={1} />

            
                        {buildings?.reviews?.length>0 ? (<div>
                        {buildings?.reviews.map((ele) => (
                        <div>
                          <Typography
                            fontWeight="bold"
                            mt={2}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Box
                              component="img"
                              style={{
                                display: "block",
                                height: "45px",
                                width: "45px",
                                marginRight: "15px",
                                borderRadius: "50%",
                                objectFit: "fill",
                              }}
                              src={ele.profile}
                              alt="Image"
                            />
                            {ele.name}
                          </Typography>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Rating
                              name="read-only"
                              value={ele.stars}
                              precision={0.5}
                              readOnly
                            />
                            <Typography
                              mt={2}
                              mb={2}
                              ml={2}
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              {moment(ele.createdAt).format("DD-MM-YYYY")}
                            </Typography>
                          </div>

                          <Typography
                            mt={2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            {ele.description}
                          </Typography>
                          <Divider />
                        </div>
                      ))}
                        </div>):(<div>
                          <Typography
                            fontWeight="bold"
                            fontSize={40}
                            mt={20}
                            ml={25}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            No Reviews Yet!
                          </Typography>
                        </div>)}
                     
                    </Box>
                  </CustomTabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>)
  );
}
