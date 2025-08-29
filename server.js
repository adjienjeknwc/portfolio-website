const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// For a production app, use a service like MongoDB Atlas and set the URI in an environment variable
const mongoURI = 'mongodb://localhost:27017/portfolio_db';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schemas and Models
const ProjectSchema = new mongoose.Schema({
  id: String,
  type: String,
  category: String,
  title: String,
  summary: String,
  client: String,
  projectDate: String,
  githubLink: String,
  images: [String],
  description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

const CertificationSchema = new mongoose.Schema({
  id: String,
  title: String,
  issuer: String,
  date: String,
  verifyLink: String,
  image: String,
  description: String,
});
const Certification = mongoose.model('Certification', CertificationSchema);

// Placeholder function to seed data if collections are empty
async function seedData() {
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    const projectsData = [
      {
        id: "1", type: "major", category: "Web Development", title: "Real-Time Chat App", summary: "A full-stack application built for real-time messaging.", client: "Personal Project", projectDate: "October 2024", githubLink: "https://github.com/your-username/your-project", images: ["https://placehold.co/600x400/f0f8ff/3b82f6?text=Chat+App+Mockup+1"], description: "Details about the chat app project..."
      },
      {
        id: "2", type: "major", category: "UX/UI Design", title: "E-commerce App Redesign", summary: "A UX/UI case study on improving a fashion e-commerce platform.", client: "Fictional Client", projectDate: "September 2024", githubLink: "https://github.com/your-username/your-project", images: ["https://placehold.co/600x400/f0f8ff/3b82f6?text=E-commerce+Redesign"], description: "Details about the e-commerce redesign..."
      },
      {
        id: "3", type: "mini", category: "Web Development", title: "Personal Finance Tracker", summary: "A single-page application to visualize and manage personal spending.", client: "Personal Project", projectDate: "August 2024", githubLink: "https://github.com/your-username/your-project", images: ["https://placehold.co/600x400/f0f8ff/3b82f6?text=Finance+Dashboard"], description: "Details about the finance tracker..."
      },
      {
        id: "4", type: "mini", category: "UX/UI Design", title: "Interactive Weather App", summary: "A simple weather application that fetches real-time weather data.", client: "Personal Project", projectDate: "July 2024", githubLink: "https://github.com/your-username/your-project", images: ["https://placehold.co/600x400/f0f8ff/3b82f6?text=Weather+App"], description: "Details about the weather app..."
      }
    ];
    await Project.insertMany(projectsData);
    console.log('Project data seeded.');
  }
  
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    const certificationsData = [
      {
        id: "1", title: "Google UX Design Professional Certificate", issuer: "Google", date: "July 2024", verifyLink: "https://www.coursera.org/verify/your-certificate-id-here", image: "https://placehold.co/600x400/fff/333?text=Google+UX", description: "Details about the Google UX certification..."
      },
      {
        id: "2", title: "Meta Front-End Developer Professional Certificate", issuer: "Meta", date: "August 2024", verifyLink: "https://www.coursera.org/verify/your-certificate-id-here", image: "https://placehold.co/600x400/fff/333?text=Meta+Front-End", description: "Details about the Meta Front-End certification..."
      }
    ];
    await Certification.insertMany(certificationsData);
    console.log('Certification data seeded.');
  }
}
seedData();

// API Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve static frontend files (assuming they are in a 'public' folder)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all to serve the main HTML file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

