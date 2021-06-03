module.exports = class State {
    constructor() {
        this.gameOver = true
        this.level = 1
    }

    getLevel = () => this.level
    getGameOver = () => this.gameOver

    setLevel = level => this.level = level
    setGameOver = (gameOver) => this.gameOver = gameOver
}