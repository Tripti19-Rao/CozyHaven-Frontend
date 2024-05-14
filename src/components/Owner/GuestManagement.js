import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startSetGuest, startRemoveGuest,startStatusChart,removeStatusChart, setServerErrors } from "../../Actions/GuestActions";
import BuildingContext from "../../ContextApi/BuildingContext";
import GuestPayment from "./GuestPayment";
import GuestInformation from "./GuestInformation";
import SortIcon from '@mui/icons-material/Sort';
import {
  styled,
  Typography,
  TableCell,
  tableCellClasses,
  TableRow,
  TablePagination,
  MenuItem,
  TableContainer,
  TextField,
  Select,
  Paper,
  Table,
  TableHead,
  TableBody,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Box,
  Grid,
  Card,
  Divider
} from "@mui/material";
import moment from "moment";
import Swal from 'sweetalert2'
import { toast,Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from 'lodash'
import Chart from 'chart.js/auto';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6698e1",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function GuestManagement() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState({})
  const [paymentOpen, setPaymentOpen] = useState(false);
  const handlePaymentOpen = (obj) => {
    setPayment(obj)
    setPaymentOpen(true);
  }
  const handlePaymentClose = () => setPaymentOpen(false);

  const [details, setDetails] = useState({})
  const [detailsOpen, setsetDetailsOpen] = useState(false);
  const handleDetailsOpen = (obj) => {
    setDetails(obj)
    setsetDetailsOpen(true);
  }
  const handleDetailsClose = () =>{
    console.log("handle close clicked")
    setsetDetailsOpen(false);

  }
  const [statChart, setStatChart] = useState(null)
  const [revenueChart, setRevenueChart] = useState(null)

  const { buildings } = useContext(BuildingContext);

  const building = buildings?.data?.find((ele) => ele._id === id);

  const guests = useSelector((state) => {
    return state.guests.data;
  });
  const statusChart = useSelector((state) => {
    return state.guests.statusChart;
  });
  // const statusChart = useSelector((state) => {
  //   return state.guests.statusChart;
  // });
  const serverErrors = useSelector((state) => {
    return state.guests.serverErrors;
  });


  const [queryData, setQueryData] = useState({
    search: "",
    limit: 10,
    page: 1,
    sortBy:'roomId.amount',
    amtorder:'asc',
    stay: true,
    totalPages: guests.totalPages,
    total: guests.total,
  });

  useEffect(()=>{
    dispatch(startStatusChart(id))

  },[])
  useEffect(()=>{
    if(statusChart && !isEmpty(statusChart)){
      let statusCounts = statusChart.status.reduce((counts,ele)=>{
        counts[ele.status] = (counts[ele.status] || 0 ) +1
        return counts
      },{});
      console.log(statusCounts)
      
      if(!statChart){
        const ctx = document.getElementById('myChart');
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Success', 'Pending', 'Failed'],
          datasets: [{
            label: 'No. of users',
            data: [statusCounts['Successful'], statusCounts['Pending'], statusCounts['Failed']],
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
      setStatChart(newChart);
      }
      
      if(!revenueChart){
        const ctx2 = document.getElementById('RevenueChart');

        const newChart2 = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels:  ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
              label: 'Amount',
              data:statusChart.revenue.map(ele=>ele.amount) ,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }]
          }
        });
        setRevenueChart(newChart2);
      }
    }
    return () =>{
      if(statChart) {
        console.log("Unmounted")
        statChart.destroy()
        dispatch(removeStatusChart())

      }
    }
  },[statusChart, statChart])


  useEffect(() => {
    fetchData();
    dispatch(setServerErrors(''))
    // eslint-disable-next-line
  }, [queryData]);

  const fetchData = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("search", queryData.search);
    queryParams.append("page", queryData.page);
    queryParams.append("limit", queryData.limit);
    queryParams.append("stay", queryData.stay);
   queryParams.append("amtorder", queryData.amtorder);
    dispatch(startSetGuest(id, queryParams));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData({ ...queryData, [name]: value });
  };

  const handleMembers = () => {
    setQueryData({ ...queryData, stay: !queryData.stay , page:1 });
    
  };

  const handlePageChange = (page) => {
    setQueryData({ ...queryData, page: page });
  };

  const handleSort = () => {
    if(queryData.amtorder==='asc'){
      setQueryData({...queryData , amtorder:'desc'})
    }else{
      setQueryData({...queryData , amtorder:'asc'})

    }
  };

  
  const handleRemove = (gid) => {
    console.log('remove', id)
    Swal.fire({
      title: "Are you sure?",
      text: "You will still be able to veiw their details in previous members",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then((result)=>{
      if(result.isConfirmed){
        dispatch(startRemoveGuest(gid,id))
      }
    })
  }

  if (serverErrors) {
    toast.error(serverErrors, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }


  return (
    <div style={{ marginTop: "90px", width:"95%", marginLeft: "auto", marginRight:"auto"}}>
      {serverErrors && 
  <ToastContainer
    position="top-center"
    autoClose={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    theme="light"
    transition={Bounce} // Use curly braces for the value
  />
}
      <Typography
              variant="body1"
              fontWeight="bold"
              fontFamily="Prociono"
              textAlign="center"
              fontSize="30px"
              marginTop="50px"
            >
              {building?.name}
      </Typography>
      <Typography
              variant="body1"
              textAlign="center"
              margin="20px"
            >
              {queryData?.stay===true  ? `Currently there are ${guests.total} tenants are residing in your building`:`${guests.total} Previous tenants`}
      </Typography>
      <Grid container sx={{ marginTop: '30px',marginLeft:'auto',marginRight: 'auto'}}>
        <Grid item xs={6} sx={{
          position: 'relative',
          paddingLeft:'150px',
          height:'400px',
          width:'600px'
        }}>
        <Card sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          borderRadius: '10px',
          padding:'10px',
          height:'373px',
          width:'400px'
          
        }}>
                <Typography
              fontWeight="bold"
              textAlign="center"
            >
              Payment Statistic
      </Typography>
      <div style={{ height:'350px',
          width:'400px'}}>
      <canvas id='myChart' ></canvas>

      </div>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{
          position: 'relative',
          height:'400px',
          width:'600px'
        }}>
           <Card sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          borderRadius: '10px',
          padding:'10px'

        }}>
                <Typography
              fontWeight="bold"
              textAlign="center"
            >
              Revenue Statistic
      </Typography>
        <canvas id='RevenueChart' ></canvas>
        </Card>
        </Grid>
      </Grid>
