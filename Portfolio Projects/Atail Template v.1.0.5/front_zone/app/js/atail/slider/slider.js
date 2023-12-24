import {
  animationSupport
} from '../functions/animationSupport';
import {
  transitionEvent
} from '../functions/transitionEvent';

class Slider {

  constructor( className = '.atail-slider', autoplay = true ) {
    this.isInited = false;
    this.isMouseOver = false;
    this.autoplay = autoplay;

    this.init( className );
  }

  init( className ) {

    let slider = this.slider = document.querySelector( className );

    if ( !slider ) {
      return false;
    }

    slider.classList.add( 'atail-slider' );

    let sliderItems = this.sliderItems = slider.children;
    this.sliderItems = [];

    if ( sliderItems.length <= 0 ) {
      return false;
    }

    sliderItems[ 0 ].classList.add( 'active' );

    [].forEach.call( sliderItems, item => {
      this.sliderItems.push( item );
      item.classList.add( 'atail-slider-item' );
    } );

    this.currentItem = 0;
    this.prevItem = 0;

    this.createAnimateBox();
    this.mouseEvent();
    this.onTouch();

    this.isInited = true;

    if ( this.autoplay ) {

      if ( this.isMouseOver ) {
        return false;
      }

    }

  }

  createAnimateBox() {

    if ( this.sliderItems.length <= 1 ) {
      return false;
    }

    let sliderAnimateBox = this.sliderAnimateBox = document.createElement( 'DIV' );
    let animateBoxRight = this.animateBoxRight = document.createElement( 'DIV' );
    let animateBoxLeft = this.animateBoxLeft = document.createElement( 'DIV' );

    sliderAnimateBox.className = 'slider-animate-box';
    animateBoxRight.className = 'animate-box-right';
    animateBoxLeft.className = 'animate-box-left';

    sliderAnimateBox.appendChild( animateBoxLeft );
    sliderAnimateBox.appendChild( animateBoxRight );

    this.setTimeout = setTimeout( () => {
      this.goNext();
    }, 2500 );


    let animateBox = event => {
      clearTimeout( this.setTimeout );


      let target = event.currentTarget;

      if ( this.sliderAnimateBox.classList.contains( 'from-right' ) ) {

        if ( this.sliderAnimateBox.classList.contains( 'from-right-end' ) ) {
          this.sliderAnimateBox.classList.remove( 'from-right-end' );
          this.sliderAnimateBox.classList.remove( 'from-right' );

          this.isAnimating = false;

          if ( this.autoplay ) {

            if ( this.isMouseOver ) {
              return false;
            } else {
              this.setTimeout = setTimeout( () => {
                this.goNext();
              }, 2500 );
            }


          }
        } else {
          this.sliderItems[ this.prevItem ].classList.remove( 'active' );
          this.sliderItems[ this.currentItem ].classList.add( 'active' );

          this.sliderAnimateBox.classList.add( 'from-right-end' );
        }
      } else if ( this.sliderAnimateBox.classList.contains( 'from-left' ) ) {

        if ( this.sliderAnimateBox.classList.contains( 'from-left-end' ) ) {
          this.sliderAnimateBox.classList.remove( 'from-left-end' );
          this.sliderAnimateBox.classList.remove( 'from-left' );

          this.isAnimating = false;

          if ( this.autoplay ) {

            if ( this.isMouseOver ) {
              return false;
            } else {
              this.setTimeout = setTimeout( () => {
                this.goNext();
              }, 2500 );
            }

          }
        } else {
          this.sliderItems[ this.prevItem ].classList.remove( 'active' );
          this.sliderItems[ this.currentItem ].classList.add( 'active' );

          this.sliderAnimateBox.classList.add( 'from-left-end' );
        }
      }
    };

    animateBoxRight.addEventListener( transitionEvent, animateBox );
    animateBoxLeft.addEventListener( transitionEvent, animateBox );


    let arrowTemplate = this.arrowTemplate =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width = "57.143px" height = "34.454px" viewBox = "0 0 57.143 34.454" enable - background = "new 0 0 57.143 34.454" xml: space = "preserve"><g><g><polygon points ="51.908,17.599 46.891,13.1 46.891,17.094 6.904,17.094 6.904,18.094 46.891,18.094 46.891,22.099"/></g></g></svg>';

    this.fullPostNextSlide = document.createElement( 'SPAN' );
    this.fullPostNextSlide.className = 'slider-next-slide';
    this.fullPostNextSlide.setAttribute( 'data-action', 'slider-next-slide' );
    this.fullPostNextSlide.innerHTML = arrowTemplate;

    this.fullPostPrevSlide = document.createElement( 'SPAN' );
    this.fullPostPrevSlide.className = 'slider-prev-slide';
    this.fullPostPrevSlide.setAttribute( 'data-action', 'slider-prev-slide' );
    this.fullPostPrevSlide.innerHTML = arrowTemplate;

    this.slider.appendChild( sliderAnimateBox );
    this.slider.appendChild( this.fullPostNextSlide );
    this.slider.appendChild( this.fullPostPrevSlide );
  }

