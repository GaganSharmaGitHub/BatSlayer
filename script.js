//defining canvas
const canvasHeight=Math.round(window.innerHeight)
const canvasWidth= Math.round(screen.availWidth)
const canvas= document.getElementById("GameCanvas")
canvas.height=canvasHeight;
canvas.width=canvasWidth;
const c= canvas.getContext('2d')
//joystick
var joystick	= new VirtualJoystick({
    container	: document.getElementById('joystickCont'),
    mouseSupport	: true,
    limitStickTravel: true,
    stickRadius:80,

});
//sprites
var batSprites={
    fly:[document.getElementById("BatFly1"),document.getElementById("BatFly2"),document.getElementById("BatFly3"),document.getElementById("BatFly4"),document.getElementById("BatFly5"),document.getElementById("BatFly6"),document.getElementById("BatFly7")],
    attack:[document.getElementById("batAttack1"),document.getElementById("batAttack2"),document.getElementById("batAttack3"),document.getElementById("batAttack4"),document.getElementById("batAttack5"),document.getElementById("batAttack6"),document.getElementById("batAttack7")],
    die:[document.getElementById("BatDie1"),document.getElementById("BatDie2"),document.getElementById("BatDie3"),document.getElementById("BatDie4"),document.getElementById("BatDie5"),document.getElementById("BatDie6"),document.getElementById("BatDie7")],
    hurt:[document.getElementById("batHurt1"),document.getElementById("batHurt2"),document.getElementById("batHurt3"),document.getElementById("batHurt4"),document.getElementById("batHurt5"),document.getElementById("batHurt6"),document.getElementById("batHurt7")],  
}
var playerSprite={
    left:{
    swordEffect:[document.getElementById("swordEffL1"),document.getElementById("swordEffL2"),document.getElementById("swordEffL3")],
    attack:[document.getElementById("playerAttackLeft1"),document.getElementById("playerAttackLeft2"),document.getElementById("playerAttackLeft3"),document.getElementById("playerAttackLeft4"),document.getElementById("playerAttackLeft5"),document.getElementById("playerAttackLeft6"),document.getElementById("playerAttackLeft7"),document.getElementById("playerAttackLeft8"),document.getElementById("playerAttackLeft9"),document.getElementById("playerAttackLeft10")],
    hurt:[document.getElementById("playerHurt1"),document.getElementById("playerHurtLeft2"),document.getElementById("playerHurtLeft3"),document.getElementById("playerHurtLeft4"),document.getElementById("playerHurtLeft5"),document.getElementById("playerHurtLeft6"),document.getElementById("playerHurtLeft7"),document.getElementById("playerHurtLeft8"),document.getElementById("playerHurtLeft9"),document.getElementById("playerHurtLeft10")],
    idle:[document.getElementById("playerIdleLeft1"),document.getElementById("playerIdleLeft2"),document.getElementById("playerIdleLeft3"),document.getElementById("playerIdleLeft4"),document.getElementById("playerIdleLeft5"),document.getElementById("playerIdleLeft6"),document.getElementById("playerIdleLeft7"),document.getElementById("playerIdleLeft8"),document.getElementById("playerIdleLeft9"),document.getElementById("playerIdleLeft10")],
    run:[document.getElementById("playerRunLeft1"),document.getElementById("playerRunLeft2"),document.getElementById("playerRunLeft3"),document.getElementById("playerRunLeft4"),document.getElementById("playerRunLeft5"),document.getElementById("playerRunLeft6"),document.getElementById("playerRunLeft7"),document.getElementById("playerRunLeft8"),document.getElementById("playerRunLeft9"),document.getElementById("playerRunLeft10")],
    },
    right:{
        swordEffect:[document.getElementById("swordEffect1"),document.getElementById("swordEffect2"),document.getElementById("swordEffect3")],
    attack:[document.getElementById("playerAttack1"),document.getElementById("playerAttack2"),document.getElementById("playerAttack3"),document.getElementById("playerAttack4"),document.getElementById("playerAttack5"),document.getElementById("playerAttack6"),document.getElementById("playerAttack7"),document.getElementById("playerAttack8"),document.getElementById("playerAttack9"),document.getElementById("playerAttack10")],
    hurt:[document.getElementById("playerHurt1"),document.getElementById("playerHurt2"),document.getElementById("playerHurt3"),document.getElementById("playerHurt4"),document.getElementById("playerHurt5"),document.getElementById("playerHurt6"),document.getElementById("playerHurt7"),document.getElementById("playerHurt8"),document.getElementById("playerHurt9"),document.getElementById("playerHurt10")],
    idle:[document.getElementById("playerIdle1"),document.getElementById("playerIdle2"),document.getElementById("playerIdle3"),document.getElementById("playerIdle4"),document.getElementById("playerIdle5"),document.getElementById("playerIdle6"),document.getElementById("playerIdle7"),document.getElementById("playerIdle8"),document.getElementById("playerIdle9"),document.getElementById("playerIdle10")],
    run:[document.getElementById("playerRun1"),document.getElementById("playerRun2"),document.getElementById("playerRun3"),document.getElementById("playerRun4"),document.getElementById("playerRun5"),document.getElementById("playerRun6"),document.getElementById("playerRun7"),document.getElementById("playerRun8"),document.getElementById("playerRun9"),document.getElementById("playerRun10")],
 
    }
}

