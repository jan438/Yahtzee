function D7Animator(id, baseUrl, key) {
	if ((typeof id != "string") || !id) return; // allows a dummy object to be created without causing errors below.
	this.id = id;
	if ((typeof key != "string") || !key) key = id;
	D7Animator.animators[id] = this;
	if (document.getElementById) {
		var targetElem = document.getElementById(id);
		if (!targetElem) {
			this.nope("Debug: The tag with specified id (" + id + ") was not found in the document.");
		} else {
			if (targetElem.nodeName.toLowerCase() == 'img') {
				this.useImages = true;
				this.targetImg = targetElem;
				var imageBank = D7Animator.getImageBank(key, baseUrl);
				this.blank = imageBank.blank;
				var i;
				for (i=1; i<7; ++i) {
					var whichDie = "die" + i;
					this[whichDie] = imageBank[whichDie];
				}
			} else {
				this.useImages = false;
				this.dieSpan = targetElem;
			}
		}
		this.seedMod = Math.round(Math.random() * 100);
		this.seedModInc = Math.round(Math.random() * 100) + 89;
		this.initSeed();
		this.callback = new Function("args", "return false;");
		this.args = 0;
		this.interval = 50;
		if (!this.useImages) this.interval = 10;
	} else {
		this.nope(0);
	}
}

D7Animator.animators = new Array();

D7Animator.get = function(id) {
	if (D7Animator.animators[id]) return D7Animator.animators[id];
	return new D7Animator(id);
}

D7Animator.imageBanks = new Object();

D7Animator.getImageBank = function(key, baseUrl) {
	var imageBank = D7Animator.imageBanks[key];
	if (!imageBank) {
		D7Animator.imageBanks[key] = new Object();
		imageBank = D7Animator.imageBanks[key];
		if (typeof baseUrl != "string")
			baseUrl = D7Animator.baseUrl;
		if (typeof baseUrl != "string") baseUrl = "";
		imageBank.blank = new Image();
		imageBank.blank.src = baseUrl + "blank.gif";
		var i;
		for (i=1; i<7; ++i) {
			whichDie = "die" + i;
			imageBank[whichDie] = new Object();
			imageBank[whichDie].die = new Image();
			imageBank[whichDie].die.src = baseUrl + "die-" + i + ".gif";
			imageBank[whichDie].side = new Image();
			imageBank[whichDie].side.src = baseUrl + "dices-" + i + ".gif";
			imageBank[whichDie].top = new Image();
			imageBank[whichDie].top.src = baseUrl + "dicet-" + i + ".gif";
		}
	}
	return imageBank;
}

D7Animator.prototype.setInterval = function(interval) {
	if (!interval) {
		if (this.useImages)
			interval = 50;
		else
			interval = 10;
	}
	this.interval = interval;
}

D7Animator.prototype.setCallback = function(callback, args) {
	if (typeof callback != 'function')
		return this.nope("Debug: The first argument to the setCallback method of the D7Animator class must be of type 'function'.");
	this.callback = callback;
	this.args = args;
}

D7Animator.prototype.start = function(result) {
	var targetElem = document.getElementById(this.id);
	if (!targetElem) {
		this.nope("Debug: The tag with specified id (" + this.id + ") was not found in the document.");
	} else {
		var classlist = JSON.stringify(targetElem.classList);
		var pos = classlist.indexOf("selected");
//		console.log("Classlist " + this.id + " " + classlist);
		if (pos < 0) {
			if (!result || result < 1 || result > 6) result = this.randomBaseOne(6);
			var sequence = new Array();
			var state = "top";
			if (this.random(2) == 1) state = "side";
			var seqCount = this.random(3) + this.random(3) + this.random(3) + 2;
			if (!this.useImages) seqCount += 2;
			var thisRoll = 0;
			var i=0;
			for ( ; i<seqCount; ++i) {
				thisRoll += this.randomBaseOne(5);
				thisRoll = thisRoll % 6;
				if (!thisRoll) thisRoll = 6;
				sequence[i] = thisRoll;
			}
			sequence[i] = result;
			this.result = result;
			this.oldresult = result;
			this.animate(sequence, state);
		}
		else {
			this.result = this.oldresult;
			var sequence = new Array();
			var state = "top";
			if (this.random(2) == 1) state = "side";
			var seqCount = this.random(3) + this.random(3) + this.random(3) + 2;
			if (!this.useImages) seqCount += 2;
			var thisRoll = 0;
			var i=0;
			for ( ; i<seqCount; ++i) {
				thisRoll += this.randomBaseOne(5);
				thisRoll = thisRoll % 6;
				if (!thisRoll) thisRoll = 6;
				sequence[i] = thisRoll;
			}
			sequence[i] = this.result;
			this.animate(sequence, state);
		}
	}
}

