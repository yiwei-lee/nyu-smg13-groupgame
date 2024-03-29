/*
 *
 * Constants dependencies: BALL_ID, BUNNY_ID, BUNNY_R, 
 * LEFT_WALL_ID, RIGHT_WALL_ID, WALL_ID, START_BOX_ID
 * Global variable dependencies: _physics, _terrain, _resources, _box
 * _canvasW, _canvasH
 */

//TODO Try to reduce dependencies
//TODO refactor code
var _levelLoader = {
	levels : [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix,
			levelSeven, levelEight, levelNine],
	load : function(pos) {
		this.levels[pos]();
	}
};

function levelOne() {

	createStartPoint({
		"x" : 0.5537500381469727,
		"y" : 0.6912499666213989
	}, 0.09500002861022949);

	createTerrain([{
		outer : [{
			"x" : 0.001249939203262329,
			"y" : 0.7137500047683716
		}, {
			"x" : 0.32624995708465576,
			"y" : 0.6137499809265137
		}, {
			"x" : 0.47624993324279785,
			"y" : 0.5887500047683716
		}, {
			"x" : 0.5762499570846558,
			"y" : 0.5387499928474426
		}, {
			"x" : 0.6512500047683716,
			"y" : 0.5887500047683716
		}, {
			"x" : 1.00124990940094,
			"y" : 0.6887499690055847
		}, {
			"x" : 1.00124990940094,
			"y" : 0.18874996900558472
		}, {
			"x" : 0.001249939203262329,
			"y" : 0.18874996900558472
		}],
		holes : [[{
			"x" : 0.37624993920326233,
			"y" : 0.5137499570846558
		}, {
			"x" : 0.37624993920326233,
			"y" : 0.4637500047683716
		}, {
			"x" : 0.4262499511241913,
			"y" : 0.4637500047683716
		}, {
			"x" : 0.4262499511241913,
			"y" : 0.5137499570846558
		}], [{
			"x" : 0.6012499332427979,
			"y" : 0.38874995708465576
		}, {
			"x" : 0.6012499332427979,
			"y" : 0.4387499690055847
		}, {
			"x" : 0.6512500047683716,
			"y" : 0.4387499690055847
		}, {
			"x" : 0.6512500047683716,
			"y" : 0.38874995708465576
		}], [{
			"x" : 0.47624993324279785,
			"y" : 0.3137499690055847
		}, {
			"x" : 0.47624993324279785,
			"y" : 0.26374995708465576
		}, {
			"x" : 0.5262500047683716,
			"y" : 0.26374995708465576
		}, {
			"x" : 0.5262500047683716,
			"y" : 0.3137499690055847
		}]]
	}]);

	createSensors([{
		"x" : 0.4012499451637268,
		"y" : 0.48874998092651367
	}, {
		"x" : 0.6262499094009399,
		"y" : 0.4137499928474426
	}, {
		"x" : 0.5012499094009399,
		"y" : 0.28874996304512024
	}]);

	createDestination([{
		"x" : 0.42500001192092896,
		"y" : 0
	}, {
		"x" : 0.42500001192092896,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.550000011920929,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.550000011920929,
		"y" : 0
	}]);

}

function levelTwo() {

	createStartPoint({
		"x" : 0.11624997854232788,
		"y" : 0.6937499642372131
	}, 0.08933781832456589);

	createTerrain([{
		outer : [{
			"x" : 0,
			"y" : 0.550000011920929
		}, {
			"x" : 0.32500001788139343,
			"y" : 0.6500000357627869
		}, {
			"x" : 0.6000000238418579,
			"y" : 0.625
		}, {
			"x" : 0.875,
			"y" : 0.625
		}, {
			"x" : 0.9750000238418579,
			"y" : 0.4749999940395355
		}, {
			"x" : 0.8500000238418579,
			"y" : 0.25
		}, {
			"x" : 0.625,
			"y" : 0.17499999701976776
		}, {
			"x" : 0.2750000059604645,
			"y" : 0.20000000298023224
		}, {
			"x" : 0,
			"y" : 0.2750000059604645
		}],
		holes : [[{
			"x" : 0.45000001788139343,
			"y" : 0.2750000059604645
		}, {
			"x" : 0.45000001788139343,
			"y" : 0.22500000894069672
		}, {
			"x" : 0.5,
			"y" : 0.22500000894069672
		}, {
			"x" : 0.5,
			"y" : 0.2750000059604645
		}], [{
			"x" : 0.25,
			"y" : 0.574999988079071
		}, {
			"x" : 0.25,
			"y" : 0.5250000357627869
		}, {
			"x" : 0.30000001192092896,
			"y" : 0.5250000357627869
		}, {
			"x" : 0.30000001192092896,
			"y" : 0.574999988079071
		}], [{
			"x" : 0.824999988079071,
			"y" : 0.5250000357627869
		}, {
			"x" : 0.824999988079071,
			"y" : 0.4749999940395355
		}, {
			"x" : 0.875,
			"y" : 0.4749999940395355
		}, {
			"x" : 0.875,
			"y" : 0.5250000357627869
		}]]
	}]);

	// create a wall

	createWalls([[{
		"x" : 0.22500000894069672,
		"y" : 0.45000001788139343
	}, {
		"x" : 0.675000011920929,
		"y" : 0.45000001788139343
	}, {
		"x" : 0.7875000238418579,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.4749999940395355,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.16249997913837433,
		"y" : 0.4000000059604645
	}]]);

	createSensors([{
		"x" : 0.2750000059604645,
		"y" : 0.550000011920929
	}, {
		"x" : 0.8500000238418579,
		"y" : 0.5
	}, {
		"x" : 0.4749999940395355,
		"y" : 0.25
	}]);

	createDestination([{
		"x" : 0.4000000059604645,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.4000000059604645,
		"y" : 0
	}, {
		"x" : 0.550000011920929,
		"y" : 0
	}, {
		"x" : 0.550000011920929,
		"y" : 0.02500000037252903
	}]);

}

