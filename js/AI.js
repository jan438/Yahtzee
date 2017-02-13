var YAHTZEE = {};

var player = 0;

YAHTZEE.info = {result_string: "", results_id: "__results"};

YAHTZEE.update_results = function(info) {
  var res_elem = document.getElementById(info.results_id);
  if (res_elem) {
    res_elem.innerHTML = info.result_string;
  }
}

YAHTZEE.sort_results = function(results, player, score) {
  var sorted = results;
  var temp;
  for (i = sorted.length - 1; i >= 1; --i) {
    for (j = 0; j < i; ++j) {
	if ( sorted[j] > sorted[j + 1] ) {
           temp = sorted[j];
           sorted[j] = sorted[j + 1];
           sorted[j + 1] = temp;
       }
    }
  }
  $('#sorted').text(" (" + sorted[0] + "," + sorted[1] +"," + sorted[2] + "," + sorted[3] + "," + sorted[4] + ")"); 
}

YAHTZEE.sort_results_stub = function(results, player, score) {
  if ((player == 0) && (score == 0)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 6;
	}
  }
  if ((player == 0) && (score == 50)) {
	for (k = 0; k < 5; ++k) {
		results[k] = k + 1;
	}
  }
  if ((player == 0) && (score == 90)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 6;
	}
  }
  if ((player == 0) && (score == 120)) {
	for (k = 0; k < 5; ++k) {
		if (k < 3) results[k] = 3;
		else results[k] = 4;
	}
  }
  if ((player == 0) && (score == 145)) {
	for (k = 0; k < 5; ++k) {
		results[k] = k + 1;
	}
  }
  if ((player == 0) && (score == 175)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 5;
	}
  }
  if ((player == 0) && (score == 200)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 6;
	}
  }
  if ((player == 0) && (score == 230)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 5;
	}
  }
  if ((player == 0) && (score == 255)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 4;
	}
  }
  if ((player == 0) && (score == 275)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 3;
	}
  }
  if ((player == 0) && (score == 290)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 2;
	}
  }
  if ((player == 0) && (score == 300)) {
	for (k = 0; k < 5; ++k) {
		results[k] = 1;
	}
  }
  if ((player == 0) && (score == 305)) {
	for (k = 0; k < 5; ++k) {
		results[k] = Math.floor(Math.random() * 6) + 1;
	}
  }
  if (player == 1) {
    var mask = 0;
    for( var i = 0; i < 5; i++) {
        mask = mask | (1 << (results[i] - 1));
    }
    if (((mask & LARGE_STRAIGHT_MASK1)==LARGE_STRAIGHT_MASK1)||((mask & LARGE_STRAIGHT_MASK2)==LARGE_STRAIGHT_MASK2)) {
        for (k = 0; k < 5; ++k) {
            results[k] = Math.floor(Math.random() * 6) + 1;
        }
    }
  }
  var sorted = results;
  var temp;
  for (i = sorted.length - 1; i >= 1; --i) {
    for (j = 0; j < i; ++j) {
	if ( sorted[j] > sorted[j + 1] ) {
           temp = sorted[j];
           sorted[j] = sorted[j + 1];
           sorted[j + 1] = temp;
       }
    }
  }
  $('#sorted').text(" (" + sorted[0] + "," + sorted[1] +"," + sorted[2] + "," + sorted[3] + "," + sorted[4] + ")"); 
}

var stub = sinon.stub(YAHTZEE, "sort_results", YAHTZEE.sort_results_stub);

