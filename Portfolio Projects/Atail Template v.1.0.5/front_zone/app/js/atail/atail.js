// ==========================================================================
// Atail
// ==========================================================================

// journalctl

// Navigation
// ==========================================================================
import Navigation from "./navigation/navigation";
import {optimizedResize} from "./functions/optimizedResize";
import GlobalVariables from "./global";
import ProjectPreview from "./projectPreview/projectPreview";
import Preloader from "./preloader";
import AllProjects from "./allProjects/allProjects";
import AtailScroll from "./scroll/scroll";
import {Promise} from "es6-promise";
import objectFitImages from "object-fit-images";
import ContactForm from "./Forms/Contact-form";
import "./functions/requestAnimationFrame";
import "./functions/performance.now()-polyfill";
import {blogPostLike} from "./functions/blogPostLike";
import {blogPostDislike} from "./functions/blogPostDislike";
import Slider from "./slider/slider";

// Functions
// ==========================================================================

// Globals Variables
// ==========================================================================

// Project Preview
// ==========================================================================

// Preloader
// ==========================================================================

// Project Preview
// ==========================================================================

// // Scroll
// // ==========================================================================

// // Lang menu
// // ==========================================================================
// import Lang from './lang/Lang';

/**
 *
 *
 * @class Atail
 */
class Atail {
	
	constructor() {
		
		this.init();
		
	}
	
	init() {
		
		// navigation
		// projectPreiew
		
		// init preloader
		this.Preloader = new Preloader();
		
		// init navigation
		this.Nav = new Navigation();
		
		// init projectPreview
		this.projectPreview = new ProjectPreview();
		
		// init AllProjects
		this.allProjects = new AllProjects();
		
		// init contact forms
		new ContactForm('.contact-form', 'php/index.php', 'contact');
		// init subscribe forms
		new ContactForm('.subscribe-form', 'php/index.php', 'subscribe');
		
		// init Sldier
		// this.slider = new Slider();
		
		// init Sldier
		// this.lang = new Lang();
		
		// init Scroll
		this.scroll = new AtailScroll(GlobalVariables.main);
		
		this.initEvents();
		
	}
	
	initEvents() {
		
		// window load
		// document.ready
		// resize
		// click
		// scroll
		
		const promise = () => {
			return new Promise((resolve, reject) => {
				let result = true;
				if (result) {
					resolve(result);
				} else {
					reject(result);
				}
			});
		};
		
		window.addEventListener('load', () => {
			
			this.slider = new Slider();
			
			this.allProjects.init();
			this.scroll.init();
			GlobalVariables.windowIsLoad = true;
			this.Preloader.showAtail();
			
			setTimeout(() => {

				objectFitImages('.intro-demo-image img');

				objectFitImages('.atail-text-logo img');
				
				objectFitImages('.atail-slider-item img');
				
				objectFitImages('.preview-images-item img');
				objectFitImages('.atail-post-title  img');
				objectFitImages('.atail-brands-item a img');
				objectFitImages('.atail-post-title img');
				objectFitImages('.figure-extended img');
				objectFitImages('.atail-post-most-likes img');
				objectFitImages('.widget_recent_entries img');
				objectFitImages('.widget_atail_recent_posts_widget img');
			}, 0);
		});
		
		// resize
		optimizedResize.add(() => {
			promise().then(result => {
				GlobalVariables.resize();
				this.Preloader.resize();
				result = true;
				return result;
			}).then(result => {
				this.Nav.resize();
				return result;
			}).then(result => {
				this.projectPreview.resize();
				return result;
			}).then(result => {
				this.allProjects.resize();
				return result;
			}).then(result => {
				this.scroll.resize();
				return result;
			}).then(result => {
				return result;
				// console.log('All elements was resized successfully!');
			}).catch(reason => {
				console.error('Error when window was resizing!', reason);
			});
		});
		
		// click
		document.addEventListener('click', event => {
			let target = event.target,
				action = target.getAttribute('data-action'),
				isLink = target.tagName === 'A',
				isBody = target.tagName === 'BODY';

			if (!isLink) {
				
				if (!action) {
					
					while (!isLink || !action) {
						
						target = target.parentNode;
						
						if (target.nodeType === 9) {
							break;
						}
						
						if (target.tagName === 'BODY') {
							isBody = true;
							break;
						}
						
						action = target.getAttribute('data-action');
						isLink = target.tagName === 'A';
						
						if (action !== null || isLink) {
							break;
						}
						
					}
					
				}
				
			}
			
			if (isBody) {
				return false;
			}
			
			if (isLink) {
				let href = target.getAttribute('href');
				let hasHash = href && href.indexOf('#') !== -1;
				
				let onClick = target.getAttribute('onClick');
				
				if (!hasHash && !action) {
					
					if (!onClick) {
						
						let isTarget = target.getAttribute('target');
						
						if (isTarget && isTarget.indexOf('_blank') !== -1) {
							return false;
						}

						if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
							this.Nav.closeNav();
						    return false;
                        }
						
						event.preventDefault();
						// document.body.style.opacity = 0;

						document.body.classList.add('atail-hide-body');

						setTimeout( () => {
							location.href = href;
						}, 300);
					}
					
					return false;
				}
				event.preventDefault();
			}
			
			if (action) {
				switch (action) {
					case 'show-nav':
						this.Nav.showNav();
						break;
					case 'close-nav':
						this.Nav.closeNav();
						break;
					
					case 'open-full-post':
						this.projectPreview.openFullPost(target);
						break;
					case 'full-post-close':
						this.projectPreview.closeFullPost(target);
						break;
					
					case 'full-post-next-slide':
						this.projectPreview.nextSlide();
						break;
					case 'full-post-prev-slide':
						this.projectPreview.prevSlide();
						break;
					
					case 'full-post-show-info':
						event.stopPropagation();
						this.projectPreview.fullPostShowInfo();
						break;
					
					case 'show-category':
						this.allProjects.showCategory(target);
						break;
					
					case 'like':
						blogPostLike(target);
						break;
					case 'dislike':
						blogPostDislike(target);
						break;
					
					
					// slider event
					case 'slider-prev-slide':
						this.slider.goPrev(true);
						break;
					case 'slider-next-slide':
						this.slider.goNext(true);
						break;
					
					// all projects
					case 'all-projects':
						this.allProjects.showProjects(target);
						break;
					case 'all-projects-close':
						this.allProjects.closeProjects();
						break;
					
					case 'show-lang':
						// this.lang.show();
						break;
				}
			}
		});
		
		let html = document.documentElement;
		let body = document.body;
		
		document.addEventListener('scroll', () => {
			
			let scrollTop = html.scrollTop || body && body.scrollTop || 0;
			
			if (GlobalVariables.ww < 992) {
				this.allProjects.onScroll(scrollTop);
			}
		});
		
	}

}

export default Atail;
