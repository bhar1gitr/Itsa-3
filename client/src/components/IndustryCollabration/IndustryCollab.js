import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import { Container } from "@mui/material";
import Card from "./Cards";
import Grid from '@mui/joy/Grid';

const IndustryCollab = () => {
    const [events,setEvents] = useState([]);
    const loadEvents = async()=>{
      const res = await axios.get('http://localhost:4000/api/v1/getIndustryCollab');
      setEvents(res.data);
    }
    useEffect(()=>{
      loadEvents();
    },[]);
  return (
    <Container style={{
        marginTop: "50px"
      }}
        fluid
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
         {
          events.map((events)=>{
            return(
              <Grid item xs={2} sm={4} md={4}>
                <Card
                  title={events.title}
                  image={events.image}
                />
              </Grid>
            )
          })
         }
        </Grid>
      </Container>
  )
}

export default IndustryCollab