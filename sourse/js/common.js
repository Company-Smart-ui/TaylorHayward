const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
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
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);

		function addData() {
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
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}

		if (linkModal) addData();
	},
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
			}, {passive: true});

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {passive: true});
		}
	},
	// /mobileMenu

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
		}, {passive: true});
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

	}, {passive: true})
	window.addEventListener('resize', () => {
		whenResize();
	}, {passive: true});

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

	if (window.innerWidth > 992) {
		let flyItems = document.querySelectorAll('.fly-items-js');
		for (let item of flyItems) {
			let parallaxInstance = new Parallax(item);
		}
	}

	// players
	const players = document.querySelectorAll('[data-player]');
	const audios = document.querySelectorAll('[data-audio]');
	let playerItem;

	const tracksArr = [
		{
			// 1 item
			item: [
				{
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
				},
			]
		},
		{
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
			},]
		},
		{
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
			},
			]
		},
		{
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
			},
			]
		}
	]

	audios.forEach((item, index) => {
		playerItem = players[index];
		//audio players
		let playerFirst = !!document.createElement('audio').canPlayType;
		if (playerFirst) {
			// initialize plyr
			let player = new Plyr(item, {
				controls: [
					'restart',
					'play',
					'progress',
					'current-time',
					'duration',
					'mute',
					'volume',
				]
			});
			// initialize playlist and controls

			let playing = false;
			let mediaPath = 'audio/';
			let extension = '';
			let tracks = tracksArr[index].item;

			tracks.forEach((value, indexSub) => {
				var trackNumber = value.track,
					trackName = value.name,
					trackDuration = value.duration;
				if (trackNumber.toString().length === 1) {
					trackNumber = '0' + trackNumber;
				}
				let listItem = document.createElement('li');
				listItem.innerHTML = ` <div class="plItem"> 
                        <span class="plNum">${trackNumber}.</span> 
                        <span class="plTitle">${trackName}</span> 
                        <span class="plLength">${trackDuration}</span> 
                    </div>`
				playerItem.querySelector('.sAlbums__plList').appendChild(listItem);

			})

			let trackCount = tracks.length;
			let npAction = playerItem.querySelector('.sAlbums__npAction');
			let npTitle = playerItem.querySelector('.sAlbums__npTitle');
			let audio = $(item).on('play', function () {
				playing = true;

			}).on('pause', function () {

			}).on('ended', function () {

				if ((index + 1) < trackCount) {
					index++;
					loadTrack(index);
					audio.play();
				} else {
					audio.pause();
					index = 0;
					loadTrack(index);
				}
			}).get(0);
			let btnPrev = $(playerItem.querySelector('.sAlbums__btnPrev')).on('click', function () {
				if ((index - 1) > -1) {
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
			let btnNext = $(playerItem.querySelector(' .sAlbums__btnNext')).on('click', function () {
				if ((index + 1) < trackCount) {
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
			let li = $(playerItem.querySelector(' .sAlbums__plList li')).on('click', function () {
				var id = parseInt($(this).index());
				if (id !== index) {
					playTrack(id);
				}
			});
			let loadTrack = function (id) {
				npTitle.innerHTML = `${tracks[id].name}`;
				index = id;
				audio.src = mediaPath + tracks[id].file + extension;
				updateDownload(id, audio.src);
			};
			let updateDownload = function (id, source) {
				player.on('loadedmetadata', function () {
					$('a[data-plyr="download"]').attr('href', source);
				});
			}
			let playTrack = function (id) {
				loadTrack(id);
				audio.play();
			};
			extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
			loadTrack(index);
		}
	});

	let eventSlider = new Swiper('.eventSlider-js', {
		freeMode: true,
		loop: true,
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
}

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
