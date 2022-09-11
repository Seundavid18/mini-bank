require("dotenv").config()
const express = require("express")
const connectDB = require("./config/config")
const router = require("./src/router/userrouter")
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require("path")


connectDB();
app.use(express.urlencoded({extended:false}))
app.use("/images", express.static(path.join(__dirname, "/images")))


const PORT = process.env.PORT || 6000


const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    }, 
    filename:(req, file, cb) => {
        cb(null, req.body.name)
    },
})

const upload = multer({storage: storage})
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json('File has been uploaded')
})

app.use(express.static(path.join(__dirname, "/client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})


app.use(express.json())
app.use(cors())
app.use("/api",router)
app.listen(PORT,() => {
    console.log(`app is listening on port ${PORT}`)
})