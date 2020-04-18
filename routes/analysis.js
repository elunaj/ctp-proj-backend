const express = require('express');
const router = express.Router();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

// root route
router.post('/', (req, res) => {

	const { text } = req.body;

	const toneAnalyzer = new ToneAnalyzerV3({
	  version: '2017-09-21',
	  authenticator: new IamAuthenticator({
	    apikey: process.env.API_KEY,
	  }),
	  url: 'https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/8ef73b3e-9207-4d9f-b6ca-96403fe0228c',
	});

	const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
    	.then(toneAnalysis => {
    		res.json(toneAnalysis.result)
    	})
    	.catch(err => {
    		console.log(err);
    	})

});

module.exports = router;
