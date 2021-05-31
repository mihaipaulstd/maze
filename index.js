const { Engine, Render, Runner, World, Bodies } = Matter

const engine = Engine.create()
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight
    }
})

Render.run(render)
Render.run(Runner.create(), engine)