YAHTZEE.callback = function(total, info, results) {
	if (($.urlParam('stubmode') != null) && $.urlParam('stubmode')) {
		console.log("YAHTZEE sort_results_stub call count: " + stub.callCount);
	}
	else {
		stub.restore();
	}
	if (player == 0) {
		info.result_string = "(" + results[0] + "," + results[1] +"," + results[2] + "," + results[3] + "," + results[4] + ")";
		YAHTZEE.update_results(info);
		YAHTZEE.sort_results(results, 0, Yahtzee.scorelowergrid + Yahtzee.scoreuppergrid);
		info.result_string = "";
		if (Yahtzee.turn < 3) {
			Yahtzee.turn = Yahtzee.turn + 1;
		}
		else {
			$("#dice1").removeClass("selected");
			$("#dice2").removeClass("selected");
			$("#dice3").removeClass("selected");
			$("#dice4").removeClass("selected");
			$("#dice5").removeClass("selected");
			$("#dicebutton").css("color", "red");
			$("#dicebutton").prop("disabled", true);
			if (!YahtzeeAI.gameover) {
				$("#score").css("color", "red");
				$("#score").prop("disabled", true);
			}
			Yahtzee.ones = false;
			Yahtzee.twos = false;
			Yahtzee.threes = false;
			Yahtzee.fours = false;
			Yahtzee.fives = false;
			Yahtzee.sixes = false;
			Yahtzee.pair = false;
			Yahtzee.three_of_a_kind = false;
			Yahtzee.full_house = false;
			Yahtzee.small_straight = false;
			Yahtzee.large_straight = false;
			Yahtzee.four_of_a_kind = false;
			Yahtzee.yahtzee = false;
			Yahtzee.chance = true;
			Yahtzee.scoreones = 0;
			Yahtzee.scoretwos = 0;
			Yahtzee.scorethrees = 0;
			Yahtzee.scorefours = 0;
			Yahtzee.scorefives = 0;
			Yahtzee.scoresixes = 0;
			Yahtzee.scorechance = 0;
			var equals = YAHTZEE.findCombinations(results);
			var sum = 0;
			for( var i = 0; i < 5; i++) {
				switch(results[i]) {
					case 1: Yahtzee.ones = true;
						Yahtzee.scoreones = Yahtzee.scoreones + 1;
						Yahtzee.scorechance = Yahtzee.scorechance + 1;
						break;
					case 2: Yahtzee.twos = true;
						Yahtzee.scoretwos = Yahtzee.scoretwos + 2;
						Yahtzee.scorechance = Yahtzee.scorechance + 2;
						break;
					case 3: Yahtzee.threes = true;
						Yahtzee.scorethrees = Yahtzee.scorethrees + 3;
						Yahtzee.scorechance = Yahtzee.scorechance + 3;
						break;
					case 4: Yahtzee.fours = true;
						Yahtzee.scorefours = Yahtzee.scorefours + 4;
						Yahtzee.scorechance = Yahtzee.scorechance + 4;
						break;
					case 5: Yahtzee.fives = true;
						Yahtzee.scorefives = Yahtzee.scorefives + 5;
						Yahtzee.scorechance = Yahtzee.scorechance + 5;
						break;
					case 6: Yahtzee.sixes = true;
						Yahtzee.scoresixes = Yahtzee.scoresixes + 6;
						Yahtzee.scorechance = Yahtzee.scorechance + 6;
						break;
				}
			}
			for( var i = 0; i < 6; i++) {
				sum = sum + equals[i];
			}
			for( var i = 0; i < 6; i++) {
				if (equals[i] > 0) {
					switch(equals[i]) {
						case 1: Yahtzee.pair = true;
							if (Yahtzee.three_of_a_kind == true) Yahtzee.full_house = true;
							break;
						case 2: Yahtzee.three_of_a_kind = true;
							if (Yahtzee.pair == true) Yahtzee.full_house = true;
							break;
						case 3: Yahtzee.three_of_a_kind = true;
							Yahtzee.four_of_a_kind = true;
							break;
						case 4: Yahtzee.three_of_a_kind = true;
							Yahtzee.four_of_a_kind = true;
							Yahtzee.yahtzee = true;
							break;
					}
				}
			}
			var mask = 0;
			for( var i = 0; i < 5; i++) {
				mask = mask | (1 << (results[i] - 1));
			}
			if( (mask & LARGE_STRAIGHT_MASK1) == LARGE_STRAIGHT_MASK1 ) {
				Yahtzee.large_straight = true;
				Yahtzee.small_straight = true;
			} else if( (mask & LARGE_STRAIGHT_MASK2) == LARGE_STRAIGHT_MASK2 ) {
				Yahtzee.large_straight = true;
				Yahtzee.small_straight = true;
			} else if( (mask & SMALL_STRAIGHT_MASK1) == SMALL_STRAIGHT_MASK1 ) {
				Yahtzee.small_straight = true;
			} else if( (mask & SMALL_STRAIGHT_MASK2) == SMALL_STRAIGHT_MASK2  ) {
				Yahtzee.small_straight = true;
			} else if( (mask & SMALL_STRAIGHT_MASK3) == SMALL_STRAIGHT_MASK3  ) {
				Yahtzee.small_straight = true;
			}
			if (Yahtzee.ones && !$('#chk1one').parent().hasClass('highlight')) {
				$('#chk1one').prop('checked', Yahtzee.ones);
				$("#chk2one").prop("disabled", false);
			}
			if (Yahtzee.twos && !$('#chk1two').parent().hasClass('highlight')) {
				$('#chk1two').prop('checked', Yahtzee.twos);
				$("#chk2two").prop("disabled", false);
			}
			if (Yahtzee.threes && !$('#chk1three').parent().hasClass('highlight')) {
				$('#chk1three').prop('checked', Yahtzee.threes);
				$("#chk2three").prop("disabled", false);
			}
			if (Yahtzee.fours && !$('#chk1four').parent().hasClass('highlight')) {
				$('#chk1four').prop('checked', Yahtzee.fours);
				$("#chk2four").prop("disabled", false);
			}
			if (Yahtzee.fives && !$('#chk1five').parent().hasClass('highlight')) {
				$('#chk1five').prop('checked', Yahtzee.fives);
				$("#chk2five").prop("disabled", false);
			}
			if (Yahtzee.sixes && !$('#chk1six').parent().hasClass('highlight')) {
				$('#chk1six').prop('checked', Yahtzee.sixes);
				$("#chk2six").prop("disabled", false);
			}
			if (Yahtzee.three_of_a_kind && !$('#chk1threeofakind').parent().hasClass('highlight')) {
				$('#chk1threeofakind').prop('checked', Yahtzee.three_of_a_kind);
				$("#chk2threeofakind").prop("disabled", false);
			}
			if (Yahtzee.four_of_a_kind && !$('#chk1carre').parent().hasClass('highlight')) {
				$('#chk1carre').prop('checked', Yahtzee.four_of_a_kind);
				$("#chk2carre").prop("disabled", false);
			}
			if (Yahtzee.yahtzee && !$('#chk1yahtzee').parent().hasClass('highlight')) {
				$('#chk1yahtzee').prop('checked', Yahtzee.yahtzee);
				$("#chk2yahtzee").prop("disabled", false);
			}
			if (Yahtzee.small_straight && !$('#chk1smallstr').parent().hasClass('highlight')) {
				$('#chk1smallstr').prop('checked', Yahtzee.small_straight);
				$("#chk2smallstr").prop("disabled", false);
			}
			if (Yahtzee.large_straight && !$('#chk1largestr').parent().hasClass('highlight')) {
				$('#chk1largestr').prop('checked', Yahtzee.large_straight);
				$("#chk2largestr").prop("disabled", false);
			}
			if (Yahtzee.full_house && !$('#chk1full').parent().hasClass('highlight')) {
				$('#chk1full').prop('checked', Yahtzee.full_house);
				$("#chk2full").prop("disabled", false);
			}
			if (Yahtzee.chance && !$('#chk1chance').parent().hasClass('highlight')) {
				$('#chk1chance').prop('checked', Yahtzee.chance);
				$("#chk2chance").prop("disabled", false);
			}
			Yahtzee.turn = 1;
			player = 1;
			if (!YahtzeeAI.gameover) {
				setTimeout(function () { $("#aidicebutton").trigger('click'); }, 5000);
			}
		}
		$("#turn").html(Yahtzee.turn);
		$("#player").html(player);
	}
	else {
		var hold = info.result_string;
		$("#aidice1").removeClass("selected");
		$("#aidice2").removeClass("selected");
		$("#aidice3").removeClass("selected");
		$("#aidice4").removeClass("selected");
		$("#aidice5").removeClass("selected");
		var holdinfo = 	new Array();
		for( var i = 0; i < 5; i++) {
			holdinfo[i] = hold.charAt(i);
		}
		var holdcount = 0;
		if (holdinfo[0] == "0") {
			$("#aidice1").addClass("selected");
			holdcount++;
		}
		if (holdinfo[1] == "0") {
			$("#aidice2").addClass("selected");
			holdcount++;
		}
		if (holdinfo[2] == "0") {
			$("#aidice3").addClass("selected");
			holdcount++;
		}
		if (holdinfo[3] == "0") {
			$("#aidice4").addClass("selected");
			holdcount++;
		}
		if (holdinfo[4] == "0") {
			$("#aidice5").addClass("selected");
			holdcount++;
		}
		if (holdcount == 5) {
			Yahtzee.turn = 3;
		}
		info.result_string = "(" + results[0] + "," + results[1] +"," + results[2] + "," + results[3] + "," + results[4] + ")";
		YAHTZEE.update_results(info);
		YAHTZEE.sort_results(results, 1, Yahtzee.scorelowergrid + Yahtzee.scoreuppergrid);
		if (Yahtzee.turn < 3) {
			Yahtzee.turn = Yahtzee.turn + 1;
			$("#turn").html(Yahtzee.turn);
			$("#player").html(player);
			if (!YahtzeeAI.gameover) {
				setTimeout(function () { $("#aidicebutton").trigger('click'); }, 5000);
			}
		}
		else {
			$("#aidice1").removeClass("selected");
			$("#aidice2").removeClass("selected");
			$("#aidice3").removeClass("selected");
			$("#aidice4").removeClass("selected");
			$("#aidice5").removeClass("selected");
			YahtzeeAI.ones = false;
			YahtzeeAI.twos = false;
			YahtzeeAI.threes = false;
			YahtzeeAI.fours = false;
			YahtzeeAI.fives = false;
			YahtzeeAI.sixes = false;
			YahtzeeAI.pair = false;
			YahtzeeAI.three_of_a_kind = false;
			YahtzeeAI.full_house = false;
			YahtzeeAI.small_straight = false;
			YahtzeeAI.large_straight = false;
			YahtzeeAI.four_of_a_kind = false;
			YahtzeeAI.yahtzee = false;
			YahtzeeAI.chance = true;
			YahtzeeAI.scoreones = 0;
			YahtzeeAI.scoretwos = 0;
			YahtzeeAI.scorethrees = 0;
			YahtzeeAI.scorefours = 0;
			YahtzeeAI.scorefives = 0;
			YahtzeeAI.scoresixes = 0;
			YahtzeeAI.scorechance = 0;
			var equals = YAHTZEE.findCombinations(results);
			var sum = 0;
			for( var i = 0; i < 5; i++) {
				switch(results[i]) {
					case 1: YahtzeeAI.ones = true;
						YahtzeeAI.scoreones = YahtzeeAI.scoreones + 1;
						YahtzeeAI.scorechance = YahtzeeAI.scorechance + 1;
						break;
					case 2: YahtzeeAI.twos = true;
						YahtzeeAI.scoretwos = YahtzeeAI.scoretwos + 2;
						YahtzeeAI.scorechance = YahtzeeAI.scorechance + 2;
						break;
					case 3: YahtzeeAI.threes = true;
						YahtzeeAI.scorethrees = YahtzeeAI.scorethrees + 3;
						YahtzeeAI.scorechance = YahtzeeAI.scorechance + 3;
						break;
					case 4: YahtzeeAI.fours = true;
						YahtzeeAI.scorefours = YahtzeeAI.scorefours + 4;
						YahtzeeAI.scorechance = YahtzeeAI.scorechance + 4;
						break;
					case 5: YahtzeeAI.fives = true;
						YahtzeeAI.scorefives = YahtzeeAI.scorefives + 5;
						YahtzeeAI.scorechance = YahtzeeAI.scorechance + 5;
						break;
					case 6: YahtzeeAI.sixes = true;
						YahtzeeAI.scoresixes = YahtzeeAI.scoresixes + 6;
						YahtzeeAI.scorechance = YahtzeeAI.scorechance + 6;
						break;
				}
			}
			for( var i = 0; i < 6; i++) {
				sum = sum + equals[i];
			}
			for( var i = 0; i < 6; i++) {
				if (equals[i] > 0) {
					switch(equals[i]) {
						case 1: YahtzeeAI.pair = true;
							if (YahtzeeAI.three_of_a_kind == true) YahtzeeAI.full_house = true;
							break;
						case 2: YahtzeeAI.three_of_a_kind = true;
							if (YahtzeeAI.pair == true) YahtzeeAI.full_house = true;
							break;
						case 3: YahtzeeAI.three_of_a_kind = true;
							YahtzeeAI.four_of_a_kind = true;
							break;
						case 4: YahtzeeAI.three_of_a_kind = true;
							YahtzeeAI.four_of_a_kind = true;
							YahtzeeAI.yahtzee = true;
							break;
					}
				}
			}
			var mask = 0;
			for( var i = 0; i < 5; i++) {
				mask = mask | (1 << (results[i] - 1));
			}
			if( (mask & LARGE_STRAIGHT_MASK1) == LARGE_STRAIGHT_MASK1 ) {
				YahtzeeAI.large_straight = true;
				YahtzeeAI.small_straight = true;
			} else if( (mask & LARGE_STRAIGHT_MASK2) == LARGE_STRAIGHT_MASK2 ) {
				YahtzeeAI.large_straight = true;
				YahtzeeAI.small_straight = true;
			} else if( (mask & SMALL_STRAIGHT_MASK1) == SMALL_STRAIGHT_MASK1 ) {
				YahtzeeAI.small_straight = true;
			} else if( (mask & SMALL_STRAIGHT_MASK2) == SMALL_STRAIGHT_MASK2  ) {
				YahtzeeAI.small_straight = true;
			} else if( (mask & SMALL_STRAIGHT_MASK3) == SMALL_STRAIGHT_MASK3  ) {
				YahtzeeAI.small_straight = true;
			}
			var highestscore = 0;
			var highestscorecategory = -1;
			if (YahtzeeAI.ones && !$('#chkAIone').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scoreones) {
					highestscore = YahtzeeAI.scoreones;
					highestscorecategory = 1;
				}
			}
			if (YahtzeeAI.twos && !$('#chkAItwo').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scoretwos) {
					highestscore = YahtzeeAI.scoretwos;
					highestscorecategory = 2;
				}
			}
			if (YahtzeeAI.threes && !$('#chkAIthree').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scorethrees) {
					highestscore = YahtzeeAI.scorethrees;
					highestscorecategory = 3;
				}
			}
			if (YahtzeeAI.fours && !$('#chkAIfour').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scorefours) {
					highestscore = YahtzeeAI.scorefours;
					highestscorecategory = 4;
				}
			}
			if (YahtzeeAI.fives && !$('#chkAIfive').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scorefives) {
					highestscore = YahtzeeAI.scorefives;
					highestscorecategory = 5;
				}
			}
			if (YahtzeeAI.sixes && !$('#chkAIsix').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scoresixes) {
					highestscore = YahtzeeAI.scoresixes;
					highestscorecategory = 6;
				}
			}
			if (YahtzeeAI.three_of_a_kind && !$('#chkAIthreeofakind').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scorechance) {
					highestscore = YahtzeeAI.scorechance;
					highestscorecategory = 9;
				}
			}
			if (YahtzeeAI.four_of_a_kind && !$('#chkAIcarre').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scorechance) {
					highestscore = YahtzeeAI.scorechance;
					highestscorecategory = 10;
				}
			}
			if (YahtzeeAI.yahtzee && !$('#chkAIyahtzee').parent().hasClass('highlight')) {
				if (highestscore < 50) {
					highestscore = 50;
					highestscorecategory = 14;
				}
			}
			if (YahtzeeAI.small_straight && !$('#chkAIsmallstr').parent().hasClass('highlight')) {
				if (highestscore < 30) {
					highestscore = 30;
					highestscorecategory = 12;
				}
			}
			if (YahtzeeAI.large_straight && !$('#chkAIlargestr').parent().hasClass('highlight')) {
				if (highestscore < 40) {
					highestscore = 40;
					highestscorecategory = 13;
				}
			}
			if (YahtzeeAI.full_house && !$('#chkAIfull').parent().hasClass('highlight')) {
				if (highestscore < 25) {
					highestscore = 25;
					highestscorecategory = 11;
				}
			}
			if (YahtzeeAI.chance && !$('#chkAIchance').parent().hasClass('highlight')) {
				if (highestscore < YahtzeeAI.scorechance) {
					highestscore = YahtzeeAI.scorechance;
					highestscorecategory = 15;
				}
			}
			switch (highestscorecategory) {
				case 1: $('#chkAIone').prop('checked', true);
					break;
				case 2: $('#chkAItwo').prop('checked', true);
					break;
				case 3: $('#chkAIthree').prop('checked', true);
					break;
				case 4: $('#chkAIfour').prop('checked', true);
					break;
				case 5: $('#chkAIfive').prop('checked', true);
					break;
				case 6: $('#chkAIsix').prop('checked', true);
					break;
				case 9: $('#chkAIthreeofakind').prop('checked', true);
					break;
				case 10:$('#chkAIcarre').prop('checked', true);
					break;
				case 14:$('#chkAIyahtzee').prop('checked', true);
					break;
				case 12:$('#chkAIsmallstr').prop('checked', true);
					break;
				case 13:$('#chkAIlargestr').prop('checked', true);
					break;
				case 11:$('#chkAIfull').prop('checked', true);
					break;
				case 15:$('#chkAIchance').prop('checked', true);
					break;
				default:break;
			}
			Yahtzee.turn = 1;
			player = 0;
			$("#turn").html(Yahtzee.turn);
			$("#player").html(player);
			$("#score").css("color", "orange");
			$("#score").prop("disabled", true);
		}
	}
}

