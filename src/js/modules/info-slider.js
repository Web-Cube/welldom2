import AOS from 'aos';

var aos = {

	events: () => {
		
		AOS.init({
			duration: 600,
			offset: 200,
			once: true
		});
		
	},

	init: () => {

		aos.events();

	}
}

export { AOS }