const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const Url = require("./url")
const morgan = require("morgan")
const mongoose = require("mongoose")
const shortid = require("shortid")
const utils = require("./utils/util")

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected")
    }).catch(err => {
    console.log("Unable to connect to data base", err.message)
});

app.get("/all", async (req, res) => {
    Url.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
})

app.post("/shorten", async (req, res) => {
    console.log(req.body)
    const origUrl = req.body.origUrl
    const newid = shortid.generate()
    if (utils.validateUrl(origUrl)) {
        try {
            let urlOld = Url.findOne({origUrl})
            if (urlOld) {
                res.json(urlOld)
            } else {
                shortUrl = "http://localhost:3001/" + newid
                urlMode = new url({
                    shortid, origUrl, shortUrl, date: new Date()
                })
            }
            await url.save()
            res.json(url)
        } catch (err) {
            res.status(500).json(err.message)
        }
    } else {
        res.status(400).json("Invalid Original Url")
    }
})


app.get(":urlId", async (req, res) => {
    try {
        const url = await Url.findOne({urlId: req.params.urlId})
        console.log(url)
        if (url) {
            url.totalRedirects++
            url.save()
            return res.redirect(url.origUrl)
        } else {
            res.status(404).json("URL not found")
        }
    } catch (err) {
        res.status(500).json("Server error")
    }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})