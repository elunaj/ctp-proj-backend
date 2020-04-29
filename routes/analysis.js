const express = require('express');
const router = express.Router();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const axios = require('axios');

// analysis route ** comments will be added soon
router.post('/', (req, res, next) => {

	const { text } = req.body;

	const toneAnalyzer = new ToneAnalyzerV3({
	  version: '2017-09-21',
	  authenticator: new IamAuthenticator({
	    apikey: process.env.IBM_API_KEY,
	  }),
	  url: 'https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/8ef73b3e-9207-4d9f-b6ca-96403fe0228c',
	});

	const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
    	.then(toneAnalysis => {
            
    		// res.json(toneAnalysis.result.document_tone);
            findMovies(toneAnalysis, res);
            console.log('tone')
    	})
    	.catch(err => {
    		console.log(err);
    	})
});

// **comments will be added soon
const findMovies = (toneAnalysis, res) => {

    axios.get("https://api.themoviedb.org/3/discover/movie?" +
        "api_key=" + process.env.MOVIE_DB_API_KEY + "&language=en-" +
        "US&sort_by=popularity.desc&page=1&with_genres=27")
        .then(response => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => console.log(err));
    // console.log(toneAnalysis.result.document_tone);
    // res.json(toneAnalysis.result.document_tone);
}

module.exports = router;
