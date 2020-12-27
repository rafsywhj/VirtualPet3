class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/Milk.png');
    
    }

    updateFoodStock(obj){
      database.ref('/').update({
        'Food' : obj
      })
      
    }

    bedroomTime(){
      background(bedroom);
    }

    washroomTime(){
      background(washroom);
    }

    gardenTime(){
      background(garden);
    }


    display(){
      var x=80;
      var y=100;
      console.log(this.foodStock);
      
      imageMode(CENTER);
      image(this.image,165,320,50,50);
      
      if(this.foodStock!== 0){
      
        for(var i=0;i<this.foodStock;i++){
          if(i%10 == 0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }


   

}