D5.dice(5, YAHTZEE.callback, YAHTZEE.info);
D6.dice(5, YAHTZEE.callback, YAHTZEE.info);

var SMALL_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3);
var SMALL_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var SMALL_STRAIGHT_MASK3 = (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);
var LARGE_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var LARGE_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);

Yahtzee = {
	turn : 1,
	dices : [],
	combinations : [],
	ones : false,
	twos : false,
	threes : false,
	fours : false,
	sixes : false,
	three_of_a_kind : false,
	four_of_a_kind : false,
	full_house : false,
	small_straight : false,
	large_straight : false,
	yahtzee : false,
	chance : false,
	scoreones : 0,
	scoretwos : 0,
	scorethrees : 0,
	scorefours : 0,
	scorefives : 0,
	scoresixes : 0,
	scorethree_of_a_kind : 0,
	scorefour_of_a_kind : 0,
	scorefull_house : 0,
	scoresmall_straight : 0,
	scorelarge_straight : 0,
	scoreyahtzee : 0,
	scorechance : 0,
	scoreuppergrid : 0,
	scorelowergrid : 0,
	bonusuppergrid : 0,
	bonuslowergrid : 0,
	countyahtzee : 0,
	gameover : false,
	disabled : 0
}

YahtzeeAI = {
	turn : 1,
	dices : [],
	combinations : [],
	ones : false,
	twos : false,
	threes : false,
	fours : false,
	sixes : false,
	three_of_a_kind : false,
	four_of_a_kind : false,
	full_house : false,
	small_straight : false,
	large_straight : false,
	yahtzee : false,
	chance : false,
	scoreones : 0,
	scoretwos : 0,
	scorethrees : 0,
	scorefours : 0,
	scorefives : 0,
	scoresixes : 0,
	scorethree_of_a_kind : 0,
	scorefour_of_a_kind : 0,
	scorefull_house : 0,
	scoresmall_straight : 0,
	scorelarge_straight : 0,
	scoreyahtzee : 0,
	scorechance : 0,
	scoreuppergrid : 0,
	scorelowergrid : 0,
	bonusuppergrid : 0,
	bonuslowergrid : 0,
	countyahtzee : 0,
	gameover : false,
	disabled : 0
}

