import {transitionEvent} from "../functions/transitionEvent";
import {animationEvent} from "../functions/animationEvent";
import {animationSupport} from "../functions/animationSupport";
import {jsAnimation} from "../functions/jsAnimation";
import {httpGet} from "../functions/promise-ajax";
import GlobalVariables from "../global";
import objectFitImages from "object-fit-images";
import AtailScroll from "../scroll/scroll";

class ProjectPreview {
    constructor() {

        // this.projectPreview - main block
        //
        // this.projectPreviewParent - parent block
        //
        // this.projects - all projects in this block
        // this.projectsLength - all projects length
        // this.currentProject - current projects
        // this.prevProject - previous project
        // this.hasScroll - if main block has scroll
        //
        // this.projectsImages - project image
        //
        // this.animationBox
        // this.animateFromTop
        // this.animateFromBot
        //
        // this.fullPostSliderImages
        //

        this.isInit = false;

        this.init();

    }

    init() {

        let projectPreview = this.projectPreview = document.querySelector('.project-preview');
        if (!projectPreview) {
            return false;
        }

        // init Sldier
        this.scroll = new AtailScroll(projectPreview);
        this.scroll.init();

        this.projectPreviewParent = projectPreview.parentNode;

        document.body.classList.add('window-height');

        projectPreview.focus();

        let projects = this.projects = projectPreview.children;
        if (!projects.length) {
            return false;
        }

        this.projectsLength = projects.length;

        let projectsImagesBox = this.projectsImagesBox = document.querySelector('.preview-images-item');
        this.projectsImages = [];
        this.fullPostSliderImages = [];

        projects[0].classList.add('projects-item-active');
        projects[0].classList.add('projects-item-animate');

        [].forEach.call(projects, items => {
            items.classList.add('projects-item');

            let idPost = items.querySelector('[id^="project-"]');
            if (idPost) {
                idPost = idPost.getAttribute('id');
            }

            if (projectsImagesBox) {
                let image = projectsImagesBox.querySelector('.' + idPost);
                if (image) {
                    this.projectsImages.push(image);
                } else {
                    this.projectsImages.push(false);
                }
            }
        });

        if (this.projectsImages) {
            this.projectsImages[0] && this.projectsImages[0].classList.add('images-item-active');
        }

        this.currentProject = projects[0];
        this.currentProjectIndex = 0;
        this.prevProjectIndex = 0;

        // animate box
        this.animateBoxBot();

        this.checkScroll();

        // events
        this.initMouseWheel();
        this.onKeyPress();
        this.onTouch();

        // this.onScroll();

        // create full post template
        this.createFullPost();

        // create shares
        // this.createShares();

        // scroll
        this.scroll.createScroll();

        this.isInit = true;

    }

    initMouseWheel() {

        let goNext = false,
            goPrev = false;

        let onWheel = e => {

            e = e || window.event;

            e.preventDefault ? e.preventDefault() : ( e.returnValue = false );

            if (this.isAnimating) {
                e.preventDefault();
                return false;
            }

            let target = e.currentTarget;

            var delta = e.deltaY || e.detail || e.wheelDelta;

            if (/rv:11.0/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /MSIE 10/i.test(
                    navigator.userAgent)) {
                delta = -delta;
            }

            if (delta < 100 && delta > 0) {
                delta = 100;
            } else if (delta > -100 && delta < 0) {
                delta = -100;
            }

            if (this.hasScroll) {

                let projectView = target;

                if (projectView.scrollTop === 0 && delta < 0) {
                    goPrev = true;
                } else if (projectView.scrollTop >= this.maxScrollHeight && delta > 0) {
                    goNext = true;
                } else {
                    this.isAnimating = true;

                    // let self = this;

                    this.startPosition = projectView.scrollTop;
                    this.endPosition = this.startPosition + delta * 2;
                    this.path = this.endPosition - this.startPosition;

                    // if(self.currentPosition > self.endPosition) {
                    //   self.animateTop = false;
                    // } else {
                    //   self.animateTop = true;
                    // }

                    // projectView.scrollTop += delta;


                    jsAnimation({
                        duration: 300,
                        timing: timeFraction => {
                            return timeFraction;
                        },
                        draw: progress => {
                            projectView.scrollTop = this.startPosition + this.path * progress;

                            if (GlobalVariables.ww >= 992) {
                                let top = ( this.startPosition + this.path * progress ) * this.scroll.precent;

                                if (top < 0) {
                                    top = 0;
                                } else if (top > projectView.clientHeight - this.scroll.lineHeight) {
                                    top = projectView.clientHeight - this.scroll.lineHeight;
                                }

                                this.scroll.scrollLine.style.top = top + 'px';
                            }

                            if (progress >= 1) {
                                this.isAnimating = false;
                            }
                        }
                    });
                }

            } else {
                if (delta > 0) {
                    goNext = true;
                } else if (delta < 0) {
                    goPrev = true;
                }
            }

            if (goNext) {
                // alert('go next');
                this.showNextProject();
                goNext = false;
            }
            if (goPrev) {
                // alert('go next');
                this.showPrevProject();
                goPrev = false;
            }

        };

        let elem = this.projectPreview;

        if (elem.addEventListener) {
            if ('onwheel' in document) {
                // IE9+, FF17+, Ch31+
                elem.addEventListener('wheel', onWheel);
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                elem.addEventListener('mousewheel', onWheel);
            } else {
                // Firefox < 17
                elem.addEventListener('MozMousePixelScroll', onWheel);
            }
        } else { // IE8-
            elem.attachEvent('onmousewheel', onWheel);
        }

    }

