var lyric;

var tayLyricsObject = {
  0: "Twenty stitches in a hospital room",
  1: "All I know is that you drove us off the road",
  2: "And the saddest fear comes creeping in",
  3: "I'm dying to see how this one ends",
  4: "If you love like that blood runs cold",
}
var brLyricsObject = {
  0: "There's a flower behind the window",
  1: "Your closet is a mess, and your backyard's falling down",
  2: "How many angels can you fit upon a match",
  3: "But I'm not gonna lie or sell my soul",
  4: "We cling to you like crazy glue"
}

$(document).ready(function(){

// window.onload = function(){
  setupListeners();
  lyric = generateLyric();
  createLetterBoxes(lyric.getLyricAsArray());
// }

function setupListeners(){

  document.getElementById("play-button").addEventListener("click", () => {
    lyric = generateLyric();
    createLetterBoxes(lyric.getLyricAsArray());
  });

  document.getElementById("check-letter").addEventListener("click", () =>{
    var guessElement = document.getElementById("user-guess");
    var solveElement = document.getElementById("solve-guess");

    if (guessElement.value !== ""){
      var letter = guessElement.value;
      if(lyric.checkLyric(letter)){
        updateCorrectLetters(letter);
      } else {
        updateIncorrectLetters(letter);
      }
    } else {
      var guess = solveElement.value;
      if (guess.toLowerCase() == lyric.songLyric.toLowerCase()) {
        clearGuess(solveElement);
        updateSolvePuzzle();
      } else {
        clearGuess(solveElement);
        // make something that happens when you're wrong
      }
    }
    clearGuess(guessElement);
  });

  var footer = document.getElementsByClassName("footer-info")
  footer[1].addEventListener("click", ()=> {
    window.open("https://github.com/aisflat439");
  })
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

  this.checkArtist = function(){
    return this.artist;
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
  var existingWrongAnswers = document.getElementById("used-letter-area");

  clearBoardSection(existing);
  clearBoardSection(existingWrongAnswers);

  for (var letter in lyric){
    var newElement = document.createElement("div");
    newElement.className = "lyric-letter";
    var content = document.createTextNode(lyric[letter]);
    if (lyric[letter] == " "){
      newElement.style.visibility = "hidden";
      newElement.style.width = "25px";
    }
    newElement.appendChild(content);
    document.getElementById("lyrics-area").appendChild(newElement);
  }
}

function updateCorrectLetters(letter) {
  var lettersOnBoard = document.getElementsByClassName("lyric-letter");
  for (let i = 0; i < lettersOnBoard.length; i++){
    if (lettersOnBoard[i].innerHTML.toLowerCase() == letter.toLowerCase()){
      lettersOnBoard[i].style.color = "rgba(110, 14, 10, 1)";
    }
  }
}

function updateSolvePuzzle() {
  var lettersOnBoard = document.getElementsByClassName("lyric-letter");
  for (let i = 0; i < lettersOnBoard.length; i++){
    lettersOnBoard[i].style.color = "rgba(110, 14, 10, 1)";
  }
  setTimeout(function(){
    $("#correct-guess-modal").css("display", "flex");
  }, 2000);
}

function updateIncorrectLetters(letter){
  var wrongAnswers = document.getElementsByClassName("used-letter-container");

  var newElement = document.createElement("div");
  newElement.className = "used-letter";
  var content = document.createTextNode(letter);
  newElement.appendChild(content);
  wrongAnswers[0].appendChild(newElement);
}

function clearBoardSection(element){
  while (element.hasChildNodes()){
    element.removeChild(element.lastChild);
  }
}

function clearGuess(element){
  element.value = "";
}

$("#tay").click(function(){
  checkAnswer("Taylor Swift");
});
$("#greg").click(function(){
  checkAnswer("Bad Religion");
});

function checkAnswer(artist){
  if (artist !== lyric.artist){
    // you're wrong
    $("#answer").text("Wrong answer!");

  } else {
    // you're correct
    $("#answer").text("You got it!");
  }
  hideModal();
  setPlayAgain();
}

function setPlayAgain(){
  $('#play-button').text("Play again");
}

function hideModal(){
  setTimeout(function(){
    $("#correct-guess-modal").css("display", "none");
  }, 2000);
}

// Utitlity functions
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

}); // close document ready.
