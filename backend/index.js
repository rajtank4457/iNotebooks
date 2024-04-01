const connectTOMongo = require('./db');
const express = require('express')
var cors=require('cors')
var path = require('path')

connectTOMongo();
const app = express()
//const port = 5000
const port = process.env.REACT_APP_PORT || 5000;
app.use(express.json())


app.use(cors())
app.use(express.json())

//availabel Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


/// static file start
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port http://localhost:${port}`)
})
