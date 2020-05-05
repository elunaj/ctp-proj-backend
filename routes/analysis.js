const express = require('express');
const router = express.Router();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const axios = require('axios');

//analysis route, takes user text and finds tone analysis
router.post('/', (req, res) => {

    //user input
	const { text } = req.body;


    //SDK to connect to IBM-WATSON API
    //taken from: https://medium.com/@mgordoncarneal/create-a-tone-analyzer-using-node-js-and-ibms-watson-ab440c5d2a74
    //we pass three credentials into toneAnalyzer object/tool to gain access
    //to api/generate auth token
	const toneAnalyzer = new ToneAnalyzerV3({
	  version: '2017-09-21',
	  authenticator: new IamAuthenticator({
	    apikey: process.env.IBM_API_KEY,
	  }),
	  url: 'https://api.us-east.tone-analyzer.watson.cloud.ibm.com/'
      + 'instances/8ef73b3e-9207-4d9f-b6ca-96403fe0228c',
	});

    //parameters + headers object sent to IBM-WATSON Tone Analysis Endpoint
	const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
    };

    //fetch tone analysis
    toneAnalyzer.tone(toneParams)
    	.then(toneAnalysis => {
            findGenres(toneAnalysis, res);
    	})
    	.catch(err => {
    		console.log(err);
            // add status error codes/messages**
    	})

});

// Finds Movie DB API genre id
const findGenres = (toneAnalysis, res) => {

    //grab map with emotion to genre mapping
    const map = require('../tone-genre-map/map').map;

    console.log(toneAnalysis.result.document_tone.tones);
    //grabs overall document tone

    if (toneAnalysis.result.document_tone.tones.length === 0) {
        res.status(400).json("error");
    }

    const tone = toneAnalysis.result.document_tone.tones[0].tone_id;

    //grab array of genre ids from map
    const genreArray = map.get(tone);

    //grab a random genre id from our pre-defined emotion-genre map
    const genreId = genreArray[Math.floor(Math.random() * genreArray.length)];

    //add error checks here **

    //call findMovies function with genreId and res object
    findMovies(genreId, res);
}

//finds movies using genreId from findGenres function
const findMovies = (genreId, res) => {

    //fetch array of movies from Movie DB API using genreId variable
    axios.get('https://api.themoviedb.org/3/discover/movie?' +
        'api_key=' + process.env.MOVIE_DB_API_KEY + '&language=en-' +
        'US&sort_by=popularity.desc&page=1&with_genres=' + genreId)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(err => console.log(err));
        //add status error codes/messages**
}

module.exports = router;