D7Animator.prototype.animate = function(sequence, state) {
	if (!sequence) return this.nope("Debug: The sequence passed to the animate method of D7Animator was invalid.");
	if (typeof sequence != 'object') {
		return this.nope("Debug: The sequence passed to the animate method of D7Animator was invalid.");
	}
	var numNumbers = sequence.length;
	if (!numNumbers || numNumbers < 1)
		return this.nope("Debug: The sequence passed to the animate method of D7Animator contained no values.");
	if (state != 'top' && state != 'side') state = 'die';
	this.showImg(sequence[0], state);
	var ind = 0;
	if (state == 'die') {
		if (numNumbers == 1) {
			window.setTimeout("D7Animator.callAnimatorCallback('" + this.id + "')", this.interval);
			return true;
		}
		state = "side";
		if (this.random(2) == 0) state = "top";
		ind = 1;
	} else {
		state = "die";
	}
	var nextCall = "D7Animator.animate('" + this.id + "', ['" + sequence[ind];
	for (var i=ind+1; i<numNumbers; ++i) {
		nextCall += "','" + sequence[i];
	}
	nextCall += "'], '" + state + "')";
	window.setTimeout(nextCall, this.interval);
}

D7Animator.callAnimatorCallback = function(id) {
	var animator = D7Animator.animators[id];
	if (animator && (typeof animator == "object") && (typeof animator.callback == "function"))
		animator.callback(animator.args);
}

D7Animator.animate = function(id, sequence, state) {
	var animator = D7Animator.animators[id];
	if (animator && (typeof animator == "object") && (typeof animator.animate == "function"))
		animator.animate(sequence, state);
}

D7Animator.prototype.showImg = function(number, state) {
	if (number < 1 || number > 6 || !state) {
		if (this.useImages) {
			this.targetImg.src = this.blank.src;
		} else {
			this.dieSpan.innerHTML = "";
		}
		return;
	}
	if (this.useImages) {
		var whichDie = "die" + number;
		var dieObj = this[whichDie];
		if (!dieObj) return this.nope("Debug: The specified number (" + number + ") is not a valid number for the D7Animator.");
		var dieImg = dieObj[state];
		if (!dieImg) return this.nope("Debug: The specified state (" + state + ") is not a valid state for the D7Animator.");
		this.targetImg.src = dieImg.src;
	} else {
		this.dieSpan.innerHTML = "[" + number + "]";
	}
}

D7Animator.prototype.clear = function() {
	this.showImg(0, false);
}

D7Animator.prototype.nope = function(msg) {
	if (msg) {
		alert(msg + "\n\n(If you're not the developer for this application, please contact the owner of this website!)");
	} else {
		alert("Either your browser can't handle this application, or there's a bug.\nEither way, you're out of luck right now.\nIf you think this is a bug, please contact the owner of this site!");
	}
	return false;
}

D7Animator.prototype.randomBaseOne = function(n) {
	var m = this.random(n);
	return m+1;
}

D7Animator.prototype.random = function(n) {
	if (!this.seed) this.reInitSeed();
	this.seed = (0x015a4e35 * this.seed) % 0x7fffffff;
	return (this.seed >> 16) % n;
}

D7Animator.prototype.initSeed = function() {
	var now = new Date();
	this.seed = (this.seedMod + now.getTime()) % 0xffffffff;
}

D7Animator.prototype.reInitSeed = function() {
	this.seedMod += this.seedModInc;
	this.initSeed();
}

