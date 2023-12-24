class Lang {
  constructor() {

    let lang = this.lang = document.querySelector('.widget-lang');

    if( ! lang ) {
      return false;
    }

    let langBtn = this.langBtn = lang.querySelector('.no-button');
  }

  show() {
    if( this.lang.classList.contains('opened') ) {
      this.lang.classList.remove('opened');
    } else {
      this.lang.classList.add('opened');
    }
  }
}

export default Lang;
