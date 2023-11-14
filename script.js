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

window.addEventListener('DOMContentLoaded', function () {
	const carousel = document.querySelector('.carousel')
	const slides = document.querySelectorAll('.carousel-item')
	const dotsContainer = document.querySelector('.dots-container')
	let slidesPerView = calculateSlidesPerView()
	const loop = true
	let currentIndex = 0
	let prevButton, nextButton
	let dots = []

	slides.forEach(index => {
		const dot = document.createElement('span')
		dot.classList.add('dot')
		dot.setAttribute('role', 'button')
		dot.setAttribute('aria-label', `Go to slide ${index + 1}`)
		dot.addEventListener('click', () => {
			showSlide(index * slidesPerView)
		})
		dotsContainer.appendChild(dot)
		dots.push(dot)
	})

	function showSlide(startIndex) {
		currentIndex = startIndex;
		slides.forEach(slide => {
		  slide.style.display = 'none';
		  slide.setAttribute('aria-hidden', 'true');
		});
	  
		for (let i = currentIndex; i < currentIndex + slidesPerView; i++) {
		  if (slides[i]) {
			slides[i].style.display = 'block';
			slides[i].setAttribute('aria-hidden', 'false');
		  }
		}
		checkNavigationButtons();
		const dotIndex = currentIndex % slides.length;  // Zmiana tej linii
		highlightDot(dotIndex);
	  }

	prevButton = document.querySelector('.nav-prev')
	nextButton = document.querySelector('.nav-next')

	prevButton.addEventListener('click', () => {
		if (currentIndex - 1 >= 0) {
			showSlide(currentIndex - 1)
		} else if (loop) {
			showSlide(slides.length - slidesPerView)
		}
		checkNavigationButtons()
	})

	nextButton.addEventListener('click', () => {
		if (currentIndex + 1 < slides.length - slidesPerView + 1) {
			showSlide(currentIndex + 1)
		} else if (loop) {
			showSlide(0)
		}
		checkNavigationButtons()
	})

	let touchStartX = 0
	let touchEndX = 0
	carousel.addEventListener('touchstart', e => {
		touchStartX = e.touches[0].clientX
	})

	carousel.addEventListener('touchend', e => {
		touchEndX = e.changedTouches[0].clientX
		handleSwipe()
	})

	function handleSwipe() {
		const deltaX = touchEndX - touchStartX
		if (deltaX > 0) {
			prevButton.click()
		} else if (deltaX < 0) {
			nextButton.click()
		}
	}

	function checkNavigationButtons() {
		if (prevButton && nextButton) {
			prevButton.disabled = currentIndex === 0
			nextButton.disabled = currentIndex + slidesPerView >= slides.length
		}
	}

	function calculateSlidesPerView() {
		const windowWidth = window.innerWidth
		if (windowWidth >= 992) {
			return 3
		} else if (windowWidth >= 768) {
			return 2
		} else {
			return 1
		}
	}

	function adjustSlidesPerView() {
		slidesPerView = calculateSlidesPerView()
		initializeDots()
		showSlide(currentIndex)
	}

	function highlightDot(index) {
		dots.forEach((dot, dotIndex) => {
			if (dotIndex === index) {
				dot.classList.add('active')
			} else {
				dot.classList.remove('active')
			}
		})
	}
	function initializeDots() {
		dotsContainer.innerHTML = '';
		dots = [];
		for (let i = 0; i < slides.length -2; i++) {
		  const dot = document.createElement('span');
		  dot.classList.add('dot');
		  dot.setAttribute('role', 'button');
		  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
		  dot.addEventListener('click', () => {
			showSlide(i);
		  });
		  dots.push(dot);
		}
		dotsContainer.append(...dots);
		highlightDot(currentIndex % slides.length);
	  }

	window.addEventListener('resize', () => {
		adjustSlidesPerView()
	})

	adjustSlidesPerView()
})
