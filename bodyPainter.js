const { Composite, Bodies } = require('matter-js')

const bodyPainter = (maze, world) => {
    const { ball, goal } = maze.getBodies()

    Composite.add(world, goal)
    Composite.add(world, ball)
}

module.exports = bodyPainter


