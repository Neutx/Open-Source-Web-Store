import GlobalVariables from '../global';

import {
  transitionEvent
} from '../functions/transitionEvent';

import AtailScroll from '../scroll/scroll';

import {
  animationSupport
} from '../functions/animationSupport';

import {
    httpGet
} from '../functions/promise-ajax';

import throttle from 'lodash.throttle';

class AllProjects {

  constructor() {

    this.isInit = false;
    this.timeOver = null;

  }

  init() {

    let allProjects = this.allProjects = document.querySelector( '.all-atail-projects' );

    if ( !allProjects ) {
      return false;
    }

    this.atailProjectsParent = document.querySelector( '.all-atail-projects-wrapper' );

    let allProjectsArray = this.allProjectsArray = allProjects.querySelectorAll( '.all-atail-projects-single' );

    if ( !allProjectsArray ) {
      return false;
    }

    this.allProjectsArrayIE = [];

    [].forEach.call( allProjectsArray, item => {
      let clone = item.cloneNode( true );
      this.allProjectsArrayIE.push( clone );
    } );

    this.currentCategoryArray = [].slice.call( this.allProjectsArray, 0 );
    this.projectsCategoryWrapper = this.currentCategoryArray[ 0 ].parentNode;

    let allProjectsLength = this.allProjectsLength = allProjectsArray.length;

    this.projectCategory = document.querySelector( '.all-atail-projects-category' );

    // set project category width and positions
    let sideWidth = 0;
    let precent = 0.3333333;
    if ( GlobalVariables.ww > 991 ) {
      precent = 0.1666667;
      if ( GlobalVariables.ww > 1400 ) {
        sideWidth = 100;
      } else {
        sideWidth = 70;
      }
    }

    // this.projectCategory.style.width = GlobalVariables.main.clientWidth * precent + 'px';
    // this.projectCategory.style.right = ( GlobalVariables.ww - GlobalVariables.atailMain.clientWidth ) / 2 +
    //   sideWidth +
    //   'px';

    this.projectCategory.style.cssText = `width: ${GlobalVariables.mainClientWidth * precent}px; right: ${( GlobalVariables.ww - GlobalVariables.atailMainClientWidth ) / 2 +
    sideWidth}px`;

    this.categoryWrapper = this.projectCategory.querySelector( '.all-atail-projects-category-wrapper' );
    this.projectsCategoryWrapperScroll = new AtailScroll( this.categoryWrapper );

    this.projectsCategoryWrapperScroll.init();

    //****************************************************************

    let projectInfo = this.projectInfo = [];
    projectInfo.top = [];
    projectInfo.bot = [];
    projectInfo.height = [];

    [].forEach.call( allProjectsArray, item => {
      projectInfo.top.push( item.offsetTop );
      projectInfo.bot.push( item.offsetTop + item.clientHeight );
      projectInfo.height.push( item.clientHeight );
    } );

    this.scrollHeight = this.allProjects.scrollHeight;

    let style = this.style = document.createElement( 'STYLE' );
    document.body.appendChild( style );

    let animateBox = this.animateBox = document.createElement( 'DIV' );
    animateBox.className = 'all-projects-animate-box';
    animateBox.innerHTML = '<div></div><div></div><div></div><div></div><div></div>';

    GlobalVariables.sides.querySelector( 'div' ).appendChild( animateBox );
    animateBox.addEventListener( transitionEvent, this.categoryAnimating.bind( this ) );

    this.isInit = true;

    this.currentTarget = this.projectCategory.querySelector( '.active[data-action="show-category"]' );

    let scrollTop = this.allProjects.scrollTop;

    this.onScroll( scrollTop );

    // init Sldier
    this.scroll = new AtailScroll( allProjects );
    this.scroll.init();

    let scroll = throttle( event => {

      event.stopPropagation();

      let scrollTop = allProjects.scrollTop;

      this.onScroll( scrollTop );

    }, 150 );

    // event scroll
    allProjects.addEventListener( 'scroll', scroll );

  }