    onKeyPress() {
        let showPrev = false,
            showNext = false,
            // startY, endY,
            keyDown = false;

        this.projectPreview.addEventListener('keydown', () => {

            if (keyDown) {
                return false;
            }
            keyDown = true;


            if (!this.maxScrollHeight) {
                this.checkScroll();
            }

            if (this.hasScroll) {
                showPrev = this.projectPreview.scrollTop === 0;
                showNext = this.projectPreview.scrollTop >= this.maxScrollHeight;
            }

        });

        this.projectPreview.addEventListener('keyup', event => {

            if (this.fullPostIsOpen || this.isAnimating) {
                return false;
            }

            if (!this.hasScroll) {
                event.keyCode === 38 && this.showPrevProject();
                event.keyCode === 40 && this.showNextProject();
            } else {

                if (showPrev && this.projectPreview.scrollTop === 0) {
                    event.keyCode === 38 && this.showPrevProject();
                } else if (showNext && this.projectPreview.scrollTop >= this.maxScrollHeight) {
                    event.keyCode === 40 && this.showNextProject();
                }
            }

            showPrev = false;
            showNext = false;
            keyDown = false;

        });
    }

    onTouch() {

        let showPrev = false,
            showNext = false,
            startY = null,
            endY = null,
            translateY = 0;

        // touch start
        this.projectPreview.addEventListener('touchstart', event => {


            if (this.isAnimating) {
                return false;
            }

            if (!this.maxScrollHeight) {
                this.checkScroll();
            }

            if (this.hasScroll) {
                showPrev = this.projectPreview.scrollTop === 0;
                showNext = this.projectPreview.scrollTop === this.maxScrollHeight;
            }

            var touch = event.touches[0];
            startY = touch.clientY;

        });

        // touch move
        this.projectPreview.addEventListener('touchmove', event => {

            if (this.isAnimating) {
                return false;
            }


            var touch = event.touches[0];
            endY = touch.clientY;
            translateY = startY - endY;
        });

        // touch end
        this.projectPreview.addEventListener('touchend', () => {

            if (this.isAnimating) {
                return false;
            }

            if (!this.hasScroll) {
                if (translateY < -20) {
                    showPrev = true;
                } else if (translateY > 20) {
                    showNext = true;
                }
            }

            if (this.projectPreview.scrollTop === 0 && showPrev) {
                if (translateY < -20) {
                    this.showPrevProject();
                }
            }
            if (this.projectPreview.scrollTop === this.maxScrollHeight && showNext) {
                if (translateY > 20) {
                    this.showNextProject();
                }
            }

            showPrev = false;
            showNext = false;
            translateY = 0;
        });
    }

    /**
     * Show next project
     * @return {[type]} [description]
     */
    showNextProject() {

        if (this.isAnimating) {
            return false;
        }

        this.prevProjectIndex = this.currentProjectIndex;

        let nextIndex = this.currentProjectIndex + 1;

        if (nextIndex >= this.projectsLength) {
            nextIndex = 0;
        }

        this.currentProjectIndex = nextIndex;

        if (this.prevProjectIndex === this.currentProjectIndex) {
            return false;
        }

        this.fromBottom = true;

        this.showProject();
    }

