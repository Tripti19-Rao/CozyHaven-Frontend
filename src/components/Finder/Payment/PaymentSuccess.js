import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startUpdatePayment } from "../../../Actions/PaymentActions";
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography } from "@mui/material";

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [paymentDetails, setPaymentDetails] = useState({});

  const updateSucessResponse = (data) => {
    setPaymentDetails(data);
  };

  // console.log("details", paymentDetails);
  // console.log("status", paymentDetails.status);

  useEffect(()=>{
    const stripId = localStorage.getItem('stripId')
    dispatch(startUpdatePayment(stripId,updateSucessResponse))
    toast.success('Redirecting to Guest Registration Page', {
      autoClose: 5000,
      onClose: () => {
        navigate('/search')
      }
    })
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
        Your Payment was successfull
      </Typography>
      <Box
        component="img"
        sx={{
          height: "480px",
          width: "800px",
          marginLeft:"350px",
          borderRadius: "5px",
        }}
        alt="Success Picture"
        src="/success.jpg"
      />
    </div>
  );
}
