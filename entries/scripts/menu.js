import { gsap } from 'gsap';

let nodeChanged = false;

let main,
		menu,
		navbar,
		navbarIcon,
		navbarLine,
		navbarBurgerText,
		rollDownElements,
		navbarBurgerItems,
		menuSocialElements = undefined;

function activeMenu()
{
	// First Remove transitionClass on navbarElement
	removeTransitionClass();

	// Use simple timeline from gsap
	var timeline = gsap.timeline();

	timeline.fromTo(menu,
		{ height: "0%" },
		{ height: "100vh", duration: 0.3, ease: "ease-in-out" },
		0.1
	);

	timeline.fromTo(navbarIcon,
		{ fill: "#342929" },
		{ fill: "#fcc", duration: 0.3, ease: "ease-in-out" },
		0.2
	);

	timeline.fromTo(navbarBurgerText,
		{ color: "#342929" },
		{ color: "#fcc", textContent: navbarBurgerText.dataset.unactiveText, duration: 0.3, ease: "ease-in-out" },
		0.2
	);

	timeline.fromTo(navbarBurgerItems,
		{ backgroundColor: "#342929" },
		{ backgroundColor: "#fcc", duration: 0.3, ease: "ease-in-out" },
		0.2
	);

	timeline.fromTo(".navbar-burger-item--first",
		{ translateX: "0", translateY: "0", rotate: '0deg' },
		{ translateX: "0px", translateY: "-2px", rotate: '10deg', duration: 0.3, ease: "ease-in-out" },
		0.2
	);

	timeline.fromTo(".navbar-burger-item--second",
		{ translateY: "0", rotate: '0deg' },
		{ translateY: "-8px", rotate: '-10deg', duration: 0.3, ease: "ease-in-out" },
		0.2
	);

	timeline.fromTo(navbarLine,
		{ backgroundColor: "#342929", width:"0" },
		{ backgroundColor: "#fcc", width:"100%", duration: 0.3, ease: "ease-in-out" },
		0.2
	);

	let navbarElement = [...rollDownElements, ...menuSocialElements];

	navbarElement.forEach((el, i) => {
		let delay = 0.2;
		if (i != 0) delay = 0.2 * (i + 1);
		timeline.fromTo(el,
			{ translateY: "100%" },
			{ translateY: "0%", duration: 0.5, ease: "ease-in" },
			delay
		);
	})

	// Add class transition after timeline
	timeline.eventCallback("onComplete", updateAfterComplete);

}

function unactiveMenu()
{
	removeTransitionClass();

	// Use simple timeline from gsap
	var timeline = gsap.timeline();

	let navbarElement = [...rollDownElements, ...menuSocialElements];
	navbarElement.reverse();

	navbarElement.forEach((el, i) => {
		let delay = 0.2;
		if (i != 0) delay = 0.2 * (i + 1);
		timeline.to(el,
			{ translateY: "100%", duration: 0.5, ease: "ease-in" },
			delay
		);
	})

	timeline.to(navbarIcon,
		{ fill: "#342929", duration: 0.3, ease: "ease-in-out" },
		">-0.5"
	);

	timeline.to(navbarBurgerText,
		{ color: "#342929", textContent: navbarBurgerText.dataset.activeText, duration: 0.3, ease: "ease-in-out" },
		">-0.5"
	);


	timeline.to(".navbar-burger-item--first",
		{ translateY: "0px", rotate: '0', duration: 0.3, ease: "ease-in-out" },
		">-0.5"
	);

	timeline.to(".navbar-burger-item--second",
		{ translateY: "0", rotate: '0', duration: 0.3, ease: "ease-in-out" },
		">-0.3"
	);

	timeline.to(navbarBurgerItems,
		{ backgroundColor: "#342929", duration: 0.3, ease: "ease-in-out" },
		">-0.3"
	);

	timeline.to(navbarLine,
		{ backgroundColor: "#342929", duration: 0.3, ease: "ease-in-out" },
		">-0.5"
	);

	// Animate navbarElement
	timeline.to(menu,
		{ height: "0", duration: 0.3, ease: "ease-in" },
	);

	// Add class transition after timeline
	timeline.eventCallback("onComplete", function(){
		updateAfterComplete();
		navbar.classList.remove('navbar-active');
	});
}

function updateAfterComplete()
{
	rollDownElements.forEach(el => {
		el.classList.add('classic-transition-transform');
	})
}

function removeTransitionClass()
{
	rollDownElements.forEach(el => {
		el.classList.remove('classic-transition-transform');
	})
}

function handleMenu()
{
	nodeChanged = true;

	if (!navbar.classList.contains('navbar-active'))
	{
		navbar.classList.add('navbar-active');
		document.body.style.overflowY = 'hidden';
		activeMenu();
	}
	else
	{
		document.body.style.overflowY = 'unset';
		unactiveMenu();
	}
}

// This method try to reset all the value set during the animation
function handleResizeMenu(e)
{
	// Clean menu
	if (window.matchMedia("(min-width: 48rem)").matches && nodeChanged)
	{
		navbar.classList.remove('navbar-active');
		rollDownElements.forEach(el => {
			el.classList.remove('classic-transition-transform');
			el.style.color = null;
			el.style.transform = null;
		})

		document.body.style.overflowY = null;
		menu.style.height = null;

		menuSocialElements.forEach(el => {
			el.style.color = null;
			el.style.fill = null;
			el.style.transform = null;
		})

		navbarIcon.style.fill = null;

		navbarLine.style.width = null;
		navbarLine.style.backgroundColor = null;

		navbarBurgerItems.forEach(el=>{
			el.style.transform = null;
			el.style.backgroundColor = null;
		})

		navbarBurgerText.style.color = null;
		navbarBurgerText.textContent = navbarBurgerText.dataset.activeText

		// Reset the value
		nodeChanged = false;

		// Add again transition
		rollDownElements.forEach(el => {
			el.classList.add('classic-transition-transform');
		})
	}
}

function initNode()
{
	main = document.querySelector('.main');
	menu = document.querySelector('.menu');
	navbar = document.querySelector('.navbar');
	navbarBurgerText = document.querySelector('.navbar-burger-text');
	rollDownElements = document.querySelectorAll(".menu-nav-link-rolldown");
	menuSocialElements = document.querySelectorAll(".menu-social-link");
	navbarIcon = document.querySelector('.navbar-icon');
	navbarLine = document.querySelector('.navbar-line');
	navbarBurgerItems = document.querySelectorAll('.navbar-burger-item');
}

function initEventListener()
{
	let menu = document.querySelector('#burger')
	menu.addEventListener('click', handleMenu);

	//close menu if resize and if upper than css variable to avoid bug
	window.addEventListener('resize', handleResizeMenu)
}

export function initMenu()
{
	initNode();
	initEventListener();
}