    /**
     * Show prev project
     * @return {[type]} [description]
     */
    showPrevProject() {

        if (this.isAnimating) {
            return false;
        }

        this.prevProjectIndex = this.currentProjectIndex;

        let nextIndex = this.currentProjectIndex - 1;

        if (nextIndex < 0) {
            nextIndex = this.projectsLength - 1;
        }

        this.currentProjectIndex = nextIndex;

        if (this.prevProjectIndex === this.currentProjectIndex) {
            return false;
        }

        this.fromTop = true;

        this.showProject();
    }

    /**
     * Show project
     * @return {[type]} [description]
     */
    showProject() {

        this.isAnimating = true;

        if (!animationSupport) {
            let projects = this.projects,
                images = this.projectsImages,
                current = this.currentProjectIndex,
                prev = this.prevProjectIndex;

            projects[current].classList.add('projects-item-active');
            projects[prev].classList.remove('projects-item-active');

            projects[current].classList.add('projects-item-animate');
            projects[prev].classList.remove('projects-item-animate');

            this.projectPreview.scrollTop = 0;

            images[prev] && images[prev].classList.remove('images-item-active');
            images[current] && images[current].classList.add('images-item-active');

            this.checkScroll();

            this.isAnimating = false;

            return false;
        }

        // this.animateWrap.style.zIndex = 3;
        this.animateWrap.classList.add('z-index-3');

        this.projects[this.prevProjectIndex].classList.add('projects-count-hide');

        this.projects[this.prevProjectIndex].classList.remove('projects-item-animate');

        if (this.fromBottom) {
            this.animateBoxBot.classList.add('from-bottom');
        }

        if (this.fromTop) {
            this.animateBoxTop.classList.add('from-top');
        }

    }

    /**
     * Check if scroll is exist
     * @return {[type]} [description]
     */
    checkScroll() {

        let visibleHeight = this.offsetHeight = this.projectPreview.offsetHeight,
            fullHeight = this.fullHeight = this.projectPreview.scrollHeight;

        this.maxScrollHeight = fullHeight - visibleHeight;

        if (visibleHeight + 1 < fullHeight) {
            this.hasScroll = true;
        } else {
            this.hasScroll = false;
        }

    }

    animateBoxBot() {

        let animateBoxBot = this.animateBoxBot = document.createElement('DIV');
        let animateBoxTop = this.animateBoxTop = document.createElement('DIV');
        let animateWrap = this.animateWrap = document.createElement('DIV');
        animateBoxBot.className = 'animate-box-bot';
        animateBoxTop.className = 'animate-box-top';
        animateWrap.className = 'animate-wrap';

        animateBoxBot.innerHTML = '<div></div><div></div><div></div>';
        animateBoxTop.innerHTML = '<div></div><div></div><div></div>';

        animateWrap.appendChild(animateBoxBot);
        animateWrap.appendChild(animateBoxTop);

        // let main = document.querySelector('main');
        // main.appendChild(animateWrap);

        this.projectsImagesBox.appendChild(animateWrap);

        let iteration = 0;

        let animate = () => {
            let projects = this.projects,
                images = this.projectsImages,
                current = this.currentProjectIndex,
                prev = this.prevProjectIndex;

            iteration++;

            if (iteration === 1) {

                projects[current].classList.add('projects-item-active');
                projects[prev].classList.remove('projects-item-active');

                projects[prev].classList.remove('projects-count-hide');

                setTimeout(() => {
                    projects[current].classList.add('projects-item-animate');
                }, 0);

                this.projectPreview.scrollTop = 0;

                images[prev] && images[prev].classList.remove('images-item-active');
                images[current] && images[current].classList.add('images-item-active');

                this.checkScroll();

                if (this.fromBottom) {
                    // setTimeout(()=>{
                    animateBoxBot.classList.add('from-bottom-end');

                    // }, 200);
                } else if (this.fromTop) {
                    animateBoxTop.classList.add('from-top-end');

                }

                this.scroll.setScrollSize();

            } else if (iteration === 2) {

                // animateWrap.style.zIndex = '';
                animateWrap.classList.remove('z-index-3');

                iteration = 0;

                // setTimeout(()=>{
                if (this.fromBottom) {
                    animateBoxBot.classList.remove('from-bottom');
                    animateBoxBot.classList.remove('from-bottom-end');
                    this.fromBottom = false;
                } else if (this.fromTop) {
                    animateBoxTop.classList.remove('from-top');
                    animateBoxTop.classList.remove('from-top-end');
                    this.fromTop = false;
                }
                // }, 100);

                this.isAnimating = false;
            }
        };

        animateBoxBot.addEventListener(transitionEvent, animate);
        animateBoxTop.addEventListener(transitionEvent, animate);

    }

