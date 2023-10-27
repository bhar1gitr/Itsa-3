import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const DetailedFaculty = () => {
  const { id } = useParams();
  const [detailedFaculty, setDetailedFaculty] = useState({});

  const loadFaculty = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getSelectedEvent/${id}`);
      setDetailedFaculty(response.data.faculty);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadFaculty();
  }, [id]);

  return (
    <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={detailedFaculty.image} alt={detailedFaculty.title} style={{ height:'400px',width: '400px',borderRadius:'50%', margin:'50px 380px' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{textAlign:'center'}} variant="h4" gutterBottom>
              {detailedFaculty.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{textAlign:'center'}} variant="subtitle1" color="textSecondary">
              {detailedFaculty.designation}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{textAlign:'justify',margin:'0px 300px'}} variant="body1">
              {detailedFaculty.description}
            </Typography>
          </Grid>
        </Grid>
    </Container>
  );
}

export default DetailedFaculty;
