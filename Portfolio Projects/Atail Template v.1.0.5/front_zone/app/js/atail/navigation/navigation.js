import GlobalVariables from '../global';

class Navigation {
  constructor() {

    let self = this;

    self.maxLinksCount = 5;
    self.excessives = false;

    /**
     * Variables
     * this.maxLinksCount
     * this.excessives - true - якщо забагато лішок і вони поміщені в MORE
     *
     * this.atailHeader - .atail-header
     *
     * this.navList - .nav-list
     * this.navListli - list of li
     * this.navListLiLength - count of li
     *
     * this.remnant - лішки які не влазять на десктопах
     */

    this.isInit = false;

    self.init();

  }

  /**
   * [init navigation]
   * @return {[boolean]}
   */
  init() {

    let self = this;

    let navList = self.navList = document.querySelector( '.nav-list' );
    if ( !navList ) {
      return false;
    }

    this.atailHeader = document.querySelector( '.atail' );
    if ( !this.atailHeader ) {
      console.error( 'Dont find node with class ".atail"' );
      return false;
    }

    this.showNavBtn = document.querySelector( '[data-action="show-nav"]' );

    let navListLi = self.navListli = navList.children;
    if ( !navListLi ) {
      return false;
    }

    [].forEach.call( navListLi, ( li, index ) => {
      let counter = document.createElement( 'span' );
      counter.className = 'nav-list-counter';
      let a = li.children[ 0 ];
      // let span = a.children[0];
      counter.innerHTML = '0' + ( index + 1 );
      a.insertBefore( counter, a.firstChild );
    } );

    let navListLiLength = self.navListLiLength = navListLi.length;
    if ( navListLiLength <= self.maxLinksCount ) {
      return false;
    }

    // створити темплейт лінка
    self._createLink();
    // сховати лінки які не влазять
    self._hideExcessives();

    this.isInit = true;
    return true;
  }

  showNav() {
    this.atailHeader.classList.add( 'atail-header-opened' );
    this.showNavBtn.setAttribute( 'data-action', 'close-nav' );

    document.body.style.overflow = 'hidden';
  }
  closeNav() {
    this.atailHeader.classList.remove( 'atail-header-opened' );
    this.showNavBtn.setAttribute( 'data-action', 'show-nav' );

    document.body.style.overflow = '';
  }

  _hideExcessives() {

    if ( GlobalVariables.ww < 992 ) {
      return false;
    }

    let self = this;

    if ( self.excessives ) {
      return false;
    }
    self.excessives = true;

    let maxLength = self.maxLinksCount,
      length = self.navListLiLength;

    if ( length < self.maxLinksCount ) {
      return false;
    }

    let remnant = self.remnant = [].slice.call( self.navListli, maxLength - 1 );

    remnant.forEach( li => {
      self.moreUl.appendChild( li );
    } );

    self.navList.appendChild( this.more );

    this.closeNav();

    return true;
  }

  _showExcessives() {

    let self = this;

    if ( !self.excessives ) {
      return false;
    }
    self.excessives = false;

    if ( self.navListLiLength < self.maxLinksCount ) {
      return false;
    }

    this.navList.removeChild( self.more );

    let remnant = self.remnant;

    remnant.forEach( li => {
      this.navList.appendChild( li );
    } );

    return true;
  }

  _createLink() {
    let more = this.more = document.createElement( 'li' );
    more.className = 'col-xs-2 more-links menu-item-has-children';
    more.innerHTML = '<a href="#"><span>More</span></a><ul></ul>';
    this.moreUl = more.querySelector( 'ul' );
  }

  resize() {

    if ( !this.isInit ) {
      return false;
    }

    if ( GlobalVariables.ww >= 992 ) {
      this._hideExcessives();
    } else {
      this._showExcessives();
    }
    return true;
  }
}

export default Navigation;
