import { useContext, useEffect } from "react"
import FinderContext from "../../ContextApi/FinderContext"
import { Stack, Skeleton, Typography, Paper, CardMedia, Box, CardContent, Grid, Chip, Rating } from "@mui/material"
import axios from "axios"
import { isEmpty } from "lodash"
import { StyledCard } from "./styles"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchContext from "../../ContextApi/searchContext"
import { useNavigate } from "react-router-dom"


export default function MyStay() {
    const {finder,findersDispatch} = useContext(FinderContext)
    const {searchDispatch} = useContext(SearchContext)
    const navigate = useNavigate()

    console.log('finder',finder.data)
    useEffect(() => {
        (async function() {
            try {
                if(!isEmpty(finder.data)) {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`http://localhost:3055/api/finders/${finder.data._id}/my`,{
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response.data)
                findersDispatch({type: 'SET_MYSTAY',payload: response.data})
                }
            } catch(err) {
                console.log(err)
            }
        })();
        // eslint-disable-next-line
    },[finder.data])

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

    //calculating Availability using
    const calculateAvailability = (rooms) => {
        //console.log('calculating availability..')
        return rooms?.reduce((acc,cv) => {
            return acc + cv.roomid?.sharing - cv.roomid?.guest?.length
        },0)
    }

    const getStartAmount = (rooms) => {
        const amt =  rooms?.map(ele => ele.roomid?.amount)
        return Math.min(...amt)
    }

    const handleShowBuilding = (id) => {
        searchDispatch({type: 'SET_IS_SEARCH', payload: false})
        navigate(`/show-building/${id}`)
    }

    return (
        <div style={{ marginTop: "90px", width:"67%", marginLeft: "auto", marginRight:"auto"}}>
            {!finder.mystay ? (
                <Stack spacing={1}>
                <Skeleton 
                    variant="text" 
                    width="70%"
                    style={{ 
                            fontSize: '3rem', 
                            marginTop: '20px',
                            marginLeft: "auto", 
                            marginRight:"auto"
                         }} 
                />
                <Skeleton variant="rounded" width="100%" height={250}  
                    sx={{
                        marginTop: '30px',
                    }}
                />
                <Skeleton variant="rounded" width="100%" height={250} />
                <Skeleton variant="rounded" width="100%" height={250} />
                </Stack>
            ) : (
                finder.mystay.length === 0 ? (
                    <>
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
                        src="/NoBuildingsData.jpg"
                        alt="Image"
                    /> 
                    <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily="Roboto"
                    textAlign="center"
                    fontSize="30px"
                    //marginTop="50px"
                >
                    You don't have any PG in your stay. Join a PG now!
                </Typography>
                    </Box>
                    </>
                ) : (
                    <>
                    {finder.mystay[0].stay ? (
                        <Typography
                        variant="body1"
                        fontWeight="bold"
                        fontFamily="Roboto"
                        textAlign="center"
                        fontSize="30px"
                        marginTop="50px"
                        marginBottom='30px'
                    >
                        You are currently residing in {finder.mystay[0].buildingId?.name}
                    </Typography>
                    ) : (
                        <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily="Roboto"
                    textAlign="center"
                    fontSize="30px"
                    marginTop="50px"
                    marginBottom='30px'
                >
                    You are currently not residing in any PG
                </Typography>
                    )}
                {finder.mystay.map(ele => {
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
                         <StyledCard sx={{display: 'flex'}} onClick={() => {handleShowBuilding(ele.buildingId._id)}}>
                            <CardMedia
                                component="img"
                                sx={{ width: 450,height: 258 }}
                                image={ele.buildingId.profilePic}
                                alt="Buildings Picture"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Grid container sx={{display: 'flex'}}>
                                <Grid item xs={9} 
                                //onClick={() => {handleShowBuilding(ele._id)}}
                                >
                                    <Typography variant="h5" fontFamily='Prociono' fontWeight="bold">
                                        {ele.buildingId.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Chip 
                                    label={ele.buildingId.gender.charAt(0).toUpperCase()+ele.buildingId.gender.slice(1)}
                                    avatar={<img src={genderImg(ele.buildingId.gender)} alt=''/>} 
                                    sx={{marginLeft: '25px'}}
                                    />
                                </Grid>
                                </Grid>
                                <Typography component="div" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '8px' }}>
                                    <Rating name="read-only" value={+ele.buildingId.rating} precision={0.5} readOnly />
                                </div>
                                <Typography  fontSize={15} fontWeight="bold">
                                    {ele.buildingId.rating}
                                </Typography>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight="bold" className='blue'>
                                    Amenities
                                </Typography>
                                <Grid>
                            {ele.buildingId.amenities.slice(0,3).map(ele => {
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
                            <Chip label={`${calculateAvailability(ele.buildingId.rooms)} Beds`} icon={<HotelIcon/>} sx={{backgroundColor: '#B6D1F8'}}/>
                            </Grid>
                            <Grid item xs={3}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pr: 2}}>
                                <Typography variant="subtitle1" color="text.secondary" fontSize={14}>
                                    Starts From
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}>
                                    <CurrencyRupeeIcon sx={{width: '20px', height: '20px'}}/>
                                    {getStartAmount(ele.buildingId.rooms)}/mo*
                                </Typography>
                            </Box>
                        </Grid>
                            </Grid>
                            </CardContent>
                            </Box>

                         </StyledCard>
                        </Paper>
                    )
                })}
            </>
                )
            )}
        </div>
    )
}