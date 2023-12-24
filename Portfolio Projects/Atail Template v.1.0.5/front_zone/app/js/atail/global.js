/**
 * Atail global variables
 * ww - window.innerWidth
 * wh - window.innerHeight
 */
// export let ww = window.innerWidth,
//     wh = window.innerHeight;

class GlobalVariables {
  constructor() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;

    this.atailMain = document.querySelector( '.atail' );
    this.atailMainClientWidth = this.atailMain.clientWidth;

    this.main = document.querySelector( '.main-scroll' );
    this.mainClientWidth = this.main.clientWidth;

    this.sides = document.querySelector( '.sides' );
    this.header = document.querySelector( '.atail-header' );

    this.lang = document.querySelector( '.widget-lang' );

    this.windowIsLoad = false;

    this.setScrollWidth();

    this.main.ontouchstart = event => {
      event.stopPropagation();
    };
  }

  setScrollWidth() {
    var outer = document.createElement( 'div' );
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild( outer );

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement( 'div' );
    inner.style.width = '100%';
    outer.appendChild( inner );

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild( outer );

    this.scrollWidth = widthNoScroll - widthWithScroll;
  }

  resize() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.mainClientWidth = this.main.clientWidth;
    this.setScrollWidth();
  }
}

export default ( new GlobalVariables );
