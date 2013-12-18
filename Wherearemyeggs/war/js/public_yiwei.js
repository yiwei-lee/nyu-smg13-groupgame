function saveCollectedCandy(candyNum) {
    var collectedCandyString = localStorage.yiwei_collectedCandy;
    var levelNumber = parseInt(localStorage.currentLevel);
    if (collectedCandyString != null) {
        var collectedCandyAllLevels = JSON.parse(collectedCandyString);
    } else {
        var collectedCandyAllLevels = new Array();
    }
    var candyArray;
    switch (candyNum) {
        case 0:
            candyArray = new Array("0", "0", "0");
            break;
        case 1:
            candyArray = new Array("1", "0", "0");
            break;
        case 2:
            candyArray = new Array("1", "1", "0");
            break;
        default:
            candyArray = new Array("1", "1", "1");
            break;
    }
    collectedCandyAllLevels[levelNumber - 1] = JSON.stringify(candyArray);
    localStorage.yiwei_collectedCandy = JSON.stringify(collectedCandyAllLevels);
}

function colorCandy(candyNum) {
    if (candyNum >= 1) {
        $(".collectable1").each(function() {
            $(this).attr("src", "img/theme3/collectible1.png");
        });
    }
    if (candyNum >= 2) {
        $(".collectable2").each(function() {
            $(this).attr("src", "img/theme3/collectible2.png");
        });
    }
    if (candyNum >= 3) {
        $(".collectable3").each(function() {
            $(this).attr("src", "img/theme3/collectible3.png");
        });
    }
    yiwei_collectCandy = candyNum;
}
