//reference: abhishek yiwei
function saveCollectedCandy(candyNum) {
﻿  var collectedCandyString = localStorage.zeyu_collectedCandy;
﻿  var levelNumber = parseInt(localStorage.currentLevel);
﻿  if (collectedCandyString != null) {
﻿  ﻿  var collectedCandyAllLevels = JSON.parse(collectedCandyString);
﻿  } else {
﻿  ﻿  var collectedCandyAllLevels = new Array();
﻿  }
﻿  var candyArray;
﻿  switch (candyNum) {
﻿  ﻿  case 0 :
﻿  ﻿  ﻿  candyArray = new Array("0", "0", "0");
﻿  ﻿  ﻿  break;
﻿  ﻿  case 1 :
﻿  ﻿  ﻿  candyArray = new Array("1", "0", "0");
﻿  ﻿  ﻿  break;
﻿  ﻿  case 2 :
﻿  ﻿  ﻿  candyArray = new Array("1", "1", "0");
﻿  ﻿  ﻿  break;
﻿  ﻿  default :
﻿  ﻿  ﻿  candyArray = new Array("1", "1", "1");
﻿  ﻿  ﻿  break;
﻿  }
﻿  collectedCandyAllLevels[levelNumber - 1] = JSON.stringify(candyArray);
﻿  localStorage.zeyu_collectedCandy = JSON.stringify(collectedCandyAllLevels);
}

// reference: micha yiwei
function colorCandy(candyNum) {
﻿  if (candyNum >= 1) {
﻿  ﻿  $(".collectable1").each(function() {
﻿  ﻿  ﻿  $(this).attr("src", "img/theme2/collectible1.png");
﻿  ﻿  });
﻿  }
﻿  if (candyNum >= 2) {
﻿  ﻿  $(".collectable2").each(function() {
﻿  ﻿  ﻿  $(this).attr("src", "img/theme2/collectible2.png");
﻿  ﻿  });
﻿  }
﻿  if (candyNum >= 3) {
﻿  ﻿  $(".collectable3").each(function() {
﻿  ﻿  ﻿  $(this).attr("src", "img/theme2/collectible3.png");
﻿  ﻿  });
﻿  }
}

/*
 * Global variable dependency: _levelLoader
 */

// Import Box2D constructors
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
var b2Transform = Box2D.Common.Math.b2Transform;
var b2Mat22 = Box2D.Common.Math.b2Mat22;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
var b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;

// Global Game Constants
var ZEYU_WALL_ID = "wall";
var ZEYU_START_POINT_ID = "startBox";
var ZEYU_LEFT_WALL_ID = "leftWall";
var ZEYU_RIGHT_WALL_ID = "rightWall";
var ZEYU_BALL_R = 15;
var ZEYU_BALL_ID = "egg";
var ZEYU_BUNNY_R = 20;

// Global Game Variables
var _zeyu_terrain;
var _zeyu_resources;
var _zeyu_levelPos = 0;
var _zeyu_physics, _zeyu_lastFrame = new Date().getTime();
var _zeyu_canvasW, _zeyu_canvasH;
var _zeyu_candyNum;

var zeyu_resourceList = [{
﻿  name : "ballImg",
﻿  type : "image",
﻿  url : "img/theme2/angry-bird-30x30.png"
}, {
﻿  name : "bunnyImg",
﻿  type : "image",
﻿  url : "img/theme2/bunny-40x40.png"
}, {
﻿  name : "snowPattern",
﻿  type : "image",
﻿  url : "img/theme2/snow-textures-5.jpg"
}];

window.onerror = function(error) {
﻿  alert(error);
};

window.zeyu_gameLoop = function() {
﻿  var tm = new Date().getTime();
﻿  requestAnimationFrame(zeyu_gameLoop);
﻿  var dt = (tm - _zeyu_lastFrame) / 1000;
﻿  if (dt > 1 / 15) {
﻿  ﻿  dt = 1 / 15;
﻿  }
﻿  _zeyu_physics.step(dt);
﻿  _zeyu_lastFrame = tm;
};

