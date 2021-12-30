let cursor = {
	cursorDom: undefined,
	x: 0,
	y: 0,
	xMouse: 0,
	yMouse: 0,
	delay: 0.1,
	interact: false,

	offsetY: 3,

	init(cursorDom)
	{
		this.cursorDom = cursorDom;
		this.moove();
	},

	setInteract(interact)
	{
		this.interact = interact;
	},

	updateMousePosition(xMouse, yMouse)
	{
		this.xMouse = xMouse;
		this.yMouse = yMouse;
	},

	updateCursorPosition(offsetX = 0, offsetY = 0)
	{
		let calcY = this.calcDistance(this.y, this.yMouse, this.delay);
		let calcX = this.calcDistance(this.x, this.xMouse, this.delay);
		this.x = Math.ceil(calcX) + offsetX;
		this.y = Math.ceil(calcY) + offsetY;
	},

	// Don't use 'this' but 'cursor'
	moove()
	{
		let offsetX = 0;
		let offsetY = 0;

		if (cursor.interact)
		{
			offsetY = cursor.offsetY;
		}

		cursor.updateCursorPosition(offsetX, offsetY);

		cursor.render();

		// For a better animation
		window.requestAnimationFrame(cursor.moove);
	},

	render()
	{
		this.cursorDom.style.left = `${this.x}px`;
		this.cursorDom.style.top = `${this.y}px`;

		if (cursor.interact)
		{
			this.cursorDom.classList.add('cursor-classic-hover');
		}
		else
		{
			this.cursorDom.classList.remove('cursor-classic-hover');
		}
	},

	calcDistance(start, end, amt)
	{
		return (1 - amt) * start + amt * end;
	}
}

export function initCursor()
{
	let cursorDom = document.querySelector('#cursor');
	let links = document.querySelectorAll('a');

	cursor.init(cursorDom);

	document.body.addEventListener('mousemove', function (e)
	{
		cursor.updateMousePosition(e.clientX, e.clientY);
	});

	links.forEach(el => {
		el.addEventListener('mouseover', function(){
			cursor.setInteract(true);
		})
		el.addEventListener('mouseleave', function () {
			cursor.setInteract(false);
		})
	})
}