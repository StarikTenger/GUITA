 
// Main class that controls everything

function damageAnimation(pos) {
    let image = document.createElement("img");
    image.src = "https://www.freepnglogos.com/uploads/explosion/clipart-starburst-explosion-comic-vector-png-transparent-5.png";
    image.style.opacity = 0;
    image.style.position = "absolute";
    image.style.z_index = -10;
    let size = 40;
    image.style.width = image.style.height = size;
    image.style.left = pos.x - size/2;
    image.style.top = pos.y - size/2;

    image.style["animation"] = "damage";
    image.style["animation-duration"] = "0.2s";
    
    document.getElementById("animations").append(image);
    
    setTimeout(function(){image.remove()}, 300);
}

class Cell {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

class Enemy {
    constructor(x, y, shift, id, game) {
        this.pos = new Vec2(x, y)
        this.shift = shift
        this.cell = 0
        this.speed = 1
        this.hp = 10
        this.maxHp = this.hp
        this.update_target(game)
        this.id = id
        this.size = 4
    }

    update_target(game) {
        let t = plus(game.path[this.cell], new Vec2(0.5, 0.5))
        t = plus(t, mult(game.diags[this.cell], this.shift))
        t = mult(t, game.cell_size)
        this.target = t
    }
    
    tick(game) {

        if (dist(this.pos, this.target) < this.speed) {
            this.cell++;
            this.update_target(game);
        }

        let dir = minus(this.target, this.pos).norm()
        this.pos = plus(this.pos, mult(dir, this.speed))
    }

    dealDamage() {
        this.hp -= 1;
        this.hp = Math.max(0, this.hp);
    }
}

class Game {
    constructor() {
        this.timer = 0;
        this.score = 0;

        this.animations = [];

        this.grid = [];
        this.grid_size = new Vec2(10, 10);
        this.cell_size = 50;

        this.enemy_id = 0;
        this.next_enemy_time = 0;

        this.enemies = {}
        this.hp = 10
        this.grave_yard = []

        this.money = 100;

        for (let y = 0; y < this.grid_size.y; ++y) {
            this.grid.push([])
            for (let x = 0; x < this.grid_size.x; ++x) {
                this.grid[y].push(new Cell(x, y, 0))
            }
        }

        this.deltas = [ new Vec2(1, 0) ];
        this.diags = [ new Vec2(0.5, 0.5) ];

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
            new Vec2(9, 9),
        ];

        for (let i = 0; i < this.path.length; ++i) {
            this.grid[this.path[i].y][this.path[i].x].type = 1;
        }

        for (let i = 1; i < this.path.length; ++i) {
            this.deltas.push(minus(this.path[i], this.path[i - 1]))
        }

        for (let i = 1; i < this.path.length; ++i) {
            if (eq(this.deltas[i], this.deltas[i - 1])) {
                this.diags.push(this.diags[i - 1])
            } else {
                this.diags.push(div(plus(this.deltas[i], this.deltas[i - 1]), 2))
            }
        }

        console.log(this.deltas)
        console.log(this.diags)
    }

    create_enemy(x, y) {
        let id = "enemy" + String(this.enemy_id++);
        this.enemies[id] = new Enemy(x, y, random_float(-0.95, 0.95), id, this);
        let enemy = this.enemies[id]
        let e = document.createElement('div');
        e.id = id;
        e.style.position = "absolute"
        e.style.height = String(enemy.size) + "px";
        e.style.border = "1px solid black";
        e.style.width = String(enemy.size) + "px";
        e.style.backgroundColor = "hsl(" + enemy.hp * 100/enemy.maxHp + ", 100%, 50%)";
        document.getElementById('towers').appendChild(e);

        this.next_enemy_time = 0
    }

    kill_enemy(id, moneyMod = 1) {
        damageAnimation(this.enemies[id].pos);
        this.grave_yard.push(id)
        let e = document.getElementById(id);
        if (e != null) {
            e.parentNode.removeChild(e);
            this.money += this.enemies[id].maxHp * MONSTER_COST_MODIFIER * moneyMod;
        }
    }
    
