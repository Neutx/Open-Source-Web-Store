var tpj=jQuery;
var revapi14;
tpj(document).ready(function() {
	if(tpj("#rev_slider_14_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_14_1");
	}else{
		revapi14 = tpj("#rev_slider_14_1").show().revolution({
			sliderType:"hero",
			jsFileLocation:"revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			particles: {startSlide: "first", endSlide: "last", zIndex: "6",
				particles: {
					number: {value: 100}, color: {value: "#ffffff"},
					shape: {
						type: "circle", stroke: {width: 0, color: "#ffffff", opacity: 1},
						image: {src: ""}
					},
					opacity: {value: 1, random: true, min: 0.25, anim: {enable: false, speed: 3, opacity_min: 0, sync: false}},
					size: {value: 3, random: true, min: 0.5, anim: {enable: false, speed: 40, size_min: 1, sync: false}},
					line_linked: {enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1},
					move: {enable: true, speed: 1, direction: "top", random: true, min_speed: 1, straight: false, out_mode: "out"}},
				interactivity: {
					events: {onhover: {enable: true, mode: "bubble"}, onclick: {enable: false, mode: "repulse"}},
					modes: {grab: {distance: 400, line_linked: {opacity: 0.5}}, bubble: {distance: 400, size: 0, opacity: 0.01}, repulse: {distance: 200}}
				}
			},
			navigation: {
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"none",
			parallax: {
				type:"mouse",
				origo:"slidercenter",
				speed:400,
				levels:[1,2,3,4,5,10,15,20,25,46,47,48,49,50,51,55],
			},
			shadow:0,
			spinner:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: "",
			fullScreenOffset: "",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				disableFocusListener:false,
			}
		});
	}

    RsParticlesAddOn(revapi14);
});