$(function(){
	

	var numeros = [ 
	{
		primero: 1
	},
	{
		primero: 2
	},
	{
		primero: 3
	}
	];

		var coleto = 0;
		$.each(numeros, function(i,movie) {
			coleto += movie.primero;
		});	



	var sumar = function(n, data) {
		var suma = 0;
		suma = 5+n;
		$('#jorge').html(suma);
		var monroy = data + ' de la familia monroy' + coleto;
		mensaje(monroy);
	};

	var mensaje = function(data2) {
		alert(data2)
	};



	$('.luis').on('click', function(event) {
		event.preventDefault();
		sumar(numeros[0].primero, 'soy el lucho');
	});
	$('.tia').on('click', function(event) {
		event.preventDefault();
		sumar(numeros[2].primero, 'soy la tiita');
	});
});
	

