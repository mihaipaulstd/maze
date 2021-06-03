// import { Engine, Render, Runner, World, Bodies, Body, Events, Mouse, MouseConstraint } from './node_modules/matter-js/build/matter'
const startButton = document.getElementById('start-button')

const mouseHandler = require('./mouseHandler.js')
const { initEngine, initState } = require('./init.js')
const onLevelUp = require('./collision.js')
const Maze = require('./maze.js')


    
startButton.onclick = e => {

    const { engine, world, render, canvas } = initEngine()
    const state = initState()
    

    state.setGameOver(false)

    state.setLevel(1)

    canvas.requestPointerLock()

    

    
    let maze = new Maze(state.getLevel() + 1, {
        fillStyle: "#fff"
    })
    
    
    
    
    maze.set(world)
    
    mouseHandler(world, render, engine, maze.getBodies().ball)

    onLevelUp(engine, () => {        
        maze.erase(world)
        
        
        state.setLevel(state.getLevel() + 1)

        maze = new Maze(state.getLevel() + 1, {
            fillStyle: "#fff"
        })

        maze.set(world)

        mouseHandler(world, render, engine, maze.getBodies().ball)
    })
}