var expSprite=[document.getElementById("exp1"),document.getElementById("exp2"),document.getElementById("exp3"),document.getElementById("exp4"),document.getElementById("exp5"),document.getElementById("exp6"),document.getElementById("exp7"),document.getElementById("exp8"),document.getElementById("exp9"),document.getElementById("exp10"),document.getElementById("exp11"),document.getElementById("exp12"),document.getElementById("exp13"),document.getElementById("exp14")]
var bombFrame=0
var hit=false
//Objects
var bat={
    health:1000,
    x:200,
    y:50,
    dx:5,
    dy:7,
    size:300
}
var player={
    health:500,
    x:100,
    y:480,
    dx:0,
    dy:0,
    size:150,
    attacking:false,
    hurt:false,
}
var bomb={
    active:true,
    x:Math.round(Math.random()*(canvasWidth-200))+200,
    y:100,
    dx:2,
    dy:16,
    size:100,
    exploding:false
}

//variables
var currentBatStatus=batSprites.fly
var currentBatFrame=0
var currentPlayerDir=playerSprite.left
var currentPlayerStatus=currentPlayerDir.attack
var currentPlayerFrame=0
var selector=0
var bombImg=document.getElementById("bomb")
var tempPlayerFrame=0
var gameScreen=null
var pauseScreen=null
//animation

