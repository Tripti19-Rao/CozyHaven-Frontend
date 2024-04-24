import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {startCancelPayment} from '../../../Actions/PaymentActions' 
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography } from "@mui/material";


export default function PaymentCancel() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [paymentDetails, setPaymentDetails] = useState({})

  const updateFailedResponse =(data) =>{
    setPaymentDetails(data)
  }
  // console.log("details" ,paymentDetails)
  // console.log("status" ,paymentDetails.status)

  useEffect(()=>{
    const stripId = localStorage.getItem('stripId')
    dispatch(startCancelPayment(stripId,updateFailedResponse))
    toast.error('Redirecting to Home Page', {
      autoClose: 5000,
      onClose: () => {
        navigate('/search')
      }
    })

    //removing building
    return () => {
      console.log('cancelPage unmounted')
      localStorage.removeItem('building')
    }
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <ToastContainer position='top-center' style={{ marginTop: '15px' ,width:'auto'}} />
      <Typography
        variant="body1"
        fontWeight="bold"
        textAlign="center"
        fontSize="35px"
        marginTop="150px"
      >
        Your Transaction Failed
      </Typography>
      <Box
        component="img"
        sx={{
          height: "480px",
          width: "700px",
          marginLeft:"420px",
          borderRadius: "5px",
        }}
        alt="Cancel Picture"
        src="/cancel.jpg"
      />
    </div>
  )
}
