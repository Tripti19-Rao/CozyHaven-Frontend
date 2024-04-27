import { Typography } from "@mui/material"
import { useContext, useEffect} from "react"
import FinderContext from "../../ContextApi/FinderContext"
import axios from 'axios';
import { isEmpty } from "lodash";


export default function PaymentHistory() {
    const {finder,findersDispatch} = useContext(FinderContext)


    const tokenHeader ={
        headers:{
            Authorization:localStorage.getItem('token')
        }
    }
    useEffect(()=>{
        (async()=>{
            const response = await axios.get('http://localhost:3055/api/finders/wishlist',tokenHeader)
            console.log("payment",response.data)
            findersDispatch({type: 'SET_WISHLIST', payload: response.data})
        })()
    },[])

    return (
        <div style={{ marginTop: "90px", width:"75%", marginLeft: "auto", marginRight:"auto"}}>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontFamily="Roboto"
              textAlign="center"
              fontSize="30px"
              marginTop="50px"
            >
              Welcome To Your Payment History
            </Typography>
        {isEmpty(finder.wishlist) ? (
            <h1>Loading...</h1>
        ) : (
            <>
            <h1>{finder.wishlist.paymentHistory.length}</h1>
            </>
        )}
        </div>
    )
}