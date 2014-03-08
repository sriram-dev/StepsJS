/* 
	steps.js	
*/

function Steps(container) {
    "use strict";
	this.container = container;
	this.numSteps = 0;
	this.numTitle = 0;
	this.numDesc = 0;
    this.box_width = 90;
    this.stepWidth = 0;
    this.stepHeight = 0;
    this.box_width_type = 2; //1-px 2-percent(default)
    console.log("cont width in main func: " + $(container).children(".steps_desc").length);
}


/*********************************** HELPER FUNCTIONS ******************************************/

function getNumDesc(container) {
    var numDesc = $(container).children(".steps_desc").length;
    return numDesc;
}

function getNumTitle(container) {
    var numTitle = $(container).children(".steps_title").length;
    console.log("numtitle inside getNumTitle :" + numTitle);
    return numTitle;
}
    
function hideAllSteps(container) {
    $(container).children(".steps_title").hide();
    $(container).children(".steps_desc").hide();
}

/* Calculate Width Based on Width specified */
function CalculateBoxWidth(box_width, box_width_type) {
    if(box_width_type === 1) {
        return box_width;
    } else if(box_width_type === 2) {
        return box_width * 0.01 * $(window).width();
    }
}

function getNthStepDesc(container, i) {
    var desc = $(container).children(".steps_desc").eq(i-1);
    return desc;
}


function getNthStepTitle(container, i) {
        var title = $(container).children(".steps_title").eq(i-1);
        return title;
}

function RemoveAllActive(container) {
    $(container).children(".steps_title").removeClass("active");
    $(container).children(".steps_desc").removeClass("active");
}

function showFirstTitle(container) {
    $(container).children(".steps_title").eq(0).show();
    $(container).children(".steps_desc").eq(0).show();
}

function getParamType(num) {
    // if width is given as a number followed by px or em or as percent go on 
    var px_pattern = /\d+\s*px\s*$/;
    //var em_pattern = /\d+\s*em\s*$/;
    var percent_pattern = /\d+\s*\%\s*$/;
    var type = 0;
    if(px_pattern.test(num)) {
        type = 1;
    } else if(percent_pattern.test(num)) {
        type = 2;
    } else {
        console.warn("Improper Width sent");
    }
    return type;
}


/* Adds the Menu of the StepBar with steps */
function addMenu(stepVar) {
    // Get the required vars from step
    var Step = stepVar;
    var width = CalculateBoxWidth(Step.box_width, Step.box_width_type);
    var numSteps = Step.numSteps;
    var numTitle = Step.numTitle;
    var numDesc  = Step.numDesc;
    var container= Step.container;
    var height = Math.min(100, $(window).height() * 0.15);
    console.log("width: " + width + "height" + height);
    var menuDiv = $("<div></div>").width(width).height(height).addClass("steps_menu").attr("id", "steps_menu");
    $(container).addClass("main_container");
    $(container).prepend(menuDiv);
    // Add Steps inside the menuDiv
    var stepWidth = width / numSteps;
    stepWidth -= 30;
    Step.stepWidth = stepWidth;
    console.log("stepwidth" + stepWidth);
    hideAllSteps(container);
    showFirstTitle(container);
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
            var nthTitle = getNthStepTitle(container, $(this).text());
            var nthDesc = getNthStepDesc(container, $(this).text());
            hideAllSteps(container);
            RemoveAllActive(container);
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

/**************** Helpers End ************/


/**************************   API ***************************/

/*  
 * sets the current container and applies steps
 */
Steps.prototype.applySteps = function applySteps() {
    this.numTitle = getNumTitle(this.container);
    this.numDesc  = getNumDesc(this.container);
    this.numSteps = Math.max(this.numTitle, this.numDesc);
    console.log("numtitle: " + this.numTitle + " numsteps: " + this.numSteps);
    addMenu(this);
};

Steps.prototype.getBoxWidth = function getBoxWidth() {
    return this.box_width;
};

Steps.prototype.getBoxWidthType = function getBoxWidthType() {
    return this.box_width_type;
};

/* Update the Box Width when modified later */
Steps.prototype.updateBoxWidth = function updateBoxWidth() {
    var width = CalculateBoxWidth(this.box_width, this.box_width_type);
    console.log("Box width is : "+ width);
    // Update element with class steps_menu and container element
    // width of each of the steps need to be modified (elements with class menu_circle)
    var stepwidth = width/this.numSteps - 30;
    $(this.container).css("width", width);
    $(this.container).children(".menu_circle").css("width", stepwidth);
    $(this.container).children(".steps_menu").css("width", width);
};

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

Steps.prototype.setWidth = function setWidth(width) {
    var type = getParamType(width);
    var num_pat = /[0-9]+/g;
    if(type !== 0) {
        this.box_width_type = type;
        var arr = num_pat.exec(width);
        this.box_width = parseInt(arr[0], 10);
        console.log("width in setWidth: " + this.box_width);
        this.updateBoxWidth();
    }
};