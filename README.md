🔖 Link Bookmarking App
A full-stack web application that allows users to:

Register and log in

Save links/bookmarks

Automatically fetch summaries of links using Open Graph (OG) metadata

View and delete their saved bookmarks

🌐 Live Demo
You can deploy it to platforms like Vercel (frontend) and Render/Heroku/Railway (backend)

Frontend: https://link-saver-lyart.vercel.app/

Backend: https://link-saver-qk9d.onrender.com
Login Credentials : 
email-testuser@example.com

pass-123456




📁 Project Structure
perl
Copy
Edit
📦 link-bookmarking-app/
├── backend/          # Node.js + Express + MongoDB API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
├── frontend/         # React frontend
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── App.css
└── README.md
⚙️ Technologies Used
Backend:
Node.js

Express.js

MongoDB + Mongoose

JWT (for authentication)

Open Graph Scraper (open-graph-scraper)

CORS

Frontend:
React

React Router

Fetch API

CSS (App.css)

🚀 Features
🔐 User Authentication: Signup/Login with email and password

🔗 Bookmark Saving: Enter a URL to save as a bookmark

🧠 Link Summary: Automatically fetch title and description via OG tags

📋 View Bookmarks: Display your saved bookmarks

❌ Delete Bookmarks: Remove a saved link from your list

🧾 Protected Routes: Dashboard is protected and accessible only after login

💅 Responsive UI with clean CSS design

🔧 Backend Setup
Prerequisites:
Node.js

MongoDB (local or MongoDB Atlas)

Steps:
bash
Copy
Edit
cd backend
npm install
Create a .env file in backend/:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookmarkDB
JWT_SECRET=your_jwt_secret
Run the server:

bash
Copy
Edit
npm start
🌍 CORS Setup
CORS is already configured in the backend:

js
Copy
Edit
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
Make sure your frontend is running on the same port (localhost:3000) or update accordingly.

💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
React will run on http://localhost:3000

App communicates with backend running on http://localhost:5000

✨ UI Screens
Page	Features
Login	Email + Password + link to Signup
Signup	Email + Password + link to Login
Dashboard	Save Link, View List, Delete Bookmark

📦 API Endpoints
Auth
http
Copy
Edit
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/user (protected)
Bookmarks
http
Copy
Edit
POST   /api/bookmarks           // Save a new link
GET    /api/bookmarks           // Get all bookmarks (protected)
DELETE /api/bookmarks/:id       // Delete a bookmark (protected)
🔐 Route Protection (Frontend)
React uses localStorage to store the token and conditionally renders routes using PrivateRoute.

js
Copy
Edit
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
🧪 Test the Flow
Register at /signup

Login at /login

Get redirected to /dashboard

Paste a URL like https://vercel.com, click Save

Summary (title & description) auto-appears

Click ❌ to delete

📤 Deployment Tips
Use Vercel for frontend deployment (React)

Use Render or Railway for backend deployment

Make sure to:

Whitelist frontend origin in backend CORS

Update .env with production MongoDB URI

Use HTTPS URLs for frontend/backend in production

🧑‍💻 Author
Made with ❤️ by Suyash Pathak
