import './sass/style.scss';

import { initCursor } from './scripts/cursor.js';
import { initColor } from './scripts/color.js';
import { initProjects } from './scripts/project.js';
import { initContact } from './scripts/contact.js';

window.addEventListener('load', function(){
  initCursor();
  initColor();
  initProjects();
  initContact();
})