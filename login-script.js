
const loginButtonOne = document.getElementById('login-button1');
const loginButtonTwo = document.getElementById('login-button2');
const guestOneButton = document.getElementById('guest1');
const guestTwoButton = document.getElementById('guest2');
let user1;
let user2;
let guest1;
let guest2;
$(document).ready(function(){
	$.ajax({
		method: 'post',	
		url : 'database.php',
		data : {type: 'rankings'},
		success: function(data){
			const rankings = JSON.parse(data);
			rankings.sort(function(a,b){
				return b.wins - a.wins;
			});
			const leaderBoard = document.getElementById('players-ranking');
			for(let i =0; i < rankings.length; i++){
				let row = document.createElement('tr');
				let ranking = document.createElement('td');
				ranking.textContent = i+1;
				let player = document.createElement('td');
				player.textContent = rankings[i].name;
				let wins = document.createElement('td');
				wins.textContent = rankings[i].wins;
				row.appendChild(ranking);
				row.appendChild(player);
				row.appendChild(wins);
				leaderBoard.appendChild(row);		
			}
		}
	});
});
loginButtonOne.addEventListener('click',function(event){
		let userName = document.getElementById('userName-1').value;
		let password = document.getElementById('password-1').value;
		if(userName.length > 0 && password.length > 0){
			validateUser("one",userName,password);
		}
		else{
			alert('username and password required');
		}	
});
loginButtonTwo.addEventListener('click',function(){
		let userName = document.getElementById('userName-2').value;
		let password = document.getElementById('password-2').value;
		if(userName.length > 0 && password.length > 0){
			validateUser('two',userName,password);
		}
		else{
			alert('username and password required');
		}
});
guestOneButton.addEventListener('click',function(){
 	const playerOneHeading = document.getElementById('player-one-heading');
 	user1 = JSON.parse('{"name":"guest 1","wins":"0","losses":"0"}');
	playerOneHeading.textContent = 'guest 1 ready to play...';
	loginButtonOne.style.pointerEvents = 'none';
	checkLoggedInUsers(user1,user2);
 });
guestTwoButton.addEventListener('click',function(){
	const playerTwoHeading = document.getElementById('player-two-heading');
	user2 = JSON.parse('{"name":"guest 2","wins":"0","losses":"0"}');
	playerTwoHeading.textContent = 'guest 2 ready to play...';
	loginButtonTwo.style.pointerEvents = 'none';
	checkLoggedInUsers(user1,user2);
});
function validateUser(player,userName,password){
	$.ajax({
		method : 'post',
		url : 'database.php?',
		data : {type : 'validate', userName : userName, password : password},
		success: function(data){
			if(data=='invalid'){
				alert("invalid login credentials");
			}
			else{
				if(player=='one'){
					user1 = JSON.parse(data);
					const playerOneHeading = document.getElementById('player-one-heading');
					playerOneHeading.textContent = user1['name']+" ready to play...";
					loginButtonOne.style.pointerEvents = 'none';
					alert(user1+" "+user2);
					checkLoggedInUsers(user1,user2);
				}
				else if(player=='two'){
					user2 = JSON.parse(data);
					const playerTwoHeading = document.getElementById('player-two-heading');
					playerTwoHeading.textContent = user2['name']+" ready to play...";
					loginButtonTwo.style.pointerEvents = 'none';
					alert(user1+" "+user2);
					checkLoggedInUsers(user1,user2);
				}

			}		
		}
	});
}
function checkLoggedInUsers(user1,user2){
	if(user1&&user2){
		alert(JSON.stringify(user1)+" "+JSON.stringify(user2));
		sessionStorage.setItem("user1",JSON.stringify(user1));
		sessionStorage.setItem("user2",JSON.stringify(user2));
		window.location.replace("http://guillermosd.com/play-board.html");
	}

}