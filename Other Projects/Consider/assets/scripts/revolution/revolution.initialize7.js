var tpj=jQuery;
var revapi1046;
tpj(document).ready(function() {
	if(tpj("#rev_slider_4_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_4_1");
	}else{
		revapi1046 = tpj("#rev_slider_4_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"revolution/js/",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:9000,
			whiteboard:{
				movehand: {
					src:"assets/images/whiteboard/hand_point_right.png",
					width:400,
					height:1000,
					handtype:"right",
					transform:{
						transformX:186,
						transformY:66
					},
					jittering:{
						distance:"80",
						distance_horizontal:"100",
						repeat:"5",
						offset:"10",
						offset_horizontal:"0"
					},
					rotation:{
						angle:"10",
						repeat:"3"
					}
				},
				writehand: {
					src:"assets/images/whiteboard/write_right_angle.png",
					width:572,
					height:691,
					handtype:"right",
					transform:{
						transformX:49,
						transformY:50
					},
					jittering:{
						distance:"80",
						distance_horizontal:"100",
						repeat:"5",
						offset:"10",
						offset_horizontal:"0"
					},
					rotation:{
						angle:"10",
						repeat:"5"
					}
				}
			},
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				mouseScrollNavigation:"off",
					mouseScrollReverse:"default",
				onHoverStop:"off",
				bullets: {
					enable:true,
					hide_onmobile:true,
					hide_under:767,
					style:"hermes",
					hide_onleave:false,
					direction:"vertical",
					h_align:"right",
					v_align:"center",
					h_offset:20,
					v_offset:0,
					space:5,
					tmp:''
				}
			},
			responsiveLevels:[1240,1024,778,480],
			visibilityLevels:[1240,1024,778,480],
			gridwidth:[1240,1024,778,480],
			gridheight:[868,768,960,720],
			lazyType:"none",
			shadow:0,
			spinner:"off",
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,
			shuffle:"off",
			autoHeight:"off",
			fullScreenAutoWidth:"off",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: "",
			fullScreenOffset: "60px",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
	}
	tpj("#rev_slider_4_1").rsWhiteBoard();
});