import {useState} from 'react'
import {isEmpty} from 'lodash'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Grid,Box,Typography,FormControl,TextField,Button,Stack,Alert,Divider} from '@mui/material'
// import toast, { Toaster } from 'react-hot-toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    const errors = {}

    const validations = () => {
        if(!email.trim().length) {
            errors.email = 'Email is required'
        }
        if(!password.trim().length) {
            errors.password = 'Password is required'
        } else if(!(password.trim().length >= 8 && password.trim().length <= 128)) {
            errors.password = 'Password must be between 8 to 128 characters long'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        validations()
        if(isEmpty(errors)) {
            try {
                setClientErrors({})
                const response = await axios.post('http://localhost:3055/api/users/login',formData)
                const token = response.data.token
                localStorage.setItem('token',token)
                // toast.success('Successfully Logged In!')
                toast.success('Successfully Logged In!', {
                    autoClose: 1000,
                    onClose: () => navigate('/search')
                  })
                setServerErrors({})
                setEmail('')
                setPassword('')
                // navigate('/')
            } catch(err) {
                //alert(err.message)
                //console.log(err)
                setServerErrors(err.response.data)
            }
        } else {
            setClientErrors(errors)
        }
    }

    return (
        <div>
            <Grid container spacing={0} height='auto'>
                {/* <Toaster/> */}
                <ToastContainer/>
                <Grid item xs={6}>
                    <img
                        src='/sign.jpg'
                        alt='Login Page'
                        // width="100px"
                        // height="100px"
                        style={{margin: '100px',height: "370px"}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ backgroundColor: "#6698E1" , height:"100vh", position: "relative" }}>
                        <Box
                            height={470}
                            width={400}
                            // m={4}
                            p={4}
                            sx={{ 
                                border: "2px solid grey",
                                backgroundColor: "#FFFFFF",
                                position: "absolute",
                                top: '50%',
                                left: '50%',
                                transform: "translate(-50%,-50%)"
                            }}
                        ><Stack spacing={2} direction="column">
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                fontFamily="Squada One, cursive"
                                textAlign="center"
                                fontSize="25px"
                                >
                                CozyHaven
                            </Typography>
                            {serverErrors.errors &&
                                <Alert severity="error" style={{ position: 'sticky', marginBottom: '20px' }}>
                                    {serverErrors.errors}
                                </Alert>}
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                <Stack spacing={2} direction="column">
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        type='email'
                                        autoFocus
                                        margin="dense"
                                        sx={{ width: '350px' }}
                                        value={email}
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        required
                                        error={clientErrors.email}
                                        helperText={clientErrors.email && <span style={{color: 'red'}}>{clientErrors.email}</span>}
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        variant="outlined"
                                        type='password'
                                        margin="dense"
                                        value={password}
                                        onChange={(e) => {setPassword(e.target.value)}}
                                        required
                                        error={clientErrors.password}
                                        helperText={clientErrors.password && <span style={{color: 'red'}}>{clientErrors.password}</span>}
                                    />
                                    </Stack>
                                    {/* {serverErrors.errors && <span style={{color: 'red'}}>{serverErrors.errors}</span>} */}
                                    <Button type="submit" variant="contained" sx={{margin: '20px',marginLeft:'130px',width: '100px'}}>Log In</Button>
                                </FormControl>
                            </form>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                <Divider style={{border: "1px solid black"}}/>
                                </Grid>
                                <Grid item xs={1} style={{padding: "4px",marginLeft: "5px"}}>
                                    <Typography
                                         //variant="body1"
                                        // fontWeight="bold"
                                        fontFamily="Prociono"
                                        textAlign="center"
                                        fontSize="16px"
                                        sx={{color: "#737373"}}
                                    >OR</Typography>
                                </Grid>
                                <Grid item xs={5} style={{paddingLeft: "4px"}}>
                                <Divider style={{border: "1px solid black"}}/>
                                </Grid>
                            </Grid>
                            <Typography
                                         //variant="body1"
                                        // fontWeight="bold"
                                        fontFamily="Prociono"
                                        textAlign="center"
                                        fontSize="18px"
                                        sx={{color: "black"}}
                                    >Don't have an account? Sign Up</Typography>
                        </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* <form onSubmit={handleSubmit}>
            <FormControl>
                <TextField
                    id="email"
                    label="Enter Your Email"
                    variant="standard"
                    type='email'
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    required
                    error={clientErrors.email}
                    helperText={clientErrors.email && clientErrors.email}

                />
                {clientErrors.email && <FormHelperText>Error: Please enter your email.</FormHelperText>}
                <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    type='password'
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    required
                    error={clientErrors.password}
                    helperText={clientErrors.password && <span style={{color: 'red'}}>{clientErrors.password}</span>}

                />
                <Button type="submit" variant="contained">Log In</Button>
            </FormControl>
            </form> */}


            {/* <form onSubmit={handleSubmit}>
            {serverErrors.errors && <span style={{color: 'red'}}>{serverErrors.errors}</span>}
                <input 
                    type='email'
                    value={email}
                    placeholder='Enter Your Email'
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                {clientErrors.email && <span style={{color: 'red'}}>{clientErrors.email}</span>}
                <br/>
                <input
                    type='password'
                    value={password}
                    placeholder='Enter Password'
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                {clientErrors.password && <span style={{color: 'red'}}>{clientErrors.password}</span>}
                <br/>
                <input type="submit"/>
            </form> */}
            
        </div>
    )
}