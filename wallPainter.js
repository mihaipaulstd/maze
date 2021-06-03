const { Composite } = require('./node_modules/matter-js/build/matter.js')

const wallEraser = (maze, world) => {
    const { horizontalWalls, verticalWalls, borders } = maze.getWalls()
    
    horizontalWalls.forEach(wall => Composite.add(world, wall))
    verticalWalls.forEach(wall => Composite.add(world, wall))
    Composite.add(world, borders)

    
}

module.exports = wallEraser

