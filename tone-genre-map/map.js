/*

In this file we map a user's tone analysis to a movie genre.

The following is the list of possible 
tones obtained from the IBM-Watson Tone Analysis API:

"anger", "fear", "joy", "sadness", "analytical", "confident", "tentative".

This is a list of genres and genre id's needed to obtain 
recommendations from the Movie DB API:

"genre": "Action", "id": 28,
"genre": "Animation", "id": 16,
"genre": "Adventure", "id": 12,
"genre": "Comedy", "id": 35,
"genre": "Crime", "id": 80,
"genre": "Documentary", "id": 99,
"genre": "Drama", "id": 18,
"genre": "Family", "id": 10751,
"genre": "Fantasy", "id": 14,
"genre": "History", "id": 36,
"genre": "Horror", "id": 27,
"genre": "Music", "id": 10402,
"genre": "Mystery", "id": 9648,
"genre": "Romance", "id": 10749,
"genre": "Science Fiction", "id": 878,
"genre": "Tv Movie", "id": 10770,
"genre": "Thriller", "id": 53,
"genre": "War", "id": 10752,
"genre": "Western", "id": 37,

The philosophy behind emotion-to-genre mappings is simple --
reinforce "positive" emotions and counteract "negative emotions":


“anger” -> "comedy", "family", "music", "animation", "adventure"
"fear" ->  "family", "music", "comedy", "fantasy"
"joy" ->  "adventure", "comedy", "music", "romance", "thriller"
"sadness" -> "animation", "family", "comedy", "fantasy", "music", "romance"
"analytical" -> "crime", "drama", "documentary", "history", "mystery", "science fiction", "thriller", "war"
"confident" -> "action", "adventure", "drama", "horror", "mystery", "war"
"tentative" -> "action", "adventure", "comedy", "family", "music"
*/

const map = new Map();

// Match emotion to Movie DB Api genre id
map.set("anger", [35, 10751, 10402, 16, 12]);
map.set("fear", [10751, 10402, 35, 14]);
map.set("joy", [12, 35, 10402, 10749, 53]);
map.set("sadness", [16, 10751, 10402, 14, 10402, 10749]);
map.set("analytical", [80, 18, 99, 36, 9648, 878, 53, 10752]);
map.set("confident", [28, 12, 18, 27, 9648, 10752]);
map.set("tentative", [28, 12, 35, 10751, 10402]);

module.exports = {
	map
}