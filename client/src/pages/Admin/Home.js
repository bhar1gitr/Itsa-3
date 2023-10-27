import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/joy/CircularProgress';
import { Container } from 'react-bootstrap';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState({}); // Use an object to store loading state for each project.
    const [eventLoading,setEventLoading] =useState({});

    const fetchProject = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/admin/fetchprojects');
            setProjects(response.data.projects);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/admin/fetchEvents');
            setEvents(response.data.events);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProject = async (id) => {
        setLoading((prevLoading) => ({ ...prevLoading, [id]: true })); // Set loading state for the specific project being deleted.
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/admin/deleteProject/${id}`);
            console.log(response);
            toast.success('Project Deleted!');
        } catch (error) {
            console.error(error);
            toast.error('Error: ' + error.message);
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, [id]: false })); // Clear loading state after the delete request is complete.
        }
    }

    const deleteEvent = async(id)=>{
        console.log(id);
        setEventLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/admin/deleteEvent/${id}`);
            console.log(response);
            toast.success('Project Deleted!');
        } catch (error) {
            console.error(error);
            toast.error('Error: ' + error.message);
        } finally {
            setEventLoading((prevLoading) => ({ ...prevLoading, [id]: false })); // Clear loading state after the delete request is complete.
        }
    }

    useEffect(() => {
        fetchProject();
        fetchEvents();
    }, [projects,events]);

    return (
        <Container>
            <ToastContainer></ToastContainer>

            <h1 style={{textAlign:'center',margin:'50px 0px'}}>IT Projects</h1>

            <TableContainer sx={{margin:'50px 0px'}}  component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Team Leader</TableCell>
                            <TableCell>Team Member 1</TableCell>
                            <TableCell>Team Member 2</TableCell>
                            <TableCell>Team Member 3</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>GitHub Link</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project._id}>
                                <TableCell>{project.title}</TableCell>
                                <TableCell>{project.team_leader}</TableCell>
                                <TableCell>{project.team_member1}</TableCell>
                                <TableCell>{project.team_member2}</TableCell>
                                <TableCell>{project.team_member3}</TableCell>
                                <TableCell>{project.year}</TableCell>
                                <TableCell>{project.date}</TableCell>
                                <TableCell>{project.githublink}</TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteProject(project._id)}>Delete</Button>
                                    {loading[project._id] && <CircularProgress size='sm' style={{ color: 'white', marginLeft: '5px' }} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1 style={{textAlign:'center',margin:'50px 0px'}}>IT Events</h1>

            <TableContainer sx={{margin:'50px 0px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Event Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell><img style={{ width: '200px', height: '200px' }} src={event.image} alt="Event" /></TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteEvent(event._id)}>Delete</Button>
                                    {eventLoading[event._id] && <CircularProgress size='sm' style={{ color: 'white', marginLeft: '5px' }} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Home;
