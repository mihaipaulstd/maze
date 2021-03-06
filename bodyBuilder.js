const { Composite, Bodies } = require('matter-js')
const { getRandomGridPosition } = require('./utils.js')

const bodyBuilder = (maze) => {
    //Goal
    const goalPosition = getRandomGridPosition(maze)
    const unitLength = maze.getUnitLength()
    const unitHeight = maze.getUnitHeight()
    const goal = Bodies.rectangle(
        unitLength * goalPosition.row + unitLength / 2,
        unitHeight * goalPosition.column + unitHeight / 2,
        (unitLength < unitHeight ? unitLength : unitHeight) * .4,
        (unitLength < unitHeight ? unitLength : unitHeight) * .4,
        { isStatic: false, label: 'goal', render: { fillStyle: "green" } }
    )

    

    //Ball
    let ballPosition = getRandomGridPosition(maze)

    do{
        ballPosition = getRandomGridPosition(maze)
    } while(
        ballPosition.row == goalPosition.row
        && ballPosition.column == goalPosition.column
    )

    const ball = Bodies.circle(
        unitLength * ballPosition.row + unitLength / 2,
        unitHeight * ballPosition.column + unitHeight / 2,
        (unitLength < unitHeight ? unitLength : unitHeight) * .4 / 2,
        { isStatic: false, label: 'ball', render: { fillStyle: "yellow" }, mass: 10 }
    )

    return { ball, goal }
}

module.exports = bodyBuilder