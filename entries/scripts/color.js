import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initColor()
{
	gsap.registerPlugin(ScrollTrigger);

	let mainCont = document.querySelector('#mainContainer');
	let containers = document.querySelectorAll('.container[data-color]');

	containers.forEach((el, i) =>
	{
		let color = el.dataset.color;
		let prevColor = i != 0 ? containers[i - 1].dataset.color : containers[i].dataset.color;

		let theme = el.dataset.theme;
		let prevTheme = i != 0 ? containers[i - 1].dataset.theme : containers[i].dataset.theme;

		ScrollTrigger.create({
			trigger: el,
			start: "top top+=300px",
			end: "bottom bottom-=100px",

			onEnter: function ()
			{
				gsap.to("#mainContainer", { duration: 0.3, backgroundColor: color, overwrite: 'auto', autoAlpha: 1 });

				if (theme == "dark")
				{
					mainCont.classList.add('dark-theme');
				}
				else
				{
					mainCont.classList.remove('dark-theme');
				}
			},

			onLeaveBack: function ()
			{
				gsap.to("#mainContainer", { duration: 0.3, backgroundColor: prevColor, overwrite: 'auto', autoAlpha: 1 })
				if (prevTheme == "light")
				{
					mainCont.classList.remove('dark-theme');
				}
				else
				{
					mainCont.classList.add('dark-theme');
				}
			}
		})

	})
}