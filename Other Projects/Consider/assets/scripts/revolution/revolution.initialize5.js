var revapi312,
tpj=jQuery;
            
tpj(document).ready(function() {
    if(tpj("#rev_slider_4_1").revolution == undefined){
        revslider_showDoubleJqueryError("#rev_slider_4_1");
    }else{
        revapi312 = tpj("#rev_slider_4_1").show().revolution({
            sliderType:"standard",
            jsFileLocation:"../revolution/js/",
            sliderLayout:"fullscreen",
            dottedOverlay:"none",
            delay:9000,
            navigation: {
                keyboardNavigation:"off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation:"off",
                            mouseScrollReverse:"default",
                onHoverStop:"off",
                bullets: {
                    enable:true,
                    hide_onmobile:false,
                    style:"hermes",
                    hide_onleave:false,
                    direction:"horizontal",
                    h_align:"center",
                    v_align:"bottom",
                    h_offset:0,
                    v_offset:30,
                    space:5,
                    tmp:''
                }
            },
            responsiveLevels:[1240,1024,778,480],
            visibilityLevels:[1240,1024,778,480],
            gridwidth:[1240,1024,778,480],
            gridheight:[868,768,960,720],
            lazyType:"none",
            parallax: {
                type:"scroll",
                origo:"slidercenter",
                speed:400,
                levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
            },
            shadow:0,
            spinner:"spinner3",
            stopLoop:"on",
            stopAfterLoops:0,
            stopAtSlide:1,
            shuffle:"off",
            autoHeight:"off",
            fullScreenAutoWidth:"off",
            fullScreenAlignForce:"off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "60px",
            disableProgressBar:"on",
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
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

if(msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ('CSS' in window && 'supports' in window.CSS && !window.CSS.supports('mix-blend-mode', 'screen'))) {
 
 var bgColor = 'rgba(245, 245, 245, 0.5)';
 //jQuery('.rev_slider .tp-caption[data-blendmode]').removeAttr('data-blendmode').css('background', bgColor);
 jQuery('.rev_slider .tp-caption[data-blendmode]').remove();
}   }
    try{initSocialSharing("312")} catch(e){}
});