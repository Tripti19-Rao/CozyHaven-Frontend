import { useEffect, useContext ,useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
// import HomeDisplay from "./HomeDisplay";
import BuildingForm from "./BuildingForm";
import {
  // Grid,
  Box,
  Typography,
  // FormControl,
  // TextField,
  Button,
  // Stack,
  // Alert,
  // Divider,
  Modal,
  Card, CardActions, CardContent, CardMedia
} from "@mui/material";

import BuildingContext from "../../ContextApi/BuildingContext";

export default function Home() {
  const navigate = useNavigate();
  //  const [open, setOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { buildings, buildingsDispatch } = useContext(BuildingContext);
  // const handleForm = ()=>{
  //   setOpen(!open)
  // }
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token && typeof token === "string") {
        const { id } = jwtDecode(token);
        const response = await axios.get(
          `http://localhost:3055/api/buildings/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        buildingsDispatch({ type: "SET_BUILDINGS", payload: response.data });
        const amenities = await axios.get('http://localhost:3055/api/amenities',{
          headers:{
            Authorization: token,
          }
        })
        buildingsDispatch({ type:"SET_AMENITIES",payload:amenities.data})
      } else {
        navigate("/notfound");
      }
    })();
      // eslint-disable-next-line 
  }, [navigate]);
  return (
    <div>
      {/* <h1>Buildings - {buildings.data.length}</h1> */}
      {buildings.data.length === 0 ? (
        <div>
          
          <Typography
            variant="body1"
            fontWeight="bold"
            fontFamily="Prociono"
            textAlign="center"
            fontSize="30px"
            margin="50px"
          >Oops you dont have a buildings yet... Create one now! </Typography>
        </div>
      ) : (
        <div>{buildings.data.map((ele)=>{
          return(
            <Box 
            key={ele._id}
            sx={{display:'flex',
            flexDirection:'column',
            alignItem:'center',
            marginTop: '20px',
            marginBottom:'20px'
                        }}>
            <Card sx={{ maxWidth: 700, maxHeight:300, marginLeft:50 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/sign.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {ele.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ele.contact}
        </Typography>
      </CardContent>
      <CardActions  sx={{
        justifyContent: 'flex-end',
      }}>
      <Button variant="outlined" startIcon={<ListAltOutlinedIcon />}>
  Manage
</Button><Button variant="outlined" startIcon={<ModeEditOutlineOutlinedIcon />}>
  Edit
</Button><Button variant="outlined" startIcon={<BedroomChildOutlinedIcon />}>
  Add Room
</Button>      
      </CardActions>
    </Card>
    </Box>
          )
        })}</div>
      )}

<Box display="flex" justifyContent="center">
<Button variant="outlined" onClick={handleOpen} startIcon={<AddSharpIcon/>}>Add new PG</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={{
          marginTop:'50px',
          marginLeft:'200px',
            bgcolor: 'background.paper',
            border: '2px ',
            boxShadow:24,
            p: 4,
            width:"70%",
            }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <BuildingForm/>
        </Box>
      </Modal>
    </Box>
    {/* {
      open && (<BuildingForm />)
    }  */}
     </div>
  );
}
