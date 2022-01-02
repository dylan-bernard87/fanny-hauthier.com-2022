let itemsProjets = [];

// Object
class ItemProject
{
	domObject;
	x = 0;
	y = 0;
	xMouse = 0;
	yMouse = 0;
	delay = 0.15;
	rotate = 0;

	constructor(domObject, y, x)
	{
		this.domObject = domObject;
		this.xMouse = x;
		this.yMouse = y;
		this.moove(this);
	}

	updateMousePosition(xMouse, yMouse)
	{
		this.xMouse = xMouse;
		this.yMouse = yMouse;
	}

	updateCursorPosition()
	{
		let calcY = this.calcDistance(this.y, this.yMouse, this.delay);
		let calcX = this.calcDistance(this.x, this.xMouse, this.delay);
		this.x = Math.ceil(calcX);
		this.y = Math.ceil(calcY);

		this.rotate = this.calcRotate(this.x, this.xMouse);
	}

	addClass()
	{
		this.domObject.classList.add('work-item-img-active');
	}

	removeClass()
	{
		this.domObject.classList.remove('work-item-img-active');
	}

	// Need to replace 'this' by 'obj'
	moove(obj)
	{
		// Need to add if/else for cursor on an element
		obj.updateCursorPosition();
		obj.render();

		// For a better animation
		window.requestAnimationFrame(function()
		{
			obj.moove(obj);
		});
	}

	render()
	{
		this.domObject.style.left = `${this.x}px`;
		this.domObject.style.top = `${this.y}px`;

		this.domObject.style.transform = `translate(-50%, -50%) rotate(${this.rotate}deg)`;
	}

	calcDistance(start, end, amt)
	{
		return (1 - amt) * start + amt * end;
	}

	calcRotate(start, end)
	{
		return Math.cbrt(start - end) / 3;
	}
}

export function initProjects()
{
	let items = document.querySelectorAll('.work-item');

	items.forEach(el => {
		let image = el.querySelector('.work-item-img');

		if (image != undefined)
		{
			let item = new ItemProject(image, el.offsetHeight/2, el.offsetWidth/2);
			itemsProjets.push(item);

			el.addEventListener('mousemove', function (e)
			{
				item.updateMousePosition(e.offsetX, e.offsetY);
				item.addClass();
			});

			el.addEventListener('mouseleave', function ()
			{
				item.removeClass();
			});
		}

	})

}
