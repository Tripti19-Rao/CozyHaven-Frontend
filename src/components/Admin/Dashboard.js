import {useContext, useEffect, useState} from 'react'
import AdminContext from "../../ContextApi/AdminContext"
import { Grid, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import Chart from 'chart.js/auto';


export default function Dashboard() {

  const { admin } = useContext(AdminContext)
  console.log(admin)

  const [usersChart, setUsersChart] = useState(null);
  const [buildingsChart, setBuildingsChart] = useState(null)
  //const [buildingsData, setBuildingsData] = useState(null)


 useEffect(() => {
  if (admin && !isEmpty(admin.users) && !isEmpty(admin.buildings)) {
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
}, [admin, usersChart, buildingsChart]);



  return (
    <div style={{ marginTop: "90px", width:"75%", marginLeft: "auto", marginRight:"auto"}}>
    {isEmpty(admin) ? 'Loading' : (
        <div>
        <Typography
        variant="body1"
        fontFamily='Roboto'
        fontWeight="bold"
        textAlign="center"
        fontSize="35px"
        //marginTop="100px"
      >
        Welcome Admin
      </Typography>
      <Grid container sx={{display: 'flex', marginTop: '30px',marginLeft:'auto',marginRight: 'auto',width: '70%'}}>
        <Grid item xs={6} sx={{
          position: 'relative',
          height:'400px',
          width:'400px'
        }}>
          <canvas id='myChart' ></canvas>
        </Grid>
        <Grid item xs={6} sx={{
          position: 'relative',
          height:'400px',
          width:'400px'
        }}>
        <canvas id='buildingChart' ></canvas>
        </Grid>
      </Grid>
        </div>
        
      )}
    </div>
  )
}
