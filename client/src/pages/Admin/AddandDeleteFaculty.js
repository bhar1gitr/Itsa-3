import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Grid,
  Avatar,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AddandDeleteFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [updateLoading, setUpdateLoading] = useState({});
  const [facultyData, setFacultyData] = useState({
    title: '',
    designation: '',
    description: '',
  });

  const initialFormData = {
    title: '',
    designation: '',
    description: '',
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create a map to store the input values for each row by faculty ID
  const [rowInputValues, setRowInputValues] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const handleRowInputChange = (facultyId, name, value) => {
    setRowInputValues((prevInputValues) => ({
      ...prevInputValues,
      [facultyId]: {
        ...prevInputValues[facultyId],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', facultyData.title);
      formData.append('designation', facultyData.designation);
      formData.append('description', facultyData.description);
      formData.append('my_file', selectedFile);
      console.log(facultyData);
      console.log(selectedFile);
      const response = await axios.post(
        'http://localhost:4000/api/v1/postFaculty',
        formData
      );
      console.log(response);
      toast.success('Faculty Created!');
      setFacultyData(initialFormData);
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculty = async () => {
    try {
      const facultyResponse = await axios.get(
        'http://localhost:4000/api/v1/fetchFaculty'
      );
      setFaculty(facultyResponse.data.faculty);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      setDeleteLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
      const response = await axios.delete(
        `http://localhost:4000/api/v1/admin/deleteFaculty/${id}`
      );
      toast.success('Faculty Deleted!!!');
    } catch (error) {
      console.error(error);
      toast.error('Error: ' + error.message);
    } finally {
      setDeleteLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
    }
  };

  const updateFaculty = async (id) => {
    try {
      setUpdateLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
      const formData = new FormData();
      formData.append('title', rowInputValues[id].title);
      formData.append('designation', rowInputValues[id].designation);
      formData.append('description', rowInputValues[id].description);
      formData.append('my_file', selectedFile);
      const response = await axios.put(
        `http://localhost:4000/api/v1/admin/updateFaculty/${id}`,
        formData
      );
      toast.success('Faculty Updated!!!');
    } catch (error) {
      console.error(error);
      toast.error('Error: ' + error.message);
    } finally {
      setUpdateLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, [faculty]);

  return (
    <Container>
      <ToastContainer></ToastContainer>
      <Container maxWidth="sm">
        <form style={{margin:'50px 0px'}} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title Name"
                name="title"
                value={facultyData.title}
                onChange={(e) =>
                  setFacultyData({ ...facultyData, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={facultyData.designation}
                onChange={(e) =>
                  setFacultyData({ ...facultyData, designation: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={facultyData.description}
                onChange={(e) =>
                  setFacultyData({ ...facultyData, description: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{marginTop:'20px'}}
          >
            Upload file
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Button>

          <Button  sx={{marginTop:'20px',marginLeft:'20px'}} type="submit" variant="contained" color="primary">
            Submit {loading && <CircularProgress size="sm" style={{ color: 'white', marginLeft: '5px' }} />}
          </Button>
        </form>
      </Container>

      <TableContainer sx={{margin:'50px 0px'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Faculty Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faculty.map((faculty) => (
              <TableRow key={faculty._id}>
                <TableCell>
                  <img
                    style={{ width: '200px', height: '200px' }}
                    src={faculty.image}
                    alt="Faculty"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={rowInputValues[faculty._id] ? rowInputValues[faculty._id].title : faculty.title}
                    onChange={(e) => handleRowInputChange(faculty._id, 'title', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Designation"
                    name="designation"
                    value={rowInputValues[faculty._id] ? rowInputValues[faculty._id].designation : faculty.designation}
                    onChange={(e) => handleRowInputChange(faculty._id, 'designation', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={rowInputValues[faculty._id] ? rowInputValues[faculty._id].description : faculty.description}
                    onChange={(e) => handleRowInputChange(faculty._id, 'description', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteFaculty(faculty._id)}>
                    Delete
                  </Button>
                  {deleteLoading[faculty._id] && (
                    <CircularProgress size="sm" style={{ color: 'white', marginLeft: '5px' }} />
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => updateFaculty(faculty._id)}>
                    Update
                  </Button>
                  {updateLoading[faculty._id] && (
                    <CircularProgress size="sm" style={{ color: 'white', marginLeft: '5px' }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AddandDeleteFaculty;
