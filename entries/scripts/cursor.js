let cursor = {
  cursorDom: undefined,
  x: 0,
  y: 0,
  xMouse: 0,
  yMouse: 0,
  delay: 0.1,

  init(cursorDom)
  {
    this.cursorDom = cursorDom;
    this.moove();
  },

  updateMousePosition(xMouse, yMouse)
  {
    this.xMouse = xMouse;
    this.yMouse = yMouse;
  },

  updateCursorPosition()
  {
    let calcY = this.calcDistance(this.y, this.yMouse, this.delay);
    let calcX = this.calcDistance(this.x, this.xMouse, this.delay);
    this.x = Math.ceil(calcX);
    this.y = Math.ceil(calcY);
  },

  // Don't use 'this' but 'cursor'
  moove()
  {
    // Need to add if/else for cursor on an element
    cursor.updateCursorPosition();

    cursor.render();

    // For a better animation
    window.requestAnimationFrame(cursor.moove);
  },

  render()
  {
    this.cursorDom.style.left = `${this.x}px`;
    this.cursorDom.style.top = `${this.y}px`;
  },

  calcDistance(start, end, amt)
  {
    return (1 - amt) * start + amt * end;
  }
}

export function initCursor()
{
  let cursorDom = document.querySelector('#cursor');
  cursor.init(cursorDom);

  document.body.addEventListener('mousemove', function (e) {
    cursor.updateMousePosition(e.clientX, e.clientY);
  });
}