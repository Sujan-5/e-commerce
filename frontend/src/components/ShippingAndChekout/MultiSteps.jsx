import {
  makeStyles,
  Typography,
  Stepper,
  StepLabel,
  Step,
} from '@material-ui/core';
import './multiSteps.css';
import React, { Fragment } from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'transparent',
    padding: theme.spacing(3),
    '& .MuiStepIcon-root': {
      color: theme.palette.primary.main,
      '&.MuiStepIcon-active': {
        color: theme.palette.secondary.main,
      },
    },
  },
}));

const MultiSteps = ({ activeStep }) => {
  const classes = useStyles();
  const mulSteps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Order Details</Typography>,
      icon: <LibraryAddCheckIcon />,
    },

    {
      label: <Typography>Success</Typography>,
      icon: <CheckCircleIcon />,
    },
  ];

  return (
    <Fragment>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {mulSteps.map((i, j) => (
            <Step
              key={j}
              active={activeStep === j ? true : false}
              completed={activeStep >= j ? true : false}
            >
              <StepLabel
                className={classes.label}
                style={{ color: activeStep >= j ? 'blue' : 'black' }}
                icon={i.icon}
              >
                {i.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </Fragment>
  );
};

export default MultiSteps;
