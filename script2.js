const logo = document.querySelector('.logo')
const nav = document.querySelectorAll('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavLinks = document.querySelectorAll('.nav-link')
const navLine = document.querySelector('.burger-line')
const allSections = document.querySelectorAll('.section')
const footerYear = document.querySelector('.footer__year')


const handleNav = () => {
	nav.classList.toggle('nav--active')

	navLine.classList.remove('black-bars-color')

	allNavLinks.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active')
		})
	})

	handleNavItemsAnimation()
}


const handleNavItemsAnimation = () => {
	let delayTime = 0

	allNavLinks.forEach(item => {
		item.classList.toggle('nav-links-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const handleObserver = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navLine.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navLine.classList.remove('black-bars-color')
		}
	})
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
navBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', handleObserver)




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

