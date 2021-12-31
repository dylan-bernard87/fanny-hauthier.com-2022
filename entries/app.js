import './sass/style.scss';

import { initAnimation } from './scripts/loadedAnimation.js';
import { initCursor } from './scripts/cursor.js';
import { initColor } from './scripts/color.js';
import { initProjects } from './scripts/project.js';
import { initContact } from './scripts/contact.js';
import { initMenu } from './scripts/menu.js';

window.addEventListener('load', function(){
	initAnimation();
	initCursor();
	initColor();
	initMenu();
	initProjects();
	initContact();
})
