const cloudinary = require("cloudinary").v2;
const Event = require('../models/eventsSchema');
const nodemailer = require('nodemailer');
const Users = require('../models/users');
const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');
const Project = require('../models/projectsSchema');
const Faculty = require('../models/facultySchema.js');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer (e.g., Gmail, Yahoo, etc.)
  auth: {
    user: 'bharatsharma98971@gmail.com', // Your email address
    pass: 'yvnk mzsy btiz ucdj', 
  },
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

const post = async(req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      imageUrl = cldRes.url;
    }

    const { title, description } = req.body;
    const event = new Event({ title, description, image : imageUrl });
    await event.save();
    // Fetch all user emails from your database
    const users = await Users.find({}, 'email');
    const emailList = users.map(user => user.email);

    const mailOptions = {
      from: 'bharatsharma232@apsit.edu.in', // Sender's email address
      to: emailList, // Recipient's email addresses (array of user emails)
      subject: 'APSIT', // Email subject
      text: 'APSIT here!!!', // Email body in plain text
    };

    // Send the email to all users
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Post registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}


const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      // Assuming Admin is your Mongoose model for administrators
      const admin = await Admin.findOne({ username, password });

      if (admin) {
        // Authentication succeeded
        const expirationTime = 7 * 24 * 60 * 60;
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: expirationTime });

        // Set a cookie and send a success response
        res.cookie('jwt_token', token, {
          maxAge: expirationTime * 1000, 
        });
        
        return res.status(200).json({ message: 'Success', status: 200 });
      } else {
        // Authentication failed
        return res.status(400).json({ message: 'Invalid credentials', status: 400 });
      }
    } else {
      // Invalid request, missing username or password
      return res.status(400).json({ message: 'Missing credentials', status: 400 });
    }
  } catch (error) {
    console.error(error);
    // Internal server error
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
};


const Logout = async (req, res) => {
  try {
    res.clearCookie('jwt_token');
    return res.status(200).json({ message: 'Success', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}

const PostProject = async (req, res) => {
  try {
    const { title, description, team_leader, team_member1, team_member2, team_member3, year, date, githublink } = req.body;

    // Input validation (you can add more validation as needed)
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const project = new Project({
      title,
      description,
      team_leader,
      team_member1,
      team_member2,
      team_member3,
      year,
      date,
      githublink,
    });

    // Save the project to the database
    await project.save();

    // Respond with a 201 Created status and information about the created project
    res.status(201).json({
      message: 'Project registered successfully',
      project: project, // You can provide more details here
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
};

const fetchProjects = async(req,res)=>{
  try {
    const projects = await Project.find();
    res.status(200).json({projects:projects});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}


const fetchEvents = async(req,res)=>{
  try {
    const events = await Event.find();
    res.status(200).json({events:events});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const deleteProject = async(req,res)=>{ 
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'Project Deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const deleteEvent = async(req,res)=>{
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'Event Deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const addFaculty = async(req,res)=>{
    try {
      let imageUrl = null;
      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        imageUrl = cldRes.url;
      }
      const { title,designation,description } = req.body;
      const faculty = new Faculty({ title,designation, description, image : imageUrl });
      await faculty.save();
    setTimeout(() => {
      res.status(201).json({ message: 'Faculty Added!!!' });
    }, 1000);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Operation failed' });
    }
}

const fetchFaculty = async(req,res)=>{
  try {
    const faculty = await Faculty.find();
    res.status(200).json({faculty:faculty});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const deleteFaculty = async(req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Operation failed' });
  }
}

const updateFaculty = async (req, res) => {
  const facultyId = req.params.id;
  try {
    let imageUrl = null;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      imageUrl = cldRes.url;
    }
    const { title, designation, description } = req.body;

    // Use findByIdAndUpdate to update the faculty document
    await Faculty.findByIdAndUpdate(facultyId, { title, designation, description, image: imageUrl });

    res.status(201).json({ message: 'Faculty Updated!!!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Operation failed' });
  }
};

const SelectedFaculty = async(req,res)=>{
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById({ _id : id});
    res.status(200).json({faculty:faculty});
  } catch (error) {
    console.log(error);
  }
}


module.exports = { post,Login,Logout,PostProject,fetchProjects,fetchEvents,deleteProject,deleteEvent,addFaculty,fetchFaculty,deleteFaculty,updateFaculty,SelectedFaculty }

  
