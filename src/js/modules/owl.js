import 'owl.carousel';

var owl = {

	slider: () => {
		$(function() {
			$('.info-slider').each(function() {
				var main_slider = $(this).find('.single-slider');
				var nav_slider = $(this).find('.nav-slider');
				
				var fadeOut = 'fadeOut';
				var fadeIn = 'fadeIn';
				
				if ( $(window).innerWidth() < 580 ) {
					fadeOut = false;
					fadeIn = false;
				}

				let mainSlider = main_slider.owlCarousel({
					items: 1,
					margin: 0,
					loop: true,
					nav: false,
					animateOut: fadeOut,
					animateIn: fadeIn,
					responsive: {
						0: {
							dots: true,
							mouseDrag: true,
							touchDrag: true,
							smartSpeed: 500,
							animateOut: false,
							animateIn: false
						},
						580: {
							dots: false,
							mouseDrag: false,
							touchDrag: false,
							smartSpeed: 1000
						}
					}

				});

				nav_slider.children().each( function( index ) {
				  $(this).attr( 'data-position', index );
				});			

				nav_slider				
					.on('initialized.owl.carousel changed.owl.carousel', function(property) {
						var current = property.item.index;
						var src = $(property.target).find(".owl-item").eq(current)
						$(property.target).find('.owl-item.is-current').removeClass('is-current')
						src.addClass('is-current')	

						$(property.target).find('.owl-stage-outer').css('padding-left', src.width()/2)				
					})
					.on('dragged.owl.carousel', function (e) {
						var carousel = e.relatedTarget;
						var slideIndex = (carousel.relative(carousel.current()));

						main_slider.trigger('to.owl.carousel', [slideIndex])
					})	
					.owlCarousel({
						items: 4,
						dots: false,
						// autoplayHoverPause: true,
						// autoplay: false, 
						nav: false,
						margin: 0,
						loop: true,
						smartSpeed: 450
					})

				$(document).on('click', '.info-slider__nav-item', function() {
					nav_slider.trigger('to.owl.carousel', $(this).data( 'position' ) );
					main_slider.trigger('to.owl.carousel', $(this).data( 'position' ) );
				});
			});
			
			$('.about-slider__mobile-slider').each(function() {
				if ( $(window).innerWidth() < 580 ) {
					$(this).owlCarousel({
						items: 1,
						margin: 0,
						loop: true,
						nav: false,
						dots: true,
						smartSpeed: 500
					});
				}
				
			});
			
		});
		
	},
	
	autowidthSlider: () => {
		
		$(function() {
			
			var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
			var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd";
			
			Number.prototype.pad = function(size) {
				var s = String(this);
				while (s.length < (size || 2)) {s = "0" + s;}
				return s;
			}
			
			function sliderwidth_update(item){
				if(!$(item).length)
					return false;

				let pos = $('.header__wrap').offset().left + parseFloat($('.header__wrap').css('padding-left'));
				
				if ( $('.autowidth-slider').hasClass('js-building-gallery') ) {
				} else {
					$(item).find('.owl-stage-outer').css('padding-left', pos + 'px')
				}
			}

			$('.autowidth-slider').each(function() {

				let slider = $(this);

				let defaults = {
					autoWidth: true,
					autoplay: false, 
					// autoplayTimeout: 8000,
					// autoplayHoverPause: true,
					margin: 43,
					dots: false,
					navText: ['<div class="owl-arrow"> <svg class="owl-arrow__border" viewBox="30 30 60 60"> <circle class="owl-arrow__path" cx="60" cy="60" r="29" fill="none"></circle> </svg> <div class="owl-arrow__item"></div></div>','<div class="owl-arrow owl-arrow_right"> <svg class="owl-arrow__border" viewBox="30 30 60 60"> <circle class="owl-arrow__path" cx="60" cy="60" r="29" fill="none"></circle> </svg> <div class="owl-arrow__item"></div></div>'],
					stagePadding: 91,
					nav: true,
					loop: true,
					smartSpeed: 600,
					responsive:{
						0:{
							margin: 20
						},
						768:{
							margin: 43
						}
					}						
				}
				
				if ( $(this).hasClass('js-building-gallery') ) {
					defaults.autoWidth = false;
					defaults.stagePadding = 0;
					defaults.responsive = {
						0:{
							margin: 10,
							items: 1
						},
						580:{
							margin: 20,
							items: 2
						},
						769:{
							margin: 30,
							items: 4
						}
					}
				}
				
				if ( $(this).hasClass('js-about-gallery') ) {
					defaults.autoWidth = false;
					defaults.stagePadding = 0;
					defaults.responsive = {
						0:{
							margin: 0,
							items: 1
						},
						769:{
							margin: 0,
							items: 1
						}
					}
				}
				
				if ( $(this).hasClass('content-slider') ) {
					defaults.responsive = {
						0:{
							autoWidth: false,
							items: 1,
							margin: 0,
							stagePadding: 0
						},
						769:{
							autoWidth: true,
							margin: 43,
							stagePadding: 91
						}
					}
				}

				if($(this).hasClass('js-inside-nav')){
					defaults.nav = false;
				}

				var stop = false;

				if($(this).hasClass('js-autoplay-false')){
					defaults.autoplay = false;
				}

				if($(this).hasClass('js-move-buttons')){
					let navContainer = $(this).closest('section').find('.owl-scrollbar__buttons-here')
					defaults.navContainer = navContainer;
				}

				$(this).closest('section').find('.owl-arrow__autoplay-border').on('animationiteration', function() {
					slider.trigger('next.owl.carousel', [400]);

					// console.log('change slide')
				})

				let border = slider.closest('section').find('.owl-arrow__autoplay-border');

				if(border.length){
					border.addClass('owl-arrow__autoplay-border_start')
					.on(animationEnd, function(e) {
						$(this).removeClass('owl-arrow__autoplay-border_start')
						slider.trigger('next.owl.carousel', [400]);

					})
				}


				if($(this).hasClass('gallery') &&
					!$(this).hasClass('gallery_small') &&
					!$(this).hasClass('gallery_simple'))
				{
					$(this).find('.gallery__item:nth-child(2n+2)').addClass('gallery__item_small')
					$(this).find('.gallery__item:nth-child(3n+3)').addClass('gallery__item_middle')

				}

				$(this).on('initialized.owl.carousel', function(property) {
					$(this).closest('section').addClass('js-slider-init')
				})

				$(this).on('change.owl.carousel', function(property) {
					$(property.target).find('.owl-scrollbar__done').removeClass('owl-scrollbar__done_start')
					border.removeClass('owl-arrow__autoplay-border_start')
				})

				$(this).on('translated.owl.carousel', function(property) {
					stop = false;

					$(property.target).closest('section').find('.owl-arrow__autoplay-border').addClass('owl-arrow__autoplay-border_start')

				})		

				$(this).on('initialized.owl.carousel changed.owl.carousel', function(property) {



					sliderwidth_update(property.target)

					var current = property.item.index;

					var carousel = property.relatedTarget;

					var slideIndex = (carousel.relative(carousel.current()));

					var total = carousel.items().length;

					var src = $(property.target).find(".owl-item").eq(current)

					$(property.target).find('.owl-item.is-current').removeClass('is-current')

					src.addClass('is-current')		

					// for animation in

					let prevPos = src.prev().index();
					let itemCount = $(property.target).find('.owl-item').length
					let i = 0;

					$(property.target).find('.owl-item').slice(prevPos, itemCount).each(function() {

						$(this).css({
							'transition-delay': (i/8) + "s" 
						})

						i++;

					})


					// 


					if($(property.target).hasClass('js-have-bottom')){
						var num = $(this).closest('section').find('.owl-scrollbar');
						var progress = num.find('.owl-scrollbar__done');

						let width = 100 / (carousel.items().length / (carousel.relative(carousel.current()) + 1 ))

						progress.css('width', width + '%')

						num.find('.owl-scrollbar__text').html('<span>'+(carousel.relative(carousel.current()) + 1 ).pad() + '</span> / ' + carousel.items().length.pad())
					}

					if($(property.target).hasClass('work__gallery')){
						let section = $(property.target).closest('section')
						// let maxPer = Number(section.data('max')) // максимальное число процентов от все ширины
						let width = section.find('.work__steps').width() - section.find('.work__done-item').width() / 2 // вся возможная ширина
						// let maxPx = width / 100 * maxPer; // максимальная длина в px
						let maxPx = section.find('.work__path').width(); // максимальная длина в px
						let stepPx = maxPx / carousel.items().length // число пикселей за 1 шаг

						let currentPx = ((carousel.relative(carousel.current()) + 1) * stepPx) - section.find('.work__done-item').width() / 2 // текущая длина
						let totalPer = 100 / (width / currentPx)

						section.find('.work__done')
						.animate({
							width: currentPx + 'px',
						}, 300, function() {

						});	    			

						section.find('.work__done-item')
						.animate({
							left: currentPx + 'px',
						}, 300, function() {

						});

						$(property.target).attr('data-count', total)

						let subtext = src.find(".gallery__item").attr('data-text') ? " <br> " + src.find(".gallery__item").data('text') : "";

						section.find('.work__done-label span').html(parseInt(totalPer) + '%' + subtext)

						section.find('.work__steps-item').each(function() {
							if(!$(this).is(':nth-child(2)')){
								let xx = $(this).position().left// - $(this).width()
								let pointXX = currentPx + section.find('.work__done-item').width() /// 2

								if(xx < pointXX)
									$(this).addClass('is-active')
								else
									$(this).removeClass('is-active')	    					
							}
						})
					}		

					if($(property.target).find('.owl-scrollbar__done').length){
						$(property.target).find('.is-current .owl-scrollbar__num_left').text((slideIndex + 1).pad())
						$(property.target).find('.is-current .owl-scrollbar__num_right').text(total.pad())

						$(property.target).find('.is-current .owl-scrollbar__done')
						.addClass('owl-scrollbar__done_start')
						.one(animationEnd, function(e) {

							if($(this).closest('.owl-item').hasClass('is-current') && !stop){
								stop = true;

								slider.trigger('next.owl.carousel', [400]);
							}

						})   

					}		

					border.addClass('owl-arrow__autoplay-border_start')



					if($(property.target).hasClass('vantages__slider')){

						// let startIndex = $('.vantages .slider-nav__item_current').index();

						$('.vantages .slider-nav__item')
							.removeClass('slider-nav__item_current')
							.eq(slideIndex)
							.addClass('slider-nav__item_current')  

						if($(window).width() <= 768){

							let elem = $(property.target).closest('section').find('.slider-nav__item_current')
							let list = $(property.target).closest('section').find('.slider-nav__list')

							if(elem.length){
								let current = list.scrollLeft();
								let left = elem.position().left;   

								list.animate({
									scrollLeft: current + left
								}, 400);								
							}

						}	
					}

				}).owlCarousel(defaults)     		
			})
   	
    	});
		
	},
	
	preview: () => {
		
		$(".catalog__preview").each(function(){
			
			var length = $(this).find(".catalog__image").length*1;
			
			if ( length > 1 ) {
				$(this).owlCarousel({
					items: 1,
					dots: false,
					nav: true,
					navigationText : ["",""],
					loop: true
				})
			}
			
		});
		
	},
	
	finishingGallery: () => {
		
		$(".finishing__gallery").each(function(){
			$(this).owlCarousel({
				items: 1,
				dots: false,
				nav: true,
				navigationText : ["",""],
				loop: true,
				margin: 30,
				responsive:{
					0:{
						items: 1,
						margin: 0
					},
					580:{
						items: 2,
						margin: 20
					},
					769:{
						items: 3,
						margin: 30
					}
				}
			});
		});
		
	},
	
	arrows: () => {
		$(document).on("click", '.owl-arrow:not(.js-gallerybutton)', function() {

			if($(this).closest('.owl-nav').length)
				return false;

			let dir = $(this).hasClass('owl-arrow_right') ? 'next' : 'prev';

			let owl = $(this).closest('section').find('.owl-carousel')

			owl.trigger(dir + '.owl.carousel', [600]);

		});
		
		$(document).on("mouseenter", '.owl-arrow:not(.js-gallerybutton)', function() {
			let owl = $(this).closest('section').addClass('js-pause-autoplay')//.find('.owl-carousel')

			// owl.trigger('stop.owl.autoplay')
		});

		$(document).on("mouseleave", '.owl-arrow:not(.js-gallerybutton)', function() {
			let owl = $(this).closest('section').removeClass('js-pause-autoplay')//.find('.owl-carousel')

			// owl.trigger('play.owl.autoplay')
		});
	},

	init: () => {

		owl.slider();
		owl.arrows();
		owl.autowidthSlider();
		owl.preview();
		owl.finishingGallery();

	}
}

export { owl }