// The D7AnimGroup class
function D7AnimGroup(id, animators, isSequenced) {  // The animators argument is an array of D7Animator and/or D7AnimGroup objects.
	if ((typeof id != "string") || !id) return; // allows a dummy object to be created without causing errors below.
	this.id = id;
	if (this.id === "dice1") {
//		console.log("D7 AnimGroup class: " + this.id);
		this.roll = 0;
		this.bestSelection = null;
		this.bestEValue = -1.0;
		this.categoryHasBeenChosen = new Array();
		this.setBestSelection = function(selection) {
			this.bestSelection = selection;
		}
		this.getBestSelection = function() {
			return this.bestSelection;
		}
		this.allSelections = new HashMap();
		for (d0 = 0; d0 <= 1; d0++) {
			for (d1 = 0; d1 <= 1; d1++) {
				for (d2 = 0; d2 <= 1; d2++) {
					for (d3 = 0; d3 <= 1; d3++) {
						for (d4 = 0; d4 <= 1; d4++) {
							var arr = new Array(5);
							arr[0] = (d0 == 0) ? 0 : 1;
							arr[1] = (d1 == 0) ? 0 : 1;
							arr[2] = (d2 == 0) ? 0 : 1;
							arr[3] = (d3 == 0) ? 0 : 1;
							arr[4] = (d4 == 0) ? 0 : 1;
							var combo = new D7DiceSelection(arr);
							this.allSelections.put(arr[0].toString() + arr[1].toString() + arr[2].toString() + arr[3].toString() + arr[4].toString(), combo);
						}
					}
				}
			}
		}
	}
	D7AnimGroup.animgroups[id] = this;
	this.animators = animators;
	this.length = animators.length;
	this.callback = new Function("args", "return false;");
	this.args = 0;
	this.isSequenced = isSequenced;
}

D7AnimGroup.animgroups = new Array();

D7AnimGroup.get = function(id) {
	return D7AnimGroup.animgroups[id];
}

function D7DiceSelection(arr) {
	this.arr = arr;
	this.evalue = 0.0;
	this.logprivatevariables = function() {
//		console.log(" arr: " + this.arr + " evalue: "+ this.evalue);
	}
	this.resetEValue = function() {
		this.evalue = 0.0;
	}
	this.addEValue = function(evalprm) {
		this.evalue = this.evalue + evalprm;
	}
	this.getEValue = function() {
		return this.evalue;
	}
}

function D7DiceCombination(arr) {
	this.arr = arr;
	this.category = 0;
	this.score = 0;
	this.probability = 0.0;
	this.evalue = 0.0;
	this.updateCombination = function(category, score, selectedDice) {
		this.category = category;
		this.score = score;
		var diceRerolled = 0;
		for (i = 0; i < selectedDice.length; i++) {
			if (selectedDice[i] == 1)
				diceRerolled++;
		}
		this.probability = Math.pow((1.0/6.0), diceRerolled);
		this.evalue = this.probability * score;
	}
	this.getNonmatchingDiceForReroll = function(dice) {
	}
	this.getCombination = function() {
	}
	this.getEValue = function() {
		return this.evalue;
	}
}

D7AnimGroup.prototype.generateDiceCombinations = function(selections, dice) {
	var countDiceCombinations = 0;
	var result=[];
	var lb0 = (selections[0] == 0 ? dice[0] : 1);
	var ub0 = (selections[0] == 0 ? dice[0] : 6);
	for (d0 = lb0; d0 <= ub0; d0++) {
		var lb1 = (selections[1] == 0 ? dice[1] : 1);
		var ub1 = (selections[1] == 0 ? dice[1] : 6);
		for (d1 = lb1; d1 <= ub1; d1++) {
			var lb2 = (selections[2] == 0 ? dice[2] : 1);
			var ub2 = (selections[2] == 0 ? dice[2] : 6);
			for (d2 = lb2; d2 <= ub2; d2++) {
				var lb3 = (selections[3] == 0 ? dice[3] : 1);
				var ub3 = (selections[3] == 0 ? dice[3] : 6);
				for (d3 = lb3; d3 <= ub3; d3++) {
					var lb4 = (selections[4] == 0 ? dice[4] : 1);
					var ub4 = (selections[4] == 0 ? dice[4] : 6);
					for (d4 = lb4; d4 <= ub4; d4++) {
						var arr = [ d0, d1, d2, d3, d4 ];
						var combo = new D7DiceCombination(arr);
						result.push(combo);
						countDiceCombinations++;
					}
				}
			}
		}
	}
//	console.log("CountDiceCombinations: " + countDiceCombinations);
	return result;
}

