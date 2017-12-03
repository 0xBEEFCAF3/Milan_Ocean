// Initial Setup


console.log("ready to go");

var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;



// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var colors = [
	'#6BCAE2',
	'#51A5BA',
	'#41924B',
	'#AFEAAA',
	'#87E293',
	'#FE8402'
]

// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

var gravity = 0.5;
var friction = .99;
// Objects
function planet(x, y, dy, dx, radius, color) {
	this.x = x;
	this.y = y;
	this.dy =dy;
	this.dx = dx
	this.radius = radius;
	this.color = color;
	this.right = true
	this.up = true

	this.grav = 3
	this.up_grav = 1.5
	this.update = function() {
	
		this.draw();
	};

	this.downRange = function(){

		if ( planetArr[1].y - this.y > 150){
			this.up = false
		}else if( this.y - planetArr[1].y > 150){
			this.up = true
		}else{
			return
		}
	}

	this.update2 = function(){
		
		this.downRange()
		if(this.right){
			this.x += this.grav;
			
			//idea: decrease the acceleation up to range values  and when == to range value turn around increase wen far away

			//for up and down movment
			if ( ! this.up ){ //reach a particular range start to turn around
				this.y += this.up_grav;
			}else{
				this.y -= this.up_grav;
			}

			//for right and left
			if ( this.x  - planetArr[1].x  > 350 ){
				this.right = false
			}

		}else{
			if ( planetArr[1].x  - this.x  > 350 ){
				this.right = true
			}
			this.x -= this.grav;
			//For up and down movement
			if ( ! this.up ){ //reach a particular range start to turn around
				this.y += this.up_grav;
			}else{
				this.y -= this.up_grav;
			}
		}

		this.draw()
	}
	//Draw planet
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}


// Implementation
var planet ;
var planetArr ;

function init() {
	planetArr = [];
	for(var i=0;i < 1; i++){
		
		var radius = randomIntFromRange(20,40);
		var x = randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(0, canvas.height - radius);
		var dx = randomIntFromRange(-2,2);
		var dy = randomIntFromRange(-2,2);
		var color = randomColor(colors);

		planetArr.push(new planet(200,200,0,0,radius,color));

		planetArr.push(new planet(500,200,0,0,radius,"Yellow"));
		
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	planetArr[0].update2()
	planetArr[1].update()
	
}

init();
animate();