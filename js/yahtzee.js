var YAHTZEE = {};

YAHTZEE.info = {result_string: "", results_id: "__results"};

YAHTZEE.callback = function(total, info, results) {
	info.result_string = info.result_string + " (" + results[0] + "," + results[1] +"," + results[2] + "," + results[3] + "," + results[4] + ")";
	YAHTZEE.update_results(info);
	YAHTZEE.update2_results();
	YAHTZEE.sort_results(results);
	if (Yahtzee.turn == 3) {
		$("#dice1").removeClass("selected");
		$("#dice2").removeClass("selected");
		$("#dice3").removeClass("selected");
		$("#dice4").removeClass("selected");
		$("#dice5").removeClass("selected");
		$("#dicebutton").css("color", "red");
		$("#dicebutton").prop("disabled", true);
		$("#score").css("color", "orange");
		$("#score").prop("disabled", true);
//		setTimeout(function(){ $("#diceform").html("<form><input type='button' id='dicebutton' value='Roll Dice' onclick='D6AnimBuilder.get(\"dice\").reset(); D6AnimBuilder.get(\"dice\").start()' /></form>"); }, 3000);
	}
	info.result_string = "";
	if (Yahtzee.turn < 3) {
		Yahtzee.turn = Yahtzee.turn + 1;
	}
	else {
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
		var optioncount = 0;
		if (Yahtzee.ones && !$('#chk1one').parent().parent().hasClass('highlight')) {
			$('#chk1one').prop('checked', Yahtzee.ones);
			$("#chk2one").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.twos && !$('#chk1two').parent().parent().hasClass('highlight')) {
			$('#chk1two').prop('checked', Yahtzee.twos);
			$("#chk2two").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.threes && !$('#chk1three').parent().parent().hasClass('highlight')) {
			$('#chk1three').prop('checked', Yahtzee.threes);
			$("#chk2three").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.fours && !$('#chk1four').parent().parent().hasClass('highlight')) {
			$('#chk1four').prop('checked', Yahtzee.fours);
			$("#chk2four").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.fives && !$('#chk1five').parent().parent().hasClass('highlight')) {
			$('#chk1five').prop('checked', Yahtzee.fives);
			$("#chk2five").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.sixes && !$('#chk1six').parent().parent().hasClass('highlight')) {
			$('#chk1six').prop('checked', Yahtzee.sixes);
			$("#chk2six").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.three_of_a_kind && !$('#chk1threeofakind').parent().parent().hasClass('highlight')) {
			$('#chk1threeofakind').prop('checked', Yahtzee.three_of_a_kind);
			$("#chk2threeofakind").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.four_of_a_kind && !$('#chk1carre').parent().parent().hasClass('highlight')) {
			$('#chk1carre').prop('checked', Yahtzee.four_of_a_kind);
			$("#chk2carre").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.yahtzee && !$('#chk1yahtzee').parent().parent().hasClass('highlight')) {
			$('#chk1yahtzee').prop('checked', Yahtzee.yahtzee);
			$("#chk2yahtzee").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.small_straight && !$('#chk1smallstr').parent().parent().hasClass('highlight')) {
			$('#chk1smallstr').prop('checked', Yahtzee.small_straight);
			$("#chk2smallstr").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.large_straight && !$('#chk1largestr').parent().parent().hasClass('highlight')) {
			$('#chk1largestr').prop('checked', Yahtzee.large_straight);
			$("#chk2largestr").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.full_house && !$('#chk1full').parent().parent().hasClass('highlight')) {
			$('#chk1full').prop('checked', Yahtzee.full_house);
			$("#chk2full").prop("disabled", false);
			optioncount++;
		}
		if (Yahtzee.chance && !$('#chk1chance').parent().parent().hasClass('highlight')) {
			$('#chk1chance').prop('checked', Yahtzee.chance);
			$("#chk2chance").prop("disabled", false);
			optioncount++;
		}
		Yahtzee.turn = 1;
		if (optioncount === 0) {
			YAHTZEE.scoreResults();
		}
	}
	$("#turn").html(Yahtzee.turn);
}

YAHTZEE.update_results = function(info) {
  var res_elem = document.getElementById(info.results_id);
  if (res_elem) {
    res_elem.innerHTML = info.result_string;
  }
}

