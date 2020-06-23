import Inputmask from "inputmask";
import validate from "jquery-validation";
import { config } from "../config";

var forms = {
	mask: () => {
		var selector = document.querySelectorAll("input[name='phone']");

		var im = new Inputmask({
			mask: "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: true,
		});

		im.mask(selector);
	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function (error, element) {
					//just nothing, empty
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				submitHandler: (form) => {
					var data = $(form).serialize();
					var thank = $(form).data('thank');
					
					if ( thank == 'quiz__thank' ) {
						$('.quiz .form__thank').addClass('is-active');
					} else {
						sucsess(thank);
					}
					
					$.ajax({
						type: "POST",
						url: $(form).attr("action"),
						data: data,
						success: function (data) {
							$(form)[0].reset();
						},
					});
				},
				rules: {
					phone: {
						required: true,
						minlength: 10,
					},
				},
			});
		});
		
		function sucsess(name) {
			$.magnificPopup.open({
				tClose: 'Закрыть',
				removalDelay: 600,
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'hidden',			
				closeMarkup: '<div class="modals__close close js-close-modal"> <svg class="icon icon-cancel cancel" viewBox="0 0 64 64"> <use xlink:href="/app/icons/sprite.svg#cancel"></use> </svg></div>',
				mainClass: 'css-modal-animate',				
				items: {
					src: name,
					type: 'inline'
				},
				callbacks: {
					beforeOpen: () => {
					},

					beforeClose: () => {
					}
				}
			}, 0);
		}
		
	},

	events: () => {
		
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
		$('.horizontal-messengers__link').click(function(){
			var messValue = $(this).find('.horizontal-messengers__input').val();
			
			if( messValue == 'email' ) {
				$(this).closest('form').find('.form__item_show').slideUp(300);
				$(this).closest('form').find('.form__item_hide').slideDown(300);
			} else {
				$(this).closest('form').find('.form__item_hide').slideUp(300);
				$(this).closest('form').find('.form__item_show').slideDown(300);
			}
		});
		
		$('.form__input').focus(function(){
			$(this).parent().addClass("is-active");
		}).blur(function(){
			$(this).parent().removeClass("is-active");
		});
		
	},

	init: () => {
		forms.mask();
		forms.validate();
		forms.events();
	},
};

export { forms };
