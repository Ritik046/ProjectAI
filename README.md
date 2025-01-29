# First Started with Create React App

# npm install
install all the required devDependencies

# npm start
Starts the development server.

Access the app at http://localhost:3000.
Any changes will make automatically reload the page

# npm test
Runs to check for issues in your components.

# npm run build
for creating app for production

# Backend Part-

# Set Up the Backend:
The backend is built using Node.js and Express.
It communicates with a database (e.g., MongoDB) to store car details, user details etc.
The API endpoints handle different operations like User Authentication, Car Management, and Global Search.

# API Endpoints:
POST /auth/signup: Register a new user.
POST /auth/login: Authenticate a user and return an access token.
POST /cars/create: Adds a new car for the logged-in user.
GET /cars: Retrieves all cars for the logged-in user.
GET /cars/:id: Fetches details for a specific car by its ID.
PUT /cars/update/:id: Updates car details such as title, description, images, and tags.
DELETE /cars/delete/:id: Deletes a specific car by its ID.

# Database Operations:
MongoDB stores user data and car records with Mongoose as the ODM.
CRUD operations are performed for car records and user accounts.



# Authentication & Authorization:
JWT tokens are used to secure routes and ensure users manage only their cars.

# Image Handling:
Multer middleware handles image uploads, with validation for up to 10 images per car.

# Environment Variables:
.env file contains secrets like database URLs and JWT keys for secure environment configuration.

# Error Handling:
Comprehensive error handling for validation issues and server/database errors ensures robust operation.

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/ad745639f230a3535b8bf648926bbf2b0e8aefa8/m0.png)

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/766f93853967f69a98c18563b293b1750ef1fb23/m1.png)

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/78ae7d95b401ce8d81bd77f76c99e2622aacf060/m2.png)

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/3cfc4de422e4eda27477ba3a3c5d4f9acf4ea70c/m30.png)

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/867a291b6a66e61d29de0adffe9120d695b442e1/m3.png)

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/54ba7967aba335856e5bd36b6168cf3611d2fe9f/m4.png)

![Image_Alt](https://github.com/Ritik046/ProjectAI/blob/d119fd1b5e497274694b57a6b6e1d7136a59d71e/m6.png)
