Freelance4U – Full Stack Freelancing Platform

📖 Project Overview

Freelance4U is a full-stack web application built for freelancers and businesses to create, showcase, and manage digital business cards. The platform includes user authentication (email/password and Google login), user management, card creation and editing, liking, commenting, and contact messaging.

The application includes:

🧠 JWT Authentication (including Google OAuth)

✍️ Create, Read, Update, Delete (CRUD) operations on business cards

❤️ Like system for cards

💬 Comment section with role-based permissions

📤 Image upload for user profiles

📧 Contact form with email integration

🛠 Background HostedService for periodic cleanup

🧑‍💻 Admin dashboard for managing users and cards

🌃 Dark mode toggle on login page

🛠 Technologies Used

Client (React)

React

React Router DOM

MUI (Material UI)

Axios

Framer Motion

@react-oauth/google

Server (ASP.NET Core)

ASP.NET Core 8 Web API

Entity Framework Core + SQL Server

JWT Authentication

Google OAuth (Google.Apis.Auth)

SMTP Email (System.Net.Mail)

HostedService for background processing

🛠 Setup Instructions

🔧 Prerequisites

Node.js (v18+)

.NET SDK 8

SQL Server (LocalDB or full)

⚙️ Server Setup (/Server folder)

1. Restore packages

dotnet restore

2. Run database migrations

🧠 Where to run this command?If you're using Visual Studio Code, Rider, or running from a terminal, open a terminal inside the /Server folder and run:

dotnet ef database update

💡 If you get an error like No executable found matching command "dotnet-ef", you need to install the EF CLI tool globally:

dotnet tool install --global dotnet-ef

To update an existing installation:

dotnet tool update --global dotnet-ef

✅ If you're using Visual Studio (Windows), you can alternatively run the same command inside the Package Manager Console (PMC).Make sure the Default Project selected in PMC is FreelanceApi.

Example inside PMC:

dotnet ef database update

3. Required NuGet packages:

Microsoft.AspNetCore.Authentication.JwtBearer

Microsoft.EntityFrameworkCore.SqlServer

Microsoft.EntityFrameworkCore.Tools

Google.Apis.Auth

Microsoft.AspNetCore.Authentication.Google

Ensure GoogleTokenRequest.cs and AuthController.cs are present under /Models and /Services respectively.

4. Update appsettings.json

"ConnectionStrings": {
  "DefaultConnection": "<your-local-sql-server-connection>"
},
"EmailSettings": {
  "From": "<your_email>@gmail.com",
  "Password": "<app-specific-password>"
}

✅ Make sure to enable less secure apps or use App Password from Google.

5. Run the server

dotnet run

Server runs at: http://localhost:5244

💻 Client Setup (/freelance-for-u folder)

1. Install required libraries

npm install

2. Required npm packages:

axios

react-router-dom

@mui/material @emotion/react @emotion/styled

framer-motion

@react-oauth/google

3. Start the app

npm start

Client runs at: http://localhost:3000

🔁 Important for Instructors

📌 Inside /src/Services/api.js, update the base URL if testing from a different backend server:

baseURL: "http://localhost:5244/api"

🧪 Test Credentials

Email: test@gmail.com
Password: 123456

Or use Google Login (with configured Google Client ID)

🔐 Google OAuth Setup Reminder

Make sure you:

Created a Google OAuth client ID

Whitelisted http://localhost:3000 in OAuth consent screen

Used the correct clientId in <GoogleOAuthProvider> in Router.jsx

🙏 Special Note for Reviewers

This project was built with ❤️ as a final project for the Full Stack course. It demonstrates frontend/backend integration, authentication, animations, CRUD capabilities, admin control, background services, and third-party integration (OAuth + Email).

Enjoy exploring Roi Levi

