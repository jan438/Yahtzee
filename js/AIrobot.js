var YAHTZEE = {};

var player = 1;

YAHTZEE.info = {result_string: "", results_id: "__results"};

YAHTZEE.update_results = function(info) {
  var res_elem = document.getElementById(info.results_id);
  if (res_elem) {
    res_elem.innerHTML = info.result_string;
  }
}

YAHTZEE.sort_results = function(results) {
  console.log("YAHTZEE sort_results call");
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

YAHTZEE.sort_results_stub = function(results) {
  console.log("YAHTZEE sort_results_stub call");
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
	console.log("YAHTZEE sort_results_stub call count: " + stub.callCount);
	if (stub.callCount == 5) stub.restore();
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
//	if (holdcount == 5) {
//		YahtzeeAI.turn = 3;
//	}
	info.result_string = "(" + results[0] + "," + results[1] +"," + results[2] + "," + results[3] + "," + results[4] + ")";
	YAHTZEE.update_results(info);
	YAHTZEE.sort_results(results);
	if (YahtzeeAI.turn < 3) {
		YahtzeeAI.turn = YahtzeeAI.turn + 1;
		$("#turn").html(YahtzeeAI.turn);
		$("#player").html(player);
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
//		if (YahtzeeAI.chance && !$('#chkAIchance').parent().hasClass('highlight')) {
//			$('#chkAIchance').prop('checked', YahtzeeAI.chance);
//		}
		player = YAHTZEE.scoreResults();
		YahtzeeAI.turn = 1;
		$("#turn").html(YahtzeeAI.turn);
		$("#player").html(player);
	}
	if (player > 0) setTimeout(function () { $("#aidicebutton").trigger('click'); }, 5000);
}

D5.dice(5, YAHTZEE.callback, YAHTZEE.info);

var SMALL_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3);
var SMALL_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var SMALL_STRAIGHT_MASK3 = (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);
var LARGE_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var LARGE_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);

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
	countyahtzee : 0
}


YAHTZEE.findCombinations = function(results) {
	var equals = new Array(0,0,0,0,0,0);
	for( var i = 0; i < 6; i++) {
		if (i < 6) {
			YahtzeeAI.dices[i] = results[i];
		}
		if ((i > 0) && (YahtzeeAI.dices[i-1] == YahtzeeAI.dices[i])) {
			++equals[YahtzeeAI.dices[i] - 1];
		}
	}
	console.log(equals);
	return equals;
}

YAHTZEE.scoreResults = function() {
	var returnplayer = 1;
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
	var AIcount = 0;
	if ($('#chkAIone').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAItwo').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIthree').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIfour').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIfive').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIsix').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIthreeofakind').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIcarre').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIfull').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIsmallstr').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIlargestr').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIyahtzee').parent().hasClass('highlight')) AIcount++;
	if ($('#chkAIchance').parent().hasClass('highlight')) AIcount++;
	if ((AIcount < 14) && (AIchecked > 0)) {
		$("#chkAIone").prop("checked", false);
		$("#chkAItwo").prop("checked", false);
		$("#chkAIthree").prop("checked", false);
		$("#chkAIfour").prop("checked", false);
		$("#chkAIfive").prop("checked", false);
		$("#chkAIsix").prop("checked", false);
		$("#chkAIthreeofakind").prop("checked", false);
		$("#chkAIcarre").prop("checked", false);
		$("#chkAIfull").prop("checked", false);
		$("#chkAIsmallstr").prop("checked", false);
		$("#chkAIlargestr").prop("checked", false);
		$("#chkAIyahtzee").prop("checked", false);
		$("#chkAIchance").prop("checked", false);
	}
	else {
		$("#scoreAIupper").html(YahtzeeAI.scoreuppergrid);
		$("#scoreAIbonus").html(YahtzeeAI.bonusuppergrid + YahtzeeAI.bonuslowergrid);
		$("#scoreAIlower").html(YahtzeeAI.scorelowergrid);
		$("#scoreAItotal").html(YahtzeeAI.scoreuppergrid + YahtzeeAI.bonusuppergrid + YahtzeeAI.bonuslowergrid + YahtzeeAI.scorelowergrid);
		console.log("Game over");
		returnplayer = -1;
		setTimeout(function(){location.reload(true);}, 10000);
	}
	return returnplayer;
}
