import './lib/selectFx';
import 'classlist-polyfill';

document.addEventListener( 'DOMContentLoaded', () => {
  ( function () {
    [].slice.call( document.querySelectorAll( 'select' ) ).forEach( function ( el ) {
      el.classList.add( 'cs-select' );
      new SelectFx( el );
    } );
  } )();

  let shareArray = JSON.parse( document.body.getAttribute( 'data-share' ) );

  let shares = jQuery( '.atail-sharing' );

  jQuery( shares ).jsSocials( {
    url: shares.attr( 'data-url' ),
    text: shares.attr( 'data-text' ),
    showLabel: false,
    showCount: true,
    shares: shareArray
  } );

} );

// Run Atali js
import Atail from './atail/atail';
const atail = new Atail();
