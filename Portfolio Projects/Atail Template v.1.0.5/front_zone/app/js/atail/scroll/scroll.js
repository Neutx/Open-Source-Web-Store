import GlobalVariables from '../global';

import throttle from 'lodash.throttle';

// import '../functions/optimizedScroll';

class AtailScroll {

  constructor( boxWithScroll ) {

    if ( !boxWithScroll || !boxWithScroll.nodeType ) {
      return false;
    }

    this.box = boxWithScroll;
    this.parent = boxWithScroll.parentNode;

    this.boxWithScroll = boxWithScroll;
    this.hasScroll = false;

    this.isProjectPreview = false;
    this.isAjaxProject = false;
    this.isAjaxProjectTableWrapper = false;

    // main-scroll
    this.isMainScroll = false;
    // all-atail-projects
    this.isAllProjects = false;
    if ( this.box.classList.contains( 'all-atail-projects' ) ) {
      this.isAllProjects = true;

      let scrollTmp = this.parent.querySelector( '.atail-scroll' );

      if ( scrollTmp ) {
        return false;
      }

    } else if ( this.box.classList.contains( 'main-scroll' ) ) {
      this.isMainScroll = true;

      let scrollTmp = this.parent.querySelector( '.atail-scroll' );

      if ( scrollTmp ) {
        return false;
      }

    } else if ( this.box.classList.contains( 'project-preview' ) ) {
      this.isProjectPreview = true;

      let scrollTmp = this.parent.querySelector( '.atail-scroll' );

      if ( scrollTmp ) {
        return false;
      }
    } else if ( this.box.classList.contains( 'post-slider-item-scroll' ) ) {
      this.isAjaxProject = true;

      let scrollTmp = this.parent.querySelector( '.atail-scroll' );

      if ( scrollTmp ) {
        return false;
      }
    } else if ( this.box.classList.contains( 'post-content-table-wrapper' ) ) {
      this.isAjaxProjectTableWrapper = true;

      let scrollTmp = this.parent.querySelector( '.atail-scroll' );

      if ( scrollTmp ) {
        return false;
      }
    } else {
      let scrollTmp = document.body.querySelector( '.atail-scroll' );

      if ( scrollTmp ) {
        return false;
      }
    }

    // this.isIos = false;

    // if ( ( navigator.userAgent.match( /iPhone/i ) ) || ( navigator.userAgent.match( /iPod/i ) ) ) {
    //   this.isIos = true;
    //   alert( 'wtf' );
    // }

    this.isIos = /iPad|iPhone|iPod/.test( navigator.userAgent ) && !window.MSStream;

    this.scrollIsInit = false;

  }

  init() {

    this.scrollIsInit = true;

    this.createScroll();

    this.onScroll();

  }

  createScroll() {

    if ( !this.scrollIsInit ) {
      return false;
    }

    //=================================================

    this.currentTop = 0;

    let scroll = this.scroll = document.createElement( 'DIV' );
    scroll.className = 'atail-scroll';

    let scrollLine = this.scrollLine = document.createElement( 'SPAN' );
    scrollLine.className = 'atail-scroll-line';

    scroll.appendChild( scrollLine );

    if ( this.isMainScroll || this.isAllProjects ) {
      document.body.appendChild( scroll );
    } else {
      if ( this.parent ) {
        this.parent.appendChild( scroll );
      }
    }

    var isMouseDown = false,
      startY,
      endY,
      result,
      mouseMove = false;

    let onMouseEnter = () => {
      scroll.classList.add( 'hovered' );
    };

    let onMouseDown = event => {
      isMouseDown = true;
      event.preventDefault();
      startY = event.clientY;

      this.currentScrollTop = this.box.scrollTop;

      this.scrollLine.style.transition =
        'top 0s ease, height .3s ease, border-right-width .2s ease, opacity .3s ease';
      this.scrollLine.style.WebkitTransition =
        'top 0s ease, height .3s ease, border-right-width .2s ease, opacity .3s ease';
    };

    let onMouseMove = event => {

      if ( !isMouseDown ) {
        return false;
      }

      mouseMove = true;

      endY = event.clientY;
      result = endY - startY;

      this.box.scrollTop = this.currentScrollTop + result / this.precent;

      document.addEventListener( 'mouseup', onMouseUp );

    };

    let onMouseUp = () => {
      isMouseDown = false;

      mouseMove = false;

      this.scrollLine.style.transition = '';
      this.scrollLine.style.WebkitTransition = '';

      document.removeEventListener( 'mouseup', onMouseUp );
    };

    let onScrollClick = event => {
      event.preventDefault();
      event.stopPropagation();

      if ( !mouseMove ) {
        this.box.scrollTop = event.clientY / this.precent;
        mouseMove = false;
      }
    };

    let onLineClick = event => {
      event.preventDefault();
      event.stopPropagation();

      isMouseDown = false;

      this.scrollLine.style.transition = '';
      this.scrollLine.style.WebkitTransition = '';

      document.removeEventListener( 'mouseup', onMouseUp );
    };

    let onMouseLeave = () => {
      scroll.classList.remove( 'hovered' );
    };

    scroll.addEventListener( 'mouseenter', onMouseEnter );
    scroll.addEventListener( 'mouseleave', onMouseLeave );
    scroll.addEventListener( 'click', onScrollClick );
    scrollLine.addEventListener( 'click', onLineClick );
    scrollLine.addEventListener( 'mousedown', onMouseDown );
    document.addEventListener( 'mousemove', onMouseMove );

    this.setBoxWidth();

    this.setScrollSize();

    this.animateScroll();
  }

