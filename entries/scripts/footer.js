function handleDateFooter()
{
	let footerDateDom = document.querySelector('#footer-date');
	footerDateDom.textContent = new Date().getFullYear();
}

export function initFooter()
{
	handleDateFooter();
}
