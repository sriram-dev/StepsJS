/* 
	steps.js	
*/

var Steps = (function Closure() {
    "use strict";
	var container = "";
	var numSteps = 0;
	var numTitle = 0;
	var numDesc = 0;
        var BOX_WIDTH = 90;
        var stepWidth = 0;
        var stepHeight = 0;
        var box_width_type = 3; //1-px 2-em 3-percent(default)

    /*  
     * sets the current container and applies steps
     */
    function Init(cont) {
        container = cont;
        collectDetails();
        addMenu();
    }

    function collectDetails() {
        var numChildren = $(container).children().length;
        numTitle = $(container).children(".steps_title").length;
        numDesc = $(container).children(".steps_desc").length;
        numSteps = Math.max(numTitle, numDesc);
    }
    
    function hideAllSteps() {
        $(container).children(".steps_title").hide();
        $(container).children(".steps_desc").hide();
    }
    /* Calculate Width Based on Width specified */
    function GetBoxWidth() {
        if(box_width_type === 1) {
            return BOX_WIDTH;
        } else if(box_width_type === 2) {

        } else {
             return BOX_WIDTH * 0.01 * $(window).width();
        }	
    }
    /* Update the Box Width when modified later */
    function UpdateBoxWidth() {
        var width = GetBoxWidth();
        console.log("Box width is : "+ width);
        // Update element with class steps_menu and container element
        // width of each of the steps need to be modified (elements with class menu_circle)
        var stepwidth = width/numSteps - 30;
        $(container).css("width", width);
        $(".menu_circle").css("width", stepwidth);
        $(".steps_menu").css("width", width);
    }

    /* Adds the Menu of the StepBar with steps */
    function addMenu() {
        var width = GetBoxWidth();
        var height = $(window).height() * 0.05;
        console.log("width: " + width + "height" + height);
        var menuDiv = $("<div></div>").width(width).height(height).addClass("steps_menu").attr("id", "steps_menu");
        $(container).addClass("main_container");
        $(container).prepend(menuDiv);
        // Add Steps inside the menuDiv
        stepWidth = width / numSteps;
        stepWidth -= 30;
        console.log("stepwidth" + stepWidth);            
        hideAllSteps();
        showFirstTitle();
        for(var i=0;i<numSteps;i++) {
            var stepheight = Math.min(height, stepWidth);
            var step = $("<button></button>").width(stepWidth).height(stepheight).addClass("menu_circle");
            if(i === 0) {
                step.addClass("active");
            }
           $("<h2>"+(i+1)+"</h2>").addClass("menu_name").appendTo(step);
            var nthTitle = getNthStepTitle($(step).text());
            $(step).addClass('tooltip');
            $(step).attr("title", $(nthTitle).text());
            step.on('click', function(e) {
                console.log("text:" + $(this).text());
                var nthTitle = getNthStepTitle($(this).text());
                var nthDesc = getNthStepDesc($(this).text());
                hideAllSteps();
                RemoveAllActive();
                $(this).addClass('active');
                // using tooptipster
                console.log("nthtitle:" + $(nthTitle).text());
                $(this).siblings().removeClass('active');
                $(nthTitle).show();
                $(nthDesc).show();
            });
            step.appendTo(menuDiv);
        }
    }
    
    function getNthStepDesc(i) {
        var desc = $(container).children(".steps_desc").eq(i-1);
        return desc;
    }
    
    function getNthStepTitle(i) {
            var title = $(container).children(".steps_title").eq(i-1);
            return title;
    }
    
    function RemoveAllActive() {
        $(container).children(".steps_title").removeClass("active");
        $(container).children(".steps_desc").removeClass("active");
    }
    
    function showFirstTitle() {
        $(container).children(".steps_title").eq(0).show();
        $(container).children(".steps_desc").eq(0).show();     
    }
    
    /* TODO
    1) Adding Back layer
    2) API - SetMenuBackgroundColor
    3) API - SetMenuShape (Later)
    4) API - SetMenuColor
    5) API - SetBackLayerColor
    6) API - SetMenuFontSize (default)
    7) API - SetHeight 
    8) API - SetWidth
    */
   
    function setWidth(width) {
        // if width is given as a number followed by px or em or as percent go on 
        var px_pattern = /\d+\s*px\s*$/;
        var em_pattern = /\d+\s*em\s*$/;
        var percent_pattern = /\d+\s*\%\s*$/;
        var num_pat = /[0-9]+/g;
        var type = 0;
        if(px_pattern.test(width)) {
            type = 1;
        } else if(em_pattern.test(width)) {
            type = 2;
        } else if(percent_pattern.test(width)) {
            type = 3;
        } else {
            console.warn("Improper Width sent");
        }
        if(type !== 0) {
            box_width_type = type;
            var arr = num_pat.exec(width);
            BOX_WIDTH = parseInt(arr[0], 10);
            console.log("width: " + BOX_WIDTH);
            UpdateBoxWidth();
        }
    }

    /* --------------- API ----------------------*/
    return {
        Init: Init,
        SetWidth: setWidth
    };
    
})();
