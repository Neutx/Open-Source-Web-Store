$(document).ready(function(){
  'use strict';

  //===== Dropdown Anmiation =====// 
  var drop = $('.hdr6-mnu > ul > li');
  $('.hdr6-mnu > ul').each(function(){
    var delay = 0;
    $(this).find(drop).each(function(){
      $(this).css({transitionDelay: delay+'ms'});
      delay += 100;
    });
  });  
  var drop2 = $('.hdr6-mnu ul ul > li')
  $('.hdr6-mnu ul ul').each(function(){
    var delay2 = 0;
    $(this).find(drop2).each(function(){
      $(this).css({transitionDelay: delay2+'ms'});
      delay2 += 100;
    });
  }); 

  //===== Wow Animation Setting =====//
  var wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
  }); 

  wow.init();

  //===== Header Search Script =====//
  $('.hdr-srch1 > a').on('click',function(){
    $('body').addClass('srch-actv');
    return false;
  });

  $('.hdr-srch-cls').on('click',function(){
    $('body').removeClass('srch-actv');
    return false;
  });


  $('.mnu-btn > a').on('click',function(){
    $('body').addClass('mnu-opn');
    return false;
  });

  $('.mnu-cls-btn').on('click',function(){
    $('body').removeClass('mnu-opn');
    return false;
  });

  //===== Responsive Header =====//
  $('.rspn-mnu-btn').on('click', function () {
    $('.rsnp-mnu').addClass('active');
    return false;
  });
  $('.rspn-mnu-cls').on('click', function () {
    $('.rsnp-mnu').removeClass('active');
    return false;
  });
  $('.rsnp-mnu li.menu-item-has-children > a').on('click', function () {
    $(this).parent().siblings().children('ul').slideUp();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().children('ul').slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });

  //===== Responsive Contact =====//
  $('.rspn-cnt li').each(function () {
    $('.rspn-cnt li').on('click', function () {
      $('.rspn-cnt li').removeClass('active');
      $(this).addClass('active');
    });
  });   

  //===== Counter Up =====//
  if ($.isFunction($.fn.counterUp)) {
    $('.cntr').counterUp({
      delay: 10,
      time: 2000
    });
  }

  //===== Accordion =====//
  $('#tgl1 .tgl-cnt').hide();
  $('#tgl1 h4:first').addClass('actv').next().slideDown(500).parent().addClass('actvt');
  $('#tgl1 h4').on('click', function() {
    if ($(this).next().is(':hidden')) {
      $('#tgl1 h4').removeClass('actv').next().slideUp(500).parent().removeClass('actvt');
      $(this).toggleClass('actv').next().slideDown(500).parent().toggleClass('actvt');
    }
  });

  //===== Accordion =====//
  $('#tgl2 .tgl-cnt').hide();
  $('#tgl2 h4:first').addClass('actv').next().slideDown(500).parent().addClass('actvt');
  $('#tgl2 h4').on('click', function() {
    if ($(this).next().is(':hidden')) {
      $('#tgl2 h4').removeClass('actv').next().slideUp(500).parent().removeClass('actvt');
      $(this).toggleClass('actv').next().slideDown(500).parent().toggleClass('actvt');
    }
  });

  //===== Accordion =====//
  $('#tgl3 .tgl-cnt').hide();
  $('#tgl3 h4:first').addClass('actv').next().slideDown(500).parent().addClass('actvt');
  $('#tgl3 h4').on('click', function() {
    if ($(this).next().is(':hidden')) {
      $('#tgl3 h4').removeClass('actv').next().slideUp(500).parent().removeClass('actvt');
      $(this).toggleClass('actv').next().slideDown(500).parent().toggleClass('actvt');
    }
  });

  //===== Accordion =====//
  $('#tgl4 .tgl-cnt').hide();
  $('#tgl4 h4:first').addClass('actv').next().slideDown(500).parent().addClass('actvt');
  $('#tgl4 h4').on('click', function() {
    if ($(this).next().is(':hidden')) {
      $('#tgl4 h4').removeClass('actv').next().slideUp(500).parent().removeClass('actvt');
      $(this).toggleClass('actv').next().slideDown(500).parent().toggleClass('actvt');
    }
  });

  $('.ply-btn').on('click',function(){
    $('.vdo-wrp').addClass('active');
    return false;
  });

  $('.vdo-wrp > a').on('click',function(){
    $('.vdo-wrp').removeClass('active');
    return false;
  });

  //===== Sticky Header =====//
  var menu_height = $('header').innerHeight();
  // var menu_height2 = $('header.styl5').innerHeight();
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 102) {
      $('header.styl2.stck').addClass('stcky');
    } else {
      $('.stck').removeClass('stcky');
    }
  });

  var after_sec_headers_height2 = $('header.styl4').innerHeight();
  $(window).scroll(function () {
    var scroll3 = $(window).scrollTop();
    if (scroll3 >= 801) {
      $('header.styl4.stck').addClass('stcky');
    } else {
      $('header.styl4').removeClass('stcky');
    }
  });
  if ($('header.styl4').hasClass('stck')) {
    $('.hdr-hgt').css({'height': after_sec_headers_height2});
  }

  $(window).scroll(function () {
    var scroll4 = $(window).scrollTop();
    if (scroll4 >= menu_height) {
      $('header.styl5.stck').addClass('stcky');
    } else {
      $('.stck').removeClass('stcky');
    }
  });

  $(window).scroll(function () {
    var scroll5 = $(window).scrollTop();
    if (scroll5 >= menu_height) {
      $('header.styl6.stck').addClass('stcky');
    } else {
      $('.stck').removeClass('stcky');
    }
  });

  $(window).scroll(function () {
    var scroll6 = $(window).scrollTop();
    if (scroll6 >= 85) {
      $('header.styl8.stck').addClass('stcky');
    } else {
      $('.stck').removeClass('stcky');
    }
  });
  if ($('header.styl8').hasClass('stck')) {
    $('main').css({'padding-top': menu_height});
  }

  //===== Scroll Function =====//
  $(function() {
    $('nav.fxd-mnu > ul > li a').on('click',function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
      return false;
    });
  });

  $('nav.fxd-mnu > ul > li').each(function () {
    $('nav.fxd-mnu > ul > li > a').on('click', function () {
      $('nav.fxd-mnu > ul > li > a').removeClass('active');
      $(this).addClass('active');
      return false;
    });
  });
  // $('nav.fxd-mnu > ul > li > a').on('click',function(){
  //   $(this).addClass('active');
  //   $('nav.fxd-mnu > ul > li a').removeClass('active');
  //   return false;
  // });

  //===== Water Ripple Effect =====//
  if ($.isFunction($.fn.ripples)) {
    $('.wtr-rpl').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
    });
  }

  //===== LightBox =====//
  if ($.isFunction($.fn.fancybox)) {
    $('[data-fancybox],[data-fancybox="gallery"],[data-fancybox="gallery2"]').fancybox({});
  }

  //===== Select 2 =====//
  if ($.isFunction($.fn.chosen)) {
    $('select').chosen({});
  }

  //===== Custom Scrollbar =====//
  if ($.isFunction($.fn.enscroll)) {
    $('.expr-scrlbr,.rsnp-mnu > ul').enscroll({});
  }

  //===== Tooltip =====//
  if($.isFunction($.fn.tooltip)) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //===== Owl Carousel =====//
  if ($.isFunction($.fn.owlCarousel)) {
    //=== Testimonials Carousel ===//
    $('.testi-caro-wrp').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>"
      ]
    });

    //=== Featured Carousel ===//
    $('.fea-car1').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: false,
      slideSpeed: 2000,
      nav: false,
      margin: 0,
      autoHeight: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
    });

    //=== Testimonials 2 Carousel ===//
    $('.testi-car').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: false,
      margin: 0,
      autoHeight: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
    });

    //=== Team Carousel ===//
    $('.tm-car').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 4,
      dots: false,
      slideSpeed: 2000,
      nav: true,
      margin: 30,
      autoHeight: true,
      navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
      ],
      responsive: {
        0: {items: 1,nav: false},
        480: {items: 2,nav: false},
        768: {items: 3},
        1200: {items: 4}
      }
    });

    //=== Sponser 1 Carousel ===//
    $('.spncr-car').owlCarousel({
      autoplay: true,
      smartSpeed: 400,
      loop: true,
      items: 6,
      dots: false,
      slideSpeed: 2000,
      nav: false,
      margin: 50,
      responsive: {
        0: {items: 2},
        480: {items: 3},
        768: {items: 4},
        1200: {items: 6}
      }
    });

    //=== Partners Carousel ===//
    $('.prtnrs-car').owlCarousel({
      autoplay: true,
      smartSpeed: 400,
      loop: true,
      items: 6,
      dots: false,
      slideSpeed: 2000,
      nav: false,
      margin: 50,
      responsive: {
        0: {items: 2},
        480: {items: 3},
        768: {items: 4},
        1200: {items: 6}
      }
    });

    //=== Welcome Service Carousel ===//
    $('.wlcm-car').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: [
      "<i class='fa fa-caret-left'></i>",
      "<i class='fa fa-caret-right'></i>"
      ]
    });

    //=== Partners 2 Carousel ===//
    $('.prtnrs-car2').owlCarousel({
      autoplay: true,
      smartSpeed: 400,
      loop: true,
      items: 5,
      dots: false,
      slideSpeed: 2000,
      nav: true,
      margin: 30,
      responsive: {
        0: {items: 2},
        480: {items: 2},
        768: {items: 3,margin: 20},
        1200: {items: 5}
      },
      navText: [
      "<i class='fa fa-arrow-circle-o-left'></i>",
      "<i class='fa fa-arrow-circle-o-right'></i>"
      ]
    });

    //=== Handle Sec Carousel ===//
    $('.hndl-car').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>"
      ]
    });

    //=== History Carousel ===//
    $('.hstry-feat').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>"
      ]
    });

    //=== Blog List Image Carousel ===//
    $('.blg-lst-img-car').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>"
      ]
    });

    //=== Portfolio Image Carousel ===//
    $('.prtflo-img-car').owlCarousel({
      autoplay: true,
      smartSpeed: 600,
      loop: true,
      items: 1,
      dots: true,
      slideSpeed: 2000,
      nav: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>"
      ]
    });
  }

  //===== Slick Carousel =====//
  if ($.isFunction($.fn.slick)) {
    //=== Video Post Carousel ===//
    $('.vdo-car-big').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      slide: 'li',
      fade: false,
      asNavFor: '.vdo-car-sml'
    });        

    $('.vdo-car-sml').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.vdo-car-big',
      dots: false,
      arrows: false,
      slide: 'li',
      centerPadding: '0',
      focusOnSelect: true,
      centerMode: true,
      vertical: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 485,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          vertical: false
        }
      }
      ]
    });

    //=== Video Post Carousel ===//
    $('.prtf2-big-car').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      slide: 'div',
      fade: true,
      asNavFor: '.prtf2-nav-car'
    });        

    $('.prtf2-nav-car').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.prtf2-big-car',
      dots: false,
      arrows: false,
      slide: 'li',
      centerPadding: '0',
      focusOnSelect: true,
      centerMode: false,
      vertical: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          vertical: true
        }
      }
      ]
    });

    //=== Portfolio Carousel ===//
    $('.prtflo-car-bg').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      slide: 'li',
      fade: true,
      asNavFor: '.prtflo-img-nv'
    });        

    $('.prtflo-img-nv').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.prtflo-car-bg',
      dots: false,
      arrows: false,
      slide: 'li',
      centerPadding: '0',
      focusOnSelect: true,
      centerMode: false,
      vertical: false,
      responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          vertical: false
        }
      }
      ]
    });
  }

});//===== Document Ready Ends =====//

