var $slider = $('.about-slider__carousel');
var count = $slider.find('.about-slider__item').length;
var cur = $slider.find('.about-slider__item_current');
var progress;

var aboutSlider = {

	progress: () => {

		progress =  100 / (count / 1)

		$slider.find('.about-slider__nav-done').css({
			"clip-path" : "polygon(0 0, 100% 0, 100% "+progress+"%, 0 "+progress+"%)",
			"-webkit-clip-path" : "polygon(0 0, 100% 0, 100% "+progress+"%, 0 "+progress+"%)",
		})
	},

	actions: () => {
		
		var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
		var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd";

		function slider_to(dir) {
			var method = (typeof dir == "number" ) ? "to" : dir;
			var current = $slider.find('.about-slider__item_current');
			var next;
			

			if(method == "to"){
				next = dir;
			}else{
				
				if (method == "next") {
					
					next = (current.index() >= (count-1)) ? $slider.find('.about-slider__item:first-child').index() : current.next().index();
				}else{
					next = (current.index() <= 0) ? $slider.find('.about-slider__item:last-child').index() : current.prev().index();
				}
			}

			progress =  100 / (count / (next+1))

			// clip-path: polygon(0 0, 100% 0, 100% 18%, 0 18%);

			$slider.find('.about-slider__nav-done').css({
				"clip-path" : "polygon(0 0, 100% 0, 100% "+progress+"%, 0 "+progress+"%)",
				"-webkit-clip-path" : "polygon(0 0, 100% 0, 100% "+progress+"%, 0 "+progress+"%)",
			})

			$slider.find('.about-slider__dot').removeClass('about-slider__dot_active').eq(next).addClass('about-slider__dot_active')


			$slider.find('.about-slider__list')
			.addClass('is-hide')
			.one(animationEnd, function() {
				$(this).css({
					'transform': 'translate(-'+(next*100)+'%, 0)'
				}).removeClass('is-hide')


				current.removeClass('about-slider__item_current')
				$slider.find('.about-slider__item').eq(next).addClass('about-slider__item_current')

			})
			
			$slider
				.find('.about-slider__nav-item')
				.removeClass('about-slider__nav-item_current')
				.eq(next)
				.addClass('about-slider__nav-item_current')

			//$('.about-slider__nav-num').text((next+1).pad())


		}
		
		$slider.find('.about-slider__nav-item').on('click', function() {
			slider_to($(this).index())
		})


		$slider.find('.about-slider__dot').on('click', function() {
			slider_to($(this).index())
		})
		

		$slider.find('.owl-arrow').on('click', function() {
			var dir = $(this).hasClass('owl-arrow_right') ? "next" : "prev";
			slider_to(dir)
		})

	},
	
	load: () => {

		function slider_nav_init() {
			var type = 0.5, //circle type - 1 whole, 0.5 half, 0.25 quarter
			    radius = $slider.height() + 'px', //'400px', //distance from center
			    start = -90, //shift start from 0
			    $elements = $slider.find('.about-slider__nav-item'),
			    numberOfElements = $elements.length - 1, //adj for even distro of elements when not full circle
			    slice = 180 * type / numberOfElements;

			$elements.each(function(i) {
			    var $self = $(this),
			        rotate = slice * i + start,
			        rotateReverse = rotate * -1;
			    
			    $self.css({
			        'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
			    });
			});			
		}

		//slider_nav_init()

		//$(window).on('resize', slider_nav_init)

	},

	init: () => {

		aboutSlider.progress();
		aboutSlider.actions();
		aboutSlider.load();

	}
}

export { aboutSlider }