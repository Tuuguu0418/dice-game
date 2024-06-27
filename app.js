var isNewGame;
var activePlayer;
var scores;
var roundScore;
var diceDom = document.querySelector(".dice");
initGame();

function initGame(){
    isNewGame = true;
    // Тоглогчийн ээлжийг хадгалах хувьсагч
    activePlayer = 0;

    // Тоглогчдийн цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];

    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    // document.querySelector('#score-1').innerHTML = "<em>Yes!</em>";
    document.getElementById("score-0").textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    diceDom.style.display = "none";
}

// Shoog shideh event listener
document.querySelector(".btn-roll").addEventListener('click', function(){
    if(isNewGame){
        var diceNumber = Math.floor(Math.random()*6)+1;

        diceDom.style.display = "block";
        diceDom.src = 'dice-' + diceNumber + ".png";

        if(diceNumber !== 1){
            roundScore += diceNumber;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else{
            switchToNextPlayer();
        }
    }else{
        alert("Game over so you have to restart the game");
    }
});

// Hold button event listener
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(isNewGame){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer]>=20){
            isNewGame=false;
            document.getElementById('name-'+activePlayer).textContent = 'Winner!!!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        }else{
            switchToNextPlayer();
        }
    }else{
        alert("Game over so you have to restart the game");
    }

});

function switchToNextPlayer(){
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
        
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    diceDom.style.display = "none";
}

// New game button
document.querySelector('.btn-new').addEventListener('click', initGame);
