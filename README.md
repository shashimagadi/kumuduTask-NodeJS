// Task Management API (Node.js + Express + MongoDB)

//Features

- User registration & login (JWT)
- Task CRUD (title, description, priority, status)
- Filtering (status, priority), sorting (priority, createdAt) and pagination
- Protected task routes — user can only manage their own tasks

//Tech

- Node.js, Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- dotenv, helmet, cors, morgan


// Setup (local)

 
git clone https://github.com/shashimagadi/kumuduTask-NodeJS.git
cd task
npm install

To Run: npm start


//API DOCUMENTATION

//Authentication Routes
1. POST /users/register

Body
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}

Response
{
  "message": "User registered successfully"
}


2. POST /users/login

Body
{
  "email": "john@gmail.com",
  "password": "123456"
}
Response
"user": {
        "id": "",
        "name": "raj",
        "email": "raj1@gmail.com"
    },
{
  "token": "JWT TOKEN"
}





//Task Routes (Protected)   (USE TOKEN)

3. POST /tasks

Body
{
  "title": "Learn Node.js",
  "description": "Backend assignment",
  "priority": "High",
  "status": "Pending"
}

Response
{
  "message": "Task created successfully",
  "task": { ... }
}

4. Get All Tasks (with Filters, Sorting, Pagination)

GET /tasks?page=1&limit=10&status=Pending&priority=High&sortBy=createdAt&order=desc

Response
{
  "page": 1,
  "totalPages": 3,
  "totalTasks": 25,
  "tasks": [ ... ]
}



5. GET /tasks/:id

Response
{
  "task": { ... }
}



6. PUT /tasks/:id

Body
{
  "title": "Learn Node.js",
  "status": "In Progress",
  "priority": "Medium"
}

Response
{
  "message": "Task updated successfully",
  "task": { ... }
}



6. DELETE /tasks/:id

Response
{
  "message": "Task deleted successfully"
}