function levelThree() {

	createStartPoint({
		"x" : 0.8612500429153442,
		"y" : 0.7162500023841858
	}, 0.06543124467134476);

	createTerrain([{
		outer : [{
			"x" : 0.925000011920929,
			"y" : 0.675000011920929
		}, {
			"x" : -0.05000000074505806,
			"y" : 0.625
		}, {
			"x" : 0.05000000074505806,
			"y" : 0.42500001192092896
		}, {
			"x" : 0.925000011920929,
			"y" : 0.4749999940395355
		}],
		holes : [[{
			"x" : 0.05000000074505806,
			"y" : 0.574999988079071
		}, {
			"x" : 0.05000000074505806,
			"y" : 0.5250000357627869
		}, {
			"x" : 0.10000000149011612,
			"y" : 0.5250000357627869
		}, {
			"x" : 0.10000000149011612,
			"y" : 0.574999988079071
		}]]
	}, {
		outer : [{
			"x" : 0.05000000074505806,
			"y" : 0.2750000059604645
		}, {
			"x" : 0.05000000074505806,
			"y" : 0.10000000149011612
		}, {
			"x" : 0.4000000059604645,
			"y" : 0.07500000298023224
		}, {
			"x" : 0.3499999940395355,
			"y" : 0.3499999940395355
		}],
		holes : []
	}]);

	createWalls([[{
		"x" : 0.45000001788139343,
		"y" : 0.22500000894069672
	}, {
		"x" : 0.699999988079071,
		"y" : 0.15000000596046448
	}, {
		"x" : 0.699999988079071,
		"y" : 0
	}, {
		"x" : 0.75,
		"y" : 0
	}, {
		"x" : 0.75,
		"y" : 0.20000000298023224
	}], [{
		"x" : 0.949999988079071,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.22500000894069672,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.949999988079071,
		"y" : 0.3499999940395355
	}]]);

	createSensors([{
		"x" : 0.07500000298023224,
		"y" : 0.550000011920929
	}, {
		"x" : 0.125,
		"y" : 0.375
	}, {
		"x" : 0.5,
		"y" : 0.30000001192092896
	}]);

	createDestination([{
		"x" : 0.800000011920929,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.800000011920929,
		"y" : 0
	}, {
		"x" : 0.9000000357627869,
		"y" : 0
	}, {
		"x" : 0.9000000357627869,
		"y" : 0.02500000037252903
	}]);
}

