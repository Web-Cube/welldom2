var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd";
var map_load = false;
var documentLoad = false;
var preloaderEnd = false;


function resize_window() {

	$('.js-resize').each(function() {
		var width;

		if($(this).hasClass('js-resize-right')){
			width = $("body").prop("clientWidth") - ($(this).parent().offset().left + parseFloat($(this).parent().css('padding-left')));
		}else{
			width = $(this).parent().offset().left + $(this).parent().outerWidth();
		}
		
		$(this).width(width)
	})	
}

Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getRandomArbitary(min, max){
	return Math.random() * (max - min) + min;
}

function sliderwidth_update(item){
	if(!$(item).length)
		return false;

	let pos = $('.header__wrap').offset().left + parseFloat($('.header__wrap').css('padding-left'));

	$(item).find('.owl-stage-outer').css('padding-left', pos + 'px')
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function map_create() {
	map_load = true
	$.getScript( 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', function( data, textStatus, jqxhr ) {
		ymaps.ready(function () {
			$('.map-box').each(function() {
				
				var position1 = $(this).data('len');
				var position2 = $(this).data('lng');
				
				let len = Number(position1), lng = Number(position2), thisID = $(this).attr('id');
				var myMap = new ymaps.Map(thisID, {
					// 
					center: [len, lng],
					zoom: 15,
					controls: []
				}, {
					searchControlProvider: 'yandex#search'
				}),

				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				}, {
					iconLayout: 'default#image',
					iconImageHref: '/app/img/mark.png',
					iconImageSize: [122, 137],
					iconImageOffset: [-61, -140]
				});

				myMap.geoObjects.add(myPlacemark);
				myMap.behaviors.disable('scrollZoom');
				myMap.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullsxreenControl').remove('rullerControl');

				myMap.controls.add('zoomControl', {
					float: 'none',
					position: {
						right: 10,
						top: 50
					}
				});

				$('.modals_map').removeClass('js-map-loading')

				myMap.container.fitToViewport();				
			})			

		});
	});  
}

$(window).on('load', function(){
	
	setTimeout(function(){
		map_create();
	},1000);
});

var thousandSeparator = str => {
	var parts = (str + '').split('.'),
		main = parts[0],
		len = main.length,
		output = '',
		i = len - 1;

	while(i >= 0) {
		output = main.charAt(i) + output;
		if ((len - i) % 3 === 0 && i > 0) {
			output = ' ' + output;
		}
		--i;
	}

	if (parts.length > 1) {
		output += '.' + parts[1];
	}
	return output;
};