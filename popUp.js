var batPopU=[document.getElementById("BatFly1"),document.getElementById("BatFly2"),document.getElementById("BatFly3"),document.getElementById("BatFly4"),document.getElementById("BatFly5"),document.getElementById("BatFly6"),document.getElementById("BatFly7"),document.getElementById("batAttack1"),document.getElementById("batAttack2"),document.getElementById("batAttack3"),document.getElementById("batAttack4"),document.getElementById("batAttack5"),document.getElementById("batAttack6"),document.getElementById("batAttack7")]
var guy =[document.getElementById("playerAttack1"),document.getElementById("playerAttack2"),document.getElementById("playerAttack3"),document.getElementById("playerAttack4"),document.getElementById("playerAttack5"),document.getElementById("playerAttack6"),document.getElementById("playerAttack7"),document.getElementById("playerAttack8"),document.getElementById("playerAttack9"),document.getElementById("playerAttack10"),document.getElementById("playerIdle1"),document.getElementById("playerIdle2"),document.getElementById("playerIdle3"),document.getElementById("playerIdle4"),document.getElementById("playerIdle5"),document.getElementById("playerIdle6"),document.getElementById("playerIdle7"),document.getElementById("playerIdle8"),document.getElementById("playerIdle9"),document.getElementById("playerIdle10")]
var guyFrame=0
var batFrame=0
var guyCanvas=document.getElementById("playerOnPopUp")  
var batCanvas=document.getElementById("batOnPopUp")     
var c1=guyCanvas.getContext('2d');
var c2=batCanvas.getContext('2d');
c1.width=150
c2.width=150
c2.translate(c2.width, 0);
c2.scale(-1, 1);
function drawPop() {
    if(document.getElementById("popUpScreen").style.display!="none"){c1.clearRect(0, 0, 200, 200);
    c1.drawImage(guy[guyFrame], 0, 0, 150, 150);
    guyFrame=++guyFrame%guy.length
    c2.clearRect(0, 0, -200, 200);
    c2.drawImage(batPopU[batFrame], -150, 0, 150, 150);
    batFrame=++batFrame%batPopU.length}
    else{return}
}
setInterval(drawPop,100)