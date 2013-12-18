 
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

  var daniel_Physics = window.daniel_Physics = function(element,scale) {
    var gravity = new b2Vec2(0,9.8);
    this.world = new b2World(gravity, true);
    this.element = element;
    this.context = element.getContext("2d");
    this.scale = scale || 20;
    this.dtRemaining = 0;
    this.stepAmount = 1/60;
  };

  daniel_Physics.prototype.debug = function() {
    this.debugDraw = new b2DebugDraw();
    this.debugDraw.SetSprite(this.context);
    this.debugDraw.SetDrawScale(this.scale);
    this.debugDraw.SetFillAlpha(0.3);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);
  };

  //step method, theme-> whose method is this, Params -> array which contain whatever object you need
  //timer, winlose, level
  daniel_Physics.prototype.step = function(dt, params) {
    this.dtRemaining += dt;
    while(this.dtRemaining > this.stepAmount) {
      this.dtRemaining -= this.stepAmount;
      this.world.Step(this.stepAmount, 
                      10, // velocity iterations
                      10);// position iterations
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
      
      
      timer=params["timer"];
	  winlose=params["winlose"];
	  level=params["level"];
	  
	  this.context.font="1px Arial white";
      this.context.fillStyle="white";
      
      if (winlose!=""){
    	  this.context.fillText(winlose,1,1.5);
      }
      /*
      else	{
    	  this.context.fillText("TIME:"+timer,1,1.5);
      }
	  this.context.fillText("LEVEL:"+level,1,3);
	  */
      
      this.context.restore();
    }
  };