YAHTZEE.update2_results = function() {
  var url1 = $("#dice1").attr("src");
  var url2 = $("#dice2").attr("src");
  var url3 = $("#dice3").attr("src");
  var url4 = $("#dice4").attr("src");
  var url5 = $("#dice5").attr("src");
  var url1 = url1.substring(url1.indexOf("die-") + 4, url1.indexOf("die-") + 5);
  var url2 = url2.substring(url2.indexOf("die-") + 4, url2.indexOf("die-") + 5);
  var url3 = url3.substring(url3.indexOf("die-") + 4, url3.indexOf("die-") + 5);
  var url4 = url4.substring(url4.indexOf("die-") + 4, url4.indexOf("die-") + 5);
  var url5 = url5.substring(url5.indexOf("die-") + 4, url5.indexOf("die-") + 5);
  $('#urls').text(" (" + url1 + "," + url2 +"," + url3 + "," + url4 + "," + url5 + ")");
//   $('#chk1one').prop('checked',$('#chk1one').is(':checked') ? null:'checked');
//   $('#chk1two').prop('checked',$('#chk1two').is(':checked') ? null:'checked');
//   $('#chk1three').prop('checked',$('#chk1three').is(':checked') ? null:'checked');
//   $('#chk1four').prop('checked',$('#chk1four').is(':checked') ? null:'checked');
//   $('#chk1five').prop('checked',$('#chk1five').is(':checked') ? null:'checked');
//   $('#chk1six').prop('checked',$('#chk1six').is(':checked') ? null:'checked');
//   $('#chk1threeofakind').prop('checked',$('#chk1threeofakind').is(':checked') ? null:'checked');
//   $('#chk1carre').prop('checked',$('#chk1carre').is(':checked') ? null:'checked');
//   $('#chk1full').prop('checked',$('#chk1full').is(':checked') ? null:'checked');
//   $('#chk1smallstr').prop('checked',$('#chk1smallstr').is(':checked') ? null:'checked');
//   $('#chk1largestr').prop('checked',$('#chk1largestr').is(':checked') ? null:'checked');
//   $('#chk1yahtzee').prop('checked',$('#chk1yahtzee').is(':checked') ? null:'checked');
//   $('#chk1chance').prop('checked',$('#chk1chance').is(':checked') ? null:'checked');
//   $('#chk2one').attr('onclick','return false');
//   $('#chk2one').prop('checked',$('#chk2one').is(':checked') ? null:'checked');
}

