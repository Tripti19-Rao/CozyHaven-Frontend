import 'leaflet/dist/leaflet.css'
import { useContext } from "react"
import SearchContext from "../../ContextApi/searchContext"
import { Grid, Paper} from "@mui/material" 
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { Icon } from 'leaflet'

export default function SearchResults() {
    const {searchResults} = useContext(SearchContext)
    //console.log(searchResults.data)
    const customIcon = new Icon({
        iconUrl: '../../home.png',
        iconSize: [38,38]
    })

    const bbox = searchResults?.geoapifyResult?.[0]?.bbox;
    const lat = bbox?.lat2;
    const lng = bbox?.lon2;

    const isCoordsValid = lat !== undefined && lng !== undefined
    
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
        >
            <Grid item xs={4}>
            <Paper 
                elevation={6} 
                style={{overflow: "hidden",width: "1000px", height: "400px"}}
            >
            {isCoordsValid && (
                <MapContainer center={[lat,lng]} zoom={13} style={{ width: "100%", height: "100%" }}>
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
            <Grid item xs={8}>
                <h2>Second</h2>
            </Grid>
            
</Grid>
    )
}