import { styled } from "@mui/material/styles"
import {Card} from '@mui/material'

export const StyledCard = styled(Card)({
    transition: 'box-shadow 0.3s',
    '&:hover': {
      //backgroundColor: '#f0f0f0',
      //textDecoration: "underline",
      color: "#5785FD", // Change to desired hover color
      '& .blue': {
        color: "#5785FD"
      },
      boxShadow: '10px 10px 8px rgba(0, 0, 0, 0.1)'
    },
    cursor: 'pointer', // Change cursor to pointer on hover
  });

export const ImageContainer = styled('div')({
  position: 'relative',
  width: '850px',
  height: '430px',
});

// Create a styled component for the image
export const RoundedImage = styled('img')({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  // width: '850',
  // height: '430',
  borderRadius: '10px', // Adjust as needed
});

// Create a styled component for the overlay
export const Overlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
  padding: '10px', // Adjust padding as needed
  borderBottomLeftRadius: '10px', // Match image border radius
  borderBottomRightRadius: '10px', // Match image border radius
});

// Create a styled component for the information
export const Info = styled('div')({
  color: 'white',
  display: 'flex',
  alignItems: 'center'
});

//upload button
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
