/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

 
 
 var scores, activePlayer, roundScore,gameplaying;
 
 gameplaying = true;

 if (gameplaying)
 {
    init();
 }

 document.querySelector('.btn-new').addEventListener('click',init); // on click of New game button


 document.querySelector('.btn-roll').addEventListener('click',function(){  // code for ROLL DICE button

  // gameplaying = false;

    var diceNum = Math.floor((Math.random() * 6)+1);

    var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceNum + '.png';


if(diceNum!=1)
{
    roundScore += diceNum;
    document.querySelector('#current-'+activePlayer).textContent = diceNum; // display current player score
    
        updateScore(activePlayer,diceNum); // Update Global score
   
}
else
{
   if (gameplaying)
   {
    nextPlayer();  // function to go onto next player if current player gets 1
   }
    
}
 })

 function nextPlayer()
 {
     activePlayer == 0? activePlayer = 1 : activePlayer=0;
     roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';

 }

 function winner()
 {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
 }

 function updateScore(active,diceNum)
 {
    
        scores[active]= scores[active]+diceNum;
        if (scores[active] <= 100)
        {
            document.querySelector('#score-'+active).textContent = scores[active];
        }
        else
        {
            winner();
        }
     

 }


 document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameplaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

 function init()
 {
     console.log("enetring1");
     scores = [0,0];
     roundScore = 0;
     activePlayer = 0;
     document.querySelector('#score-0').textContent = 0;
     document.querySelector('#score-1').textContent = 0;
     document.querySelector('#current-0').textContent = 0;
     document.querySelector('#current-1').textContent = 0;
     document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
 }