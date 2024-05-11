import { Box, Typography } from "@mui/material";

export default function UnauthorizedPage() {
    return (
        <div style={
            {
                // marginTop: '100px',
                // marginLeft: 'auto',
                // marginRight: 'auto',
                // width: '700px'

            }}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="35px"
                    fontFamily='Roboto'
                    marginTop="100px"
                >
                You are not authorized to access this page
                </Typography>
            <Box
                component="img"
                sx={{
                height: "480px",
                width: "500px",
                marginLeft:"350px",
                borderRadius: "5px",
                }}
                alt="Unauthorized"
                src="/unauthorized.jpg"
            />
        </div>
    )
}