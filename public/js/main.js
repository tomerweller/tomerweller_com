/**
 * User: tomerweller
 * Date: 9/14/13
 * Time: 6:29 PM
 */


//Cross fading bullshit
function setStartInterval(fn, delay){
    var newFn = function(){
        setTimeout(fn, 0);
    };
    setInterval(newFn, delay);
}
function crossFade($elements){
    var currentIndex = 0;
    $elements.each(function(selector){
        $(selector).hide();
    });
    $($elements[0]).show();
    setStartInterval(function(){
        var current = $($elements[currentIndex]);
        var nextIndex = (currentIndex+1)%$elements.length;
        var next = $($elements[nextIndex]);
        var nextZIndex = next.css("z-index");
        var currentZIndex = current.css("z-index");
        current.css("z-index", nextZIndex-1);
        next.fadeIn(500, function(){
//            console.log("fade in from " + nextIndex + " complete. hiding " + currentIndex);
            current.hide();
            current.css("z-index", currentZIndex);
            currentIndex = nextIndex;
        });
    }, 2000);
}
function crossFadeWithDelay(selectors, delay){
    setTimeout(function(){
        crossFade(selectors);
    }, delay);
}
function initCrossFaders(){
    var xfaders = $(".xfader");
    for (var i=0; i<xfaders.length; i++){
        var currentFader = $(xfaders[i]);
        crossFadeWithDelay(currentFader.children(), 200*i);
    }
}

$(function(){
    console.log("Ready!");

    //take care of ellipsis
    $(".project_card_description").ellipsis();
    $(window).resize(function(){
        $(".project_card_description").ellipsis();
    });

    initCrossFaders();
});
