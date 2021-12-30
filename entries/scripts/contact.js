import { gsap } from 'gsap';

let linkContact, mainContainer, contactContainer = undefined;

function handleContactProcessOn()
{
	mainContainer.classList.add('dark-theme');
	let color = linkContact.dataset.color;
	gsap.to("#mainContainer", { duration: 0.3, backgroundColor: color, overwrite: 'auto', autoAlpha: 1 });
}

function handleContactProcessLeave()
{
	mainContainer.classList.remove('dark-theme');
	let color = contactContainer.dataset.color;
	gsap.to("#mainContainer", { duration: 0.3, backgroundColor: color, overwrite: 'auto', autoAlpha: 1 });
}

export function initContact()
{
	mainContainer = document.querySelector('#mainContainer');
	contactContainer = document.querySelector('#contact')
	linkContact = document.querySelector('.contact-link');

	linkContact.addEventListener('mouseover', handleContactProcessOn);
	linkContact.addEventListener('mouseleave', handleContactProcessLeave);
}