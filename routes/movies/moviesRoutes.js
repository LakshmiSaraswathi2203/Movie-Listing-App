const express = require("express");
const router = express.Router();
//router is a middleware
const Movie = require("../../db/schemas/movieSchema");
// router.get("/", async (req,res)=>{
//     //127.0.0.1 local IP --> loop back IP
//         const movies = await Movie.find();
//         res.json(movies);
//         //object data mapping
//         //object relational mapping
//     }
// );
//app.use -> payload treated as json
router.post("/",async(req,res)=>
{
    try{
    console.log(req.body);
    const moviesData = req.body;
    const newMovie = new Movie(moviesData);
    await newMovie.save();
    res.json({
        message: "Movie added successfully",
    });
} catch(err){
    console.log(err);
    res.status(500).json({
        message: "server is not stopped",
    });
}
});
router.put("/:id", async(req,res)=>{
    try{
        const movieId= req.params.id;
        const updateMovieData = req.body;
        const response = await Movie.findByIdAndUpdate(movieId,updateMovieData);
        if(!response){
            return res.status(404).json({
                message:"Movie not found",
            });
        }
        res.json(
            {
                message: "movie updates successfully",
            });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "server is not stopped",
        });
    }
});

router.delete("/:id", async(req,res)=>{
    try{
        const movieId= req.params.id;
        const response = await Movie.deleteOne({ _id: movieId});
        res.json(
            {
                message: "movie deleted successfully",
            });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "server is not stopped",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const movieid = req.params.id;
        console.log("Handling the get by id request");
        const movie = await Movie.findById(movieid);
        res.json(movie);
    } catch (error) {
        if (error.kind !== "objectId") {
        res.status(404).json({ message: "Movie not found" });
        } else {
        res.status(500).json({ message: "Internal server error"});
    }
}
});


router.get("/",async(req,res)=>{
    const queryParams = req.query;
    console.log(queryParams)
    const filters ={};
    if(queryParams.name)
    {
        filters.name = {
            $regex:`^${queryParams.name}`,
            $options:"i",
        };
    }
    if(queryParams.rating){
        filters.rating ={
            $gte:parseFloat(queryParams.rating),
        };
    }
    const movies = await Movie.find(filters);
    res.json(movies);
});
module.exports = router;