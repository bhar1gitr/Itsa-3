import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/fetchFaculty');
      setFaculty(response.data.faculty);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFaculty()
  }, []);

  return (
    <Container sx={{margin:'50px auto'}} maxWidth="lg">
      <Grid container spacing={3}>
        {faculty.map((facultyMember, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="250"
                image={facultyMember.image}
                alt="Faculty Member"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  {facultyMember.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {facultyMember.designation}
                </Typography>
                {/* <Typography variant="body2">
                  {facultyMember.description}
                </Typography> */}
                <Button  onClick={() => navigate(`/faculty/${facultyMember._id}`)}>View Profile</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Faculty;
