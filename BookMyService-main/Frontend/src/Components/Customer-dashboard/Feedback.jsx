import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Rating,
  Box,
} from '@mui/material';

const FeedbackCard = ({ serviceRating, employeeRating, feedbackText }) => {
  return (
    <Card style={{ backgroundColor: '#f4f7f9', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f0e68c', borderRadius: '10px' }}>
              <Typography variant="h6">Service Rating</Typography>
              <Rating name="service-rating" value={serviceRating} readOnly />
              <Typography variant="body1">
                {['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][
                  serviceRating - 1
                ]}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '10px', textAlign: 'center', backgroundColor: '#ffb6c1', borderRadius: '10px' }}>
              <Typography variant="h6">Employee Rating</Typography>
              <Rating name="employee-rating" value={employeeRating} readOnly />
              <Typography variant="body1">
                {['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][
                  employeeRating - 1
                ]}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Paper elevation={3} style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px' }}>
            <Typography variant="h6">Feedback</Typography>
            <Typography variant="body1">{feedbackText}</Typography>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
