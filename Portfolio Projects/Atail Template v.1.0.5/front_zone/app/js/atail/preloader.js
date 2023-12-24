// Globals Variables
// ==========================================================================
import GlobalVariables from './global';

import {
  transitionEvent
} from './functions/transitionEvent';
import {
  animationSupport
} from './functions/animationSupport';

class Preloader {

  constructor() {

    let preloaderWrap = this.preloaderWrap = document.querySelector( '.atail-preloader-wrapper' );

    // let preloaderWrap = this.preloaderWrap = document.createElement( 'DIV' );
    // preloaderWrap.className = 'atail-preloader-wrapper';

    let preloader = this.preloader = preloaderWrap.querySelector( '.atail-preloader' );

    // let preloader = this.preloader = document.createElement( 'DIV' );
    // preloader.className = 'atail-preloader';

    this.span = preloaderWrap.querySelector( 'span' );

    // let span = this.span = document.createElement( 'span' );
    // span.innerHTML = 'Loading';

    this.cloneSpan = preloader.querySelector( 'span' );

    this.cloneSpan.style.width = window.innerWidth + 'px';

    // let cloneSpan = this.cloneSpan = span.cloneNode( true );

    // preloaderWrap.appendChild( span );
    // preloader.appendChild( cloneSpan );

    // preloaderWrap.appendChild( preloader );
    // document.body.appendChild( preloaderWrap );

    let animate = () => {

      if ( preloader.classList.contains( 'atail-preloader-loaded' ) ) {
        // this.preloaderWrap.style.display = 'none';
        this.preloaderWrap.classList.add('display-none')
        return false;
      }

      if ( preloader.classList.contains( 'full-preloader' ) ) {
        if ( !GlobalVariables.windowIsLoad ) {
          setTimeout( animate, 100 );
          return false;
        }

        // GlobalVariables.atailMain.style.opacity = 1;
        GlobalVariables.atailMain.classList.add('atail-opacity-1');
        preloader.classList.add( 'atail-preloader-loaded' );
        // this.span.style.display = 'none';
        this.span.classList.add('display-none')

      }
    };

    preloader.addEventListener( transitionEvent, animate );

    setTimeout( () => {
      this.init();
    }, 0 );


  }

  init() {

    // animate dots
    let dots = this.preloaderWrap.querySelectorAll( '.atail-dot' );

    setTimeout( () => {
      dots[ 0 ].classList.add( 'start-animation' );
      dots[ 3 ].classList.add( 'start-animation' );

      setTimeout( () => {
        dots[ 1 ].classList.add( 'start-animation' );
        dots[ 4 ].classList.add( 'start-animation' );

        setTimeout( () => {
          dots[ 2 ].classList.add( 'start-animation' );
          dots[ 5 ].classList.add( 'start-animation' );
        }, 200 );

      }, 200 );

    }, 0 );

    // animate preloader
    this.preloader.classList.add( 'atail-loading' );

    let images = document.querySelectorAll( 'img' ),
      length = images.length;

    let iteration = 0;

    if ( length ) {
      let precent = 100 / length,
        n = 0;

      [].forEach.call( images, img => {
        let image = new Image();
        let src = img.src;
        image.onload = () => {

          iteration++;

          if ( iteration === length ) {
            this.preloader.classList.add( 'full-preloader' );
            this.preloader.style.width = '';

            if ( !animationSupport ) {
              this.preloader.classList.add( 'atail-preloader-loaded' );
              // GlobalVariables.atailMain.style.opacity = 1;
              GlobalVariables.atailMain.classList.add('atail-opacity-1');
            }
          } else {
            n += precent;
            this.preloader.style.width = n + precent + '%';
          }

        };
        image.onerror = () => {

          iteration++;

          if ( iteration === length ) {
            this.preloader.classList.add( 'full-preloader' );
            this.preloader.style.width = '';

            if ( !animationSupport ) {
              this.preloader.classList.add( 'atail-preloader-loaded' );
              // GlobalVariables.atailMain.style.opacity = 1;
              GlobalVariables.atailMain.classList.add('atail-opacity-1');
            }
          } else {
            n += precent;
            this.preloader.style.width = n + precent + '%';
          }

        };
        image.src = src;
      } );

      return true;

    }

    this.preloader.classList.add( 'full-preloader' );
    this.preloader.style.width = '';

    if ( !animationSupport ) {
      this.preloader.classList.add( 'atail-preloader-loaded' );
      // GlobalVariables.atailMain.style.opacity = 1;
      GlobalVariables.atailMain.classList.add('atail-opacity-1');
    }

  }

  showAtail() {

    setTimeout( () => {
      if ( !this.preloader.classList.contains( 'atail-preloader-loaded' ) ) {
        this.preloader.classList.add( 'atail-preloader-loaded' );
        // GlobalVariables.atailMain.style.opacity = 1;
        GlobalVariables.atailMain.classList.add('atail-opacity-1');
        // this.span.style.display = 'none';
        this.span.classList.add('display-none');
  
        setTimeout(() => {
          if( this.vis() ) {
            // this.preloaderWrap.style.display = 'none';
            this.preloaderWrap.classList.add('display-none');
          }
        },600);
        
      }
    }, 1800 );

  }

  resize() {
    this.cloneSpan.style.width = window.innerWidth + 'px';
  }
  
  vis() {
    var stateKey,
        eventKey,
        keys = {
          hidden: "visibilitychange",
          webkitHidden: "webkitvisibilitychange",
          mozHidden: "mozvisibilitychange",
          msHidden: "msvisibilitychange"
        };
    for (stateKey in keys) {
      if (stateKey in document) {
        eventKey = keys[stateKey];
        break;
      }
    }
    return function(c) {
      if (c) document.addEventListener(eventKey, c);
      return !document[stateKey];
    }
  }

}

export default Preloader;
