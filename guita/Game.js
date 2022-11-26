 
// Main class that controls everything

class Game {
    constructor() {
        this.timer = 0;
        this.score = 0;

        this.animations = [];
    }
    
    increase_score(delta) {
        this.score += delta;
        document.getElementById('score').innerHTML = "Score: " + this.score;
    }

    step() {
        this.timer++;
    }

    tick() {

    }
}