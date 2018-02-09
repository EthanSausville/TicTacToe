// Needed variables
var XOsArray = {}
var i = 0;
var j = 0;
var k = 0;
var win = false;

javascriptCSS();

function javascriptCSS() {
	// Sets the height of the boxes equal to the width responsively
	var colWidth = $(".col").width();
	$(".col").css("height", colWidth + "px");

	// Sets the height of the text based on the box size responsively
	var fontSize = (parseInt($(".XOs").height()) * 1);
	$(".XOs").css("font-size", fontSize +"px");
	$(".center").css("height", fontSize +"px");
}


// Functions to turn window on
function on(head,sub) {
	document.getElementById("overlay").style.display = "block";
	document.getElementById("resultHeader").innerHTML = head
	document.getElementById("resultSub").innerHTML = sub
}
function off() {
	document.getElementById("overlay").style.display = "none";
}


// This block of code inputs the Xs and Os when you click on the cells
function isOdd(num) {return num % 2}
var Xs = document.querySelectorAll(".XOs")
for (i = 0; i < Xs.length; i++) {
	Xs[i].addEventListener("click", writeInputs, false);
}


// Write X or O when clicked
function writeInputs() {
	if(this.innerHTML == '<span class="center">X</span>' || this.innerHTML == '<span class="center">O</span>')
		console.log(this.innerHTML);
	else {
		if(isOdd(j) == 0)
			this.innerHTML = '<span class="center">X</span>';
		else 
			this.innerHTML = '<span class="center">O</span>';
		j++;
		this.classList.remove("open");
		setXOsArray();
		checkForCatsGame();
		checkForWin();
	}
}


// Sets the values in array to be tested for victory
function setXOsArray() {
	var count = $('.XOs').length
	for(i=0; i<count; i++) {
		XOsArray[i] = document.getElementsByClassName('XOs')[i].innerHTML;
	}
}


// Check for victory function
function checkForWin() {
	
	// check columns for victory
	checkForWinSingle(0,3,6);
	checkForWinSingle(1,4,7);
	checkForWinSingle(2,5,8);
	
	// check rows for victory
	checkForWinSingle(0,1,2);
	checkForWinSingle(3,4,5);
	checkForWinSingle(6,7,8);
	
	// check diagonals for victory
	checkForWinSingle(0,4,8);
	checkForWinSingle(2,4,6);
}


// Checks for victory on a single combination
function checkForWinSingle(check1, check2, check3) {
	win = false;
	a = XOsArray[check1];
	b = XOsArray[check2];
	c = XOsArray[check3];
	if(a === b && a === c && a !== "") {
		on(XOsArray[check3] + ", Wins!","Well done, you have achieved the impossible and won a game of tic tac toe!")
		win = true;
		endGame();
	}
}


// Checks for a Cats Game
function checkForCatsGame() {
	if(win == false) {
		k = 0;
		for(i = 0; i < 9; i++) {
			if(XOsArray[i] == "")
				k++;
		}
		console.log(k);
		if(k === 0) {
			on("Cats Game...","As usual this game was a draw.")
			endGame()
		}
	}
}


// Removes functionality after complete 
function endGame() {
	$(".open").removeClass();
	for (i = 0; i < Xs.length; i++) {
		Xs[i].removeEventListener("click", writeInputs, false);	
	}
}


function playAgain() {
	location.reload();
}