D7AnimGroup.prototype.chooseBestCategory = function(combination) {
	var categoryIndex = 0;
	var highestScore = -1;
	var animatorgroup = D7AnimGroup.get("dice1");
	for (category = 0; category < 13; category++) {
		if (animatorgroup.categoryHasBeenChosen[category] === "false") {
			var isValid = this.isDiceValidForCategory(combination, category);
			var score = 0;
			if (isValid) score = this.calculateCategoryScore(category, combination);
			if (score > highestScore) {
				highestScore = score;
				categoryIndex = category;
			}
		}
	}
	return categoryIndex;
}

D7AnimGroup.prototype.calculateCategoryScore = function(category, dice) {
	const ONES = 0;
	const TWOS = 1;
	const THREES = 2;
	const FOURS = 3;
	const FIVES = 4;
	const SIXES = 5;
	const THREE_OF_A_KIND = 6;
	const FOUR_OF_A_KIND = 7;
	const FULL_HOUSE = 8;
	const SMALL_STRAIGHT = 9;
	const LARGE_STRAIGHT = 10;
	const YAHTZEE = 11;
	const CHANCE = 12;
	const FULL_HOUSE_SCORE = 25;
	const SMALL_STRAIGHT_SCORE = 30;
	const LARGE_STRAIGHT_SCORE = 40;
	const YAHTZEE_SCORE = 50;
	switch (category) {
		case ONES:
		case TWOS:
		case THREES:
		case FOURS:
		case FIVES:
		case SIXES:
			return this.sumDice(dice, category + 1);
		case THREE_OF_A_KIND:
			return this.sumDice(dice, 0);
		case FOUR_OF_A_KIND:
			return this.sumDice(dice, 0);
		case FULL_HOUSE:
			return FULL_HOUSE_SCORE;
		case SMALL_STRAIGHT:
			return SMALL_STRAIGHT_SCORE;
		case LARGE_STRAIGHT:
			return LARGE_STRAIGHT_SCORE;
		case YAHTZEE:
			return YAHTZEE_SCORE;
		case CHANCE:
			return this.sumDice(dice, 0);
		default:
			return 0;
	}

}

D7AnimGroup.prototype.sumDice = function(dice, dieValueRequirement) {
	var result = 0;
	for (i = 0; i < 5; i++) {
		if (dieValueRequirement == 0) {
			result = result + dice[i];
		} else {
			if (dice[i] == dieValueRequirement)
				result = result + dice[i];
		}
	}
	return result;
}

D7AnimGroup.prototype.isDiceValidForCategory = function(combination, category) {
	const ONES = 0;
	const SIXES = 5;
	const THREE_OF_A_KIND = 6;
	const FOUR_OF_A_KIND = 7;
	const FULL_HOUSE = 8;
	const SMALL_STRAIGHT = 9;
	const LARGE_STRAIGHT = 10;
	const YAHTZEE = 11;
	const CHANCE = 12;
	var tempboolean = false;
	tempboolean = (category >= ONES && category <= SIXES);
	if (tempboolean == true) {
		for (i = 0; i < 5; i++) {
			if ((combination[i] - 1) == category) return true;
		}
	}
	switch (category) {
		case THREE_OF_A_KIND:
			return this.isNOfAKind(3, combination, false);
		case FOUR_OF_A_KIND:
			return this.isNOfAKind(4, combination, false);
		case FULL_HOUSE:
			return (this.isNOfAKind(3, combination, true) && this.isNOfAKind(2, combination, true));
		case SMALL_STRAIGHT:
			return (this.isSmallStraight(combination) || this.isLargeStraight(combination));
		case LARGE_STRAIGHT:
			return this.isLargeStraight(combination);
		case YAHTZEE:
			return this.isNOfAKind(5, combination, false);
		case CHANCE:
			return true;
		default:
			return false;
	}
	return tempboolean;
}

D7AnimGroup.prototype.isSmallStraight = function(dice) {
	const SSM1 = 15;
	const SSM2 = 30;
	const SSM3 = 60;
	var mask = 0;
	for (i = 0; i < 5; i++) {
		mask = mask | (1 << (dice[i] - 1));
	}
	if ((mask & SSM1) == SSM1) {
		return true;
	} else if ((mask & SSM2) == SSM2) {
		return true;
	} else if ((mask & SSM3) == SSM3) {
		return true;
		}
	return false;
}

