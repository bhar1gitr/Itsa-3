import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Container } from 'react-bootstrap';

const ItProjects = () => {
    const [projects, setProjects] = useState([]);
    const fetchProject = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/admin/fetchprojects');
            setProjects(response.data.projects);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchProject();
    });

  return (
    <Container>

    <h1 style={{textAlign:'center',margin:'50px 0px'}}>Projects done by past students</h1>

     <TableContainer sx={{margin:'50px 0px'}} component={Paper}>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </Container>
  )
}

export default ItProjects