import { styled } from "@mui/material";

//Upload button
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

export const Loader = styled('div')({
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
})

