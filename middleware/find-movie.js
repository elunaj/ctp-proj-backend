const axios = require('axios');

//finds movies using genreId from findGenres function
const findMovies = (genreId, res, tone) => {

	//create an array of numbers that corresponds to page number
	//from Movie DB API results
	let lowEnd = 1;
	let highEnd = 10;
	let pageArray = [];
	while(lowEnd <= highEnd){
	   pageArray.push(lowEnd++);
	}

	//Randomly choose a page from Movie DB API results
	const page = pageArray[Math.floor(Math.random() * pageArray.length)];

    //fetch array of movies from Movie DB API using genreId variable
    axios.get('https://api.themoviedb.org/3/discover/movie?' +
        'api_key=' + process.env.MOVIE_DB_API_KEY + '&language=en-' +
        'US&sort_by=popularity.desc&page=' + page + '&with_genres=' + genreId)
        .then(response => {
            res.status(200).json({response: response.data, tone: tone});
        })
        .catch(err => console.log(err));
}


module.exports = {
	findMovies
}