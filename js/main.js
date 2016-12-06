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
    var letter = document.getElementById("user-guess").value;
    if(lyric.checkLyric(letter)){
      console.log("OMGGMO");
    } else {
      console.log("DERRRRP false");
    }

  })
}

tayLyricsObject = {
  0: "twenty stiches in a hospital room",
  1: "all i know is that you drove us off the road",
  2: "And the saddest fear comes creeping in",
  3: "i'm dying to see how this one ends",
  4: "if you love like that blood runs cold",
}
brLyricsObject = {
  0: "there's a flower behind the window",
  1: "your closet is a mess, and your backyard's falling down",
  2: "how many angels can you fit upon a match?",
  3: "but I'm not gonna lie or sell my soul",
  4: "we cling to you like crazy glue"
}

function Lyric(value, string){
  this.artist = (value == 1) ? "Bad Religion" : "Taylor Swift";
  this.songLyric = string;

  this.getLyricAsArray = function(){
    return this.songLyric.split("");
  }

  this.checkLyric = function(letter){
    for (var i = 0; i < this.songLyric.length; i++) {
      if (this.songLyric.charAt(i) == letter.charAt(0)) {
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


// Utitlity functions
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
