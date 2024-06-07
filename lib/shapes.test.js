//Import trinangle, circle, squore classes from the file shapes.js
const { Triangle, Circle, Square } = require('./lib/shapes.js');

//Test the Triangle, Circle and Square classes
describe("Shape rendering", () => {
    test('Triangle renders correctly', () => {
        const triangle = new Triangle('blue');
        expect(triangle.render()).toEqual(`<polygon points="150, 18 244, 182 56, 182" fill="blue" />`);
    });

    test('Circle renders correctly', () => {
        const circle = new Circle('yellow');
        expect(circle.render()).toEqual(`<circle cx="150" cy="100" r="80" fill="yellow" />`);
    });

    test('Square renders correctly', () => {
        const square = new Square('green');
        expect(square.render()).toEqual(`<rect x="73" y="40" width="160" height="160" fill="green" />`);
    });
});
