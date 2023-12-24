// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent() {
  var t,
      el = document.createElement('fakeelement');

  var transitions = {
    'transition'      : 'transitionend',
    'OTransition'     : 'oTransitionEnd',
    'MozTransition'   : 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

export var transitionEvent = whichTransitionEvent();