function levelFour() {

	createStartPoint({
		"x" : 0.14874997735023499,
		"y" : 0.7212499976158142
	}, 0.08746424317359924);

	createTerrain([{
		outer : [{
			"x" : -0.0012500286102294922,
			"y" : 0.7162500023841858
		}, {
			"x" : 0.14874997735023499,
			"y" : 0.6687500476837158
		}, {
			"x" : 0.32124996185302734,
			"y" : 0.7112500071525574
		}, {
			"x" : 0.3187500238418579,
			"y" : 0.4287499785423279
		}, {
			"x" : 0.47874999046325684,
			"y" : 0.20624998211860657
		}, {
			"x" : 0.001249939203262329,
			"y" : 0.2137499749660492
		}],
		holes : [[{
			"x" : 0.2750000059604645,
			"y" : 0.30000001192092896
		}, {
			"x" : 0.2750000059604645,
			"y" : 0.25
		}, {
			"x" : 0.32500001788139343,
			"y" : 0.25
		}, {
			"x" : 0.32500001788139343,
			"y" : 0.30000001192092896
		}]]
	}, {
		outer : [{
			"x" : 0.7250000238418579,
			"y" : 0.699999988079071
		}, {
			"x" : 0.6500000357627869,
			"y" : 0.17499999701976776
		}, {
			"x" : 0.949999988079071,
			"y" : 0.17499999701976776
		}, {
			"x" : 0.949999988079071,
			"y" : 0.675000011920929
		}],
		holes : []
	}]);

	createWalls([[{
		"x" : 0.574999988079071,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.550000011920929,
		"y" : 0
	}, {
		"x" : 0.625,
		"y" : 0
	}]]);

	createSensors([{
		"x" : 0.30000001192092896,
		"y" : 0.2750000059604645
	}, {
		"x" : 0.574999988079071,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.7250000238418579,
		"y" : 0.05000000074505806
	}]);

	createDestination([{
		"x" : 0.800000011920929,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.800000011920929,
		"y" : 0
	}, {
		"x" : 0.9000000357627869,
		"y" : 0
	}, {
		"x" : 0.9000000357627869,
		"y" : 0.02500000037252903
	}]);
}

function levelFive() {

	createStartPoint({
        "x": 0.09874996542930603,
        "y": 0.5537500381469727
    }, 0.12454922497272491);

	createTerrain([{
		outer : [{
			"x" : -0.1012500524520874,
			"y" : 0.4912499785423279
		}, {
			"x" : 0.2887499928474426,
			"y" : 0.5112499594688416
		}, {
			"x" : 0.3037499785423279,
			"y" : 0.1887499988079071
		}, {
			"x" : -0.07625001668930054,
			"y" : 0.19374996423721313
		}],
		holes : []
	}]);

	createBouncers([[{
		"x" : 0.25,
		"y" : 0
	}, {
		"x" : 0.25,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.32500001788139343,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.32500001788139343,
		"y" : 0
	}], [{
		"x" : 0.375,
		"y" : 0.6000000238418579
	}, {
		"x" : 0.375,
		"y" : 0.550000011920929
	}, {
		"x" : 0.550000011920929,
		"y" : 0.6000000238418579
	}, {
		"x" : 0.550000011920929,
		"y" : 0.6500000357627869
	}], [{
		"x" : 0.574999988079071,
		"y" : 0
	}, {
		"x" : 0.5750000476837158,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.6500000357627869,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.6500000357627869,
		"y" : 0
	}], [{
		"x" : 0.800000011920929,
		"y" : 0.375
	}, {
		"x" : 0.800000011920929,
		"y" : 0.32500001788139343
	}, {
		"x" : 1.0162501335144043,
		"y" : 0.32625001668930054
	}, {
		"x" : 1.0162501335144043,
		"y" : 0.3762499988079071
	}]], 1.2);

	createSensors([{
		"x" : 0.3499999940395355,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.75,
		"y" : 0.4749999940395355
	}, {
		"x" : 0.625,
		"y" : 0.2750000059604645
	}]);

	createDestination([{
		"x" : 0.8500000238418579,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.8500000238418579,
		"y" : 0.375
	}, {
		"x" : 0.925000011920929,
		"y" : 0.375
	}, {
		"x" : 0.925000011920929,
		"y" : 0.4000000059604645
	}]);

}