$(window).on('load',function() {
  'use strict';

  //===== Section Header =====//
  var sec1_height = $('.gt-ht').innerHeight();
  if ($('header.styl1').hasClass('stck')) {
    $('header.styl1').css({'top': sec1_height});
  }

  var after_sec_headers_height = $('header.styl1').innerHeight();
  $(window).scroll(function () {
    var scroll2 = $(window).scrollTop();
    if (scroll2 >= sec1_height) {
      $('header.styl1.stck').addClass('stcky');
    } else {
      $('header').removeClass('stcky');
    }
  });
  if ($('header.styl1').hasClass('stck')) {
    $('.hdr-hgt').css({'height': after_sec_headers_height});
  }

  var prtf_img = $('.prtflo-thmb6 img').height();
  $('.prtflo-inf6').css({'height': prtf_img});

  $('.prtflo-bx6:nth-child(2) .prtflo-inf6').css({'height': prtf_img + 40});

  //===== Page Loader =====//
  $('.preloader').fadeOut('slow');

  //===== Isotope =====//
  if ($('.fltr-itm').length > 0) {
    if ($().isotope) {
      var jQuerycontainer = jQuery('.msnry'); // cache container
      jQuerycontainer.isotope({
        itemSelector: '.fltr-itm',
        columnWidth:.5,
      });
      $('.fltr-btns a').on('click',function () {
        var selector = $(this).attr('data-filter');
        $('.fltr-btns li').removeClass('active');
        $(this).parent().addClass('active');
        jQuerycontainer.isotope({filter: selector});
        return false;
      });
      jQuerycontainer.isotope('layout'); // layout/layout
    }

    $(window).resize(function () {
      if ($().isotope) {
        $('.msnry').isotope('layout'); // layout/relayout on window resize
      }
    });
  }

});

$(window).resize(function () {
  var prtf_img = $('.prtflo-thmb6 img').height();
  $('.prtflo-inf6').css({'height': prtf_img});

  $('.prtflo-bx6:nth-child(2) .prtflo-inf6').css({'height': prtf_img + 40});
});
