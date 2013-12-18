/**
 * 
 */
function level1() {
	console.log(document.location.pathname);
	var image = new Image();
    image.src = "./images/basket.jpeg";
    
	var   b2Vec2 = Box2D.Common.Math.b2Vec2
    ,  b2AABB = Box2D.Collision.b2AABB
 	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
 	,	b2Body = Box2D.Dynamics.b2Body
 	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
 	,	b2Fixture = Box2D.Dynamics.b2Fixture
 	,	b2World = Box2D.Dynamics.b2World
 	,	b2MassData = Box2D.Collision.Shapes.b2MassData
 	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
 	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
 	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ,  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
    ;
 
	var world = new b2World(
       new b2Vec2(0, 10)    //gravity
    ,  true                 //allow sleep
	);
 
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
 
	var bodyDef = new b2BodyDef;
 
	//create ground
	bodyDef.type = b2Body.b2_staticBody;

	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(5, 0.5);
	bodyDef.position.Set(2.5,3.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(5, 0.5);
	bodyDef.position.Set(17, 5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(8, 0.5);
	bodyDef.position.Set(4, 9);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.5, 4);
	bodyDef.position.Set(19.5, 5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	
	fixDef.shape.SetAsBox(0.25, 1);
	bodyDef.position.Set(1.5, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
//	fixDef.shape = new b2PolygonShape;
//    var vertices = [];
//    vertices.push(new b2Vec2(3, 6.26));
//    vertices.push(new b2Vec2(0.1, 6.26));
//    vertices.push(new b2Vec2(0.16, 4.26));
//    fixDef.shape.SetAsVector(vertices, 3);
//    bodyDef.position.Set(6,2);
//    world.CreateBody(bodyDef).CreateFixture(fixDef);
//	
//	
//	bodyDef.position.Set(8, 3); //400 / 30 + 1.8);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
//	bodyDef.position.Set(4, -1.8);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
//	
//	fixDef.shape = new b2CircleShape(0.2);
//	bodyDef.position.Set(0, 0);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
//	fixDef.shape = new b2CircleShape(0.2);
//	bodyDef.position.Set(20, 13.33);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape = new b2PolygonShape;
	var vertices2 = [];
	vertices2.push(new b2Vec2(0, 0));
	vertices2.push(new b2Vec2(2, -1));
	vertices2.push(new b2Vec2(4, 0));
	fixDef.shape.SetAsVector(vertices2, 3);
	bodyDef.position.Set(12.5, 13.33);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(0, 13.33);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
//	fixDef.shape.SetAsBox(2, 14);
//	bodyDef.position.Set(-1.8, 13);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
//	bodyDef.position.Set(21.8, 13);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
 //create some objects
// bodyDef.type = b2Body.b2_dynamicBody;
// for(var i = 0; i < 10; ++i) {
//    if(Math.random() > 0.5) {
//       fixDef.shape = new b2PolygonShape;
//       fixDef.shape.SetAsBox(
//             Math.random() + 0.1 //half width
//          ,  Math.random() + 0.1 //half height
//       );
//    } else {
//       fixDef.shape = new b2CircleShape(
//          Math.random() + 0.1 //radius
//       );
//    }
//    bodyDef.position.x = Math.random() * 10;
//    bodyDef.position.y = Math.random() * 10;
//    world.CreateBody(bodyDef).CreateFixture(fixDef);
// }
 // Dynamic bodies
  bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2CircleShape(1);
  bodyDef.position.Set(2.8, 0);
  var egg1 =  world.CreateBody(bodyDef);
  egg1.CreateFixture(fixDef);

 
 // bodyDef.type = b2Body.b2_dynamicBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(1, 0.4);
  bodyDef.position.Set(0,1);
  var body1 = world.CreateBody(bodyDef);
  body1.CreateFixture(fixDef); 
 // var center = new b2Vec2(0,1.2);
 // var angle = 0; //0.5 * b2Settings.b2_pi;
  fixDef.shape.SetAsBox(0.2, 0.5); //, center, angle);
  body1.CreateFixture(fixDef);
 
 
  //setup debug draw
  var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(30.0);
	debugDraw.SetFillAlpha(0.8); //(0.5);
	debugDraw.SetLineThickness(0); // (1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
 
  level1Timer = window.setInterval(update, 1000 / 60);
  
  //mouse
 
  var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
  var canvasPosition = getElementPosition(document.getElementById("canvas"));
 
  document.addEventListener("mousedown", function(e) {
    isMouseDown = true;
    handleMouseMove(e);
    document.addEventListener("mousemove", handleMouseMove, true);
  }, true);
 
  document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", handleMouseMove, true);
    isMouseDown = false;
    mouseX = undefined;
    mouseY = undefined;
  }, true);
 
  function handleMouseMove(e) {
    mouseX = (e.clientX - canvasPosition.x) / 30;
    mouseY = (e.clientY - canvasPosition.y) / 30;
  };
 
  function getBodyAtMouse() {
    mousePVec = new b2Vec2(mouseX, mouseY);
    var aabb = new b2AABB();
    aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
    aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
    
    // Query the world for overlapping shapes.

    selectedBody = null;
    world.QueryAABB(getBodyCB, aabb);
    
    if(selectedBody == egg1){
    	return null;
    }
    
    return selectedBody;
  }

  function getBodyCB(fixture) {
    if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
       if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
          selectedBody = fixture.GetBody();
          return false;
       }
    }
    return true;
  }
 
 //touch

  document.addEventListener('touchstart', function(event) {
         isMouseDown = true;
         var touch = event.changedTouches[0];
         mouseX = (touch.pageX - canvasPosition.x) / 30;
         mouseY = (touch.pageY - canvasPosition.y) / 30;
         }, false);

  document.addEventListener('touchend', function(event) {
         isMouseDown = false;
         mouseX = undefined;
         mouseY = undefined;
         }, false);


  document.addEventListener('touchmove', function(event) {
         event.preventDefault();
         var touch = event.changedTouches[0];
         mouseX = (touch.pageX - canvasPosition.x) / 30;
         mouseY = (touch.pageY - canvasPosition.y) / 30;
         }, false);
  
  var context = document.getElementById("canvas").getContext("2d");
  var basket = new b2AABB;
  basket.lowerBound = new b2Vec2(310/30, 340/30);
  basket.upperBound = new b2Vec2(370/30, 410/30);
  var goalReached = false;
  //update
  function update() {
    if(isMouseDown && (!mouseJoint)) {
       var body = getBodyAtMouse();
       if(body) {
          var md = new b2MouseJointDef();
          md.bodyA = world.GetGroundBody();
          md.bodyB = body;
          md.target.Set(mouseX, mouseY);
          md.collideConnected = true;
          md.maxForce = 300.0 * body.GetMass();
          mouseJoint = world.CreateJoint(md);
          body.SetAwake(true);
       }
    }
    
    if(mouseJoint) {
       if(isMouseDown) {
          mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
       } else {
          world.DestroyJoint(mouseJoint);
          mouseJoint = null;
       }
    }
    
    world.Step(1 / 60, 10, 10);
    world.DrawDebugData();
//    context.drawImage(image, 45, 0, 180, 200, 310, 330, 80, 80);
    context.drawImage(image, 310, 330);
    if(goalReached){
    	context.fillStyle = '#ffffff';
    	context.font = '70px verdana';
    	context.fillText("Great Job", 115, 120);
    	context.font = '60px verdana';
    	context.fillText("Try the next level!", 15, 200);
    }
    world.ClearForces();
    
    world.QueryAABB(checkBasket, basket);
    
  };
 
  function checkBasket(fixture){
	  if(fixture.GetBody() == egg1){
		  goalReached = true;
	  }
  }
  
  //helpers
 
  //http://js-tut.aardon.de/js-tut/tutorial/position.html
  function getElementPosition(element) {
    var elem=element, tagname="", x=0, y=0;
   
    while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
       y += elem.offsetTop;
       x += elem.offsetLeft;
       tagname = elem.tagName.toUpperCase();

       if(tagname == "BODY")
          elem=0;

       if(typeof(elem) == "object") {
          if(typeof(elem.offsetParent) == "object")
             elem = elem.offsetParent;
       }
    }

    return {x: x, y: y};
  }

};