  setBoxWidth() {}

  setScrollSize() {

    // if ( !( navigator.userAgent.match( /iPhone/i ) ) || !( navigator.userAgent.match( /iPod/i ) ) ) {
    //   return false;
    // }

    if ( this.isIos ) {
      return false;
    }

    if ( !this.scrollIsInit ) {
      return false;
    }

    let style = getComputedStyle( this.box );
    // let minTop = this.minTop = parseInt( style.paddingTop.replace( 'px', '' ), 10 ) || 0;
    let minTop = this.minTop = 0;

    let visibleHeight = this.offsetHeight = this.box.offsetHeight,
      fullHeight = this.fullHeight = this.box.scrollHeight;

    let n = 0;
    if ( !this.isProjectPreview ) {
      let windowW = document.body.offsetHeight;
      n = this.n = windowW - visibleHeight;
    }

    visibleHeight = this.offsetHeight = visibleHeight;
    fullHeight = this.fullHeight = fullHeight;

    let maxScrollHeight = this.maxScrollHeight = fullHeight - visibleHeight;

    if ( visibleHeight + 1 < fullHeight ) {
      this.hasScroll = true;
    } else {
      this.hasScroll = false;
    }

    // if( this.hasScroll && this.scrollWidth ) {
    if ( this.hasScroll ) {

      // this.scroll.style.display = '';
      this.scroll.classList.remove('display-none');

      if ( GlobalVariables.ww < 992 ) {

        this.scrollLine.style.height = 0;
        this.box.style.width = '';
        // this.box.style.paddingRight = '';

      } else {
        let height = this.box.clientHeight - minTop,
          fullheight = this.box.scrollHeight - minTop;

        this.precent = height / fullheight;

        this.lineHeight = height * this.precent + n;

        this.scrollLine.style.height = this.lineHeight + 'px';

        this.scrollLine.style.top = this.minTop + 'px';

        this.box.style.width = GlobalVariables.scrollWidth + this.parent.clientWidth + 'px';
      }

    } else {
      this.scrollLine.style.height = 0;
      this.box.style.width = '';
      // this.scroll.style.display = 'none';
      this.scroll.classList.add('display-none');
    }

  }

  animateScroll() {

    if ( GlobalVariables.ww < 992 ) {
      return false;
    }

    let top = this.box.scrollTop * this.precent + this.minTop;
	  
	  let clientHeight = this.box.clientHeight;

    if ( top < 0 ) {
      top = this.minTop;
    } else if ( top > clientHeight + this.n - this.lineHeight ) {
      top = clientHeight + this.n - this.lineHeight;
    }

    this.currentTop = top;
    this.scrollLine.style.top = top + 'px';
  }

  onScroll() {

    if ( !this.scrollIsInit ) {
      return false;
    }

    // var ticking = false;

    let scroll = throttle( event => {
      if ( this.isIos ) {
        return false;
      }

      // alert( 'work' );

      event.stopPropagation();

      let self = this;

      // if ( !ticking ) {
      // window.requestAnimationFrame( () => {
      self.animateScroll();
      // ticking = false;
      // } );
      // }

      // ticking = true;

      // this.animateScroll();
    }, 100 );

    this.box.addEventListener( 'scroll', scroll );

  }

  remove() {
    if ( this.scroll && this.scroll.parentNode ) {
      this.scroll.parentNode.removeChild( this.scroll );
    }
  }

  resize() {

    if ( !this.scrollIsInit ) {
      return false;
    }

    this.setBoxWidth();
    this.setScrollSize();
  }

}

export default AtailScroll;
