const { Events } = require('./node_modules/matter-js/build/matter.js')

const onLevelUp = (engine, callback) => Events.on(engine, 'collisionStart', e => {
    e.pairs.forEach(collision => {
        const labels = ['ball', 'goal']
        if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
            callback()
        }
    })
})

module.exports = onLevelUp

