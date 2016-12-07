var lyric;

window.onload = function(){
  setupListeners();
}

function setupListeners(){
  document.getElementById("play-button").addEventListener("click", () => {
    lyric = generateLyric();
    createLetterBoxes(lyric.getLyricAsArray());
  });
  document.getElementById("check-letter").addEventListener("click", () =>{
    if (lyric == undefined){
      alert("You cant guess a letter without starting a game");
    }
    var guessElement = document.getElementById("user-guess");
    var letter = guessElement.value;
    if(lyric.checkLyric(letter)){
      updateCorrectLetters(letter);
    } else {
      updateIncorrectLetters(letter);
    }
    clearGuess(guessElement);
  });
  document.getElementById("check-solution").addEventListener("click", () => {
    var guessElement = document.getElementById("solve-guess")
    var guess = guessElement.value;
    if (guess == lyric.songLyric) {
      clearGuess(guessElement);
      console.log("OMGGGGGGGGGGGG you win");
    } else {
      clearGuess(guessElement);
      console.log("Oiiiiiiie");
    }
  });
  var footer = document.getElementsByClassName("footer-info")
  footer[1].addEventListener("click", ()=> {
    window.open("https://github.com/aisflat439");
  })
}

tayLyricsObject = {
  0: "Twenty stiches in a hospital room",
  1: "All I know is that you drove us off the road",
  2: "And the saddest fear comes creeping in",
  3: "I'm dying to see how this one ends",
  4: "If you love like that blood runs cold",
}
brLyricsObject = {
  0: "There's a flower behind the window",
  1: "Your closet is a mess, and your backyard's falling down",
  2: "How many angels can you fit upon a match",
  3: "But I'm not gonna lie or sell my soul",
  4: "We cling to you like crazy glue"
}

function Lyric(value, string){
  this.artist = (value == 1) ? "Bad Religion" : "Taylor Swift";
  this.songLyric = string;

  this.getLyricAsArray = function(){
    return this.songLyric.split("");
  }

  this.checkLyric = function(letter){
    for (var i = 0; i < this.songLyric.length; i++) {
      if (this.songLyric.charAt(i).toLowerCase() == letter.charAt(0).toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}

function generateLyric(){
  var choice = Math.random() < 0.5 ? 1 : 2;
  if (choice == 1) {
    var l = new Lyric(choice, brLyricsObject[getRandomNumber(0,4)]);
  } else {
    var l = new Lyric(choice, tayLyricsObject[getRandomNumber(0,4)]);
  }
  return l;
}

function createLetterBoxes(lyric){
  var existing = document.getElementById("lyrics-area");
  while (existing.hasChildNodes()){
    existing.removeChild(existing.lastChild);
  }
  for (var letter in lyric){
    var newElement = document.createElement("div");
    newElement.className = "lyric-letter";
    var content = document.createTextNode(lyric[letter]);
    newElement.appendChild(content);
    document.getElementById("lyrics-area").appendChild(newElement);
  }
}

function updateCorrectLetters(letter) {
  var lettersOnBoard = document.getElementsByClassName("lyric-letter");
  for (let i = 0; i < lettersOnBoard.length; i++){
    if (lettersOnBoard[i].innerHTML.toLowerCase() == letter.toLowerCase()){
      lettersOnBoard[i].style.backgroundColor = "green";
    }
  }
}

function updateIncorrectLetters(letter){
  var wrongAnswers = document.getElementsByClassName("used-letter-container");

  var newElement = document.createElement("div");
  newElement.className = "used-letter";
  var content = document.createTextNode(letter);
  newElement.appendChild(content);
  wrongAnswers[0].appendChild(newElement);
}

function clearGuess(element){
  element.value = "";
}

// Utitlity functions
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