  load() {
    if ( this.isInit ) {
      this.scroll.resize();
    }
  }

  onScroll( scrollTop ) {

    if ( !this.isInit ) {
      return false;
    }

    let height = scrollTop + GlobalVariables.wh * .85,
      length = this.currentCategoryArray.length,
      info = this.projectInfo,
      projects = this.currentCategoryArray;

    for ( let i = 0; i < length; i++ ) {

      if ( !animationSupport ) {
        projects[ i ].classList.add( 'is-visible' );
      } else if ( info.top[ i ] < height ) {
        if ( info.bot[ i ] < scrollTop ) {
          projects[ i ].classList.add( 'is-visible-bot' );
          projects[ i ].classList.add( 'is-visible' );
        } else {
          projects[ i ].classList.remove( 'is-visible-bot' );
          projects[ i ].classList.add( 'is-visible' );
        }
      } else {
        projects[ i ].classList.remove( 'is-visible' );
      }

    }
  }

  showCategory( target ) {

    if ( target.classList.contains( 'active' ) ) {
      return false;
    }

    if ( !this.currentTarget ) {
      this.currentTarget = target;
    }

    this.currentTarget.classList.remove( 'active' );
    this.currentTarget = target;
    target.classList.add( 'active' );

    this.categoryId = target.getAttribute( 'data-category' );

    if ( animationSupport ) {
      GlobalVariables.sides.classList.add( 'all-projects-box-animating' );
    } else {
      GlobalVariables.sides.classList.add( 'all-projects-box-animating' );
      this.categoryAnimating();
    }

  }

  categoryAnimating() {

    let sides = GlobalVariables.sides,
      categoryId = this.categoryId;

    if ( sides.classList.contains( 'all-projects-box-animating' ) ) {

      if ( sides.classList.contains( 'box-animating' ) ) {
        sides.classList.remove( 'all-projects-box-animating' );
        sides.classList.remove( 'box-animating' );
        this.categoryId = null;
      } else {

        this.currentCategoryArray = [];

        this.fragment = document.createDocumentFragment();

        this.allProjectsArray = [];

        [].forEach.call( this.allProjectsArrayIE, item => {
          let clone = item.cloneNode( true );
          this.allProjectsArray.push( clone );
        } );

        [].forEach.call( this.allProjectsArray, itemP => {

          let item = itemP.cloneNode( true );

          item.classList.remove( 'is-visible' );
          item.classList.remove( 'is-visible-bot' );

          let category = item.getAttribute( 'data-categories' );

          if ( categoryId.indexOf( 'cat-all' ) !== -1 ) {

            this.currentCategoryArray.push( item );
            this.fragment.appendChild( item );

          } else if ( category.indexOf( categoryId ) !== -1 ) {

            this.currentCategoryArray.push( item );
            this.fragment.appendChild( item );

          }

        } );

        this.projectsCategoryWrapper.innerHTML = '';
        this.projectsCategoryWrapper.appendChild( this.fragment );

        let projectInfo = this.projectInfo = [];
        projectInfo.top = [];
        projectInfo.bot = [];
        projectInfo.height = [];

        [].forEach.call( this.currentCategoryArray, item => {
        	let offsetTop = item.offsetTop,
		        clientHeight = item.clientHeight;
          projectInfo.top.push( offsetTop );
          projectInfo.bot.push( offsetTop + clientHeight );
          projectInfo.height.push( clientHeight );
        } );

        setTimeout( () => {
          this.scrollHeight = this.allProjects.scrollHeight;
          this.allProjects.scrollTop = 0;
          document.body.scrollTop = 0;
          this.onScroll( 0 );

          this.scroll.resize();

          if ( animationSupport ) {
            sides.classList.add( 'box-animating' );
          } else {
            sides.classList.remove( 'all-projects-box-animating' );
            sides.classList.remove( 'box-animating' );
            this.categoryId = null;
          }

        }, 100 );
      }

    }

  }

