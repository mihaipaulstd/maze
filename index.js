// import { Engine, Render, Runner, World, Bodies, Body, Events, Mouse, MouseConstraint } from './node_modules/matter-js/build/matter'


const startButton = document.getElementById('start-button')
const gameOverMessage = document.getElementById('game-over')

const mouseHandler = require('./mouseHandler.js')
const { initEngine, initState } = require('./init.js')
const onCollision = require('./collision.js')
const Maze = require('./maze.js')
const { Body } = require('matter-js')
const { addClass, removeClass } = require('./utils.js')


    
startButton.onclick = e => {
    const { engine, world, render, canvas } = initEngine()
    const state = initState()

    addClass(startButton, 'hidden')

    let maze = new Maze(state.getLevel() + 1, {
            fillStyle: "#fff"
        })
    
    state.setGameOver(false)
    
    state.setLevel(1)
    
    canvas.requestPointerLock()
    
    
    maze.set(world)
    
    
    mouseHandler(world, render, engine, maze.getBodies().ball)

    onCollision(engine, gameOver => {
        if(gameOver) {
            state.setGameOver(true)

            removeClass(gameOverMessage, 'hidden')
            document.exitPointerLock()
            mouseHandler(world, render, engine, null)
            world.gravity.y = .5
            world.bodies.forEach(body => {
                if(body.label === 'wall') {
                    Body.setStatic(body, false)
                }
            })
        } else {
            maze.erase(world)
        
        
            state.setLevel(state.getLevel() + 1)
    
            maze = new Maze(state.getLevel() + 1, {
                fillStyle: "#fff"
            })
    
            maze.set(world)
    
            mouseHandler(world, render, engine, maze.getBodies().ball)
        }

        
    })
}
