

class parallaxTiltEffect {

	constructor({ element, tiltEffect }) {

		this.element = element;
		this.container = this.element.querySelector(".container");
		this.size = [300, 360];
		[this.w, this.h] = this.size;

		this.tiltEffect = tiltEffect;

		this.mouseOnComponent = false;

		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.defaultStates = this.defaultStates.bind(this);
		this.setProperty = this.setProperty.bind(this);
		this.init = this.init.bind(this);

		this.init();
	}

	handleMouseMove(event) {
		const { offsetX, offsetY } = event;

		let X;
		let Y;

		if (this.tiltEffect === "reverse") {
			X = ((offsetX - (this.w / 2)) / 4) / 4;
			Y = (-(offsetY - (this.h / 2)) / 4) / 4;
		}

		else if (this.tiltEffect === "normal") {
			X = (-(offsetX - (this.w / 2)) / 4) / 4;
			Y = ((offsetY - (this.h / 2)) / 4) / 4;
		}

		this.setProperty('--rY', X.toFixed(2));
		this.setProperty('--rX', Y.toFixed(2));

		this.setProperty('--bY', (80 - (X / 4).toFixed(2)) + '%');
		this.setProperty('--bX', (50 - (Y / 4).toFixed(2)) + '%');
	}

	handleMouseEnter() {
		this.mouseOnComponent = true;
		this.container.classList.add("container--active");
	}

	handleMouseLeave() {
		this.mouseOnComponent = false;
		this.defaultStates();
	}

	defaultStates() {
		this.container.classList.remove("container--active");
		this.setProperty('--rY', 0);
		this.setProperty('--rX', 0);
		this.setProperty('--bY', '80%');
		this.setProperty('--bX', '50%');
	}

	setProperty(p, v) {
		return this.container.style.setProperty(p, v);
	}

	init() {
		this.element.addEventListener('mousemove', this.handleMouseMove);
		this.element.addEventListener('mouseenter', this.handleMouseEnter);
		this.element.addEventListener('mouseleave', this.handleMouseLeave);
	}

}

const $ = e => document.querySelector(e);

const wrap1 = new parallaxTiltEffect({
	element: $('.wrap--1'),
	tiltEffect: 'reverse'
});

const wrap2 = new parallaxTiltEffect({
	element: $('.wrap--2'),
	tiltEffect: 'normal'
});

const wrap3 = new parallaxTiltEffect({
	element: $('.wrap--3'),
	tiltEffect: 'reverse'
});
const wrap4 = new parallaxTiltEffect({
	element: $('.wrap--4'),
	tiltEffect: 'reverse'
});

const wrap5 = new parallaxTiltEffect({
	element: $('.wrap--5'),
	tiltEffect: 'normal'
});

const wrap6 = new parallaxTiltEffect({
	element: $('.wrap--6'),
	tiltEffect: 'reverse'
});
const wrap7 = new parallaxTiltEffect({
	element: $('.wrap--7'),
	tiltEffect: 'reverse'
});

const wrap8 = new parallaxTiltEffect({
	element: $('.wrap--8'),
	tiltEffect: 'normal'
});

const wrap9 = new parallaxTiltEffect({
	element: $('.wrap--9'),
	tiltEffect: 'reverse'
});




/* -- Text effect -- */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


let intervals = {};

function startAnimation(element) {
	let iteration = 0;
	let elementID = element.dataset.id; // Assuming each element has a data-id attribute

	// Clear any existing interval for this element
	if (intervals[elementID]) {
		clearInterval(intervals[elementID]);
	}

	intervals[elementID] = setInterval(() => {
		element.innerText = element.innerText
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return element.dataset.value[index];
				}

				return letters[Math.floor(Math.random() * 26)]
			})
			.join("");

		if (iteration >= element.dataset.value.length) {
			clearInterval(intervals[elementID]);
		}

		iteration += 1 / 3;
	}, 30);
}

function handleMouseOver(event) {
	startAnimation(event.target);
}

document.addEventListener("DOMContentLoaded", () => {
	// Get all elements with class "title" and "name" 
	let elements = document.querySelectorAll(".title, .name");

	// Attach the event and assign a unique ID to each element
	elements.forEach((element, index) => {
		element.dataset.id = index;
		element.onmouseover = handleMouseOver;

		// Start the animation for each element
		startAnimation(element);
	});
});