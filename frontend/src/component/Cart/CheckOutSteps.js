import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function CheckOutSteps({active}) {
    const steps = [
        'جزئیات خرید','تائید سفارش','پرداخت'
        ];
  return (
    <div className='checkOutSteps'>
             <Box sx={{ width: '100%' }}>
      <Stepper activeStep={active} alternativeLabel >
        {steps.map((label) => (
          <Step key={label} >
            <StepLabel >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
  )
}

export default CheckOutSteps
