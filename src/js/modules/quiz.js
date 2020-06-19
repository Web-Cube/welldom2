var quiz = {

	events: () => {
		
		var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
		var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd";

		$(window).on('load resize', function() {
			if($(window).width() <= 580){
				var height = $('.quiz__slide_current').outerHeight() + 'px'
				$('.quiz__list').css('height', height)
			}			
		})

		function quiz_goto(dir) {
			var next;
			var length = $('.quiz__slide').length - 1
			var current = $('.quiz__slide_current').index()
			var stop = false;


			if(dir == 'prev'){
				if (current <= 0){
					next = 0
				}else{
					next = current - 1
				}
			}else{
				if (current >= length){
					next = length

					$('.quiz__slider, .quiz__top, .quiz__nav-cell_right').addClass('is-hidden')
					$('.quiz__final').addClass('is-visible')

					$('.quiz__status-done, .quiz__nav-cell_left').css({'width': '100%'})
					$('.quiz__status-text span').text('100%')
					$('.quiz__text').hide();

					return false;
				}else{
					next = current + 1

					if(!$('.quiz__slide_current input:checked').length){
						$('.quiz__slide_current').addClass('js-error')
						stop = true
					}
				}
			}

			if(stop)
				return false;


			var per = 100 / ((length+1)/next)

			$('.quiz__status-done').css({
				'width': per + '%'
			})

			$('.quiz__status-text span').text(parseInt(per) + '%')

			$('.quiz__list')
				.addClass('is-hidden')
				.on(transitionEnd, function() {

					$('.quiz__slide').removeClass('quiz__slide_current').eq(next).addClass('quiz__slide_current')
					
					var css = {
						'transform': 'translateX(-' +  (next * 100) + '%)',
					}

					if($(window).width() <= 580)
						css['height'] = $('.quiz__slide_current').outerHeight() + 'px'

					$(this)
					.off(transitionEnd)
					.css(css)
					.removeClass('is-hidden')

				})



			

		}

		$('.horizontal-messengers__value').on('change', function() {
			if ($(this).val() == 'Почта'){
				$('.quiz__final-field_mail').show().find('input').prop('required', true)
			}else{
				$('.quiz__final-field_mail').hide().find('input').prop('required', false)
			}
		})

		$('.quiz__slide input').on('change', function() {
			$(this).closest('.quiz__slide').removeClass('js-error')
		})

		$('.quiz__slide input[type="radio"]').on('change', function() {
			quiz_goto('next')
		})

		$('.js-quiz-next').on('click', function(e) {
			e.preventDefault()
			quiz_goto('next')
		})
		$('.js-quiz-prev').on('click', function(e) {
			e.preventDefault()
			quiz_goto('prev')
		})
	},

	init: () => {

		quiz.events();

	}
}

export { quiz }