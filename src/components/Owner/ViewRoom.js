import {Box,Stack, Grid,Typography, Modal, ListItemButton} from '@mui/material'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import GuestInformation from './GuestInformation'



export default function ViewRoom(props) {
    const {roomId, rooms} = props
    const [guest, setGuest] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = (obj) => {
        setGuest(obj)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)}

    const room = rooms?.data?.find(ele => ele._id === roomId)
    console.log('room',room)

    return (
        <Box
        sx={{
            //border: '2px solid grey',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            width: '90%',
            height: '400px',
            backgroundColor: '#6698E1',
           // height: ''
        }}
        >
            <Grid container>
                <Grid 
                    item xs={6}
                    sx={{
                        padding: '20px',
                        width: '150px',
                        height: '350',
                        borderRadius: '10px'
                    }}
                >
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    style={{borderRadius: '10px'}}
                >
                    {room.pic.map((pic,i) => {
                        return (
                            <img
                                src={pic}
                                alt={`Room ${i + 1}`}
                                key={i}
                                width="100px"
                                height='360px'
                                style={{borderRadius: '10px'}}
                            />
                        )
                    })}
                </Carousel>
                </Grid>
                <Grid 
                    item 
                    xs={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        //alignItems: 'center',
                        paddingTop: '20px'}}
                >
                <Box
                    sx={{
                        height:'320px',
                        backgroundColor: 'white',
                        padding: '20px 0px 20px 25px',
                        marginRight: '15px',
                        borderRadius: '10px'
                    }}
                >
                <Stack direction="column" spacing={3}>
                <Stack direction="row" spacing={2}>
                <Typography
                    fontFamily='Roboto'
                    minWidth='140px'                    
                    fontSize='22px'
                >
                    Room Number  
                </Typography>
                <Typography
                    fontFamily='Roboto'
                    alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    : &nbsp;&nbsp;{room.roomNo}
                </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                <Typography
                    fontFamily='Roboto'
                    fontSize='22px'
                    minWidth='140px'
                    // ml='10px'
                    // mr='20px'
                    // mb="20px"
                >
                    Sharing  
                </Typography>
                <Typography
                    fontFamily='Roboto'
                    alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    : &nbsp;&nbsp;{room.sharing}
                </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                <Typography
                    fontFamily='Roboto'
                    fontSize='22px'
                    minWidth='140px'
                    // ml='10px'
                    // mr='20px'
                    // mb="20px"
                >
                    Amount  
                </Typography>
                <Typography
                    fontFamily='Roboto'
                    alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    : &nbsp;&nbsp;{room.amount}
                </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                <Typography
                    fontFamily='Roboto'
                    fontSize='22px'
                    minWidth='140px'
                    
                >
                    Guest   
                </Typography>
                <Typography
                    fontFamily='Roboto'
                    //alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    :
                </Typography>
                {room.guest.length === 0 ? 
                <Typography
                    fontFamily='Roboto'
                    alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    No guest yet
                </Typography>    : (
                    <Box
                        style={{
                            width: "230px",
                            height: room.guest.length >= 2 ? "90px" : "40px",
                            overflowY: "auto",
                            border: '2px solid #6698E1',
                            borderRadius: '10px',
                            //padding: '5px 0px 0px 10px'
                            }}
                    >   
                        {room.guest.map(ele => {
                            return (
                            <ListItemButton onClick={()=>{handleOpen(ele)}} sx={{
                                fontFamily:'Roboto',
                                alignContent:'center',
                                fontWeight:'bold',
                                fontSize:'20px',
                                color:'text.secondary',
                            }}>
                            {/* <Typography
                            fontFamily='Roboto'
                            alignContent='center'
                            fontWeight='bold'
                            fontSize='20px'
                            color='text.secondary'
                        > */}
                        {ele.name}
                        {/* </Typography> */}
                        </ListItemButton>
                            )
                        })}
                        {/* <Typography fontSize='20px' color='text.secondary'>
                                    Devika
                                </Typography>
                                <Typography fontSize='20px'>
                                    Trupti
                                </Typography>
                                <Typography fontSize='20px'>
                                    Krutika
                                </Typography>
                                <Typography fontSize='20px'>
                                    Devika
                                </Typography> */}
                    </Box>
                )
            }
                </Stack>
                <Stack direction="row" spacing={2}>
                <Typography
                    fontFamily='Roboto'
                    fontSize='22px'
                    minWidth='140px'
                    // ml='10px'
                    // mr='20px'
                    // mb="20px"
                >
                    Available Beds  
                </Typography>
                <Typography
                    fontFamily='Roboto'
                    alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    : &nbsp;&nbsp;{room.sharing - room.guest.length }
                </Typography>
                </Stack>
                </Stack>
                </Box>
                
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box>
                    <GuestInformation details={guest} handleDetailsClose={handleClose}/>
                </Box>
            </Modal>
        </Box>
        
    )
}