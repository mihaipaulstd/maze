const { Composite } = require('./node_modules/matter-js/build/matter.js')

const wallEraser = (maze, world) => {
    const { horizontalWalls, verticalWalls, borders } = maze.getWalls()
    
    horizontalWalls.forEach(wall => Composite.remove(world, wall))
    verticalWalls.forEach(wall => Composite.remove(world, wall))
    Composite.remove(world, borders)
}

module.exports = wallEraser

