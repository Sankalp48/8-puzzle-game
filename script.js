const puzzle=document.getElementById("puzzle")
const hintText=document.getElementById("hintText")
const resultScreen=document.getElementById("resultScreen")
const resultText=document.getElementById("resultText")
const timerDisplay=document.getElementById("timer")

let tiles=[1,2,3,4,5,6,7,8,0]

let time=0
let timer=null


/* TIMER */

function startTimer(){

clearInterval(timer)

timer=setInterval(()=>{
time++
timerDisplay.innerText="Time: "+time+" s"
},1000)

}

function resetTimer(){
time=0
timerDisplay.innerText="Time: 0 s"
}


/* DRAW */

function drawPuzzle(){

puzzle.innerHTML=""

tiles.forEach((num,index)=>{

let tile=document.createElement("div")
tile.classList.add("tile")

if(num===0){
tile.classList.add("empty")
}else{
tile.textContent=num
}

tile.onclick=()=>moveTile(index)

puzzle.appendChild(tile)

})

}


/* MOVE */

function moveTile(index){

let empty=tiles.indexOf(0)

let valid=[empty-1,empty+1,empty-3,empty+3]

if(valid.includes(index)){

[tiles[index],tiles[empty]]=[tiles[empty],tiles[index]]

drawPuzzle()
checkWin()

}

}


/* SHUFFLE */

function shuffle(){

tiles=[1,2,3,4,5,6,7,8,0]

for(let i=tiles.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

;[tiles[i],tiles[j]]=[tiles[j],tiles[i]]

}

resetTimer()
startTimer()

hintText.innerText=""

drawPuzzle()

}


/* RESET */

function resetGame(){

tiles=[1,2,3,4,5,6,7,8,0]

resetTimer()

drawPuzzle()

}


/* WIN */

function checkWin(){

let goal=[1,2,3,4,5,6,7,8,0]

if(JSON.stringify(tiles)===JSON.stringify(goal)){

clearInterval(timer)

resultText.innerHTML="🎉 You Won!<br>Time: "+time+" seconds"

resultScreen.style.display="flex"

}

}


/* NEW GAME */

function newGame(){

resultScreen.style.display="none"

shuffle()

}


/* HINT */

function giveHint(){

let empty=tiles.indexOf(0)

let possible=[]

if(empty%3!==0) possible.push(empty-1)
if(empty%3!==2) possible.push(empty+1)
if(empty>2) possible.push(empty-3)
if(empty<6) possible.push(empty+3)

let tile=tiles[possible[0]]

hintText.innerText="Hint: Move tile "+tile

}


/* START */

shuffle()