  showProjects( target ) {

    if ( this.isOpened ) {
      return false;
    }

    this.isOpened = true;

    httpGet( 'jsons/atail_get_all_projects/all_projects.html', target ).then( data => {

      GlobalVariables.main.classList.add( 'all-projects-loading' );

      // for ajax
      let closeProjectsBtn = this.closeProjectsBtn = document.createElement( 'DIV' );
      closeProjectsBtn.className = 'close-projects-btn';
      closeProjectsBtn.setAttribute( 'data-action', 'all-projects-close' );
      closeProjectsBtn.innerHTML = '<span></span><span></span>';

      GlobalVariables.header.appendChild( this.closeProjectsBtn );
      // this.closeProjectsBtn

      if ( GlobalVariables.lang ) {
        GlobalVariables.lang.classList.add( 'hide-lang' );
      }

      setTimeout( () => {

        GlobalVariables.main.classList.add( 'all-projects-loaded' );

        document.body.classList.remove( 'window-height' );

        GlobalVariables.main.insertAdjacentHTML( 'beforeend', data );

        this.closeProjectsBtn.classList.add( 'close-projects-btn-loaded' );

        let allProjects = GlobalVariables.main.querySelector( '.all-atail-projects-wrapper' );

        if ( !allProjects ) {
          return false;
        }

        allProjects.style.opacity = 0;

        let images = allProjects.querySelectorAll( 'img' );

        if ( images.length <= 0 ) {
          allProjects.style.opacity = '';
          this.init();
        } else {
          let length = images.length,
              itteration = 0;

          let initAll = () => {
            itteration++;

            if ( itteration === length ) {
              allProjects.style.opacity = '';
              this.init();
            }
          };

          [].forEach.call( images, img => {

            let image = new Image();
            image.onload = () => {
              initAll();
            };
            image.onerror = () => {
              initAll();
            };
            image.src = img.src;

          } );
        }

          setTimeout( () => {
              // set project category width and positions
              let sideWidth = 0;
              let precent = 0.3333333;
              if ( GlobalVariables.ww > 991 ) {
                  precent = 0.1666667;
                  if ( GlobalVariables.ww > 1400 ) {
                      sideWidth = 100;
                  } else {
                      sideWidth = 70;
                  }
              }
              this.projectCategory.style.width = GlobalVariables.main.clientWidth * precent + 'px';
              this.projectCategory.style.right = ( GlobalVariables.ww - GlobalVariables.atailMain.clientWidth ) / 2 +
                  sideWidth +
                  'px';
          }, 100 );


      }, 100 );
    } )
    .catch( () => {
      this.isAnimating = false;
    } );

    // wp.ajax.send( 'atail_get_all_projects', {
    //   data: {
    //     token: getCookie( 'atail_xslt' ),
    //     count: target.getAttribute( 'data-count' )
    //   },
    //   success: data => {
    //     setCookie( 'atail_xslt', data.token );
    //
    //     GlobalVariables.main.classList.add( 'all-projects-loading' );
    //
    //     if ( data.disable_lines ) {
    //       GlobalVariables.main.classList.add( 'atail-disable-decoration' );
    //     }
    //
    //     // for ajax
    //     let closeProjectsBtn = this.closeProjectsBtn = document.createElement( 'DIV' );
    //     closeProjectsBtn.className = 'close-projects-btn';
    //     closeProjectsBtn.setAttribute( 'data-action', 'all-projects-close' );
    //     closeProjectsBtn.innerHTML = '<span></span><span></span>';
    //
    //     GlobalVariables.header.appendChild( this.closeProjectsBtn );
    //     // this.closeProjectsBtn
    //
    //     if ( GlobalVariables.lang ) {
    //       GlobalVariables.lang.classList.add( 'hide-lang' );
    //     }
    //
    //     setTimeout( () => {
    //
    //       GlobalVariables.main.classList.add( 'all-projects-loaded' );
    //
    //       document.body.classList.remove( 'window-height' );
    //
    //       GlobalVariables.main.insertAdjacentHTML( 'beforeend', data.content );
    //
    //       this.closeProjectsBtn.classList.add( 'close-projects-btn-loaded' );
    //
    //       let allProjects = GlobalVariables.main.querySelector( '.all-atail-projects-wrapper' );
    //
    //       if ( !allProjects ) {
    //         return false;
    //       }
    //
    //       allProjects.style.opacity = 0;
    //
    //       let images = allProjects.querySelectorAll( 'img' );
    //
    //       if ( images.length <= 0 ) {
    //         allProjects.style.opacity = '';
    //         this.init();
    //       } else {
    //         let length = images.length,
    //           itteration = 0;
    //
    //         let initAll = () => {
    //           itteration++;
    //
    //           if ( itteration === length ) {
    //             allProjects.style.opacity = '';
    //             this.init();
    //           }
    //         };
    //
    //         [].forEach.call( images, img => {
    //
    //           let image = new Image();
    //           image.onload = () => {
    //             initAll();
    //           };
    //           image.onerror = () => {
    //             initAll();
    //           };
    //           image.src = img.src;
    //
    //         } );
    //       }
    //
    //
    //     }, 100 );
    //
    //   },
    //   error: data => {
    //     console.error( data );
    //   }
    // } );
  }

