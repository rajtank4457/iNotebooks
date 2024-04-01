const mongoose = require('mongoose');
const mongoURI="mongodb+srv://princebhandari:princebhandari@cluster0.9fhjmbn.mongodb.net/inotebook?retryWrites=true&w=majority";
//const mongoURI = "mongodb://localhost:27017/";

const connectTOMongo=()=>{
  mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code after successfully connecting
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    // Handle the error
  });
}
module.exports=connectTOMongo;