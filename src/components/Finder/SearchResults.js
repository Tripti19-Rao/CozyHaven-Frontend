import 'leaflet/dist/leaflet.css'
import { useContext, useEffect, useState } from "react"
import SearchContext from "../../ContextApi/searchContext"
import { Grid, Paper,Box, CardContent, CardMedia, Chip, Typography,Rating,Tooltip,IconButton} from "@mui/material" 
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HotelIcon from '@mui/icons-material/Hotel';
//import GirlIcon from '@mui/icons-material/Girl';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
//import { useTheme } from '@mui/material/styles';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { Icon } from 'leaflet'
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import axios from 'axios';
import FinderContext from '../../ContextApi/FinderContext';
import { toast, ToastContainer } from 'react-toastify';
import { StyledCard } from './styles';
import { useNavigate, useLocation } from 'react-router-dom';
//import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
//import { BiMaleFemale,BiMale,BiFemale} from "react-icons/bi"

export default function SearchResults() {
    const navigate = useNavigate()
    const location = useLocation()

    const {finder,findersDispatch} = useContext(FinderContext)
    const {searchResults, searchDispatch} = useContext(SearchContext)

    // const initialClickedState = searchResults && searchResults.data ? Array(searchResults.data.length).fill(false) : [];
    // const [isClicked, setIsClicked] = useState(initialClickedState)

    console.log(searchResults.data)
    
    const customIcon = new Icon({
        iconUrl: '../../home.png',
        iconSize: [38,38]
    })

    const center = [...searchResults?.geoapifyResult]
    console.log(center,'center')
    const isCoordsValid = center[0] !== undefined && center[1] !== undefined

    useEffect(()=>{
        (async function(){
            try {
               
                const response = await axios.get(`http://localhost:3055/api/search${location.search}`)
                console.log(response.data)
        //console.log(values.address)
                searchDispatch({type: 'SET_BUILDINGS',payload: response.data})
                searchDispatch({type: 'SET_IS_SEARCH',payload: true})
            } catch(err) {
                console.log(err)
            }
        })(); 
        // eslint-disable-next-line
    },[location.search])

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

    useEffect(()=>{
        searchDispatch({type: 'SET_IS_SEARCH', payload: true})

        if(JSON.parse(localStorage.getItem('wishlist'))) {
            const storedIsClick = JSON.parse(localStorage.getItem('wishlist'))
            searchDispatch({type: 'SET_ISCLICKED', payload: storedIsClick})
        } else {
            //if the wishlist is not present in the localStorage when the user logs out & logs in
            const wishList = finder.data.wishList
            const newClickStatus = [...searchResults?.isClicked]
            console.log('click', searchResults?.isClicked)
            searchResults.data.map(ele => ele._id).forEach((ele,i) => {
                if(wishList.includes(ele)) {
                    newClickStatus[i] = true
                }
            });
            //setIsClicked(newClickStatus)
            searchDispatch({type: 'SET_ISCLICKED', payload: newClickStatus})
            localStorage.setItem('wishlist',JSON.stringify(newClickStatus))
        }
        // eslint-disable-next-line
    },[])

    const handleWishlist = async (buildingId,index) => {
        
        try {
            console.log(buildingId)

            const body = {...finder.data}
            const newClickStatus = [...searchResults?.isClicked]

            const isBuildingId = body.wishList.find(bId => bId === buildingId)
            if(isBuildingId) {
                body.wishList = body.wishList.filter(bId => bId !== isBuildingId)
                newClickStatus[index] = false
            } else {
                body.wishList = [...body.wishList, buildingId]
                newClickStatus[index] = true
            }

            const token = localStorage.getItem('token')
            const response = await axios.put(`http://localhost:3055/api/finders`,body,{
                headers: {
                    Authorization: token
                }
            })
            localStorage.setItem('finderData',JSON.stringify(response.data))
            findersDispatch({type: 'SET_FINDER', payload: response.data})
            console.log('res',response.data)
            
            
            //update isClicked for that building
                //setIsClicked(newClickStatus)
                searchDispatch({type: 'SET_ISCLICKED', payload: newClickStatus})
                localStorage.setItem('wishlist',JSON.stringify(newClickStatus))
                console.log('newClick',newClickStatus)
            // const newClickStatus = [...isClicked]
            // newClickStatus[index] = !newClickStatus[index]
            // setIsClicked(newClickStatus)
            toast.info(newClickStatus[index] ? 'Building added to your wishlist': 'Building removed from wishlist', {
                autoClose: 1000,
                position: 'top-center',
                theme: "dark",
                hideProgressBar: true
                //transition: 'Zoom'
              });
        } catch(err) {
            console.log(err)
        }
    }

    // to redirect to show-building page
    const handleShowBuilding = (id) => {
        searchDispatch({type: 'SET_IS_SEARCH', payload: false})
        navigate(`/show-building/${id}`)
    }
    
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingTop="80px"
            //display='flex'

        > 
        <ToastContainer/>
            <Grid item xs={4}>
            <Paper 
                elevation={6} 
                style={{overflow: "hidden",width: "1000px", height: "400px"}}
            >
            {isCoordsValid && (
                <MapContainer center={center} zoom={13} style={{ width: "100%", height: "100%" }}>
                <TileLayer 
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'//leafletjs.com -- copy the url
                />
                {searchResults.data.map(ele => {
                return <Marker position={[ele.geolocation.lat, ele.geolocation.lng]} icon={customIcon} key={ele._id}>
                    <Popup>{ele.name}</Popup>
                </Marker>
            })}
            </MapContainer>
            )}
            </Paper>
            </Grid>
            <Grid item xs={8}  marginTop='50px'>
            {searchResults.data?.map((ele,i) => {
                return (
                <Paper 
                key={ele._id}
                elevation={4} 
                style={{ overflow: "hidden", width: "1000px", marginBottom: "10px", transition: 'box-shadow 0.3s' }} // Add transition for elevation change
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
                                <Grid item xs={8} onClick={() => {handleShowBuilding(ele._id)}}>
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
                                {searchResults?.isClicked && (
                                    <Grid item xs={1}>
                                    <Tooltip title={searchResults?.isClicked[i] ? 'remove from wishlist' : 'add to wishlist'}>
                                        <IconButton sx={{ padding: '0px'}} onClick={()=>{handleWishlist(ele._id,i)}}>
                                            {searchResults?.isClicked[i] ? <FcLike style={{fontSize: "35px", color: 'white'}}/> :  <CiHeart style={{fontSize: "35px"}}/>}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                )}
                                
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
            </Grid>
        </Grid>
    )
}