let rotationSpeed;
let rotation;

function setup() {
    let canvas = createCanvas(340, 390);
    canvas.parent('windmill-container');
    rotation = 0;
}

function draw() {
    clear();

    console.log(max_wind)
    if (typeof max_wind === 'undefined'){
        rotationSpeed = 2;
    } else {
        rotationSpeed = max_wind * 0.005
    }

    stroke(255, 255, 255);
    fill(255, 255, 255);
    rect(195, 150, 14, 250);

    let centerX = 200;
    let centerY = 150;
    
    push();
    translate(centerX + 1, centerY);
    rotate(rotation);
    
    for (let i = 0; i < 3; i++) {
        triangle(0, -10, 100, -90, 0, 15); 
        rotate(PI / 1.5);
    }
    
    pop();
    rotation += rotationSpeed;
}
