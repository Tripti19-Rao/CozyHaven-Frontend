import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Rating,
  Button,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../../ContextApi/searchContext";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import { ImageContainer, RoundedImage, Overlay, Info } from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import FinderContext from "../../ContextApi/FinderContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { startBookingRoom } from "../../Actions/BookingActions";
import { isEmpty } from "lodash";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import AddReview from "./AddReview";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//tab end

export default function ShowBuilding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, searchDispatch } = useContext(SearchContext);
  const { finder, findersDispatch } = useContext(FinderContext);
  const [isClicked, setIsClicked] = useState(false);
  const [check, setCheck] = useState(false);

  const [reviewOpen, setsetReviewOpen] = useState(false);
  const handleReviewOpen = () => {
    setsetReviewOpen(true);
  };
  const handleReviewClose = () => {
    setsetReviewOpen(false);
  };

  const token = localStorage.getItem("token");
  const { role } = jwtDecode(token);
  const building = searchResults?.building;
  console.log("outside", isEmpty(building));

  //to render buildings
  useEffect(() => {
    (async function () {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3055/api/buildings/one/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        //console.log(response.data)
        searchDispatch({ type: "SET_BUILDING", payload: response.data });
        localStorage.setItem("building", JSON.stringify(response.data));
        const reviews = await axios.get(
          `http://localhost:3055/api/${id}/reviews`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        searchDispatch({ type: "SET_REVIEWS", payload: reviews.data });
      } catch (err) {
        console.log(err);
      }
    })();
    console.log("building", building._id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (finder?.data?._id) {
          const finderid = finder?.data?._id;
          const checkResponse = await axios.get(
            `http://localhost:3055/api/${id}/member/${finderid}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(checkResponse.data);
          if (!isEmpty(checkResponse.data)) {
            setCheck(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, [finder?.data?._id]);

  // console.log("reviews are",searchResults.reviews)

  //tab start
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //tab end

  const genderImg = (gender) => {
    //console.log(gender.charAt(0).toUpperCase() + gender.slice(1));
    if (gender === "female") {
      return "https://cdn-icons-png.flaticon.com/128/657/657051.png";
    } else if (gender === "male") {
      return "https://cdn-icons-png.flaticon.com/128/657/657052.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/128/20/20373.png";
    }
  };

  useEffect(() => {
    if (!isEmpty(finder.data)) {
      const wishList = finder.data.wishList;
      console.log("wishList", wishList, id);
      if (wishList?.includes(id)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
    // eslint-disable-next-line
  }, [finder.data]);

  const handleClick = async () => {
    console.log("handleClick");
    const body = { ...finder.data };
    let newClickStatus = null;
    const isBuildingId = body.wishList.find((bId) => bId === building._id);
    if (isBuildingId) {
      body.wishList = body.wishList.filter((bId) => bId !== isBuildingId);
      newClickStatus = false;
    } else {
      body.wishList = [...body.wishList, building._id];
      newClickStatus = true;
    }
    console.log("wishList", building._id);
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3055/api/finders`,
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    //localStorage.setItem("finderData", JSON.stringify(response.data));
    findersDispatch({ type: "SET_FINDER", payload: response.data });
    console.log("res", response.data);

    setIsClicked(newClickStatus);

    toast.info(
      newClickStatus
        ? "Building added to your wishlist"
        : "Building removed from wishlist",
      {
        autoClose: 1000,
        position: "top-center",
        theme: "dark",
        hideProgressBar: true,
        //transition: 'Zoom'
      }
    );
  };

  const customIcon = new Icon({
    iconUrl: "../../home.png",
    iconSize: [38, 38],
  });

  const handleBooking = (roomid) => {
    const data = {
      buildingId: id,
      roomId: roomid,
    };
    dispatch(startBookingRoom(data, navigate));
  };
  console.log(searchResults.reviews);

  return (
    <>
      <Grid container height="100vh">
        {!isEmpty(building) && (
          <>
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
                //mt={10}
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
                    position={[
                      building.geolocation.lat,
                      building.geolocation.lng,
                    ]}
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
                marginLeft: "35%", // Adjust this value based on the width of the fixed item
                //backgroundColor: '#EAF5FD'
              }}
            >
              <ToastContainer />
              <Grid container>
                <Grid item xs={10}>
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
                        //color: '#6698E1'
                        //color: 'blue'
                      }}
                    >
                      {building.name}
                    </Typography>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={
                          building.gender.charAt(0).toUpperCase() +
                          building.gender.slice(1)
                        }
                        avatar={
                          <img src={genderImg(building?.gender)} alt="" />
                        }
                        sx={{ backgroundColor: "#EAF5FD", marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip
                      title={
                        isClicked ? "remove from wishlist" : "add to wishlist"
                      }
                    >
                      <IconButton
                        sx={{ padding: "0px" }}
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        {isClicked ? (
                          <FcLike
                            style={{ fontSize: "35px", color: "white" }}
                          />
                        ) : (
                          <CiHeart style={{ fontSize: "35px" }} />
                        )}{" "}
                      </IconButton>
                    </Tooltip>
                  </div>
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
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "30px",
                      color: "#6698E1",
                    }}
                  >
                    <PhoneIcon
                      sx={{ width: "20px", height: "20px", color: "#6698E1" }}
                    />
                    {building.contact}
                  </Typography>
                </div>
              </div>

              {/* change start */}
              {/* <img
          src={building.profilePic}
          alt="Building"
          width="850"
          height="430"
          style={{
            borderRadius: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          fontWeight="bold"
          className="blue"
        >
          Address
        </Typography>
        <Typography variant="p">{building.address}</Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          fontWeight="bold"
          className="blue"
        >
          Deposit
        </Typography>
        <Typography
          sx={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}
        >
          <CurrencyRupeeIcon sx={{ width: "20px", height: "20px" }} />
          {building.deposit}/-
        </Typography>
        <Link>Click to view more details</Link> */}

              <Card
                sx={{
                  maxWidth: 850,
                  maxHeight: "auto",
                  marginTop: 1,
                  marginBottom: 2,
                }}
              >
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
                    }}
                  >
                    {" "}
                    Deposit :
                    <CurrencyRupeeIcon sx={{ width: "16px", height: "16px" }} />
                    {building.deposit}/-
                  </Typography>

                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "20px",
                    }}
                  >
                    {" "}
                    Amenities :
                    {building.amenities.map((pic) => {
                      return (
                        <img
                          key={pic._id}
                          src={pic.iconName}
                          alt={pic.name}
                          style={{
                            height: "30px",
                            width: "30px",
                            paddingLeft: "15px",
                            filter:
                              "invert(29%) sepia(72%) saturate(5023%) hue-rotate(203deg) brightness(95%) contrast(95%)",
                          }}
                        />
                      );
                    })}
                  </Typography>

                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                      <Carousel showThumbs={false} infiniteLoop>
                        {building.amenitiesPic.map((pic, index) => {
                          return (
                            <div key={index}>
                              <img
                                src={pic}
                                alt={`Amenity ${index}`}
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
                        height: "430px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        backgroundColor: "#fff",
                        overflowY: "auto",
                        paddingRight: "20px",
                      }}
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <Box
                      component="img"
                      style={{
                        height: "430px",
                        width: "90vh",
                        borderRadius: "5px",
                        marginLeft: "50px",
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
                          {role === "finder" && check && (
                            <Button
                              variant="contained"
                              sx={{ float: "right" }}
                              onClick={handleReviewOpen}
                            >
                              Add Review
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                      <Divider mb={1} />

                      {/* <Typography
                          fontFamily="Roboto"
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
                              verticalAlign: "middle", // Aligns the icon vertically in the middle
                            }}
                          />
                        </Typography> */}
                        {searchResults.reviews.length>0 ? (<div>
                        {searchResults.reviews.map((ele) => (
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

              {/* change ends */}

              {/* <div style={{display: 'flex'}}> */}
              <Typography
                fontFamily="Roboto"
                fontWeight="bold"
                fontSize="30px"
                mt={5}
              >
                Available Rooms
              </Typography>
              <Typography variant="p" color="text.secondary" pb={1} mb={4}>
                * Disclaimer: Please contact building owner before booking the
                room *
              </Typography>

              {building.rooms.map((ele) => {
                return (
                  <div
                    key={ele._id}
                    style={{
                      width: "850px",
                      height: "430px",
                      marginBottom: "20px",
                    }}
                  >
                    <Carousel
                      showThumbs={false} // Hide thumbnail images
                      showStatus={false} // Hide status indicators
                      infiniteLoop // Enable infinite loop
                    >
                      {ele.roomid.pic.map((pic, i) => {
                        return (
                          <ImageContainer key={i}>
                            <RoundedImage
                              src={pic}
                              alt={`Room Image ${i + 1}`}
                            />
                            <Overlay>
                              <Info>
                                {/* <p>Amount: $100</p>
                                        <p>Sharing: Public</p> */}
                                <Typography
                                  fontFamily="Roboto"
                                  fontWeight="bold"
                                  fontSize="18px"
                                  ml="10px"
                                  mr="20px"
                                >
                                  {ele.roomid.sharing} - Sharing
                                </Typography>
                                <Typography
                                  fontFamily="Roboto"
                                  fontWeight="bold"
                                  fontSize="18px"

                                  //sx={{paddingLeft: '20px'}}
                                >
                                  Available Beds -{" "}
                                  {ele.roomid.sharing - ele.roomid.guest.length}
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    pr: 2,
                                    marginLeft: "440px",
                                  }}
                                >
                                  <Typography
                                    fontFamily="Roboto"
                                    fontWeight="bold"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      paddingBottom: "5px",
                                    }}
                                  >
                                    <CurrencyRupeeIcon
                                      sx={{ width: "20px", height: "20px" }}
                                    />
                                    {ele.roomid.amount} /mo*
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      color: "white",
                                      marginBottom: "15px",
                                    }}
                                    disabled={
                                      ele.roomid.sharing -
                                        ele.roomid.guest.length ===
                                      0
                                    }
                                    onClick={() => {
                                      handleBooking(ele.roomid._id);
                                    }}
                                  >
                                    Book Now
                                  </Button>
                                </div>
                              </Info>
                            </Overlay>
                          </ImageContainer>
                        );
                      })}
                    </Carousel>
                  </div>
                );
              })}

              {/* </div> */}
            </Grid>
          </>
        )}
      </Grid>
      <Modal
        open={reviewOpen}
        onClose={handleReviewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginTop: "150px",
            marginLeft: "450px",
            bgcolor: "background.paper",
            border: "2px ",
            boxShadow: 24,
            p: 4,
            width: "40%",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
            sx={{ textAlign: "center" }}
          >
            ADD YOUR REVIEW
          </Typography>
          <AddReview
            buildingid={id}
            finderid={finder?.data?._id}
            handleReviewClose={handleReviewClose}
            reviewOpen={reviewOpen}
          />
        </Box>
      </Modal>
    </>
  );
}
