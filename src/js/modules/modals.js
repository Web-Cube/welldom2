import "magnific-popup";
import { config } from "../config";

var modals = {

	close: (e) => {

		if(!e)
			return false;

		e.preventDefault();

		config.log('close modal');

		$.magnificPopup.close();


	},

	openCallback: (evt, items) => {
		evt.preventDefault();

		$.magnificPopup.close();

		// setTimeout(function(){
		$.magnificPopup.open({
			items: items,
			type: 'image',
			closeMarkup: '<div class="modals__close close js-close-modal js-modal"> <svg class="icon icon-cancel cancel" viewBox="0 0 64 64"> <use xlink:href="/app/icons/sprite.svg#cancel"></use> </svg></div>',
			gallery: {
				enabled: true,
				arrowMarkup: '<div class="modals__arrow owl-arrow owl-arrow_%dir% js-gallerybutton js-gallerybutton-%dir%"> <svg class="owl-arrow__border" viewBox="30 30 60 60"> <circle class="owl-arrow__path" cx="60" cy="60" r="29" fill="none"></circle> </svg> <div class="owl-arrow__item"></div></div>',
			}
		});
		// }, 700);
	},

	open: (e, modal) => {

		e = e || false;

		if(e) e.preventDefault();

		modal = modal || (e != false ? ($(e.currentTarget).attr('href') ? $(e.currentTarget).attr('href') : $(e.currentTarget).data('modal')) : e);

		if(!modal)
			return false;

		if(e && $(e.currentTarget).attr('data-youtube')){
			$(modal + ' iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).data('youtube')+'?autoplay=1&showinfo=0&rel=0&controls=0')
		}

		if(e && $(e.currentTarget).attr('data-input')){
			$(modal + ' input[name="form"]').val($(e.currentTarget).data('input'))
		}

		config.log('modal open');

		var map_load = false;

		//$.magnificPopup.close();

		$.magnificPopup.open({
			tClose: '???????',
			removalDelay: 600,
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'hidden',
			closeMarkup: '<div class="modals__close close js-close-modal"> <svg class="icon icon-cancel cancel" viewBox="0 0 64 64"> <use xlink:href="/app/icons/sprite.svg#cancel"></use> </svg></div>',
			mainClass: 'css-modal-animate',
			items: {
				src: modal,
				type: 'inline'
			},
			callbacks: {
				beforeOpen: function() {
					if($(window).width() > 1024)
						$('body').addClass('no-scroll')

					if(modal.indexOf("map") !== -1 && !map_load){
						map_create()
					}
				},
				open: function () {
				  $('.flat__gallery-item, .flat__icon_zoom').on('click', function(e){
						modals.openCallback(e, items)
				  });
				},
				afterClose: function() {
					$('.modals__state_new').removeClass('is-active')
					$('body').removeClass('no-scroll')
					// $('.modals').removeClass('js-open-submodal')
					$('*[data-submodal-id]').removeClass('is-visible')
					$('.modals .horizontal-messengers__input').prop('checked', false);
				},
				close: function() {
					$('.modals__video iframe').attr('src','');
				}
			}
		}, 0);

		var items = [];
		$(".flat__gallery-item").each(function() {
		  items.push( {
			src: $(this).attr("href"),
		  } );
		});

		function map_create() {
			map_load = true
			$.getScript( 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', function( data, textStatus, jqxhr ) {
				ymaps.ready(function () {
					$('.map-box').each(function() {
						let len = Number($(this).data('len')), lng = Number($(this).data('lng')), thisID = $(this).attr('id');
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
							iconImageSize: [80, 90],
							iconImageOffset: [-40, -90]
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

	},


	init: (e) => {


		$(document).on('click', '.js-close-modal', modals.close);

		$(document).on('click', '.js-modal', modals.open);

		$(document).on('click', '.js-gallerybutton', function(e) {
			e.preventDefault()
			let next = $(this).hasClass('js-gallerybutton-right') ? 1 : 0;
			var magnificPopup = $.magnificPopup.instance;

			console.log('gallery: ' + next)

			if(next)
				magnificPopup.next(); // go to next item
			else
				magnificPopup.prev();
		});

		$('.js-gallery').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				tClose: '???????',
				removalDelay: 600,
				fixedContentPos: false,
				closeOnContentClick: false,
				fixedBgPos: true,
				closeMarkup: '<div class="modals__close close js-close-modal"> <svg class="icon icon-cancel cancel" viewBox="0 0 64 64"> <use xlink:href="/app/icons/sprite.svg#cancel"></use> </svg></div>',
				mainClass: 'css-modal-animate',
				image: {
					verticalFit: true
				},
				gallery: {
				    arrowMarkup: '<div class="modals__arrow owl-arrow owl-arrow_%dir% js-gallerybutton js-gallerybutton-%dir%"> <svg class="owl-arrow__border" viewBox="30 30 60 60"> <circle class="owl-arrow__path" cx="60" cy="60" r="29" fill="none"></circle> </svg> <div class="owl-arrow__item"></div></div>',
					enabled: true,
					navigateByImgClick: true
				}


			});
		});


		/*$(window).on('load',function(){
			$.magnificPopup.open({
				tClose: '???????',
				removalDelay: 600,
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'hidden',
				closeMarkup: '<div class="modals__close close js-close-modal"> <svg class="icon icon-cancel cancel" viewBox="0 0 64 64"> <use xlink:href="/app/icons/sprite.svg#cancel"></use> </svg></div>',
				mainClass: 'css-modal-animate',
				items: {
					src: '#promo1',
					type: 'inline'
				}
			}, 0);
		});*/

	}

};


export { modals };
