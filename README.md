
# RUCT – Construction Worker Finder

## Project Overview

RUCT is a web-based application designed to connect customers with skilled construction workers in Sri Lanka.

The platform allows customers to find workers based on their service category and view their profiles, working areas, hourly rates, availability, and contact information.

Construction workers can register on the platform, create their professional profiles, upload pictures of completed projects, and update their personal and service details.

RUCT aims to make finding reliable construction workers easier while helping workers promote their services online.

## Main Features

### Customer Features
- Customer registration and login
- View construction workers by service category
- View worker profiles and contact information
- Check worker availability and hourly rates
- View pictures of previously completed projects
- Manage customer profile information

### Worker Features
- Worker registration and login
- Create and manage worker profiles
- Select a service category and working district
- Add a phone number and hourly rate
- Upload a profile picture
- Upload up to five completed project pictures
- Update profile details and availability
- Manage personal and service information

### Supported Worker Categories
- Construction Worker
- Electrician
- Mason
- Painter
- Plumber
- Roof Worker
- Tile Worker

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router

### Backend
- Node.js
- Express.js
- JavaScript
- REST API
- JWT (JSON Web Token)
- bcryptjs
- Multer

### Database
- MongoDB
- Mongoose

### Image Storage
- Cloudinary

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- MongoDB Compass

## Project Structure

text
Group-T/
├── Frontend/
│   └── Ruct/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── README.md


## Prerequisites

Before running the application, install the following software:

1. Node.js and npm
2. MongoDB Community Server or access to MongoDB Atlas
3. Git
4. Visual Studio Code or another code editor

A Cloudinary account is also required for image uploads.

## Installation Instructions

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/dulaj2003/Group-T.git
```

Navigate to the project directory:

```bash
cd Group-T
```

### Step 2: Install Backend Dependencies

Navigate to the backend directory:

```bash
cd Backend
```

Install the required dependencies:

```bash
npm install
```

### Step 3: Configure Backend Environment Variables

Inside the `Backend` folder, create a file named `.env`.

Add the following configuration:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ruct
JWT_SECRET=your_secure_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Replace the example values with your own configuration.

**Important:** Never upload the `.env` file, JWT secret, or Cloudinary API credentials to GitHub. Make sure `.env` is included in `.gitignore`.

If using MongoDB Atlas instead of a local MongoDB server, replace `MONGO_URI` with your Atlas connection string.

### Step 4: Start MongoDB

If using MongoDB locally, make sure the MongoDB service is running.

The application uses the database named:

```text
ruct
```

MongoDB Compass can be used to view the database and collections.

### Step 5: Run the Backend

From the `Backend` directory, run:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

### Step 6: Install Frontend Dependencies

Open another terminal.

From the project root, navigate to:

```bash
cd Frontend/Ruct
```

Install dependencies:

```bash
npm install
```

### Step 7: Run the Frontend

Start the React development server:

```bash
npm run dev
```

Vite will display the local development URL, usually:

```text
http://localhost:5173
```

Open this URL in your web browser to access the RUCT application.

**Note:** The frontend and backend must run at the same time.

## API Endpoints

The application uses REST APIs to communicate between the React frontend and Express backend.

### Authentication

| Method |           Endpoint            |          Description          |
|--------|-------------------------------|-------------------------------| 
|  POST  | `/api/auth/register/customer` |      Register a customer      |
|  POST  |  `/api/auth/register/worker`  |       Register a worker       |
|  POST  |       `/api/auth/login`       | Log in to an existing account |
|--------|-------------------------------|-------------------------------| 

### Worker Management
 
| Method |     Endpoint       |               Description               |
|--------|--------------------|-----------------------------------------| 
|  GET   |   `/api/workers`   |       Retrieve registered workers       |
|  GET   | `/api/workers/:id` |        Retrieve a specific worker       |
|  GET   | `/api/workers/me`  | Retrieve the logged-in worker's profile |
| PATCH  | `/api/workers/me`  |  Update the logged-in worker's profile  |
|--------|--------------------|-----------------------------------------|

Protected endpoints require a valid JWT token.

Example authorization header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Worker Filtering

Workers can be filtered by trade and working area.

Example:

```http
GET /api/workers?trade=Plumber
```

Example with area:

```http
GET /api/workers?trade=Plumber&area=Kandy
```

## Database

RUCT uses MongoDB to store application data.

The main collections include:

- **users** – Customer and worker account information, including names, email addresses, passwords stored as hashes, phone numbers, and roles.
- **workerprofiles** – Worker service information, including trade, working area, description, hourly rate, availability, and project images.

Mongoose is used for database schemas and database operations.

## Authentication and Security

RUCT uses JWT-based authentication.

- User passwords are hashed using bcryptjs.
- JWT tokens are generated after successful registration or login.
- Protected routes require authentication.
- Role-based authorization restricts access to certain operations.
- Environment variables are used to store sensitive configuration values.

## Image Uploads

Cloudinary is used to store worker profile pictures and completed project images.

Workers can:
- Upload a profile picture.
- Upload a maximum of five project pictures.
- Display their uploaded images on their public profiles.

Multer is used to process image uploads on the backend.

## Running the Application

For local development, keep two terminals open.

**Terminal 1 – Backend**

```bash
cd Backend
npm run dev
```

**Terminal 2 – Frontend**

```bash
cd Frontend/Ruct
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Future Improvements

Possible future improvements include:

- Advanced worker search and filtering
- Worker ratings and customer reviews
- Booking and appointment management
- Notifications
- Improved mobile responsiveness
- Deployment to a cloud hosting platform

## Project Information

**Project Name:** RUCT – Construction Worker Finder

**Project Type:** University Group Project

**Developed By:** Group T

**Department:** Department of Information & Communication Technology

**Faculty:** Faculty of Technology

**University:** South Eastern University of Sri Lanka

## License

This project was developed for educational purposes as a university group project.
