import './sass/style.scss';

import { initAnimation } from './scripts/loadedAnimation.js';
import { initCursor } from './scripts/cursor.js';
import { initColor } from './scripts/color.js';
import { initProjects } from './scripts/project.js';
import { initContact } from './scripts/contact.js';

window.addEventListener('load', function(){
	initAnimation();
	initCursor();
	initColor();
	initProjects();
	initContact(); 
})