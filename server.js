const express=require('express');

const dotenv=require('dotenv'); 

const cors=require('cors');
const helmet=require('helmet'); 
const morgan=require('morgan'); 

const app=express();



dotenv.config();


const connectDB=require("./src/config/db")
const authRoutes=require("./src/routes/auth.routes");
const taskRoutes=require("./src/routes/task.routes")
const { errorHandler } = require('./src/middleware/error.middleware');

connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

