import React, { useState } from 'react';
import { Modal, Button,FormControlLabel,
  FormControl,
  FormLabel,Divider, Step, StepLabel, Stepper,Box,Stack,TextField } from '@mui/material';

export default function BuildingForm ()  {
  // const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }; 
  
  //my logic
  const handleButtonClick = () => {
    if(activeStep === steps.length - 1){
      handleSubmit()
    }else{
      handleNext();

    }
  };

  const handleSubmit = () => {
    console.log('submit')
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // Add any additional reset logic here if needed
  };

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div >
            {/* Your form elements for Step 1 */}
            {/* <Divider aria-hidden="true" /> */}
            <Stack spacing={2}    direction="column" sx={{width:'300px',height:'300px',margin:'30px'}} >
            <TextField
                  // autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  variant="outlined"
                  required={true}
                  size="small"
                  // onChange={handleChange}
                  // helperText={
                  //   errors.username && touched.username ? (
                  //     <span style={{ color: "red" }}>{errors.username}</span>
                  //   ) : null
                  // }
                />
                <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Gender"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />
              <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Contact"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />
              <TextField
                // autoFocus
                margin="dense"
                id="username"
                label="Address"
                type="text"
                variant="outlined"
                required={true}
                size="small"
                // onChange={handleChange}
                // helperText={
                //   errors.username && touched.username ? (
                //     <span style={{ color: "red" }}>{errors.username}</span>
                //   ) : null
                // }
              />

            </Stack>
          </div>
        );
      case 1:
        return (
          <div>

            {/* Your form elements for Step 2 */}
            <input type="text" placeholder="Step 2 Field" />
          </div>
        );
      case 2:
        return (
          <div>
            {/* Your form elements for Step 3 */}
            <input type="text" placeholder="Step 3 Field" />
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      {/* <Button onClick={() => setOpen(true)}>Open Modal</Button> */}
      {/* <Modal  open={open} onClose={() => setOpen(false)}> */}
        <div>
        <Box sx={{
            bgcolor: 'background.paper',
            // boxShadow: 24,
            p: 4
            }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <div>{getStepContent(activeStep)}</div>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {/* <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button> */}
                  {/* //mine */}
                  <Button onClick={handleButtonClick}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
                {/* //min end */}
                </div>
              </div>
            )}
          </div>
          </Box>

        </div>
        {/* </Box> */}
      {/* </Modal> */}
    </div>
  );
};


// import BuildingContext from '../../ContextApi/BuildingContext'
// import React from 'react';

// export default function BuildingForm() {

//   return (
//    <div>

//    </div>
//   )
// }
