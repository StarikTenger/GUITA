 
// Main class that controls everything

class Cell {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

class Game {
    constructor() {
        this.timer = 0;
        this.score = 0;

        this.animations = [];
        this.enemies = [];

        this.grid = [];
        this.grid_size = new Vec2(10, 10);
        this.cell_size = 50;

        for (let y = 0; y < this.grid_size.y; ++y) {
            this.grid.push([])
            for (let x = 0; x < this.grid_size.x; ++x) {
                this.grid[y].push(new Cell(x, y, 0))
            }
        }

        this.path = [
            new Vec2(0, 0),
            new Vec2(0, 1),
            new Vec2(1, 1),
            new Vec2(1, 2),
            new Vec2(1, 3),
            new Vec2(1, 4),
            new Vec2(1, 5),
            new Vec2(1, 6),
            new Vec2(2, 6),
            new Vec2(3, 6),
            new Vec2(3, 6),
            new Vec2(3, 5),
            new Vec2(3, 4),
            new Vec2(3, 3),
            new Vec2(3, 2),
            new Vec2(4, 2),
            new Vec2(5, 2),
            new Vec2(6, 2),
            new Vec2(7, 2),
            new Vec2(8, 2),
            new Vec2(8, 3),
            new Vec2(8, 4),
            new Vec2(8, 5),
            new Vec2(7, 5),
            new Vec2(6, 5),
            new Vec2(5, 5),
            new Vec2(5, 6),
            new Vec2(5, 7),
            new Vec2(5, 8),
            new Vec2(6, 8),
            new Vec2(7, 8),
            new Vec2(7, 9),
            new Vec2(8, 9),
            new Vec2(9, 9),
        ];

        for (let i = 0; i < this.path.length; ++i) {
            this.grid[this.path[i].y][this.path[i].x].type = 1;
        }
        console.log(this.grid)


    }
    
    increase_score(delta) {
        this.score += delta;
        document.getElementById('score').innerHTML = "Score: " + this.score;
    }

    intesected(coords1, coords2, rad1, rad2) {
        return dist(coords1, coords2) < rad1 + rad2;
    }

    step() {
        this.timer++;
        var inputs = document.getElementsByTagName('input');
        var sliders = [];

        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].type.toLowerCase() == 'range') {
                sliders.push(inputs[i]);
            }
        }

        for (var i = 0; i < sliders.length; i++) {
            var rect = sliders[i].getBoundingClientRect();
            var coords = plus(new Vec2(rect.x, rect.y), 
                new Vec2(rect.width * sliders[i].value / sliders[i].max, rect.height / 2));

            var size = rect.height;

            for (var j = 0; j < this.enemies.length; j++) {
                if (intersected(coord, this.enemies[i].coords, size, this.enemies[i].size())) {
                    this.enemies[i].dealDamage();
                }
            }
        }
    }
}