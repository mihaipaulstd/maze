const { Composite, Bodies } = require('matter-js')

const bodyEraser = (maze, world) => {
    const { ball, goal } = maze.getBodies()

    Composite.remove(world, goal)
    Composite.remove(world, ball)
}

module.exports = bodyEraser


