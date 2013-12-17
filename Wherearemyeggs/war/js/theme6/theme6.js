var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
b2MassData = Box2D.Collision.Shapes.b2MassData,
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
b2Shape = Box2D.Collision.Shapes.b2Shape,
b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
b2Contact = Box2D.Dynamics.Contacts.b2Contact,
b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
b2Body = Box2D.Dynamics.b2Body,
b2_staticBody = Box2D.Dynamics.b2Body.b2_staticBody,
b2_kinematicBody = Box2D.Dynamics.b2Body.b2_kinematicBody,
b2_dynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody,
b2BodyDef = Box2D.Dynamics.b2BodyDef,
b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
b2ContactListener = Box2D.Dynamics.b2ContactListener,
b2ContactManager = Box2D.Dynamics.b2ContactManager,
b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
b2FilterData = Box2D.Dynamics.b2FilterData,
b2Fixture = Box2D.Dynamics.b2Fixture,
b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
b2Island = Box2D.Dynamics.b2Island,
b2TimeStep = Box2D.Dynamics.b2TimeStep,
b2World = Box2D.Dynamics.b2World,
b2Color = Box2D.Common.b2Color,
b2internal = Box2D.Common.b2internal,
b2Settings = Box2D.Common.b2Settings,
b2Mat22 = Box2D.Common.Math.b2Mat22,
b2Mat33 = Box2D.Common.Math.b2Mat33,
b2Math = Box2D.Common.Math.b2Math,
b2Sweep = Box2D.Common.Math.b2Sweep,
b2Transform = Box2D.Common.Math.b2Transform,
b2Vec2 = Box2D.Common.Math.b2Vec2,
b2Vec3 = Box2D.Common.Math.b2Vec3,
b2AABB = Box2D.Collision.b2AABB,
b2Bound = Box2D.Collision.b2Bound,
b2BoundValues = Box2D.Collision.b2BoundValues,
b2Collision = Box2D.Collision.b2Collision,
b2ContactID = Box2D.Collision.b2ContactID,
b2ContactPoint = Box2D.Collision.b2ContactPoint,
b2Distance = Box2D.Collision.b2Distance,
b2DistanceInput = Box2D.Collision.b2DistanceInput,
b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
b2DynamicTree = Box2D.Collision.b2DynamicTree,
b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
b2Manifold = Box2D.Collision.b2Manifold,
b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
b2Point = Box2D.Collision.b2Point,
b2RayCastInput = Box2D.Collision.b2RayCastInput,
b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
b2Segment = Box2D.Collision.b2Segment,
b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
b2Simplex = Box2D.Collision.b2Simplex,
b2SimplexCache = Box2D.Collision.b2SimplexCache,
b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
b2TOIInput = Box2D.Collision.b2TOIInput,
b2WorldManifold = Box2D.Collision.b2WorldManifold,
ClipVertex = Box2D.Collision.ClipVertex,
Features = Box2D.Collision.Features,
IBroadPhase = Box2D.Collision.IBroadPhase,
b2Joint = Box2D.Dynamics.Joints.b2Joint,
b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef,
b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef;

var canvas;
var context;
var myDebugDraw; 
var world = null;
var visibleFixturesQueryCallback;
var m_fixtures;

var level1Timer;
var level2Timer;
var level3Timer;
var level4Timer;
var level5Timer;
var level6Timer;
var level7Timer;
var level8Timer;
var level9Timer;

function visibleFixturesQueryCallback(fixture) {
    m_fixtures.push(fixture);
    return true;
}