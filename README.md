# Session storage, local storage, cookies storage testing using Cypress comammnds 

# Prerequisites

The first thing we need to do is to setup our environment. So here are some things that you should have to start this project:

VSCode: https://code.visualstudio.com/download </br>
NPM: https://www.npmjs.com/get-npm </br>
NodeJS: https://nodejs.org/en/download

# Steps to execute the test

1. Checkout the project from git
2. Navigate to the project root directory
3. To install all the project dependencies execute 
    npm i
4. To run the test execute

    npm run cy:run-all-tags - to run scenarios of all tags: regression or smoke
    
    npm run cy:run-regression-tag - to run scenarios of tag: regression  
    
 # Application under test 
 https://shop.demoqa.com/
 
 # Screenshots
[![Watch the video](https://github.com/alagamai/cypress-bdd-cucumber-pom-framework/blob/main/cypress/link-to-readme/Cloud-Dashboard-Report.png)](https://github.com/alagamai/cypress-bdd-cucumber-pom-framework/blob/main/cypress/link-to-readme/Demo-Video.mov)

 # steps to integrate cypress with bdd cucumber 
 
Step#1 Npm install —save-dev @badeball/cypress-cucumber-preprocessor

Step#2 Add below lines in cypress.config.js

const preprocessor = require('@badeball/cypress-cucumber-preprocessor');

const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');

const cypress = require('cypress');

async function setupNodeEvents(on, config) {

    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    
    await preprocessor.addCucumberPreprocessorPlugin(on, config);
    
    on('file:preprocessor', browserify.default(config));
    
    // Make sure to return the config object as it might have been modified by the plugin.
    
    return config;
    
}

Steps#3 add the below line in cypress.config.js

        specPattern: '**/*.feature',
        
Step#4 create a folder “step_definitions” under cypress/e2e/ 

Step#5 add a feature file “ecom.feature” under folder “step_definitions”.  Add Feature (test suite name), scenario (test case name), Given, When , Then in feature file

Step#6  add js file with same name “ecom.js” under folder “step_definitions”. Link step definitions for Given, When, Then

Step#7 in eco.js,  import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

