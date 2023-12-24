
//Preloader
$(window).load(function () {
    "use strict";
   	$("#status").fadeOut();
	$("#preloader").delay(350).fadeOut("slow");
});

$(document).ready(function () {
    "use strict";
   
    // Smooth Scroll to internal links
    $('.smooth-scroll').smoothScroll({
        offset: -45,
        speed: 1200
    });

    // Initialize Home Sliders
    $('#home-slider').flexslider({
        directionNav: false,
		controlNav:false
    });
	
	//Initializez Testimonial Slider
    $('#testimonials-slider').flexslider({
        directionNav: false,
		controlNav:true
    });

    // Mobile Menu
    $('#mobile-toggle').click(function () {
        if ($('#navigation').hasClass('open-nav')) {
            $('#navigation').removeClass('open-nav');
        } else {
            $('#navigation').addClass('open-nav');
        }
    });

    $('#menu li a').click(function () {
        if ($('#navigation').hasClass('open-nav')) {
            $('#navigation').removeClass('open-nav');
        }
    });
    
    // Animations
	//if( !device.tablet() && !device.mobile() ) {
	//		$('.skin-secondary').addClass('opacity-down');
	//	} 
    // Turn dynamic animations for iOS devices
    var iOS = false,
        p = navigator.platform;

    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
        iOS = true;
    }
    
    if(iOS == false){
		if( !device.tablet() && !device.mobile() ) {
		
			//Turn opacity for secondary color in section
			//$('.skin-secondary').bind('inview', function (event, visible) {
			//		if (visible === true) {$(this).addClass('visible-section');}
			//	});
			//Scale pricing tabel popular block
			$('.trigger-value').bind('inview', function (event, visible) {
					if (visible === true) {$(this).addClass('value');}
				});
			//Work section corner image visibility turn
			$('#work').bind('inview', function (event, visible) {
					if (visible === true) {$('.corner-work').css('opacity', 1);	}else$('.corner-work').css('opacity', 0);					
				});
			
			//Section Heading text effect	
			$('#about').bind('inview', function (event, visible) {
				if (visible === true) {var container = $("#about .page-title h1");container.shuffleLetters();}
			});
			$('#skill').bind('inview', function (event, visible) {
				if (visible === true) {var container = $("#skill .page-title h1");container.shuffleLetters();
				}
			});
			$('#services').bind('inview', function (event, visible) {
				if (visible === true) {
					var container = $("#services .page-title h1");container.shuffleLetters();}
			});
			$('#work').bind('inview', function (event, visible) {
				if (visible === true) {var container = $("#work .page-title h1");container.shuffleLetters();
				}
			});
			$('#blog').bind('inview', function (event, visible) {
				if (visible === true) {var container = $("#blog .page-title h1");container.shuffleLetters();}
			});
			$('#contact').bind('inview', function (event, visible) {
				if (visible === true) {var container = $("#contact .page-title h1");container.shuffleLetters();}
			});
		}
    }

    // Adjust slide height for smaller screens
    if ($(window).height() < 760) {
        $('#home-slider .slides li').css('height', $(window).height());
    }
    $('#home-slider .slides li').each(function () {

        var imgSrc = $(this).children('.slider-bg').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('.slider-bg').remove();

        var slideHeight = $(this).height();
        var contentHeight = $(this).children('.slide-content').height();
        var padTop = (slideHeight / 2) - (contentHeight / 2);

        $(this).children('.slide-content').css('padding-top', padTop);

    });

    // Sticky Nav
    //$(window).scroll(function () {

    //    if ($(window).scrollTop() > 0) {
    //        $('#navigation').addClass('sticky-nav');
    //    } else {
    //        $('#navigation').removeClass('sticky-nav');
    //    }

    //});
	
	// Parallax Backgrounds
    $(window).scroll(function(){
		var scrollAmount = -$(window).scrollTop()/2;
		$('#home-slider .slides li').css('background-position', scrollAmount);
	
	});
	
	//Gallery open image in lightbox Initialize
	$('a[data-rel]').each(function() {
    $(this).attr('rel', $(this).data('rel'));
	});
	//Gallery image lightbox
	$("[rel^='prettyPhoto']").prettyPhoto();
	
	//Trun Gallery Block Text rotator
	if( !device.mobile() ) {
	/* Gallery block-20 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate20").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();});}, 4000 );
		}
		ut_word_rotator();
		
	/* Gallery block-8 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate8").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();});}, 6000 );
		}
		ut_word_rotator();
		
		/* Gallery block-16 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate16").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();});}, 5000 );
		}
		ut_word_rotator();
		
		/* Gallery block-4 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate4").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();
			});}, 4000 );
		}
		ut_word_rotator();
		
		/* Gallery block-7 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate7").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();
			});}, 6000 );
		}
		ut_word_rotator();
		
		/* Gallery block-14 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate14").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();
			});}, 5000 );
		}
		ut_word_rotator();
		
		/* Gallery block-6 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate6").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();
			});}, 4000 );
		}
		ut_word_rotator();
		
		/* Gallery block-12 Word Rotator
		================================================== */		
		var ut_word_rotator = function() {
			var ut_rotator_words = [
				'Shaping Vision, We love what we do',
				'A wall of magic, A place where creativity meets experience.'
			] ,
			counter = 0;                
			setInterval(function() {
			$(".gallery-text-rotate12").fadeOut(function(){$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();
			});}, 6000 );
		}
		ut_word_rotator();
	}
	
	// Team Members Carousel
	jQuery(".team-slider").owlCarousel({
		lazyLoad : true,
		slideSpeed : 300,
		stopOnHover: true,
		paginationSpeed : 400,
		autoPlay: 3500,
		navigation : false,
		pagination : false,
		autoHeight : true,
		touchDrag:true,
		items : 4, //10 items above 1000px browser width
		itemsDesktop : [1000,3], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,2], // betweem 900px and 601px
		itemsTablet: [600,2], //2 items between 600 and 0
		itemsMobile : [420,1],
	});
		
	// Service Carousel
	jQuery(".service-slider").owlCarousel({
		lazyLoad : true,
		slideSpeed : 300,
		stopOnHover: true,
		paginationSpeed : 400,
		autoPlay: false,
		navigation : true,
		navigationText : ["",""],
		pagination : false,
		autoHeight : false,
		items : 3, //10 items above 1000px browser width
		itemsDesktop : [1000,3], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,2], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		itemsMobile : [420,1],
	});
		
	// client Carousel
	jQuery(".client-slider").owlCarousel({
		lazyLoad : true,
		slideSpeed : 300,
		stopOnHover: true,
		paginationSpeed : 400,
		autoPlay: 3500,
		navigation : false,
		pagination : false,
		autoHeight : true,
		items : 4, //10 items above 1000px browser width
		itemsDesktop : [1000,4], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,3], // betweem 900px and 601px
		itemsTablet: [600,2], //2 items between 600 and 0
		itemsMobile : [420,1],
	});
		
	// blog Carousel
	jQuery(".blog-slider").owlCarousel({
		lazyLoad : true,
		slideSpeed : 300,
		stopOnHover: true,
		paginationSpeed : 400,
		autoPlay: 3500,
		navigation : true,
		navigationText : ["",""],
		pagination : false,
		autoHeight : true,
		items : 2, //10 items above 1000px browser width
		itemsDesktop : [1000,2], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		itemsMobile : [420,1],
	});
	// Pie Charts
	'use strict';
	var pieChartClass = 'pieChart',
	pieChartLoadedClass = 'pie-chart-loaded';
	function initPieCharts() {
		var chart = $('.' + pieChartClass);
		chart.each(function() {
			$(this).appear(function() {
				var $this = $(this),
					chartBarColor = ($this.data('bar-color')) ? $this.data('bar-color') : "rgba(255,255,255,.6)",
					chartBarWidth = ($this.data('bar-width')) ? ($this.data('bar-width')) : 40
				if( !$this.hasClass(pieChartLoadedClass) ) {
					$this.easyPieChart({
						animate: 2000,
						size: chartBarWidth,
						lineWidth: 6,
						scaleColor: false,
						trackColor: "rgba(0,0,0,.2)",
						barColor: chartBarColor,
					}).addClass(pieChartLoadedClass);
				}
			});
		});
	}
	initPieCharts();
	
	
    // Portfolio filterable grid
	jQuery('#portfolio-grid').mixitup({
		targetSelector: '.project',

	});
	
    // portfolio project Clicks with AJAX call
    $('.project-title a').click(function (event) {
        event.preventDefault();

        if ($('#ajax-container').hasClass('open-container')) {
            $('#ajax-container').addClass('closed-container');
            $('#ajax-container').removeClass('open-container');
        }

        var fileID = $(this).attr('data-project-file');
		
        if (fileID != null) {
            $('html,body').animate({
                scrollTop: $('#ajax-container').offset().top - 100
            }, 500);

        }

        $.ajax({
            url: fileID
        }).success(function (data) {
			$('#ajax-container').addClass('open-container');
            $('#ajax-container').html(data);
            $('.project-slider').flexslider({
                directionNav: false
            });
            $('#ajax-container').removeClass('closed-container');

            $('.close-project').click(function () {
                $('#ajax-container').addClass('closed-container');
                $('#ajax-container').removeClass('open-container');
                $('html,body').animate({
                    scrollTop: $('#portfolio-grid').offset().top - 100
                }, 500);
                setTimeout(function () {
                    $('#ajax-container').html('');
                }, 1000);
            });
        });

    });

	//Twitter feed
	jQuery('#tweets').tweetable({
		username: 'envato', //twitter username 
		time: true, 
		rotate: true, 
		speed: 7000, 
		limit: 5, 
		replies: true,
		position: 'append',
		failed: "Sorry, twitter is currently unavailable for this user.",
		loading: "Loading tweets...",
		html5: true,
		onComplete:function($ul){
			$('time').timeago();
		}
	});
});