var possible_balls = [0,1,1,0,2,3,0,4,4,6,"wd", "W", "W", "nb"]
var current_over_status = new Array();
var MAX_OVERS = 4;
var MAX_WICKETS = 10;
var player_name = ["",""];
var winner=1;
var name = "Manish";
var bg_color = "blue";
var decision;
var innings = 1;


var current_player_index;
var score = [0,0];
var wickets = [0,0];
var over_ctr = 0;
var ball_ctr = 0;
var over_start = true;
var target = 0;
var win = false;
var winner_index;

function validate(){
	player_name[0] = document.getElementById("player1").value;
	player_name[1] = document.getElementById("player2").value;

	if(player_name[0] == "" || player_name[1] == ""){
		Materialize.toast('Enter the names of players', 3000, 'rounded');
		return false;
	}
	return true;
}

function toss(){
	if(!validate()){
		return;
	}

	winner = Math.floor(Math.random() * 2);
	console.log(winner);

	if(winner == 0){
		name = player_name[0];
		bg_color = "blue";
	}else{
		name = player_name[1];
		bg_color = "red";
	}

	var win_string = name + " won the toss";
	var loader = document.getElementById("loader");
	loader.className += " active";

	setTimeout(function() {
		document.getElementById("player-info").style.display = "none";
		
		document.getElementById("toss-info").style.display = "block";
		document.getElementById("toss-win-card").className  += " "+bg_color;
		document.getElementById("toss-string").innerHTML = win_string;
	}, 2000);
}

function update_score_board(){
	document.getElementById("score-display").innerHTML = score[current_player_index] + "/" + wickets[current_player_index];
	document.getElementById("over-display").innerHTML = over_ctr + "." + ball_ctr;	
}

function choose(e){
	decision = e.id;
	document.getElementById("toss-content").style.display = "none";
	document.getElementById("play-content").style.display = "block";
	if(decision == "bat"){
		current_player_index = winner;
	}else{
		current_player_index = (winner+1)%2;
	}
	document.getElementById("player-name").innerHTML = player_name[current_player_index];
	update_score_board();
	
}

function change_innings(){
	document.getElementById("overview").innerHTML = "";
	target = score[current_player_index] + 1
	document.getElementById("target").innerHTML = "Target : " + (target);
	current_player_index = (current_player_index+1)%2;
	innings = 2;
	over_ctr = 0;
	ball_ctr = 0;
	over_start = true;
	document.getElementById("player-name").innerHTML = player_name[current_player_index];
	document.getElementById("new-ball").innerHTML = '<i class="material-icons">add</i></a>';
	update_score_board();
	

}

function play(e){
	
	if(win){

		document.getElementById("winner-display").style.display = "block";
		document.getElementById("play-content").style.display = "none";
		if(winner_index == -1){
			document.getElementById("winner-name").innerHTML = "Match Tied";
		}else{
			document.getElementById("winner-name").innerHTML = "Winner is " + player_name[winner_index];
		}
	}
	
	if(over_ctr >= MAX_OVERS || wickets[current_player_index] >= MAX_WICKETS){
		change_innings();
		return;
	}

	if(ball_ctr == 0 && over_start){
		document.getElementById("overview").innerHTML += "<div class='col s12 white-text'>Over " + (over_ctr+1) + "</div>";
	}

	var random_ball = Math.floor(Math.random() * possible_balls.length);
	var current_ball = possible_balls[random_ball];
	var ball_bg_color;

	if(current_ball == "W"){
		wickets[current_player_index]++;
		ball_ctr++;
		ball_bg_color = "red";
	}else if(current_ball == "nb" || current_ball == "wd"){
		score[current_player_index]++;
		ball_bg_color = "yellow";
	}else{
		score[current_player_index] += current_ball;
		ball_ctr++;
		switch(current_ball){
			case 0: ball_bg_color = "grey";break;
			case 1: 
			case 2:
			case 3: ball_bg_color = "purple"; break;
			case 4: ball_bg_color = "blue";break;
			case 6: ball_bg_color = "pink"; break;
		}
	}
	over_start = false;

	
	console.log(current_ball + "  " + random_ball);

	var html = '<div class="ball-status col s2 m2 l1 center-align"><div class="card-panel ' + ball_bg_color+  '"><h5>' + current_ball + '</h5></div></div>'
	document.getElementById("overview").innerHTML += html;

	if(ball_ctr == 6){
		ball_ctr = 0;
		over_start = true;
		over_ctr ++;

	}
	if(over_ctr >= MAX_OVERS || wickets[current_player_index] >= MAX_WICKETS){
		document.getElementById("new-ball").innerHTML = '<i class="material-icons">navigate_next</i></a>';
	}

	
	update_score_board();

	if(innings == 2 && !win){
		if(score[current_player_index] >= target){
			win = true;
			winner_index = current_player_index;
			
		}else if(over_ctr >= MAX_OVERS){
			win = true;
			winner_index = (current_player_index+1)%2;
			if(score[current_player_index] == target - 1){
				winner_index = -1;
				win = true;
			}
		}else if(wickets[current_player_index] >= MAX_WICKETS){
			win = true;
			winner_index = (current_player_index+1)%2;
		}
	}
}