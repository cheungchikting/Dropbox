const express = require("express");
const expressFileUpload = require("express-fileupload")
const fs = require("fs")
const path = require("path")
const app = express();
const uploadDir = path.join(__dirname, "uploaded")
const port = 8000

app.use(expressFileUpload())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
})) // fales only support shring and array 
app.use(express.static(path.join(__dirname, "public")))

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(uploadDir, file), (err, data) => {
      if (err) {
        console.log("Error", err)
        reject(err)
      } else {
        console.log("Data", data)
        resolve(data)
      }
    })
  })
}

function writeFile(name, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(uploadDir, name), data, (err) => {
      if (err) {
        console.log("Error", err)
        reject(err)
      } else {
        console.log("Data", data)
        resolve(data)
      }
    })
  })
}

app.get("/", (req, res) => {
  res.status("200")
  res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.get("/uploaded/:name", (req, res) => {
  res.status("200")
  let name = req.params.name;
  readFile(name).then((data) => {
    res.send(data);
  });
});

app.post("/upload", (req, res) => { 
  console.log(req.files.upload) // "/files" = "action" in form
  let reqUpload = req.files.upload //upload = "name" in inpçut
  let name = req.files.upload.name
  let data = req.files.upload.data
  let size = req.files.upload.size

  if (reqUpload.length > 1) {
    for (each of reqUpload) {
      writeFile(each.name, each.data)
      let EachNewFile = {
        "fileName": each.name,
        "fileSize": each.size,
        "timeUpload": new Date().toLocaleString(),
      };
      let myJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")))
      myJSON.push(EachNewFile)
      fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(myJSON, null, 2), (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
    res.redirect("/");
  } else {
    writeFile(name, data).then(() => {
      res.redirect("/")
    }).then(() => {
      let newFile = {
        "fileName": name,
        "fileSize": size,
        "timeUpload": new Date().toLocaleString(),
      }
      let myJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")))
      myJSON.push(newFile)
      fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(myJSON, null, 2), (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }
});

app.delete("/uploaded/:name", (req, res) => {
  let name = req.params.name;
  fs.unlink(name, (err) => {
    if (err) {
      console.log(err)
    }
  })
});


app.listen(port, function () {
  console.log(`Application listening to port ${port}`);
});