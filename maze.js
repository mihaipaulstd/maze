const { initGrid } = require('./init.js')
const { generateMazePath, getRandomGridPosition } = require('./utils.js')
const buildWalls = require('./wallBuilder.js')
const paintWalls = require('./wallPainter.js')
const eraseWalls = require('./wallEraser.js')
const buildBodies = require('./bodyBuilder')
const paintBodies = require('./bodyPainter')
const eraseBodies = require('./bodyEraser')

class Maze {

    constructor(dimension = 2, renderOptions) {
        this.dimension = dimension
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.unitLength = this.width / this.dimension
        this.unitHeight = this.height / this.dimension
        this.walls = []
        this.bodies = []
        this.wallThickness = 1
        this.renderOptions = renderOptions
    }

    init = () => {
        const { grid, horizontals, verticals } = initGrid(this.dimension)
        this.grid = grid
        this.horizontals = horizontals
        this.verticals = verticals
    }

    generate = () => {
        const { row, column } = getRandomGridPosition(this)
        generateMazePath(row, column, this)
    }

    build = (world) => {
        const walls = buildWalls(this, world)
        const bodies = buildBodies(this, world)
        this.setWalls(walls)
        this.setBodies(bodies)
    }
    paint = (world) => {
        paintWalls(this, world)
        paintBodies(this, world)
    }

    set = (world) => {
        this.init()
        this.generate()
        this.build(world)
        this.paint(world)
    }

    erase = (world) => {
        eraseWalls(this, world)
        eraseBodies(this, world)
    }

    getDimension = () => this.dimension
    getWidth = () => this.width
    getHeight = () => this.height
    getWalls = () => this.walls
    getBodies = () => this.bodies
    getRenderOptions = () => this.renderOptions
    getWallThickness = () => this.wallThickness
    getUnitLength = () => this.unitLength
    getUnitHeight = () => this.unitHeight
    getGrid = () => this.grid
    getHorizontals = () => this.horizontals
    getVerticals = () => this.verticals

    setDimension = (dimension) => this.dimension = dimension
    setWalls = (walls) => this.walls = walls
    setBodies = (bodies) => this.bodies = bodies
    setRenderOptions = (renderOptions) => this.renderOptions = renderOptions
    setWallThickness = (wallThickness) => this.wallThickness = wallThickness
    setGrid = (row, column, value) => this.grid[row][column] = value
    setHorizontals =  (row, column, value) => this.horizontals[row][column] = value
    setVerticals = (row, column, value) => this.verticals[row][column] = value
}

module.exports = Maze