const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0


function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < 100; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))


function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    currentSnake
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}


function move() {


    if (
    (currentSnake[0] + width >= 100 && direction === width) ||
    (currentSnake[0] % width === 9 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)

    


    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it

        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            generateApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(timerId)
            intervalTime = intervalTime * speed
            timerId = setInterval(move, intervalTime)

        }


    squares[currentSnake[0]].classList.add('snake')
}




function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()
// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)