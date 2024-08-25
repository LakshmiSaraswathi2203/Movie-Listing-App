require("dotenv").config();
const movieRoutes = require("./routes/movies/moviesRoutes");
const express = require("express");

const db = require("./db/index");
const app = new express();
const port = process.env.PORT || 8080;
db();
app.use(express.json());
app.use("/movies",movieRoutes);
app.listen(port,()=>{//() within () call-back function
    //communicate with app using listen with port and 
    //start the server
    console.log(`Express app listening app listening at http://localhost:${port}`)
});
//database access -> edit-> edit pwd
