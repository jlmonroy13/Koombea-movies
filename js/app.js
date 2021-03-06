$(function() { 
	

	//REQUEST FOR TRAILER OF A MOVIE
	var trailermovie = function(array, indice) {
		//Request for trailer of each Movie
		$.ajax({ type: 'GET',
			url: 'http://api.themoviedb.org/3/movie/'+array[indice].id+'?api_key=c0b2e256491361d28c75bbe8f9e59a85&append_to_response=videos',
			async: false,
			success: function(dataTrailer) {
				array[indice].trailer = dataTrailer.videos.results[0].key;
			}
		});
	}
	//REQUEST FOR SIMILARS MOVIE
	var getSimilarMovies = function(array, indice) {
		$.ajax({ type: 'GET',
			url: 'https://api.themoviedb.org/3/genre/'+array[indice].genre_ids[0]+'/movies?api_key=c0b2e256491361d28c75bbe8f9e59a85',
			async: false,
			success: function(dataSimilars) {
				array[indice].similars_movies = dataSimilars.results;
			}
		});
	}
	//INSERT INFORMATION OF THE MOVIE
	var insertMovieInfo = function(array, indice) {
		htmlStart1 += '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+array[indice].trailer+'" frameborder="0" allowfullscreen></iframe>'
		htmlStart1 += '<div  class="main_infoMovie_description">';
		htmlStart1 += '<h2>'+array[indice].title+'</h2>';
		htmlStart1 += '<a href="" data-index="'+0+'" class="btn-favorites btn-favoritesB">ADD TO FAVORITES</a>';
		htmlStart1 += '<p>'+array[indice].overview+'</p>';
		htmlStart1 += '<h3>Similar Movies</h3>';
		htmlStart1 += '<div class="main_infomovie_similarMoviesList">';
		// generate similar movies
		$.each(array[indice].similars_movies, function(i, data2){ 
			htmlStart1 += '<div class="similarMovie">';
			htmlStart1 += '<img src="http://image.tmdb.org/t/p/w500'+data2.poster_path+'">';
			htmlStart1 += '<div class="movie_info">';
			htmlStart1 += '<h4>'+data2.title+'</h4>';
			htmlStart1 += '<span>2015</span></div>';
			htmlStart1 += '</div>';
		});
		htmlStart1 += '</div></div>';
		$('#info-movie').html(htmlStart1);
	}
	//GET MOVIE LIST FUNCTION 
	var newlist = function(url_new){
		$('#info-movie').empty();
		//Request for the Now playing list
		$.ajax({ type: 'GET', url: url_new, async: false, success: function(data) { //what to do when the API answer
				// Creating the movies at left menu
				var movieHTML = '';
				//Changing the background image to the cover of the first movie
				$('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[0].backdrop_path+'") no-repeat');
				$('.cover').css('background-size', 'cover');
				$.each(data.results, function(i, movie){ 
					data.results[i].favorite = false;
					
					//Get only the year
						var arr = movie.release_date.split('-');
						var date = arr[0];
					// Variable to the DOM
						movieHTML += '<div class="main_leftMenu_moviesList_movie">';
						movieHTML += '<a class="btn_movie_leftMenu" data-index="'+i+'" href="javascript:void(0)">';
						movieHTML += '<img class="img_movie_leftMenu" src="http://image.tmdb.org/t/p/w500'+movie.poster_path+'">';
						movieHTML += '</a><h4>'+movie.title+'</h4>';
						movieHTML += '<span>'+date+'</span>';
						movieHTML += '</div>';
				}); // End array cicle
				$('#leftMenu').html(movieHTML);
				allMovies = data.results;
				exists = 0;
				$('.categories_favorites').remove();
			}
		});//End getMovies Function
			trailermovie(allMovies, 0);
		//Request for similar movies of each Movie
			getSimilarMovies(allMovies, 0);
		//Insert information of the first movie of the list
			insertMovieInfo(allMovies, 0);
	};	
//Request for Movies and adding to the DOM
	var allMovies = [];
	var url_now_playing = "https://api.themoviedb.org/3/movie/now_playing?api_key=c0b2e256491361d28c75bbe8f9e59a85";
	var htmlStart = '';
	//REQUEST FOR THE FIRST LIST (NOY PLAYING)
	$.ajax({ type: 'GET', url: url_now_playing, async: false,
		success: function(data) { //what to do when the API answer
			// Creating the movies at left menu
			var movieHTML = '';
			//Changing the background image to the cover of the first movie
			$('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+data.results[0].backdrop_path+'") no-repeat');
			$('.cover').css('background-size', 'cover');
			$.each(data.results, function(i, movie){ 
				data.results[i].favorite = false;
				
				//Get only the year
					var arr = movie.release_date.split('-');
					var date = arr[0];
				// Variable to the DOM
					movieHTML += '<div class="main_leftMenu_moviesList_movie">';
					movieHTML += '<a class="btn_movie_leftMenu" data-index="'+i+'" href="javascript:void(0)">';
					movieHTML += '<img class="img_movie_leftMenu" src="http://image.tmdb.org/t/p/w500'+movie.poster_path+'">';
					movieHTML += '</a><h4>'+movie.title+'</h4>';
					movieHTML += '<span>'+date+'</span>';
					movieHTML += '</div>';
			}); // End array cicle
			$('#leftMenu').html(movieHTML);
			allMovies = data.results;
			exists = 0;
			$('.categories_favorites').remove();
		}
	});//End getMovies Function
	//Request for trailer of the first Movie
		trailermovie(allMovies, 0);
	//Request for similar movies of the first Movie
		getSimilarMovies(allMovies, 0);
	//Inserting the information of the first movie when the page is load
		insertMovieInfo(allMovies, 0);

	var htmlStart1 = '';
/*SELECT LIST MOVIE-------------------------*/
	$('.main_leftMenu_categories').change(function(){
		
		var selectedOption = $('.main_leftMenu_categories option:selected');
	/*NOW PLAYING SELECTION---------------------------------------------------------------------*/		
		if( selectedOption.val() == 'now_playing') {		
			var url_now_playing = "https://api.themoviedb.org/3/movie/now_playing?api_key=c0b2e256491361d28c75bbe8f9e59a85";
			newlist(url_now_playing);
	/*POPULAR SELECTION---------------------------------------------------------------------*/			
		}else if(selectedOption.val() == 'popular') {
			var url_popular = "https://api.themoviedb.org/3/movie/popular?api_key=c0b2e256491361d28c75bbe8f9e59a85";
			newlist(url_popular);
	/*UPCOMING SELECTION---------------------------------------------------------------------*/			
		}else if(selectedOption.val() == 'upcoming') {
			var url_upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=c0b2e256491361d28c75bbe8f9e59a85";
			newlist(url_upcoming);
	/*TOP RELATED SELECTION---------------------------------------------------------------------*/			
		}else if(selectedOption.val() == 'top_rated') {
			var url_top_rated = "https://api.themoviedb.org/3/movie/top_rated?api_key=c0b2e256491361d28c75bbe8f9e59a85";
			newlist(url_top_rated);
	/*FAVORITES SELECTION---------------------------------------------------------------------*/		
		}else if(selectedOption.val() == 'favorites') {
			console.log(allMovies);
			var movieHTML = '';
			$.each(allMovies, function(i, movie){ 
				if(movie.favorite) {
					//Get only the year
						var arr = movie.release_date.split('-');
						var date = arr[0];
					// Variable to the DOM
						movieHTML += '<div class="main_leftMenu_moviesList_movie">';
						movieHTML += '<a class="btn_movie_leftMenu" data-index="'+i+'" href="javascript:void(0)">';
						movieHTML += '<img class="img_movie_leftMenu" src="http://image.tmdb.org/t/p/w500'+movie.poster_path+'">';
						movieHTML += '</a><h4>'+movie.title+'</h4>';
						movieHTML += '<span>'+date+'</span>';
						movieHTML += '</div>';
				}	
			}); // End array cicle
			$('#leftMenu').html(movieHTML);
		}			
	});

//When you click a movie of the left menu--------------------------------------
	$('#leftMenu').on('click', '.btn_movie_leftMenu', function() {
		var index = $(this).data('index');
		//Request for trailer of each Movie
			trailermovie(allMovies, index);
		//Request for similar movies of each Movie
			getSimilarMovies(allMovies, index);
		//Changing the background image to the cover of the first movie
		$('.main').css('background', 'url("http://image.tmdb.org/t/p/w1920'+ allMovies[index].backdrop_path +'") no-repeat');
		$('.cover').css('background-size', 'cover');
		
		//Changing the main info of each movie
		var mainHTML = '';
		mainHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+allMovies[index].trailer+'" frameborder="0" allowfullscreen></iframe>'
		mainHTML += '<div  class="main_infoMovie_description">';
		mainHTML += '<h2>'+allMovies[index].title+'</h2>';
		// Checking if this is a favorite movie to change the color of 'add to favorite' button
		if(allMovies[index].favorite) {
			mainHTML += '<a href="" data-index="'+index+'" class="btn-favorites btn-favoritesN">REMOVE FROM FAVORITES</a>';
		} else {
			mainHTML += '<a href="" data-index="'+index+'" class="btn-favorites btn-favoritesB">ADD TO FAVORITES</a>';
		}
		mainHTML += '<p>'+allMovies[index].overview+'</p>';
		mainHTML += '<h3>Similar Movies</h3>';
		mainHTML += '<div class="main_infomovie_similarMoviesList">';
		// generate similar movies
		$.each(allMovies[index].similars_movies, function(i, data2){ 
			mainHTML += '<div class="similarMovie">';
			mainHTML += '<img src="http://image.tmdb.org/t/p/w500'+data2.poster_path+'">';
			mainHTML += '<div class="movie_info">';
			mainHTML += '<h4>'+data2.title+'</h4>';
			mainHTML += '<span>2015</span></div>';
			mainHTML += '</div>';
		});
		mainHTML += '</div></div>';
		$('#info-movie').html(mainHTML);
	});//end click a movie of the left menu

//Add and Remove favorites------------------------------------------------------
	var index;
	var exists = 0;
	$('#info-movie').on('click', '.btn-favorites', function(event){
		event.preventDefault();
		index = $(this).data('index');
		//If the movie you click is a favorite movie change to a no favorite movie
		if(allMovies[index].favorite) {
			allMovies[index].favorite = false;
			$(this).text('ADD TO FAVORITES');
			$(this).removeClass('btn-favoritesN');
			$(this).addClass('btn-favoritesB');
		//If the movie you click is a NO favorite movie change to a favorite movie and add favorite option	
		}else if(allMovies[index].favorite === false) { 
			allMovies[index].favorite = true;
			$(this).text('REMOVE FROM FAVORITES');
			$(this).removeClass('btn-favoritesB');
			$(this).addClass('btn-favoritesN');
			// Checking if the favorites option is in the select dropdown menu
			$('.main_leftMenu_categories option').each(function(){
			    if (this.value !== 'favorites') {
					exists += 1;
			    }else if (this.value === 'favorites') {
			    	exists += 1;
			    }
			});
			if(exists === 4) {
				var selectHTML = '';
				$('.main_leftMenu_categories').append('<option class="categories_favorites" value="favorites">Favorites</option>');
				exists = 0;
			}
		}
		//Refresh the left menu when favorites option is selected
		var movieHTML2 = '';
		if($('.main_leftMenu_categories option:selected').text()==='Favorites') {
			if($('#leftMenu').children().length === 1) {
				$('#leftMenu').empty();
			}
			$.each(allMovies, function(i, movie){ 
				if(movie.favorite) {
				//Get only the year
					var arr = movie.release_date.split('-');
					var date = arr[0];
				// Variable to the DOM
					movieHTML2 += '<div class="main_leftMenu_moviesList_movie">';
					movieHTML2 += '<a class="btn_movie_leftMenu" data-index="'+i+'" href="javascript:void(0)">';
					movieHTML2 += '<img class="img_movie_leftMenu" src="http://image.tmdb.org/t/p/w500'+movie.poster_path+'">';
					movieHTML2 += '</a><h4>'+movie.title+'</h4>';
					movieHTML2 += '<span>'+date+'</span>';
					movieHTML2 += '</div>';
				}	
			}); // End array cicle	
			$('#leftMenu').html(movieHTML2);
		}
	}); //end favorite click function
	$('.navbar_btn_leftmenu').click(function(){ // Function to hide the left Menu
		$('.main_leftMenu').toggle();
		$('#info-movie').toggleClass('main_infoMovie-width');
	});
});//End Document Ready