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
} from "@mui/material";

import BuildingContext from "../../ContextApi/BuildingContext";

export default function Home() {
  const navigate = useNavigate();
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

  const handleView = (id) => {
    navigate(`/view-building/${id}`);
  };

  const handleRooms = (id) =>{
    navigate(`/view-rooms/${id}`)
  }


  return (
    <div
      style={{
        backgroundImage: "url(/home1.png)",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        // backgroundPosition: "bottom left",
        minHeight: "100vh", 
            backgroundRepeat: "no-repeat", // Prevent the background image from repeating
        // opacity: 0.1
        // backgroundColor: rgba(255, 255, 255, 0.5)
              }}
    >
      {buildings.data.length === 0 ? (
        <div>
          <Typography
            variant="body1"
            fontWeight="bold"
            fontFamily="Prociono"
            textAlign="center"
            fontSize="30px"
            margin="50px"
          >
            Oops you dont have a buildings yet... Create one now!{" "}
          </Typography>
        </div>
      ) : (
        <div style={{ marginTop: "70px" }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            textAlign="center"
            fontSize="30px"
            // margin="50px"
          >
           Your current buildings
          </Typography>
          {buildings.data
            .filter((element) => {
              return element.isApproved === "Accepted";
            })
            .map((ele) => {
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
                  <Card sx={{ maxWidth: 600, maxHeight: 300, marginLeft: 60 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={ele.profilePic}
                      title="View building"
                      onClick={() => {
                        handleView(ele._id);
                      }}
                    />
                    <CardContent>
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
                        {ele.contact}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<ListAltOutlinedIcon />}
                      >
                        Manage
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleEditOpen(ele._id);
                        }}
                        startIcon={<ModeEditOutlineOutlinedIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={()=>{handleRooms(ele._id)}}
                        startIcon={<BedroomChildOutlinedIcon />}
                      >
                        Rooms
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
        </div>
      )}

      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
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
          <EditBuildingForm editId={editId} buildings={buildings} handleEditClose={handleEditClose} />
        </Box>
      </Modal>
    </div>
  );
}
