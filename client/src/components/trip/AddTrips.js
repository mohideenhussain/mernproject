import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useForm, FormProvider } from "react-hook-form";
import AddRoute from '../../layout/addroute/AddRoute';
import Stoppings from '../../layout/stopping/Stoppings';
import SeatsInfo from '../seats_info/SeatsInfo'
import { useDispatch, useSelector } from 'react-redux';
import { createRoute, createStoppings, createSeats } from '../../redux/actions/seatActions';


const Header = styled('div')`
width:100%;
display:flex;
`

const steps = ['Add route', 'Boarding/Dropping points', 'Assign seats'];


const AddTrips = () => {

  const methods = useForm({
    defaultValues: {
      starting_point: '',
      destination_point: '',
      departure_date: null,
      arrival_date: null,
      boardings: [{
        name: '',
        address: '',
        district: '',
        pincode: '',
        landmark: '',
        arrival_time: null
      }],
      droppings: [{
        name: '',
        address: '',
        district: '',
        pincode: '',
        landmark: '',
        arrival_time: null
      }],
      bus_type: '',
      bus_name: '',
      bus_total: null,
      seats: [
        {
          coloumn: '',
          fare: '',
          is_available: '',
          row: '',
          seat_id: '',
          z_index: '',
          ladies_seat: ''
        }
      ]
    }
  })

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [error, setError] = React.useState({});

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.seatReducer.seatChart)
  const errorAPI = useSelector((state) => state.seatReducer.error)

  React.useEffect(() => {
    console.log(selector)
  }, [selector])

  React.useEffect(() => {
    setError(errorAPI)
  }, [errorAPI])



  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep)


  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleData = (data, completed) => {
    switch (completed) {
      case 0:
        return dispatch(createRoute(data))
      case 1:
        return dispatch(createStoppings(data, selector?._id))
      case 2:
        return dispatch(createSeats(data, selector?._id))
      default:
        return 'nothing';
    }
  }

  const handleComplete = (data) => {

    handleData(data, completedSteps())
    
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      console.log(completedSteps())
      handleNext();
    

  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };



  const switchForms = () => {
    switch (activeStep) {
      case 0:
        return <AddRoute />
      case 1:
        return <Stoppings />
      case 2:
        return <SeatsInfo />
      default:
        return (<div>Not Found</div>)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Header>
        <Chip sx={{ m: 2, p: 3, width: '100%', fontSize: '1.2rem', margin: '16px 0' }} label="ROUTE DETAILS" color="primary" />
      </Header>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FormProvider {...methods} >
              <Box
                component="form"
                onSubmit={methods.handleSubmit(handleComplete)}
                noValidate
                autoComplete="off"
                sx={{ flexDirection: 'row', pt: 2 }}
              >
                {switchForms(activeStep)}
                <Header style={{ 'padding': '10px' }}>
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button variant="outlined" onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>

                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button variant="contained" type='submit'>
                        {completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Save & Proceed'}
                      </Button>

                    ))}
                </Header>
              </Box>
            </FormProvider>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

export default AddTrips;
