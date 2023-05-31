 //Set up cells
 function Cells(pos, r, c) {
   if (pos) {
     this.pos = pos.copy();
   } else {
     this.pos = createVector(random(width), random(height));
   }

   this.r = r || 60;
   this.c = c || color(random(0, 255), 0, random(0, 255));

   //Style the split and set a minimum value to prevent invisible and infinite splitting. 
   this.split = function () {
     let newR = this.r / 2;
     if (newR < 5) {
       newR = 5
     }
     let cell1 = new Cells(this.pos, newR, this.c);
     return cell1;
   }

   //Obtain random velocity (using the p5.js library)
   this.move = function () {
     let vel = p5.Vector.random2D();
     //Use mult() to change the movement speed
     vel.mult(2);
     this.pos.add(vel);
   }
   this.show = function () {
     noStroke();
     fill(this.c);
     ellipse(this.pos.x, this.pos.y, this.r, this.r)
   }
 }

 //Set up white blood cells
 function Wcells(pos, x, y, c) {
   if (pos) {
     this.pos = pos.copy();
   } else {
     this.pos = createVector(random(width), random(height));
   }

   this.x = x || 20;
   this.y = y || 20;
   this.c = c || color(random(0, 255), 0, random(0, 255));


   //Style the split and set a minimum value to prevent invisible and infinite splitting. 
   this.split = function () {
     let newX = this.x / 2;
     let newY = this.y / 2;
     if (newX < 10) {
       newX = 10;
     }
     if (newY < 10) {
       newY = 10;
     }
     let wcell1 = new Wcells(this.pos, newX, newY, this.c)
     return wcell1;
   }

   //Obtain random velocity (using the p5.js library)
   this.move = function () {
     let vel = p5.Vector.random2D();
     //Use mult() to change the movement speed 
     vel.mult(3);
     this.pos.add(vel);
   }
   this.show = function () {
     noStroke();
     fill(this.c);
     rect(this.pos.x, this.pos.y, this.x, this.y)
   }
 }

 //Set up viruses
 function Viruses(pos, x, y, c) {
   if (pos) {
     this.pos = pos.copy();
   } else {
     this.pos = createVector(random(width), random(height));
   }

   this.x = x || 20;
   this.y = y || 20;
   this.c = c || color(random(0, 255), 0, random(0, 255));

   //Detect encounters with white blood cells by detecting the distance between virus and white blood cells
   //Use "dist()" in the p5.js library to calculate the distance between them
   this.encounters = function (wcells) {
     let d = dist(this.pos.x, this.pos.y, wcells.pos.x, wcells.pos.y);
     return (d < this.x || d < this.y)
   }

   //Obtain random velocity (using the p5.js library)
   this.move = function () {
     let vel = p5.Vector.random2D();
     //Use mult() to change the movement speed 
     vel.mult(2);
     this.pos.add(vel);
   }
   this.show = function () {
     noStroke();
     fill(this.c);
     let newX = this.x / 2;
     let newY = this.y / 2;

     triangle(this.pos.x, this.pos.y - newY, this.pos.x - newX, this.pos.y + newY, this.pos.x + newX, this.pos.y + newY);
   }
 }