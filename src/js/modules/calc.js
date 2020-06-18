import 'jquery-ui/ui/widgets/slider';
require('jquery-ui-touch-punch');

var calc = {
	
	events: () => {
		
		$('.js-calc-input').each(function(){
			
			let sliderValue = $(this).data("value"),
				step = $(this).data("step"),
				sign = $(this).data("sign"),
				minValue = $(this).data("min"),
				maxValue = $(this).data("max"),
				sliderName = $(this).closest('.slider-input').find('.slider-input__bottom'),
				sliderInput = $(this).closest('.slider-input').find('.js-calc-input'),
				formInput = $(this).closest('.slider-input').find('.js-calc-input').attr('name');
			
			//$('.js-calc-total').text( calcTotal + ' ₽' );
		
			sliderName.slider({
				range: 'min',
				value: sliderValue,
				step: step,
				min: minValue,
				max: maxValue,
				slide: function( event, ui ) {
					sliderInput.data("value", ui.value ).val( thousandSeparator( ui.value ) + ' ' + sign );
					$('input[name="' + formInput + '"]').val( thousandSeparator( ui.value ) + ' ' + sign );
					calcTotal();
					startPercent();
				}
			});
			
			$(this).focus(function(){
		
				$(this).val( $(this).data('value') );

			}).blur(function(){

				$(this).val( thousandSeparator( $(this).val() ) + ' ' + sign );

			}).keyup(function(){

				sliderName.slider({
					value: $(this).val()
				});

			});

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
		
		function startPercent() {
			let price = $('.js-calc-price').data('value'),
				start = $('.js-calc-start').data('value'),
				percent = (start/price*100).toFixed(1);
			$('.js-start-percent').text(percent + '%');
		}
		
		function calcTotal() {
			let price = $('.js-calc-price').data('value'),
				start = $('.js-calc-start').data('value'),
				year = $('.js-calc-year').data('value')*12,
				calcTotal = ( price - start )/year;

			calcTotal = calcTotal.toFixed(0);

			$('.js-calc-total').text( thousandSeparator( calcTotal ) + ' ₽' );
			$('input[name="total"]').val( thousandSeparator( calcTotal ) + ' ₽' );
		}
		
		calcTotal();
		startPercent();
		
	},
	
	clone: () => {
		if ( $(window).innerWidth() < 580 ) {
			$('.calc').each(function(){
				
				var cloneTop = $(this).find('.js-clone-top').html();
				$(".js-html-top").html( cloneTop );
				$(this).find('.js-clone-top').remove();
				
			});
		}	
	},

	init: () => {
		
		calc.events();
		calc.clone();

	}
}

export { calc }