D7AnimGroup.prototype.isLargeStraight = function(dice) {
	const LSM1 = 31;
	const LSM2 = 62;
	var mask = 0;
	for (i = 0; i < 5; i++) {
		mask = mask | (1 << (dice[i] - 1));
	}
	if ((mask & LSM1) == LSM1) {
		return true;
	} else if ((mask & LSM2) == LSM2) {
		return true;
	}
	return false;
}

D7AnimGroup.prototype.isNOfAKind = function(n, dice, exact) {
	var result = false;
	var equals = new Array(0,0,0,0,0,0);
	for (i = 0; i < 5; i++) {
		equals[dice[i] - 1]++;
	}
	for (i = 0; i < equals.length; i++) {
		if (exact) {
			if (equals[i] == n)
				return true;
		} else {
			if (equals[i] >= n)
				return true;
		}
	}
	return result;
}

D7AnimGroup.prototype.start = function(results) {
	this.results = this.genMissingResults(results);
	this.completions = new Array();
	var i;
	for (i=0; i<this.length; ++i) {
		var args = {'id': this.id, 'index' : i};
		this.animators[i].setCallback(D7AnimGroup.animgroupCallback, args);
		this.completions[i] = 0;
	}
	for (i=0; i<this.length; ++i) {
		if (!i || !this.isSequenced) {
			this.animators[i].start(this.results[i]);
		}
	}
	if (this.id === "dice1") {
//		console.log("D7 AnimGroup: " + this.id);
//		console.log("Roll: " + this.roll);
		this.categoryHasBeenChosen = $("#choosen_categories").html().split(",");
		var bestSelectionroll = this.getBestSelection();
		var bestEValueroll = this.bestEValue;
		var values = this.allSelections.toArray();
		for (i = 0; i < values.length; i++) {
			var selectionCombo = values[i];
			var selectedDice = selectionCombo['arr'];
			var selectedDicename = JSON.stringify(selectedDice);
//			console.log(selectedDice);
			selectionCombo.resetEValue();
			this.allCombinations = this.generateDiceCombinations(selectionCombo['arr'], this.results);
//			console.log("generateAllCombinations length: " + this.allCombinations.length);
			for (j = 0; j < this.allCombinations.length; j++) {
				combinationclass = this.allCombinations[j];
				combination = combinationclass['arr'];
				var category = this.chooseBestCategory(combination);
				var isValid = this.isDiceValidForCategory(combination, category);
				var score = 0;
				if (isValid) score = this.calculateCategoryScore(category, combination);
				combinationclass.updateCombination(category, score, selectedDice);
				var evalue = combinationclass.getEValue();
				selectionCombo.addEValue(evalue);
			}
			if (selectionCombo.getEValue() > bestEValueroll) {
				bestSelectionroll = selectionCombo;
				bestEValueroll = selectionCombo.getEValue();
			}
//			selectionCombo.logprivatevariables();
		}
		if (bestSelectionroll != null) {
			bestSelectionroll.logprivatevariables();
			this.setBestSelection(bestSelectionroll);
			var turn = $("#turn").html();
//			console.log("Turn: " + turn);
			var holdinfo = bestSelectionroll['arr'];
			if (holdinfo[0] == 0) {
				$("#die5").addClass("selected");
			}
			else {
				$("#die5").removeClass("selected");
			}
			if (holdinfo[1] == 0) {
				$("#die6").addClass("selected");
			}
			else {
				$("#die6").removeClass("selected");
			}
			if (holdinfo[2] == 0) {
				$("#die7").addClass("selected");
			}
			else {
				$("#die7").removeClass("selected");
			}
			if (holdinfo[3] == 0) {
				$("#die8").addClass("selected");
			}
			else {
				$("#die8").removeClass("selected");
			}
			if (holdinfo[4] == 0) {
				$("#die9").addClass("selected");
			}
			else {
				$("#die9").removeClass("selected");
			}
		}
	}
}

D7AnimGroup.prototype.genMissingResults = function(results) {
	if (!results) results = [];
	for (var i=0; i<this.length; ++i) {
		if (!results[i]) {
			if (this.animators[i].randomBaseOne) {
				results[i] = this.animators[i].randomBaseOne(6);
			} else if (this.animators[i].genMissingResults) {
				results[i] = this.animators[i].genMissingResults();
			} else {
				results[i] = 0;
			}
			this.animators[i].result = results[i];
		}
	}
	return results;
}

