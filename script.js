//defining canvas
const canvasHeight=Math.round(0.75*screen.availHeight)
const canvasWidth= Math.round(screen.availWidth)
const canvas= document.getElementById("canvas")
canvas.height=canvasHeight;
canvas.width=canvasWidth;
const c= canvas.getContext('2d')
//sprites
var batSprites={
    fly:[document.getElementById("BatFly1"),document.getElementById("BatFly2"),document.getElementById("BatFly3"),document.getElementById("BatFly4"),document.getElementById("BatFly5"),document.getElementById("BatFly6"),document.getElementById("BatFly7")],
    attack:[document.getElementById("batAttack1"),document.getElementById("batAttack2"),document.getElementById("batAttack3"),document.getElementById("batAttack4"),document.getElementById("batAttack5"),document.getElementById("batAttack6"),document.getElementById("batAttack7")],
    die:[document.getElementById("BatDie1"),document.getElementById("BatDie2"),document.getElementById("BatDie3"),document.getElementById("BatDie4"),document.getElementById("BatDie5"),document.getElementById("BatDie6"),document.getElementById("BatDie7")],
    hurt:[document.getElementById("batHurt1"),document.getElementById("batHurt2"),document.getElementById("batHurt3"),document.getElementById("batHurt4"),document.getElementById("batHurt5"),document.getElementById("batHurt6"),document.getElementById("batHurt7")],  
}
var playerSprite={
    left:{
        attack:[document.getElementById("playerAttackLeft1"),document.getElementById("playerAttackLeft2"),document.getElementById("playerAttackLeft3"),document.getElementById("playerAttackLeft4"),document.getElementById("playerAttackLeft5"),document.getElementById("playerAttackLeft6"),document.getElementById("playerAttackLeft7"),document.getElementById("playerAttackLeft8"),document.getElementById("playerAttackLeft9"),document.getElementById("playerAttackLeft10")],
    hurt:[document.getElementById("playerHurt1"),document.getElementById("playerHurtLeft2"),document.getElementById("playerHurtLeft3"),document.getElementById("playerHurtLeft4"),document.getElementById("playerHurtLeft5"),document.getElementById("playerHurtLeft6"),document.getElementById("playerHurtLeft7"),document.getElementById("playerHurtLeft8"),document.getElementById("playerHurtLeft9"),document.getElementById("playerHurtLeft10")],
    idle:[document.getElementById("playerIdleLeft1"),document.getElementById("playerIdleLeft2"),document.getElementById("playerIdleLeft3"),document.getElementById("playerIdleLeft4"),document.getElementById("playerIdleLeft5"),document.getElementById("playerIdleLeft6"),document.getElementById("playerIdleLeft7"),document.getElementById("playerIdleLeft8"),document.getElementById("playerIdleLeft9"),document.getElementById("playerIdleLeft10")],
    run:[document.getElementById("playerRunLeft1"),document.getElementById("playerRunLeft2"),document.getElementById("playerRunLeft3"),document.getElementById("playerRunLeft4"),document.getElementById("playerRunLeft5"),document.getElementById("playerRunLeft6"),document.getElementById("playerRunLeft7"),document.getElementById("playerRunLeft8"),document.getElementById("playerRunLeft9"),document.getElementById("playerRunLeft10")],
    },
    right:{
        attack:[document.getElementById("playerAttack1"),document.getElementById("playerAttack2"),document.getElementById("playerAttack3"),document.getElementById("playerAttack4"),document.getElementById("playerAttack5"),document.getElementById("playerAttack6"),document.getElementById("playerAttack7"),document.getElementById("playerAttack8"),document.getElementById("playerAttack9"),document.getElementById("playerAttack10")],
    hurt:[document.getElementById("playerHurt1"),document.getElementById("playerHurt2"),document.getElementById("playerHurt3"),document.getElementById("playerHurt4"),document.getElementById("playerHurt5"),document.getElementById("playerHurt6"),document.getElementById("playerHurt7"),document.getElementById("playerHurt8"),document.getElementById("playerHurt9"),document.getElementById("playerHurt10")],
    idle:[document.getElementById("playerIdle1"),document.getElementById("playerIdle2"),document.getElementById("playerIdle3"),document.getElementById("playerIdle4"),document.getElementById("playerIdle5"),document.getElementById("playerIdle6"),document.getElementById("playerIdle7"),document.getElementById("playerIdle8"),document.getElementById("playerIdle9"),document.getElementById("playerIdle10")],
    run:[document.getElementById("playerRun1"),document.getElementById("playerRun2"),document.getElementById("playerRun3"),document.getElementById("playerRun4"),document.getElementById("playerRun5"),document.getElementById("playerRun6"),document.getElementById("playerRun7"),document.getElementById("playerRun8"),document.getElementById("playerRun9"),document.getElementById("playerRun10")],
 
    }
}

var expSprite=[document.getElementById("exp1"),document.getElementById("exp2"),document.getElementById("exp3"),document.getElementById("exp4"),document.getElementById("exp5"),document.getElementById("exp6"),document.getElementById("exp7"),document.getElementById("exp8"),document.getElementById("exp9"),document.getElementById("exp10"),document.getElementById("exp11"),document.getElementById("exp12"),document.getElementById("exp13"),document.getElementById("exp14")]
var bombFrame=0