  goNext( isClick = false ) {

    if ( this.sliderItems.length <= 1 ) {
      return false;
    }

    if ( !isClick ) {
      if ( this.isMouseOver ) {
        return false;
      }
    }

    if ( this.isAnimating ) {
      return false;
    }

    this.prevItem = this.currentItem;
    this.currentItem++;

    if ( this.currentItem >= this.sliderItems.length ) {
      this.currentItem = 0;
    }

    if ( !animationSupport ) {
      this.changeSlide();
    } else {
      this.isAnimating = true;
      this.sliderAnimateBox.classList.add( 'from-right' );
    }
  }

  goPrev( isClick = false ) {

    if ( this.sliderItems.length <= 1 ) {
      return false;
    }

    if ( !isClick ) {
      if ( this.isMouseOver ) {
        return false;
      }
    }

    if ( this.isAnimating ) {
      return false;
    }

    this.prevItem = this.currentItem;
    this.currentItem--;

    if ( this.currentItem < 0 ) {
      this.currentItem = this.sliderItems.length - 1;
    }

    if ( !animationSupport ) {
      this.changeSlide();
    } else {
      this.isAnimating = true;
      this.sliderAnimateBox.classList.add( 'from-left' );
    }
  }

  changeSlide() {
    this.sliderItems[ this.prevItem ].classList.remove( 'active' );
    this.sliderItems[ this.currentItem ].classList.add( 'active' );
  }

  mouseEvent() {

    if ( this.sliderItems.length <= 1 ) {
      return false;
    }

    let slider = this.slider;

    slider.onmouseenter = event => {
      this.isMouseOver = true;
      clearTimeout( this.setTimeout );
    };

    slider.onmouseleave = event => {
      this.isMouseOver = false;

      if ( this.autoplay ) {
        setTimeout( () => {
          this.goNext();
        }, 2500 );
      }
    };

    slider.onmousedown = event => {
      // console.log('mouse down');
    };
  }

  onTouch() {

    if ( this.sliderItems.length <= 1 ) {
      return false;
    }

    let showPrev = false,
      showNext = false,
      startX = null,
      endX = null,
      translateX = 0;

    // touch start
    this.slider.addEventListener( 'touchstart', event => {

      var touch = event.touches[ 0 ];
      startX = touch.clientX;

    } );

    // touch move
    this.slider.addEventListener( 'touchmove', event => {

      var touch = event.touches[ 0 ];
      endX = touch.clientX;
      translateX = startX - endX;

    } );

    // touch end
    this.slider.addEventListener( 'touchend', event => {

      if ( translateX < -20 ) {
        this.goPrev( true );
      }

      if ( translateX > 20 ) {
        this.goNext( true );
      }

      translateX = 0;
    } );
  }

}

export default Slider;