D7AnimGroup.prototype.clear = function() {
	for (var i=0; i<this.length; ++i) {
		this.animators[i].clear();
	}
}

D7AnimGroup.prototype.setCallback = function(callback, args) {
	if (typeof callback != 'function')
		return alert("Debug: The first argument to the setCallback method of the D7AnimGroup class must be of type 'function'.");
	this.callback = callback;
	this.args = args;
}

D7AnimGroup.prototype.notify = function(args) {
	var whichAnim = args.index;
	this.completions[whichAnim]++;
	var numNonZero = 0;
	for (var i=0; i<this.length; ++i) {
		if (this.completions[i])
			numNonZero++;
	}
	if (numNonZero == this.length) {
		this.callback(this.args);
	} else if (this.isSequenced) {
		this.animators[1 + whichAnim].start(this.results[1 + whichAnim]);
	}
}

D7AnimGroup.animgroupCallback = function(args) {
	var id = args.id;
	var animGroup = D7AnimGroup.animgroups[id];
	if (!animGroup) return false;
	animGroup.notify(args);
}

// The D7AnimBuilder class
function D7AnimBuilder(id, results, locations, baseUrl, groupsize, interval, useImages) {
	if (!id) return; // allows a dummy object to be created without causing errors
	this.id = id;
	D7AnimBuilder.animBuilders[id] = this;
	this.results = results;
	if (!locations || (typeof locations != 'object') || !locations.length) locations = new Array();
	for (var c=locations.length; c<results.length; ++c) {
		locations[c] = "die" + (c+1);
	}
	this.locations = locations;
	if (!baseUrl) baseUrl = "";
	this.baseUrl = baseUrl;
	this.groupsize = groupsize;
	this.numGroups = Math.floor(results.length / groupsize);
	this.interval = interval;
	this.useImages = useImages;
	this.callback = null;
	this.callbackData = null;
}

D7AnimBuilder.animBuilders = new Array();

D7AnimBuilder.get = function(id) {
	return D7AnimBuilder.animBuilders[id];
}

D7AnimBuilder.prototype.reset = function() {
	var i;
	for (i=0; i<this.results.length; ++i) {
		this.results[i] = 0;
	}
	for (i=0; i<this.layout.length; ++i) {
		var dieSpan = document.getElementById("sidebar_" + i);
		dieSpan.innerHTML = "";
	}

}

function D7Sample() {}

D7Sample.showTotals = function(id) {
	var animBuilder = D7AnimBuilder.animBuilders[id];
	var results = animBuilder.results;
	var layout = animBuilder.layout;
	var numTotals = layout.length;
	var dieCount = -1;
	for (var i=0; i<numTotals; ++i) {
		var numInRow = layout[i] * animBuilder.groupsize;
		var rowTotal = 0;
		for (var j=0; j<numInRow; ++j) {
			rowTotal += results[++dieCount];
		}
		var dieSpan = document.getElementById("sidebar_" + i);
		dieSpan.innerHTML = "&nbsp;= " + rowTotal;
	}
}

D7Sample.noop = function() { return; }

function D7() {}

D7.roll = function() {
	D7AnimBuilder.get("dice").reset();
	D7AnimBuilder.get("dice").start();
}

D7.baseUrl = "";

D7.setBaseUrl = function(baseUrl) {
	D7.baseUrl = baseUrl;
}

D7.quickRandom = function(base) {
	var baseInt = parseInt(base);
	if (baseInt < 2) return 1;
	return 1 + Math.floor(Math.random() * 698377680) % baseInt;
}

D7.diceToShow = function(numDice) {
	if (!numDice) numDice = 0;
	if (numDice < 0) numDice = 0;
	if (numDice > D7.numDice) numDice = D7.numDice;
	if (numDice == D7.numDiceShown) return;
	var i;
	var dieElem;
	for (i=1; i<=numDice; ++i) {
		dieElem = document.getElementById('dice' + i);
		if (dieElem) dieElem.style.visibility = "";
	}
	for ( ; i<=D7.numDice; ++i) {
		dieElem = document.getElementById('dice' + i);
		if (dieElem) dieElem.style.visibility = "hidden";
	}
	D7.numDiceShown = numDice;
}
