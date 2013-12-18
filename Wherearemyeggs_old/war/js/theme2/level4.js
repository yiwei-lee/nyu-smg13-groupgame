function level4() {

	zeyu_init(function() {
		zeyu_createStartPoint({
			"x" : 0.14874997735023499,
			"y" : 0.7212499976158142
		}, 0.08746424317359924);

		zeyu_createTerrain([{
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

		zeyu_createWalls([[{
			"x" : 0.574999988079071,
			"y" : 0.32500001788139343
		}, {
			"x" : 0.550000011920929,
			"y" : 0
		}, {
			"x" : 0.625,
			"y" : 0
		}]]);

		zeyu_createSensors([{
			"x" : 0.30000001192092896,
			"y" : 0.2750000059604645
		}, {
			"x" : 0.574999988079071,
			"y" : 0.42500001192092896
		}, {
			"x" : 0.7250000238418579,
			"y" : 0.05000000074505806
		}]);

		zeyu_createDestination([{
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
	});

}