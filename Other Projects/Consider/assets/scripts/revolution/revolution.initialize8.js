var tpj=jQuery;
var revapi4;
tpj(document).ready(function() {
	if(tpj("#rev_slider_4_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_4_1");
	}else{
		revapi4 = tpj("#rev_slider_4_1").show().revolution({
			sliderType:"hero",
			jsFileLocation:"revolution/js/",
			sliderLayout:"fullwidth",
			dottedOverlay:"none",
			delay:9000,
			navigation: {
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,1060,1220],
			lazyType:"none",
			scrolleffect: {
				fade:"on",
				blur:"on",
				maxblur:"20",
				on_layers:"on",
				direction:"top",
				multiplicator_layers:"1.6",
				tilt:"10",
			},
			parallax: {
				type:"scroll",
				origo:"slidercenter",
				speed:400,
				levels:[5,10,15,20,25,30,35,40,-5,-10,-15,-20,-25,-30,-35,55],
				disable_onmobile:"on"
			},
			shadow:0,
			spinner:"off",
			autoHeight:"off",
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
		//Fade out not Focused Elements on Hover
		jQuery('body').on('mouseenter','.tp-selecttoggle',function() {
		  jQuery(this).addClass("selected");
		  jQuery('.tp-selecttoggle').each(function() {
			var _ = jQuery(this);
			if (!_.hasClass("selected")) punchgs.TweenLite.to(_,0.5,{autoAlpha:0.35,ease:punchgs.Power2.easeInOut,overwrite:"auto"});
		  });
		});

		//Fade in all Elements on Blur
		jQuery('body').on('mouseleave','.tp-selecttoggle',function() {
		  jQuery(this).removeClass("selected");
		  jQuery('.tp-selecttoggle').each(function() {
			var _ = jQuery(this);    
			punchgs.TweenLite.to(_,0.5,{autoAlpha:1,ease:punchgs.Power2.easeInOut,overwrite:"auto"});
		  });
		});				}
    RsPolyfoldAddOn(tpj, revapi12,{position: "top", color: "#ffffff", scroll: true, height: 150, range: "slider", point: "center", placement: 1, responsive: true, negative: true, leftWidth: 0.35, rightWidth: 0.35, inverted: false, animated: false});
    RsPolyfoldAddOn(tpj, revapi12,{position: "bottom", color: "#ffffff", scroll: true, height: 150, range: "slider", point: "center", placement: 1, responsive: true, negative: true, leftWidth: 0.35, rightWidth: 0.35, inverted: false, animated: false});
});