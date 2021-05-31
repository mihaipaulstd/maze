const { Engine, Render, Runner, World, Bodies } = Matter

let width = window.innerWidth
let height = window.innerHeight
let level = 1

window.addEventListener('resize', e => {
    width = window.innerWidth,
    height = window.innerHeight
})

const engine = Engine.create()
const { world } = engine
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height
  }
});
Render.run(render)
Runner.run(Runner.create(), engine)

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls)

//Maze Generation
const grid = Array(level + 1)
    .fill(null)
    .map(
        () => Array(level + 1)
            .fill(false)
    )
const verticals = Array(level + 1)
    .fill(null)
    .map(
        () => Array(level)
            .fill(false)
    )
const horizontals = Array(level)
    .fill(null)
    .map(
        () => Array(level + 1)
            .fill(false)
    )
