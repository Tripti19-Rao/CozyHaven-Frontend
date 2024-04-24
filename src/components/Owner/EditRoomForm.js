import {Box,FormControl,TextField,Button,Stack,Alert,IconButton, FormHelperText} from '@mui/material'
import { useState } from 'react'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { isEmpty } from 'lodash';
import { VisuallyHiddenInput } from './styles';
import axios from 'axios';
import React from 'react';
import { Loader } from './styles';
import { FadeLoader  } from 'react-spinners';
import Swal from 'sweetalert2'


export default function EditRoomForm(props) {
    const {rooms,roomId,roomsDispatch,buildingId, handleEditClose} = props
    const [loading, setLoading] = useState(false)
    
    const room = rooms.data.find(ele => ele._id === roomId)
    console.log(rooms,room)

    const [form, setForm] = useState({
        roomNo: room.roomNo,
        pic: room.pic,
        sharing: room.sharing,
        amount: room.amount
    })

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
        //console.log(form.sharing,'inside valid',isEmpty(form.sharing))
        if(!form.sharing) {
            errors.sharing = 'Sharing is required'
        } else if(String(+form.sharing) === 'NaN') {
            errors.sharing = 'Sharing must be a number'
        } else if(+form.sharing <= 0) {
            errors.sharing = 'Sharing must be greater than 0'
        }
        if(!form.amount) {
            errors.amount = 'Amount is required'
        } else if(String(+form.amount) === 'NaN') {
            errors.amount = 'Amount must be a number'
        } else if(+form.amount <= 0) {
            errors.amount = 'Amount must be greater than 0'
        }
    }

    const handleChange = async (e) => {
        const {name, value,files} = e.target
        if(name === 'pic') {
            //setForm({...form, [name]: [...form.pic, ...files]})
            try {
                const token = localStorage.getItem('token')
                setLoading(true)
                const picData = new FormData()
                for(let i = 0; i < files.length; i++) {
                    picData.append('pic',files[i])
                }
                // files.forEach(ele => {
                //     picData.append(ele)
                // })
                const picResponse = await axios.post('http://localhost:3055/api/images/roompic',picData,{
                    headers: {
                        Authorization: token
                    }
                })
                setForm({...form, [name]: [...form.pic, ...picResponse.data]})
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        } else {
            setForm({...form, [name]: value})
        }
    }
    
    //thumbnail of images start
  const ImageThumbnail = ({ imageUrl, onDelete }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          marginRight: "10px",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={imageUrl}
            alt="Thumbnail"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => onDelete(imageUrl)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  //delete the room pic
  const onDelete = (index) => {
    const updatedRoomPic = [...form.pic];
    updatedRoomPic.splice(index, 1); // Remove the image URL at the specified index
    setForm({ ...form, pic: updatedRoomPic }); // Update the state with the modified amenitiesPic array
  };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        validations() 
        if(isEmpty(errors)) {
            try {
                setLoading(true)
                roomsDispatch({type: 'SET_CLIENTERRORS', payload: {}})
                const token = localStorage.getItem('token')
                const response = await axios.put(`http://localhost:3055/api/${buildingId}/rooms/${roomId}`,form,{
                    headers: {
                        Authorization: token
                    }
                })
                console.log('response',response.data)
                roomsDispatch({type: 'UPDATE_ROOMS',payload: response.data})
                setLoading(false)
                roomsDispatch({type: 'SET_SERVERERRORS',payload: ''})
                Swal.fire({
                    title: "Updated!",
                    text: `Your room has been successfully updated`,
                    icon: "success"
                });
                handleEditClose()
                
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
        {loading && (
            <Loader>
                <FadeLoader  color="#007FFF" />
            </Loader>
        )}
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
            Upload Pictures of the room
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
            <React.Fragment>
            <p>Selected file : </p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
            {
                form.pic.length < 4 ? ( 
                form.pic.map((ele,i) => {
                    return (
                        <ImageThumbnail
                            key={i}
                            imageUrl={ele}
                            onDelete={() => onDelete(i) }
                        />
                    )
                })) : (
                    null
                    // <>{form.pic.length} files Uploaded</>
                )
            }
            </div>
            </React.Fragment>
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