    openFullPost(target) {

        if (this.isAnimating) {
            return false;
        }
        this.isAnimating = true;

        target.classList.add('is-loading');

        // 'atail_get_popup_project'
        httpGet('jsons/atail_get_popup_project/', target).then(result => {
            target.classList.remove('is-loading');
            GlobalVariables.atailMain.appendChild(this.fullPost);

            this.fullPostIsOpen = true;

            result = JSON.parse(result);

            return result;
        }, () => {
            return false;
        }).then(result => {

            if (!result) {
                return false;
            }

            let cloneImage = this.projectsImages[this.currentProjectIndex] && this.projectsImages[this.currentProjectIndex]
                    .cloneNode(true);

            let cloneImageSrc = null;

            if (cloneImage) {
                cloneImage.classList.add('active');

                let div = document.createElement('DIV');
                div.className = 'post-slider-image-item';
                div.appendChild(cloneImage);

                this.postSliderImages.appendChild(div);

                this.fullPostSliderImages.push(div);
                cloneImageSrc = cloneImage.getAttribute('src');
            }

            result.slides && result.slides.forEach(item => {

                let type = item.type;

                if (type === 'image') {

                    let img = new Image();

                    let imgSrc = item.src.img,
                        imgAlt = item.src.title;

                    img.onload = () => {
                        objectFitImages(img);
                    };

                    let div = document.createElement('DIV');
                    div.className = 'post-slider-image-item';

                    /* Fit type */
                    let fit = item.fit,
                        letCloned = false;

                    // if ( cloneImage ) {
                    //   if ( hasObjectFit ) {
                    //     if ( cloneImageSrc === item.src.img ) {
                    //       imgSrc = result.thumbnail_url;
                    //       letCloned = true;
                    //     }
                    //   } else {
                    //     if ( cloneImage.style.backgroundImage.indexOf( item.src.img ) !== -1 ) {
                    //       imgSrc = result.thumbnail_url;
                    //       letCloned = true;
                    //     }
                    //   }
                    // }

                    switch (fit) {
                        case 'contain':
                            letCloned ? null : div.classList.add('contain-fit');
                            break;

                        case 'full':
                            letCloned ? null : div.classList.add('full-fit');
                            break;
                    }

                    // let crateScroll = () => {
                    //   setTimeout( () => {
                    //     new AtailScroll( div ).init();
                    //   }, 600 );
                    // };

                    // img.onload = () => {
                    //   // init Sldier

                    // };

                    img.src = imgSrc;
                    img.alt = imgAlt;

                    let scrollDiv = null;

                    if (fit === 'full') {
                        scrollDiv = document.createElement('DIV');
                        scrollDiv.className = 'post-slider-item-scroll';

                        scrollDiv.appendChild(img);
                        div.appendChild(scrollDiv);
                    } else {
                        div.appendChild(img);
                    }

                    this.postSliderImages.appendChild(div);
                    this.fullPostSliderImages.push(div);

                    if (fit === 'full') {
                        this.scrollItem.push(new AtailScroll(scrollDiv));
                    }

                } else if (type === 'video') {

                    // let video = `<iframe data-src=${item.src} frameborder="0" allowfullscreen></iframe>`;

                    let iframe = document.createElement('IFRAME');
                    // iframe.setAttribute( 'allowfullscreen', 'allowfullscreen' );
                    iframe.setAttribute('frameborder', 0);

                    setTimeout(() => {
                        iframe.setAttribute('src', item.src);
                    }, 2000);

                    let div = document.createElement('DIV');
                    div.className = 'post-slider-video-item';
                    // div.innerHTML = video;
                    div.appendChild(iframe);
                    this.postSliderImages.appendChild(div);
                    this.fullPostSliderImages.push(div);
                }

            });

            if (this.fullPostSliderImages && this.fullPostSliderImages.length > 0) {
                this.fullPostCurrentIndex = 0;
                this.fullPostPrevIndex = 0;

                this.fullPostSliderImages[0].classList.add('active');

                if (this.fullPostSliderImages.length > 1) {
                    this.fullPostNextSlide.innerHTML = this.arrowTemplate;
                    this.fullPostPrevSlide.innerHTML = this.arrowTemplate;
                    this.postSliderImages.appendChild(this.fullPostNextSlide);
                    this.postSliderImages.appendChild(this.fullPostPrevSlide);
                }

            }

            let startDate = result.date_start ? result.date_start : '';
            let finishDate = result.date_finish ? result.date_finish : '';

            this.contentHeader.innerHTML = `<h4>${result.title}</h4>${startDate}${finishDate}<p>${result.content}</p>`;

            let footerString = result.positions ? result.participants : '';

            let positions = result.positions;

            for (let item in result.positions) {
                if (positions.hasOwnProperty(item)) {
                    footerString +=
                        `<span class="small-title">${positions[item].title}<span>${positions[item].url}</span></span>`;
                }
            }

            this.contentFooter.innerHTML = footerString;

            this.createShares(result.link, result.title);

            if (GlobalVariables.lang) {
                GlobalVariables.lang.classList.add('hide-lang');
            }

            return true;
        }).then(result => {
            setTimeout(() => {

                // show project
                this.fullPost.classList.add('show-post-content');
                if (!animationSupport) {
                    this.fullPost.classList.add('no-animating');
                }
            }, 1000 / 60);
            return result;
        }).then(result => {
            this.isAnimating = false;
            return result;
        })
            .catch(() => {
                this.isAnimating = false;
            });
    }

