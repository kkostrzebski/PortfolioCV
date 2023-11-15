const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav-item')
const navLine = document.querySelector('.burger-line')
const logo = document.querySelector('.logo')
const footerYear = document.querySelector('.footer__year')

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

function addClickEvent(element, callback) {
	element.addEventListener('click', callback)
}

addClickEvent(logo, scrollToTop)

const handleNav = () => {
	nav.classList.toggle('nav--active')
	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active')
		})
	})
	handleNavItemsAnimation()
}

const handleNavItemsAnimation = () => {
	let delayTime = 0

	allNavItems.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()

navBtn.addEventListener('click', handleNav)







const projectButtons = document.querySelectorAll('.projects-card-info-btn');

const handleProjectClick = (projectId) => {
    // Przeniesienie do innego projektu przez zmianę adresu URL
    window.location.href = `./api-apps/src/App.js`;
};

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        handleProjectClick(projectId);
    });
});