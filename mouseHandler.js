const { Body, Composite, Mouse, MouseConstraint } = require('./node_modules/matter-js/build/matter.js')
const mouseHandler = (world, render, engine, ball) => {

    const mouseconstraint = MouseConstraint.create(engine, {
        mouse: Mouse.create(render.canvas)
    })

    ball ? Composite.add(world, mouseconstraint) : Composite.remove(world, mouseconstraint)

    mousemoveListener = e => {
        const dx = e.movementX
        const dy = e.movementY

        Body.translate(ball, { x: dx, y: dy })
    }
    
    window.onmousemove = ball ? mousemoveListener : null





    
}

module.exports = mouseHandler