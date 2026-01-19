const express = require("express")
const path = require("path")
const app = express()
const port = 8080



app.get("/", (req, res) => {
    res.redirect("/game.html")
})

app.use(express.static("public"))

app.listen(port, () => {
  console.log(`Game: http://localhost:8080`)
})