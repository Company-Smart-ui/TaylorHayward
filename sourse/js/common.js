const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "CLOSE",
					NEXT: "NEXT",
					PREV: "PREV",
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		if (linkModal) {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;
					
					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order'); 
				})
			})
		 
		}
	},
	// /modalCall
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

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

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
	animateScroll() {
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.getCurrentYear('.currentYear');

	let screenName;
	screenName = '10.jpg';
	screenName
		? $(".main-wrapper").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`)
		: '';


	function whenResize() {

		const topH = document.querySelector('header').scrollHeight;
		let stickyElement = document.querySelector('.top-nav')
		window.onscroll = () => {
			if ($(window).scrollTop() > topH) {

				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		};

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	}

	const swiper4 = new Swiper('.color-slider', {
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	let headerSlider = new Swiper('.headerSlider-js', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 200,

		//nav
		navigation: {
			nextEl: '.headerSlider-next',
			prevEl: '.headerSlider-prev',
		},

		//pugin
		pagination: {
			el: $(this).find('.headerSlider-pugin'),
			clickable: true,
			type: 'fraction',
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			//loadPrevNextAmount: 2,
		},
	});

	let eventSlider = new Swiper('.eventSlider-js', {
		// slidesPerView: 1,
		// watchOverflow: true,
		freeMode: true,
		loop: false,
		// autoHeight: true,
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
			//loadPrevNextAmount: 2,
		},
	});

	let partnerSlier = new Swiper('.partnerSlier-js', {
		slidesPerView: 3,
		loop: true,
		spaceBetween: 5,
		//nav
		navigation: {
			nextEl: '.partnerSlier-next',
			prevEl: '.partnerSlier-prev',
		},

		breakpoints: { 
			576: { 
				slidesPerView: 4,
				spaceBetween: 10,
			},
			
			992: { 
				slidesPerView: 5,
				spaceBetween: 20
			},

			1200: {
				slidesPerView: 6,
				spaceBetween: 42,
			}
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			//loadPrevNextAmount: 2,
		},
	});
	// modal window

	//articals sliders
	$(".sArticals__slider").each(function () {
		console.log(this);
		console.log(this.querySelector('.arcticals-slider-js'));
		console.log(this.querySelector('.artical-slide-next'));
		console.log(this.querySelector('.artical-slide-prev'));
		console.log('//');
		let articalsSlider = new Swiper($(this).find(".arcticals-slider-js"), {
			slidesPerView: 'auto',
			spaceBetween: 25,

			//nav
			navigation: {
				nextEl: $(this).find('.artical-slide-next'),
				prevEl: $(this).find('.artical-slide-prev'),
			},
			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 8,
			},
			//

		});
	});

	//09
	//timer
	function tikTak(parentQselector) {
		//html elements
		let parents = document.querySelectorAll(parentQselector);
		if (parents.length === 0) return
		for (let parent of parents){

			//let days = parent.querySelector('.days');
			let hours = parent.querySelector('.hours');
			let minutes = parent.querySelector('.minutes');
			let seconds = parent.querySelector('.seconds');

			//date elements
			let now = new Date();

			// d === days.innerHtml + now.getDate... others the same way
			//let d = getTime(days, now.getDate());
			let h = getTime(hours, now.getHours());
			let m = getTime(minutes, now.getMinutes());
			let s = getTime(seconds, now.getSeconds());

			let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
			console.log(now.getDate());

			//interval
			tikTakReadOut(parent, targetDate, ThisReadOutID, hours, minutes, seconds);
			let ThisReadOutID = window.setInterval(tikTakReadOut.bind(null, parent, targetDate, ThisReadOutID, hours, minutes, seconds), 1000);
		}
	}
	tikTak('.timer-box-js');
	//additional funcs to tikTak

	function tikTakReadOut(parent, targetDate, ReadOutID, hours, minutes, seconds) {
		let now = new Date();
		let timeLeft = (targetDate - now) / 1000;

		if (timeLeft < 1) {
			window.clearInterval(ReadOutID);
			//to do something after timer ends
			$(parent).fadeOut();
		}

		//days.innerHTML = Math.floor(timeLeft / 60 / 60 / 24);
		//timeLeft = ((timeLeft / 60 / 60 / 24) - Math.floor(timeLeft / 60 / 60 / 24)) * 60 * 60 * 24;

		hours.innerHTML = addZero(Math.floor(timeLeft / 60 / 60));
		timeLeft = ((timeLeft / 60 / 60) - Math.floor(timeLeft / 60 / 60)) * 60 * 60;

		minutes.innerHTML = addZero(Math.floor((timeLeft / 60)));
		timeLeft = ((timeLeft / 60) - Math.floor((timeLeft / 60))) * 60;

		seconds.innerHTML = addZero(Math.floor(timeLeft));
	}

	function getTime(htmlEl, currentTimeItem) {
		let timeItem = Number(htmlEl.innerHTML);
		if (timeItem) {
			timeItem += currentTimeItem;
		}
		else {
			timeItem = currentTimeItem;
		}
		return timeItem
	}

	//04
	$(".sAboutFond__parners-slider").each(function () {
		let articalsSlider = new Swiper($(this).find(".partners-slider-js"), {
			slidesPerView: 'auto',
			breakpoints: {
				768: {
					spaceBetween: 32,
				},
				320 : {
					spaceBetween: 16,
				},
			},

			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 8,
			},

			//
			freeMode: true,
			freeModeMomentum: true,
			// spaceBetween: 30,
			watchOverflow: true,

		});
	});

	function addZero(num) {
		num = Number(num);
		if (num >= 0 && num <=9) {
			num = "0" + num;
		}
		return num
	}
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
