import {jwtDecode} from 'jwt-decode'
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Stack, Skeleton } from '@mui/material';


export default function PaymentLinkPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state)=>{
        return state.user.userData
    })

    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams.toString())
    const token = urlParams.get('session');

    //console.log('paymentid',token)
    const {sessionUrl} = jwtDecode(token)
    console.log('paymentid',sessionUrl)

    const loginToken = localStorage.getItem('token')

    useEffect(()=>{
        if(!user && !loginToken) {
            navigate(`/login`, {state: {token}})
        } else if(loginToken) {
            window.location = sessionUrl
            console.log('inside',user)
        }
          // eslint-disable-next-line
    },[user])

    return (
        <Box
         sx={{
            marginTop: '80px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '75%'
         }}
        >
            <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="rectangular" width="100%" height="450px" 
            // sx={{marginLeft: 'auto',
            //         marginRight: 'auto'}}
                     />
            <Skeleton variant="rectangular" width="100%"height={80} />
            <Skeleton variant="rounded" width="100%" height={80} />
            </Stack>
        </Box>
    )
}