const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsConfig = {
  credentials: true,
  origin: true
};
app.use(cors(corsConfig));

app.use(express.json());
app.use(cookieParser())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
})
const uri=process.env.ATLAS_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, { useNewUrlParser: true});

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDB()
const connection = mongoose.connection; 
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const registryFormRouter = require('./routes/registryRoutes');


app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/registrys', registryFormRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
