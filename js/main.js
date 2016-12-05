window.onload = function(){
  setupListeners();
  console.log("omggmo");
}

function setupListeners(){
  document.getElementById("button").addEventListener("click", function(){
    grabLyric();
  });
}

tayLyricsObject = {
  0: "twenty stiches in a hospital room",
  1: "all i know is that you drove us off the road",
  2: "And the saddest fear comes creeping in",
  3: "I'm dying to see how this one ends",
  4: "If you love like that blood runs cold",
}
brLyricsObject = {
  0: "there's a flower behind the window",
  1: "your closet is a mess, and your backyard's falling down",
  2: "How many angels can you fit upon a match?",
  3: "But I'm not gonna lie or sell my soul",
  4: "we cling to you like crazy glue"
}

function Lyric(value, string){
  this.artist = (value == 1) ? "Bad Religion" : "Taylor Swift";
  this.songLyric = string;

  this.getLyricAsArray = function(){
    return this.songLyric.split("");
  }
}

function grabLyric(){
  var choice = Math.random() < 0.5 ? 1 : 2;
  if (choice == 1) {
    var l = new Lyric(choice, brLyricsObject[getRandomNumber(0,4)]);
  } else {
    var l = new Lyric(choice, tayLyricsObject[getRandomNumber(0,4)]);
  }
  console.log(l.getLyricAsArray());
}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