    closeFullPost() {

        this.fullPost.classList.add('close-post-content');
        this.fullPost.classList.remove('show-post-content');
        this.fullPost.classList.remove('show-in-mobile');

        GlobalVariables.main.parentNode.style.opacity = '';

        let images = this.projectsImages,
            sliderImages = this.fullPostSliderImages,
            projectIndex = this.currentProjectIndex,
            sliderIndex = this.fullPostCurrentIndex;

        if (!images[projectIndex] || !sliderImages[sliderIndex]) {
            return false;
        }

        this.scrollItem.forEach(item => {
            item.remove();
        });

        this.scrollItem = [];
        this.scrollItemIsInited = false;

        // let slideCloned = sliderImages[ sliderIndex ].querySelector( 'img' );

        // if ( slideCloned ) {

        //   slideCloned = slideCloned.cloneNode( true );

        //   slideCloned.className += ' images-item-active';

        //   images[ projectIndex ].parentNode.replaceChild( slideCloned, images[ projectIndex ] );

        //   images[ projectIndex ] = slideCloned;
        // }

        if (!animationSupport) {

            this.fullPost.classList.remove('no-animating');
            this.fullPost.classList.remove('close-post-content');
            this.fullPost.classList.remove('show-post-content');
            this.fullPost.parentNode.removeChild(this.fullPost);

            while (this.postSliderImages.firstChild) {
                this.postSliderImages.removeChild(this.postSliderImages.firstChild);
            }

            this.fullPostSliderImages = [];

            this.fullPostIsOpen = false;
            this.projectPreview.focus();

            if (GlobalVariables.lang) {
                GlobalVariables.lang.classList.remove('hide-lang');
            }
        }

    }

