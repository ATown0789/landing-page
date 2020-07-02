/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const sectionList = document.querySelectorAll('section');
const scrollButton = document.getElementById('scroll__top');
let prevScrollPos = window.pageYOffset;
let menuTimer;
const nav = document.getElementsByTagName('nav')[0];

/**
 * End Global Variables
 * Start Helper consts
 *
*/

const isNearTop = (section) => {
	const sectionSize = section.getBoundingClientRect();
	return (
		sectionSize.top >= -250 &&
		sectionSize.top <= 400
	);
};

const hideNav = () => {
	nav.style.top = '-60px';
}

const showNav = () => {
	nav.style.top = '0';
}


/**
 * End Helper consts
 * Begin Main consts
 *
*/


//hide/show nav on scroll down/up

/*const hideNav = () => {
	
		let curScrollPos = window.pageYOffset;
		if (prevScrollPos > curScrollPos) {
			nav.style.top = '0';
		} else {
			nav.style.top = '-60px';
		}
		prevScrollPos = curScrollPos;
}*/

//Show nav on scroll, hide when not scrolling after 2 seconds

const navScroll = () => {
	const nav = document.getElementsByTagName('nav')[0];
    clearTimeout(menuTimer);
    showNav();
    menuTimer = setTimeout(hideNav, 2000);
}

// build the nav
const navBuild = () => {
	const navFrag = document.createDocumentFragment();
	for(let i = 1; i <= sectionList.length; i++){
		const newA = document.createElement('a');
		const newLi = document.createElement('li');
		const elId = sectionList[i-1].id;
		newA.setAttribute('class', 'menu__link');
		newA.setAttribute('href', '#'+ elId);
		newA.setAttribute('id', 'navlink' + i);
		newLi.textContent = elId;
		newA.appendChild(newLi);
		navFrag.appendChild(newA);
	}

	document.getElementById('navbar__list').appendChild(navFrag);
};

// Add class 'active' to section when near top of viewport

const setActive = () => {
	for(let i = 1; i <= sectionList.length; i++){
		const section = document.getElementById('section'+[i]);
		const navEl = document.getElementById('navlink' + i);
		if(isNearTop(section)){
			section.classList.add('active');
			navEl.classList.add('nav__active');
		}
		else if(!isNearTop(section)){
			section.classList.remove('active');
			navEl.classList.remove('nav__active');
		}
	}
};


// Scroll to anchor ID using scrollTO event

const scrollToSection = (e) => {
	event.preventDefault();
	//make sure click is on a nav element
	if(e.target.tagName === 'LI' || e.target.tagName === 'A'){
		const section = document.getElementById(e.target.textContent);
		const scrollToY = section.getBoundingClientRect().y + window.scrollY;
		window.scrollTo({
			top: scrollToY,
			behavior: 'smooth'
		});
	}
};

// Show ScrollTop button

const scrollTop = () => {
	if(window.pageYOffset > 450) {
		scrollButton.style.display = 'flex';
	}
	else if(window.pageYOffset <= 450) {
		scrollButton.style.display = 'none';
	}
}

//Scroll on click

const scrollClick = () => {
	window.scroll({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}


/**
 * End Main consts
 * Begin Events
 *
*/

// Build menu
navBuild();

// Scroll to section on link click
document.getElementsByTagName('nav')[0].addEventListener('click', scrollToSection);

// Scroll top on scroll__top click
scrollButton.addEventListener('click', scrollClick)

/* Set sections as active
hide menu on scroll down
show scroll top button */

window.addEventListener('scroll', () => {
	setActive();
	navScroll();
	scrollTop();
});