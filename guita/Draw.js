
// This class is responsible for drawing
class Draw {
    constructor(ctx) {
        this.ctx = ctx;
        this.grass_img = new Image(100, 100); 
        this.grass_img.src = 'grass.png';
        this.bad_ending_img = new Image();
        this.bad_ending_img.src = 'bad_ending.png';
        this.road_img = new Image(100, 100); 
        this.road_img.src = 'road.png';
    }

    image(texture, x, y, w, h, degrees = 0) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);

        this.ctx.save();
        this.ctx.translate(x * SCALE, y * SCALE);
        this.ctx.translate(w*SCALE/2, h*SCALE/2);
        this.ctx.rotate(degrees*Math.PI/180);
        this.ctx.translate(-w*SCALE/2, -h*SCALE/2);

        this.ctx.imageSmoothingEnabled = 0;
        this.ctx.drawImage(texture, 0, 0, w*SCALE, h*SCALE);

        this.ctx.restore();
    }


    rect(x, y, w, h, color) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w);
        h = Math.round(h);
    
        this.ctx.imageSmoothingEnabled = 0;
        this.ctx.fillStyle = color;
        this.ctx.fillRect((x) * SCALE, (y) * SCALE, w * SCALE, h * SCALE);
    }

    text(text, x, y) {
        this.ctx.fillStyle = "white";
        this.ctx.font = "48px serif";
        this.ctx.fillText(text, x, y);
    }

    draw(game) {  
        // Filling background
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, 10000, 10000);
        
        for (let y = 0; y < game.grid_size.y; ++y) {
            for (let x = 0; x < game.grid_size.x; ++x) {
                let img = this.grass_img;
                if (game.grid[y][x].type == 1) {
                    img = this.road_img
                }
                this.ctx.drawImage(img, x * game.cell_size, y * game.cell_size, game.cell_size, game.cell_size);
            }
        }

        if (game.hp <= 0) {
            document.getElementById("gameover").style["z-index"] = 10;
            document.getElementById("gameover").innerHTML = "Waves passed: " + game.wave.number;

            let img = this.bad_ending_img;
            this.ctx.drawImage(img, 0, 0, game.cell_size * game.grid_size.y, game.cell_size * game.grid_size.x);
            let tower = document.getElementById("towers");
            if (tower != undefined) {
                tower.remove();
            }
            return;
        }
        
        // Рисуем сетку или хз
        // for (let x = 0; x < SIZE_X; x++) {
        //     for (let y = 0; y < SIZE_Y; y++) {
        //         draw.image(IMGS[0], x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        //     }
        // }
        
        for (let i = 0; i < game.animations.length; i++) {
            game.animations[i].draw();
        }
    };
}