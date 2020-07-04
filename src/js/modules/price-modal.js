import { modals } from "./modals";

var params = {
	ANIMATION_TIME: 300,
	activeOverlayClass: 'flat-overlay_active',
	hiddenClass: 'no-display',
	openPopupAnimation: 'flat-open',
	closePopupAnimation: 'flat-close',
	$popup: $('#flat-popup'),
	$overlay: $('.flat-overlay'),
	popupContainer: document.createElement('div')
};

var $closeBtn = params.$popup.find('.modals__close.close');
var $link = $('.catalog__link[data-modal="#flat-popup"]');
var $preview = $('.catalog__name');

var priceModal = {
	popupOpen: (params) => {
		if ($('.flat-popup-container').length === 0) {
			const $container = $(params.popupContainer);

			$container.addClass('flat-popup-container');
			$('body').prepend($container);
			$container.append(params.$popup);
			$container.append(params.$overlay);
		}

		$('.flat-popup-container').css('display', 'flex');
		params.$popup.removeClass(params.closePopupAnimation).removeClass(params.hiddenClass).addClass(params.openPopupAnimation);
		params.$overlay.removeClass(params.hiddenClass).addClass(params.activeOverlayClass);

		params.$popup.find('.flat__left').magnificPopup({
			delegate: '.flat__gallery-item',
			type: 'image',
			closeMarkup: '<div class="modals__close close js-close-modal js-modal"> <svg class="icon icon-cancel cancel" viewBox="0 0 64 64"> <use xlink:href="/app/icons/sprite.svg#cancel"></use> </svg></div>',
			gallery: {
				enabled: true,
				arrowMarkup: '<div class="modals__arrow owl-arrow owl-arrow_%dir% js-gallerybutton js-gallerybutton-%dir%"> <svg class="owl-arrow__border" viewBox="30 30 60 60"> <circle class="owl-arrow__path" cx="60" cy="60" r="29" fill="none"></circle> </svg> <div class="owl-arrow__item"></div></div>',
			}
		});

		$('body').css('overflow-y', 'hidden');

		const items = [];

		$(".flat__gallery-item").each(function() {
			items.push( {
				src: $(this).attr("href"),
			} );
		});

		const $zoomBtn = params.$popup.find('.flat__icon_zoom');

		$zoomBtn.click((evt) => {
			modals.openCallback(evt, items);
		});

		params.$popup.find('.flat__preview-img').click((evt) => {
			evt.preventDefault();
			$zoomBtn.trigger('click');
		});

		setTimeout(() => {
			$(window).trigger('resize');
		}, 500)

	},

	popupClose: (params) => {
		params.$popup.removeClass(params.openPopupAnimation).addClass(params.closePopupAnimation);
		params.$overlay.removeClass(params.activeOverlayClass);
		params.$popup.find('.flat__icon_zoom').off();
		params.$popup.find('.flat__preview-img').off();
		setTimeout(() => {
			params.$popup.addClass(params.hiddenClass);
			params.$overlay.addClass(params.hiddenClass);
			$('body').css('overflow-y', '').removeAttr('style');
			$('.flat-popup-container').hide();
		}, params.ANIMATION_TIME);
	},

	correctPosition: ($modal) => {
		if ($(window).height() < $modal.height() && $modal.hasClass('flat-open') && $(window).width() > 580) {
			const difference = Math.abs($modal.height() - $(window).height());
			$modal.css({
				marginTop: difference > 250 ? difference / 1.5 : difference,
				marginBottom: '2rem'
			});
		} else if ($(window).height() >= $modal.height()) {
			$modal.css({
				marginTop: '',
				// marginBottom: '1rem'
			});
		}
	},

	init: () => {
		$(window).resize(function () {
			priceModal.correctPosition(params.$popup);
		});

		$link.click((evt) => {
			evt.preventDefault();
			priceModal.popupOpen(params);
		});

		$preview.click((evt) => {
			evt.preventDefault();
			priceModal.popupOpen(params);
		});

		$closeBtn.click((evt) => {
			evt.preventDefault();
			priceModal.popupClose(params);
		});

		params.$overlay.click((evt) => {
			evt.preventDefault();
			priceModal.popupClose(params);
		});
	}
};

export { priceModal };
