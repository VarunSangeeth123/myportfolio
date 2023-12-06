const express = require("express");

const todo = require('./routes/todo');
const notFound = require("./Middleware/notFound");
const errorHandlerMiddleware = require("./Middleware/errorHandler");

const app = express();

require('dotenv').config()
const connectDB = require("./db/connect")


const cors = require("cors");
app.use(
  cors({
    origin:"http://localhost:5173"
  })
  )


app.use(express.json())

app.use('/todo',todo)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000;


const start = async ()=>{

  try{
 await connectDB()
 app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
  }catch(err){

    console.log(err)

  }

}
start()