YAHTZEE.findCombinations = function(results) {
	var equals = new Array(0,0,0,0,0,0);
	for( var i = 0; i < 6; i++) {
		if (i < 6) {
			Yahtzee.dices[i] = results[i];
		}
		if ((i > 0) && (Yahtzee.dices[i-1] == Yahtzee.dices[i])) {
			++equals[Yahtzee.dices[i] - 1];
		}
	}
	console.log(equals);
	return equals;
}

YAHTZEE.scoreResults = function() {
	var validscore = true;
	if (!Yahtzee.gameover) {
		validscore = YAHTZEE.humanscoreResults();
	}
	if (Yahtzee.gameover) {
		validscore = true;
	}
	if (!YahtzeeAI.gameover && validscore) {
		YAHTZEE.aiscoreResults();
	}
	$("#scoreupper1total").html(Yahtzee.scoreuppergrid);
	if (Yahtzee.scoreuppergrid > 62) Yahtzee.bonusuppergrid = 35;
	$("#scoreupperbonus").html(Yahtzee.bonusuppergrid);
	$("#scoreupper2total").html(Yahtzee.scoreuppergrid + Yahtzee.bonusuppergrid);
	$("#scorelower1total").html(Yahtzee.scorelowergrid);
	if (Yahtzee.countyahtzee > 1) Yahtzee.bonuslowergrid = (Yahtzee.countyahtzee - 1) * 100;
	$("#scorelowerbonus").html(Yahtzee.bonuslowergrid);
	$("#scorelower2total").html(Yahtzee.scorelowergrid + Yahtzee.bonuslowergrid);
	$("#scoreupper").html(Yahtzee.scoreuppergrid);
	$("#scorebonus").html(Yahtzee.bonusuppergrid + Yahtzee.bonuslowergrid);
	$("#scorelower").html(Yahtzee.scorelowergrid);
	$("#scoretotal").html(Yahtzee.scoreuppergrid + Yahtzee.bonusuppergrid + Yahtzee.bonuslowergrid + Yahtzee.scorelowergrid);
	$("#scoreAIupper").html(YahtzeeAI.scoreuppergrid);
	$("#scoreAIbonus").html(YahtzeeAI.bonusuppergrid + YahtzeeAI.bonuslowergrid);
	$("#scoreAIlower").html(YahtzeeAI.scorelowergrid);
	$("#scoreAItotal").html(YahtzeeAI.scoreuppergrid + YahtzeeAI.bonusuppergrid + YahtzeeAI.bonuslowergrid + YahtzeeAI.scorelowergrid);
	if (Yahtzee.gameover && !YahtzeeAI.gameover) {
		Yahtzee.turn = 1;
		player = 1;
		$("#score").css("color", "orange");
		$("#score").prop("disabled", true);
		setTimeout(function () { $("#aidicebutton").trigger('click'); }, 5000);
	}
	if (!Yahtzee.gameover && YahtzeeAI.gameover) {
		Yahtzee.turn = 1;
		player = 0;
		$("#dicebutton").css("color", "green");
		$("#dicebutton").prop("disabled", false);
		$("#score").css("color", "orange");
		$("#score").prop("disabled", true);
	}
	if (Yahtzee.gameover && YahtzeeAI.gameover) {
		$("#score").css("color", "red");
		$("#score").prop("disabled", true);
		setTimeout(function(){location.reload(true);}, 10000);
	}
}

