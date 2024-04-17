import {Box,FormControl,TextField,Button,Stack,Alert,IconButton, FormHelperText} from '@mui/material'
import { useState } from 'react'
import React from 'react';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { isEmpty } from 'lodash';
import { VisuallyHiddenInput } from './styles';
import axios from 'axios';
//import { toast } from 'react-toastify';

export default function RoomForm (props) {
    const [form, setForm] = useState({
        roomNo: '',
        pic: '',
        sharing: '',
        amount: ''
    })

    const {rooms,roomsDispatch,buildingId, handleClose} = props
    const {clientErrors} = rooms
    const errors = {}

    const validations = () => {
        if(isEmpty(form.roomNo)) {
            errors.roomNo = 'Room Number is required'
        }
        if(!form.pic.length) {
            errors.pic = 'Room Pictures is required'
        } else if(form.pic.length > 20) {
            errors.pic = 'Pictures cannot be more than 20'
        }
        if(isEmpty(form.sharing)) {
            errors.sharing = 'Sharing is required'
        } else if(String(+form.sharing) === 'NaN') {
            errors.sharing = 'Sharing must be a number'
        } else if(+form.sharing <= 0) {
            errors.sharing = 'Sharing must be greater than 0'
        }
        if(isEmpty(form.amount)) {
            errors.amount = 'Amount is required'
        } else if(String(+form.amount) === 'NaN') {
            errors.amount = 'Amount must be a number'
        } else if(+form.amount <= 0) {
            errors.amount = 'Amount must be greater than 0'
        }
    }

    const handleChange = (e) => {
        const {name, value,files} = e.target
        if(name === 'pic') {
            setForm({...form, [name]: [...form.pic, ...files]})
        } else {
            setForm({...form, [name]: value})
        }
    }

    const handlePicRemoveFile = (index) => {
        const newPics = form.pic.filter((ele,i) => i !== index)
        console.log(newPics, 'i',index)
        setForm({...form, pic: newPics})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        validations() 
        if(isEmpty(errors)) {
            try {
                roomsDispatch({type: 'SET_CLIENTERRORS', payload: {}})
                const formData = new FormData()
                formData.append('roomNo',form.roomNo)
                formData.append('sharing',form.sharing)
                formData.append('amount',form.amount)
                Object.entries(form.pic).forEach(ele => formData.append('pic', ele[1]))
                // console.log('formpic',Object.entries(form.pic))
                // console.log('formdata',formData)

                const token = localStorage.getItem('token')
                const response = await axios.post(`http://localhost:3055/api/${buildingId}/rooms`,formData,{
                    headers: {
                        Authorization: token
                    }
                })
                //console.log('response',response.data)
                roomsDispatch({type: 'ADD_ROOMS',payload: response.data})
                roomsDispatch({type: 'SET_SERVERERRORS',payload: ''})
                handleClose()
            } catch(err) {
                console.log(err)
                roomsDispatch({type: 'SET_SERVERERRORS',payload: `Please ensure all the fields are filled correctly.. Encountered server error!`})
            }
        } else {
            roomsDispatch({type: 'SET_CLIENTERRORS', payload: errors})
        }
        
    }

    return (
        <Box
            sx={{
                //border: '2px solid grey',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '10px',
                width: '60%'
            }}

            
        >
            {rooms.serverErrors && 
                <Alert severity='error' style={{position: 'sticky', marginBottom: '20px'}}>
                    {rooms.serverErrors}
                </Alert>
            }
        <form onSubmit={handleSubmit}>
            <FormControl sx={{width: '100%'}}>
            <Stack spacing={2} direction='column'>
                <TextField
                    id='roomno'
                    name='roomNo'
                    label='Room Number'
                    variant='outlined'
                    type='text'
                    autoFocus
                    margin='dense'
                    //size='small'
                    value={form.roomNo}
                    onChange={handleChange}
                    error={clientErrors.roomNo}
                    helperText={clientErrors.roomNo && <span style={{color: 'red'}}>{clientErrors.roomNo}</span>}
                />
                <Button
                type='button'
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                //style={{ width: textwidth }}
                
              >
                Upload a Pictures of your room
                <VisuallyHiddenInput
                  type="file"
                  name='pic'
                  multiple
                  onChange={handleChange}
                />
              </Button>
              {clientErrors.pic && (
                <FormHelperText style={{color: 'red', marginLeft: '18px'}}>{clientErrors.pic}</FormHelperText>
              )}
              {form.pic.length > 0 && (

                <p>
                  Selected file : {
                    form.pic.length < 4 ? ( 
                    form.pic.map((ele,i) => {
                        return (
                            <React.Fragment key={i}>
                            {ele.name}
                            <IconButton
                                
                                sx={{ color: "black" }}
                                onClick={()=>{handlePicRemoveFile(i)}}
                            >
                                <CloseIcon />
                            </IconButton>
                            </React.Fragment>
                        )
                    })) : (
                        <>{form.pic.length} files Uploaded</>
                    )
                }
                </p>
              )}
             
                <TextField
                    id='sharing'
                    name='sharing'
                    label='Sharing'
                    variant='outlined'
                    type='text'
                    margin='dense'
                    //size='small'
                    value={form.sharing}
                    onChange={handleChange}
                    error={clientErrors.sharing}
                    helperText={clientErrors.sharing && <span style={{color: 'red'}}>{clientErrors.sharing}</span>}
                />
                <TextField
                    id='amount'
                    name='amount'
                    label='Amount'
                    variant='outlined'
                    type='text'
                    margin='dense'
                    //size='small'
                    value={form.amount}
                    onChange={handleChange}
                    error={clientErrors.amount}
                    helperText={clientErrors.amount && <span style={{color: 'red'}}>{clientErrors.amount}</span>}
                />
            </Stack>
            <Button type="submit" variant="contained" sx={{margin: '20px',marginLeft:'300px',width: '100px'}}>Submit</Button>
            </FormControl>
        </form>
        </Box>
    )
}