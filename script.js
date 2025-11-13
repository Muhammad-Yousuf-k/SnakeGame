const board = document.getElementById("board")
const block = document.querySelectorAll(".block")
const modal = document.getElementById("modal")
const startBtn = document.getElementById("startbtn")
const startGameM = document.getElementById("start-game")
const restartBtn = document.getElementById("restartbtn")
const restartGameM = document.getElementById("game-over")
const scoreEle = document.getElementById("score")
const highscoreEle = document.getElementById("Highscore")
const timeEle = document.getElementById("time")


let speed = 200
const blockH = 30
const blockW = 30
const cols = Math.floor(board.clientWidth / blockW)
const rows = Math.floor(board.clientHeight / blockH)
let setIntervalId = null
let timerIntervalId = null
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
let blocks = []
snake = [{ x: 1, y: 3 }]
let highScore = localStorage.getItem("highscore") || 0
let score = 0
let time = "00-00"
let direction = "down"


highscoreEle.innerText = highScore



for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block
    }
}

function render() {
    let head = null


    // food render
    blocks[`${food.x}-${food.y}`].classList.add("food")


    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }

    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }

    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }

    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }


    //  food comsume
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food")
        snake.unshift(head)
        score += 10
        scoreEle.innerText = score

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highscore", highScore.toString());
        }

    }


    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {

        clearInterval(setIntervalId)
        clearInterval(timerIntervalId)
        modal.style.display = "flex"
        startGameM.style.display = "none"
        restartGameM.style.display = "flex"

        return;
    }



    snake.forEach(segment => {

        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    });

    snake.unshift(head)
    snake.pop()
    snake.forEach(segment => {

        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    });
}

startBtn.addEventListener("click", startGame)
function startGame() {
    modal.style.display = "none"
    setIntervalId = setInterval(() => { render() }, speed)
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split("-").map(Number)
        if (sec == 59) {
            min += 1
            sec = 0
        } else {
            sec += 1
        }

        time = `${min}-${sec}`
        timeEle.innerText = time

    }, 1000)
}


restartBtn.addEventListener("click", restartGame)
function restartGame() {
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment => {

        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    });

    score = 0
    time = "00-00"

    highscoreEle.innerText = highScore
    scoreEle.innerText = score
    timeEle.innerText = time


    modal.style.display = "none"
    direction = "down"
    snake = [{ x: 1, y: 3 }]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    setIntervalId = setInterval(() => { render() }, speed)
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split("-").map(Number)
        if (sec == 59) {
            min += 1
            sec = 0
        } else {
            sec += 1
        }

        time = `${min}-${sec}`
        timeEle.innerText = time

    }, 1000)

}


addEventListener("keydown", (event) => {
    console.log(event.key);

    if (event.key == "ArrowUp" || event.key == "w" || event.key == "W") {
        direction = "up";
    } else if (event.key == "ArrowDown" || event.key == "s" || event.key == "S") {
        direction = "down";
    } else if (event.key == "ArrowRight" || event.key == "d" || event.key == "D") {
        direction = "right";
    } else if (event.key == "ArrowLeft" || event.key == "a" || event.key == "A") {
        direction = "left";
    }
});