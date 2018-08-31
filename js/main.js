//Object that contains the start and winner screen
const html = {
    startScreen:    `<div class="screen screen-start" id="start">
                        <header>
                            <h1>Tic Tac Toe</h1>
                            <a href="#" id="start-button" class="button">Start game</a>
                        </header>
                    </div>`,
  
    winnerScreen:   `<div class="screen screen-win" id="finish">
                        <header>
                            <h1>Tic Tac Toe</h1>
                            <p class="message"></p>
                            <a href="#" id="win-button" class="button">New game</a>
                        </header>
                    </div>`
    
}
//Write the html and get the default behaviour of the screens
document.write(html.startScreen)
document.write(html.winnerScreen)
start = document.getElementById("start")
board = document.getElementById("board")
finish = document.getElementById("finish")
board.style.display = "none"
finish.style.display = "none"
startButton = document.getElementById("start-button")
//Event listener that start the game hiding the appropiate divs and showing the board screen
startButton.addEventListener("click", ()=>{
    start.style.display="none"
    board.style.display=""
    finish.style.display="none"
})
//Objects that decides the turn and store the box selected for each player
const player1 = {
    isTurn: true,
    boxesSelecteds: []
}
const player2 = {
    isTurn: false,
    boxesSelecteds: []
}
//check is 0 while there is no winner and become 1 if there is a winner 
let check = 0
//Array that contains the winner combinations
const winner = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
//This functions compare box selecteds for the players and if this includes a winner combination the variable check become 1
let checkWinner = function (player) {
    winner.forEach((inner) => {
        let count = 0   
        for (let i = 0; i < player.length; i++) {
            for (let j = 0; j < inner.length; j++) {
                if (player[i] === inner[j]) {
                    count += 1
                }
            }
        } 
        if (count===3) {
            check = 1
        }        
    })    
}
//Default of the label turns for the players
labelPlayer1 = document.getElementById("player1")
labelPlayer2 = document.getElementById("player2")
labelPlayer1.classList.add("active")
message = document.querySelector(".message")
boxes = document.querySelectorAll(".box")
//movements counts the turns that have passed in the game
let movements = 0
//This is the mechanism of the game, it includes the hover effect that coincides the turn of
//the players and every click the number of the box is append to the boxes selected of the player and is called
//the checkwinner function
boxes.forEach(box => {
    box.addEventListener("mouseover", (e)=>{
        if (player1.isTurn) {
            e.target.style.backgroundImage = "url('img/o.svg')"
        } else {
            e.target.style.backgroundImage = "url('img/x.svg')"
        }
    })
    box.addEventListener("mouseleave", (e) => e.target.style.backgroundImage = "" )
    box.addEventListener("click", ((e)=> {
        //Change the label for the turns of the players
        if (labelPlayer1.classList.contains("active")) {
            labelPlayer1.classList.remove("active")
        } else {
            labelPlayer1.classList.add("active")
        }
        if (labelPlayer2.classList.contains("active")) {
            labelPlayer2.classList.remove("active")
        } else {
            labelPlayer2.classList.add("active")
        }
        //Add one movement every click
        movements += 1
        //Mechanism of the game
        if (player1.isTurn) {
            e.target.classList.add("box-filled-1")
            player1.isTurn = false
            player2.isTurn = true
            player1.boxesSelecteds.push(Number(e.target.id))
            checkWinner(player1.boxesSelecteds)
            if (check===1) {
                board.style.display="none"
                finish.style.display=""
                finish.classList.add("screen-win-one")
                message.innerHTML="Winner"
            }
            if (movements===9 && check != 1) {
                board.style.display = "none"
                finish.style.display = ""
                finish.classList.add("screen-win-tie")
                message.innerHTML="It's a tie"
            }
        } else {
            e.target.classList.add("box-filled-2")
            player2.isTurn = false
            player1.isTurn = true
            player2.boxesSelecteds.push(Number(e.target.id))
            checkWinner(player2.boxesSelecteds)
            if (check===1){
                board.style.display = "none"
                finish.style.display = ""
                finish.classList.add("screen-win-two")
                message.innerHTML = "Winner"
            }
            if (movements === 9 && check != 1) {
                board.style.display = "none"
                finish.style.display = ""
                finish.classList.add("screen-win-tie")
                message.innerHTML="It's a tie"
            }
        }   
    }))
});
//When ther is a winner, the new game button reset the complete board and started a new game
winButton = document.getElementById("win-button")
winButton.addEventListener("click", ()=>{
    finish.style.display = "none"
    finish.classList.remove("screen-win-one")
    finish.classList.remove("screen-win-two")
    finish.classList.remove("screen-win-tie")
    board.style.display=""
    boxes.forEach(box=>{
        box.classList.remove("box-filled-1")
        box.classList.remove("box-filled-2")
    })
    labelPlayer1.classList.add("active")
    labelPlayer2.classList.remove("active")
    player1.boxesSelecteds=[]
    player2.boxesSelecteds=[]
    player1.isTurn=true
    player2.isTurn=false
    check=0
    movements=0
    message.innerHTML=""
})


