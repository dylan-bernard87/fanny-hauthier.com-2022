import { gsap } from 'gsap';

let rollDownElements,
		menuSocialElement,
		headerIllustrationDeco,
		headerIllustrationImage = undefined;

function headerAnimate()
{
	// Use simple timeline from gsap
	var timeline = gsap.timeline();

	// Animate navbarElement
	timeline.fromTo(".navbar-line",
		{ width: "0%"},
		{ width: "100%", duration: 0.8, ease: "ease-in"},
		0.2
	);

	let navbarElement = [...rollDownElements, ...menuSocialElement];

	navbarElement.forEach((el, i)=> {
		let delay = 0.2;
		if (i != 0) delay = 0.2 * (i+1);
		timeline.fromTo(el,
			{ translateY: "100%" },
			{ translateY: "0%", duration: 0.5, ease: "ease-in" },
			delay
		);
	})

	// Animate header content
	timeline.fromTo(".header-content-subtitle-span",
		{ translateY: "100%" },
		{ translateY: "0%", duration: 0.5, ease: "ease-in"},
		0.2
	);

	timeline.fromTo(".header-content-title-span",
		{ translateY: "100%", display: "block"},
		{ translateY: "0%", duration: 0.5, ease: "ease-in"},
		0.4
	);

	timeline.fromTo(".header-illustration-deco",
		{ translateX: "100%" },
		{ translateX: "0%", duration: 0.5, ease: "ease" },
		0.4
	);

	timeline.fromTo(".header-illustration-img",
		{ translateX: "100%" },
		{ translateX: "0%", duration: 0.5, ease: "ease" },
		0.5
	);

	timeline.fromTo(".header-illustration-info",
		{ opacity: "0" },
		{ opacity: "1", duration: 0.8, ease: "ease" },
		0.55
	);

	// Add class transition after timeline
	timeline.eventCallback("onComplete", updateAfterComplete);
}

function updateAfterComplete()
{
	rollDownElements.forEach(el=>{
		el.classList.add('classic-transition-transform');
	})

	headerIllustrationDeco.style.display = "none";
}

function initNode()
{
	rollDownElements = document.querySelectorAll(".menu-nav-link-rolldown");
	menuSocialElement = document.querySelectorAll(".menu-social-link");
	headerIllustrationDeco = document.querySelector(".header-illustration-deco");
	headerIllustrationImage = document.querySelector(".header-illustration-img");
}

function initIllustrationSize()
{
	headerIllustrationDeco.style.height = `${headerIllustrationImage.offsetHeight}px`;
	headerIllustrationDeco.style.width = `${headerIllustrationImage.offsetWidth}px`;
}

export function initAnimation()
{
	initNode();
	initIllustrationSize();
	headerAnimate();
}
