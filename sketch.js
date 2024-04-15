let p = ["#E26761", "#6693A0", "#EBC06F", "#605951"];

class MovingShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = random(360);
    this.speed = 3;
    this.color = random(p);
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x > width + this.size || this.x < -this.size || this.y > height + this.size || this.y < -this.size) {
      this.x = random(width);
      this.y = random(height);
      this.angle = random(360);
      this.color = random(p);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(random(-30, 30));

    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size / 2, this.size);

    noFill();
    stroke(this.color);
    strokeWeight(this.size / 2 * random(0.5, 1));
    strokeCap(ROUND);

    arc(0, 0, this.size, this.size, 0, 180);

    pop();
  }
}

let movingShapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background("#F2EDEC");

  let cells = 5;
  let offset = width / 8;
  let margin = offset / 1.3;
  let w = (width - offset * 2 - margin * (cells - 1)) / cells;
  let h = (height - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (w + margin);
      let y = offset + j * (h + margin);
      let d = w * random(0.5, 1.2);

      let shape = new MovingShape(x + w / 2, y + h / 2, d);
      movingShapes.push(shape);
    }
  }
}

function draw() {
  background("#F2EDEC");

  for (let shape of movingShapes) {
    shape.move();
    shape.display();
  }
}
