var possible_balls = [0,0,1,1,2,3,4,4,6,"wd", "W", "W", "nb"]
var current_over_status = new Array();
var MAX_OVERS = 4;
var MAX_WICKETS = 10;
var player1_name = "";
var player2_name = "";
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

function validate(){
	player1_name = document.getElementById("player1").value;
	player2_name = document.getElementById("player2").value;

	if(player1_name == "" || player2_name == ""){
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
		name = player1_name;
		bg_color = "blue";
	}else{
		name = player2_name;
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
	update_score_board();
	
}

function play(e){
	
	if(over_ctr >= MAX_OVERS){
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

	var html = '<div class="ball-status col s2 m1 center-align"><div class="card-panel ' + ball_bg_color+  '"><h5>' + current_ball + '</h5></div></div>'
	document.getElementById("overview").innerHTML += html;

	if(ball_ctr == 6){
		ball_ctr = 0;
		over_start = true;
		over_ctr ++;

	}

	
	update_score_board();


	

}