function animate(){
    if(player.health<0){
        document.getElementById("message").innerHTML="Game Over"
        setTimeout(function(){ 
            document.getElementById("newGame").style.display="none"
            document.getElementById("tryAgain").style.display="block"
            document.getElementById("popUpScreen").style.display="block"
            document.getElementById("gameOver").innerHTML="Game Over"
            return
         }, 1500);
         if(bat.health<0){
            document.getElementById("message").innerHTML="Game Over"
            setTimeout(function(){ 
                document.getElementById("newGame").style.display="none"
                document.getElementById("tryAgain").style.display="block"
                document.getElementById("popUpScreen").style.display="block"
                document.getElementById("gameOver").innerHTML="Wow! you finished the game!!"
                return
             }, 1500);
    }
updateBat()
updatePlayer()
c.clearRect(0, 0, canvasWidth, canvasHeight);
physics()
drawBat()
drawPlayer()
movePlayer()
if(!bomb.active){
    bomb.active=true
    bomb.x=Math.round(Math.random()*(canvasWidth-200))+200
    bomb.y=100
    bomb.dy=15
}
if(bomb.active){drawBomb()}
moveBat()
touchControls()
window.addEventListener("keydown", function(event){control(event.keyCode)} ,true)
}

//update function
function updateBat(){
    currentBatFrame=++currentBatFrame%currentBatStatus.length
    document.getElementById("batAvatar").src=batSprites.fly[currentBatFrame].src
document.getElementById("batHealthBar").innerHTML=bat.health
document.getElementById("batHealthBar").style.width=(bat.health/10)+"%"

}
function updatePlayer(){
    currentPlayerFrame=++currentPlayerFrame%currentPlayerStatus.length
    document.getElementById("playerAvatar").src=playerSprite.right.idle[currentPlayerFrame].src
}

//draw function
function drawBomb(){
    c.translate(bomb.x,bomb.y);
   if(bomb.exploding){
    if(bombFrame<65){
        c.drawImage(expSprite[Math.round(bombFrame/5)],-bomb.size,-bomb.size,2*bomb.size,2*bomb.size)
    bombFrame++}
    else{
        bomb.active=false
        bomb.exploding=false
        bombFrame=0
        currentPlayerStatus=currentPlayerDir.idle
        
    }}
   else{
    c.drawImage(bombImg, -bomb.size/2,-bomb.size/2,bomb.size,bomb.size)
    if(bomb.x>canvasWidth+bomb.size||bomb.x-bomb.size/2<=0){bomb.dx=-bomb.dx}
    if(bomb.y>=canvasHeight){bomb.dy=0;
    bomb.exploding=true}
    if(Math.abs(bomb.x-player.x)<player.size/2&&Math.abs(bomb.y-player.y)<player.size/2){
        bomb.exploding=true
        player.health-=200
        document.getElementById("playerHealthBar").innerHTML=player.health
        document.getElementById("playerHealthBar").style.width=(player.health/5)+"%"
        player.hurt=true
    }
    bomb.x+=bomb.dx
    bomb.y+=bomb.dy}
    c.setTransform(1, 0, 0, 1, 0, 0)
}
function drawBat(){
    batMovement(bat.x)
    c.translate( bat.x,bat.y,bat.size);
    c.drawImage(currentBatStatus[currentBatFrame], -bat.size/2, -bat.size/2,bat.size,bat.size)
    c.setTransform(1, 0, 0, 1, 0, 0)       
}
function drawPlayer(){
    if(player.dx==0){
        currentPlayerStatus=currentPlayerDir.idle
    }
    if(player.dx>0){
        currentPlayerDir=playerSprite.right
        currentPlayerStatus=currentPlayerDir.run
    }
    if(player.dx<0){
        currentPlayerDir=playerSprite.left
        currentPlayerStatus=currentPlayerDir.run
    }
    if(player.hurt)
    {
        if(tempPlayerFrame>30){
            player.hurt=false
            tempPlayerFrame=0
            
         currentPlayerStatus=currentPlayerDir.run
        }
     else{currentPlayerStatus=currentPlayerDir.hurt
    tempPlayerFrame++
     }
    }

    if(player.attacking)
    {    
        if(bat.x<player.x){
            currentPlayerDir=playerSprite.left}
        if(bat.x>=player.x){
            currentPlayerDir=playerSprite.right}
     currentPlayerStatus=currentPlayerDir.attack
     attack()
    tempPlayerFrame++
    if(tempPlayerFrame>10){
        player.attacking=false
        currentBatStatus=batSprites.fly
        tempPlayerFrame=0
        hit=false

     currentPlayerStatus=currentPlayerDir.run
    }
    }
    else{
    hit=false
    player.attacking=false
        currentBatStatus=batSprites.fly
}
   
c.translate(player.x, player.y);
    c.drawImage(currentPlayerStatus[currentPlayerFrame], -player.size/2, -player.size/2,player.size,player.size)
    if(hit){
        c.drawImage(currentPlayerDir.swordEffect[Math.round(currentPlayerFrame/10)], (currentPlayerDir==playerSprite.left)?-100:0, -player.size*0.7,100,player.size)}
    c.setTransform(1, 0, 0, 1, 0, 0)       
}
//movePlayer
function movePlayer(){
    if(player.x-(player.size/2)<0){
            player.x=player.size/2
            player.dx=0
        }
        if(player.x+(player.size/2)>canvasWidth){
            player.x=canvasWidth-player.size/2
            player.dx=0
        }
        if(player.y-(player.size/2)<0){
        player.dy=10}
        if(player.y+(player.size/2)>canvasHeight){
            player.y=canvasHeight-player.size/2
        player.dy=0}          
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
    bat.y= 100*Math.sin(bat.x/50)+350*(bat.health/1000)
}
if(selector==1){
    bat.y= 100*Math.cos(bat.x/50)+350*(bat.health/1000)
}
else{
    bat.y= 100*Math.cos(bat.x/50)+350*(bat.health/1000)
}

}
//attacks
function attack(){
 if(Math.abs(player.x-bat.x)<=bat.size/2&&Math.abs(player.y-bat.y)<=bat.size/2)
{bat.health-=10
    currentBatStatus=batSprites.hurt

hit=true
}
}
function newGame()
{ player.health=500
    bat.health=1000
    document.getElementById("popUpScreen").style.display="none"
setInterval(animate,50)

  
}
function control(p){
    if(p==32)//space
    {player.attacking=true}
    switch(p) {
        case 37:// left key
          {player.dx=-20;
            player.attacking=false
        break;}
        case 38:// up key
        if(player.y>canvasHeight-100)    
        {player.dy=-62;
        }
        break;
        case 39:// right key
        player.dx=20
        player.attacking=false
        break;  
        case 40:// down key
        //player.dy=0
        player.dx=0
        break;
      }  
    }
    function touchControls(){
        if(joystick.up()){
            if(player.y>canvasHeight-100)    
            {player.dy=-62;
            }
        }
        if(joystick.right()){
            player.dx=20
            player.attacking=false
          } 
        
          if(joystick.left()){
            player.dx=-20
            player.attacking=false
          } 
        document.getElementById("attackBt").addEventListener("click",function (){player.attacking=true})
        
    }
    function physics(){
        //gravity
        
           
        //friction
        if(player.y<canvasHeight-player.size/2){
            player.dy+=6}
            if(player.y>=canvasHeight-player.size/2){
       player.dx=Math.floor(0.9*player.dx)
       if(player.dx<-1&&player.dx>-10){player.dx=0
    //console.log(true)
       }
    //console.log("speed"+player.dx)
    }
    }