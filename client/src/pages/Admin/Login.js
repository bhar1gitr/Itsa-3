import { useNavigate } from 'react-router-dom'
import React,{ useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Login = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const response = await axios.post('http://localhost:4000/api/v1/admin/login', {
        username: username,
        password: password,
      }, {
        withCredentials: true, // Send cookies with the request
      });
  
      console.log(response);
  
      // Check the response status or data to determine success or failure
      if (response.status === 200 && response.data.status === 200) {
        // Show a success toast
        toast.success('Login successful');
        navigate('/admin-dashboard');
      } else {
        // Show an error toast
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      // Show an error toast for network or server errors
      toast.error('An error occurred. Please try again later.');
    }
  };
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <ToastContainer/>
      <Paper style={{ padding: '20px', maxWidth: '400px' }} elevation={3}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
