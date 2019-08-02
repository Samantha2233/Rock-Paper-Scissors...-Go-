/*----- constants -----*/
const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
const shootAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');

const rpsLookup = {
    r: {
        imgUrl : 'images/rock.png',
        beats: 's'
    },
    p: {
        imgUrl : 'images/paper.png',
        beats: 'r'
    },
    s: {
        imgUrl : 'images/scissors.png',
        beats: 'p'
    }     
}

/*----- app's state (variables) -----*/
let scores, results, winner;

/*----- cached element references -----*/
const scoreEls = {
    p: document.getElementById('p-score'),
    t: document.getElementById('t-score'),
    c: document.getElementById('c-score')
}

//(images) --> for render funciton
const resultEls = {
    p: {
        borderEl: document.getElementById('p-result'),
        imgEl: document.querySelector('#p-result img')
    },
    c: {
        borderEl: document.getElementById('c-result'),
        imgEl: document.querySelector('#c-result img')
    }
};

/*----- event listeners -----*/
document.querySelector('main button').addEventListener('click', playRound);

/*----- functions -----*/
init();

function init() {
    //inistialize state, starting with scores
    scores = {
        p: 0,
        t: 0,
        c: 0
    };

    results = {
        p: 'r',
        c: 'r'
    };

    winner = null; // 'p', 't', 'c'
    render();
}

function render() {
    //render scores
    //could implement for loop through scoreEls too
    for(let score in scores) {
        //console.log(score);
        scoreEls[score].textContent = scores[score];
        //changed init scores to test
    }
    //render results (images) update border and img src
    for(let result in results) {
        resultEls[result].borderEl.style.borderColor = winner === result ? 'grey' : 'white';
        resultEls[result].imgEl.src = rpsLookup[results[result]].imgUrl;
    }
}

function playRound() {
    //console.log("clicked!");
    results.p = getRandomRPS();
    results.c = getRandomRPS();
    //determine winner
    if(results.p === results.c) {
        winner = 't';
    } else if(results.c === rpsLookup[results.p].beats) {
        winner = 'p';
    } else {
        winner = 'c';
    }


    //update scores
    scores[winner]++;


    //after all impactef state has been updated, call render()
    render();
}

function getRandomRPS() {
    let rps = Object.keys(rpsLookup);
    let rndIdx = Math.floor(Math.random() * rps.length);
    //console.log(rps);
    return rps[rndIdx];
}