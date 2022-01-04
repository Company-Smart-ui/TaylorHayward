"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
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
					PREV: "PREV"
				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		if (linkModal) {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val;
							console.log(modal.querySelector(elem).tagName);
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	//tabs
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(" .top-nav li a, .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.getCurrentYear('.currentYear');
	var screenName;
	screenName = '10.jpg';
	screenName ? $(".main-wrapper").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>")) : '';

	function whenResize() {
		var topH = document.querySelector('header').scrollHeight;
		var stickyElement = document.querySelector('.top-nav');

		window.onscroll = function () {
			if ($(window).scrollTop() > topH) {
				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		};
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true
	}), _defaultSl);
	var swiper4 = new Swiper('.color-slider', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	}));
	var headerSlider = new Swiper('.headerSlider-js', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 200,
		//nav
		navigation: {
			nextEl: '.headerSlider-next',
			prevEl: '.headerSlider-prev'
		},
		//pugin
		pagination: {
			el: $(this).find('.headerSlider-pugin'),
			clickable: true,
			type: 'fraction'
		},
		//lazy
		lazy: {
			loadPrevNext: true //loadPrevNextAmount: 2,

		}
	});
	var eventSlider = new Swiper('.eventSlider-js', {
		// slidesPerView: 1,
		// watchOverflow: true,
		freeMode: true,
		loop: false,
		// autoHeight: true,
		spaceBetween: 20,
		//nav
		navigation: {
			nextEl: '.eventSlider-next',
			prevEl: '.eventSlider-prev'
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 40
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 81
			}
		},
		//lazy
		lazy: {
			loadPrevNext: true //loadPrevNextAmount: 2,

		}
	});
	var partnerSlier = new Swiper('.partnerSlier-js', {
		slidesPerView: 3,
		loop: true,
		spaceBetween: 5,
		//nav
		navigation: {
			nextEl: '.partnerSlier-next',
			prevEl: '.partnerSlier-prev'
		},
		breakpoints: {
			576: {
				slidesPerView: 4,
				spaceBetween: 10
			},
			992: {
				slidesPerView: 5,
				spaceBetween: 20
			},
			1200: {
				slidesPerView: 6,
				spaceBetween: 42
			}
		},
		//lazy
		lazy: {
			loadPrevNext: true //loadPrevNextAmount: 2,

		}
	}); // modal window
	//articals sliders

	$(".sArticals__slider").each(function () {
		console.log(this);
		console.log(this.querySelector('.arcticals-slider-js'));
		console.log(this.querySelector('.artical-slide-next'));
		console.log(this.querySelector('.artical-slide-prev'));
		console.log('//');
		var articalsSlider = new Swiper($(this).find(".arcticals-slider-js"), {
			slidesPerView: 'auto',
			spaceBetween: 25,
			//nav
			navigation: {
				nextEl: $(this).find('.artical-slide-next'),
				prevEl: $(this).find('.artical-slide-prev')
			},
			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 8
			} //

		});
	}); //09
	//timer

	function tikTak(parentQselector) {
		//html elements
		var parents = document.querySelectorAll(parentQselector);
		if (parents.length === 0) return;

		var _iterator = _createForOfIteratorHelper(parents),
				_step;

		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var parent = _step.value;
				//let days = parent.querySelector('.days');
				var hours = parent.querySelector('.hours');
				var minutes = parent.querySelector('.minutes');
				var seconds = parent.querySelector('.seconds'); //date elements

				var now = new Date(); // d === days.innerHtml + now.getDate... others the same way
				//let d = getTime(days, now.getDate());

				var h = getTime(hours, now.getHours());
				var m = getTime(minutes, now.getMinutes());
				var s = getTime(seconds, now.getSeconds());
				var targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
				console.log(now.getDate()); //interval

				tikTakReadOut(parent, targetDate, ThisReadOutID, hours, minutes, seconds);
				var ThisReadOutID = window.setInterval(tikTakReadOut.bind(null, parent, targetDate, ThisReadOutID, hours, minutes, seconds), 1000);
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	}

	tikTak('.timer-box-js'); //additional funcs to tikTak

	function tikTakReadOut(parent, targetDate, ReadOutID, hours, minutes, seconds) {
		var now = new Date();
		var timeLeft = (targetDate - now) / 1000;

		if (timeLeft < 1) {
			window.clearInterval(ReadOutID); //to do something after timer ends

			$(parent).fadeOut();
		} //days.innerHTML = Math.floor(timeLeft / 60 / 60 / 24);
		//timeLeft = ((timeLeft / 60 / 60 / 24) - Math.floor(timeLeft / 60 / 60 / 24)) * 60 * 60 * 24;


		hours.innerHTML = addZero(Math.floor(timeLeft / 60 / 60));
		timeLeft = (timeLeft / 60 / 60 - Math.floor(timeLeft / 60 / 60)) * 60 * 60;
		minutes.innerHTML = addZero(Math.floor(timeLeft / 60));
		timeLeft = (timeLeft / 60 - Math.floor(timeLeft / 60)) * 60;
		seconds.innerHTML = addZero(Math.floor(timeLeft));
	}

	function getTime(htmlEl, currentTimeItem) {
		var timeItem = Number(htmlEl.innerHTML);

		if (timeItem) {
			timeItem += currentTimeItem;
		} else {
			timeItem = currentTimeItem;
		}

		return timeItem;
	} //04


	$(".sAboutFond__parners-slider").each(function () {
		var articalsSlider = new Swiper($(this).find(".partners-slider-js"), {
			slidesPerView: 'auto',
			breakpoints: {
				768: {
					spaceBetween: 32
				},
				320: {
					spaceBetween: 16
				}
			},
			//lazy
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 8
			},
			//
			freeMode: true,
			freeModeMomentum: true,
			// spaceBetween: 30,
			watchOverflow: true
		});
	});

	function addZero(num) {
		num = Number(num);

		if (num >= 0 && num <= 9) {
			num = "0" + num;
		}

		return num;
	}
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}