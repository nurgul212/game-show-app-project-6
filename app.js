/* ----------------Step 1: Global Variables- Get needed variables---------------------*/
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');

/* ----------------Step 2: Create an array named phrases---------------------------------*/
const phrases = [
    'stop uyghur genocide',
    'no pain no gain',
    'time flies',
    'good things take time',
    'life is short',
];
const ul = document.querySelector('#phrase ul');

/* --------------Step 3: Listen for the start game button to be pressed------------------*/
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

/* --------------Step 4: Return a random phrase from phrases array-----------------------*/

function getRandomPhraseAsArray(array){
    const randomPhraseIndex = Math.floor(Math.random()*array.length);
    const randomPhraseSelected = array[randomPhraseIndex].toLowerCase();
    const randomPhraseSplit = randomPhraseSelected.split("");
    return randomPhraseSplit;
 }

 const selectedPhrase = getRandomPhraseAsArray(phrases);
 
//  console.log(selectedPhrase);

 /* -------------Step 5: Add the selected letters of a string to the display--------------*/
function addPhraseToDisplay(phrase) {
   
    // const phraseDisplay=phrase;
    
    for(let i = 0; i < phrase.length; i++){
        const list = document.createElement('li');
        list.textContent = phrase[i];
        ul.appendChild(list);   
        
        if (phrase[i] === ' ' ){
            list.className = 'space';
        } else {
            list.className = 'letter'    
        }  
    }
}
const selectedPhraseDisplay = addPhraseToDisplay(selectedPhrase);

/* --------------Step 6: Check if a letter is in the phrase-------------------------------*/
function checkLetter(button){
    const letterList = document.querySelectorAll('.letter');
    let matchLetter = null;

    for ( let i = 0; i < letterList.length; i++) {
        if (button.textContent === letterList[i].textContent) {
            letterList[i].classList.add('show');
            letterList[i].style.transition = '0.5s ease-in-out';
            matchLetter = true;
        }
    }
    return matchLetter;
}

/* --------------Step 7: Add an event listener to the keyboard ----------------------------*/
let missed = 0;
qwerty.addEventListener('click', (e) =>{
   if(e.target.tagName === 'BUTTON'){
       e.target.className = 'chosen';
       e.target.setAttribute('disabled', '');
       let matchLetter = checkLetter(e.target);
       if(matchLetter === null){
           document.querySelectorAll('img')[missed].src='images/lostHeart.png';
           e.target.className = 'mismatch';
           missed ++;
       }
       checkWin();
   }
 })

/* --------------Step 8: Check if the game has been won or lost ----------------------------*/
// if letterClass === ShowCalss,  you win!
// if missed > 4 then the game is over, you lose!
function checkWin() {
    const letterClass = document.getElementsByClassName('letter');
    const showClass = document.getElementsByClassName('show');

    if (letterClass.length === showClass.length) {
        overlay.style.display= 'flex';
        overlay.className='win';
        document.querySelector('h2').textContent = 'Yay!... you nailed it!';
        document.querySelector('p').textContent = 'Well Done!';
        playAgain();
    } else if (missed > 4 ) {
        overlay.style.display= 'flex';
        overlay.className='lose';
        document.querySelector('h2').textContent = 'Oops!... you lose!';
        document.querySelector('p').textContent = 'Don\'t Give Up, Try Again! :)';
         playAgain();
    }   
}

/* --------------Step 9: Reset the game ----------------------------*/
function playAgain(){
    startButton.textContent = 'Play Again';
    startButton.style.backgroundColor = '#bee35a';
    missed = 0;
    ul.textContent = ' ';

    const priorChosenLetters = document.querySelectorAll('.chosen');
    const priorMismatchLetters = document.querySelectorAll('.mismatch');

  for(let i = 0; i < priorChosenLetters.length; i++) {
    priorChosenLetters[i].classList.remove('chosen');
    priorChosenLetters[i].disabled = false;
  }

  for(let i = 0; i < priorMismatchLetters.length; i++) {
    priorMismatchLetters[i].classList.remove('mismatch');
    priorMismatchLetters[i].disabled = false;
  }

  // Get new phrase
  const newPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhrase);

  // Refill lives
  const liveHearts = document.querySelectorAll('.tries img');
  for(i = 0; i < liveHearts.length; i++) {
    liveHearts[i].src = 'images/liveHeart.png';
  }

}

//Restart the game. this fuction also works, but it just reloads the start page.
// function playAgain(){
//     startButton.textContent = 'Play Again';
//     startButton.style.backgroundColor = '#bee35a';
    

//     startButton.addEventListener('click', () => {
//      location.reload();
//     });    
// }