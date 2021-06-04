const { Events } = require('./node_modules/matter-js/build/matter.js')

const onCollision = (engine, callback) => Events.on(engine, 'collisionStart', e => {
    e.pairs.forEach(collision => {
        const win = ['ball', 'goal']
        const lose = ['ball', 'wall']
        if (win.includes(collision.bodyA.label) && win.includes(collision.bodyB.label)) {
            callback(false)
        }
        if (lose.includes(collision.bodyA.label) && lose.includes(collision.bodyB.label)) {
            callback(true)
        }
    })
})



module.exports = onCollision

