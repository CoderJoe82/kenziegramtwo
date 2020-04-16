const express = require("express");
const multer = require("multer");
const app = express();
const fs = require('fs')
app.set('views', "./views")
app.set('view engine', 'pug')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + ".jpg" 
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
   
var upload = multer({ storage: storage })

const uploaded_files=[]


app.get('/', (req, res)=>{
  
    const path = './public/uploads';
    fs.readdir(path, (err, items)=> {
      res.render('index', {
        title: "Service", 
        images: items
      })
})
})

app.post('/upload', upload.single('stuff'), function (request, response, next) {   
        uploaded_files.push(request.file.filename);
        console.log("Uploaded: " + request.file.filename);  
        response.redirect("/")
    
    });

app.use(express.static('./public'));
const port = 3000

app.listen(port, () => console.log(`Example app listening at hhtp://localhost:${port}`))





