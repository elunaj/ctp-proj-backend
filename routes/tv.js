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

    //fetch array of tv shows from Movie DB API using genreId variable
    axios.get('https://api.themoviedb.org/3/discover/tv?' +
        'api_key=' + process.env.MOVIE_DB_API_KEY + '&language=en-' +
        'US&sort_by=popularity.desc&page=1&with_genres=' + genreId)
        .then(response => {
            res.status(200).json({response: response.data});
        })
        .catch(err => {
        	res.status(404).json("not found");
        })
});

module.exports = router;