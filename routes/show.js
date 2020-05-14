var express = require('express');
var router = express.Router();
const axios = require('axios');

//show handler 
router.get('/:id', (req, res) => {
	
	const { id } = req.params;

	//fetch array of movies from Movie DB API using genreId variable
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&append_to_response=videos,credits`)
        .then(response => {
        	res.json(response.data);
            console.log(response.data);
        })
        .catch(err => console.log(err));
});

module.exports = router;