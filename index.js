const { Engine, Render, Runner, World, Bodies } = Matter

let width = window.innerWidth
let height = window.innerHeight
let level = 1

window.addEventListener('resize', e => {
    width = window.innerWidth,
    height = window.innerHeight
})

const engine = Engine.create()
const { world } = engine
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
});
Render.run(render)
Runner.run(Runner.create(), engine)

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
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

const grid = Array(level + 1)
    .fill(null)
    .map(
        () => Array(level + 1)
            .fill(false)
    )
const verticals = Array(level + 1)
    .fill(null)
    .map(
        () => Array(level)
            .fill(false)
    )
const horizontals = Array(level)
    .fill(null)
    .map(
        () => Array(level + 1)
            .fill(false)
    )

const startingRow = Math.floor(Math.random() * (level + 1))
const startingColumn = Math.floor(Math.random() * (level + 1))


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
            || nextRow >= level + 1
            || nextColumn < 0
            || nextColumn >= level + 1
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

