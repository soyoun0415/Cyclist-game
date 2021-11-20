var path,mainCyclist;
var jugador1,jugador2,jugador3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var juegoTerminadoImg,cycleBell;

var rosaC, amarilloC,rojoC; 

var END =0;
var PLAY =1;
var estadoJuego = PLAY;

var distancia=0;
var juegoTerminado, reiniciar;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  juegoTerminadoImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Fondo en movimiento
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//crear el niño que corre
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//establece el colisionador para el mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
juegoTerminado = createSprite(650,150);
juegoTerminado.addImage(juegoTerminadoImg);
juegoTerminado.scale = 0.8;
juegoTerminado.visible = false;  
  
rosaC = new Group();
amarilloC = new Group();
rojoC = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distancia,900,30);
  
  if(estadoJuego===PLAY){
    
   distancia = distancia + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distancia/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(rosaC.isTouching(mainCyclist)){
     estadoJuego = END;
     jugador1.velocityY = 0;
      jugador1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(amarilloC.isTouching(mainCyclist)){
      estadoJuego = END;
       jugador2.velocityY = 0;
       jugador2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(rojoC.isTouching(mainCyclist)){
      estadoJuego = END;
      jugador3.velocityY = 0;
       jugador3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (estadoJuego === END) {
    juegoTerminado.visible = true;
  textSize(20);
  fill(255);
    //Agrega aquí el código para mostrar la instrucción de reinicio del juego, en forma de texto
  text("¡Presione la tecla de flecha hacia arriba para reiniciar el juego!",500,200);
  
  

  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    rosaC.setVelocityXEach(0);
    rosaC.setLifetimeEach(-1);
  
    amarilloC.setVelocityXEach(0);
    amarilloC.setLifetimeEach(-1);
  
    rojoC.setVelocityXEach(0);
    rojoC.setLifetimeEach(-1);

    //escribe la condición para llamar reset( )
  
  if(keyDown("UP_ARROW")){
    reinicio();
  }
}
}

function pinkCyclists(){
         jugador1 =createSprite(1100,Math.round(random(50, 250)));
         jugador1.scale =0.06;
        jugador1.velocityX = -(6 + 2*distancia/150);
        jugador1.addAnimation("opponentPlayer1",oppPink1Img);
         jugador1.setLifetime=170;
        rosaC.add(jugador1);
}

function yellowCyclists(){
        jugador2 =createSprite(1100,Math.round(random(50, 250)));
         jugador2.scale =0.06;
        jugador2.velocityX = -(6 + 2*distancia/150);
         jugador2.addAnimation("opponentPlayer2",oppYellow1Img);
         jugador2.setLifetime=170;
        amarilloC.add(jugador2);
}

function redCyclists(){
         jugador3 =createSprite(1100,Math.round(random(50, 250)));
         jugador3.scale =0.06;
         jugador3.velocityX = -(6 + 2*distancia/150);
         jugador3.addAnimation("opponentPlayer3",oppRed1Img);
         jugador3.setLifetime=170;
         rojoC.add(jugador3);
}

//crea aquí la función de reinicio
function reinicio(){
  estadoJuego = PLAY;
  juegoTerminado.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  rosaC.destroyEach();
  amarilloC.destroyEach();
  rojoC.destroyEach();
  distancia = 0;
  
}
