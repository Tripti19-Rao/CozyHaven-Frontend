import { useParams } from "react-router-dom";
import BuildingContext from "../../ContextApi/BuildingContext";
import { useState ,useContext } from "react";
import {Typography,Box,Button,Modal} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";


export default function Rooms() {
    const { buildings } = useContext(BuildingContext);
    const { id } = useParams();
    const building = buildings.data.filter((ele)=>ele._id===id)
    const {rooms} = building[0]
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
        {
           rooms.length===0 ? (
            <Typography
            variant="body1"
            fontWeight="bold"
            fontFamily="Prociono"
            textAlign="center"
            fontSize="30px"
            margin="50px"
            marginTop="80px"
          >
            Oops you dont have a buildings yet... Create one now!{" "}
          </Typography>
           ):(null)}
           <Box display="flex" justifyContent="center">
           <Button
             variant="outlined"
             onClick={handleOpen}
             startIcon={<AddSharpIcon />}
           >
             Add new PG
           </Button>
           </Box>


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
            {/* <BuildingForm handleClose={handleClose} /> */}
          </Box>
        </Modal>
        
    </div>
  )
}

