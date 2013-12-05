
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

  Physics.prototype.debug = function() {
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
  Physics.prototype.step = function(dt, theme, params) {
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
      
      if (theme=="daniel"){
    	  timer=params["timer"];
    	  winlose=params["winlose"];
    	  level=params["level"];
    	  
    	  this.context.font="1px Arial white";
          this.context.fillStyle="white";
          if (winlose!=""){
        	  this.context.fillText(winlose,1,1.5);
          }
          else	{
        	  this.context.fillText("TIME:"+timer,1,1.5);
          }
    	  this.context.fillText("LEVEL:"+level,1,3);
    	    
      }
      else if (theme=="else")	{
    	  
      }
      
      this.context.restore();
    }
  };


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

  Physics.prototype.dragNDrop = function() {
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


  Physics.prototype.collision = function() {
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
        	if (bodyA.details.color == "orange") {bodyA.details.color = "pink";}
        }
        
        if (bodyB.details.type != "static"){
        	bodyB.details.color = "green";
        }
        else {
        	if (bodyB.details.color == "orange") {bodyB.details.color = "pink";}
        }
        
        
    }
    
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
  
  Body.prototype.contact = function (contact, impulse, first, body) {
	    // var magnitude = Math.sqrt(
	    //impulse.normalImpulses[0] * impulse.normalImpulses[0] + impulse.normalImpulses[1] * impulse.normalImpulses[1]),
	    //    color = Math.round(magnitude / 2);
	 
	  	
	    if 	(body.details.color == "red" || body.details.color == "yellow") {
	        //this.details.color = "rgb(" + color + ",50,50)";
			if (this.details.color == "green")	{
				this.details.color = "yellow";	
			}    	
			
			if (this.details.color == "pink")	{
				this.details.color = "orange";	
			}    	
			

	    }
	};


  Body.prototype.draw = function(context) {
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




