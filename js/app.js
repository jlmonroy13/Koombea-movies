$(function() { 
//Request for Movies and adding to the DOM
	var apiKey = "c0b2e256491361d28c75bbe8f9e59a85"; // API KEY The Movie DB		
	var url_top_rated = "https://api.themoviedb.org/3/movie/top_rated?api_key="+apiKey;
	var url_now_playing = "https://api.themoviedb.org/3/movie/now_playing?api_key="+apiKey;
	var url_popular = "https://api.themoviedb.org/3/movie/popular?api_key="+apiKey;
	var url_upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key="+apiKey;
	function getMovies(data) { //what to do when the API answer
		console.log(data.results);
		// Creating the movies
		var movieHTML = '';
		$.each(data.results, function(i, movie){ 
			data.results[i].favorite = false;
			//Request for trailer of each Movie
				var url_trailer = 'http://api.themoviedb.org/3/movie/'+movie.id+'?api_key='+apiKey+'&append_to_response=videos';
				function getTrailer(dataTrailer) {
					data.results[i].trailer = dataTrailer.videos.results[0].key;
				}
				$.getJSON(url_trailer, getTrailer);
			//Request for similar movies of each Movie
				var url_similars = 'https://api.themoviedb.org/3/genre/'+movie.genre_ids[0]+'/movies?api_key='+apiKey;
				function getSimilars(dataSimilars) { 
					console.log(dataSimilars);
					data.results[i].similars_movies = dataSimilars.results;
				}
				$.getJSON(url_similars, getSimilars);	


			//Get only the year
			var arr = movie.release_date.split('-');
			var date = arr[0];
			// Variable to the DOM
			movieHTML += '<div class="main_leftMenu_moviesList_movie">';
			movieHTML += '<a data-index="'+i+'" href="javascript:void(0)">';
			movieHTML += '<img src="http://image.tmdb.org/t/p/w500'+movie.poster_path+'">';
			movieHTML += '</a><h4>'+movie.title+'</h4>';
			movieHTML += '<span>'+date+'</span>';
			movieHTML += '</div>';
		}); // End array cicle
		$('#leftMenu').html(movieHTML);
		//Changing the background image to the cover of the first movie
		$('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[0].backdrop_path+'") no-repeat');
		$('.cover').css('background-size', 'cover');
	};//End getMovies Function
	$.getJSON(url_top_rated, getMovies); 
});//End Document Ready