YAHTZEE.sort_results = function(results) {
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
	countyahtzee : 0
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
	var checked = 0;
	if ($("#chk2one").is(":checked")) {
		$("#scoreone").html(Yahtzee.scoreones);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scoreones;
		checked++;
		$("#chk2one").prop("checked", false);
		$("#chk1one").parent().parent().addClass("highlight");
	}
	if ($("#chk2two").is(":checked")) {
		$("#scoretwo").html(Yahtzee.scoretwos);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scoretwos;
		checked++;
		$("#chk2two").prop("checked", false);
		$("#chk1two").parent().parent().addClass("highlight");
	}
	if ($("#chk2three").is(":checked")) {
		$("#scorethree").html(Yahtzee.scorethrees);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scorethrees;
		checked++;
		$("#chk2three").prop("checked", false);
		$("#chk1three").parent().parent().addClass("highlight");
	}
	if ($("#chk2four").is(":checked")) {
		$("#scorefour").html(Yahtzee.scorefours);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scorefours;
		checked++;
		$("#chk2four").prop("checked", false);
		$("#chk1four").parent().parent().addClass("highlight");
	}
	if ($("#chk2five").is(":checked")) {
		$("#scorefive").html(Yahtzee.scorefives);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scorefives;
		checked++;
		$("#chk2five").prop("checked", false);
		$("#chk1five").parent().parent().addClass("highlight");
	}
	if ($("#chk2six").is(":checked")) {
		$("#scoresix").html(Yahtzee.scoresixes);
		Yahtzee.scoreuppergrid = Yahtzee.scoreuppergrid + Yahtzee.scoresixes;
		checked++;
		$("#chk2six").prop("checked", false);
		$("#chk1six").parent().parent().addClass("highlight");
	}
	if ($("#chk2threeofakind").is(":checked")) {
		$("#scorethreeofakind").html(Yahtzee.scorechance);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorechance;
		checked++;
		$("#chk2threeofakind").prop("checked", false);
		$("#chk1threeofakind").parent().parent().addClass("highlight");
	}
	if ($("#chk2carre").is(":checked")) {
		$("#scorecarre").html(Yahtzee.scorechance);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorechance;
		checked++;
		$("#chk2carre").prop("checked", false);
		$("#chk1carre").parent().parent().addClass("highlight");
	}
	if ($("#chk2full").is(":checked")) {
		Yahtzee.scorefull_house = 25;
		$("#scorefull").html(Yahtzee.scorefull_house);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorefull_house;
		checked++;
		$("#chk2full").prop("checked", false);
		$("#chk1full").parent().parent().addClass("highlight");
	}
	if ($("#chk2smallstr").is(":checked")) {
		Yahtzee.scoresmall_straight = 30;
		$("#scoresmallstr").html(Yahtzee.scoresmall_straight);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scoresmall_straight;
		checked++;
		$("#chk2smallstr").prop("checked", false);
		$("#chk1smallstr").parent().parent().addClass("highlight");
	}
	if ($("#chk2largestr").is(":checked")) {
		Yahtzee.scorelarge_straight = 40;
		$("#scorelargestr").html(Yahtzee.scorelarge_straight);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorelarge_straight;
		checked++;
		$("#chk2largestr").prop("checked", false);
		$("#chk1largestr").parent().parent().addClass("highlight");
	}
	if ($("#chk2yahtzee").is(":checked")) {
		Yahtzee.countyahtzee = Yahtzee.countyahtzee + 1;
		Yahtzee.scoreyahtzee = 50;
		$("#scoreyahtzee").html(Yahtzee.scoreyahtzee);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scoreyahtzee;
		checked++;
		$("#chk2yahtzee").prop("checked", false);
		$("#chk1yahtzee").parent().parent().addClass("highlight");
	}
	if ($("#chk2chance").is(":checked")) {
		$("#scorechance").html(Yahtzee.scorechance);
		Yahtzee.scorelowergrid = Yahtzee.scorelowergrid + Yahtzee.scorechance;
		checked++;
		$("#chk2chance").prop("checked", false);
		$("#chk1chance").parent().parent().addClass("highlight");
	}
	if (checked > 0) $("#score").css("color", "red");
	$("#scoreupper1total").html(Yahtzee.scoreuppergrid);
	if (Yahtzee.scoreuppergrid > 62) Yahtzee.bonusuppergrid = 35;
	$("#scoreupperbonus").html(Yahtzee.bonusuppergrid);
	$("#scoreupper2total").html(Yahtzee.scoreuppergrid + Yahtzee.bonusuppergrid);
	$("#scorelower1total").html(Yahtzee.scorelowergrid);
	if (Yahtzee.countyahtzee > 1) Yahtzee.bonuslowergrid = (Yahtzee.countyahtzee - 1) * 100;
	$("#scoreyahtzeebonus").html(Yahtzee.bonuslowergrid);
	$("#scorelower2total").html(Yahtzee.scorelowergrid + Yahtzee.bonuslowergrid);
	var count = 0;
	if ($('#chk1one').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1two').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1three').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1four').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1five').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1six').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1threeofakind').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1carre').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1full').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1smallstr').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1largestr').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1yahtzee').parent().parent().hasClass('highlight')) count++;
	if ($('#chk1chance').parent().parent().hasClass('highlight')) count++;
	if ((count < 14) && (checked > 0)) {
		$("#chk2one").prop("disabled", true);
		$("#chk2two").prop("disabled", true);
		$("#chk2three").prop("disabled", true);
		$("#chk2four").prop("disabled", true);
		$("#chk2five").prop("disabled", true);
		$("#chk2six").prop("disabled", true);
		$("#chk2threeofakind").prop("disabled", true);
		$("#chk2carre").prop("disabled", true);
		$("#chk2full").prop("disabled", true);
		$("#chk2smallstr").prop("disabled", true);
		$("#chk2largestr").prop("disabled", true);
		$("#chk2yahtzee").prop("disabled", true);
		$("#chk2chance").prop("disabled", true);
		$("#chk1one").prop("checked", false);
		$("#chk1two").prop("checked", false);
		$("#chk1three").prop("checked", false);
		$("#chk1four").prop("checked", false);
		$("#chk1five").prop("checked", false);
		$("#chk1six").prop("checked", false);
		$("#chk1threeofakind").prop("checked", false);
		$("#chk1carre").prop("checked", false);
		$("#chk1full").prop("checked", false);
		$("#chk1smallstr").prop("checked", false);
		$("#chk1largestr").prop("checked", false);
		$("#chk1yahtzee").prop("checked", false);
		$("#chk1chance").prop("checked", false);
		$("#dicebutton").css("color", "green");
		$("#dicebutton").prop("disabled", false);
	}
	if (checked > 0) {
		$("#score").css("color", "red");
		$("#score").prop("disabled", true);
	}
	else {
		var disabled = 0;
		if ($("#chk2one").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2two").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2three").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2four").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2five").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2six").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2threeofakind").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2carre").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2full").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2smallstr").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2largestr").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2yahtzee").is(':disabled')) {
			disabled++;
		}
		if ($("#chk2chance").is(':disabled')) {
			disabled++;
		}
		if (disabled > 12) {
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
			console.log("Game over");
			swal({
				title: "<h4 id='swalgameover'>Game over</h4>",
				imageUrl: "die-6.gif",
				timer: 30000,
				showConfirmButton: true,
				html: true
			});
			setTimeout(function(){location.reload(true);}, 10000);
		}
	}
}
