import React, { useState, useEffect} from "react";
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Event from "./components/Events/Event";
import About from "./components/About/About";
import Footer from "./components/Footer";
import _404 from "./components/_404";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "./components/Contact/Contact";
import IndustryCollab from "./components/IndustryCollabration/IndustryCollab";
import AdminEvent from './pages/Admin/Event'
import Login from './pages/Admin/Login';
import Cookies from 'js-cookie';
import Projects from "./components/Projects/Projects";
import AdminDashboard from "./pages/Admin/Home";
import Faculty from "./components/Faculty";
import AddandDeleteFaculty from "./pages/Admin/AddandDeleteFaculty";
import ItProjects from "./components/ItProjects";
import StudentRegister from "./pages/Student/Register";
import StudentLogin from "./pages/Student/Login";
import DetailedFacculty from "./components/DetailedFacculty";

function App() {
  const jwtToken = Cookies.get('jwt_token');
  const isLoggedIn = jwtToken ? true : false;

  useEffect(()=>{
    console.log(jwtToken);
  },[]);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Event />} />
          <Route path="/industry-collaborations" element={<IndustryCollab/>} />
          <Route path="*" element={<Navigate to="/"/>} />
           {isLoggedIn ? (
            <Route path="/admin/post" element={<AdminEvent />} />
          ) : (
            <Route path="/admin/login" element={<Login/>} />
          )}
          <Route path="/admin/login" element={<Login/>} />
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/faculty" element={<Faculty/>}/>
          <Route path="/it-project" element={<ItProjects/>}/> 
          <Route path="/admin-faculty" element={<AddandDeleteFaculty/>}/>
          <Route path="/student/register" element={<StudentRegister/>}/>
          <Route path="/student/login" element={<StudentLogin/>}/>
          <Route path="/faculty/:id" element={<DetailedFacculty/>}/>
        </Routes>
        <Fab style={{
          position:'fixed',
          bottom:'20px',
          right:'20px',
        }} 
        color="primary" aria-label="add">
        <ArrowUpwardIcon />
      </Fab>
        <Footer />
      </div>
    </Router>
  );
}

export default App;