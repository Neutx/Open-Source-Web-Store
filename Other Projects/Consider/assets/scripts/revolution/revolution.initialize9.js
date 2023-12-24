var revapi347,
	tpj=jQuery;
			
tpj(document).ready(function() {
	if(tpj("#rev_slider_4_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_4_1");
	}else{
		revapi347 = tpj("#rev_slider_4_1").show().revolution({
			sliderType:"hero",
			jsFileLocation:"revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			responsiveLevels:[1240,1240,778,480],
			visibilityLevels:[1240,1240,778,480],
			gridwidth:[1240,1240,778,480],
			gridheight:[868,868,960,720],
			lazyType:"none",
			parallax: {
				type:"scroll",
				origo:"slidercenter",
				speed:1000,
				speedbg:0,
				speedls:2000,
				levels:[8,16,24,32,-8,-16,-24,-32,36,2,4,6,50,-30,-20,55],
			},
			shadow:0,
			spinner:"spinner1",
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
	try{initSocialSharing("347")} catch(e){}
});