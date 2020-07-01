import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { quiz } from "./modules/quiz";
import { AOS } from "./modules/aos";
import { aboutSlider } from "./modules/about-slider";
import { owl } from "./modules/owl";
import { calc } from "./modules/calc";
import { map } from "./modules/map";
import { priceModal } from "./modules/price-modal";
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	modals.init();
	quiz.init();
	AOS.init();
	aboutSlider.init();
	owl.init();
	calc.init();
	map.init();
	priceModal.init();

	config.log('app init')

};

export { App };
