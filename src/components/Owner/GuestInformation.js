import {
  Typography,
  Grid,
  Divider,
  Tooltip,
  Box,
  Button
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from '@mui/icons-material/School';
import moment from "moment";

export default function GuestInformation(props) {
  const { details , handleDetailsClose } = props;
  console.log(details);
  return (
    
    <div>
        {details?.isComplete ? (<div>
            <Box
          sx={{
            marginTop: "5px",
            marginLeft: "430px",
            bgcolor: "background.paper",
            border: "2px ",
            boxShadow: 24,
            p: 4,
            width: "40%",
            borderRadius:"10px",
            position: "relative",
        backgroundImage: "linear-gradient(to bottom, #6698e1 20%, transparent 20%)", // Change here
          }}
        >
      <Box
        component="img"
        style={{
          display: "block",
          margin: "auto",
          height: "200px",
          width: "200px", 
          maxWidth: "100%", 
          borderRadius: "50%", 
          objectFit: "fill",
        }}
        src={details.profile}
        alt="Image"
      />
      <Typography variant="body1" textAlign="center" fontSize="25px" mt={1}>
        {details.name}
      </Typography>
      <Grid container mb={2}>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography variant="body1" mt={1}>
            <span style={{ color: "#6698e1", marginRight: "4px" }}>Age : </span>{" "}
            {details.age}
          </Typography>
          <Typography variant="body1" mt={1}>
            <span style={{ color: "#6698e1", marginRight: "4px" }}>
              Gender :{" "}
            </span>{" "}
            {details.gender}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography variant="body1" mt={1}>
            <span style={{ color: "#6698e1", marginRight: "4px" }}>
              Residing :{" "}
            </span>{" "}
            {details.stay === true ? `Yes` : `No`}
          </Typography>
          <Typography variant="body1" mt={1}>
            <span style={{ color: "#6698e1", marginRight: "4px" }}>
              Date of birth :{" "}
            </span>{" "}
            {moment(details.createdAt).format("DD-MM-YYYY")}
          </Typography>
        </Grid>
      </Grid>
      <Divider />

      {/* <Typography variant="body1" mt={1}>
        <span style={{ color: "#6698e1", marginRight: "4px" }}>Date of join : </span> {moment(details.createdAt).format("DD-MM-YYYY")}
      </Typography>  */}
      <Box mt={2}>
        <Typography
          variant="body1"
          mt={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon
            sx={{
              fontSize: "30px",
              color: "#178feb",
              marginRight: "15px",
              verticalAlign: "middle", // Aligns the icon vertically in the middle
            }}
          />
          {details.address}
        </Typography>
        <Typography variant="body1" mt={1}>
          <PhoneIcon
            sx={{
              fontSize: "25px",
              color: "#178feb",
              marginRight: "20px",
            }}
          />
          {details.phoneNo}
        </Typography>
        <Typography
          variant="body1"
          mt={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <EmailIcon
            sx={{
              fontSize: "30px",
              color: "#178feb",
              marginRight: "15px",
              verticalAlign: "middle", // Aligns the icon vertically in the middle
            }}
          />
          {details.email}
        </Typography>
        <Typography
          variant="body1"
          mt={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <SchoolIcon
            sx={{
              fontSize: "30px",
              color: "#178feb",
              marginRight: "15px",
              verticalAlign: "middle", // Aligns the icon vertically in the middle
            }}
          />
          {details.qualification}
        </Typography>
        <Typography
          variant="body1"
          mt={1}
          mb={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/10828/10828934.png"
            alt="*"
            style={{
              height: "30px",
              width: "30px",
              verticalAlign: "middle",
              marginRight: "15px",
              filter:
                "invert(29%) sepia(72%) saturate(5023%) hue-rotate(203deg) brightness(95%) contrast(95%)",
            }}
          />
          <span>
          <Tooltip title="Click to view Aadhar Picture" placement="top">
            <a href={details.aadharPic} target="_blank" rel="noopener noreferrer">{details.aadharNo}</a>
        </Tooltip>
          </span>
        </Typography>
        <Divider/>
        <Grid container>
        <Grid item xs={6}>
        <Typography variant="body1" mt={2}>
            <span style={{ color: "#6698e1", marginRight: "4px" }}>Guardian : </span>{" "}
            {details.guardian}
          </Typography>
          <Typography variant="body1" mt={1}>
          <PhoneIcon
            sx={{
              fontSize: "25px",
              color: "#178feb",
              marginRight: "20px",
            }}
          />
          {details.guardianNo}
        </Typography> 
        </Grid>
        <Grid item xs={6} justifyContent="flex-end">
        <Button variant="contained" sx={{float:"right", marginTop:"50px"}} onClick={handleDetailsClose}>Close</Button>
        </Grid>
        </Grid>
        
         
        </Box>
      </Box>
    </div>):(<div>
        <Box
  sx={{
    marginTop: "100px",
    marginLeft: "430px",
    bgcolor: "background.paper",
    border: "2px ",
    boxShadow: 24,
    p: 4,
    width: "40%",
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
    src="/Nodata.jpg"
    alt="Image"
  />
  <Button
    variant="contained"
    sx={{ position: "absolute", bottom: "20px", right: "20px" }}
    onClick={handleDetailsClose}
  >
    Close
  </Button>
</Box>
        </div>)}
       
    </div>
  );
}
