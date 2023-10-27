import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Grid, Avatar, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/joy/CircularProgress';

const Event = () => {

  const [eventData, setEventData] = useState({
    title: '',
    description: ''
  });

  const initialFormData = {
    title: '',
    description: ''
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('description', eventData.description);
      formData.append('my_file', selectedFile);
      console.log(eventData);
      console.log(selectedFile);
      const response = await axios.post('http://localhost:4000/api/v1/post', formData);
      console.log(response);
      toast.success('Event Created!');
    } catch (error) {
      console.log(error);
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
      setEventData(initialFormData);
    }

  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <Container maxWidth="sm">
        <form style={{ margin: '118px 0px' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title Name"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Button
            sx={{ mt: 3, mb: 3 }}
            onChange={handleFileChange}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>

          <Button sx={{ mt: 3, mb: 3,marginLeft:'20px' }} type="submit" variant="contained" color="primary">
            Post Event {loading && <CircularProgress size='sm' style={{ color: 'white', marginLeft: '5px' }} />}
          </Button>


        </form>
      </Container>
    </>
  )
}

export default Event