const logo = document.querySelector('.logo')

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

const burgerIcon = document.getElementById('burger-icon')
const navLinks = document.querySelector('.nav-links')
const burgerLine = document.querySelector('.burger-line')

burgerIcon.addEventListener('click', () => {
    burgerIcon.classList.toggle('cross')
	navLinks.classList.toggle('show')

})


document.querySelectorAll('.nav-links a').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const targetId = this.getAttribute('href').substring(1)
		const targetElement = document.getElementById(targetId)

		window.scrollTo({
			top: targetElement.offsetTop - 150,
			behavior: 'smooth',
		})

		burgerIcon.classList.remove('cross')
		navLinks.classList.remove('show')
	})
})

