import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make a POST request to your registration endpoint on the server
      const response = await axios.post('http://localhost:4000/api/v1/student/register', formData);
      console.log(response);
      // Assuming the server responds with a success message
      if (response.data.message === 'User registered successfully') {
        // You can redirect the user to a login page or display a success message
        console.log('User registered successfully');
      } else {
        // Handle the case when registration fails, e.g., duplicate email
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle any network or server error
      console.log('Registration failed');
    }
  };
  

  return (
    <Container sx={{margin:'70px auto'}} > 
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{marginTop:'20px'}}
          >
            Register
          </Button>
        </form>
    </Container>
  );
};

export default Register;