function levelSix() {

	createStartPoint({
        "x": 0.13874998688697815,
        "y": 0.6962499618530273
    }, 0.09890014678239822);

	createTerrain([{
		outer : [{
			"x" : -0.06791657209396362,
			"y" : 0.6770836114883423
		}, {
			"x" : 0.5291669368743896,
			"y" : 0.5366671681404114
		}, {
			"x" : 1.032083511352539,
			"y" : 0.6070836186408997
		}, {
			"x" : 1.024999976158142,
			"y" : -0.024999964982271194
		}, {
			"x" : -0.05000000074505806,
			"y" : -0.05000000074505806
		}],
		holes : [[{
			"x" : 0.4845834970474243,
			"y" : 0.1420835703611374
		}, {
			"x" : 0.5595834851264954,
			"y" : 0.2420835793018341
		}, {
			"x" : 0.6595834493637085,
			"y" : 0.2670835852622986
		}, {
			"x" : 0.7095835208892822,
			"y" : 0.16708357632160187
		}, {
			"x" : 0.6345835328102112,
			"y" : 0.09208357334136963
		}, {
			"x" : 0.5595834851264954,
			"y" : 0.09208357334136963
		}], [{
			"x" : 0.8345835208892822,
			"y" : 0.16708357632160187
		}, {
			"x" : 0.8345835208892822,
			"y" : 0.1170835793018341
		}, {
			"x" : 0.8845834732055664,
			"y" : 0.1170835793018341
		}, {
			"x" : 0.8845834732055664,
			"y" : 0.16708357632160187
		}], [{
			"x" : 0.7595834732055664,
			"y" : 0.2420835793018341
		}, {
			"x" : 0.7595834732055664,
			"y" : 0.19208358228206635
		}, {
			"x" : 0.8095834851264954,
			"y" : 0.19208358228206635
		}, {
			"x" : 0.8095834851264954,
			"y" : 0.2420835793018341
		}]]
	}]);

	createBouncers([[{
		"x" : 0.9645834565162659,
		"y" : 0.6920835971832275
	}, {
		"x" : 0.9820835590362549,
		"y" : 0.6095836162567139
	}, {
		"x" : 1.032083511352539,
		"y" : 0.6120836138725281
	}, {
		"x" : 1.0195834636688232,
		"y" : 0.6920835971832275
	}]]);

	createWalls([[{
		"x" : 0.43458348512649536,
		"y" : 0.1420835703611374
	}, {
		"x" : 0.45958349108695984,
		"y" : 0.1170835793018341
	}, {
		"x" : 0.7595834732055664,
		"y" : 0.1170835793018341
	}, {
		"x" : 0.7595834732055664,
		"y" : 0.1420835703611374
	}]]);

	createSensors([{
		"x" : 0.8695834875106812,
		"y" : 0.6120836138725281
	}, {
		"x" : 0.7845835089683533,
		"y" : 0.21708357334136963
	}, {
		"x" : 0.8595834970474243,
		"y" : 0.1420835703611374
	}]);

	createDestination([{
		"x" : 0.5595834851264954,
		"y" : 0.16708357632160187
	}, {
		"x" : 0.5595834851264954,
		"y" : 0.1420835703611374
	}, {
		"x" : 0.6345835328102112,
		"y" : 0.1420835703611374
	}, {
		"x" : 0.6345835328102112,
		"y" : 0.16708357632160187
	}]);

}

function levelSeven() {

	createStartPoint({
		"x" : 0.8337500691413879,
		"y" : 0.7287499904632568
	}, 0.08321647346019745);

	createTerrain([{
		outer : [{
			"x" : -0.02500000037252903,
			"y" : 0.574999988079071
		}, {
			"x" : 0.17499999701976776,
			"y" : 0.42500001192092896
		}, {
			"x" : 0.45000001788139343,
			"y" : 0.4000000059604645
		}, {
			"x" : 0.4749999940395355,
			"y" : 0.125
		}, {
			"x" : -0.07500000298023224,
			"y" : -0.02500000037252903
		}],
		holes : []
	}, {
		outer : [{
			"x" : 0.3499999940395355,
			"y" : 0.675000011920929
		}, {
			"x" : 0.25,
			"y" : 0.574999988079071
		}, {
			"x" : 0.9000000357627869,
			"y" : 0.5
		}, {
			"x" : 0.925000011920929,
			"y" : 0.675000011920929
		}],
		holes : []
	}]);

	createWalls([[{
		"x" : 0.42500001192092896,
		"y" : 0
	}, {
		"x" : 0.5070834159851074,
		"y" : 0.28708362579345703
	}, {
		"x" : 0.550000011920929,
		"y" : 0
	}], [{
		"x" : 0.699999988079071,
		"y" : 0
	}, {
		"x" : 0.675000011920929,
		"y" : 0.2750000059604645
	}, {
		"x" : 0.7750000357627869,
		"y" : 0
	}], [{
		"x" : 0.18083345890045166,
		"y" : 0.3008336126804352
	}, {
		"x" : 0.19333338737487793,
		"y" : 0.2708336114883423
	}, {
		"x" : 0.33083340525627136,
		"y" : 0.2708336114883423
	}, {
		"x" : 0.32333338260650635,
		"y" : 0.3008336126804352
	}], [{
		"x" : 0.8500000238418579,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.8500000238418579,
		"y" : 0.3499999940395355
	}, {
		"x" : 0.9950001239776611,
		"y" : 0.3541669249534607
	}, {
		"x" : 1.0066670179367065,
		"y" : 0.5266672372817993
	}, {
		"x" : 0.949999988079071,
		"y" : 0.4000000059604645
	}]]);

	var board = createPolygon([{
		"x" : 0.47500014305114746,
		"y" : 0.46250027418136597
	}, {
		"x" : 0.49125006794929504,
		"y" : 0.2987503111362457
	}, {
		"x" : 0.5237500667572021,
		"y" : 0.30125030875205994
	}, {
		"x" : 0.5066667795181274,
		"y" : 0.4725002646446228
	}], {
		color : "green",
		type : "dynamic",
		density : 0.5
	});

	createRevoluteJoint(board, {
		"x" : 0.5045833587646484,
		"y" : 0.3120836615562439
	}, 4);

	createPushers([[{
		"x" : 0.3499999940395355,
		"y" : 0
	}, {
		"x" : 0.3499999940395355,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.42500001192092896,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.42500001192092896,
		"y" : 0
	}], [{
		"x" : 0.6000000238418579,
		"y" : 0
	}, {
		"x" : 0.6000000238418579,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.675000011920929,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.675000011920929,
		"y" : 0
	}]]);

	createSensors([{
		"x" : 0.40000003576278687,
		"y" : 0.4675002694129944
	}, {
		"x" : 0.6333334445953369,
		"y" : 0.10583360493183136
	}, {
		"x" : 0.9766668081283569,
		"y" : 0.5908335447311401
	}]);

	createDestination([{
		"x" : 0.8500000238418579,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.8500000238418579,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.925000011920929,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.925000011920929,
		"y" : 0.4000000059604645
	}]);

}

