//import simpleParallax from 'simple-parallax-js';

var defaults = {

	events: () => {
		/*var image = document.getElementsByClassName('offer__bg-image');
		new simpleParallax(image, {
			delay: 1.4,
			scale: 1.2,
			transition: 'cubic-bezier(0,0,0,1)'
		});*/
		
		$('*[data-for]').on('click', function() {
			let type = $(this).data('for');

			$('.modals .horizontal-messengers__input').filter('[value='+type+']').closest('.horizontal-messengers__link').click();
		});
		
		$('.horizontal-messengers__demo').on('mouseenter click', function() {
		
			if($(window).width() <= 580){
				$('.mobile:not(#mobile-messengers)').removeClass('mobile_visible')
				$('.js-toggle-mobile').removeClass('is-active')
				$('#mobile-messengers').toggleClass('mobile_visible')

				if($('#mobile-messengers').hasClass('mobile_visible')){
					$('html, body').addClass('js-lock')
				}else{
					$('html, body').removeClass('js-lock')
				}
			}else{
				$(this).parent().addClass('is-active')
			}
		});
		
		$('.horizontal-messengers').mouseleave(function(){
			$(this).removeClass('is-active').blur()
		});
		
		$('.js-messengers-close').on('click', function(e) {
			e.preventDefault()
			$(this).closest('.horizontal-messengers').removeClass('is-active').blur()
		});

		$('a[href*="tel:"]').on('click', function() {
			$("html, body").removeClass('js-lock')
			setTimeout(function() {
				$("html, body").removeClass('js-lock')
			}, 100)
		});
		
		// Scroll menu
		
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var navTop = $('.nav').offset().top;
			var viewport_height = $(window).innerHeight();
    		var viewport_width = $(window).innerWidth();
			
			if ( $(window).width() > 800 ) {
				
				if ( scrollTop > navTop  ) {
					$('.nav').addClass("is-fixed");
				} else {
					$('.nav').removeClass("is-fixed");
				}
			
			}
    
			$(".js-paralax").each(function(){
				var paralax_pos = $(this).offset().top;
				var paralax_side = $(this).data("paralax-side");
				var paralax_step = $(this).data("paralax-step");
				if ( paralax_side == 'bottom') {
					$(this).attr("style","transform: translateY(" + (-scrollTop - paralax_pos )/paralax_step + "px)" );
				} 
				if ( paralax_side == 'left') {
					$(this).attr("style","transform: translateX(" + (scrollTop - paralax_pos + viewport_height )/paralax_step + "px)" );
					if ( viewport_width < viewport_height ) {
						$(this).attr("style","transform: translateX(" + (scrollTop - paralax_pos + ( viewport_height/2 ) )/paralax_step + "px)" );
					}
				} else {
					$(this).attr("style","transform: translateY(" + (scrollTop - paralax_pos )/paralax_step + "px)" );
				}
			});
			
		});
		
		// Notify
		
		$('.js-notify-button').click(function(){
			$(this).hide();
			$('.notify__form').addClass('is-active');
			
			return false;
		});
		
		// Scroll to
		$(".js-scroll-to").click(function() {
			let attr_href = $(this).attr("href"),
				data_href = $(this).data("href");
			if ( data_href ) {
				attr_href = data_href;
			}
			$("html, body").animate({
				scrollTop: $(attr_href).offset().top + "px"
			}, {
				duration: 1000
			});
			return false;
		});
		
		//
		
		$('.catalog__link').click(function(){
			let roomName = $(this).data('room-name');
			$("#price input[name='subj']").val('Узнать цену на квартиру: ' + roomName);
		});
		
		// Video play
		
		$(".js-play").click(function(){
			let video = $(this).data("video");
			$(this).closest(".video").append(video);
		});
		
		$('.pagination__link').click(function(){
			$('.pagination__link.is-active').removeClass('is-active');
			$(this).addClass('is-active');
			return false;
		});
		
	},
	
	hamburgers: () => {
		
		$('.js-toggle-mobile').on('click', function() {
			$(this).toggleClass('is-active')
			$('html, body').toggleClass('js-lock')
			$('.mobile:not(#mobile-menu)').removeClass('mobile_visible')
			$('#mobile-menu').toggleClass('mobile_visible')

			if($('#mobile-menu').hasClass('mobile_visible')){
				$('html, body').addClass('js-lock')
			}else{
				$('html, body').removeClass('js-lock')
			}
		});
		
	},

	init: () => {

		defaults.events();
		
		defaults.hamburgers();

	}
}

export { defaults }