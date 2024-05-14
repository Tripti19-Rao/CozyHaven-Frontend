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
    Divider,
    Button
  } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { isEmpty } from "lodash";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import AdminContext from "../../ContextApi/AdminContext";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


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

export default function Review() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {adminsDispatch} = useContext(AdminContext)
   
    const { admin } = useContext(AdminContext)
    const building = admin?.buildings?.find(ele => ele._id === id)
    //console.log(building)

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

       //tab start
        const [value, setValue] = useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
    //tab end

    //approve 
        const handleApprove = async (id) => {
            const token = localStorage.getItem('token')
            console.log(token)
            try{
                const response = await axios.put(`http://localhost:3055/api/buildings/set-approval/${id}`,building,{
                    headers: {
                        Authorization: token
                    }
                })
                console.log('approve',response.data)
                adminsDispatch({type: 'REMOVE_PENDING_BUILDING',payload: response.data})
                toast.success('Successfully approved the building',
                    {
                        autoClose: 1000,
                        onClose: () => {
                            navigate('/dashboard')
                        },
                        position: 'top-center',
                        hideProgressBar: true
                    }
                )
            } catch(err) {
                console.log(err)
                toast.error('Oops! something went wrong, please try after sometime',
                    {
                        autoClose: 1000,
                        position: 'top-center',
                        hideProgressBar: true
                    }
                )
            }
        }

    //disApprove
        const handleDisApprove = async (id) => {
            const token = localStorage.getItem('token')
            try{
                const response = await axios.put(`http://localhost:3055/api/buildings/change-approval/${id}`,building,{
                    headers: {
                        Authorization: token
                    }
                })
                adminsDispatch({type: 'REMOVE_PENDING_BUILDING',payload: response.data})
                console.log(response.data)
                toast.success('Successfully Rejected the building',
                    {
                        autoClose: 1000,
                        onClose: () => {
                            navigate('/dashboard')
                        },
                        position: 'top-center',
                        hideProgressBar: true
                    }
                )
            } catch(err) {
                console.log(err)
                toast.error('Oops! something went wrong, please try after sometime',
                    {
                        autoClose: 1000,
                        position: 'top-center',
                        hideProgressBar: true
                    }
                )
                //toast.error({err.message} => {})
            }
        }
    return (
        !isEmpty(building) && (
            <>
            <Grid container height="100vh">
                <ToastContainer/>
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
                </div>

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
                        height: "430px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        backgroundColor: "#fff",
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

                  <Divider/>
                  <div style={{marginTop: '20px',marginLeft:'500px'}}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={()=>{handleApprove(building._id)}}
                  >
                    Approve Building
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    style={{marginLeft: '30px'}}
                    onClick={()=>{handleDisApprove(building._id)}}
                  >
                    Reject Building
                  </Button>
                  </div>
              </CardContent>
              </Card>
              
            </Grid>
            </Grid>
            </>
        )
    )
}