const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}
	},

	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	//tabs
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		tabs.forEach(function (element) {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				const data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				const active = content.classList.contains('active') ? 'active' : '';
				content.insertAdjacentHTML("beforebegin", "<button type='button' class=\"tabs__btn tabs__btn_accardion ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</button>"));
			});
			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				const content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		});
	},
 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},

	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
};

function eventHandler() {
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.getCurrentYear('.currentYear');

	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	let headerSlider = new Swiper('.headerSlider-js', {
		slidesPerView: 1,
		loop: true,
		autoHeight: true,
		spaceBetween: 200,
		lazy: true,

		//nav
		navigation: {
			nextEl: '.headerSlider-next',
			prevEl: '.headerSlider-prev',
		},

		//pugin
		pagination: {
			el: '.headerSlider-pugin',
			clickable: true,
			type: 'fraction',
		},
		//lazy
		lazy: {
			loadPrevNext: true,
		},
	});

	let eventSlider = new Swiper('.eventSlider-js', {
		freeMode: true,
		loop: false,
		autoHeight: true,
		spaceBetween: 20,
		//nav
		navigation: {
			nextEl: '.eventSlider-next',
			prevEl: '.eventSlider-prev',
		},

		breakpoints: { 
			576: { 
				slidesPerView: 2,
				spaceBetween: 20,
			},
			
			992: { 
				slidesPerView: 3,
				spaceBetween: 40
			},

			1200: {
				slidesPerView: 3,
				spaceBetween: 81,
			}
		},
		//lazy
		lazy: {
			loadPrevNext: true,
		},
	});

	if (window.innerWidth > 992) {
		let flyItems = document.querySelectorAll('.fly-items-js');
		for(let item of flyItems){
			var parallaxInstance = new Parallax(item);
		}
	}
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