//Objects
var bat={
    health:1000,
    x:200,
    y:50,
    dx:5,
    dy:7,
    size:200
}
var player={
    health:1000,
    x:100,
    y:480,
    dx:0,
    dy:0,
    size:150
}
var bomb={
    active:true,
    x:100,
    y:500,
    dx:5,
    dy:5,
    size:100,
    exploding:true
}
//variables
var currentBatStatus=batSprites.hurt
var currentBatFrame=0
var currentPlayerDir=playerSprite.left
var currentPlayerStatus=currentPlayerDir.attack
var currentPlayerFrame=0
var selector=0
var bombImg=document.getElementById("bomb")
for(i in expSprite){console.log(expSprite[i])}
//animation

function animate(){
updateBat()
updatePlayer()
c.clearRect(0, 0, canvasWidth, canvasHeight);
if(bomb.active)
{drawBomb()}

physics()
drawBat()
drawPlayer()
movePlayer()
drawBomb()
moveBat()
window.addEventListener("keydown", function(event){control(event.keyCode)} ,true)
}

//update function
function updateBat(){
    currentBatFrame=++currentBatFrame%currentBatStatus.length
}
function updatePlayer(){
    currentPlayerFrame=++currentPlayerFrame%currentPlayerStatus.length
}

//draw function
function drawBomb(){
    c.translate(bomb.x,bomb.y);
   if(bomb.exploding){
    if(bombFrame<65){
console.log(bombFrame)
        c.drawImage(expSprite[Math.round(bombFrame/5)],-bomb.size,-bomb.size,2*bomb.size,2*bomb.size)
    bombFrame++}
    else{
        bomb.active=false
        bomb.exploding=false
        bombFrame=0
    }
    }
   
   else{
    c.drawImage(bombImg, -bomb.size/2,-bomb.size/2,bomb.size,bomb.size)
    if(bomb.x+bomb.size/2>canvasWidth||bomb.x-bomb.size/2<=0){bomb.dx=-bomb.dx}
    if(bomb.y+bomb.size/2>canvasHeight||bomb.y-bomb.size/2<=0){bomb.dy=-bomb.dy;
    bomb.exploding=true}
    bomb.x+=bomb.dx
    bomb.y+=bomb.dy}
    c.setTransform(1, 0, 0, 1, 0, 0)
}
function drawBat(){
    c.translate( bat.x,canvasHeight/2-bat.size);
    c.drawImage(currentBatStatus[currentBatFrame], -bat.size/2, batMovement(bat.x),bat.size,bat.size)
    c.setTransform(1, 0, 0, 1, 0, 0)       
}
function drawPlayer(){
    if(player.dx==0){
        currentPlayerStatus=currentPlayerDir.idle
    }
    c.translate(player.x, player.y);
    c.drawImage(currentPlayerStatus[currentPlayerFrame], -player.size/2, -player.size/2,player.size,player.size)
    c.setTransform(1, 0, 0, 1, 0, 0)       
}
//movePlayer
function movePlayer(){
    if(player.x-(player.size/2)<=0){
        player.dx=Math.round(0.1*Math.abs(player.dx)) 
        }
        if(player.x+(player.size/2)>canvasWidth){
            player.dx=-Math.round(0.1*Math.abs(player.dx))
        }
        if(player.y-(player.size/2)<0){
        player.dy=10}
        if(player.y+(player.size/2)>=canvasHeight){
            player.dy=-Math.round(0.1*Math.abs(player.dy))}          
player.x+=player.dx
player.y+=player.dy
}
function moveBat(){
    if(bat.x+bat.size/2>canvasWidth){
        bat.dx=-Math.abs(bat.dx) 
        selector=Math.round(Math.random()*2)   
    }
    if(bat.x-bat.size/2<0){
        bat.dx= Math.abs(bat.dx) 
        selector=Math.round(Math.random()*2) 
    }
    bat.x+=bat.dx
}
function batMovement(x){
if(selector==0){
    return 180*Math.sin(bat.x/50)
}
if(selector==1){
    return 180*Math.cos(bat.x/50)
}
}
setInterval(animate,50)
function control(p){
        
    switch(p) {
        case 32://space
        if(bat.x<player.x){
        currentPlayerDir=playerSprite.left}
        if(bat.x>=player.x){
            currentPlayerDir=playerSprite.right}
        currentPlayerStatus=currentPlayerDir.attack
        break
        case 37:// left key
          {player.dx=-20;
        
            currentPlayerDir=playerSprite.left
            currentPlayerStatus=currentPlayerDir.run
        break;}
        case 38:// up key
        if(player.y>canvasHeight-100)    
        {player.dy=-62;
        }
        break;
        case 39:// right key
        player.dx=20
        currentPlayerDir=playerSprite.right
        currentPlayerStatus=currentPlayerDir.run
        break;  
        //case 40:// down key
        //player.dy=12
        //break;
      }   
    }
    function physics(){
        //gravity
        
           player.dy+=6
        //friction
        //if(player.y>canvasHeight-100){
        //player.dx=Math.round(0.9*player.dx)}
    }