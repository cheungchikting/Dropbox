// let dropArea = document.querySelector('#droparea');

// dropArea.addEventListener('dragover', (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'copy';
// });

// dropArea.addEventListener('drop', (event) => {
// console.log(event)

//   event.stopPropagation();
//   event.preventDefault();
//   const fileList = event.dataTransfer.files;
//   console.log(fileList);
// });
const express = require("express");
const expressFileUpload = require("express-fileupload")
const fs = require("fs")
const path = require("path")
const app = express();
const port = 3000
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
})) // fales only support shring and array 



app.get("/", (req, res) => {
  res.status("200")
  res.sendFile(path.join(__dirname, "data.json"))
});

app.listen(port, function () {
  console.log(`Application listening to port ${port}`);
});



console.log("test")