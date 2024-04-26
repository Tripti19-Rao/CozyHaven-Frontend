import { useContext, useEffect, useState } from "react"
import SearchContext from "../../ContextApi/searchContext"
import { Grid, Modal,Paper,Box, CardContent, CardMedia, Chip, Typography,Rating,Tooltip,IconButton,Select,MenuItem,InputLabel,FormControl, Stack, Divider, Button,Pagination} from "@mui/material" 
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TuneIcon from '@mui/icons-material/Tune';
import HotelIcon from '@mui/icons-material/Hotel';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { Icon } from 'leaflet'
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { StyledCard } from './styles';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Swal from 'sweetalert2'
import FinderContext from "../../ContextApi/FinderContext"

export default function WishList() {
    const {finder,findersDispatch} = useContext(FinderContext)
    const {searchDispatch} = useContext(SearchContext)
    const navigate = useNavigate()
    const tokenHeader ={
        headers:{
            Authorization:localStorage.getItem('token')
        }
    }
    useEffect(()=>{
        (async()=>{
            const response = await axios.get('http://localhost:3055/api/finders/wishlist',tokenHeader)
            console.log("b4 finderdispatch wishlist",response.data)
            findersDispatch({type: 'SET_WISHLIST', payload: response.data})
        })()
    },[])


    const getStartAmount = (rooms) => {
        const amt =  rooms?.map(ele => ele.roomid?.amount)
        return Math.min(...amt)
    }

    const calculateAvailability = (rooms) => {
        //console.log('calculating availability..')
        return rooms?.reduce((acc,cv) => {
            return acc + cv.roomid?.sharing - cv.roomid?.guest?.length
        },0)
    }
    const handleShowBuilding = (id) => {
        searchDispatch({type: 'SET_IS_SEARCH', payload: false})
        navigate(`/show-building/${id}`)
    }

    const genderImg = (gender) => {
        console.log(gender.charAt(0).toUpperCase()+gender.slice(1))
        if(gender === 'female') {
            return 'https://cdn-icons-png.flaticon.com/128/657/657051.png'
        } else if(gender === 'male') {
            return 'https://cdn-icons-png.flaticon.com/128/657/657052.png'
        } else {
            return 'https://cdn-icons-png.flaticon.com/128/20/20373.png'
        }
    }

    const handleWishlist = async(id)=>{
        
        const updatedWishlist = finder?.wishlist?.wishList.filter((ele)=>{
            return ele._id !=id
        })
        const update = {
            ...finder?.wishlist,
            wishList: updatedWishlist
        }
        const array = updatedWishlist.map((ele)=> ele._id)
        console.log("updted",update)
        const body = {...finder.data}
        body.wishList =array
        console.log("final body" ,body)
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to view this PG anymore",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const response = await axios.put(`http://localhost:3055/api/finders`,body,tokenHeader)
                
                //console.log('id',id,'buid',building._id,'roomid',rid,'response',response.data)
                findersDispatch({type: 'SET_FINDER', payload: response.data})
                findersDispatch({type:'UPDATE_WISHLIST', payload:update})        
                Swal.fire({
                  title: "Done!",
                  text: "This building was removed from your wishlist",
                  confirmButtonColor: "#3085d6" 
                });
              } catch(err) {
                console.log(err)
                Swal.fire({
                  title: 'Error',
                  text: `${err.message}`,
                  icon: 'error'
                })
              }
              
            }
          });
        //const response = await axios.put(`http://localhost:3055/api/finders`,body,tokenHeader)
    }

    return (
        <div style={{marginTop: '100px', marginLeft:'300px'}}>
           
            {finder?.wishlist?.wishList?.length > 0 ? (<div>
                <Typography
                    fontFamily='Roboto'
                    fontWeight='bold'
                    fontSize='20px'
                    mb={2}
                >
                     Your wishlisted PG's 
                </Typography>
                {finder?.wishlist.wishList?.map((ele,i) => {
                return (
                <Paper 
                key={ele._id}
                elevation={4} 
                style={{ overflow: "hidden", width: "1000px", marginBottom: "25px", transition: 'box-shadow 0.3s' }} // Add transition for elevation change
                onMouseOver={(e) => {
                    e.currentTarget.style.transition = 'box-shadow 0.3s'; // Add transition on hover
                    e.currentTarget.style.boxShadow = '12px 12px 12px rgba(0, 0, 0, 0.2)'; // Increase elevation on hover
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transition = 'box-shadow 0.3s'; // Add transition on hover out
                    e.currentTarget.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.1)'; // Reset elevation on hover out
                }}
            >
                {/* <Link to={`/show-building/${ele._id}`} style={{textDecoration: 'none'}}> */}
                <StyledCard sx={{ display: 'flex'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 450,height: 258 }}
                    image={ele.profilePic}
                    alt="Buildings Picture"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Grid container sx={{display: 'flex'}}>
                                <Grid item xs={8} 
                                onClick={() => {handleShowBuilding(ele._id)}}
                                >
                                    <Typography variant="h5" fontFamily='Prociono' fontWeight="bold">
                                        {ele.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Chip 
                                    label={ele.gender.charAt(0).toUpperCase()+ele.gender.slice(1)}
                                    avatar={<img src={genderImg(ele.gender)} alt=''/>} 
                                    sx={{marginLeft: '25px'}}
                                    />
                                </Grid>
                                
                                <Grid item xs={1}>
                                    <Tooltip title={'remove from wishlist'}>
                                        <IconButton sx={{ padding: '0px'}} onClick={() => {handleWishlist(ele._id)}}>
                                            <FcLike style={{ fontSize: "35px" }} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>                                                      
                            </Grid>
                        
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pr: 2}}>
                        <Chip label={ele.gender} avatar={<img src={genderImg(ele.gender)} alt=''/>}/>
                        </Box> */}
                        {/* <Typography variant="subtitle1" color="text.secondary" component="h6" fontWeight="bold">
                            {ele.address}
                        </Typography> */}
                        <Typography component="div" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '8px' }}>
                                <Rating name="read-only" value={+ele.rating} precision={0.5} readOnly />
                            </div>
                            <Typography  fontSize={15} fontWeight="bold">
                                {ele.rating}
                            </Typography>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight="bold" className='blue'>
                            Amenities
                        </Typography>
                        <Grid>
                            {ele.amenities.slice(0,3).map(ele => {
                                return (
                                    <div key={ele._id}>
                                        <img src={ele.iconName} alt='*' width='15px' height='15px' style={{marginRight: '5px'}}/>
                                        <Typography variant='p' color="text.secondary">
                                        {ele.name}
                                    </Typography>
                                    </div>
                                )
                            })}
                        </Grid>
                        <Grid container sx={{display: 'flex'}}>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight="bold" className='blue'>
                                Availability
                            </Typography>
                            <Chip label={`${calculateAvailability(ele.rooms)} Beds`} icon={<HotelIcon/>} sx={{backgroundColor: '#B6D1F8'}}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pr: 2}}>
                                <Typography variant="subtitle1" color="text.secondary" fontSize={14}>
                                    Starts From
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}>
                                    <CurrencyRupeeIcon sx={{width: '20px', height: '20px'}}/>
                                    {getStartAmount(ele.rooms)}/mo*
                                </Typography>
                            </Box>
                        </Grid>
                        </Grid>
                        </CardContent>
                    </Box>
                    </StyledCard>
                    {/* </Link> */}
                    </Paper>
                )
            })}
            </div>):(<div>
                <Box
            sx={{
              //marginTop: "100px",
              justifyContent: "center",
              bgcolor: "background.paper",
              border: "2px ",
              p: 7,
              width: "800px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Box
              component="img"
              style={{
                display: "block",
                margin: "auto",
                height: "400px",
                width: "400px",
                maxWidth: "100%",
                borderRadius: "50%",
                objectFit: "fill",
              }}
              src="/wishlist.jpg"
              alt="Image"
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              textAlign="center"
              fontSize="20px"
              //margin="50px"
            >
              You dont have any buldings in you wishlist yet. Add one now <FcLike style={{ fontSize: "25px" }} />
            </Typography>
          </Box>
                </div>)}
            
        </div>
    )
}