const express = require("express");
const multer = require("multer");
const app = express();
const fs = require('fs')

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
        console.log(items);
        const images = items.map((image)=>{
            return(`<img style='height:100px' src= "./uploads/${image}"/>`)
        })
        res.send(`
        <h1>Service</h1>
        <form action="/upload" method="post" enctype="multipart/form-data">
        <label for="stuff">Choose a pic </label>
            <input type="file", id="stuff" name="stuff" />
            <button>Send</button>
        </form>
        ${images}
        <br/>
        `)
    })
})

app.post('/upload', upload.single('stuff'), function (request, response, next) {   
        uploaded_files.push(request.file.filename);
        console.log("Uploaded: " + request.file.filename);  
        response.redirect("/")
        // response.end(
        //     "Uploaded file!"
        //     );
    });

app.use(express.static('./public'));
const port = 3000

app.listen(port, () => console.log(`Example app listening at hhtp://localhost:${port}`))