  closeProjects() {

    this.closeProjectsBtn.classList.remove( 'close-projects-btn-loaded' );

    GlobalVariables.main.classList.add( 'all-projects-closing' );


    setTimeout( () => {
      document.body.classList.add( 'window-height' );

      GlobalVariables.main.removeChild( this.atailProjectsParent );

      GlobalVariables.header.removeChild( this.closeProjectsBtn );

      GlobalVariables.main.classList.remove( 'all-projects-loaded' );
      setTimeout( () => {
        GlobalVariables.main.classList.remove( 'all-projects-loading' );
      }, 0 );

      GlobalVariables.main.classList.remove( 'all-projects-closing' );
      GlobalVariables.main.classList.remove( 'atail-disable-decoration' );

      if ( GlobalVariables.lang ) {
        GlobalVariables.lang.classList.remove( 'hide-lang' );
      }

      this.scroll.remove();

      this.isOpened = false;
    }, 600 );

  }

  resize() {

    clearTimeout(this.timeOver);

    this.timeOver = setTimeout( () => {

      if ( !this.isInit ) {
        return false;
      }

      let projectInfo = this.projectInfo = [];
      projectInfo.top = [];
      projectInfo.bot = [];
      projectInfo.height = [];

      [].forEach.call( this.currentCategoryArray, item => {
        projectInfo.top.push( item.offsetTop );
        projectInfo.bot.push( item.offsetTop + item.clientHeight );
        projectInfo.height.push( item.clientHeight );
      } );

      setTimeout( () => {

        if ( GlobalVariables.ww >= 992 ) {
          this.scrollHeight = this.allProjects.scrollHeight;
          this.onScroll( this.allProjects.scrollTop );
        } else {
          this.scrollHeight = document.body.scrollHeight;
          this.onScroll( document.body.scrollTop );
        }

        this.scroll.resize();

        // set project category width and positions
        let sideWidth = 0;
        let precent = 0.3333333;
        if ( GlobalVariables.ww > 991 ) {
          precent = 0.1666667;
          if ( GlobalVariables.ww > 1400 ) {
            sideWidth = 100;
          } else {
            sideWidth = 70;
          }
        }
        this.projectCategory.style.width = GlobalVariables.main.clientWidth * precent + 'px';
        this.projectCategory.style.right = ( GlobalVariables.ww - GlobalVariables.atailMain.clientWidth ) / 2 +
            sideWidth +
            'px';

        this.projectsCategoryWrapperScroll.resize();

      }, 0 );

    },200);

  }

}

export default AllProjects;
