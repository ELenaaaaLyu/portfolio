let music;
let cells = [];
let wcells = [];
let viruses = [];

//Estudiocafofo. (2014). Happy Game Theme DEMO. https://opengameart.org/content/happy-game-theme-demo
function preload() {
    music = loadSound("Tema jogo portfolio.mp3");
}

//Make the JS canvas responsive design
//Set the initial graph
function setup() {
    createCanvas(windowWidth, windowHeight);
    //play music
    music.loop();
    for (let i = 0; i < 15; i++) {
        cells.push(new Cells());
        wcells.push(new Wcells());
    }

}

function resize() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    //Use "map()" to follow the mouse to change the background color
    let red = map(mouseX, 0, 400, 0, 255);
    background(red, 150, 44);

    //Use "amp()" of the p5 .js library to adjust the volume as users move the mouse
    let newVol = map(mouseY, 0, height, 0, 1);
    music.amp(newVol);
    for (let i = 0; i < cells.length; i++) {
        cells[i].move();
        cells[i].show();
    }
    for (let i = 0; i < wcells.length; i++) {
        wcells[i].move();
        wcells[i].show();
    }

    for (let i = 0; i < viruses.length; i++) {
        viruses[i].move();
        viruses[i].show();

        //If the virus encounters white blood cells, both of them disappear(rule 1)
        for (let j = 0; j < wcells.length; j++) {
            if (viruses[i].encounters(wcells[j])) {
                viruses.splice(i, 1);
                wcells.splice(i, 1);
                break;
            }
        }
    }

    //When the number of viruses is greater than the number of white blood cells, normal cells become viruses. 
    //But only if the normal cell is not 0 (rule 2)
    if (viruses.length > wcells.length && cells.length > 0) {
        let cell = cells[0];
        //Use "array.splice()" to replace normal cells with viruses
        cells.splice(0, 1);
        let virus2 = new Viruses(cell.pos, cell.r, cell.r, cell.c)
        viruses.push(virus2);

    }


    //Added the "frameCount" system variable of the p5.js library to facilitate automatic counting
    //Cell and white blood cell division
    //Every 10 seconds
    if (frameCount % 300 === 0) {
        for (let i = 0; i < 10 && i < cells.length; i++) {
            for (let j = 0; j < 3; j++) {
                cells.push(cells[i].split());
                cells.push(cells[i].split());
                cells.splice(i, 1);

            }
        }


        for (let i = 0; i < 5 && i < wcells.length; i++) {
            for (let j = 0; j < 2; j++) {
                wcells.push(wcells[i].split());
                wcells.push(wcells[i].split());
                wcells.splice(i, 1);
            }
        }
    }

    //Disappearance of cells and white blood cells
    //Every 5 seconds
    if (frameCount % 150 === 0) {
        for (let i = 0; i < 5 && cells.length > 0; i++) {
            cells.splice(random(cells.length), 1);
        }

        for (let i = 0; i < 4 && wcells.length > 0; i++) {
            wcells.splice(random(wcells.length), 1);
        }
    }
}

function mouseClicked() {
    let virus1 = new Viruses(createVector(mouseX, mouseY));
    viruses.push(virus1);
    if (music.isPlaying() == true) {
        music.pause();
    } else {
        music.loop();
    }
}
