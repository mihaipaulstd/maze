const { Engine, Render, Runner } = require('./node_modules/matter-js/build/matter.js')
const State = require('./state.js')


const initEngine = () => {
    const engine = Engine.create()
    const { world } = engine
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            wireframes: false,
            width: window.innerWidth,
            height: window.innerHeight
        }
    });
    
    engine.world.gravity.y = 0
    
    Render.run(render)
    Runner.run(Runner.create(), engine)
    
    const canvas = document.querySelector('canvas')

    return { engine, world, render, canvas }
    
}

const initGrid = (dimension) => {

    const grid = Array(dimension)
        .fill(null)
        .map(
            () => Array(dimension)
                .fill(false)
    )

    const horizontals = Array(dimension - 1)
        .fill(null)
        .map(
            () => Array(dimension)
                .fill(false)
    )

    const verticals = Array(dimension)
        .fill(null)
        .map(
            () => Array(dimension - 1)
                .fill(false)
    )
    

    return { grid, horizontals, verticals }
}



const initState = () => new State()

module.exports = {
    initEngine,
    initGrid,
    initState
}