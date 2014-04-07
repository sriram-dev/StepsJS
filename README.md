StepsJS
========

StepsJS is a Javascript Library which can be used to describe Steps to do something/explaing something in a intuitive way.

http://sriram-dev.github.io/StepsJS/

Usage
--------

    * Include Both steps.js and steps.css files in your html page.
    
         <script type="text/javascript" src="steps.js"></script>
	      <link rel="stylesheet" type="text/css" href="steps.css">
    
    * Include your steps in a HTML Div Element, With each of the Steps Heading and Steps Descriptions 
    in separate Divs with Class "steps_title" and "steps_desc" respectively. 
    
    * Create an instance of the steps and provide the id of the Main div element which contains the Steps in script. 
          var stepInstance = new Steps("#container");
          stepInstance.applySteps();
    
API: 
---------
    
    setWidth - sets the width of the step div. All steps inside that div would also have its properties modified
    
    stepInstance.setWidth("50%");
    (or)
    stepInstance.setWidth("500px");
    
    setHeight - sets the height of the step container
    
    stepInstance.setHeight("80%");
    (or)
    stepInstance.setHeight("800px");
