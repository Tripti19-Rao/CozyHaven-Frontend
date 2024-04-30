import { useParams } from "react-router-dom";
import BuildingContext from "../../ContextApi/BuildingContext";
import { useState ,useContext, useEffect } from "react";
import {Typography,Box,Button,Modal, Stack, Grid} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RoomForm from "./RoomForm";
import ViewRoom from "./ViewRoom";
import RoomContext from "../../ContextApi/RoomContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import { ImageContainer,RoundedImage,Overlay,Info } from "../Finder/styles";
import Swal from 'sweetalert2'
import EditRoomForm from "./EditRoomForm";
//import {jwtDecode} from 'jwt-decode'

export default function Rooms() {
    const { buildings } = useContext(BuildingContext);
    const {rooms, roomsDispatch} = useContext(RoomContext)
    const [roomId, setRoomId] = useState(null)
    //const [editId, setEditId] = useState(null)
    
    const [open, setOpen] = useState(false);
    const [viewRoomOpen, setViewRoomOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    const { id } = useParams();

    const building = buildings?.data?.find((ele) => ele._id === id)
    console.log(buildings.data, building)
    
    const handleOpen = () => setOpen(true); 
    const handleViewRoomOpen = (id) => {
      setViewRoomOpen(true)
      setRoomId(id)
    }

    const handleEditOpen = (id) => {
      setEditOpen(true)
      setRoomId(id)
    }

    const handleClose = () => setOpen(false);
    const handleViewRommClose = () => setViewRoomOpen(false)
    const handleEditClose = () => setEditOpen(false)

    useEffect(()=>{
      (async function(){
        // if(id) {
          try {
            const token = localStorage.getItem('token') 
            const response = await axios.get(`http://localhost:3055/api/${id}/rooms`,{
              headers: {
                Authorization: token
              }
            })
            //console.log(response.data)
            roomsDispatch({type:'SET_ROOMS',payload: response.data})
            
          } catch(err) {
            console.log(err)
            toast.error(err.message, {
              autoClose: 1000,
              position: 'top-center'
            })
          }
        //}
      })();
      // eslint-disable-next-line
    },[])

    const handleDelete = async (rid) => {
      const token = localStorage.getItem('token')
      //const {id} = jwtDecode(token)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(`http://localhost:3055/api/${building._id}/rooms/${rid}`,{
                headers: {
                  Authorization: token
                }
              })
              
              //console.log('id',id,'buid',building._id,'roomid',rid,'response',response.data)
              roomsDispatch({type: 'DELETE_ROOM', payload: response.data._id})
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            } catch(err) {
              console.log(err)
              Swal.fire({
                title: 'Error',
                text: `${err.message}`,
                icon: 'error'
              })
            }
            
          }// else if (
        //     /* Read more about handling dismissals below */
        //     result.dismiss === Swal.DismissReason.cancel
        //   ) {
        //     swalWithBootstrapButtons.fire({
        //       title: "Cancelled",
        //       text: "Your imaginary file is safe :)",
        //       icon: "error"
        //     });
        //   }
        // });
        });
      
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
           rooms?.data?.length===0 ? (
            <>
            <Box
              component="img"
              style={{
                display: "block",
                //margin: "auto",
                marginTop:"80px",
                height: "400px",
                width: "400px",
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
            fontFamily="Prociono"
            textAlign="center"
            fontSize="30px"
            //margin="50px"
            //marginTop="80px"
          >
            Oops you dont have any rooms yet... Create one now!{" "}
          </Typography>
          <Button
          style={{marginLeft: '30px',marginTop: '30px'}}
          variant="outlined"
          onClick={handleOpen}
          startIcon={<AddSharpIcon />}
        >
          Add new Room
        </Button>
        </>
           ):(
            <>
            
            <ToastContainer/>
            <Grid 
              container 
              style={{
                marginTop:"80px",
                //marginLeft: "690px",
                marginBottom: '25px',
                width: '55%'
              }}
            >
              <Grid item xs={9}>
              <Typography
                variant="body1"
                fontWeight="bold"
                fontFamily="Roboto"
                //textAlign="center"
                fontSize="25px"
                //margin="50px"
                
              >
                You have {rooms?.data?.length} rooms
              </Typography>
              </Grid>
              <Grid item xs={3}>
              <Button
                  style={{marginLeft: '30px'}}
                  variant="outlined"
                  onClick={handleOpen}
                  startIcon={<AddSharpIcon />}
                >
                  Add new Room
                </Button>
              </Grid>
            </Grid>
            
            
           
           
          <>
            {rooms?.data?.map(ele => {
              return (
                <div 
                  key={ele._id}
                  style={{
                    width: '850px',
                    height: '430px',
                    marginBottom: '20px',
                    // overflow: 'hidden',
                    // //transition: 'box-shadow 0.3s ease',
                    // boxShadow: 'none',
                    borderRadius: '10px'
                  }}
                    // onMouseOver={(e) => e.target.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.9)'}
                    // onMouseOut={(e) => e.target.style.boxShadow = 'none'}
                  >
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                  >
                    {ele.pic.map((pic,i) => {
                      return (
                        <ImageContainer key={i}>
                          <RoundedImage src={pic} alt={`Room Image ${i + 1 }`}/>
                          <Overlay>
                            <Info>
                            <Typography
                              fontFamily='Roboto'
                              fontWeight='bold'
                              fontSize='18px'
                              ml='10px'
                              mr='20px'
                              mb="20px"
                            >
                              {ele.roomNo}
                            </Typography>
                            <Stack direction='row' spacing={1} ml="550px" mb="20px">
                            <Button 
                            variant="contained" 
                            size="small" 
                            sx={{color: 'white'}}
                            onClick={()=>{handleViewRoomOpen(ele._id)}}
                            >
                              View
                            </Button>
                            <Button 
                              variant="contained"
                              size="small" 
                              sx={{color: 'white'}}
                              onClick={()=>{handleEditOpen(ele._id)}}
                              >
                              Edit
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small" 
                              sx={{color: 'white'}}
                              onClick={()=>{handleDelete(ele._id)}}
                            >
                              Delete
                            </Button>
                            </Stack>
                            </Info>
                          </Overlay>
                        </ImageContainer>
                      )
                    })}
                  </Carousel>
                </div>
              )
            })}
          </>
          </>
           )
           }

           


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
              ADD YOUR ROOM DETAILS
            </Typography>
            {/* <BuildingForm handleClose={handleClose} /> */}
            <RoomForm handleClose={handleClose} rooms={rooms} roomsDispatch={roomsDispatch} buildingId={building?._id}/>
          </Box>
        </Modal>

        {/*view Room modal */}
        <Modal
            open={viewRoomOpen}
            onClose={handleViewRommClose}
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
              ROOM DETAILS
            </Typography>
            <ViewRoom roomId={roomId} rooms={rooms}/>
          </Box>
        </Modal>

        {/*Modal for editing room */}
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
              Edit ROOM DETAILS
            </Typography>
            <EditRoomForm 
              roomId={roomId}
              rooms={rooms}
              handleEditClose={handleEditClose}
              buildingId={building?._id}
              roomsDispatch={roomsDispatch}
              />
          </Box>
        </Modal>
        
    </div>
  )
}

