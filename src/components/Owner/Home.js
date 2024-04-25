import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import BuildingForm from "./BuildingForm";
import EditBuildingForm from "./EditBuildingForm";
//import Rooms from "./Rooms"
import {
  Box,
  Typography,
  Button,
  Modal,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";

import BuildingContext from "../../ContextApi/BuildingContext";

export default function Home() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("Accepted");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const handleEditOpen = (id) => {
    setEditOpen(true);
    setEditId(id);
  };
  const handleEditClose = () => setEditOpen(false);
  const { buildings } = useContext(BuildingContext);
  console.log(buildings);

  const filteredBuildings = buildings?.data?.filter(
    (ele) => ele.isApproved === select
  );
  const handleView = (id) => {
    navigate(`/view-building/${id}`);
  };

  const handleRooms = (id) => {
    navigate(`/view-rooms/${id}`);
  };

  const handleGuest = (id) => {
    navigate(`/manage-guest/${id}`);
  };

  const renderContent = () => {
    if (select === "Accepted" && filteredBuildings?.length > 0) {
      return "Your Current buildings are";
    }
    if (select === "Pending" && filteredBuildings?.length > 0) {
      return "Your Pending buildings are";
    }
    if (select === "Rejected" && filteredBuildings?.length > 0) {
      return "Your Rejected buildings are";
    }
  };

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

  return (
    <div>
      {/* new change start */}

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container sx={{ width: "900px" }}>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold" fontSize="25px">
              {renderContent()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FormControl variant="outlined" sx={{ marginRight: "10px" }}>
              <InputLabel id="approved-label">Select</InputLabel>
              <Select
                labelId="approved-label"
                id="select"
                name="select"
                value={select}
                label="select"
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelect(e.target.value);
                }}
                sx={{ width: "200px" }}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Accepted"}>Approved</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      {filteredBuildings && filteredBuildings.length > 0 ? (
        filteredBuildings.map((ele) => {
          return (
            <Box
              key={ele._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                marginTop: "20px",
                marginBottom: "40px",
              }}
            >
              <Card
                sx={{ width: "900px", height: "auto", marginLeft: "300px" }}
              >
                <CardMedia
                  sx={{ height: "200px" }}
                  image={ele.profilePic}
                  title="View building"
                  onClick={() => {
                    handleView(ele._id);
                  }}
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          "&:hover": {
                            textDecoration: "underline",
                            color: "#5785FD",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          handleView(ele._id);
                        }}
                      >
                        {ele.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ele.address}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Chip
                        label={
                          ele.gender.charAt(0).toUpperCase() +
                          ele.gender.slice(1)
                        }
                        avatar={<img src={genderImg(ele.gender)} alt="" />}
                        sx={{
                          backgroundColor: "#EAF5FD",
                          marginLeft: "60px",
                          marginTop: "15px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                {ele.isApproved === "Accepted" && (
                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      marginBottom:"10px"
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<ListAltOutlinedIcon />}
                      onClick={() => {
                        handleGuest(ele._id);
                      }}
                    >
                      Manage
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleEditOpen(ele._id);
                      }}
                      startIcon={<ModeEditOutlineOutlinedIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleRooms(ele._id);
                      }}
                      startIcon={<BedroomChildOutlinedIcon />}
                    >
                      Rooms
                    </Button>{" "}
                  </CardActions>
                )}
              </Card>
            </Box>
          );
        })
      ) : (
        <div>
          <Box
            sx={{
              marginTop: "10px",
              marginLeft: "350px",
              //display: "flex",
              justifyContent: "center",
              bgcolor: "background.paper",
              border: "2px ",
              //boxShadow: 24,
              p: 4,
              width: "800px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Box
              component="img"
              style={{
                display: "block",
                margin: "auto",
                height: "300px",
                width: "300px",
                maxWidth: "100%",
                borderRadius: "50%",
                objectFit: "fill",
              }}
              src="/NoBuildingsData.jpg"
              alt="Image"
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              textAlign="center"
              fontSize="20px"
              //margin="50px"
            >
              {select === "Accepted"
                ? `You dont have any ${select} buildings add one now!`
                : `You dont have any ${select} buildings`}
            </Typography>
          </Box>
        </div>
      )}

      {/* new change end */}

      {/* Adding pg */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<AddSharpIcon />}
        >
          Add new PG
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              marginTop: "50px",
              marginLeft: "200px",
              bgcolor: "background.paper",
              border: "2px ",
              boxShadow: 24,
              p: 4,
              width: "70%",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              ADD YOUR PG DETAILS
            </Typography>
            <BuildingForm handleClose={handleClose} />
          </Box>
        </Modal>
      </Box>

      {/* EDIT FORM */}
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginTop: "50px",
            marginLeft: "200px",
            bgcolor: "background.paper",
            border: "2px ",
            boxShadow: 24,
            p: 4,
            width: "70%",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            EDIT YOUR PG DETAILS
          </Typography>
          <EditBuildingForm
            editId={editId}
            buildings={buildings}
            handleEditClose={handleEditClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
