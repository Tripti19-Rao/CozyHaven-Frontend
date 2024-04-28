import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate,useLocation } from "react-router-dom";
import {startCancelPayment, startCancelPaymentviaId} from '../../../Actions/PaymentActions' 
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography } from "@mui/material";
import {jwtDecode} from 'jwt-decode'



export default function PaymentCancel() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [ setPaymentDetails] = useState({})

  const urlParams = new URLSearchParams(location.search);
  console.log(urlParams.toString())
  const token = urlParams.get('token');

  console.log('paymentid',token)
  const {paymentId} = jwtDecode(token)

  const updateFailedResponse =(data) =>{
    setPaymentDetails(data)
  }

  useEffect(()=>{
    const stripId = localStorage.getItem('stripId')
    if(paymentId) {
      dispatch(startCancelPaymentviaId(paymentId, updateFailedResponse))
      toast.error('Payment Canceled! Redirecting to home page', {
        autoClose: 5000,
        onClose: () => {
          navigate('/search')
        }
      })
    } else {
      dispatch(startCancelPayment(stripId,updateFailedResponse))
      toast.success('Payment Canceled! Redirecting to home page', {
        autoClose: 5000,
        onClose: () => {
          navigate('/search')
        }
      })
    }

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
