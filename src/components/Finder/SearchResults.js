import 'leaflet/dist/leaflet.css'
import { useContext, useEffect, useState } from "react"
import SearchContext from "../../ContextApi/searchContext"
import { Grid, Modal,Paper,Box, CardContent, CardMedia, Chip, Typography,Rating,Tooltip,IconButton,Select,MenuItem,InputLabel,FormControl, Stack, Divider, Button,Pagination, Skeleton} from "@mui/material" 
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TuneIcon from '@mui/icons-material/Tune';
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
import { useNavigate, useLocation, } from 'react-router-dom';
import { isEmpty } from 'lodash';
//import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
//import { BiMaleFemale,BiMale,BiFemale} from "react-icons/bi"

export default function SearchResults() {
    const navigate = useNavigate()
    const location = useLocation()
    
    console.log('llll',location.search.address)
    const {finder,findersDispatch} = useContext(FinderContext)
    const {searchResults, searchDispatch} = useContext(SearchContext)

    const initialClickedState = searchResults && searchResults.data ? Array(searchResults.data.length).fill(false) : [];
    const [isClicked, setIsClicked] = useState(initialClickedState)

    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //to get the previous query
    const previousQuery = new URLSearchParams(location.search)
    console.log(previousQuery.toString())
    console.log('va0',previousQuery.get('price'))
    

     //search query
     const [query, setQuery] = useState({
        address: previousQuery.get('address'),
        gender: previousQuery.get('gender'),
        sharing: previousQuery.get('sharing'),
        amenities: [],
        price: '',
        limit: '',
        page: previousQuery.get('page') || 1
    })

    const [tempAmenities, setTempAmenities] = useState([])

     // Function to update URL with new search parameters
     const updateSearchParams = (searchParams) => {
        console.log('searPar',searchParams)
        const newSearch = new URLSearchParams(searchParams).toString();
        navigate(`/search-results?${newSearch}`);
    };

    const handleQueryChange = (e) => {
        const {name, value} = e.target
        if(name === 'limit') {
            setQuery(prevQuery => {
                const updatedQuery = { ...prevQuery, [name]: value, page: 1 }; // Reset page to 1
                updateSearchParams(updatedQuery);
                return updatedQuery;
            });
        } else {
            setQuery({...query, [name]: value})
            updateSearchParams({ ...query, [name]: value });
        }
    }

    const handlePageChange = (e,value) => {
        setQuery({...query, page: value})
        updateSearchParams({...query, page: value})
    }
    console.log('QQqqqqq',query)

     //Amenities
    const handleItemClick = (id) => {
        const isSelected = tempAmenities.includes(id)
    
        if (isSelected) {
            const arr = tempAmenities.filter((ele) => ele !== id)
            setTempAmenities([...arr])
        } else {
            setTempAmenities([...tempAmenities, id])
        }
    };

    const addAmenities = () => {
        setQuery({
            ...query, amenities: [...tempAmenities]
        })
        handleClose()
        updateSearchParams({ ...query, amenities: [...tempAmenities]});
    }

    console.log(searchResults.data)
    console.log(searchResults.pagination)
    
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
                searchDispatch({type: 'SET_INITIALSEARCH',payload: false})
            } catch(err) {
                console.log(err)
            }
        })(); 

       

        //get all the amenities
        (async function(){
            try {
                const token = localStorage.getItem('token')
                const ameneitiesResponse = await axios.get('http://localhost:3055/api/amenities',{
                    headers: {
                        Authorization: token
                    }
                })
                console.log('ameni',ameneitiesResponse.data)
                searchDispatch({ type: "SET_AMENITIES", payload: ameneitiesResponse.data });
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
            if(!isEmpty(finder.data)) {
                const wishList = finder?.data?.wishList
            const newClickStatus = [isClicked]
            searchResults.data?.map(ele => ele._id).forEach((ele,i) => {
                if(wishList.includes(ele)) {
                    newClickStatus[i] = true
                } else {
                    newClickStatus[i] = false
                }
            });
            setIsClicked(newClickStatus)
            console.log(wishList,'wish','builid',newClickStatus)
            }
        
        // eslint-disable-next-line
    },[searchResults.data,finder.data])

    const handleWishlist = async (buildingId,index) => {
        
        try {
            console.log(buildingId)

            const body = {...finder.data}
            const newClickStatus = [...isClicked]

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
            //localStorage.setItem('finderData',JSON.stringify(response.data))
            findersDispatch({type: 'SET_FINDER', payload: response.data})
            console.log('res',response.data)
            
            
            //update isClicked for that building
                setIsClicked(newClickStatus)
                console.log('newClick',newClickStatus)
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
        {
            searchResults.initialSearch ? (
            <Grid item xs={12}>
            <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="rectangular" width="850px" height="450px" sx={{marginLeft: 'auto',
                    marginRight: 'auto'}} />
            <Skeleton variant="rectangular" width="850px"height={80} />
            <Skeleton variant="rounded" width="850px" height={80} />
            </Stack>
            </Grid>
            ) : (
            <>
            <ToastContainer/>
            <Grid 
                container
                //xs={10} 
                pb={3}
                direction="row"
                alignItems="center"
                style={{
                    width: '66%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
            <Grid item xs={4}>
                <Typography
                    fontFamily='Roboto'
                    fontWeight='bold'
                    fontSize='20px'
                >
                    {searchResults?.data?.length} PG's are waiting for You
                </Typography>
            </Grid>
            <Grid  item xs={8} sx={{paddingLeft: '50px'}}>
                <Stack direction="row" spacing={2}>
            <FormControl>
            <InputLabel id="gender" size='small'>Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              size='small'
              name="gender"
              label="Gender"
                value={query.gender}
                onChange={handleQueryChange}
                style={{width: '120px'}}
            > 
            <MenuItem value="">none</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"co-living"}>Co-living</MenuItem>
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel id="price" size='small'>Price</InputLabel>
            <Select
                labelId="price"
                id="price"
                size='small'
                name="price"
                label="Price"
                value={query.price}
                onChange={handleQueryChange}
              style={{ width: "150px" }}
            > 
                <MenuItem value="">none</MenuItem>
              <MenuItem value={"asc"}>Lowest - Highest</MenuItem>
              <MenuItem value={"dsc"}>Highest - Lowest</MenuItem>
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel id="sharing" size='small'>Sharing</InputLabel>
            <Select
              labelId="sharing"
              id="sharing"
              size='small'
              name="sharing"
              label="sharing"
                value={query.sharing}
                onChange={handleQueryChange}
              style={{ width: "150px" }}
            > 
              <MenuItem value="">none</MenuItem>
              <MenuItem value={1}>Single</MenuItem>
              <MenuItem value={2}>Two Sharing</MenuItem>
              <MenuItem value={3}>Three Sharing</MenuItem>
              <MenuItem value={4}>Four Sharing</MenuItem>
              <MenuItem value={5}>Five Sharing</MenuItem>
            </Select>
            </FormControl>
            <Chip 
                label='More Filters'
                variant="outlined"
                avatar={<TuneIcon style={{ color: 'blue' }}/>}
                sx={{height: '40px'}}
                onClick={handleOpen} 
            />
            
            </Stack>
            </Grid>
            </Grid>
            {
                    searchResults.data.length === 0 ? (
                        <Grid item xs={12}>
                        <Typography
                        variant="body1"
                        fontWeight="bold"
                        textAlign="center"
                        fontSize="20px"
                        marginTop="20px"
                    >
                        We couldn't keep up with your filters.
                        Try expanding your search?
                    </Typography>
                    <Box
                        component="img"
                        sx={{
                        height: "400px",
                        width: "400px",
                        marginLeft:"60px",
                        borderRadius: "5px",
                        }}
                        alt="Search Not Found"
                        src="/notFound.jpg"
                    />
                        </Grid>
                    ) : (
                        <>
                        <Grid item xs={3}>
            <Paper 
                elevation={6} 
                style={{overflow: "hidden",width: "1000px", height: "400px"}}
            >
            {isCoordsValid && (
                <MapContainer center={center} zoom={13} style={{ width: "100%", height: "100%" }}>
                <TileLayer 
                    // url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'//leafletjs.com -- copy the url
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
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
            <Grid item xs={7}  mt={3}>
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
                <StyledCard sx={{ display: 'flex',width: '100%'}}>
                <CardMedia
                    component="img"
                    sx={{
                        width: '80%',
                        height: '258px',
                        objectFit: 'cover' 
                    }}
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
                                
                                    <Grid item xs={1}>
                                    <Tooltip title={isClicked[i] ? 'remove from wishlist' : 'add to wishlist'}>
                                        <IconButton sx={{ padding: '0px'}} onClick={()=>{handleWishlist(ele._id,i)}}>
                                            {isClicked[i] ? <FcLike style={{fontSize: "35px", color: 'white'}}/> :  <CiHeart style={{fontSize: "35px"}}/>}
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
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: "500px",
                marginBottom: '20px'}}>
            <Typography>
                Rows per page
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                //value={age}
                //label="Age"
                //onChange={handleChange}
              //id="limit"
              //size='small'
              name="limit"
              //variant=''
            // label="sharing"
              value={query.limit}
              onChange={handleQueryChange}
              //style={{ height: "35px" , width: '55px'}}
            > 
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
            </FormControl>
            <Pagination
                name="page"
                count={searchResults.pagination.totalPages} 
                page={query.page}
                onChange={(e, value) => handlePageChange(e, value)}
                variant="outlined" 
                shape="rounded" 
                color="primary"
            />
            </div>
            </Grid>
                        </>
                    )
            }
            
            </>)
        }
        


            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
          <Box
            sx={{
              marginTop: "100px",
              marginLeft: 'auto',
              marginRight: 'auto',
              bgcolor: "background.paper",
              border: "2px ",
              boxShadow: 24,
              p: 4,
              width: "50%",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontFamily='Roboto'
              sx={{ textAlign: "center" }}
            >
              Filters
            </Typography>
            <Divider/>
            <Box
                sx={{
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: '10px'
                }}
            >
            <Typography
                fontFamily='Roboto'
                fontSize='18px'
                paddingBottom="20px"
                color="text.secondary"
            >
                Amenites
            </Typography>
            <Grid
              container
            //   sx={{
            //     height: "320px",
            //     marginLeft: "100px",
            //     padding: "20px",
            //   }}
            >
              <Grid item xs={4} sx={{ 
                //paddingLeft: "200px" 
                }}>
                {searchResults.amenities.slice(0, 4).map((item) => (
                <div key={item._id} style={{paddingBottom: '20px'}}>
                <Chip 
                    label={item.name}
                    variant="outlined"
                    avatar={<img src={item.iconName} alt='*'/>}
                    sx={{
                        padding: '20px',
                        backgroundColor: tempAmenities.includes(item._id) ? '#C9E6F9' : 'white', // Change background color based on condition
                        // '&:hover': {
                        //     false
                        // }
                        // '&:hover': {
                        //     backgroundColor: 'transparent', // Change background color on hover
                        //     cursor: 'pointer', // Show pointer cursor on hover
                        //   },
                        
                    }}
                    //hover= {false}
                    onClick={() => handleItemClick(item._id)} 
                />
                </div>
                ))}
              </Grid>
              <Grid item xs={4}>
                {searchResults.amenities.slice(4,8).map((item) => (
                  <div key={item._id} style={{paddingBottom: '20px'}}>
                    <Chip 
                    key={item._id}
                    label={item.name}
                    variant="outlined"
                    avatar={<img src={item.iconName} alt='*'/>}
                    sx={{
                        padding: '20px',
                        backgroundColor: tempAmenities.includes(item._id) ? '#C9E6F9' : 'white', // Change background color based on condition
                    }}
                    onClick={() => handleItemClick(item._id)}
                    
                    />
                  </div>
                ))}
              </Grid>
              <Grid item xs={4}>
                {searchResults.amenities.slice(8).map((item) => (
                  <div key={item._id} style={{paddingBottom: '20px'}}>
                    <Chip 
                    key={item._id}
                    label={item.name}
                    variant="outlined"
                    avatar={<img src={item.iconName} alt='*'/>}
                    sx={{
                        padding: '20px',
                        backgroundColor: tempAmenities.includes(item._id) ? '#C9E6F9' : 'white', // Change background color based on condition
                        //backgroundColor: query.amenities.includes(item._id) ? '#C9E6F9' : 'white', // Change background color based on condition
                        // '&:hover': {
                        //    backgroundColor: query.amenities.includes(item._id) ? '#C9E6F9' : 'white', // Prevent background color change on hover
                        // },
                    }}
                    onClick={() => handleItemClick(item._id)}
                    
                    />
                  </div>
                ))}
              </Grid>
            </Grid>
            <Button
                variant="contained"
                size='small'
                style={{marginLeft: '400px'}}
                onClick={()=>{
                    setTempAmenities([])
                    setQuery({...query, amenities: []})
                }}
            >
                Clear
            </Button>
            <Button
                variant='contained'
                size='small'
                style={{marginLeft: '10px'}}
                onClick={addAmenities}
            >
                Save
            </Button>
            </Box>
          </Box>
        </Modal>
        </Grid>
    )
}