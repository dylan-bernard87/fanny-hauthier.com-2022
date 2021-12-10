import './sass/style.scss';
import { initCursor } from './scripts/cursor.js';
import { initColor } from './scripts/color.js';

import './scripts/project.js';

window.addEventListener('load', function(){
  initCursor();
  initColor();
})