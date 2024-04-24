import {
  styled,
  Typography,
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import moment from "moment";

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

const ScrollableContainer = styled("div")({
    height: "500px", 
    overflowY: "auto", 
  });
  

export default function GuestPayment(props) {
  const { payment } = props;
  console.log("element is ", payment);
  return (
    <div style={{}}>
      <Typography variant="body1" textAlign="center" fontSize="25px" mb={2}>
        {payment.name}'s Payment history
      </Typography>
      <ScrollableContainer>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl</StyledTableCell>
              <StyledTableCell align="right">Payment Date</StyledTableCell>
              <StyledTableCell align="right">Rent Status</StyledTableCell>
              <StyledTableCell align="right">Rent Status</StyledTableCell>
              <StyledTableCell align="right">Rent Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payment.paymentHistory.map((row, index) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.updatedAt).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.paymentType}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </ScrollableContainer>
    </div>
  );
}
