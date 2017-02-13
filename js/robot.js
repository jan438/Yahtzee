var YAHTZEE = {};

var throws = new Array(0,0,0,0,0,0);

YAHTZEE.info = {result_string: "", results_id: "__results"};

YAHTZEE.callback = function(total, info, results) {
	info.result_string = info.result_string + " (" + results[0] + "," + results[1] +"," + results[2] + "," + results[3] + "," + results[4] + ")";
	YAHTZEE.update_results(info);
	if (Yahtzee.turn == 100) {
		$("#dicebutton").css("color", "red");
		$("#dicebutton").prop("disabled", true);
	}
	info.result_string = "";
	if (Yahtzee.turn < 100) {
		Yahtzee.turn = Yahtzee.turn + 1;
		$("#dicebutton").trigger("click");
		$("#turn").html(Yahtzee.turn);
		var singlethrow = YAHTZEE.throwdices(results);
		for( var i = 0; i < 5; i++) {
			throws[singlethrow[i] - 1]++;
		}
		$('#counted').text(" (" + throws[0] + "," + throws[1] +"," + throws[2] + "," + throws[3] + "," + throws[4] + "," + throws[5] + ")"); 
	}
}

YAHTZEE.update_results = function(info) {
  var res_elem = document.getElementById(info.results_id);
  if (res_elem) {
    res_elem.innerHTML = info.result_string;
  }
}

D6.dice(5, YAHTZEE.callback, YAHTZEE.info);

Yahtzee = {
	turn : 1
}

YAHTZEE.throwdices = function(results) {
	var singlethrow = new Array(0,0,0,0,0);
	for( var i = 0; i < 5; i++) {
		if (i < 5) {
			singlethrow[i] = results[i];
		}
	}
	console.log(singlethrow);
	return singlethrow;
}