    createFullPost() {
        // створити головний блок
        let fullPost = this.fullPost = document.createElement('DIV');
        fullPost.className = 'full-post row';

        fullPost.style.width = GlobalVariables.main.offsetWidth + 'px';

        // блок для слайдера
        let slider = this.fullPostSlider = document.createElement('DIV');
        slider.className = 'full-post-slider col-xs-10';
        // блок для елементів
        let images = this.postSliderImages = document.createElement('DIV');
        images.className = 'post-slider-images';

        let startX, endX, path;

        // івенти на тач
        images.addEventListener('touchstart', event => {
            let touch = event.touches[0];
            startX = touch.clientX;
        });
        images.addEventListener('touchmove', event => {
            let touch = event.touches[0];
            endX = touch.clientX;
        });
        images.addEventListener('touchend', () => {
            path = startX - endX;

            if (this.fullPostSliderImages.length <= 1) {
                return false;
            }

            if (path >= 50) {
                this.nextSlide();
            } else if (path <= -50) {
                this.prevSlide();
            }
        });

        slider.appendChild(images);

        // стрілки вліво/вправо
        let arrowTemplate = this.arrowTemplate =
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width = "57.143px" height = "34.454px" viewBox = "0 0 57.143 34.454" enable - background = "new 0 0 57.143 34.454" xml: space = "preserve"><g><g><polygon points ="51.908,17.599 46.891,13.1 46.891,17.094 6.904,17.094 6.904,18.094 46.891,18.094 46.891,22.099"/></g></g></svg>';

        this.fullPostNextSlide = document.createElement('SPAN');
        this.fullPostNextSlide.className = 'full-post-next-slide';
        this.fullPostNextSlide.setAttribute('data-action', 'full-post-next-slide');
        this.fullPostNextSlide.innerHTML = arrowTemplate;

        this.fullPostPrevSlide = document.createElement('SPAN');
        this.fullPostPrevSlide.className = 'full-post-prev-slide';
        this.fullPostPrevSlide.setAttribute('data-action', 'full-post-prev-slide');
        this.fullPostPrevSlide.innerHTML = arrowTemplate;

        let content = this.fullPostContent = document.createElement('DIV');
        content.className = 'full-post-content col-xs-2';
        let contentTableWrapper = this.contentTableWrapper = document.createElement('DIV');
        contentTableWrapper.className = 'post-content-table-wrapper';
        let contentTable = this.contentTable = document.createElement('DIV');
        contentTable.className = 'post-content-table';
        let contentHeader = this.contentHeader = document.createElement('DIV');
        contentHeader.className = 'post-content-header';
        let contentFooter = this.contentFooter = document.createElement('DIV');
        contentFooter.className = 'post-content-footer';

        contentTableWrapper.appendChild(contentTable);
        contentTable.appendChild(contentHeader);
        contentTable.appendChild(contentFooter);
        content.appendChild(contentTableWrapper);


        fullPost.appendChild(slider);
        fullPost.appendChild(content);

        let contentAnimate = () => {

            if (this.fullPost.classList.contains('show-post-content')) {
                GlobalVariables.main.parentNode.style.opacity = '0';
            }

        };

        content.addEventListener(transitionEvent, contentAnimate);

        //***************************************************************************
        // Mobile menu

        let mobileMenu = document.createElement('DIV'),
            openInfo = document.createElement('BUTTON'),
            socials = document.createElement('DIV');
        mobileMenu.className = 'full-post-mobile-menu';

        let mobileMenuCloseBtn = this.mobileMenuCloseBtn = document.createElement('SPAN');
        mobileMenuCloseBtn.className = 'mobile-menu-close-btn';
        mobileMenuCloseBtn.setAttribute('data-action', 'full-post-show-info');


        openInfo.className = 'full-post-mobile-info';
        openInfo.setAttribute('data-action', 'full-post-show-info');
        openInfo.innerHTML = 'info';

        mobileMenu.appendChild(openInfo);
        mobileMenu.appendChild(socials);

        fullPost.appendChild(mobileMenu);
        fullPost.appendChild(mobileMenuCloseBtn);


        let closeBtn = this.closeBtn = document.createElement('SPAN');
        closeBtn.className = 'full-post-close';
        closeBtn.setAttribute('data-action', 'full-post-close');

        fullPost.appendChild(closeBtn);

        // check for scroll
        this.scrollItem = [];
        this.scrollItemIsInited = false;

        // init scroll for items
        let initScrollItem = () => {
            this.scrollItem.forEach(item => {
                item.init();
            });
        };

        // Анімація відкривання/закривання проекту
        // це головний блок по якому відслідковуються зміни анімація
        let animatePost = () => {

            this.isAnimating = false;

            // закрити проект
            if (this.fullPost.classList.contains('close-post-content')) {

                this.fullPost.classList.remove('close-post-content');
                this.fullPost.classList.remove('show-post-content');
                this.fullPost.parentNode.removeChild(this.fullPost);
                this.postSliderImages.innerHTML = '';

                this.fullPostSliderImages = [];
                this.scrollItem = [];

                this.fullPostIsOpen = false;
                this.projectPreview.focus();

                if (GlobalVariables.lang) {
                    GlobalVariables.lang.classList.remove('hide-lang');
                }
            }
            // проект відкритий
            else if (this.fullPost.classList.contains('show-post-content')) {
                // create scroll for full post content
                if (!this.scrollItemIsInited) {
                    this.scrollItemIsInited = true;
                    this.scrollItem.push(new AtailScroll(this.contentTableWrapper));
                    initScrollItem();
                } else if (this.scrollItemIsInited) {
                    this.scrollItem.forEach(item => {
                        item.resize();
                    });
                }
            }

        };

        images.addEventListener(animationEvent, animatePost);
        // images.addEventListener( transitionEvent, animatePost );


        //**************************************************************************
        // Animating box

        let fullPostAnimateBox = this.fullPostAnimateBox = document.createElement('DIV');
        let animateBoxRight = this.animateBoxRight = document.createElement('DIV');
        let animateBoxLeft = this.animateBoxLeft = document.createElement('DIV');

        fullPostAnimateBox.className = 'full-post-animate-box';
        animateBoxRight.className = 'animate-box-right';
        animateBoxLeft.className = 'animate-box-left';

        fullPostAnimateBox.appendChild(animateBoxLeft);
        fullPostAnimateBox.appendChild(animateBoxRight);

        // Анімаці для блоку
        let animateBox = () => {

            if (this.fullPostAnimateBox.classList.contains('from-right')) {

                if (this.fullPostAnimateBox.classList.contains('from-right-end')) {
                    this.fullPostAnimateBox.classList.remove('from-right-end');
                    this.fullPostAnimateBox.classList.remove('from-right');
                } else {
                    this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
                    this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');

                    this.fullPostAnimateBox.classList.add('from-right-end');
                }
            } else if (this.fullPostAnimateBox.classList.contains('from-left')) {

                if (this.fullPostAnimateBox.classList.contains('from-left-end')) {
                    this.fullPostAnimateBox.classList.remove('from-left-end');
                    this.fullPostAnimateBox.classList.remove('from-left');
                } else {
                    this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
                    this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');

                    this.fullPostAnimateBox.classList.add('from-left-end');
                }
            }
        };

        animateBoxRight.addEventListener(transitionEvent, animateBox);
        animateBoxLeft.addEventListener(transitionEvent, animateBox);

        slider.appendChild(fullPostAnimateBox);

    }

