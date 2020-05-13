// Finds Movie DB API genre id
const findGenres = (toneAnalysis, res, callback) => {

    //grab map with emotion to genre mapping
    const map = require('../tone-genre-map/map').map;

    console.log(toneAnalysis.result.document_tone.tones);
    //grabs overall document tone

    const tone = toneAnalysis.result.document_tone.tones[0].tone_id;

    //grab array of genre ids from map
    const genreArray = map.get(tone);

    //grab a random genre id from our pre-defined emotion-genre map
    const genreId = genreArray[Math.floor(Math.random() * genreArray.length)];

    //call findMovies function with genreId and res object
    callback(genreId, res, tone);
}


module.exports = {
	findGenres
}