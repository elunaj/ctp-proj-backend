const express = require('express');
const router = express.Router();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

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

            if (toneAnalysis.result.document_tone.tones.length) {

                const findGenres = require('../middleware/find-genre').findGenres;
                const findMovies = require('../middleware/find-movie').findMovies;
                findGenres(toneAnalysis, res, findMovies);

            } else {
                res.status(400).json("tone not found");
            }
            
    	})
    	.catch(err => {
    		res.status(400).json("bad request");
    	})

});


module.exports = router;
