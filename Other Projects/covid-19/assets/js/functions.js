(function($){
    "use strict";
    $(document).ready(function() {
        // lightcase 
        $('a[data-rel^=lightcase]').lightcase();

        // Header Section Menu Part
        $("ul li ul").parent("li").addClass("menu-item-has-children");

        // drop down menu width overflow problem fix
        $('ul').parent().on('hover', function() {
            var menu = $(this).find("ul");
            var menupos = $(menu).offset();
            if (menupos.left + menu.width() > $(window).width()) {
                var newpos = -$(menu).width();
                menu.css({ left: newpos });
            }
        });

        // mobile menu responsive
        $(document).on('click','.header-bar',function(){
            $(".header-bar").toggleClass("close");
            $(".mobile-menu").toggleClass("open");
        });

        //mobile drodown menu display
        $('.menu-item-has-children>a').on('click', function(e){
            event.preventDefault();
        });
        $('.mobile-menu-area ul li a, .shop-menu li a').on('click', function(e) {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(1000,"swing");
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown(1000,"swing");
                element.siblings('li').children('ul').slideUp(1000,"swing");
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(1000,"swing");
            }
        });

        //menu options
        var fixed_top = $(".header-area");
        $(window).on('scroll', function(){
            if( $(this).scrollTop() > 100 ){  
                fixed_top.addClass("animated fadeInDown menu-fixed");
            }
            else{
                fixed_top.removeClass("animated fadeInDown menu-fixed");
            }
        });

        // scroll up start here
        $(function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > 300) {
                    $('.scrollToTop').css({'bottom':'2%', 'opacity':'1','transition':'all .5s ease'});
                } else {
                    $('.scrollToTop').css({'bottom':'-30%', 'opacity':'0','transition':'all .5s ease'})
                }
            });
            //Click event to scroll to top
            $('.scrollToTop').on('click', function(){
                $('html, body').animate({scrollTop : 0},500);
                return false;
            });
        });

        // sponsor slider section
        var swiper = new Swiper('.sponsor-slider', {
            slidesPerView: 6,
            spaceBetween: 10,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 2,
                },
                420: {
                    slidesPerView: 1,
                },
            },
            loop: true,
        });
        
        // post-thumb-slider section
        var swiper = new Swiper('.post-thumb-slider', {
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.post-thumb-slider-next',
                prevEl: '.post-thumb-slider-prev',
            },
            loop: true,
        });
        
        // countdown or date & time
        $('#countdown').countdown({
            date: '10/22/2020 17:00:00',
            offset: +2,
            day: 'Day',
            days: 'Days'
        });


        // accordion start here
        $('.accordion-item .active').slideDown();
        $('.accordion-list').on('click', function (e){
            if($(this).next('.accordion-answer').css('display') != 'block'){
                $('.accordion-item .active').slideUp(500).removeClass('active');
                $('.accordion-list').removeClass('in');
                $(this).next('.accordion-answer').addClass('active').slideDown(500);
                $(this).addClass('in');
            }else{
                $('.accordion-item .active').slideUp(500).removeClass('active');
                $(this).removeClass('in');
            }
        });
        
        // counterup js start here
        $('.count-number, .count-people, .cv-count, .bfr-total').each(function () {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('Counter', 0).animate({
               Counter: $(this).text()
            }, {
               duration: 5000,
               step: function (func) {
                  $(this).text(parseFloat(func).toFixed(size));
               }
            });
        });


        // shop cart + - start here
        var CartPlusMinus = $('.cart-plus-minus');
        CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
        CartPlusMinus.append('<div class="inc qtybutton">+</div>');
        $(".qtybutton").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            if ($button.text() === "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find("input").val(newVal);
        });

        // product view mode change js
        $(function() {
            $('.product-view-mode').on('click', 'a', function (e) {
                e.preventDefault();
                var shopProductWrap = $('.shop-product-wrap');
                var viewMode = $(this).data('target');
                $('.product-view-mode a').removeClass('active');
                $(this).addClass('active');
                shopProductWrap.removeClass('grid list').addClass(viewMode);
            });
        });
        

        // model option start here
        $(function() {
            $('.view-modal').on('click', function () {
                $('.modal').addClass('show');
            });
            $('.close').on('click', function () {
                $('.modal').removeClass('show');
            });
        });

        $(function() {
            var galleryThumbs = new Swiper('.pro-single-thumbs', {
                spaceBetween: 10,
                slidesPerView: 3,
                loop: true,
                freeMode: true,
                loopedSlides: 5,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                navigation: {
                nextEl: '.pro-single-next',
                prevEl: '.pro-single-prev',
                },
            });
            var galleryTop = new Swiper('.pro-single-top', {
                spaceBetween: 10,
                loop:true,
                loopedSlides: 5,
                thumbs: {
                    swiper: galleryThumbs,
                },
            });
        });
        
        //Review Tabs
        $('ul.review-nav').on('click', 'li', function (e) {
            e.preventDefault();
            var reviewContent = $('.review-content');
            var viewRev = $(this).data('target');
            $('ul.review-nav li').removeClass('active');
            $(this).addClass('active');
            reviewContent.removeClass('review-content-show description-show').addClass(viewRev);
        });

        $(".main-menu ul li a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash)
                    .offset()
                    .top
                }, 800, function () {
                    window.location.hash = hash;
                });
            }
        });

        // select your donite tk
        $( ".pay-price" ).on('click',function() {
            $( this ).addClass('active').siblings().removeClass( 'active' );
        });
        
        // wow animation
        new WOW().init();
    });
}(jQuery));