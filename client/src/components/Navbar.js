import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from "react-router-dom";
import ITSA from "../Assets/ITSA_logo.png";
import Cookies from 'js-cookie';
import axios from 'axios';
import Select from '@mui/material/Select';

const pages = ['HOME', 'ABOUT', 'INDUSTRY-COLLABORATIONS', 'EVENTS', 'CONTACT'];

function NavBar() {
  const [icon, setIcon] = useState("");
  const jwtToken = Cookies.get('jwt_token');
  const jwtStudentToken = Cookies.get('student_token');
  const isLoggedIn = jwtToken ? true : false;
  const isStudentLoggedIn = jwtStudentToken ? true : false;

  const [post, setPost] = useState('post');

  const handleChange = (event) => {
    setPost(event.target.value);
  };
  const handleActive = (e) => {
    setIcon(e.target.innerText);
    console.log(e.target.innerText.toLowerCase());
  };

  const [navColour, updateNavbar] = useState(false);
  const navigate = useNavigate();
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/admin/logout', {}, {
        withCredentials: true, // Send cookies with the request
      });

      console.log(response);

      // Check the response status or data to determine success or failure
      if (response.status === 200 && response.data.status === 200) {
        // Show a success toast
        // toast.success('Logout successful');
        navigate('/admin/login');
      } else {
        // Show an error toast
        console.log('Logout failed. Please check your credentials.');
        // toast.error('Logout failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      // Show an error toast for network or server errors
      // toast.error('An error occurred. Please try again later.');
    }
  }

  const logoutStudent = async () => {
    // /student/logout
    try {
      const response = await axios.post('http://localhost:4000/api/v1/student/logout', {}, {
        withCredentials: true, // Send cookies with the request
      });

      console.log(response);

      // Check the response status or data to determine success or failure
      if (response.status === 200 && response.data.status === 200) {
        // Show a success toast
        // toast.success('Logout successful');
        navigate('/student/login');
      } else {
        // Show an error toast
        console.log('Logout failed. Please check your credentials.');
        // toast.error('Logout failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      // Show an error toast for network or server errors
      // toast.error('An error occurred. Please try again later.');
    }
  }

  return (
    <>
      <AppBar style={{ backgroundColor: '#27005D' }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img width="3%" style={{ marginRight: "20px", marginLeft: "20px" }} alt="ITSA" src={ITSA} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <MenuIcon />
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Link to={`/${page.toLowerCase()}`}>
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>

                  </Link>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // To push content to both edges
                flexGrow: 1,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                {pages.map((page) => (
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={`/${page.toLowerCase()}`}
                    key={page}
                    onClick={handleActive}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: icon.toLowerCase() === page.toLowerCase() ? 'red' : 'white',
                        display: 'block',
                        marginLeft: 2,
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
                <Box sx={{ display: 'flex' }}>
                  <Button><Link style={{textDecoration:'none',color:'white'}} to='/it-project'>Projects</Link></Button>
                  {
                    isLoggedIn && <div style={{ padding: '20px 10px' }}><Link style={{textDecoration:'none',color:'white'}} to='/admin-dashboard'>DASHBOARD</Link></div>
                  }
                  {
                    isLoggedIn && <div style={{ padding: '20px 10px' }}><Link style={{textDecoration:'none',color:'white'}} to='/admin-faculty'>FACULTY</Link></div>
                  }

                  {
                    isLoggedIn && (
                      <div>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={post}
                          label="Post"
                          onChange={handleChange}
                          sx={{ padding:'0',marginTop: '5px', backgroundColor: 'white' }} // Set the background color to white
                        >
                          <MenuItem value="post">Post</MenuItem>
                          <MenuItem value="even">
                            <Link style={{textDecoration:'none',color:'black'}} to="/admin/post">Event</Link>
                          </MenuItem>
                          <MenuItem value="project">
                            <Link style={{textDecoration:'none',color:'black'}} to="/projects">Project</Link>
                          </MenuItem>
                        </Select>

                      </div>
                    )
                  }
                </Box>
              </Box>

              <Box sx={{ display: 'flex' }}>
                {/* Conditionally render the Student Login button if not logged in as admin */}
                {!isLoggedIn && !isStudentLoggedIn && (
                  <div style={{ backgroundColor: 'white', padding: '5px 20px', borderRadius: '10px' }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/student/login'>Student Login</Link></div>
                )}

                {/* Conditionally render the Admin Login button if not logged in as a student */}
                {!isLoggedIn && !isStudentLoggedIn && (
                  <div style={{ margin:'0px 5px',backgroundColor: 'white', padding: '5px 20px', borderRadius: '10px' }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/admin/login'>Admin Login</Link></div>
                )}

                {/* Conditionally render the Logout button if logged in as admin */}
                {isLoggedIn && (
                  <div style={{ backgroundColor: 'white', padding: '5px 20px', borderRadius: '10px' }}><Link style={{ textDecoration: 'none', color: 'black' }} onClick={logout} to='/admin/post'>Logout</Link></div>
                )}

                {/* Conditionally render the Logout button if logged in as a student */}
                {isStudentLoggedIn && (
                  <div style={{ backgroundColor: 'white', padding: '5px 20px', borderRadius: '10px' }}><Link style={{ textDecoration: 'none', color: 'black' }} onClick={logoutStudent} to='/student/login'>Logout</Link></div>
                )}
              </Box>


            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
