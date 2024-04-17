import { useParams } from "react-router-dom";
import { useContext } from "react";
import BuildingContext from "../../ContextApi/BuildingContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import {
  Box,
  Typography,
  Stack,
  Grid,
  //   Paper, Button,
  // Button,
  // Modal,
  // Card,
  // CardActions,
  // CardContent,
  // CardMedia,
} from "@mui/material";

export default function ViewBuildingForm() {
  const { id } = useParams();
  const { buildings } = useContext(BuildingContext);

  const building = buildings.data.filter((ele) => ele._id === id);
  console.log(building);

  return (
    <div
      style={{
        backgroundImage: "url(/background-1.jpg)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "rgba(102, 152, 225, 0.1 )",
      }}
    >
      {building.map((ele) => {
        return (
          <>
            <Box
              marginTop={3}
              justifyContent="center"
              alignItems="center"
              marginLeft="auto"
              marginRight="auto"
              maxWidth={950}
              style={{ border: "1px solid transparent" }}
              // padding={5}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                textAlign="center"
                fontSize="35px"
                marginTop="65px"
                marginBottom="30px"
                paddingTop="30px"
              >
                {ele.name}
              </Typography>
              <Grid
                container
                sx={{
                  width: 800,
                  margin: "0 auto",
                 }}
              >
                <Grid item xs={6}>
                  <Box
                    component="img"
                    sx={{
                      height: "400px",
                      width: "400px",
                      display: "block",
                      borderRadius: "5px",
                    }}
                    alt="Profile Picture"
                    src={ele.profilePic}
                  />
                </Grid>
                <Grid item xs={6} sx={{paddingLeft:"15px", border:'1px,solid'}}>
                  <Stack spacing={2} marginBottom={2}>
                    <Typography variant="body1" fontSize="20px">
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Gender
                      </span>
                      : {ele.gender}
                    </Typography>

                    <Typography variant="body1" fontSize="20px">
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Address
                      </span>
                      : {ele.address}
                    </Typography>
                    <Typography variant="body1" fontSize="20px">
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Contact
                      </span>
                      : {ele.contact}
                    </Typography>
                    <Typography variant="body1" fontSize="20px">
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Deposit
                      </span>
                      : {ele.deposit}
                    </Typography>
                  </Stack>

                  <Typography variant="body1" fontSize="20px" fontWeight="bold">
                    Amenities :
                  </Typography>
                  <Box width="500px">
                    {ele.amenities.map((id) => {
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
                              height: "35px",
                              width: "35px",
                              paddingLeft: "40px",
                              marginTop: "15px",
                            }}
                          />
                        );
                      }
                      return null;
                    })}
                  </Box>
                </Grid>
              </Grid>

              <Typography
                variant="body1"
                fontSize="25px"
                margin="20px"
                fontWeight="bold"
                textAlign="center"
              >
                Amenities Pictures :
              </Typography>

              <Box
                style={{
                  width: "800px",
                  height: "500px",
                  marginLeft: "100px",
                  marginBottom: "30px",
                }}
              >
                <Carousel showThumbs={false} infiniteLoop >
                  {ele.amenitiesPic.map((pic, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={pic}
                          alt={`amenities ${index}`}
                          style={{
                            width: "800px",
                            height: "500px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </Box>

              <Box
                style={{
                  width: "800px",
                  marginLeft: "100px",
                  marginBottom: "30px",
                }}
              >
                <Typography variant="body1" fontSize="20px">
                  Rules :
                  <div
                    dangerouslySetInnerHTML={{ __html: ele.rules }}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      backgroundColor: "#fff",
                    }}
                  />
                </Typography>
              </Box>

              <Box
                style={{
                  width: "800px",
                  height: "500px",
                  marginLeft: "100px",
                  marginBottom: "30px",
                }}
              >
                <Typography variant="body1" fontSize="20px">
                  License Pictures :
                </Typography>
                <Box
                  component="img"
                  style={{
                    height: "400px",
                    width: "800px",
                    borderRadius: "5px",
                  }}
                  src={ele.license}
                />
              </Box>
            </Box>
          </>
        );
      })}
    </div>
  );
}
