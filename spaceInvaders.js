const cvs = document.getElementById("spaceInvaders");
const ctx = cvs.getContext('2d');

const user = {
    
    x:cvs.width/2,
    y:380,
    width:20,
    height:10,
    color:"SKYBLUE",
    score:0
}

const shieldP = {
    x:0,
    y:0,
    width:10,
    height:10,
    color:"GREEN"
}

const gameState = {
    direction:1,
    wallL:0,
    wallR:0
}

function createShield(xPos,yPos) {
    var ext = 0;
    for(let i = 0;i<=5;i++){
        drawRect(shieldP.x+xPos+ext,shieldP.y+yPos,shieldP.width,shieldP.height,shieldP.color);    
        ext = ext + 10;
    }
}

var shield = [
    {   
        width:10,     
        height:10,
        color:"Green"
    }
];

var direction = 1;

//enemy function
var invaders = function(x,y,speed,drop) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.drop = drop;
    this.update = function() {
        //introducing artificial pausing with timeGame
        if(timeGame > 15) {
            
            //When any of the invaders collide with the right wall, 
            //they will drop and reverse direction
            if(this.x > cvs.width - 10) {
                gameState.wallR = 1;
                for(var i=0; i<enemies.length; i++) {
                    enemies[i].y = enemies[i].y + this.drop;   
                }           
            }
            if(gameState.direction == 1) {
                this.x = this.x + this.speed;
            }
            else if(gameState.direction == 0) {
                this.x = this.x - this.speed;
            }
            //When any of the invaders collide with left wall,
            //they will drop. Reverse taken care of in above code
            if(this.x < 0) {
                gameState.wallL = 1;
                for(var i=0; i<enemies.length; i++) {
                    enemies[i].y = enemies[i].y + this.drop;
                } 
            }
            
        }
        //draw enemy
        drawRect(this.x,this.y,10,10,"PINK");    
    }
}



//enemy array
var enemies = [];
//loop for creating enemies
for(var j=0; j<5; j++) {
    for(var i=0; i<11; i++) {
        enemies[i+11*j] = new invaders(100+30*i,50+30*j,2,1);
    }
}

var timeGame = 30;

function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y);
}
function render() {
    drawRect(0,0,cvs.width,cvs.height,"BLACK");
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(shield[0].x,shield[0].y,shield[0].width,shield[0].height,shield[0].color);
}


function update() {
    
}

function game(){
    update();
    render();
    window.setInterval(function() {
        
    },3000);
    /*if(enemies.length >= 10 && enemies.length < 24)
        for(var i=0;i<enemies.length;i++){
            enemies[i].speed = 4;
    }
    if(enemies.length < 11)
        for(var i=0;i<enemies.length;i++){
            enemies[i].speed = 6;
    }*/
    if(gameState.wallR == 1) {
        if(gameState.direction == 1) {
            gameState.direction = 0;
            gameState.wallR = 0;
        }
    } 
    
    if(gameState.wallL == 1) {
        if(gameState.direction == 0) {
            gameState.direction = 1;
            gameState.wallL = 0;
        }
    }
          
    //enabling the enemy creation and update loop for them
    
    for(var i=0; i<enemies.length; i++) {
        enemies[i].update();
    }
    //seeing if I can modify the pacing, especially later when less enemies on screen
    if(timeGame == 0)
        timeGame = 30;
    //if(timeGame < 5)
        timeGame = timeGame - 1;
    //createShield(200,200);
    
    
    
}

const framePerSecond = 50;
setInterval(game,1000/framePerSecond);
