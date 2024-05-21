import { useState } from "react"
import { Box, FormControl,Stack, TextField, Typography, Alert, IconButton, RadioGroup, FormControlLabel,Radio, FormHelperText,Button } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup";
//import {FormGroup,Input} from 'reactstrap'
import {VisuallyHiddenInput} from './styles'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import {toast , ToastContainer} from 'react-toastify' 
import { Loader } from "../Owner/styles";
import { FadeLoader  } from 'react-spinners';


export default function GuestForm() {
    const {buildingid} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [serverErrors,setServerErrors] = useState('')
    const [aadharPic, setAadharPic] = useState({
        pic: null,
        error: ''
    })
    let aadharError = ''

    const [profile, setProfile] = useState({
        pic: null,
        error: ''
    })
    let profileError = ''

    //yup validations
    const basicSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        gender: yup      
            .string()
            .oneOf(["female", "male", "others"], "Please select the gender")
            .required('Gender is required'),
        age: yup
            .string()
            .matches(/^[0-9]+$/, 'Age must be a number')
            .required('Age is required'),
        dob: yup
            .date()
            .required('Date of birth is required'),
        phoneNo: yup
            .string()
            .matches(/^[0-9]+$/, 'Contact must be a number')
            .min(10, 'Contact must contain 10 digits')
            .max(10, 'Contact must contain 10 digits')
            .required('Contact Number is required'),
        address: yup
            .mixed()
            .required('Address is required'),
        aadharNo: yup
            .string()
            .matches(/^[0-9]+$/, 'Aadhar Number must be a number')
            .min(12, 'Aadhar Number must contain 12 digits')
            .max(12, 'Contact must contain 12 digits')
            .required('Aadhar Number is required'),
        qualification: yup
            .string()
            .required('Qualification is required'),
        guardian: yup
            .string()
            .required('Guardian Name is required'),
        guardianNo: yup
            .string()
            .matches(/^[0-9]+$/, 'Guardian Number must be a number')
            .min(10, 'Guardian Number must contain 10 digits')
            .max(10, 'Guardian Number must contain 10 digits')
            .required('Guardian Number Number is required')
            
    })

    const picValidations = () => {
        if(!aadharPic.pic) {
            aadharError = 'Aadhar Picture is required'
        }
        if(!profile.pic) {
            profileError = 'Profile is required'
        }

    }
    //handle submit
    const onSubmit =  async (values, actions) => {
        picValidations()
        if(!aadharError && !profileError) {
            try {
                setAadharPic({...aadharPic, error: ''})
                setProfile({...profile, error: ''})

                setLoading(true)
                const formData = new FormData()
                formData.append('name',values.name)
                Object.entries(profile.pic).forEach(ele => {
                    formData.append('profile',ele[1])
                })
                formData.append('gender',values.gender)
                formData.append('age',values.age)
                formData.append('dob',values.dob)
                formData.append('phoneNo',values.phoneNo)
                formData.append('address',values.address)
                formData.append('aadharNo',values.aadharNo)
                Object.entries(aadharPic.pic).forEach(ele => {
                    formData.append('aadharPic',ele[1])
                })
                formData.append('qualification',values.qualification)
                formData.append('guardian',values.guardian)
                formData.append('guardianNo',values.guardianNo)
                formData.append('isComplete',true)
                console.log('formData',JSON.stringify(formData))

                const token = localStorage.getItem('token')

                const response = await axios.put(`http://localhost:3055/api/buildings/${buildingid}/guests`,formData,{
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response.data)
                setLoading(false)
                actions.resetForm()
                setServerErrors('')
                //remove buildingId from localStorage
                localStorage.removeItem('buildingId')
                
                toast.success("Successfully Registered!",{
                    autoClose:1000,
                    onClose:()=>navigate('/search')
                  });
            } catch(err) {
                console.log(err)
                setServerErrors('Please ensure all the fields are filled correctly.. Encountered server error!')
            }
            setAadharPic({...aadharPic, error: ''})

        } else {
            setAadharPic({...aadharPic, error: aadharError})
            setProfile({...profile, error: profileError})
            console.log(aadharError)
        }

    }

    const {values, errors, touched, handleChange, handleBlur,handleSubmit,setFieldValue} = useFormik({
        initialValues: {
            name: '',
            gender: '',
            age: '',
            dob: '',
            phoneNo: '',
            address: '',
            aadharNo: '',
            //aadharPic: '',
            qualification: '',
            guardian: '',
            guardianNo: '',
        },
        validationSchema: basicSchema,
        onSubmit
    })
    // console.log('formik',values,'aadhar',values.aadharPic)
    // console.log('errors',errors)

    //Remove aadhar picture
  const handleAadharRemove= () => {;
    setAadharPic({...aadharPic, pic: null})
  };

   //Remove Profile picture
   const handleProfileRemove = () => {;
    setProfile({...profile, pic: null})
  };

    

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >   
            <ToastContainer position='top-center'/>
            <img
            src='../../guest.jpg'
            alt="Background"
            style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: -1, // Place the image behind other elements
            width: '500px', // Adjust the width as needed
            height: '600px', // Adjust the height as needed
            }}
        />
        
        <Box
            sx={{
                marginTop: '100px',
                marginLeft: '35%',
                marginRight: 'auto',
                marginBottom: '20px',
                border: '2px solid #d1d1d1',
                borderRadius: '10px',
                padding: '30px',
                width: '44%',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            {loading && (
            <Loader>
                <FadeLoader  color="#007FFF" />
            </Loader>
        )}
            <Typography
                variant="h4"
                fontFamily="Roboto"
                textAlign="center"
                mb={2}
            >
                Guest Resgistration Form
            </Typography>

            {serverErrors && 
                <Alert severity='error' style={{position: 'sticky', marginBottom: '20px'}}>
                    {serverErrors}
                </Alert>
            }
            <form >
                <FormControl sx={{width: '100%'}}>
                <Stack spacing={2} direction='column'>
                    <TextField
                        id="name"
                        name="name"
                        label="Guest Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        autoFocus
                        margin="dense"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name}
                        helperText={
                            errors.name && touched.name ? (
                                <span style={{color: 'red'}}>{errors.name}</span>
                            ) : null
                        }
                    />
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        size="small"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        //style={{ width: textwidth }}
                    >
                        Upload your Profile Picture
                        <VisuallyHiddenInput
                        type="file"
                        name="profile"
                        onChange={(e)=>{
                            setProfile({...profile, pic: e.target.files})
                        }}
                        />
                    </Button>
                        {profile.error && (
                            <FormHelperText style={{ color: "red", marginLeft: "15px" }}>
                            {profile.error}
                            </FormHelperText>
                        )}
                        {profile.pic && (
                            <p>
                            Selected file : {profile.pic[0].name}
                            <IconButton
                                sx={{ color: "black" }}
                                onClick={handleProfileRemove}
                            >
                                <CloseIcon />
                            </IconButton>
                            </p>
                        )}
                    <Box
                        sx={{
                            border: errors.gender ? '1px solid red' : '',
                            borderRadius: errors.gender ? '3px' : '',
                            //borderBottom: errors.gender ? '1px solid red' : '',
                        }}
                    >
                     <Typography
                            fontSize='16px'
                            ml={1}
                            
                            color={errors.gender ? 'rgba(255, 0, 0, 0.7)' : 'text.secondary'}
                        >
                            Gender
                        </Typography>
                    <RadioGroup
                        row
                        style={{marginTop: '0px',paddingLeft: '10px'}}
                        id="gender-label"
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={values.gender}
                        onChange={(e) => {
                            handleChange(e)
                            setFieldValue('gender',e.target.value)
                        }}
                        onBlur={handleBlur}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male"  />
                        <FormControlLabel value="others" control={<Radio />} label="Others"/>
                        
                    </RadioGroup>
                    </Box>
                    <FormHelperText style={{color: 'red',marginTop: '3px',marginLeft: '10px'}}>{errors.gender}</FormHelperText>
                    <FormControl>
                    <TextField
                        id="age"
                        name="age"
                        label="Age"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="dense"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.age && touched.age}
                        helperText={
                            errors.age && touched.age ? (
                                <span style={{color: 'red'}}>{errors.age}</span>
                            ) : null
                        }
                    />
                    <Typography 
                        htmlFor="dob"
                        fontSize='16px'
                        ml={1}
                        color={errors.dob && touched.dob ? 'rgba(255, 0, 0, 0.7)' : 'text.secondary'}
                    >
                        Date of Birth
                    </Typography>
                    <TextField
                        id="dob"
                        name="dob"
                        //label="Date of birth"
                        variant="outlined"
                        size="small"
                        type="date"
                        margin="dense"
                        //InputProps={{ style: { color: 'transparent' } }}
                        placeholder="Date of birth"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.dob && touched.dob}
                        helperText={
                            errors.dob && touched.dob ? (
                                <span style={{color: 'red'}}>{errors.dob}</span>
                            ) : null
                        }
                    />
                    </FormControl>
                    <TextField
                        id="phoneNo"
                        name="phoneNo"
                        label="Contact Number"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="dense"
                        value={values.phoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phoneNo && touched.phoneNo}
                        helperText={
                            errors.phoneNo && touched.phoneNo ? (
                                <span style={{color: 'red'}}>{errors.phoneNo}</span>
                            ) : null
                        }
                    />
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        variant="outlined"
                        //type="textarea"
                        multiline
                        rows={4}
                        margin="dense"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.address && touched.address}
                        helperText={
                            errors.address && touched.address ? (
                                <span style={{color: 'red'}}>{errors.address}</span>
                            ) : null
                        }
                    />
                    {/* <FormGroup>
                    <InputLabel htmlFor="address">Date of Birth</InputLabel>
                    <Input
                    id="address"
                    name="address"
                    type="textarea"
                    />
                    </FormGroup> */}
                    <TextField
                        id="aadharNo"
                        name="aadharNo"
                        label="Aadhar Number"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="dense"
                        value={values.aadharNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.aadharNo && touched.aadharNo}
                        helperText={
                            errors.aadharNo && touched.aadharNo ? (
                                <span style={{color: 'red'}}>{errors.aadharNo}</span>
                            ) : null
                        }
                    />
                    {/* <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        //style={{ width: textwidth }}
                    >
                        Upload your Aadhar Picture
                        <VisuallyHiddenInput
                        type="file"
                        name="aadharPic"
                        onChange={handleChange}
                        />
                    </Button>
                        {errors.aadharPic && (
                            <FormHelperText style={{ color: "red", marginLeft: "15px" }}>
                            {errors.aadharPic}
                            </FormHelperText>
                        )}
                        {values.aadharPic && (
                            <p>
                            Selected file : {values.aadharPic}
                            <IconButton
                                sx={{ color: "black" }}
                                onClick={handleProfileRemoveFile}
                            >
                                <CloseIcon />
                            </IconButton>
                            </p>
                        )} */}
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        size="small"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        //style={{ width: textwidth }}
                    >
                        Upload your Aadhar Picture
                        <VisuallyHiddenInput
                        type="file"
                        name="aadharPic"
                        onChange={(e)=>{
                            setAadharPic({...aadharPic, pic: e.target.files})
                        }}
                        />
                    </Button>
                        {aadharPic.error && (
                            <FormHelperText style={{ color: "red", marginLeft: "15px" }}>
                            {aadharPic.error}
                            </FormHelperText>
                        )}
                        {aadharPic.pic && (
                            <p>
                            Selected file : {aadharPic.pic[0].name}
                            <IconButton
                                sx={{ color: "black" }}
                                onClick={handleAadharRemove}
                            >
                                <CloseIcon />
                            </IconButton>
                            </p>
                        )}
                    <TextField
                        id="qualification"
                        name="qualification"
                        label="Qualification"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="dense"
                        value={values.qualification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.qualification && touched.qualification}
                        helperText={
                            errors.qualification && touched.qualification ? (
                                <span style={{color: 'red'}}>{errors.qualification}</span>
                            ) : null
                        }
                    />
                    <TextField
                        id="guardian"
                        name="guardian"
                        label="Guardian Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="dense"
                        value={values.guardian}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.guardian && touched.guardian}
                        helperText={
                            errors.guardian && touched.guardian ? (
                                <span style={{color: 'red'}}>{errors.guardian}</span>
                            ) : null
                        }
                    />
                    <TextField
                        id="guardianNo"
                        name="guardianNo"
                        label="Guardian Number"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="dense"
                        value={values.guardianNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.guardianNo && touched.guardianNo}
                        helperText={
                            errors.guardianNo && touched.guardianNo ? (
                                <span style={{color: 'red'}}>{errors.guardianNo}</span>
                            ) : null
                        }
                    />
                </Stack> 
                <Button 
                        type="submit"
                        variant="contained"
                        sx={{width: '30%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '20px'
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
        </Box>
        </Box>
    )
}