import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Event = () => {
  const [comingSoonEvents, setComingSoonEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);

  const loadEvents = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/getEvents');
    const comingSoon = response.data.filter(event => event.comming_soon === true);
    const notComingSoon = response.data.filter(event => event.comming_soon === false);
    setComingSoonEvents(comingSoon);
    setOtherEvents(notComingSoon);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container style={{ marginTop: '50px' }} fluid>
      <Typography variant="h4" gutterBottom>
        Coming Soon
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
        {comingSoonEvents.map((data) => (
          <Grid item xs={2} sm={4} md={4} key={data._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 200 }} image={data.image} title="Event Image" />
              <Typography variant="h6" gutterBottom component="div">
                {data.title}
              </Typography>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {data.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography sx={{margin:'50px 0px'}} variant="h4" gutterBottom>
        Past Events
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
        {otherEvents.map((data) => (
          <Grid item xs={2} sm={4} md={4} key={data._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 200 }} image={data.image} title="Event Image" />
              <Typography variant="h6" gutterBottom component="div">
                {data.title}
              </Typography>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {data.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Event;
