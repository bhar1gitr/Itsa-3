import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/joy/CircularProgress';

function Projects() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    team_leader: '',
    team_member1: '',
    team_member2: '',
    team_member3: '',
    year: '',
    date: '',
    githublink: '',
  });

  const [loading,setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/v1/admin/postproject', {
        title: formData.title ,
        description: formData.description,
        team_leader: formData.team_leader,
        team_member1: formData.team_member1,
        team_member2: formData.team_member2,
        team_member3: formData.team_member3,
        year: formData.year,
        date: formData.date,
        githublink: formData.githublink,
      });
  
      if (response) {
        console.log('Request successful:', response.data);
        toast.success('Project Created!');
      } else {
        console.error('Request failed with status:', response.status);
        toast.error('Error: ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error: ' + error.message);
    }finally{
      setLoading(false);
    }
  
  };

  return (
    <Container sx={{margin:'50px 100px'}}>

    <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Team Leader"
          name="team_leader"
          value={formData.team_leader}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Team Member 1"
          name="team_member1"
          value={formData.team_member1}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Team Member 2"
          name="team_member2"
          value={formData.team_member2}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Team Member 3"
          name="team_member3"
          value={formData.team_member3}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <TextField
          fullWidth
          label="GitHub Link"
          name="githublink"
          value={formData.githublink}
          onChange={handleChange}
          sx={{marginBottom:'20px'}}
        />
        <Button sx={{marginBottom:'20px'}} onClick={handleSubmit} variant="contained" color="primary">
          Submit { loading && <CircularProgress size='sm' style={{color:'white',marginLeft:'5px'}}/> }
        </Button>
      </form>
    </Container>
  );
}

export default Projects;