function zeyu_init(callback) {

﻿  var resLoader = new zeyu_ResourceLoader(zeyu_resourceList,
﻿  ﻿  ﻿  function(loaded) {

﻿  ﻿  ﻿  ﻿  _zeyu_resources = loaded;

﻿  ﻿  ﻿  ﻿  var canvas = document.getElementById("canvas");
﻿  ﻿  ﻿  ﻿  _zeyu_physics = new zeyu_Physics(canvas);
﻿  ﻿  ﻿  ﻿  _zeyu_canvasW = canvas.width;
﻿  ﻿  ﻿  ﻿  _zeyu_canvasH = canvas.height;

﻿  ﻿  ﻿  ﻿  // physics.debug();
﻿  ﻿  ﻿  ﻿  _zeyu_physics.collision();
﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  ﻿  _zeyu_candyNum = 0;

﻿  ﻿  ﻿  ﻿  // ground
﻿  ﻿  ﻿  ﻿  new zeyu_Body(_zeyu_physics, {
﻿  ﻿  ﻿  ﻿  ﻿  id : ZEYU_WALL_ID,
﻿  ﻿  ﻿  ﻿  ﻿  color : "#e5e5e5",
﻿  ﻿  ﻿  ﻿  ﻿  type : "static",
﻿  ﻿  ﻿  ﻿  ﻿  x : _zeyu_canvasW / 2,
﻿  ﻿  ﻿  ﻿  ﻿  y : _zeyu_canvasH + 10,
﻿  ﻿  ﻿  ﻿  ﻿  height : 40,
﻿  ﻿  ﻿  ﻿  ﻿  width : _zeyu_canvasW
﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  // ceiling
﻿  ﻿  ﻿  ﻿  new zeyu_Body(_zeyu_physics, {
﻿  ﻿  ﻿  ﻿  ﻿  id : ZEYU_WALL_ID,
﻿  ﻿  ﻿  ﻿  ﻿  color : "#e5e5e5",
﻿  ﻿  ﻿  ﻿  ﻿  type : "static",
﻿  ﻿  ﻿  ﻿  ﻿  x : _zeyu_canvasW / 2,
﻿  ﻿  ﻿  ﻿  ﻿  y : -20,
﻿  ﻿  ﻿  ﻿  ﻿  height : 40,
﻿  ﻿  ﻿  ﻿  ﻿  width : _zeyu_canvasW
﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  // left wall
﻿  ﻿  ﻿  ﻿  new zeyu_Body(_zeyu_physics, {
﻿  ﻿  ﻿  ﻿  ﻿  id : ZEYU_LEFT_WALL_ID,
﻿  ﻿  ﻿  ﻿  ﻿  color : "red",
﻿  ﻿  ﻿  ﻿  ﻿  type : "static",
﻿  ﻿  ﻿  ﻿  ﻿  x : -10,
﻿  ﻿  ﻿  ﻿  ﻿  y : _zeyu_canvasH / 2,
﻿  ﻿  ﻿  ﻿  ﻿  height : _zeyu_canvasH * 2,
﻿  ﻿  ﻿  ﻿  ﻿  width : 20
﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  // right wall
﻿  ﻿  ﻿  ﻿  new zeyu_Body(_zeyu_physics, {
﻿  ﻿  ﻿  ﻿  ﻿  id : ZEYU_RIGHT_WALL_ID,
﻿  ﻿  ﻿  ﻿  ﻿  color : "red",
﻿  ﻿  ﻿  ﻿  ﻿  type : "static",
﻿  ﻿  ﻿  ﻿  ﻿  x : _zeyu_canvasW + 10,
﻿  ﻿  ﻿  ﻿  ﻿  y : _zeyu_canvasH / 2,
﻿  ﻿  ﻿  ﻿  ﻿  height : _zeyu_canvasH * 2,
﻿  ﻿  ﻿  ﻿  ﻿  width : 20
﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  _zeyu_physics.rightClickToCreate(function(e) {

﻿  ﻿  ﻿  ﻿  ﻿  var offset = $('canvas').offset();

﻿  ﻿  ﻿  ﻿  ﻿  var posX = e.pageX - offset.left, posY = e.pageY
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  - offset.top;

﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.world.QueryPoint(function(fixture) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var obj = fixture.GetBody().GetUserData();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  if (obj && obj.details.id === ZEYU_START_POINT_ID) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  new zeyu_Body(_zeyu_physics, {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  id : ZEYU_BALL_ID,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  image : _zeyu_resources.ballImg,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  shape : "circle",
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  x : posX,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  y : posY,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  radius : ZEYU_BALL_R,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  width : ZEYU_BALL_R * 2,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  height : ZEYU_BALL_R * 2,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  density : 1,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  friction : 0.5,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  restitution : 0.5,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  life : 1000
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  ﻿  }, {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  x : posX / _zeyu_physics.scale,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  y : posY / _zeyu_physics.scale
﻿  ﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  ﻿  // if (isPointInBox({
﻿  ﻿  ﻿  ﻿  ﻿  // x : posX,
﻿  ﻿  ﻿  ﻿  ﻿  // y : posY
﻿  ﻿  ﻿  ﻿  ﻿  // }, _box)) {
﻿  ﻿  ﻿  ﻿  ﻿  // new Body(_physics, {
﻿  ﻿  ﻿  ﻿  ﻿  // id : BALL_ID,
﻿  ﻿  ﻿  ﻿  ﻿  // image : _resources.ballImg,
﻿  ﻿  ﻿  ﻿  ﻿  // shape : "circle",
﻿  ﻿  ﻿  ﻿  ﻿  // x : posX,
﻿  ﻿  ﻿  ﻿  ﻿  // y : posY,
﻿  ﻿  ﻿  ﻿  ﻿  // radius : BALL_R,
﻿  ﻿  ﻿  ﻿  ﻿  // width : BALL_R * 2,
﻿  ﻿  ﻿  ﻿  ﻿  // height : BALL_R * 2,
﻿  ﻿  ﻿  ﻿  ﻿  // density : 1,
﻿  ﻿  ﻿  ﻿  ﻿  // friction : 0.5,
﻿  ﻿  ﻿  ﻿  ﻿  // restitution : 0.5
﻿  ﻿  ﻿  ﻿  ﻿  // });
﻿  ﻿  ﻿  ﻿  ﻿  // }

﻿  ﻿  ﻿  ﻿  ﻿  // Prevent the click event to be triggered
﻿  ﻿  ﻿  ﻿  ﻿  return false;
﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  // $("#level-dialog").dialog({
﻿  ﻿  ﻿  ﻿  // autoOpen : false,
﻿  ﻿  ﻿  ﻿  // resizable : false,
﻿  ﻿  ﻿  ﻿  // height : 200,
﻿  ﻿  ﻿  ﻿  // modal : true,
﻿  ﻿  ﻿  ﻿  // buttons : {
﻿  ﻿  ﻿  ﻿  // "Go to next" : function() {
﻿  ﻿  ﻿  ﻿  // nextLevel();
﻿  ﻿  ﻿  ﻿  // $(this).dialog("close");
﻿  ﻿  ﻿  ﻿  // },
﻿  ﻿  ﻿  ﻿  // Cancel : function() {
﻿  ﻿  ﻿  ﻿  // $(this).dialog("close");
﻿  ﻿  ﻿  ﻿  // }
﻿  ﻿  ﻿  ﻿  // }
﻿  ﻿  ﻿  ﻿  // });

﻿  ﻿  ﻿  ﻿  _zeyu_physics.onMouseDown(function(e) {
﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.element.addEventListener("mousemove",
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  zeyu_doExplosion);
﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  _zeyu_physics.onMouseUp(function(e) {
﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.element.removeEventListener("mousemove",
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  zeyu_doExplosion);
﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  if (zeyu_touchable()) {
﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.onTouchStart(function(e) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  if (e.touches.length === 1)
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.element.addEventListener("touchmove",
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  zeyu_doExplosion);
﻿  ﻿  ﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.onTouchEnd(function(e) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  if (e.touches.length === 1)
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  _zeyu_physics.element.removeEventListener(
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  "touchmove", zeyu_doExplosion);
﻿  ﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  _zeyu_physics.onClick(zeyu_doExplosion);

﻿  ﻿  ﻿  ﻿  requestAnimationFrame(zeyu_gameLoop);

﻿  ﻿  ﻿  ﻿  zeyu_resetWorld();

﻿  ﻿  ﻿  ﻿  callback();
﻿  ﻿  ﻿  });

﻿  resLoader.load();

}

function zeyu_touchable() {
﻿  return 'createTouch' in document;
}

function zeyu_resetWorld() {
﻿  var body = _zeyu_physics.world.GetBodyList();

﻿  while (body) {
﻿  ﻿  var obj = body.GetUserData();

﻿  ﻿  if (obj) {
﻿  ﻿  ﻿  var id = obj.details.id;
﻿  ﻿  ﻿  if (!id
﻿  ﻿  ﻿  ﻿  ﻿  || (id && !(id === ZEYU_WALL_ID || id === ZEYU_LEFT_WALL_ID || id === ZEYU_RIGHT_WALL_ID))) {
﻿  ﻿  ﻿  ﻿  obj.details.dead = true;
﻿  ﻿  ﻿  }

﻿  ﻿  }
﻿  ﻿  body = body.GetNext();

﻿  }

﻿  _zeyu_terrain = null;

}

/*
 * This is core function for enabling destructible terrain Reference:
 * http://www.emanueleferonato.com/2013/10/17/how-to-create-destructible-terrain-using-box2d-step-2/
 * polygon winding order for clipper (outer == CW; holes == CCW)
 */
function zeyu_doExplosion(e) {
﻿  e.preventDefault();

﻿  if (!_zeyu_terrain)
﻿  ﻿  return;

﻿  var self = _zeyu_physics;

﻿  var offset = $('canvas').offset();

﻿  var pos = {
﻿  ﻿  x : e.pageX - offset.left,
﻿  ﻿  y : e.pageY - offset.top
﻿  };

﻿  var explosionPolygon = zeyu_createCircle(20, pos, 30);
﻿  for ( var i in _zeyu_terrain.details.terrainPolys) {
﻿  ﻿  var poly = _zeyu_terrain.details.terrainPolys[i];
﻿  ﻿  poly.holes.push(explosionPolygon);
﻿  }

﻿  var tempPolys = [];
﻿  for ( var i in _zeyu_terrain.details.terrainPolys) {
﻿  ﻿  var poly = _zeyu_terrain.details.terrainPolys[i];

﻿  ﻿  var subjPolygons = [poly.outer];
﻿  ﻿  var clipPolygons = poly.holes;
﻿  ﻿  var solutionPolygons = ClipperLib.ExPolygons();
﻿  ﻿  var clipType = ClipperLib.ClipType.ctDifference;
﻿  ﻿  var subjectFillType = ClipperLib.PolyFillType.pftNonZero;
﻿  ﻿  var clipFillType = ClipperLib.PolyFillType.pftNonZero;

﻿  ﻿  var cpr = new ClipperLib.Clipper();
﻿  ﻿  cpr.AddPolygons(subjPolygons, ClipperLib.PolyType.ptSubject);
﻿  ﻿  cpr.AddPolygons(clipPolygons, ClipperLib.PolyType.ptClip);
﻿  ﻿  var succeeded = cpr.Execute(clipType, solutionPolygons,
﻿  ﻿  ﻿  ﻿  subjectFillType, clipFillType);
﻿  ﻿  if (!succeeded) {
﻿  ﻿  ﻿  throw Error("Clipping failed...");
﻿  ﻿  }

﻿  ﻿  tempPolys = tempPolys.concat(solutionPolygons || []);
﻿  }

﻿  for (var i = 0; i < tempPolys.length; i++) {
﻿  ﻿  var lightenTolerance = 0.02;
﻿  ﻿  var cleanTolerance = 0.02;

﻿  ﻿  tempPolys[i].outer = ClipperLib.Clean(tempPolys[i].outer,
﻿  ﻿  ﻿  ﻿  cleanTolerance * self.scale);
﻿  ﻿  tempPolys[i].outer = ClipperLib.Lighten(tempPolys[i].outer,
﻿  ﻿  ﻿  ﻿  lightenTolerance * self.scale)[0];

﻿  ﻿  tempPolys[i].holes = ClipperLib.Lighten(tempPolys[i].holes,
﻿  ﻿  ﻿  ﻿  lightenTolerance * self.scale);
﻿  ﻿  tempPolys[i].holes = ClipperLib.Clean(tempPolys[i].holes,
﻿  ﻿  ﻿  ﻿  cleanTolerance * self.scale);
﻿  }

﻿  self.world.DestroyBody(_zeyu_terrain.body);
﻿  _zeyu_terrain = new zeyu_Body(_zeyu_physics, {
﻿  ﻿  type : "static",
﻿  ﻿  shape : "terrain",
﻿  ﻿  patternImg : _zeyu_resources.snowPattern,
﻿  ﻿  terrainPolys : tempPolys
﻿  });

};

function zeyu_createCircle(precision, origin, radius) {
﻿  var angle = 2 * Math.PI / precision;
﻿  var circleArray = [];
﻿  for (var i = 0; i < precision; i++) {
﻿  ﻿  circleArray.push({
﻿  ﻿  ﻿  x : origin.x + radius * Math.cos(angle * i),
﻿  ﻿  ﻿  y : origin.y + radius * Math.sin(angle * i)
﻿  ﻿  });
﻿  }
﻿  return circleArray.reverse();
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
﻿  var lastTime = 0;
﻿  var vendors = ['ms', 'moz', 'webkit', 'o'];
﻿  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
﻿  ﻿  window.requestAnimationFrame = window[vendors[x]
﻿  ﻿  ﻿  ﻿  + 'RequestAnimationFrame'];
﻿  ﻿  window.cancelAnimationFrame = window[vendors[x]
﻿  ﻿  ﻿  ﻿  + 'CancelAnimationFrame']
﻿  ﻿  ﻿  ﻿  || window[vendors[x] + 'CancelRequestAnimationFrame'];
﻿  }

﻿  if (!window.requestAnimationFrame) {
﻿  ﻿  window.requestAnimationFrame = function(callback, element) {
﻿  ﻿  ﻿  var currTime = new Date().getTime();
﻿  ﻿  ﻿  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
﻿  ﻿  ﻿  var id = window.setTimeout(function() {
﻿  ﻿  ﻿  ﻿  callback(currTime + timeToCall);
﻿  ﻿  ﻿  }, timeToCall);
﻿  ﻿  ﻿  lastTime = currTime + timeToCall;
﻿  ﻿  ﻿  return id;
﻿  ﻿  };
﻿  }

﻿  if (!window.cancelAnimationFrame) {
﻿  ﻿  window.cancelAnimationFrame = function(id) {
﻿  ﻿  ﻿  clearTimeout(id);
﻿  ﻿  };
﻿  }
}());

function zeyu_createTerrain(data) {
﻿  var polys = [];
﻿  for ( var i in data) {
﻿  ﻿  var obj = data[i];
﻿  ﻿  polys.push({
﻿  ﻿  ﻿  outer : zeyu_translatePoints(obj.outer),
﻿  ﻿  ﻿  holes : zeyu_translateHoles(obj.holes)
﻿  ﻿  });
﻿  }

﻿  _zeyu_terrain = new zeyu_Body(_zeyu_physics, {
﻿  ﻿  type : "static",
﻿  ﻿  shape : "terrain",
﻿  ﻿  patternImg : _zeyu_resources.snowPattern,
﻿  ﻿  // color : "#996633",
﻿  ﻿  terrainPolys : polys
﻿  });

}

function zeyu_createBouncers(data, restitution) {
﻿  for ( var i in data) {
﻿  ﻿  var points = data[i];
﻿  ﻿  zeyu_createPolygon(points, {
﻿  ﻿  ﻿  color : "pink",
﻿  ﻿  ﻿  restitution : 1.2
﻿  ﻿  });
﻿  }
}

function zeyu_createWalls(data) {
﻿  for ( var i in data) {
﻿  ﻿  var points = data[i];
﻿  ﻿  zeyu_createPolygon(points, {
﻿  ﻿  ﻿  color : "#C4460D",
﻿  ﻿  ﻿  zIndex : 1
﻿  ﻿  });
﻿  }
}

function zeyu_createPushers(data) {
﻿  for ( var i in data) {
﻿  ﻿  var points = data[i];
﻿  ﻿  var pusher = zeyu_createPolygon(points, {
﻿  ﻿  ﻿  color : "red"
﻿  ﻿  });

﻿  ﻿  pusher.beginContact = function(obj) {
﻿  ﻿  ﻿  if (obj.details.id === ZEYU_BALL_ID) {
﻿  ﻿  ﻿  ﻿  var body = obj.body;
﻿  ﻿  ﻿  ﻿  body.ApplyImpulse(new b2Vec2(0, -50), body.GetWorldCenter());
﻿  ﻿  ﻿  }
﻿  ﻿  };
﻿  }

}

function zeyu_createStartPoint(point, r) {

﻿  var pos = zeyu_translatePoint(point);

﻿  new zeyu_Body(_zeyu_physics, {
﻿  ﻿  id : ZEYU_START_POINT_ID,
﻿  ﻿  type : "static",
﻿  ﻿  color : "rgba(242,39,39,0.3)",
﻿  ﻿  shape : "circle",
﻿  ﻿  x : pos.x,
﻿  ﻿  y : pos.y,
﻿  ﻿  radius : r * _zeyu_canvasW,
﻿  ﻿  isSensor : true
﻿  });
}

function zeyu_createPolygon(points, details) {

﻿  var polyDetails = {
﻿  ﻿  type : "static",
﻿  ﻿  shape : "polygon",
﻿  ﻿  color : "e5e5e5",
﻿  ﻿  zIndex : 0,
﻿  ﻿  points : zeyu_translatePoints(points),
﻿  };

﻿  for ( var i in details) {
﻿  ﻿  polyDetails[i] = details[i];
﻿  }

﻿  return new zeyu_Body(_zeyu_physics, polyDetails);
}

function zeyu_createSensors(points) {
﻿  var sensorPoints = zeyu_translatePoints(points);
﻿  var candyNum = 0;

﻿  for ( var i in sensorPoints) {
﻿  ﻿  var pos = sensorPoints[i];
﻿  ﻿  var sensor = new zeyu_Body(_zeyu_physics, {
﻿  ﻿  ﻿  type : "static",
﻿  ﻿  ﻿  image : _zeyu_resources.bunnyImg,
﻿  ﻿  ﻿  shape : "circle",
﻿  ﻿  ﻿  zIndex : 1,
﻿  ﻿  ﻿  x : pos.x,
﻿  ﻿  ﻿  y : pos.y,
﻿  ﻿  ﻿  radius : ZEYU_BUNNY_R,
﻿  ﻿  ﻿  height : ZEYU_BUNNY_R * 2,
﻿  ﻿  ﻿  width : ZEYU_BUNNY_R * 2,
﻿  ﻿  ﻿  isSensor : true
﻿  ﻿  });

﻿  ﻿  sensor.beginContact = function(obj) {
﻿  ﻿  ﻿  if (obj.details.id === ZEYU_BALL_ID) {
﻿  ﻿  ﻿  ﻿  this.details.dead = true;
﻿  ﻿  ﻿  ﻿  colorCandy(++_zeyu_candyNum);
﻿  ﻿  ﻿  }
﻿  ﻿  };
﻿  }
}

function zeyu_createDestination(points) {
﻿  var finishingPoint = new zeyu_Body(_zeyu_physics, {
﻿  ﻿  type : "static",
﻿  ﻿  shape : "polygon",
﻿  ﻿  color : "yellow",
﻿  ﻿  isSensor : true,
﻿  ﻿  zIndex : 1,
﻿  ﻿  points : zeyu_translatePoints(points),
﻿  });

﻿  finishingPoint.beginContact = function(obj) {
﻿  ﻿  levelFinished();
﻿  ﻿  finishingPoint.beginContact = null;
﻿  ﻿  saveCollectedCandy(_zeyu_candyNum);
﻿  };
}

function zeyu_createRevoluteJoint(obj, point, motorSpeed) {
﻿  var revoluteJointDef = new b2RevoluteJointDef();

﻿  var anchor = zeyu_translatePoint({
﻿  ﻿  "x" : point.x,
﻿  ﻿  "y" : point.y
﻿  });

﻿  revoluteJointDef.Initialize(_zeyu_physics.world.GetGroundBody(), obj.body,
﻿  ﻿  ﻿  new b2Vec2(anchor.x / _zeyu_physics.scale, anchor.y
﻿  ﻿  ﻿  ﻿  ﻿  / _zeyu_physics.scale));

﻿  revoluteJointDef.maxMotorTorque = 5.0;
﻿  revoluteJointDef.motorSpeed = motorSpeed || 0;
﻿  revoluteJointDef.enableMotor = true;

﻿  return _zeyu_physics.world.CreateJoint(revoluteJointDef);
}

function zeyu_createPrismaticJoint(obj, point, axis, speed) {
﻿  var prismaticJointDef = new b2PrismaticJointDef();

﻿  var anchor = zeyu_translatePoint({
﻿  ﻿  "x" : point.x,
﻿  ﻿  "y" : point.y
﻿  });

﻿  prismaticJointDef.Initialize(obj.body, _zeyu_physics.world.GetGroundBody(),
﻿  ﻿  ﻿  new b2Vec2(anchor.x / _zeyu_physics.scale, anchor.y
﻿  ﻿  ﻿  ﻿  ﻿  / _zeyu_physics.scale), axis);

﻿  prismaticJointDef.maxMotorForce = 10.0;
﻿  prismaticJointDef.motorSpeed = speed || 0;
﻿  prismaticJointDef.enableMotor = true;

﻿  return _zeyu_physics.world.CreateJoint(prismaticJointDef);
}

function zeyu_translateHoles(shapes) {
﻿  var translated = [];
﻿  for ( var i in shapes) {

﻿  ﻿  // Holes are CCW
﻿  ﻿  translated.push(zeyu_translatePoints(shapes[i]).reverse());
﻿  }
﻿  return translated;
}

function zeyu_translatePoints(points) {
﻿  var translated = [];
﻿  for ( var i in points) {
﻿  ﻿  translated.push(zeyu_translatePoint(points[i]));
﻿  }
﻿  return translated;
}

function zeyu_translatePoint(point) {
﻿  return {
﻿  ﻿  x : point.x * _zeyu_canvasW,
﻿  ﻿  y : _zeyu_canvasH - point.y * _zeyu_canvasW
﻿  };
}

// Body.js
(function(window) {

﻿  function zeyu_Body(physics, details) {
﻿  ﻿  this.details = details = details || {};

﻿  ﻿  // Create the definition
﻿  ﻿  this.definition = new b2BodyDef();

﻿  ﻿  // Set up the definition
﻿  ﻿  for ( var k in this.definitionDefaults) {
﻿  ﻿  ﻿  this.definition[k] = details[k] || this.definitionDefaults[k];
﻿  ﻿  }
﻿  ﻿  this.definition.position = new b2Vec2(details.x / physics.scale || 0,
﻿  ﻿  ﻿  ﻿  details.y / physics.scale || 0);
﻿  ﻿  this.definition.linearVelocity = new b2Vec2(details.vx / physics.scale
﻿  ﻿  ﻿  ﻿  || 0, details.vy / physics.scale || 0);
﻿  ﻿  this.definition.userData = this;
﻿  ﻿  this.definition.type = details.type == "static"
﻿  ﻿  ﻿  ﻿  ? b2Body.b2_staticBody
﻿  ﻿  ﻿  ﻿  : b2Body.b2_dynamicBody;

﻿  ﻿  // Create the Body
﻿  ﻿  this.body = physics.world.CreateBody(this.definition);

﻿  ﻿  // Create the fixture
﻿  ﻿  this.fixtureDef = new b2FixtureDef();
﻿  ﻿  for ( var l in this.fixtureDefaults) {
﻿  ﻿  ﻿  this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
﻿  ﻿  }

﻿  ﻿  for ( var k in this.defaults) {
﻿  ﻿  ﻿  this.details[k] = details[k] || this.defaults[k];
﻿  ﻿  }

﻿  ﻿  switch (details.shape) {
﻿  ﻿  ﻿  case "circle" :
﻿  ﻿  ﻿  ﻿  details.radius = details.radius || this.defaults.radius;
﻿  ﻿  ﻿  ﻿  this.fixtureDef.shape = new b2CircleShape(details.radius
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  / physics.scale);
﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  case "polygon" :
﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  case "terrain" :
﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  case "block" :
﻿  ﻿  ﻿  default :
﻿  ﻿  ﻿  ﻿  details.width = details.width || this.defaults.width;
﻿  ﻿  ﻿  ﻿  details.height = details.height || this.defaults.height;

﻿  ﻿  ﻿  ﻿  this.fixtureDef.shape = new b2PolygonShape();
﻿  ﻿  ﻿  ﻿  this.fixtureDef.shape.SetAsBox(details.width / 2
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  / physics.scale, details.height / 2 / physics.scale);
﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  }

﻿  ﻿  if (details.shape === "polygon") {

﻿  ﻿  ﻿  var triContext = new poly2tri.SweepContext(details.points, {
﻿  ﻿  ﻿  ﻿  cloneArrays : true
﻿  ﻿  ﻿  });

﻿  ﻿  ﻿  triContext.triangulate();
﻿  ﻿  ﻿  var triangles = triContext.getTriangles();
﻿  ﻿  ﻿  for ( var i in triangles) {
﻿  ﻿  ﻿  ﻿  var verticesVec = [];
﻿  ﻿  ﻿  ﻿  for ( var j in triangles[i].points_) {
﻿  ﻿  ﻿  ﻿  ﻿  var point = triangles[i].points_[j];
﻿  ﻿  ﻿  ﻿  ﻿  verticesVec.push({
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  x : point.x / physics.scale,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  y : point.y / physics.scale
﻿  ﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  var polyShape = new b2PolygonShape();
﻿  ﻿  ﻿  ﻿  polyShape.SetAsVector(verticesVec);
﻿  ﻿  ﻿  ﻿  this.fixtureDef.shape = polyShape;
﻿  ﻿  ﻿  ﻿  var fixture = this.body.CreateFixture(this.fixtureDef);
﻿  ﻿  ﻿  ﻿  if (details.isSensor)
﻿  ﻿  ﻿  ﻿  ﻿  fixture.SetSensor(details.isSensor);
﻿  ﻿  ﻿  }

﻿  ﻿  } else if (details.shape === "terrain") {
﻿  ﻿  ﻿  var terrainTriangles = [];
﻿  ﻿  ﻿  for (var i = 0; i < details.terrainPolys.length; i++) {
﻿  ﻿  ﻿  ﻿  var poly = details.terrainPolys[i];

﻿  ﻿  ﻿  ﻿  if (!poly.outer)
﻿  ﻿  ﻿  ﻿  ﻿  continue;

﻿  ﻿  ﻿  ﻿  var triContext = new poly2tri.SweepContext(poly.outer, {
﻿  ﻿  ﻿  ﻿  ﻿  cloneArrays : true
﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  for ( var j in poly.holes) {
﻿  ﻿  ﻿  ﻿  ﻿  triContext.addHole(poly.holes[j]);
﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  try {
﻿  ﻿  ﻿  ﻿  ﻿  triContext.triangulate();
﻿  ﻿  ﻿  ﻿  } catch (e) {

﻿  ﻿  ﻿  ﻿  ﻿  console.log("I got this fixed!");

﻿  ﻿  ﻿  ﻿  ﻿  var delta = 0.0001;
﻿  ﻿  ﻿  ﻿  ﻿  var offsetted = [];
﻿  ﻿  ﻿  ﻿  ﻿  for ( var k in poly.outer) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  offsetted.push({
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  x : poly.outer[k].x
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  + (Math.random() > 0.5 ? 1 : -1) * delta
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  * k,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  y : poly.outer[k].y
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  + (Math.random() > 0.5 ? 1 : -1) * delta
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  * k
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  ﻿  triContext = new poly2tri.SweepContext(offsetted, {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  cloneArrays : true
﻿  ﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  ﻿  for ( var n in poly.holes) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  triContext.addHole(poly.holes[n]);
﻿  ﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  ﻿  triContext.triangulate();
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  terrainTriangles = terrainTriangles.concat(triContext
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  .getTriangles()
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  || []);
﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  for ( var i in terrainTriangles) {
﻿  ﻿  ﻿  ﻿  var verticesVec = [];
﻿  ﻿  ﻿  ﻿  for ( var j in terrainTriangles[i].points_) {
﻿  ﻿  ﻿  ﻿  ﻿  var point = terrainTriangles[i].points_[j];
﻿  ﻿  ﻿  ﻿  ﻿  verticesVec.push({
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  x : point.x / physics.scale,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  y : point.y / physics.scale
﻿  ﻿  ﻿  ﻿  ﻿  });
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  polyShape = new b2PolygonShape();
﻿  ﻿  ﻿  ﻿  polyShape.SetAsVector(verticesVec);
﻿  ﻿  ﻿  ﻿  this.fixtureDef.shape = polyShape;
﻿  ﻿  ﻿  ﻿  this.body.CreateFixture(this.fixtureDef);
﻿  ﻿  ﻿  }

﻿  ﻿  } else {
﻿  ﻿  ﻿  var fixture = this.body.CreateFixture(this.fixtureDef);
﻿  ﻿  ﻿  if (details.isSensor)
﻿  ﻿  ﻿  ﻿  fixture.SetSensor(details.isSensor);
﻿  ﻿  }

﻿  ﻿  this.update = function() {
﻿  ﻿  ﻿  details.life--;
﻿  ﻿  ﻿  if (details.life < 0) {
﻿  ﻿  ﻿  ﻿  details.dead = true;
﻿  ﻿  ﻿  }
﻿  ﻿  };

﻿  ﻿  this.draw = function(context) {
﻿  ﻿  ﻿  var pos = this.body.GetPosition(), angle = this.body.GetAngle();

﻿  ﻿  ﻿  context.save();
﻿  ﻿  ﻿  context.translate(pos.x * physics.scale, pos.y * physics.scale);
﻿  ﻿  ﻿  context.rotate(angle);

﻿  ﻿  ﻿  if (this.details.color || this.details.patternImg) {
﻿  ﻿  ﻿  ﻿  context.fillStyle = this.details.color;

﻿  ﻿  ﻿  ﻿  switch (this.details.shape) {
﻿  ﻿  ﻿  ﻿  ﻿  case "circle" :
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.beginPath();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.arc(0, 0, this.details.radius, 0, Math.PI * 2);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fill();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  ﻿  ﻿  case "polygon" :
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var points = this.details.points;
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.beginPath();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.moveTo(points[0].x, points[0].y);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  for (var i = 1; i < points.length; i++) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.lineTo(points[i].x, points[i].y);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fill();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  ﻿  ﻿  case "terrain" :

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  if (this.details.patternImg) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var pattern = context.createPattern(
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  this.details.patternImg, "repeat");
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fillStyle = pattern;

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  for ( var k in this.details.terrainPolys) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var poly = this.details.terrainPolys[k];

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  if (!poly.outer)
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  continue;

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.beginPath();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.moveTo(poly.outer[0].x, poly.outer[0].y);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  for (var i = 1; i < poly.outer.length; i++) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  .lineTo(poly.outer[i].x,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  poly.outer[i].y);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.closePath();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fill();

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  for ( var k in this.details.terrainPolys) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var poly = this.details.terrainPolys[k];

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fillStyle = "black";
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var holes = poly.holes;
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  for ( var i in holes) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  var hole = holes[i];
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.beginPath();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.moveTo(hole[0].x, hole[0].y);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  for (var j = 1; j < hole.length; j++) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.lineTo(hole[j].x, hole[j].y);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fill();
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  ﻿  ﻿  case "block" :
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  context.fillRect(-this.details.width / 2,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  -this.details.height / 2, this.details.width,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  this.details.height);
﻿  ﻿  ﻿  ﻿  ﻿  default :
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  if (this.details.image) {
﻿  ﻿  ﻿  ﻿  context.drawImage(this.details.image, -this.details.width / 2,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  -this.details.height / 2, this.details.width,
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  this.details.height);

﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  context.restore();

﻿  ﻿  };

﻿  }

﻿  window.zeyu_Body = zeyu_Body;

﻿  zeyu_Body.prototype.defaults = {
﻿  ﻿  shape : "block",
﻿  ﻿  width : 120,
﻿  ﻿  height : 120,
﻿  ﻿  radius : 30,
﻿  ﻿  life : Infinity,
﻿  ﻿  dead : false,
﻿  ﻿  zIndex : 0
﻿  };

﻿  zeyu_Body.prototype.fixtureDefaults = {
﻿  ﻿  density : 2,
﻿  ﻿  friction : 1,
﻿  ﻿  restitution : 0.2
﻿  };

﻿  zeyu_Body.prototype.definitionDefaults = {
﻿  ﻿  active : true,
﻿  ﻿  allowSleep : true,
﻿  ﻿  angle : 0,
﻿  ﻿  angularVelocity : 0,
﻿  ﻿  awake : true,
﻿  ﻿  bullet : false,
﻿  ﻿  fixedRotation : false
﻿  };

})(window);

// ResourceLoader.js
(function(window) {
﻿  function zeyu_ResourceLoader(objList, callback) {
﻿  ﻿  this.objList = objList;
﻿  ﻿  this.onload = callback;
﻿  ﻿  this.resources = {};
﻿  ﻿  this.loadCount = 0;
﻿  }

﻿  zeyu_ResourceLoader.prototype.loadResource = function(name, type, url) {

﻿  ﻿  var loader = this;
﻿  ﻿  var res;
﻿  ﻿  switch (type) {
﻿  ﻿  ﻿  case "audio" :
﻿  ﻿  ﻿  ﻿  res = new Audio();
﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  case "image" :
﻿  ﻿  ﻿  ﻿  res = new Image();
﻿  ﻿  ﻿  ﻿  break;
﻿  ﻿  ﻿  default :
﻿  ﻿  ﻿  ﻿  ;
﻿  ﻿  }

﻿  ﻿  res.src = url;

﻿  ﻿  res.onload = function() {

﻿  ﻿  ﻿  loader.resources[name] = res;

﻿  ﻿  ﻿  if (++loader.loadCount == loader.objList.length)
﻿  ﻿  ﻿  ﻿  loader.onload(loader.resources);
﻿  ﻿  };

﻿  };

﻿  zeyu_ResourceLoader.prototype.load = function() {
﻿  ﻿  for (var i = 0; i < this.objList.length; ++i) {
﻿  ﻿  ﻿  var obj = this.objList[i];
﻿  ﻿  ﻿  this.loadResource(obj.name, obj.type, obj.url);
﻿  ﻿  }
﻿  };

﻿  window.zeyu_ResourceLoader = zeyu_ResourceLoader;
})(window);

// Physics.js
(function(window) {

﻿  var GRAVITY = 30;
﻿  var BRUSH_R = 15;

﻿  function zeyu_Physics(element, scale) {
﻿  ﻿  var gravity = new b2Vec2(0, GRAVITY);
﻿  ﻿  this.world = new b2World(gravity, true);
﻿  ﻿  this.element = element; // most likely the canvas element
﻿  ﻿  this.context = element.getContext("2d");
﻿  ﻿  this.scale = scale || 30;
﻿  ﻿  this.dtRemaining = 0;
﻿  ﻿  this.stepAmount = 1 / 60;
﻿  }

﻿  zeyu_Physics.prototype.step = function(dt) {
﻿  ﻿  this.dtRemaining += dt;
﻿  ﻿  while (this.dtRemaining > this.stepAmount) {
﻿  ﻿  ﻿  this.dtRemaining -= this.stepAmount;
﻿  ﻿  ﻿  this.world.Step(this.stepAmount, 8, 3);
﻿  ﻿  }

﻿  ﻿  var body = this.world.GetBodyList();

﻿  ﻿  if (this.debugDraw) {
﻿  ﻿  ﻿  this.world.DrawDebugData();
﻿  ﻿  } else {
﻿  ﻿  ﻿  this.context.clearRect(0, 0, this.element.width,
﻿  ﻿  ﻿  ﻿  ﻿  this.element.height);
﻿  ﻿  }

﻿  ﻿  var deadBodies = [];

﻿  ﻿  var drawLater = [];

﻿  ﻿  while (body) {
﻿  ﻿  ﻿  var obj = body.GetUserData();
﻿  ﻿  ﻿  if (obj) {
﻿  ﻿  ﻿  ﻿  obj.update();
﻿  ﻿  ﻿  ﻿  if (obj.details.dead)
﻿  ﻿  ﻿  ﻿  ﻿  deadBodies.push(body);
﻿  ﻿  ﻿  ﻿  if (!this.debugDraw) {
﻿  ﻿  ﻿  ﻿  ﻿  if (obj.details.zIndex > 0) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  drawLater.push(obj);
﻿  ﻿  ﻿  ﻿  ﻿  } else {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  obj.draw(this.context);
﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }

﻿  ﻿  ﻿  body = body.GetNext();
﻿  ﻿  }

﻿  ﻿  for ( var i in drawLater) {
﻿  ﻿  ﻿  drawLater[i].draw(this.context);
﻿  ﻿  }

﻿  ﻿  // Remove dead bodies
﻿  ﻿  for (var i = 0; i < deadBodies.length; i++) {
﻿  ﻿  ﻿  this.world.DestroyBody(deadBodies[i]);
﻿  ﻿  }
﻿  };

﻿  zeyu_Physics.prototype.debug = function() {
﻿  ﻿  this.debugDraw = new b2DebugDraw();
﻿  ﻿  this.debugDraw.SetSprite(this.context);
﻿  ﻿  this.debugDraw.SetDrawScale(this.scale);
﻿  ﻿  this.debugDraw.SetFillAlpha(0.3);
﻿  ﻿  this.debugDraw.SetLineThickness(1.0);
﻿  ﻿  this.debugDraw
﻿  ﻿  ﻿  ﻿  .SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
﻿  ﻿  this.world.SetDebugDraw(this.debugDraw);
﻿  };

﻿  zeyu_Physics.prototype.onMouseDown = function(callback) {

﻿  ﻿  function handleMouseDown(e) {
﻿  ﻿  ﻿  e.preventDefault();
﻿  ﻿  ﻿  callback(e);
﻿  ﻿  }

﻿  ﻿  this.element.addEventListener("mousedown", handleMouseDown);

﻿  };

﻿  zeyu_Physics.prototype.onMouseUp = function(callback) {

﻿  ﻿  function handleMouseUp(e) {
﻿  ﻿  ﻿  e.preventDefault();
﻿  ﻿  ﻿  callback(e);
﻿  ﻿  }

﻿  ﻿  this.element.addEventListener("mouseup", handleMouseUp);

﻿  };

﻿  zeyu_Physics.prototype.onClick = function(callback) {

﻿  ﻿  function handleClick(e) {
﻿  ﻿  ﻿  e.preventDefault();
﻿  ﻿  ﻿  callback(e);
﻿  ﻿  }

﻿  ﻿  this.element.addEventListener("click", handleClick);
﻿  };

﻿  zeyu_Physics.prototype.rightClickToCreate = function(callback) {

﻿  ﻿  function handleRightClick(e) {
﻿  ﻿  ﻿  e.preventDefault();
﻿  ﻿  ﻿  callback(e);
﻿  ﻿  }

﻿  ﻿  this.element.addEventListener("contextmenu", handleRightClick);
﻿  };

﻿  zeyu_Physics.prototype.onTouchEnd = function(callback) {

﻿  ﻿  function handleTouchEnd(e) {
﻿  ﻿  ﻿  e.preventDefault();
﻿  ﻿  ﻿  callback(e);
﻿  ﻿  }

﻿  ﻿  this.element.addEventListener("touchend", handleTouchEnd);
﻿  };

﻿  zeyu_Physics.prototype.onTouchStart = function(callback) {

﻿  ﻿  function handleTouchStart(e) {
﻿  ﻿  ﻿  e.preventDefault();
﻿  ﻿  ﻿  callback(e);
﻿  ﻿  }

﻿  ﻿  this.element.addEventListener("touchstart", handleTouchStart);
﻿  };

﻿  zeyu_Physics.prototype.collision = function() {
﻿  ﻿  this.listener = new Box2D.Dynamics.b2ContactListener();
﻿  ﻿  this.listener.BeginContact = function(contact) {
﻿  ﻿  ﻿  var bodyA = contact.GetFixtureA().GetBody().GetUserData(), bodyB = contact
﻿  ﻿  ﻿  ﻿  ﻿  .GetFixtureB().GetBody().GetUserData();

﻿  ﻿  ﻿  if (bodyA.beginContact) {
﻿  ﻿  ﻿  ﻿  bodyA.beginContact(bodyB);
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  if (bodyB.beginContact) {
﻿  ﻿  ﻿  ﻿  bodyB.beginContact(bodyA);
﻿  ﻿  ﻿  }
﻿  ﻿  };
﻿  ﻿  this.listener.EndContact = function(contact) {
﻿  ﻿  ﻿  var bodyA = contact.GetFixtureA().GetBody().GetUserData(), bodyB = contact
﻿  ﻿  ﻿  ﻿  ﻿  .GetFixtureB().GetBody().GetUserData();

﻿  ﻿  ﻿  if (bodyA.endContact) {
﻿  ﻿  ﻿  ﻿  bodyA.endContact(bodyB);
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  if (bodyB.endContact) {
﻿  ﻿  ﻿  ﻿  bodyB.endContact(bodyA);
﻿  ﻿  ﻿  }
﻿  ﻿  };

﻿  ﻿  this.listener.PostSolve = function(contact, impulse) {
﻿  ﻿  ﻿  var bodyA = contact.GetFixtureA().GetBody().GetUserData(), bodyB = contact
﻿  ﻿  ﻿  ﻿  ﻿  .GetFixtureB().GetBody().GetUserData();

﻿  ﻿  ﻿  if (bodyA.postSolve) {
﻿  ﻿  ﻿  ﻿  bodyA.postSolve(contact, impulse);
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  if (bodyB.postSolve) {
﻿  ﻿  ﻿  ﻿  bodyB.postSolve(contact, impulse);
﻿  ﻿  ﻿  }

﻿  ﻿  };
﻿  ﻿  this.world.SetContactListener(this.listener);
﻿  };

﻿  window.zeyu_Physics = zeyu_Physics;
})(window);