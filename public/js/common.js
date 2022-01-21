"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		var link = ".link-modal-js";
		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад"
			}
		});
		document.querySelectorAll(".modal-close-js").forEach(function (el) {
			el.addEventListener("click", function () {
				Fancybox.close();
			});
		});
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false
		});
		var linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val;
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
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
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.getCurrentYear('.currentYear');

	function setFixedNav() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', function () {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var headerSlider = new Swiper('.headerSlider-js', _defineProperty({
		slidesPerView: 1,
		loop: true,
		autoHeight: true,
		spaceBetween: 200,
		lazy: true,
		//nav
		navigation: {
			nextEl: '.headerSlider-next',
			prevEl: '.headerSlider-prev'
		},
		//pugin
		pagination: {
			el: '.headerSlider-pugin',
			clickable: true,
			type: 'fraction'
		}
	}, "lazy", {
		loadPrevNext: true
	}));

	if (window.innerWidth > 992) {
		var flyItems = document.querySelectorAll('.fly-items-js');

		var _iterator = _createForOfIteratorHelper(flyItems),
				_step;

		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var item = _step.value;
				var parallaxInstance = new Parallax(item);
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	} // players


	var players = document.querySelectorAll('[data-player]');
	var audios = document.querySelectorAll('[data-audio]');
	var playerItem;
	var tracksArr = [{
		// 1 item
		item: [{
			"track": 1,
			"name": "Night post",
			"duration": "4:41",
			"file": "album_alph/night_post"
		}, {
			"track": 2,
			"name": "Oceans at rest",
			"duration": "1:27",
			"file": "album_alph/oceans_at_rest"
		}, {
			"track": 3,
			"name": "Sound in calling",
			"duration": "5:35",
			"file": "album_alph/sound_in_calling"
		}, {
			"track": 4,
			"name": "Trodden",
			"duration": "3:11",
			"file": "album_alph/trodden"
		}]
	}, {
		// 2 item
		item: [{
			"track": 1,
			"name": "Great glen",
			"duration": "3:19",
			"file": "album_brav/great_glen"
		}, {
			"track": 2,
			"name": "Indus",
			"duration": "4:54",
			"file": "album_brav/Indus"
		}, {
			"track": 3,
			"name": "loire",
			"duration": "3:11",
			"file": "album_brav/loire"
		}, {
			"track": 4,
			"name": "panjshir",
			"duration": "2:30",
			"file": "album_brav/panjshir"
		}, {
			"track": 5,
			"name": "Shenandoah",
			"duration": "3:25",
			"file": "album_brav/shenandoah"
		}, {
			"track": 6,
			"name": "The queen",
			"duration": "2:40",
			"file": "album_brav/the_queen"
		}]
	}, {
		// 3 item
		item: [{
			"track": 1,
			"name": "A short walk",
			"duration": "1:51",
			"file": "album_char/a_short_walk"
		}, {
			"track": 2,
			"name": "Asunder",
			"duration": "6:28",
			"file": "album_char/asunder"
		}, {
			"track": 3,
			"name": "Full and if a boat",
			"duration": "3:00",
			"file": "album_char/full_and_if_a_boat"
		}, {
			"track": 4,
			"name": "Full tempest",
			"duration": "3:15",
			"file": "album_char/full_tempest"
		}, {
			"track": 5,
			"name": "Mary",
			"duration": "2:54",
			"file": "album_char/mary"
		}, {
			"track": 6,
			"name": "Signals",
			"duration": "4:18",
			"file": "album_char/signals"
		}, {
			"track": 7,
			"name": "You will know",
			"duration": "3:03",
			"file": "album_char/you_will_know"
		}]
	}, {
		// 4 item
		item: [{
			"track": 1,
			"name": "A short walk",
			"duration": "1:51",
			"file": "all/a_short_walk"
		}, {
			"track": 2,
			"name": "Asunder",
			"duration": "4:54",
			"file": "all/asunder"
		}, {
			"track": 3,
			"name": "Full and if a boat",
			"duration": "3:11",
			"file": "all/full_and_if_a_boat"
		}, {
			"track": 4,
			"name": "Full tempest",
			"duration": "2:30",
			"file": "all/full_tempest"
		}, {
			"track": 5,
			"name": "Great glen",
			"duration": "3:19",
			"file": "all/great_glen"
		}, {
			"track": 6,
			"name": "Indus",
			"duration": "4:54",
			"file": "all/Indus"
		}, {
			"track": 7,
			"name": "loire",
			"duration": "3:11",
			"file": "all/loire"
		}, {
			"track": 8,
			"name": "Mary",
			"duration": "3:25",
			"file": "all/mary"
		}, {
			"track": 9,
			"name": "Night post",
			"duration": "4:41",
			"file": "all/night_post"
		}, {
			"track": 10,
			"name": "Oceans at rest",
			"duration": "1:27",
			"file": "all/oceans_at_rest"
		}, {
			"track": 11,
			"name": "panjshir",
			"duration": "2:30",
			"file": "all/panjshir"
		}, {
			"track": 12,
			"name": "Shenandoah",
			"duration": "3:25",
			"file": "all/shenandoah"
		}, {
			"track": 13,
			"name": "Signals",
			"duration": "4:18",
			"file": "all/signals"
		}, {
			"track": 14,
			"name": "Sound in calling",
			"duration": "5:35",
			"file": "all/sound_in_calling"
		}, {
			"track": 15,
			"name": "The queen",
			"duration": "2:40",
			"file": "all/the_queen"
		}, {
			"track": 16,
			"name": "Trodden",
			"duration": "3:11",
			"file": "all/trodden"
		}, {
			"track": 17,
			"name": "You will know",
			"duration": "3:03",
			"file": "all/you_will_know"
		}]
	}];
	audios.forEach(function (item, index) {
		playerItem = players[index]; //audio players

		var playerFirst = !!document.createElement('audio').canPlayType;

		if (playerFirst) {
			// initialize plyr
			var player = new Plyr(item, {
				controls: ['restart', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume']
			}); // initialize playlist and controls

			var playing = false;
			var mediaPath = 'audio/';
			var extension = '';
			var tracks = tracksArr[index].item;
			tracks.forEach(function (value, indexSub) {
				var trackNumber = value.track,
						trackName = value.name,
						trackDuration = value.duration;

				if (trackNumber.toString().length === 1) {
					trackNumber = '0' + trackNumber;
				}

				var listItem = document.createElement('li');
				listItem.innerHTML = " <div class=\"plItem\"> \n                        <span class=\"plNum\">".concat(trackNumber, ".</span> \n                        <span class=\"plTitle\">").concat(trackName, "</span> \n                        <span class=\"plLength\">").concat(trackDuration, "</span> \n                    </div>");
				playerItem.querySelector('.sAlbums__plList').appendChild(listItem);
			});
			var trackCount = tracks.length;
			var npAction = playerItem.querySelector('.sAlbums__npAction');
			var npTitle = playerItem.querySelector('.sAlbums__npTitle');
			var audio = $(item).on('play', function () {
				playing = true;
			}).on('pause', function () {}).on('ended', function () {
				if (index + 1 < trackCount) {
					index++;
					loadTrack(index);
					audio.play();
				} else {
					audio.pause();
					index = 0;
					loadTrack(index);
				}
			}).get(0);
			var btnPrev = $(playerItem.querySelector('.sAlbums__btnPrev')).on('click', function () {
				if (index - 1 > -1) {
					index--;
					loadTrack(index);

					if (playing) {
						audio.play();
					}
				} else {
					audio.pause();
					index = 0;
					loadTrack(index);
				}
			});
			var btnNext = $(playerItem.querySelector(' .sAlbums__btnNext')).on('click', function () {
				if (index + 1 < trackCount) {
					index++;
					loadTrack(index);

					if (playing) {
						audio.play();
					}
				} else {
					audio.pause();
					index = 0;
					loadTrack(index);
				}
			});
			var li = $(playerItem.querySelector(' .sAlbums__plList li')).on('click', function () {
				var id = parseInt($(this).index());

				if (id !== index) {
					playTrack(id);
				}
			});

			var loadTrack = function loadTrack(id) {
				npTitle.innerHTML = "".concat(tracks[id].name);
				index = id;
				audio.src = mediaPath + tracks[id].file + extension;
				updateDownload(id, audio.src);
			};

			var updateDownload = function updateDownload(id, source) {
				player.on('loadedmetadata', function () {
					$('a[data-plyr="download"]').attr('href', source);
				});
			};

			var playTrack = function playTrack(id) {
				loadTrack(id);
				audio.play();
			};

			extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
			loadTrack(index);
		}
	});
	var eventSlider = new Swiper('.eventSlider-js', {
		freeMode: true,
		loop: true,
		autoHeight: true,
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
			loadPrevNext: true
		}
	});
}

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}