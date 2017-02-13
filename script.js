const playBoard = document.getElementById('board');
const turn = document.getElementById('turn');
let num = 0;
const tiles = document.getElementsByClassName('flip');
const playButton = document.getElementById('play');
const playAgainButton = document.getElementById('playAgain');
playAgainButton.style.visibility = 'hidden';
let playerOne;
let playerTwo;

function tileClick(event){
	// Only allowing tile img elements to be proccessed and tiles that are still facing the front
	if(event.target.tagName=='IMG' && event.target.parentNode.className=='front'){
		// Referencing the back part of the tile
		let back = event.target.parentNode.nextElementSibling;
		// Creating img element to be placed in the back of the tile before flipping
	 	let img = document.createElement('img');
	 	// Referencing the tile that was click to call the flip function and show the back side
	 	let flipDiv = event.target.parentNode.parentNode;
	 	// clicks on tiles cannot be proccesed when the playAgain button is on the screen for user to click
	 	if(playAgainButton.style.visibility!='visible'){
	 	// Num will be incremented to take turns between player one and player two
	 	if(num%2==0){
	 		// Player one clicks on tiles will place an X img in the back before the flip
	 		back.childNodes[1].src = 'img/x.jpg';
	 		// Flipping the tile
	 		$("#"+flipDiv.id).flip(true,function(){
	 			// Flipping the tiles back to their original position executes this flip function and
	 			// flips on tiles will not be proccessed when the user clicks to "play again"
 				if(playAgainButton.style.visibility!='visible'){
 					// Passing the id from the tiles ranging from 1 - 9 to check corresponding tiles
			 		if(checkWinner(flipDiv.id)){
			 			turn.textContent = playerOne+' won!';
			 			// Making the "play again" button visible on the screen
			 			document.getElementById('playAgain').style.visibility = 'visible';
			 		}
			 		// Checking for a tie
			 		else if(isTie()){
			 			turn.textContent = "It's a tie!";
			 			document.getElementById('playAgain').style.visibility = 'visible';
			 		}
			 		// Next player's turn
			 		else{
			 			turn.textContent = playerTwo+"'s turn";
			 		}
			 			num++;
 				}
	 		});
	 		
	 	}
	 	else{
	 		// Player two clicks on tiles will place an O img in the back before the flip
	 		back.childNodes[1].src = 'img/o.jpg';
	 		// Flipping the tile
	 		$("#"+flipDiv.id).flip(true,function(){
	 			// Flipping the tiles back to their original position executes this flip function and
	 			// flips on tiles will not be proccessed when the user clicks to "play again"
	 			if(playAgainButton.style.visibility!='visible'){
	 				// Passing the id from the tiles ranging from 1 - 9 to check corresponding tiles
		 			if(checkWinner(flipDiv.id)){
		 				turn.textContent = playerTwo+' won!';
		 				// Making the "play again" button visible on the screen
		 				document.getElementById('playAgain').style.visibility = 'visible';
		 			}
		 			// Checking for a tie
		 			else if(isTie()){
		 				turn.textContent = 'It"s a tie!';
		 			}
		 			// Next player's turn
		 			else{
		 				turn.textContent = playerOne+"'s turn";
		 			}
		 			num++;
		 		}	
	 		});
	 	}
	 }
	 
	 }
}
// Button click after players' names have been provided
playButton.addEventListener('click',function(){
	playerOne = document.getElementById('playerOneInput').value;
	playerTwo = document.getElementById('playerTwoInput').value;
	// only proccess the click when there are valid inputs in the text boxes
	if(playerOne.length > 0 && playerTwo.length > 0){
		// Preparing the tiles to accept clicks
		for(let i =0; i < tiles.length; i++){
			$("#"+tiles[i].id).flip({
  				trigger: 'manual'
			});
		}
		// Clearning the user input from the text boxes
		document.getElementById('playerOneInput').value = '';
		document.getElementById('playerTwoInput').value = '';
		// Displaying the initial turn
		turn.textContent = playerOne+"'s  turn";
		// Disabling the click event for play button
		playButton.style.pointerEvents = 'none';
		// Adding function to proccess the clicks on the tiles
		playBoard.addEventListener('click',function(event){
			tileClick(event);
		});
	}
});

// Determines the tiles that the clicked tile needs to be check with
// for a match in img src
function checkWinner(flipDiv){
	let id = parseInt(flipDiv);
	// Column check
	if(id == 1 || id == 4 || id == 7){
		if(check(1,4,7)) return true;
	}
	else if(id == 2 || id == 5 || id == 8){
		if(check(2,5,8))return true;
	}
	else if(id == 3 || id == 6 || id == 9){
		if(check(3,6,9))return true;
	}
	//Row check
	if(id == 1 || id == 2 || id ==3){
		if(check(1,2,3)) return true;
	}
	else if(id == 4 || id == 5 || id == 6){
		if(check(4,5,6)) return true;
	}
	else if(id == 7 || id == 8 || id == 9){
		if(check(7,8,9)) return true;
	}
	//Diagonal check
	if(id == 1 || id == 5 || id == 9){
		if(check(1,5,9)) return true;
	}
	else if(id == 3 || id == 5 || id == 7){
		if(check(3,5,7)) return true;
	}
}

function check(first,second,third){
	let result;
	let firstTile = document.getElementById(first).childNodes[3].childNodes[1];
	let secondTile = document.getElementById(second).childNodes[3].childNodes[1];
	let thirdTile = document.getElementById(third).childNodes[3].childNodes[1];
	// Checking if all the tiles in the row/column/diagonal have a matching img src on the back
	if(firstTile.src == secondTile.src && secondTile.src == thirdTile.src){
		result= true;
	}
	return result;
}
// Checks if all the tiles have been fliped and there has not been a winner
function isTie(){
	for(let i = 0; i < tiles.length; i++){
		let div = $('#'+tiles[i].id).data("flip-model");
		if(!div.isFlipped){
			return false;
		}
	}
	return true;
}
// Play again button will be visible when there is a winning game
playAgain.addEventListener('click',function(){
	// flipping the tiles that were flipped back to their original position
	for(let i = 0; i < tiles.length; i++){
		let div = $('#'+tiles[i].id).data("flip-model");
		if(div.isFlipped){
			$("#"+tiles[i].id).flip(false,function(){
				// When the tiles are flipped to their original position
				// Play again button needs to be hidden
				playAgainButton.style.visibility = 'hidden';
				// Displaying player's turn after reseting the tiles
				if(num%2==0){
						turn.textContent= playerOne+"'s turn";
				}else{
						turn.textContent= playerTwo+"'s turn";
				}
				// Reseting the src that is used for comparison with other tiles
				for(let i =1; i <= 9; i++){
					document.getElementById(i).childNodes[3].childNodes[1].src='';
				}
			});
		}
	}

});


