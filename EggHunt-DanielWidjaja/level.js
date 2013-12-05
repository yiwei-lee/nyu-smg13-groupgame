(function() {
  var physics,
      lastFrame = new Date().getTime();
  
  //initialization,
  var timer = 2000; 
  var eggs = new Array();
  var winlose ="";
  var level = 1;
  var theme="daniel";
  
  //game loop
  window.gameLoop = function() {
    var tm = new Date().getTime();
    requestAnimationFrame(gameLoop);
    var dt = (tm - lastFrame) / 1000;
    if(dt > 1/15) { dt = 1/15; }

    if (theme=="daniel")	{
    	var params = new Array();
        params['timer']=timer;
        params["winlose"]=winlose;
        params["level"]=level;
        physics.step(dt,theme,params);
        lastFrame = tm;
     
    	if (timer==0)	{
        	timer =-1;
        	winlose = "YOU LOSE";
        }
        else {
        	var wincheck=true;
        	
        	for (index = 0; index < eggs.length; ++index) {
        	    if (eggs[index].details.color != "orange"){
        	    	wincheck=false;
        	    }
        	}
        	if (timer!= -1 && wincheck==true)	{
        		level++;
        		if (level>10){
        			timer=-1;
        			winlose = "YOU WIN";
        		}
        		else	{
            		timer=2000+(level*500);	
        			init();

        		}
        	}
        	if (timer>0)	{timer --;}
	    }
    }
    else if (theme="else")	{
    	
    }
};

  function init() {
	  if (theme=="daniel")	{
		  var img = new Image();

		  // Wait for the image to load
		  //img.addEventListener("load", function() {

		  physics = window.physics = new Physics(document.getElementById("b2dCanvas"));

		  physics.collision();
	      // Create some walls
	      new Body(physics, { color: "blue", type: "static", x: 0, y: 0, height: 50,  width: 0.5 });
	      new Body(physics, { color: "blue", type: "static", x:51, y: 0, height: 50,  width: 0.5});
	      new Body(physics, { color: "blue", type: "static", x: 0, y: 0, height: 0.5, width: 120 });
	      new Body(physics, { color: "blue", type: "static", x: 0, y:25, height: 0.5, width: 120 });

	      eggs = new Array();

	      if (level==1){
	          eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2.5, x: 30, y: 10 });
	          new Body(physics, { color: "red", type: "static", x: 30, y:24.5, height: 0.5, width: 10 });
	          
	          new Body(physics, { color: "green", x: 1, y: 8 });
	          new Body(physics, { color: "green", x: 5, y: 8 });
	          new Body(physics, { color: "green", x: 5, y: 8 });
	      }
	      else if (level ==2){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 3, x: 10, y: 10 });
	    	  new Body(physics, { color: "red", type: "static", x: 30, y:24.5, height: 0.5, width: 10 });
	          
	    	  new Body(physics, { color: "green", shape: "polygon", 
	              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
	              x: 20, y: 5 });
	    	  new Body(physics, { color: "green", shape: "polygon", 
	              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 5 }, {x: -12, y: 3}   ],
	              x: 20, y: 5 });
	      }
	      else if (level ==3){
	    	  //create the eggs
	          eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 3, x: 10, y: 20 });
	          eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 3, x: 20, y: 20 });
	          
	          //create the plug - electrical source
	          new Body(physics, { color: "red", type: "static", x: 50, y:24.5, height: 0.5, width: 30 });

	          //create the blocks
	          new Body(physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
	          new Body(physics, { color: "green", x: 13, y: 8 });
	          new Body(physics, { color: "green", shape: "circle", radius: 2, x: 5, y: 20 });
	          new Body(physics, { color: "green", shape: "polygon", 
	                              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
	                              x: 20, y: 5 });
	      }
	      else if (level==4){
	    	  //create the eggs
	          eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 3, x: 10, y: 10 });
	          eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 3, x: 25, y: 10 });
	          
	          //create the plug - electrical source
	          new Body(physics, { color: "red", type: "static", x: 15, y:24.5, height: 0.5, width: 30 });

	          //create the blocks
	          new Body(physics, { color: "green", x: 13, y: 8 });
	          new Body(physics, { color: "green", shape: "polygon", 
	                              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
	                              x: 20, y: 5 });
	          new Body(physics, { color: "green", shape: "polygon", 
	              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
	              x: 20, y: 5 });

	      }
	      else if (level==5){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2.5, x: 40, y: 5 });
	    	  new Body(physics, { color: "red", type: "static", x: 5, y:24.5, height: 0.5, width: 10 });

	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 30, height: 0.5 });
	          new Body(physics, { color: "green", shape: "polygon", 
	              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
	              x: 20, y: 5 });
	  		  new Body(physics, { color: "green", shape: "polygon", 
	  			  points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
	  			  x: 20, y: 5 });     
	      }
	      else if (level==6){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2.5, x: 45, y: 10 });
	    	  eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 40, y: 15 });
	    	  
	    	  new Body(physics, { color: "red", type: "static", x: 1, y:24.5, height: 10, width: 0.5 });
	    	  
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 30, height: 0.5 });
	      }
	      else if (level==7){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 5 });
	    	  eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 15 });
	    	  
	    	  new Body(physics, { color: "red", type: "static", x: 20, y:24.5, height: 10, width: 0.5 });
	     	 
	    	  new Body(physics, { color: "blue", type: "static", x: 40, y:10, height: 0.5, width: 25 });
	    	  
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });
	    	  
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
	    	  
	      }
	      else if (level==8){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 5 });
	    	  eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 15 });
	    	  eggs[2] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 35, y: 10 });
	    	  
	    	  new Body(physics, { color: "red", type: "static", x: 10, y:24.5, height: 10, width: 5 });
	      	 
	    	  new Body(physics, { color: "blue", type: "static", x: 15, y:24.5, height: 25, width: 0.5 });
	    	 
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });
	    	  
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
	    	  
	      }
	      else if (level==9){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 5 });
	    	  eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 15 });
	    	  
	    	  new Body(physics, { color: "red", type: "static", x: 20, y:24.5, height: 10, width: 0.5 });
	      	 
	    	  new Body(physics, { color: "blue", type: "static", x: 30, y:10, height: 0.5, width: 30 });
	    	  new Body(physics, { color: "blue", type: "static", x: 40, y:10, height: 10, width: 0.5 });
	     	
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 8, height: 0.5 });    	  
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
	    	  
	    	  new Body(physics, { color: "green", x: 4, y: 15, width: 30, height: 0.5 });    	  
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 10, height: 0.5 });
	    	
	      }
	      else if (level==10){
	    	  eggs[0] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 40, y: 5 });
	    	  eggs[1] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 40, y: 15 });
	    	  eggs[2] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 30, y: 10 });
	    	  eggs[3] = new Body(physics, { color: "pink", type: "static", shape: "circle", radius: 2, x: 45, y: 10 });
	    	  
	    	  
	    	  
	    	  new Body(physics, { color: "red", type: "static", x: 0.5, y:10, height: 0.5, width: 10 });
	      	 
	    	  new Body(physics, { color: "blue", type: "static", x: 38, y:10, height: 0.5, width: 18 });
	    	  new Body(physics, { color: "blue", type: "static", x: 40, y:10, height: 10, width: 0.5 });
	     	
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 10, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 9, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 9, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 9, height: 0.5 });
	    	  new Body(physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
	    	  

	      }
	      
	      physics.dragNDrop();
	      requestAnimationFrame(gameLoop);
	    //});

	    //img.src = "bricks.jpg";
	  
	  }
	  
  }

  window.addEventListener("load",init);
}());

//Lastly, add in the `requestAnimationFrame` shim, if necessary. Does nothing 
//if `requestAnimationFrame` is already on the `window` object.
(function() {
 var lastTime = 0;
 var vendors = ['ms', 'moz', 'webkit', 'o'];
 for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
     window.cancelAnimationFrame = 
       window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
 }

 if (!window.requestAnimationFrame) {
     window.requestAnimationFrame = function(callback, element) {
         var currTime = new Date().getTime();
         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
         var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
           timeToCall);
         lastTime = currTime + timeToCall;
         return id;
     };
 }

 if (!window.cancelAnimationFrame) {
     window.cancelAnimationFrame = function(id) {
         clearTimeout(id);
     };
 }
}());
