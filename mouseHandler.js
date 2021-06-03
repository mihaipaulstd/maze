const { Body, Composite, Mouse, MouseConstraint } = require('./node_modules/matter-js/build/matter.js')
const mouseHandler = (world, render, engine, ball) => {

    
    Composite.add(world, MouseConstraint.create(engine, {
        mouse: Mouse.create(render.canvas)
    }))

    mousemoveListener = e => {
        const dx = e.movementX
        const dy = e.movementY

        Body.translate(ball, { x: dx, y: dy })
    }
    
    window.addEventListener("mousemove", mousemoveListener)
}

module.exports = mouseHandler