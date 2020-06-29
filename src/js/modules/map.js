var map = {
	
	load: () => {
		$('.js-address').click(function(){
			var position = $(this).attr('href');

			$('.js-address.is-active').removeClass('is-active');
			$(this).addClass('is-active');
			
			$('.contact__map:visible').hide();
			$('.contact__map'+position).fadeIn(500);
			
			return false;
		});
	},

	init: () => {
		map.load();
	}
}

export { map }