YAHTZEE.humanscoreResults = function() {
	var checked = 0;
	var highlight = 0;
	if ($("#chk2one").is(":checked")) {
		$("#scoreone").html(Yahtzee.scoreones);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scoreones;
		checked++;
		$("#chk2one").prop("checked", false);
		$("#chk1one").parent().addClass("highlight");
	}
	if ($("#chk1one").parent().hasClass("highlight")) highlight++;
	if ($("#chk2two").is(":checked")) {
		$("#scoretwo").html(Yahtzee.scoretwos);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scoretwos;
		checked++;
		$("#chk2two").prop("checked", false);
		$("#chk1two").parent().addClass("highlight");
	}
	if ($("#chk1two").parent().hasClass("highlight")) highlight++;
	if ($("#chk2three").is(":checked")) {
		$("#scorethree").html(Yahtzee.scorethrees);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scorethrees;
		checked++;
		$("#chk2three").prop("checked", false);
		$("#chk1three").parent().addClass("highlight");
	}
	if ($("#chk1three").parent().hasClass("highlight")) highlight++;
	if ($("#chk2four").is(":checked")) {
		$("#scorefour").html(Yahtzee.scorefours);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scorefours;
		checked++;
		$("#chk2four").prop("checked", false);
		$("#chk1four").parent().addClass("highlight");
	}
	if ($("#chk1four").parent().hasClass("highlight")) highlight++;
	if ($("#chk2five").is(":checked")) {
		$("#scorefive").html(Yahtzee.scorefives);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scorefives;
		checked++;
		$("#chk2five").prop("checked", false);
		$("#chk1five").parent().addClass("highlight");
	}
	if ($("#chk1five").parent().hasClass("highlight")) highlight++;
	if ($("#chk2six").is(":checked")) {
		$("#scoresix").html(Yahtzee.scoresixes);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scoresixes;
		checked++;
		$("#chk2six").prop("checked", false);
		$("#chk1six").parent().addClass("highlight");
	}
	if ($("#chk1six").parent().hasClass("highlight")) highlight++;
	if ($("#chk2threeofakind").is(":checked")) {
		$("#scorethreeofakind").html(Yahtzee.scorechance);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorechance;
		checked++;
		$("#chk2threeofakind").prop("checked", false);
		$("#chk1threeofakind").parent().addClass("highlight");
	}
	if ($("#chk1threeofakind").parent().hasClass("highlight")) highlight++;
	if ($("#chk2carre").is(":checked")) {
		$("#scorecarre").html(Yahtzee.scorechance);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorechance;
		checked++;
		$("#chk2carre").prop("checked", false);
		$("#chk1carre").parent().addClass("highlight");
	}
	if ($("#chk1carre").parent().hasClass("highlight")) highlight++;
	if ($("#chk2full").is(":checked")) {
		Yahtzee.scorefull_house = 25;
		$("#scorefull").html(Yahtzee.scorefull_house);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorefull_house;
		checked++;
		$("#chk2full").prop("checked", false);
		$("#chk1full").parent().addClass("highlight");
	}
	if ($("#chk1full").parent().hasClass("highlight")) highlight++;
	if ($("#chk2smallstr").is(":checked")) {
		Yahtzee.scoresmall_straight = 30;
		$("#scoresmallstr").html(Yahtzee.scoresmall_straight);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scoresmall_straight;
		checked++;
		$("#chk2smallstr").prop("checked", false);
		$("#chk1smallstr").parent().addClass("highlight");
	}
	if ($("#chk1smallstr").parent().hasClass("highlight")) highlight++;
	if ($("#chk2largestr").is(":checked")) {
		Yahtzee.scorelarge_straight = 40;
		$("#scorelargestr").html(Yahtzee.scorelarge_straight);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorelarge_straight;
		checked++;
		$("#chk2largestr").prop("checked", false);
		$("#chk1largestr").parent().addClass("highlight");
	}
	if ($("#chk1largestr").parent().hasClass("highlight")) highlight++;
	if ($("#chk2yahtzee").is(":checked")) {
		Yahtzee.countyahtzee = Yahtzee.countyahtzee + 1;
		Yahtzee.scoreyahtzee = 50;
		$("#scoreyahtzee").html(Yahtzee.scoreyahtzee);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scoreyahtzee;
		checked++;
		$("#chk2yahtzee").prop("checked", false);
		$("#chk1yahtzee").parent().addClass("highlight");
	}
	if ($("#chk1yahtzee").parent().hasClass("highlight")) highlight++;
	if ($("#chk2chance").is(":checked")) {
		$("#scorechance").html(Yahtzee.scorechance);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorechance;
		checked++;
		$("#chk2chance").prop("checked", false);
		$("#chk1chance").parent().addClass("highlight");
	}
	if ($("#chk1chance").parent().hasClass("highlight")) highlight++;
	$("#scoreupper1total").html(Yahtzee.scoreuppergrid);
	if (Yahtzee.scoreuppergrid > 62) Yahtzee.bonusuppergrid = 35;
	$("#scoreupperbonus").html(Yahtzee.bonusuppergrid);
	$("#scoreupper2total").html(Yahtzee.scoreuppergrid + Yahtzee.bonusuppergrid);
	$("#scorelower1total").html(Yahtzee.scorelowergrid);
	if (Yahtzee.countyahtzee > 1) Yahtzee.bonuslowergrid = (Yahtzee.countyahtzee - 1) * 100;
	$("#scoreyahtzeebonus").html(Yahtzee.bonuslowergrid);
	$("#scorelower2total").html(Yahtzee.scorelowergrid + Yahtzee.bonuslowergrid);
	if (highlight > 12) {
		Yahtzee.gameover = true;
		swal({
			title: "<h4 id='swalhumanover'>Human Game over</h4>",
			timer: 10000,
			imageUrl: "die-6.gif",
			showConfirmButton: false,
			html: true
		});
		console.log("Human Game over");
		return (checked > 0);
	}
	if (checked > 0) {
		$("#score").css("color", "red");
		$("[id^=chk2]").prop("disabled", true);
		$("[id^=chk1]").prop("checked", false);
		$("#dicebutton").css("color", "green");
		$("#dicebutton").prop("disabled", false);
		$("#score").css("color", "red");
		$("#score").prop("disabled", true);
	}
	else {
		Yahtzee.disabled = 0;
		if ($("#chk2one").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2two").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2three").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2four").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2five").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2six").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2threeofakind").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2carre").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2full").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2smallstr").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2largestr").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2yahtzee").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if ($("#chk2chance").is(':disabled')) {
			Yahtzee.disabled++;
		}
		if (Yahtzee.disabled > 12) {
			if (YahtzeeAI.gameover) {
				$("#score").css("color", "orange");
				$("#score").prop("disabled", true);
			}
			Yahtzee.gameover = true;
			swal({
				title: "<h4 id='swalhumanover'>Human Game over</h4>",
				timer: 10000,
				imageUrl: "die-6.gif",
				showConfirmButton: false,
				html: true
			});
			console.log("Human Game over");
		}
	}
	var validscore = ((checked > 0) && !Yahtzee.gameover);
	return validscore;
}

