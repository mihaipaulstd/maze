const { Engine, Render, Runner, World, Bodies, Body } = Matter

let width = window.innerWidth
let height = window.innerHeight
let level = 3
let cells = level + 1
let unitLength = width / cells
let unitHeight = height / cells
let wallThickness = 1 //px

window.addEventListener('resize', e => {
    width = window.innerWidth,
    height = window.innerHeight
})

const engine = Engine.create()
engine.world.gravity.y = 0
const { world } = engine
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run(render)
Runner.run(Runner.create(), engine)

// Border walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 1, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 1, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 1, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 1, height, { isStatic: true })
];
World.add(world, walls)

//Maze Generation
const shuffle = (arr) => {
    let counter = arr.length

    while(counter) {
        let index = Math.floor(Math.random() * counter)
        counter--

        const temp = arr[counter]
        arr[counter] = arr[index]
        arr[index] = temp
    }
    return arr
}

const grid = Array(cells)
    .fill(null)
    .map(
        () => Array(cells)
            .fill(false)
    )
const verticals = Array(cells)
    .fill(null)
    .map(
        () => Array(cells - 1)
            .fill(false)
    )
const horizontals = Array(cells - 1)
    .fill(null)
    .map(
        () => Array(cells)
            .fill(false)
    )

const startingRow = Math.floor(Math.random() * cells)
const startingColumn = Math.floor(Math.random() * cells)


const stepThroughGridRecursion = (row, column) => {
    //If the cell at [row, column] is visited, then return
    if(grid[row][column])
        return
    
    //Mark cell as visited
    grid[row][column] = true

    //Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, column, 'up'],       //top
        [row, column + 1, 'right'],     //right
        [row + 1, column, 'down'],    //bottom
        [row, column - 1, 'left']       //left
    ])

    //For each neighbor...
    for(let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor

        //Check if neighbor is out of bounds
        if(
            nextRow < 0
            || nextRow >= cells
            || nextColumn < 0
            || nextColumn >= cells
        ) {
            continue
        }

        //If neighbor is visited, go to the next one
        if(grid[nextRow][nextColumn]) {
            continue
        }

        //Remove wall from the walls grid
        switch(direction) {
            case 'up':
                horizontals[row-1][column] = true
                break
            case 'right':
                verticals[row][column] = true
                break
            case 'down':
                horizontals[row][column] = true
                break
            case 'left':
                verticals[row][column - 1] = true
                break
            default:
        }
        
        //Visit next neighbor
        stepThroughGridRecursion(nextRow, nextColumn)
    }
}

stepThroughGridRecursion(startingRow, startingColumn)

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open) {
            return
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength / 2,
            (rowIndex + 1) * unitHeight,
            unitLength,
            wallThickness,
            { isStatic: true }
        )

        World.add(world, wall)
    })
})

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open) {
            return
        }

        const wall = Bodies.rectangle(
            (columnIndex + 1) * unitLength,
            rowIndex * unitHeight + unitHeight / 2,
            wallThickness,
            unitHeight,
            { isStatic: true }
        )

        World.add(world, wall)
    })
})

const getRandomGridPosition = (grid => {
    const randomRow = Math.floor(Math.random() * grid.length)
    const randomColumn = Math.floor(Math.random() * grid[0].length)
    return {
        row: randomRow,
        column: randomColumn
    }
})

//Goal
const goalPosition = getRandomGridPosition(grid)
const goal = Bodies.rectangle(
    unitLength * goalPosition.row + unitLength / 2,
    unitHeight * goalPosition.column + unitHeight / 2,
    (unitLength < unitHeight ? unitLength : unitHeight) * .75,
    (unitLength < unitHeight ? unitLength : unitHeight) * .75,
    { isStatic: true }
)

World.add(world, goal)

//Ball
let ballPosition = getRandomGridPosition(grid)

do{
    ballPosition = getRandomGridPosition(grid)
} while(
    ballPosition.row == goalPosition.row
    && ballPosition.column == goalPosition.column
)

const ball = Bodies.circle(
    unitLength * ballPosition.row + unitLength / 2,
    unitHeight * ballPosition.column + unitHeight / 2,
    (unitLength < unitHeight ? unitLength : unitHeight) * .75 / 2,
    { isStatic: false }
)

World.add(world, ball)

document.addEventListener('keydown', e => {
    const {x, y} = ball.velocity
    switch(e.key) {
        case 'w':
            Body.setVelocity(ball, { x, y: y - 5 })
            break
        case 'd':
            Body.setVelocity(ball, { x: x + 5, y })
            break
        case 's':
            Body.setVelocity(ball, { x, y: y + 5 })
            break
        case 'a':
            Body.setVelocity(ball, { x: x - 5, y })
            break
                                
    }
})