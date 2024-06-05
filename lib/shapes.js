//Create a parent class Shape with a constructor
class Shape {
    constructor() {
        this.color = '';
    }
    setColor(color) {
        this.color = color;
    }
}

//Create a child class Triangle, which inherits properties specified in the parent class Shape
class Triangle extends Shape {
    render() {
        return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
}

//Create a child class Circle, which inherits properties specified in the parent class Shape
class Circle extends Shape {
    render() {
        return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
    }
}

//Create a child class Square, which inherits properties specified in the parent class Shape
class Square extends Shape {
    render() {
        return `<rect x="73" y="40" width="160" height="160" fill="${this.color}" />`;
    }
}

//Export the classes
module.exports = { Triangle, Circle, Square };