function levelEight() {

	createStartPoint({
		"x" : 0.5362499952316284,
		"y" : 0.658750057220459
	}, 0.0850367397069931);

	createTerrain([{
		outer : [{
			"x" : 0.17499999701976776,
			"y" : 0.3499999940395355
		}, {
			"x" : 0.30000001192092896,
			"y" : 0.3499999940395355
		}, {
			"x" : 0.32500001788139343,
			"y" : 0.4749999940395355
		}, {
			"x" : 0.3499999940395355,
			"y" : 0.4749999940395355
		}, {
			"x" : 0.375,
			"y" : 0.3499999940395355
		}, {
			"x" : 0.5,
			"y" : 0.3499999940395355
		}, {
			"x" : 0.623853325843811,
			"y" : 0.35114577412605286
		}, {
			"x" : 0.6363533735275269,
			"y" : 0.6061457395553589
		}, {
			"x" : -0.10000000149011612,
			"y" : 0.574999988079071
		}, {
			"x" : -0.10000000149011612,
			"y" : 0.32500001788139343
		}],
		holes : [[{
			"x" : 0.22500000894069672,
			"y" : 0.45000001788139343
		}, {
			"x" : 0.22500000894069672,
			"y" : 0.4000000059604645
		}, {
			"x" : 0.2750000059604645,
			"y" : 0.4000000059604645
		}, {
			"x" : 0.2750000059604645,
			"y" : 0.45000001788139343
		}]]
	}, {
		outer : [{
			"x" : 0.7250000238418579,
			"y" : 0.6500000357627869
		}, {
			"x" : 0.7250000238418579,
			"y" : 0.3499999940395355
		}, {
			"x" : 1,
			"y" : 0.3499999940395355
		}, {
			"x" : 1,
			"y" : 0.675000011920929
		}],
		holes : []
	}]);

	createWalls([[{
		"x" : 0.4331240653991699,
		"y" : 0.3002082407474518
	}, {
		"x" : 0.4749999940395355,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.6438534259796143,
		"y" : 0.3311457633972168
	}, {
		"x" : 0.675000011920929,
		"y" : 0.800000011920929
	}, {
		"x" : 0.6734116673469543,
		"y" : 0.6428385376930237
	}, {
		"x" : 0.675000011920929,
		"y" : 0.2750000059604645
	}, {
		"x" : 0.824999988079071,
		"y" : 0.2750000059604645
	}, {
		"x" : 0.675000011920929,
		"y" : 0.22500000894069672
	}, {
		"x" : 0.38551995158195496,
		"y" : 0.17572903633117676
	}], [{
		"x" : 0,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.20000000298023224,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.2461974024772644,
		"y" : 0.3000519573688507
	}, {
		"x" : 0,
		"y" : 0.30000001192092896
	}], [{
		"x" : 0.4392699897289276,
		"y" : 0.08364581316709518
	}, {
		"x" : 0.415936678647995,
		"y" : 0.00031246617436408997
	}, {
		"x" : 0.6534367203712463,
		"y" : -0.0005208663642406464
	}, {
		"x" : 0.6209366917610168,
		"y" : 0.08281248062849045
	}, {
		"x" : 0.6034367084503174,
		"y" : 0.011145807802677155
	}, {
		"x" : 0.5709366798400879,
		"y" : 0.08197914808988571
	}, {
		"x" : 0.5434366464614868,
		"y" : 0.014479130506515503
	}, {
		"x" : 0.5067700147628784,
		"y" : 0.0794791430234909
	}, {
		"x" : 0.47010335326194763,
		"y" : 0.013645797967910767
	}]]);

	createPushers([[{
		"x" : 0.9000000357627869,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.9000000357627869,
		"y" : 0
	}, {
		"x" : 0.9750000238418579,
		"y" : 0
	}, {
		"x" : 0.9750000238418579,
		"y" : 0.02500000037252903
	}]]);

	var cross = createPolygon([{
		"x" : 0.32500001788139343,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.32500001788139343,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.25,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.25,
		"y" : 0.30000001192092896
	}, {
		"x" : 0.32500001788139343,
		"y" : 0.30000001192092896
	}, {
		"x" : 0.32500001788139343,
		"y" : 0.22500000894069672
	}, {
		"x" : 0.3499999940395355,
		"y" : 0.22500000894069672
	}, {
		"x" : 0.3499999940395355,
		"y" : 0.30000001192092896
	}, {
		"x" : 0.42500001192092896,
		"y" : 0.30000001192092896
	}, {
		"x" : 0.42500001192092896,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.3499999940395355,
		"y" : 0.32500001788139343
	}, {
		"x" : 0.3499999940395355,
		"y" : 0.4000000059604645
	}], {
		color : "#539124",
		type : "dynamic"
	});

	createRevoluteJoint(cross, {
		"x" : 0.33791664242744446,
		"y" : 0.31208330392837524
	}, 4);

	var platform = createPolygon([{
		"x" : 0.17499999701976776,
		"y" : 0.15000000596046448
	}, {
		"x" : 0.17499999701976776,
		"y" : 0.10000000149011612
	}, {
		"x" : 0.42500001192092896,
		"y" : 0.10000000149011612
	}, {
		"x" : 0.30000001192092896,
		"y" : 0.125
	}, {
		"x" : 0.20000000298023224,
		"y" : 0.125
	}, {
		"x" : 0.20000000298023224,
		"y" : 0.15000000596046448
	}], {
		color : "#583712",
		type : "dynamic",
		density : 0
	});

	var prismaticJoint = createPrismaticJoint(platform, {
		"x" : 0.2820833921432495,
		"y" : 0.13916654884815216
	}, new b2Vec2(1, 0), 4);

	platform.beginContact = function(obj) {
		if (obj.details.id === LEFT_WALL_ID) {
			prismaticJoint.SetMotorSpeed(-4);
		} else if (obj.details.id === RIGHT_WALL_ID) {
			prismaticJoint.SetMotorSpeed(4);
		}
	};

	createSensors([{
		"x" : 0.05000000074505806,
		"y" : 0.15000000596046448
	}, {
		"x" : 0.25,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.875,
		"y" : 0.699999988079071
	}]);

	createDestination([{
		"x" : 0.7250000238418579,
		"y" : 0.30000001192092896
	}, {
		"x" : 0.7250000238418579,
		"y" : 0.2750000059604645
	}, {
		"x" : 0.800000011920929,
		"y" : 0.2750000059604645
	}, {
		"x" : 0.800000011920929,
		"y" : 0.30000001192092896
	}]);

}

