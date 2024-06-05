// Installed inquirer@8.2.4, which includes the packages needed for this application

//inquirer.js is a collection of common interactive command line user interfaces. We will use inquirer.prompt method
const inquirer = require('inquirer'); 

//fs is a nodejs library package for reading/writting files. We will use fs.writeFile() method.
const fs = require('fs'); 

//Import the required code from shape.js file
const { Triangle, Circle, Square } = require('./lib/shape.js');

//Create a class with a constructor for renderring the text and shape elements in the Svg string
class Svg {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }
    render() {
        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.textElement}${this.shapeElement}</svg>`;
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

//Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo (up to three characters):',
    },
    {
        type: 'input',
        name: 'text-color',
        message: 'Enter text color (color keyword or hex code):',
    },
    {
        type: 'list',
        name: 'pixel-image',
        message: 'Select a shape for the logo:',
        choices: ['Triangle', 'Circle', 'Square'],
    },
    {
        type: 'input',
        name: 'shape-color',
        message: 'Enter shape color (color keyword or hex code):',
    },
];

//Create a function to write the SVG file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) throw err;
        console.log('Generated logo.svg successfully!');
    });
}
            