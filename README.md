StepsJS
========

StepsJS is a Javascript Library which can be used to describe Steps to do something/explaing something in a intuitive way.

http://sriram-dev.github.io/StepsJS/

Setting up environment
---------

    * Clone the Repo

    * npm install - to install dependencies
    

Build
---------
    * grunt buildall - clean + jshint + build

    * grunt clean - clean build/* files

    * grunt lint - checks the files for lint errors

Usage
--------

    * Include Both steps.js/steps.min.js and steps.css/steps.min.css file in your html page.
    
    * Include your steps in a HTML Div Element, With each of the Steps Heading and Steps Descriptions 
    in separate Divs with Class "steps_title" and "steps_desc" respectively. 
    
    * Create an instance of the steps and provide the id of the Main div element which contains the Steps in script. 
          var stepInstance = new Steps("#container");
          stepInstance.applySteps();
    
    * Refer examples/ folder for practical usage examples.
