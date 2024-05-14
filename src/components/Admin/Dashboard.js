import {useContext, useEffect, useState} from 'react'
import AdminContext from "../../ContextApi/AdminContext"
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import Chart from 'chart.js/auto';
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { useNavigate } from 'react-router-dom';



export default function Dashboard() {
  const navigate = useNavigate()
  const { admin , adminsDispatch} = useContext(AdminContext)
  console.log(admin.pendingBuildings,'pending')
  

  const [usersChart, setUsersChart] = useState(null);
  const [buildingsChart, setBuildingsChart] = useState(null)
  //const [buildingsData, setBuildingsData] = useState(null)

  
  const genderImg = (gender) => {
    //console.log(gender.charAt(0).toUpperCase() + gender.slice(1));
    if (gender === "female") {
      return "https://cdn-icons-png.flaticon.com/128/657/657051.png";
    } else if (gender === "male") {
      return "https://cdn-icons-png.flaticon.com/128/657/657052.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/128/20/20373.png";
    }
  };

  const handleClick = (id) => {
    navigate(`/review-building/${id}`)
  }

 useEffect(() => {
  if (admin && !isEmpty(admin.users) && !isEmpty(admin.buildings)) {
    console.log('afterapprove',admin.pendingBuildings)
    

    const roleCounts = admin.users.reduce((counts, user) => {
      counts[user.role] = (counts[user.role] || 0) + 1;
      return counts;
    }, {});

    if (!usersChart) {
      const ctx = document.getElementById('myChart');
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Admin', 'Owner', 'Users'],
          datasets: [{
            label: 'No. of users',
            data: [roleCounts['admin'], roleCounts['owner'], roleCounts['finder']],
            backgroundColor: [
              '#e385ab',
              '#83d2b7',
              '#5e97d1',
            ],
            borderColor: [
              'rgba(227, 133, 171, 1)',
              'rgba(131, 210, 183, 1)',
              'rgba(94, 151, 209, 1)',
            ],
            borderWidth: 1
          }]
        }
      });
      setUsersChart(newChart);
    }

    //buildings Chart
    const buildingsData = admin.buildings.reduce((status, cv) => {
      status[cv.isApproved] = (status[cv.isApproved] || 0) +1;
      return status
    },{})

    if (!buildingsChart) {
      console.log('bui',buildingsData)
      const ctx2 = document.getElementById('buildingChart');

      const newChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Accepted','Pending','Rejected'],
          datasets: [{
            label: '# of buildings',
            data: [buildingsData['Accepted'],buildingsData['Pending'],buildingsData['Rejected']],
            backgroundColor: [
              '#ff9999',
              '#99ccff', 
              '#ffff99' 
            ],
            borderColor: [
              'rgba(255, 153, 153, 1)',
              'rgba(153, 204, 255, 1)',
              'rgba(255, 255, 153, 1)'
            ],
            borderWidth: 1
          }]
        }
      });
      setBuildingsChart(newChart2);
    }
  }

  return () => {
    if (usersChart) {
      usersChart.destroy();
    }
    if (buildingsChart) {
      buildingsChart.destroy();
    }
  };
}, [usersChart, buildingsChart,admin.users, admin.buildings]);



  return (
    <Grid container height='100vh' sx={{
      //backgroundColor: '#EDF1FA'
    }}>
      {isEmpty(admin) ? 'Loading' : (
      <>
      <Grid
       item 
       xs={8}
       sx={{
        display: "flex",
        flexDirection: "column",
        // paddingLeft: "60px",
        paddingTop: "100px",
        marginLeft: '55px',
        // marginRight: 'auto',
        // width: '80%'
        // marginLeft: "35%",
       }}
      >
      <Typography
      variant="body1"
      fontFamily='Roboto'
      fontWeight="bold"
      textAlign="center"
      fontSize="35px"
      // style={{
      //   borderRadius: '20px',
      //   backgroundColor: 'white',
      // }}
      //marginTop="100px"
    >
      Welcome Admin
    </Typography>
       {admin.pendingBuildings.length ? (
        <>
          <Typography
            variant="body1"
            fontFamily='Roboto'
            fontWeight="bold"
            textAlign="center"
            fontSize="25px"
            color='text.secondary'
            // style={{
            //   borderRadius: '20px',
            //   backgroundColor: 'white',
            // }}
            marginTop="15px"
          >
            You have {admin.pendingBuildings.length} pending buildings to review for today
          </Typography>
          {admin.pendingBuildings?.map(ele => {
            return (
              <Box
              key={ele._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                marginTop: "20px",
                marginBottom: "30px",
                width: "75%", 
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <Card
                sx={{
                  
                   height: "auto",
                    //marginLeft: "300px" 
                  }}
              >
                <CardMedia
                  sx={{ height: "200px" }}
                  image={ele.profilePic}
                  title="View building"
                  // onClick={() => {
                  //   handleView(ele._id);
                  // }}
                />
                <CardContent>
                <Grid container>
                <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          "&:hover": {
                            textDecoration: "underline",
                            color: "#5785FD",
                            cursor: "pointer",
                          },
                        }}
                        // onClick={() => {
                        //   handleView(ele._id);
                        // }}
                      >
                        {ele.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ele.address}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                       sx={{ 
                      //   display: "flex",
                      //   flexDirection: 'column',
                         paddingLeft: '250px' 
                    }}
                    >
                      <Chip
                        label={
                          ele.gender.charAt(0).toUpperCase() +
                          ele.gender.slice(1)
                        }
                        avatar={<img src={genderImg(ele.gender)} alt="" />}
                        sx={{
                          backgroundColor: "#EAF5FD",
                          //marginLeft: "60px",
                          //marginTop: "15px",
                        }}
                      /><br/>
                      <Button
                      variant="contained"
                      startIcon={<ListAltOutlinedIcon />}
                      style={{
                        marginTop: '10px'
                      }}
                      onClick={() => {
                        handleClick(ele._id);
                      }}
                    >
                      View
                    </Button>
                    </Grid>
                </Grid>
                </CardContent>
              </Card>
            </Box>
            )
          })}
        </>
       ) : (
        <>
          <Typography
            variant="body1"
            fontFamily='Roboto'
            fontWeight="bold"
            textAlign="center"
            fontSize="25px"
            color='text.secondary'
            // style={{
            //   borderRadius: '20px',
            //   backgroundColor: 'white',
            // }}
            marginTop="30px"
          >
            You don't have any pending buildings to review for today
          </Typography>
          <Box
              component="img"
              style={{
                display: "block",
                marginTop: "50px",
                marginLeft: 'auto',
                marginRight: 'auto',
                height: "300px",
                width: "300px",
                maxWidth: "100%",
                borderRadius: "50%",
                objectFit: "fill",
              }}
              src="/NoBuildingsData.jpg"
              alt="Image"
            />
        </>
       )}
      </Grid>
       

    <Grid item xs={4} 
      sx={{
      //  position: "fixed",
      //  backgroundColor: "#6698E1",
      //  //backgroundColor: '#EAF5FD',
      //  height: "100vh",
      //  width: "500px",
      //  zIndex: 1, // Ensure it's above other content
      //  alignItems: "center",
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '25%', // Adjust this value as needed
      backgroundColor: '#EDF1FA', // Example background color
      borderLeft: '1px solid #ccc', // Example border
      overflowY: 'auto',
      alignItems: 'center'
      }}>
        <div style={{
          marginTop: '90px',
          padding: '10px',
          width: '85%',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '20px',
          backgroundColor: 'white'
        }}>
        <Typography
            variant="body1"
            fontFamily='Roboto'
            fontWeight="bold"
            textAlign="center"
            //fontSize="35px"
            //marginTop="100px"
          >
            Statistics of the Users
          </Typography>
        <div style={{
          position: 'relative',
          height:'250px',
          width:'250px',
          //marginTop: '100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          
        }}>
           <canvas id='myChart' ></canvas>
        </div>
        </div>
        <div style={{
          marginTop: '20px',
          padding: '10px',
          paddingBottom: '0px',
          width: '85%',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '20px',
          backgroundColor: 'white'
        }}>
        <Typography
            variant="body1"
            fontFamily='Roboto'
            fontWeight="bold"
            textAlign="center"
            //fontSize="35px"
            //marginTop="100px"
          >
            Statistics of the Buildings
          </Typography>
        <div style={{
          position: 'relative',
          height:'250px',
          width:'250px',
          // marginTop: '100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          // borderRadius: '10px',
          // backgroundColor: 'white'
        }}>
          <canvas id='buildingChart' ></canvas>
        </div>
        </div>
    </Grid>
      </>
      
    )}
    </Grid>
  )
}