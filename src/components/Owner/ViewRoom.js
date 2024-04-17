import {Box,Stack, Grid,Typography} from '@mui/material'
import { Carousel } from 'react-responsive-carousel'


export default function ViewRoom(props) {
    const {roomId, rooms} = props

    const room = rooms?.data?.find(ele => ele._id === roomId)
    console.log(room)
    return (
        <Box
        sx={{
            //border: '2px solid grey',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            width: '90%',
            height: '350px',
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
                        height: '350px',
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
                                height='300px'
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
                    Guest Count  
                </Typography>
                <Typography
                    fontFamily='Roboto'
                    alignContent='center'
                    fontWeight='bold'
                    fontSize='20px'
                    color='text.secondary'
                >
                    : &nbsp;&nbsp;{room.guest.length}
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
        </Box>
    )
}