function levelNine() {

	createStartPoint({
		"x" : 0.9387500286102295,
		"y" : 0.6687500476837158
	}, 0.08514697104692459);

	createTerrain([{
		outer : [{
			"x" : 1.0391674041748047,
			"y" : 0.6037503480911255
		}, {
			"x" : 0.5024996399879456,
			"y" : 0.6287503242492676
		}, {
			"x" : 0.4008331894874573,
			"y" : 0.398750364780426
		}, {
			"x" : 0.20000000298023224,
			"y" : 0.4000000059604645
		}, {
			"x" : 0.22770798206329346,
			"y" : 0.2039581835269928
		}, {
			"x" : 0.3402080237865448,
			"y" : 0.04270815849304199
		}, {
			"x" : 0.22395800054073334,
			"y" : 0.03145816922187805
		}, {
			"x" : 0.20000000298023224,
			"y" : 0
		}, {
			"x" : 0.5658340454101562,
			"y" : -0.0012495219707489014
		}],
		holes : []
	}, {
		outer : [{
			"x" : 0.37010443210601807,
			"y" : 0.5259372591972351
		}, {
			"x" : 0.36635440587997437,
			"y" : 0.504062294960022
		}, {
			"x" : 0.396979421377182,
			"y" : 0.5046873092651367
		}, {
			"x" : 0.3907294273376465,
			"y" : 0.5465623140335083
		}],
		holes : []
	}, {
		outer : [{
			"x" : 0.26385441422462463,
			"y" : 0.5578122735023499
		}, {
			"x" : 0.2944794297218323,
			"y" : 0.5315622687339783
		}, {
			"x" : 0.29322943091392517,
			"y" : 0.5071873068809509
		}, {
			"x" : 0.26760441064834595,
			"y" : 0.5065622925758362
		}],
		holes : []
	}]);

	createWalls([[{
		"x" : 0.1541665941476822,
		"y" : 0.04333317279815674
	}, {
		"x" : 0.12874971330165863,
		"y" : -0.0025001466274261475
	}, {
		"x" : 0.17874972522258759,
		"y" : -0.0025001466274261475
	}], [{
		"x" : 0.6724997162818909,
		"y" : 0.3587503135204315
	}, {
		"x" : 0.6500000953674316,
		"y" : 0
	}, {
		"x" : 0.8750001192092896,
		"y" : 0
	}, {
		"x" : 0.819166362285614,
		"y" : 0.3537503182888031
	}, {
		"x" : 0.779167115688324,
		"y" : 0.370417058467865
	}, {
		"x" : 0.8250001668930054,
		"y" : 0.05000000447034836
	}, {
		"x" : 0.7000001668930054,
		"y" : 0.05000000447034836
	}, {
		"x" : 0.7108330726623535,
		"y" : 0.3704169690608978
	}], [{
		"x" : 0.2566669285297394,
		"y" : 0.5041664242744446
	}, {
		"x" : 0.2870830297470093,
		"y" : 0.4891665577888489
	}, {
		"x" : 0.37708303332328796,
		"y" : 0.4891665577888489
	}, {
		"x" : 0.40666693449020386,
		"y" : 0.5041664242744446
	}], [{
		"x" : 0.2752079963684082,
		"y" : 0.02395816147327423
	}, {
		"x" : 0.25,
		"y" : 0
	}, {
		"x" : 0.30000001192092896,
		"y" : 0
	}]]);

	createPolygon([{
		"x" : 0.2499999850988388,
		"y" : 0.45000001788139343
	}, {
		"x" : 0.22500000894069672,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.2499999850988388,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.2749999761581421,
		"y" : 0.4000000059604645
	}, {
		"x" : 0.30000001192092896,
		"y" : 0.42500001192092896
	}, {
		"x" : 0.2749999761581421,
		"y" : 0.45000001788139343
	}], {
		color : "#342568",
		type : "dynamic",
		density : 8
	});

	var board = createPolygon([{
		"x" : 0.027499929070472717,
		"y" : 0.04999983310699463
	}, {
		"x" : 0.02666659653186798,
		"y" : 0.0958331748843193
	}, {
		"x" : 0.03833329677581787,
		"y" : 0.059999845921993256
	}, {
		"x" : 0.06197904050350189,
		"y" : 0.05989561975002289
	}, {
		"x" : 0.10197903215885162,
		"y" : 0.07052062451839447
	}, {
		"x" : 0.25979161262512207,
		"y" : 0.06520816683769226
	}, {
		"x" : 0.3035416007041931,
		"y" : 0.07270816713571548
	}, {
		"x" : 0.2997916340827942,
		"y" : 0.048958152532577515
	}], {
		color : "green",
		type : "dynamic",
		density : 0.5
	});

	createRevoluteJoint(board, {
		"x" : 0.17625020444393158,
		"y" : 0.06166665256023407
	});

	var hollow = createPolygon([{
		"x" : 0.25822943449020386,
		"y" : 0.5684372782707214
	}, {
		"x" : 0.3316669464111328,
		"y" : 0.5291664600372314
	}, {
		"x" : 0.4313544034957886,
		"y" : 0.582187294960022
	}, {
		"x" : 0.3316669464111328,
		"y" : 0.5041664242744446
	}], {
		color : "green",
		type : "dynamic",
		density : 0.5
	});

	createRevoluteJoint(hollow, {
		"x" : 0.3318752348423004,
		"y" : 0.5043748617172241
	});

	createPushers([[{
		"x" : 0.925000011920929,
		"y" : 0
	}, {
		"x" : 0.925000011920929,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.9750000238418579,
		"y" : 0.02500000037252903
	}, {
		"x" : 0.9750000238418579,
		"y" : 0
	}]]);

	createSensors([{
		"x" : 0.949999988079071,
		"y" : 0.125
	}, {
		"x" : 0.32500001788139343,
		"y" : 0.574999988079071
	}, {
		"x" : 0.07500000298023224,
		"y" : 0.42500001192092896
	}]);

	createDestination([{
		"x" : 0.7250000238418579,
		"y" : 0.07500000298023224
	}, {
		"x" : 0.7250000238418579,
		"y" : 0.05000000074505806
	}, {
		"x" : 0.800000011920929,
		"y" : 0.05000000074505806
	}, {
		"x" : 0.800000011920929,
		"y" : 0.07500000298023224
	}]);

}

