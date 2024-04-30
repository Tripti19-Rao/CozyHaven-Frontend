import { useState, useContext } from "react";
import axios from "axios"
import SearchContext from "../../ContextApi/searchContext";
import {
  TextField,
  Rating,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { isEmpty } from "lodash";
import { toast, ToastContainer,Bounce } from "react-toastify";
import { FadeLoader  } from 'react-spinners';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function AddReview(props) {
  const { searchDispatch } = useContext(SearchContext);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [serverErrors, setServerErrors] = useState("")
  const [clientErrors, setClientErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const errors = {};
  const [formData, setFormData] = useState({
    finderId:props.finderid,
    name: "",
    stars: 0,
    description: "",
  });

  const buildingid = props.buildingid

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDecriptionChange = (event) => {
    const newValue = event.target.value; // Extract the new value from the event
    setFormData({ ...formData, description: newValue });
  };

  const handleStarsChange = (event, newValue) => {
    handleChange({ target: { name: "stars", value: newValue } });
  };
  const handleAnonymousToggle = () => {
    setIsAnonymous(!isAnonymous);
    handleChange({
      target: { name: "name", value: isAnonymous ? "" : "Anonymous" },
    });
  };

  const validations = () => {
    if(formData.stars<=0){
      errors.stars = "Rating is required"
    }
    if(!formData.description.trim().length){
      errors.description = "Description is required"
    }
    if(formData.description.trim().length > 500){
      errors.description = "Description cannot be more than 500 characters long"
    }
  };

  const handleSubmit = async () => {
    validations()
    if(isEmpty(errors)){
      setLoading(true)
      try{
       const review = await axios.post(`http://localhost:3055/api/${buildingid}/reviews`,formData,{
        headers:{
          Authorization:localStorage.getItem('token')
        }
       })
       searchDispatch({type:'UPDATE_REVIEW',payload:review.data})
       const response = await axios.get(
        `http://localhost:3055/api/buildings/one/${buildingid}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      searchDispatch({ type: "SET_BUILDING", payload: response.data });
        setClientErrors({})
        setServerErrors("")
        setLoading(false)
        props.handleReviewClose()
      }
      catch(err){
        setServerErrors(err.response.data.error)
        setLoading(false)
      }
    }
    else{
      setClientErrors(errors)
    }
  };



  if (serverErrors ) {
    toast.error(serverErrors, {
      position: "top-center",
      autoClose: 5000,
      onClose: ()=>{
        props.handleReviewClose()
      },
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
    <div>
 
              <ToastContainer />
            {/* <ToastContainer position="top-center" /> */}
            {loading && (
              <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
                width: "150px", // Adjust width to match the spinner size
                height: "150px", // Adjust height to match the spinner size
                backgroundColor: "rgba(255, 255, 255)", // Adjust background color to make it less transparent
                borderRadius: "10px", // Optional: Add border-radius for a nicer look
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
                <FadeLoader  color="#007FFF" />
              </div>
            )}
      <HtmlTooltip
        arrow
        title={
          <>
            <Typography color="inherit">Want to be Anonymous?</Typography>
            {"Click here to post your review anonymously?"}
          </>
        }
      >
        {" "}
        <IconButton
          sx={{
            color: isAnonymous ? "blue" : "grey",
            backgroundColor: isAnonymous ? "#ededed" : "transparent",
            display: "block",
            marginLeft: "285px ",
          }}
          onClick={handleAnonymousToggle}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/634/634795.png"
            alt="pic"
            style={{
              height: "30px",
              width: "30px",
              filter: isAnonymous
                ? "invert(29%) sepia(72%) saturate(5023%) hue-rotate(203deg) brightness(95%) contrast(95%)"
                : "none", // Invert icon color if anonymous
            }}
          />
        </IconButton>
      </HtmlTooltip>
      <br />
      <Rating
        name="half-rating"
        precision={0.5}
        size="large"
        value={parseFloat(formData.stars)}
        onChange={handleStarsChange}
        //onBlur={handleBlur}
        style={{ marginBottom: "10px" }}
      />
              { clientErrors.stars ? (
          <Typography variant="body2" color="error">
            Rating is required
          </Typography>
        ):(<Typography variant="body2" color="text.secondary">
        Select your rating
      </Typography>)}
      <TextField
        margin="dense"
        id="name"
        label="Write your description here"
        type="text"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        //error={errors.username && touched.username}
        value={formData.description}
        onChange={handleDecriptionChange}
        error={clientErrors.description}
        helperText={
          clientErrors.description && (
            <span style={{ color: "red" }}>{clientErrors.description}</span>
          )
        }
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#5785FD",
          marginLeft: "250px ",
          marginTop: "10px",
          width: "100px",
        }}
      >
        Submit
      </Button>
    </div>
  );
}
