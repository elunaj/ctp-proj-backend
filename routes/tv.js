var express = require('express');
var router = express.Router();
const axios = require('axios');

//tv handler 
router.get('/:tone', (req, res) => {
	
	//user tone from movie search
	const { tone } = req.params;

	//grab map with emotion to genre mapping
    const map = require('../tone-genre-map/map').map;

    //validate tone
    if (!map.has(tone)) {
		res.status(400).json("bad request");
    }

    //grab array of genre ids from map
    const genreArray = map.get(tone);

    //grab a random genre id from our pre-defined emotion-genre map
    const genreId = genreArray[Math.floor(Math.random() * genreArray.length)];

    //create an array of numbers that corresponds to page number
    //from Movie DB API results
    let pageArray = [1, 2];

    //Randomly choose a page from Movie DB API results
    const page = pageArray[Math.floor(Math.random() * pageArray.length)];

    //fetch array of tv shows from Movie DB API using genreId variable
    axios.get('https://api.themoviedb.org/3/discover/tv?' +
        'api_key=' + process.env.MOVIE_DB_API_KEY + '&language=en-' +
        'US&sort_by=popularity.desc&page=' + page + '&with_genres=' + genreId)
        .then(response => {
            res.status(200).json({response: response.data});
        })
        .catch(err => {
        	res.status(404).json("not found");
        })
});

// tv show details route handler
router.get('/tv-details/:id', (req, res) => {

    const { id } = req.params;

    //fetch array of tv show episodes from Movie DB API using genreId variable
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&append_to_response=videos,credits`)
        .then(response => {
            res.status(200).json({response: response.data});
        })
        .catch(err => {
            res.status(404).json("not found");
        });

});

module.exports = router;