function createTerrain(data) {
	var polys = [];
	for ( var i in data) {
		var obj = data[i];
		polys.push({
			outer : translatePoints(obj.outer),
			holes : translateHoles(obj.holes)
		});
	}

	_terrain = new Body(_physics, {
		type : "static",
		shape : "terrain",
		patternImg : _resources.snowPattern,
		// color : "#996633",
		terrainPolys : polys
	});

}

function createBouncers(data, restitution) {
	for ( var i in data) {
		var points = data[i];
		createPolygon(points, {
			color : "pink",
			restitution : 1.2
		});
	}
}

function createWalls(data) {
	for ( var i in data) {
		var points = data[i];
		createPolygon(points, {
			color : "#C4460D",
			zIndex : 1
		});
	}
}

function createPushers(data) {
	for ( var i in data) {
		var points = data[i];
		var pusher = createPolygon(points, {
			color : "red"
		});

		pusher.beginContact = function(obj) {
			if (obj.details.id === BALL_ID) {
				var body = obj.body;
				body.ApplyImpulse(new b2Vec2(0, -50), body.GetWorldCenter());
			}
		};
	}

}

function createStartPoint(point, r) {

	var pos = translatePoint(point);

	new Body(_physics, {
		id : START_POINT_ID,
		type : "static",
		color : "rgba(242,39,39,0.3)",
		shape : "circle",
		x : pos.x,
		y : pos.y,
		radius : r * _canvasW,
		isSensor : true
	});
}

