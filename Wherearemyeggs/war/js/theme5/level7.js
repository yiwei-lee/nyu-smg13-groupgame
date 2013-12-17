var collectedDecoration = new Array("0","0","0");
function level7(){
	var levelNumber =7;
	
	(function () {
  var b2Vec2 = Box2D.Common.Math.b2Vec2;
  var b2BodyDef = Box2D.Dynamics.b2BodyDef;
  var b2Body = Box2D.Dynamics.b2Body;
  var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  var b2Fixture = Box2D.Dynamics.b2Fixture;
  var b2World = Box2D.Dynamics.b2World;
  var b2MassData = Box2D.Collision.Shapes.b2MassData;
  var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
  var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


  var Physics = window.Physics = function(element,scale) {
    var gravity = new b2Vec2(0,9.8);
    this.world = new b2World(gravity, true);
    this.element = element;
    this.context = element.getContext("2d");
    this.scale = scale || 20;
    this.dtRemaining = 0;
    this.stepAmount = 1/60;
  };
  var destroyList = [];
  Physics.prototype.destroyBody = function(body){
	  //alert ("destroying")
	  var bodies = new Array();
	  bodies[0] = body
	  //console.log(body);
	 // this.world.DestroyBody(body);
	  destroyList.push(body);
  }

  Physics.prototype.debug = function() {
    this.debugDraw = new b2DebugDraw();
    this.debugDraw.SetSprite(this.context);
    this.debugDraw.SetDrawScale(this.scale);
    this.debugDraw.SetFillAlpha(0.3);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);
  };

  Physics.prototype.step = function(dt) {
	  

    this.dtRemaining += dt;
    while(this.dtRemaining > this.stepAmount) {
      this.dtRemaining -= this.stepAmount;
	  
      this.world.Step(this.stepAmount, 
                      10, // velocity iterations
                      10);// position iterations
      
      // Destroy all bodies in destroy_list
	  for (var i in destroyList) {
	    this.world.DestroyBody(destroyList[i]);
	    console.log('destroying')
	    console.log(destroyList[i])
	  }
	  
	  // Reset the array
	  destroyList.length = 0;
      
    }

	  
    if(this.debugDraw) {
      this.world.DrawDebugData();
    } else {
      var obj = this.world.GetBodyList();
      this.context.clearRect(0,0,this.element.width,this.element.height);

      this.context.save();
      this.context.scale(this.scale,this.scale);
      while(obj) {
        var body = obj.GetUserData();
        if(body) {  body.draw(this.context); }

        obj = obj.GetNext();
      }
      this.context.restore();
    }
  };


  var mousex;
  var mousey;
  var egg;
  
  Physics.prototype.click = function(callback) {
	    var self = this;

	    function handleClick(e) {
	    	//alert(egg)
	        e.preventDefault();
	      	mousex = (e.offsetX || e.layerX)/self.scale;
	      	mousey = (e.offsetY || e.layerY)/self.scale;
	        var point = {
	              x: (e.offsetX || e.layerX) / self.scale,
	              y: (e.offsetY || e.layerY) / self.scale
	            };
	        
	       var position = egg.body.GetWorldCenter()
	       console.log(position);
	       var xpos = position.x
	       
	       if (e.x != undefined && e.y != undefined)
	       {
	    	   var xpos = mousex - xpos;
	       }
	       else // Firefox method to get the position
	       {
	    	   var xpos = mousex - xpos -10;
	       }
	       console.log(xpos)
	       // alert(mousex +"\\"+ mousey)
	        //console.log(egg)
	       egg.body.ApplyImpulse({ x: xpos *10 , y: 0}, egg.body.GetWorldCenter());

	      self.world.QueryPoint(function(fixture) {
	        callback(fixture.GetBody(),
	                 fixture,
	                 point);
	      },point);
	    }

	    function handleTouch(e) {
	    	//alert(egg)
	        e.preventDefault();
	      	mousex = (e.changedTouches[0].pageX)/self.scale;
	      	mousey = (e.changedTouches[0].pageY)/self.scale;
	        var point = {
	              x: (e.changedTouches[0].pageX) / self.scale,
	              y: (e.changedTouches[0].pageY) / self.scale
	            };
	        
	       var position = egg.body.GetWorldCenter()
	       console.log(position);
	       var xpos = position.x
	       var xpos = mousex - xpos;
	       console.log(xpos)
	       // alert(mousex +"\\"+ mousey)
	        //console.log(egg)
	       egg.body.ApplyImpulse({ x: xpos *10 , y: 0}, egg.body.GetWorldCenter());

	      self.world.QueryPoint(function(fixture) {
	        callback(fixture.GetBody(),
	                 fixture,
	                 point);
	      },point);
	    }
	    
	    this.element.addEventListener("click",handleClick);
	    this.element.addEventListener("touchstart",handleTouch);
	  };

  Physics.prototype.collision = function() {
    this.listener = new Box2D.Dynamics.b2ContactListener();
    this.listener.BeginContact = function(contact,impulse) {
      var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
          bodyB = contact.GetFixtureB().GetBody().GetUserData();

      if(bodyA.contact) { bodyA.contact(bodyB) }
      if(bodyB.contact) { bodyB.contact(bodyA) }

    };
    this.world.SetContactListener(this.listener);
  };

  
  var Body = window.Body = function(physics,details) {
    this.details = details = details || {};

    // Create the definition
    this.definition = new b2BodyDef();

    // Set up the definition
    for(var k in this.definitionDefaults) {
      this.definition[k] = details[k] || this.definitionDefaults[k];
    }
    this.definition.position = new b2Vec2(details.x || 0, details.y || 0);
    this.definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
    this.definition.userData = this;
    if(details.type == "kinematic"){
    	this.definition.type = b2Body.b2_kinematicBody;
    	definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
    }
    else{
    	 this.definition.type = details.type == "static" ? b2Body.b2_staticBody :
             b2Body.b2_dynamicBody;
    }
   

    // Create the Body
    this.body = physics.world.CreateBody(this.definition);

    // Create the fixture
    this.fixtureDef = new b2FixtureDef();
    for(var l in this.fixtureDefaults) {
      this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
    }


    details.shape = details.shape || this.defaults.shape;

    switch(details.shape) {
      case "circle":
        details.radius = details.radius || this.defaults.radius;
        this.fixtureDef.shape = new b2CircleShape(details.radius);
        break;
      case "polygon":
        this.fixtureDef.shape = new b2PolygonShape();
        this.fixtureDef.shape.SetAsArray(details.points,details.points.length);
        break;
      case "block":
      default:
        details.width = details.width || this.defaults.width;
        details.height = details.height || this.defaults.height;

        this.fixtureDef.shape = new b2PolygonShape();
        this.fixtureDef.shape.SetAsBox(details.width/2,
                                       details.height/2);
        break;
    }

    this.body.CreateFixture(this.fixtureDef);
  };


  Body.prototype.defaults = {
    shape: "block",
    width: 4,
    height: 4,
    radius: 1
  };
  

  Body.prototype.fixtureDefaults = {
    density: 2,
    friction: 1,
    restitution: 0.2
  };

  Body.prototype.definitionDefaults = {
    active: true,
    allowSleep: true,
    angle: 0,
    angularVelocity: 0,
    awake: true,
    bullet: false,
    fixedRotation: false
  };


  Body.prototype.draw = function(context) {
	 
    var pos = this.body.GetPosition(),
        angle = this.body.GetAngle();

    context.save();
    context.translate(pos.x,pos.y);
    context.rotate(angle);


    if(this.details.color) {
      context.fillStyle = this.details.color;
      if(!this.destroyed){
      switch(this.details.shape) {
        case "circle":
          context.beginPath();
          context.arc(0,0,this.details.radius,0,Math.PI*2);
          context.fill();
          break;
        case "polygon":
          var points = this.details.points;
          context.beginPath();
          context.moveTo(points[0].x,points[0].y);
          for(var i=1;i<points.length;i++) {
            context.lineTo(points[i].x,points[i].y);
          }
          context.fill();
          break;
        case "block":
          context.fillRect(-this.details.width/2,
                           -this.details.height/2,
                           this.details.width,
                           this.details.height);
        default:
          break;
      }
      }
    }

    if(this.details.image) {
      context.drawImage(this.details.image,
                        -this.details.width/2,
                        -this.details.height/2,
                        this.details.width,
                        this.details.height);

    }

    context.restore();

  }


  var physics,
      lastFrame = new Date().getTime();

  window.gameLoop = function() {
    var tm = new Date().getTime();
    requestAnimationFrame(gameLoop);
    var dt = (tm - lastFrame) / 1000;
    if(dt > 1/15) { dt = 1/15; }
    physics.step(dt);
    lastFrame = tm;
  };
  
  var redDecor;
  var blueDecor;
  var treeDecor;

  function init() {
   // var img = new Image();

    // Wait for the image to load
   // img.addEventListener("load", function() {

      physics = window.physics = new Physics(document.getElementById("canvas"));
      console.log("drawing");
      //document.getElementById('myh1id').innerHTML ='<strong>Level 1!</strong>'
      physics.collision();
      // Create some walls
      new Body(physics, { color: "red", type: "static", x: 0, y: 0, height: 50,  width: 0.5 });
      new Body(physics, { color: "red", type: "static", x:40, y: 0, height: 50,  width: 0.5});
      new Body(physics, { color: "red", type: "static", x: 0, y: 0, height: 0.5, width: 120 });
     var ground = new Body(physics, { color: "orange", type: "static", x: 0, y:22, height: 1, width: 120 });
     ground.elementType = "ground"

    //create level1
    
      
      
     var launcher1 = new Body(physics, { color: "red", type: "static", x: 10, y:20, height: 0.5, width: 15 });
     launcher1.contact = function(bodyA) {
      	  
   	  egg.body.ApplyImpulse({ x: 0, y: 750 }, egg.body.GetWorldCenter());
          
        };
        


      //create basket
      //basket image
      var basketImage = new Image();
      basketImage.src = "img/theme5/basket.png";
     var basket = new Body(physics, { image: basketImage ,type: "static", x: 30, y: 18});
     basket.elementType = "basket";
      
      var redImage = new Image();
      redImage.src = "img/theme5/collectible1.png";
     var red =  new Body(physics, { image: redImage ,type: "static", x: 30, y: 5});
     red.elementType = "redDecor"
    	 red.contact = function(bodyA) {
       	  
       	  //alert(this.elementType);
    	 this.destroyed = true;
       	  physics.destroyBody(redDecor.body)
             //this.details.color = "rgb(255,0,0)";
           
         };
      redDecor = red; 
      
      var blueImage = new Image();
      blueImage.src = "img/theme5/collectible2.png";
     var blue =  new Body(physics, { image: blueImage ,type: "static", x: 20, y:3});
     blue.elementType = "blueDecor"
    	 blue.contact = function(bodyA) {
       	  
       	  //alert(this.elementType);
    	 this.destroyed = true;
       	  physics.destroyBody(blueDecor.body)
             //this.details.color = "rgb(255,0,0)";
           
         };
      blueDecor = blue; 
      
      
      var treeImage = new Image();
      treeImage.src = "img/theme5/collectible3.png";
     var tree =  new Body(physics, { image: treeImage ,type: "static", x: 5, y: 5});
     tree.elementType = "treeDecor"
    	 tree.contact = function(bodyA) {
       	  
       	  //alert(this.elementType);
    	 this.destroyed = true;
       	  physics.destroyBody(treeDecor.body)
             //this.details.color = "rgb(255,0,0)";
           
         };
      treeDecor = tree; 
      
      //create image
      var bombImage = new Image();
      bombImage.src = "img/theme5/bomb.png";
     var bomb = new Body(physics, { image: bombImage ,type: "static", x: 30, y: 10});
     bomb.elementType = "bomb";
     
     var bomb1 = new Body(physics, { image: bombImage ,type: "static", x: 3, y: 10});
     bomb1.elementType = "bomb";
      
     var eggImage = new Image()
     eggImage.src = "img/theme5/egg.png";
     
     var coloredImage = new Image()
     coloredImage.src = "img/theme5/coloredEgg.png";
     
    var body = new Body(physics, { image: eggImage , x: 10, y: 1, height : 2, width : 1.8 });
    body.elementType = "egg"
     body.contact = function(bodyA) {
   	  
   	 // alert(this.elementType);
   	 if(bodyA.elementType == "redDecor" || bodyA.elementType == "blueDecor" || bodyA.elementType == "treeDecor" ){
   		// alert("success")
   		 this.details.image = coloredImage ;
   		 colorDecoration(bodyA.elementType);
   	 }
   	 if(bodyA.elementType == "basket"){
    		// alert("game over")
    		 physics.destroyBody(egg.body);
    		 //alert("Level Completed!!")
    		 levelFinished();
    		 saveCollectedDecoration();
    	 }
    	 if(bodyA.elementType == "bomb"){
     		// alert("game over")
     		 physics.destroyBody(egg.body);
     		 alert("Egg Destroyed! Game Over");
     	 }
    	 if(bodyA.elementType == "ground"){
      		// alert("game over")
      		 physics.destroyBody(egg.body);
      		alert("Egg Destroyed! Game Over");
      	 }

        
      };
      
      egg = body;

      physics.click(function(body) {
       // body.ApplyImpulse({ x: 1000, y: -1000 }, body.GetWorldCenter());
      });

      requestAnimationFrame(gameLoop);
   // });

    //img.src = "img/theme5/redDecor.jpg";
  }
  
  init();
  
	function saveCollectedDecoration() {
		var collectedDecorationString = localStorage.collectedDecoration;
		if(collectedDecorationString != null) {
			var collectedDecorationAllLevels = JSON.parse(collectedDecorationString);
		}
		else {
			var collectedDecorationAllLevels = new Array();
		}
		collectedDecorationAllLevels[levelNumber-1] = JSON.stringify(collectedDecoration);
		localStorage.collectedDecoration = JSON.stringify(collectedDecorationAllLevels);
	}
}());




// Lastly, add in the `requestAnimationFrame` shim, if necessary. Does nothing 
// if `requestAnimationFrame` is already on the `window` object.
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



}
