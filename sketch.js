//Create variables here
var dog, happyDog, foodS = 0, foodStock;
var dogImg,happyDogImg,database;

var lastFed, fedTime,currentTime;
var foodObj;
var addFood, feedPet;

var getState,updateState;
var bedroom,washroom,garden;

var gameState;

function preload()
{
  //load images here
  
 
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  sadDogImg = loadImage("images/Lazy.png");

  bedroom = loadImage("images/Bed Room.png");
  washroom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");

  
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog = createSprite(250,400,50,50);
  //dog.addImage(dogImg);
  dog.scale=0.3;


  foodObj = new Food();


  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
  addFood = createButton("Add FOOD");
  addFood.position(100,20);
 addFood.mousePressed(addFoods);

  feedPet = createButton("Feed Pet");
  feedPet.position(300,20);
 feedPet.mousePressed(feedDog);

 var getStateref = database.ref('gameState');
 getStateref.on("value",function(data){
    gameState = data.val();
 })

 var FedTime = database.ref('feedTime');
 FedTime.on("value",function(data){
    lastFed = data.val();
 })

  
}

function draw() {  
  background(46, 139, 87);
  
  //drawSprites();

  currentTime = hour();
  foodObj.display();
 
  
if(gameState === "hungry"){
  dog.addImage(sadDogImg);
  feedPet.show();
  addFood.show();
    
}
else 
{
  feedPet.hide();
  addFood.hide();
  //dog.remove();
  
}
drawSprites();


if(currentTime === (lastFed + 1)){
  updateState("playing");
  foodObj.gardenTime();
}
if(currentTime === (lastFed + 1)){
  updateState("sleeping");
  foodObj.bedroomTime();
}
else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
  updateState("bathing");
  foodObj.washroomTime();
}
else {
  updateState("hungry");
  foodObj.display();
  //dog.addImage(sadDogImg);

}


}

function readStock(data){
  foodS = data.val();
  foodObj.foodStock = foodS;
  console.log(foodS);
}

function addFoods(){
  foodS +=1;
  database.ref('/').update({
    'Food' : foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
foodS--;
database.ref('/').update({
  'Food' : foodS,
  'feedTime' : hour(),
  'gameState': "hungry"
})

}

function updateState(state){

  database.ref('/').update({
    'gameState' : state
  })
}