<Divider sx={{marginBottom:'35px', marginTop:'25px'}}/>
<Typography
              variant="body1"
              fontWeight="bold"
              textAlign="center"
              fontSize="30px"
              marginBottom="20px"
            >
              Guest Management Tabel
      </Typography>
      <div >
      <Button
      endIcon={<SortIcon/>}
      sx={{marginLeft:'40px', marginTop:"20px"}} 
      onClick={() => handleSort()}>
      Rent {queryData.amtorder === "asc" ? (`Highest`):(`Lowest`)}
      </Button>

      <div style={{float:"right"}}>
      <FormControl
        variant="outlined"
        sx={{marginRight:"20px"}}
      >
        <InputLabel id="members-label">Members</InputLabel>
        <Select
          labelId="members-label"
          id="members"
          name="members"
          value={queryData.stay}
          label="Members"
          onChange={() => {
            handleMembers();
          }}
          sx={{ width: "200px" }}
        >
          <MenuItem value={true}>Current</MenuItem>
          <MenuItem value={false}>Previous</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search Name"
        value={queryData?.search}
        //size="small"
        name="search"
        sx={{ float:'right', marginBottom:'10px',marginRight:'20px' }}
        onChange={handleChange}
      />
      </div>
      </div>
      

      {guests.data && guests.data.length > 0 ? (
        <>
          <TableContainer component={Paper} 
          sx={{width:"100%", marginLeft:"10px"}}
          >
            <Table sx={{ minWidth: 700  }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Room No.</StyledTableCell>
                  <StyledTableCell align="right">Date of Join</StyledTableCell>
                  <StyledTableCell align="right">Rent</StyledTableCell>
                  <StyledTableCell align="right">Rent Status</StyledTableCell>
                  <StyledTableCell align="center">More</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guests.data 
                  .map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roomId.roomNo}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(row.createdAt).format('DD-MM-YYYY')}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roomId.amount}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                      {row.paymentHistory.length > 0 && (
                            new Date(row.paymentHistory[row.paymentHistory.length - 1].createdAt).getMonth() === new Date().getMonth() ? 
                              row.paymentHistory[row.paymentHistory.length - 1].status 
                              : 'No Record Yet'
                                                  
                        )}
                        {/* {row.paymentHistory.length >0 ? row.paymentHistory[row.paymentHistory.length-1].status : 'none'} */}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            backgroundColor: "#5785FD",
                            marginRight: "40px",
                          }}
                          onClick={()=>{handlePaymentOpen(row)}}
                        >
                          Payments
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            backgroundColor: "#5785FD",
                            marginRight: "40px",
                          }}
                          onClick={()=>{handleDetailsOpen(row)}}
                        >
                          More
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            backgroundColor: "#5785FD",
                          }}
                          disabled={row.stay===false}
                          onClick={()=>{handleRemove(row._id)}}
                        >
                          Remove
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={guests.total !== undefined ? guests.total : queryData.total}
            rowsPerPage={queryData?.limit}
            page={queryData?.page - 1}
            onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
            onRowsPerPageChange={(event) => {
              const newRowsPerPage = parseInt(event.target.value, 10);
              setQueryData((prevState) => ({
                ...prevState,
                limit: newRowsPerPage,
                page: 1,
              }));
            }}
            labelRowsPerPage="Rows per page:"
          />
        </>
      ) : (
        <Typography
          variant="body1"
          fontWeight="bold"
          fontFamily="Prociono"
          textAlign="center"
          fontSize="30px"
          margin="50px"
        >
          No guests available
        </Typography>
      )}

        <Modal
        open={paymentOpen}
        onClose={handlePaymentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginTop: "50px",
            marginLeft: "200px",
            bgcolor: "background.paper",
            border: "2px ",
            boxShadow: 24,
            p: 4,
            width: "70%",
          }}
        >
          {/* <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            EDIT YOUR PG DETAILS
          </Typography> */}
          <GuestPayment payment={payment}/>
        </Box>
      </Modal>

      <Modal
        open={detailsOpen}
        onClose={handleDetailsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
        {/* <Box
          sx={{
            marginTop: "20px",
            marginLeft: "400px",
            bgcolor: "background.paper",
            border: "2px ",
            //boxShadow: 24,
            //p: 4,
            width: "40%",
            //borderRadius:"5px",
          }}
        > */}
          
          <GuestInformation details={details} handleDetailsClose={handleDetailsClose}/>
        </Box>
      </Modal>
    </div>
    
  );
}
