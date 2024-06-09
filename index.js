// Installed inquirer@8.2.4, which includes the packages needed for this application

//inquirer.js is a collection of common interactive command line user interfaces. We will use inquirer.prompt method
const inquirer = require('inquirer');

//fs is a nodejs library package for reading/writting files. We will use fs.writeFile() method.
const fs = require('fs');

//Import the required code from shape.js file
const { Triangle, Circle, Square } = require('./lib/shapes.js');

const COLOR_LIST = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure",
    "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet",
    "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral",
    "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan",
    "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki",
    "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred",
    "darksalmon", "darkseagreen", "darkslateblue", "darkslategray",
    "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue",
    "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen",
    "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green",
    "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory",
    "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue",
    "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen",
    "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue",
    "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime",
    "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue",
    "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue",
    "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
    "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace",
    "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod",
    "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff",
    "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown",
    "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell",
    "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow",
    "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise",
    "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
];

//Create a class with a constructor for renderring the text and shape elements in the Svg string
class Svg {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }
    render() {
        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${this.shapeElement}
        ${this.textElement}
        </svg>`;
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="45" text-anchor="middle" fill="${color}">${text}</text>`;
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
        validate: async (input) => {
            if (input.length > 3) {
                return 'Please enter a maximum of three characters';
            } else {
                return true;
            }
        },
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (color keyword or hex code):',
        validate: async (input) => {
            const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (input.charAt(0) === '#' && !hexColorRegex.test(input)) {
                return 'Please enter a valid color keyword or hex code';
            } if (!COLOR_LIST.includes(input)) {
                return 'Please enter a valid color keyword or hex code';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'pixelImage',
        message: 'Select a shape for the logo:',
        choices: ['Triangle', 'Circle', 'Square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (color keyword or hex code):',
        validate: async (input) => {
            const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (input.charAt(0) === '#' && !hexColorRegex.test(input)) {
                return 'Please enter a valid color keyword or hex code';
            } if (!COLOR_LIST.includes(input)) {
                return 'Please enter a valid color keyword or hex code';
            }
            return true;
        }
    },
];

//Create a function to write the SVG filef
function writeToFile(fileName, data) {
    const examples = '/examples/';
    const svg = new Svg();
    svg.setTextElement(data.text, data.textColor);

    switch (data.pixelImage) {
        case 'Triangle':
            const triangle = new Triangle();
            console.log(data.shapeColor);
            triangle.setColor(data.shapeColor);
            svg.setShapeElement(triangle);
            break;
        case 'Circle':
            const circle = new Circle();
            circle.setColor(data.shapeColor);
            svg.setShapeElement(circle);
            break;
        case 'Square':
            const square = new Square();
            square.setColor(data.shapeColor);
            svg.setShapeElement(square);
            break;
        default:
            break;
    }

    const svgContent = `${svg.render()}`;

    fs.writeFile(__dirname + examples + fileName, svgContent, (err) => {
        if (err) throw err;
        console.log('Logo.svg generated successfully!');
    })
}

//Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        writeToFile('Logo.svg', answers);
    });
};

//Initialize the app
init();



