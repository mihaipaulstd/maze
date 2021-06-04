const { Bodies } = require('matter-js')

const wallBuilder = (maze, world) => {
    const horizontals = maze.getHorizontals()
    const verticals = maze.getVerticals()
    const width = maze.getWidth()
    const height = maze.getHeight()
    const unitLength = maze.getUnitLength()
    const unitHeight = maze.getUnitHeight()
    const wallThickness = maze.getWallThickness()
    const renderOptions = maze.getRenderOptions()

    const horizontalWalls = []
    const verticalWalls = []

    //Borders
    const borders = [
        Bodies.rectangle(width / 2, 0, width, 1, { isStatic: true }),
        Bodies.rectangle(width / 2, height, width, 1, { isStatic: true }),
        Bodies.rectangle(0, height / 2, 1, height, { isStatic: true }),
        Bodies.rectangle(width, height / 2, 1, height, { isStatic: true })
    ];


    horizontals.forEach((row, rowIndex) => {
        row.forEach((open, columnIndex) => {
            if(open) {
                return
            }
    

            horizontalWalls.push(
                Bodies.rectangle(
                    columnIndex * unitLength + unitLength / 2,
                    (rowIndex + 1) * unitHeight,
                    unitLength,
                    wallThickness,
                    { isStatic: true, render: renderOptions, label: "wall" }
                )
            )
    
            
        })
    })
    
    verticals.forEach((row, rowIndex) => {
        row.forEach((open, columnIndex) => {
            if(open) {
                return
            }
    
            horizontalWalls.push(
                Bodies.rectangle(
                    (columnIndex + 1) * unitLength,
                    rowIndex * unitHeight + unitHeight / 2,
                    wallThickness,
                    unitHeight,
                    { isStatic: true, render: renderOptions, label: "wall" },
                )
            )
        })
    })

    return { horizontalWalls, verticalWalls, borders }
}

module.exports = wallBuilder