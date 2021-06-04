const addClass = (element = null, className = "") => element.classList.add(className)

const removeClass = (element = null, className = "") => element.classList.remove(className)

const getRandomGridPosition = (maze) => {
    const randomRow = Math.floor(Math.random() * maze.getDimension())
    const randomColumn = Math.floor(Math.random() * maze.getDimension())
    return {
        row: randomRow,
        column: randomColumn
    }
}


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



const generateMazePath = (row, column, maze) => {
    const grid = maze.getGrid()
    const dimension = maze.getDimension()

    //If the cell at [row, column] is visited, then return
    if(grid[row][column])
        return
    
    //Mark cell as visited
    maze.setGrid(row, column, true)

    //Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, column, 'up'],        //top
        [row, column + 1, 'right'],     //right
        [row + 1, column, 'down'],      //bottom
        [row, column - 1, 'left']       //left
    ])

    //For each neighbor...
    for(let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor

        //Check if neighbor is out of bounds
        if(
            nextRow < 0
            || nextRow >= dimension
            || nextColumn < 0
            || nextColumn >= dimension
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
                maze.setHorizontals(row - 1, column, true)
                break
            case 'right':
                maze.setVerticals(row, column, true)
                break
            case 'down':
                maze.setHorizontals(row, column, true)
                break
            case 'left':
                maze.setVerticals(row, column - 1, true)
                break
            default:
        }
        
        //Visit next neighbor
        generateMazePath( nextRow, nextColumn, maze)
    }
}

module.exports = {
    generateMazePath,
    shuffle,
    getRandomGridPosition,
    addClass,
    removeClass
}