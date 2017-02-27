$(document).ready(function(){
	
	// Constants and declarations
	var ROWS = 8;
	var COLUMNS = 8;
	var guesses = 0;
	var treasurePos;
	var successSound = document.getElementById('successSound');
	
	// Initialise display
	populateIsland();

	// Pythagoras' Theorem
	function distance(point1, point2) {
		var distance = Math.sqrt(Math.pow((point2.y - point1.y), 2) + Math.pow((point2.x - point1.x), 2));
		return Math.floor(distance / 50); // Scaled, returns lowest integer
	}
	
	function populateIsland() {
		// Populate island with crosses
		var crossesString = "";
		for (var row = 0; row < ROWS; row++) {
			crossesString += '<div class="crosses-row">';
			for (var col = 0; col < COLUMNS; col++) {
				crossesString += '<div class="cross"><img src="images/cross-black-50x50.png" width="50" height="50"></div>';
			}
			crossesString += '</div><!--row-->';
		}
		$('#crosses').append(crossesString);
		// Place treasure at random location
		treasurePos = {
			x : Math.floor(Math.random() * 7) * 50,
			y : Math.floor(Math.random() * 7) * 50
		};
	}

	// Click hnadlers
	$('.crosses-row > .cross').click(main);
	$('#reset').click(function () {
		location.reload();
	});

	function main() {
		// Update score
		guesses += 1;
		$('#triesNum').html(guesses);
		// Get distance from treasure
		var clickedPos = {
			x : ($(this).position().left),
			y : ($(this).position().top)
		};
		var distanceFromTreasure = distance(clickedPos, treasurePos);
		// Check for win
		if (distanceFromTreasure == 0) {
			gameWon();
		}
		// 50/50 chance of displaying distance
		Math.random() > 0.5 ? $(this).html('?') : $(this).html(distanceFromTreasure);
	}

	function gameWon() {
		// Play success sound
		successSound.play();
		// Show treasure
		$('#island').append('<div id="chest"><img src="images/treasure-chest-100x100.png" width="75" height="75"></div>');
		$('#chest').css('position', 'absolute');
		$('#chest').css('top', treasurePos.y + 90);
		$('#chest').css('left', treasurePos.x + 90);
		// Congratulate
		$('#youWon').html('<h2>Well Done!</h2>');
	}

});