function createPolygon(points, details) {

	var polyDetails = {
		type : "static",
		shape : "polygon",
		color : "e5e5e5",
		zIndex : 0,
		points : translatePoints(points),
	};

	for ( var i in details) {
		polyDetails[i] = details[i];
	}

	return new Body(_physics, polyDetails);
}

function createSensors(points) {
	var sensorPoints = translatePoints(points);

	for ( var i in sensorPoints) {
		var pos = sensorPoints[i];
		var sensor = new Body(_physics, {
			type : "static",
			image : _resources.bunnyImg,
			shape : "circle",
			zIndex : 1,
			x : pos.x,
			y : pos.y,
			radius : BUNNY_R,
			height : BUNNY_R * 2,
			width : BUNNY_R * 2,
			isSensor : true
		});

		sensor.beginContact = function(obj) {
			if (obj.details.id === BALL_ID) {
				this.details.dead = true;
			}
		};
	}
}

function createDestination(points) {
	var finishingPoint = new Body(_physics, {
		type : "static",
		shape : "polygon",
		color : "yellow",
		isSensor : true,
		zIndex : 1,
		points : translatePoints(points),
	});

	finishingPoint.beginContact = function(obj) {
		$('#level-dialog').dialog("open");
		finishingPoint.beginContact = undefined;
	};
}

function createRevoluteJoint(obj, point, motorSpeed) {
	var revoluteJointDef = new b2RevoluteJointDef();

	var anchor = translatePoint({
		"x" : point.x,
		"y" : point.y
	});

	revoluteJointDef.Initialize(_physics.world.GetGroundBody(), obj.body,
			new b2Vec2(anchor.x / _physics.scale, anchor.y / _physics.scale));

	revoluteJointDef.maxMotorTorque = 5.0;
	revoluteJointDef.motorSpeed = motorSpeed || 0;
	revoluteJointDef.enableMotor = true;

	return _physics.world.CreateJoint(revoluteJointDef);
}

function createPrismaticJoint(obj, point, axis, speed) {
	var prismaticJointDef = new b2PrismaticJointDef();

	var anchor = translatePoint({
		"x" : point.x,
		"y" : point.y
	});

	prismaticJointDef.Initialize(obj.body, _physics.world.GetGroundBody(),
			new b2Vec2(anchor.x / _physics.scale, anchor.y / _physics.scale),
			axis);

	prismaticJointDef.maxMotorForce = 10.0;
	prismaticJointDef.motorSpeed = speed || 0;
	prismaticJointDef.enableMotor = true;

	return _physics.world.CreateJoint(prismaticJointDef);
}

function translateHoles(shapes) {
	var translated = [];
	for ( var i in shapes) {

		// Holes are CCW
		translated.push(translatePoints(shapes[i]).reverse());
	}
	return translated;
}

function translatePoints(points) {
	var translated = [];
	for ( var i in points) {
		translated.push(translatePoint(points[i]));
	}
	return translated;
}

function translatePoint(point) {
	return {
		x : point.x * _canvasW,
		y : _canvasH - point.y * _canvasW
	};
}
