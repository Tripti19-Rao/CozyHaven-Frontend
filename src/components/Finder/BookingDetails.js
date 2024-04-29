import {useNavigate, useParams } from 'react-router-dom'
import {useEffect, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {startGetBookingDetails, startDestroyBooking} from '../../Actions/BookingActions'
import {startPayment} from '../../Actions/PaymentActions'
import { Box, Typography, Grid, Button , Stack , CardContent, Card, Divider } from "@mui/material";
import SearchContext from '../../ContextApi/searchContext'


 
export default function BookingDetails() {
    const {bookingid} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {searchResults} = useContext(SearchContext)

    useEffect(()=>{
      if(bookingid){
        dispatch(startGetBookingDetails(bookingid))
      }
      // eslint-disable-next-line
    },[])

    const bookingDetail = useSelector((state)=>{
      return state.booking.bookingDetails
    })
    console.log("booking",bookingDetail)

    const building = searchResults?.building

    const room = building.rooms.find((ele) => ele.roomid._id === bookingDetail.roomId);
    if (!room) {
        console.log('Room not found');
        return;
    }

console.log("room", room);
//chat

  const handleCancel = ()=>{
    dispatch(startDestroyBooking(bookingid))
    navigate(-1)
  }


    const makePayment = ()=>{
      const payData = {
        invoiceId:bookingDetail._id,
        amount:bookingDetail.amount
      }
      dispatch(startPayment(payData))
    }
    return (

    <div>
       <Typography
        variant="body1"
        fontWeight="bold"
        marginLeft="300px"
        fontSize="35px"
        marginTop="100px"
      >
        Invoice
      </Typography>
          <Box width="900px" height="400px" justifyContent="center"alignItems="center" marginTop="20px" marginLeft="300px" borderRadius="10px" >
      <Grid container spacing={2}>
      <Grid item xs={6} >
      <Card sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          borderRadius: '10px',
          display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'

        }}>
      <Box
        component="img"
        sx={{
          maxWidth: '440px',
          height: '440px',
          borderRadius: '10px',

        }}
        alt="Building Picture"
        src={building.profilePic}
      />
      </Card>
      </Grid>
      <Grid item xs={6} >
      <Card sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          borderRadius: '10px',
          minWidth:'450px',
          height:'460px'
        }}>
        <CardContent>
        <Stack spacing={2} direction="column">
        <Typography
        variant="body1"
        fontSize="35px"
        // marginTop="20px"
      >
        Overview
      </Typography>
      <Typography
        variant="body1"
      >
        Paying Guest Name : {building.name}
      </Typography>
      <Typography
        variant="body1"
      >
        Address : {building.address}
      </Typography>
      
      <Typography
        variant="body1"
      >
        Room No : {room.roomid.roomNo}
      </Typography>
      <Typography
        variant="body1"
      >
        Sharing : {room.roomid.sharing}
      </Typography>
      <Typography
        variant="body1"
        
      >
        Rent : {room.roomid.amount} 
      </Typography>
      <Typography
        variant="body1"
      >
        Deposit :{building.deposit} 
      </Typography>
      <Divider />
      </Stack>

      <Typography
        variant="body1"
        paddingLeft='320px'
        margin="0px"
        color="#737373"
      >
        Total
      </Typography>
      <Typography
        variant="body1"
        paddingLeft='320px'
        fontWeight="bold"
        fontSize="20px"
      >
        {Number(building.deposit) + Number(room.roomid.amount)}
      </Typography>
      {/* <Grid>
      
      </Grid> */}
        {/* <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#5785FD",
                  marginLeft: "150px ",
                  width: "100px",
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#5785FD",
                  marginLeft: "150px ",
                  width: "100px",
                }}
              >
                Submit
              </Button> */}


              
<Grid container spacing={2} marginTop="0px" marginLeft="150px" marginBottom="15px">
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleCancel}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={makePayment} variant="contained" color="primary">
              Checkout
        </Button>
      </Grid>
    </Grid>
        </CardContent>
      </Card>
      </Grid>
      </Grid>
      </Box>
    </div>
  )
}
