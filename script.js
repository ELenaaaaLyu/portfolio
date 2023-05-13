//Initialise width/height to be the width/height of the browser window
const svg = document.getElementById('basesvg');
svg.style.backgroundColor = 'black';

window.addEventListener("resize", resizeSvg);

function resizeSvg() {
    let bbox = svg.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);

    width = bbox.width;
    height = bbox.height;
}

resizeSvg();

//svg content
function randomInt(upper) {
    let output = Math.random();
    output = output * upper ?? 1;
    output = Math.round(output);
    return output;
}

function rgbValue(redInput, greenInput, blueInput) {
    let redOutput = redInput ?? randomInt(120);
    let greenOutput = greenInput ?? randomInt(155);
    let blueOutput = blueInput ?? randomInt(65);
    return `rgb(${redOutput},${greenOutput},${blueOutput})`;
}

//Sets the random color of the function of drawing a circle
function makeCircle(x, y, radius, r, g, b) {
    let color = rgbValue(r, g, b);

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    return circle;
}

function random() {
    switch (arguments.length) {
        case 0:
            return Math.random();
            break;
        case 1:
            return Math.random() * arguments[0];
            break;
        case 2:
            return arguments[0] + Math.random() * (arguments[1] - arguments[0]);
            break;
        default:
            console.error("too many arguments passed to random()");
            break;
    }

}

//Particle class definition
class Particle {
    constructor(xPos, yPos, radius) {
        this.x = xPos;
        this.y = yPos;
        this.r = radius;
        this.svgElement;
        this.animDuration = random(5, 10);

        this.targetX = random(0, width);
        this.targetY = random(height / 2, height);
    }

    drawParticle() {
        this.svgElement = makeCircle(this.x, this.y, this.r);
        svg.appendChild(this.svgElement);

        this.addAnimateX();
        this.addAnimateY();
    }

    //Add animation elements to the cx and cy of the circle. 
    addAnimateX() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animElement.setAttribute('attributeName', 'cx');
        animElement.setAttribute('values', `${this.x}; ${this.targetX};`);
        animElement.setAttribute('dur', `${this.animDuration}`);
        animElement.setAttribute('repeatCount', 'indefinite');
        this.svgElement.appendChild(animElement);
    }
    addAnimateY() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animElement.setAttribute('attributeName', 'cy');
        animElement.setAttribute('values', `${this.y}; ${this.targetY};`);
        animElement.setAttribute('dur', `${this.animDuration}`);
        animElement.setAttribute('repeatCount', 'indefinite');
        this.svgElement.appendChild(animElement);
    }
}

function createParticlesArray(num) {
    let particleInstances = [];
    for (let i = 0; i < num; i++) {
        let particleX = width / 2;
        let particleY = height / 2;
        let particleSize = random(width * 0.001, width * 0.006);

        particleInstances.push(new Particle(particleX, particleY, particleSize));
    }
    return particleInstances;
}

let particles = createParticlesArray(100);

//For every Particle instance in the array call the drawParticle()
for (let particle of particles) {
    particle.drawParticle(svg);
}