    increase_score(delta) {
        this.score += delta;
        document.getElementById('score').innerHTML = "Score: " + this.score;
    }

    intersected(coords1, coords2, rad1, rad2) {
        return dist(coords1, coords2) < rad1 + rad2;
    }

    step() {
        // Money management
        document.getElementById("money").innerHTML = "Balance: " + this.money + "$";
        if (game.money >= RANGE_COST) {
            document.getElementById("add_range").style.color = "green";
        } else {
            document.getElementById("add_range").style.color = "red";
        }
        if (game.money >= TEXT_COST) {
            document.getElementById("add_textfield").style.color = "green";
        } else {
            document.getElementById("add_textfield").style.color = "red";
        }
        if (game.money >= RADIO_COST) {
            document.getElementById("add_radiobuttons").style.color = "green";
        } else {
            document.getElementById("add_radiobuttons").style.color = "red";
        }

        // HP ыыыыыыы
        document.getElementById("hp").innerHTML = "HP: " + this.hp;
        

        this.timer++;
        var inputs = document.getElementsByTagName('input');
        var sliders = [];
        var radio = [];

        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].type.toLowerCase() == 'range') {
                sliders.push(inputs[i]);
            }
            if(inputs[i].type.toLowerCase() == 'radio') {
                radio.push(inputs[i]);
            }
        }

        for (var i = 0; i < sliders.length; i++) {
            var rect = sliders[i].getBoundingClientRect();
            var coords = plus(new Vec2(rect.x, rect.y), 
                new Vec2(rect.width * sliders[i].value / sliders[i].max, rect.height / 2));

            var size = rect.height;

            for (let [id, enemy] of Object.entries(this.enemies)) {
                if (this.intersected(coords, enemy.pos, size, enemy.size) && sliders[i].id != "preview") {
                    enemy.dealDamage();
                }
            }
        }

        for (var i = 0; i < radio.length; i++) {
            var rect = radio[i].getBoundingClientRect();
            var coords = plus(new Vec2(rect.x, rect.y), 
                new Vec2(rect.width / 2, rect.height / 2));
            var size = 100;

            if (radio[i] != "preview") {
                
                radio[i].time_to_cooldown -= DT;
                radio[i].style.opacity = 1 - radio[i].time_to_cooldown / radio[i].cooldown;
                if (radio[i].time_to_cooldown > 0) {
                    continue;
                }
                radio[i].time_to_cooldown = 0;

                if (radio[i].checked == true) {
                    
                    

                    for (let [id, enemy] of Object.entries(this.enemies)) {
                        //console.log(radio[i].checked);
                        if (this.intersected(coords, enemy.pos, size, enemy.size)) {
                            radio[i].time_to_cooldown = radio[i].cooldown;
                            console.log(radio[i].checked);
                            radio[i].checked = false;
                            enemy.dealDamage();
                        }
                    }
                }
            }
        }

        for (let [id, enemy] of Object.entries(this.enemies)) {
            enemy.tick(this)
            let e = document.getElementById(id);
            if (e != null) {
                var newColor = "hsl(" + enemy.hp * 10 + ", 100%, 50%)"
                e.style.backgroundColor = newColor;
                e.style.left = String(enemy.pos.x - enemy.size / 2) + "px";
                e.style.top = String(enemy.pos.y - enemy.size / 2) + "px";
                if (enemy.hp == 0 ) {
                    this.kill_enemy(id);
                }
                if (enemy.cell >= this.path.length - 1) {
                    this.enemy_passed();
                    this.kill_enemy(id);
                }
            }
        }

        this.next_enemy_time -= DT;
        if (this.next_enemy_time <= 0) {
            this.create_enemy(0, 0)
            this.next_enemy_time = random_float(0.4, 1.0)
        }

        for (let id of this.grave_yard) {
            delete this.enemies[id];
        }
        this.grave_yard = []
    }

    enemy_passed(id) {
        this.kill_enemy(id, 0)
        this.hp -= 1
    }
}