    nextSlide() {

        let current = this.fullPostCurrentIndex;
        this.fullPostPrevIndex = current;

        current++;

        if (current >= this.fullPostSliderImages.length) {
            current = 0;
        }

        this.fullPostCurrentIndex = current;

        if (!animationSupport) {
            this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
            this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');
        } else {
            this.fullPostAnimateBox.classList.add('from-right');
        }

        // this.showSlide();

    }

    prevSlide() {

        let current = this.fullPostCurrentIndex;
        this.fullPostPrevIndex = current;

        current--;

        if (current < 0) {
            current = this.fullPostSliderImages.length - 1;
        }

        this.fullPostCurrentIndex = current;

        // this.showSlide();

        if (!animationSupport) {
            this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
            this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');
        } else {
            this.fullPostAnimateBox.classList.add('from-left');
        }

    }

    showSlide() {
        if (!animationSupport) {
            this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
            this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');

            this.scroll.setScrollSize();
        }
    }

    fullPostShowInfo() {
        if (this.fullPost.classList.contains('show-in-mobile')) {
            this.fullPost.classList.remove('show-in-mobile');
        } else {
            this.fullPost.classList.add('show-in-mobile');
        }
    }

    resize() {
        if (!this.isInit) {
            return false;
        }

        this.checkScroll();

        this.fullPost.style.width = GlobalVariables.main.offsetWidth + 'px';

        this.scroll.resize();

        this.scrollItem.forEach(item => {
            item.resize();
        });

    }

    createShares(url, text) {

        let sharesBlock = document.createElement('DIV');
        sharesBlock.classList.add('atail-project-shares');

        this.contentHeader.appendChild(sharesBlock);

        let shareArray = JSON.parse(document.body.getAttribute('data-share'));

        jQuery(sharesBlock).jsSocials({
            url: url,
            text: text,
            showLabel: false,
            showCount: true,
            shares: shareArray
        });

    }

}

export default ProjectPreview;