YAHTZEE.aiscoreResults = function() {
	var AIchecked = 0;
	if ($("#chkAIone").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIone").html(YahtzeeAI.scoreones);
		YahtzeeAI.scoreuppergrid = YahtzeeAI.scoreuppergrid + YahtzeeAI.scoreones;
		AIchecked++;
		$("#chkAIone").parent().addClass("highlight");
	}
	if ($("#chkAItwo").is(":checked") && (AIchecked == 0)) {
		$("#scoreAItwo").html(YahtzeeAI.scoretwos);
		YahtzeeAI.scoreuppergrid = YahtzeeAI.scoreuppergrid + YahtzeeAI.scoretwos;
		AIchecked++;
		$("#chkAItwo").parent().addClass("highlight");
	}
	if ($("#chkAIthree").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIthree").html(YahtzeeAI.scorethrees);
		YahtzeeAI.scoreuppergrid = YahtzeeAI.scoreuppergrid + YahtzeeAI.scorethrees;
		AIchecked++;
		$("#chkAIthree").parent().addClass("highlight");
	}
	if ($("#chkAIfour").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIfour").html(YahtzeeAI.scorefours);
		YahtzeeAI.scoreuppergrid = YahtzeeAI.scoreuppergrid + YahtzeeAI.scorefours;
		AIchecked++;
		$("#chkAIfour").parent().addClass("highlight");
	}
	if ($("#chkAIfive").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIfive").html(YahtzeeAI.scorefives);
		YahtzeeAI.scoreuppergrid = YahtzeeAI.scoreuppergrid + YahtzeeAI.scorefives;
		AIchecked++;
		$("#chkAIfive").parent().addClass("highlight");
	}
	if ($("#chkAIsix").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIsix").html(YahtzeeAI.scoresixes);
		YahtzeeAI.scoreuppergrid = YahtzeeAI.scoreuppergrid + YahtzeeAI.scoresixes;
		AIchecked++;
		$("#chkAIsix").parent().addClass("highlight");
	}
	if ($("#chkAIthreeofakind").is(":checked") && (AIchecked == 0)) {
	$("#scoreAIthreeofakind").html(YahtzeeAI.scorechance);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scorechance;
		AIchecked++;
		$("#chkAIthreeofakind").parent().addClass("highlight");
	}
	if ($("#chkAIcarre").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIcarre").html(YahtzeeAI.scorechance);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scorechance;
		AIchecked++;
		$("#chkAIcarre").parent().addClass("highlight");
	}
	if ($("#chkAIfull").is(":checked") && (AIchecked == 0)) {
		YahtzeeAI.scorefull_house = 25;
		$("#scoreAIfull").html(YahtzeeAI.scorefull_house);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scorefull_house;
		AIchecked++;
		$("#chkAIfull").parent().addClass("highlight");
	}
	if ($("#chkAIsmallstr").is(":checked") && (AIchecked == 0)) {
		YahtzeeAI.scoresmall_straight = 30;
		$("#scoreAIsmallstr").html(YahtzeeAI.scoresmall_straight);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scoresmall_straight;
		AIchecked++;
		$("#chkAIsmallstr").parent().addClass("highlight");
	}
	if ($("#chkAIlargestr").is(":checked") && (AIchecked == 0)) {
		YahtzeeAI.scorelarge_straight = 40;
		$("#scoreAIlargestr").html(YahtzeeAI.scorelarge_straight);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scorelarge_straight;
		AIchecked++;
		$("#chkAIlargestr").parent().addClass("highlight");
	}
	if ($("#chkAIyahtzee").is(":checked") && (AIchecked == 0)) {
		YahtzeeAI.countyahtzee = YahtzeeAI.countyahtzee + 1;
		YahtzeeAI.scoreyahtzee = 50;
		$("#scoreAIyahtzee").html(YahtzeeAI.scoreyahtzee);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scoreyahtzee;
		AIchecked++;
		$("#chkAIyahtzee").parent().addClass("highlight");
	}
	if ($("#chkAIchance").is(":checked") && (AIchecked == 0)) {
		$("#scoreAIchance").html(YahtzeeAI.scorechance);
		YahtzeeAI.scorelowergrid = YahtzeeAI.scorelowergrid + YahtzeeAI.scorechance;
		AIchecked++;
		$("#chkAIchance").parent().addClass("highlight");
	}
	$("#choosen_categories").html($("#chkAIone").parent().hasClass("highlight").toString() + "," + $("#chkAItwo").parent().hasClass("highlight").toString() + "," + $("#chkAIthree").parent().hasClass("highlight").toString() + "," + $("#chkAIfour").parent().hasClass("highlight").toString() + "," + $("#chkAIfive").parent().hasClass("highlight").toString() + "," + $("#chkAIsix").parent().hasClass("highlight").toString() + "," + $("#chkAIthreeofakind").parent().hasClass("highlight").toString() + "," + $("#chkAIcarre").parent().hasClass("highlight").toString() + "," + $("#chkAIfull").parent().hasClass("highlight").toString() + "," + $("#chkAIsmallstr").parent().hasClass("highlight").toString() + "," + $("#chkAIlargestr").parent().hasClass("highlight").toString() + "," + $("#chkAIyahtzee").parent().hasClass("highlight").toString() + "," + $("#chkAIchance").parent().hasClass("highlight").toString());
	$("#scoreAI1upperscore").html(YahtzeeAI.scoreuppergrid);
	if (YahtzeeAI.scoreuppergrid > 62) YahtzeeAI.bonusuppergrid = 35;
	$("#scoreAIupperbonus").html(YahtzeeAI.bonusuppergrid);
	$("#scoreAI2uppertotal").html(YahtzeeAI.scoreuppergrid + YahtzeeAI.bonusuppergrid);
	$("#scoreAI1lowertotal").html(YahtzeeAI.scorelowergrid);
	if (YahtzeeAI.countyahtzee > 1) YahtzeeAI.bonuslowergrid = (YahtzeeAI.countyahtzee - 1) * 100;
	$("#scoreAIyahtzeebonus").html(YahtzeeAI.bonuslowergrid);
	$("#scoreAI2lowertotal").html(YahtzeeAI.scorelowergrid + YahtzeeAI.bonuslowergrid);
	if (AIchecked > 0) {
		$("[id^=chkAI]").prop("checked", false);
	}
	else {
		if (!Yahtzee.gameover) {
			$("#dicebutton").css("color", "green");
			$("#dicebutton").prop("disabled", false);
			$("#score").css("color", "red");
			$("#score").prop("disabled", true);
		}
		YahtzeeAI.gameover = true;
		swal({
			title: "<h4 id='swalaiover'>AI Game over</h4>",
			timer: 10000,
			imageUrl: "die-6.gif",
			showConfirmButton: false,
			html: true
		});
		console.log("AI Game over");
	}
}
