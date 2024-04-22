import { useState } from "react"
import { Box, FormControl,Stack, TextField, Typography } from "@mui/material"

export default function GuestForm() {
    const [guest, setGuest] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        phoneNo: '',
        email: '',
        address: '',
        aadharNo: '',
        aadharPic: '',
        qualification: '',
        guardian: '',
        guardianNo: '',
        dateOfJoin: '',
        rentDate: ''

    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Box
            sx={{
                marginTop: '100px',
                marginLeft: 'auto',
                marginRight: 'auto',
                //border: '2px solid black',
                width: '70%'
            }}
        >
            <Typography
                variant="h4"
                fontFamily="Roboto"
                textAlign="center"
            >
                Guest Resgistration Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{width: '100%'}}>
                <Stack spacing={2} direction='column'>
                    <TextField
                        id="name"
                        name="name"
                        label="Guest Name"
                        variant="outlined"
                        type="text"
                        autoFocus
                        margin="dense"
                        value={formData.roomNo}
                    />
                </Stack> 
                </FormControl>
            </form>
        </Box>
    )
}