/*
  Physics.prototype.click = function(callback) {
    var self = this;

    function handleClick(e) {
      e.preventDefault();
      var point = {
            x: (e.offsetX || e.layerX) / self.scale,
            y: (e.offsetY || e.layerY) / self.scale
          };

      self.world.QueryPoint(function(fixture) {
        callback(fixture.GetBody(),
                 fixture,
                 point);
      },point);
    }
    this.element.addEventListener("mousedown",handleClick);
  };
  */

  daniel_Physics.prototype.dragNDrop = function() {
    var self = this;
    var obj = null;
    var joint = null;

    function calculateWorldPosition(e) {
      return point = {
        x: (e.offsetX || e.layerX) / self.scale,
        y: (e.offsetY || e.layerY) / self.scale
      };
    }
    
    //touch

    this.element.addEventListener("mousedown",function(e) {
	  //e.preventDefault();
	  var point = calculateWorldPosition(e);
	  self.world.QueryPoint(function(fixture) {
	    obj = fixture.GetBody().GetUserData();
	  },point);  
	});
    
    this.element.addEventListener("mousemove",function(e) {
      if(!obj) { return; }
      var point = calculateWorldPosition(e);

      if(!joint) {
        var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();

        jointDefinition.bodyA = self.world.GetGroundBody();
        jointDefinition.bodyB = obj.body;
        jointDefinition.target.Set(point.x,point.y);
        jointDefinition.maxForce = 100000;
        jointDefinition.timeStep = self.stepAmount;
        joint = self.world.CreateJoint(jointDefinition);
      }

      joint.SetTarget(new b2Vec2(point.x,point.y));
    });
    
    

    this.element.addEventListener("mouseup",function(e) {
      obj = null;
      if(joint) {
        self.world.DestroyJoint(joint);
        joint = null;
      }
    });
    

    this.element.addEventListener('touchstart', function(event) {
      //event.preventDefault();
	  var point = calculateWorldPosition(event);
	  self.world.QueryPoint(function(fixture) {
	    obj = fixture.GetBody().GetUserData();
	  },point);
    }, false);
		
    this.element.addEventListener('touchend', function(event) {
        //event.preventDefault();
    	obj = null;
        if(joint) {
          self.world.DestroyJoint(joint);
          joint = null;
        }
    }, false);
    
    this.element.addEventListener('touchmove', function(event) {
	    event.preventDefault();  
		if(!obj) { return; }
	      var point = calculateWorldPosition(event);

	      if(!joint) {
	        var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();

	        jointDefinition.bodyA = self.world.GetGroundBody();
	        jointDefinition.bodyB = obj.body;
	        jointDefinition.target.Set(point.x,point.y);
	        jointDefinition.maxForce = 100000;
	        jointDefinition.timeStep = self.stepAmount;
	        joint = self.world.CreateJoint(jointDefinition);
	      }

	      joint.SetTarget(new b2Vec2(point.x,point.y));
	}, false);
  };


  daniel_Physics.prototype.collision = function() {
    this.listener = new Box2D.Dynamics.b2ContactListener();
    this.listener.PostSolve = function(contact,impulse) {
      var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
          bodyB = contact.GetFixtureB().GetBody().GetUserData();
      
      if(bodyA.contact) { 
    	  bodyA.contact(contact,impulse,true, bodyB) 
	  }
      if(bodyB.contact) { bodyB.contact(contact,impulse,false, bodyA) }

    };
    this.listener.EndContact = function(contact,impulse){
        var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
        bodyB = contact.GetFixtureB().GetBody().GetUserData();
    
        if (bodyA.details.type != "static"){
        	bodyA.details.color = "green";
        }
        else	{
        	if (bodyA.details.image == img_electrifiedegg) {bodyA.details.image = img_egg}
        	if (bodyA.details.image == img_col1 || bodyA.details.image == img_col2 || bodyA.details.image == img_col3)	
        		{daniel_colorCandy(bodyA.details.image,0);
        		}
        }
        
        if (bodyB.details.type != "static"){
        	bodyB.details.color = "green";
        }
        else {
        	if (bodyB.details.image == img_electrifiedegg) {bodyB.details.image= img_egg;}
        	if (bodyB.details.image == img_col1 || bodyB.details.image == img_col2 || bodyB.details.image == img_col3)	
    			{daniel_colorCandy(bodyB.details.image,0);
    			}
        }
    }
    this.world.SetContactListener(this.listener);
  };

  
  
  //body class for drawing in the world,currently supported three kinds: polygon, circle, block
  var daniel_Body = window.daniel_Body = function(daniel_physics,details) {
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
    this.definition.type = details.type == "static" ? b2Body.b2_staticBody :
                                                      b2Body.b2_dynamicBody;

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


  daniel_Body.prototype.defaults = {
    shape: "block",
    width: 4,
    height: 4,
    radius: 1
  };

  daniel_Body.prototype.fixtureDefaults = {
    density: 2,
    friction: 1,
    restitution: 0.2
  };

  daniel_Body.prototype.definitionDefaults = {
    active: true,
    allowSleep: true,
    angle: 0,
    angularVelocity: 0,
    awake: true,
    bullet: false,
    fixedRotation: false
  };
  
  daniel_Body.prototype.contact = function (contact, impulse, first, body) {
	    // var magnitude = Math.sqrt(
	    //impulse.normalImpulses[0] * impulse.normalImpulses[0] + impulse.normalImpulses[1] * impulse.normalImpulses[1]),
	    //    color = Math.round(magnitude / 2);
	    if 	(body.details.image == img_plug || body.details.color == "yellow") {
	        //this.details.color = "rgb(" + color + ",50,50)";
			if (this.details.color == "green")	{
				this.details.color = "yellow";	
			}    	
			
			if (this.details.image == img_egg)	{
				this.details.image = img_electrifiedegg;	
			}    	

			if (this.details.image == img_col1 || this.details.image == img_col2 || this.details.image == img_col3)	
			{
			daniel_colorCandy(this.details.image,1);
			}
	    }
	    
	};

  daniel_Body.prototype.draw = function(context) {
    var pos = this.body.GetPosition(),
        angle = this.body.GetAngle();

    context.save();
    context.translate(pos.x,pos.y);
    context.rotate(angle);


    if(this.details.color) {
      context.fillStyle = this.details.color;

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

    if(this.details.image) {
		context.drawImage(this.details.image,
                -this.details.width/2,
                -this.details.height/2,
                this.details.width,
                this.details.height);
    }

    context.restore();

  }
  
  
  
  var daniel_physics;
  var daniel_lastFrame = new Date().getTime();
  
  //initialization,
  var daniel_timer = 10000; 
  var daniel_eggs = new Array();
  var daniel_winlose ="";
  var daniel_level = 1;
  
  var img_egg = new Image();
  var img_electrifiedegg = new Image();
  var img_plug = new Image();
  
  var img_col1 = new Image();
  var img_col2 = new Image();
  var img_col3 = new Image();
  
  var daniel_collectedCandy = new Array("0","0","0");
	
  
//game loop
window.daniel_gameLoop = function() {
    var tm = new Date().getTime();
    requestAnimationFrame(daniel_gameLoop);
    var dt = (tm - daniel_lastFrame) / 1000;
    if(dt > 1/15) { dt = 1/15; }

	var params = new Array();
    params['timer']=daniel_timer;
    params["winlose"]=daniel_winlose;
    params["level"]=daniel_level;
    daniel_physics.step(dt,params);
    daniel_lastFrame = tm;
 
	if (daniel_timer==0)	{
		daniel_timer =-1;
		daniel_winlose = "YOU LOSE";
    }
    else {
    	var wincheck=true;
    	for (index = 0; index < daniel_eggs.length; ++index) {
    		if (daniel_eggs[index].details.image != img_electrifiedegg){
    	    	wincheck=false;
    	    }
    	}
    	if (daniel_eggs.length>0 && daniel_timer!= -1 && wincheck==true)	{
    		/*
    		daniel_level++;
    		if (daniel_level>10){
    			daniel_timer=-1;
    			daniel_winlose = "YOU WIN";
    		}
    		else	{
    			daniel_timer=3000+(daniel_level*1000);	
    			daniel_init();
    		}
    		*/
    		if (daniel_level!=9)	{
    			levelFinished();
    		}
    		else	{
    			themeFinished();
    		}
    		daniel_saveCollectedCandy();
    		
    	}
    	//if (daniel_eggs.length>0 && daniel_timer>0)	{daniel_timer --;}
    }
};

function daniel_saveCollectedCandy() {
	var collectedCandyString = localStorage.daniel_collectedCandy;
	if(collectedCandyString != null) {
		var collectedCandyAllLevels = JSON.parse(collectedCandyString);
	}
	else {
		var collectedCandyAllLevels = new Array();
	}
	collectedCandyAllLevels[daniel_level-1] = JSON.stringify(daniel_collectedCandy);
	localStorage.daniel_collectedCandy = JSON.stringify(collectedCandyAllLevels);
}

function daniel_colorCandy(candyType,value) {

	if(candyType == img_col1) {
		 $(".collectable1").each(function() {
			  if (value=="1")	{$( this ).attr("src", "img/theme4/collectible1.png");}
			  else	{$( this ).attr("src", "img/theme4/collectible1_bw.png");}
			  daniel_collectedCandy[0] = value;
		 });
	 } else if(candyType == img_col2) {
		 $(".collectable2").each(function() {
			  if (value=="1")	{$( this ).attr("src", "img/theme4/collectible2.png");}
			  else	{$( this ).attr("src", "img/theme4/collectible2_bw.png");}
			  daniel_collectedCandy[1] = value;
		 });
	 } else if(candyType == img_col3) {
		 $(".collectable3").each(function() {
			  if (value=="1")	{$( this ).attr("src", "img/theme4/collectible3.png");}
			  else	{$( this ).attr("src", "img/theme4/collectible3_bw.png");}
		        daniel_collectedCandy[2] = value;
		 });
	 } 
}

function daniel_init() {
    img_egg.src = "img/theme4/egg.png";
    img_electrifiedegg.src = "img/theme4/electrifiedegg.png";
    img_plug.src = "img/theme4/plug.png";
    
    img_col1.src = "img/theme4/collectible1.png";
    img_col2.src = "img/theme4/collectible2.png";
    img_col3.src = "img/theme4/collectible3.png";
    
	  // Wait for the image to load
	 // img.addEventListener("load", function() {

	  daniel_physics = window.physics = new daniel_Physics(document.getElementById("canvas"));
		
	  /*
	  document.getElementById('selectlevel').onclick = function() {
		  daniel_level=prompt("Please enter desired level (1-10)","1");
		  daniel_init();
		  daniel_timer=10000;
	  };
	  */
	  daniel_physics.collision();
      // Create some walls
      new daniel_Body(daniel_physics, { color: "blue", type: "static", x: 0, y: 0, height: 50,  width: 0.5 });
      new daniel_Body(daniel_physics, { color: "blue", type: "static", x:40, y: 0, height: 50,  width: 0.5});
      new daniel_Body(daniel_physics, { color: "blue", type: "static", x: 0, y: 0, height: 0.5, width: 120 });
      new daniel_Body(daniel_physics, { color: "blue", type: "static", x: 0, y:22.5, height: 0.5, width: 120 });

      daniel_eggs = new Array();

      if (daniel_level==1){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, {image:img_egg, type: "static", shape: "circle", radius:2, x: 30, y: 8, width:4, height:4});
          
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 30, y:22, height: 0.5, width: 10 });
          
          new daniel_Body(daniel_physics, { color: "green", x: 1, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          
          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
          
      }
      else if (daniel_level ==2){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 15, y: 7.5, width:4, height:4 });
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 30, y:22, height: 0.5, width: 10 });
          
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 10, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", shape: "polygon", 
              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 5 }, {x: -12, y: 3}   ],
              x: 20, y: 5 });
 
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      }
      else if (daniel_level ==3){
    	  //create the eggs
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 10, y: 17, width:4, height:4 });
    	  daniel_eggs[1] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 20, y: 17, width:4, height:4 });
          
          //create the plug - electrical source
          new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 30, y:22, height: 0.5, width: 10 });

          //create the blocks
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 15, height: 0.5 });
          new daniel_Body(daniel_physics, { color: "green", x: 13, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", shape: "circle", radius: 2, x: 5, y: 20 });
      
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      
      }
      else if (daniel_level==4){
    	  //create the eggs
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 10, y: 10, width:4, height:4 });
    	  daniel_eggs[1] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 25, y: 10, width:4, height:4 });
          
          //create the plug - electrical source
          new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 15, y:22, height: 0.5, width: 10 });

          //create the blocks
          new daniel_Body(daniel_physics, { color: "green", shape: "polygon", 
                              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
                              x: 20, y: 5 });
          new daniel_Body(daniel_physics, { color: "green", shape: "polygon", 
              points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
              x: 20, y: 5 });
          
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
          
      }
      else if (daniel_level==5){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 40, y: 5, width:4, height:4 });
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 5, y:22, height: 0.5, width: 10 });

    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 30, height: 0.5 });
  		  new daniel_Body(daniel_physics, { color: "green", shape: "polygon", 
  			  points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
  			  x: 20, y: 5 });    
  		  
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      }
      else if (daniel_level==6){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 35, y: 10 , width:4, height:4});
    	  daniel_eggs[1] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 30, y: 15, width:4, height:4 });
    	  
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 0.5, y:22, height: 0.5, width: 10 });
    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 15, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 30, height: 0.5 });
      
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      }
      else if (daniel_level==7){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 35, y: 5 , width:4, height:4});
    	  daniel_eggs[1] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 35, y: 15, width:4, height:4 });
    	  
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 20, y:22, height: 0.5, width: 10 });
     	 
    	  new daniel_Body(daniel_physics, { color: "blue", type: "static", x: 40, y:10, height: 0.5, width: 25 });
    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 1 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
      
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      }
      else if (daniel_level==8){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 35, y: 5, width:4, height:4 });
    	  daniel_eggs[1] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 35, y: 15, width:4, height:4 });
    	  daniel_eggs[2] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 25, y: 10, width:4, height:4 });
    	  
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 10, y:0.5, height: 0.5, width: 10 });
      	 
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 10, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 15, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 4, width: 20, height: 0.5 });
    	  
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      
      }
      else if (daniel_level==9){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 35, y: 5, width:4, height:4 });
    	  
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 0.5, y:0.5, height: 0.5, width: 10 });
      	 
    	  new daniel_Body(daniel_physics, { color: "blue", type: "static", x: 25, y:5, height: 13, width: 0.5 });
     	
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 15, width: 10, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 15, width: 15, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 15, width: 15, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 15, width: 10, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 15, width: 20, height: 0.5 });    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 10, height: 0.5 });
    	
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 35, y:20, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 3, y:3, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 3, y:20, height: 03, width: 3 });
 
      
      }
      else if (daniel_level==10){
    	  daniel_eggs[0] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 25, y: 5, width:4, height:4 });
    	  daniel_eggs[1] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 30, y: 10, width:4, height:4 });
    	  daniel_eggs[2] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 25, y: 15, width:4, height:4 });
    	  daniel_eggs[3] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 20, y: 10, width:4, height:4 });
    	  daniel_eggs[4] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 20, y: 2.5, width:4, height:4 });
    	  daniel_eggs[5] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 30, y: 2.5, width:4, height:4 });
    	  daniel_eggs[6] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 20, y: 17.5, width:4, height:4 });
    	  daniel_eggs[7] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 30, y: 17.5, width:4, height:4 });
    	  daniel_eggs[8] = new daniel_Body(daniel_physics, { image:img_egg, type: "static", shape: "circle", radius: 2, x: 25, y: 10, width:4, height:4 });
    	  
    	  new daniel_Body(daniel_physics, { image:img_plug, type: "static", x: 5, y:10, height: 0.5, width: 10 });
      	 
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 15, height: 0.5 });
    	  
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });

    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });
    	  new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 0.5 });

          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 5, y: 8 });
          new daniel_Body(daniel_physics, { color: "green", x: 4, y: 20, width: 5, height: 1 });

          new daniel_Body(daniel_physics, { image:img_col1, type: "static", shape: "circle", radius: 1.5, x: 20, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col2, type: "static", shape: "circle", radius: 1.5, x: 15, y:10, height: 03, width: 3 });
          new daniel_Body(daniel_physics, { image:img_col3, type: "static", shape: "circle", radius: 1.5, x: 10, y:10, height: 03, width: 3 });
 
      
      }
      
      daniel_physics.dragNDrop();
      requestAnimationFrame(daniel_gameLoop);
    //});
  
}
	  
//  window.addEventListener("load",daniel_init);
//}());

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
  
