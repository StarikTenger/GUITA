var game = new Game(CTX);
var draw = new Draw(CTX);
var step_count = 0;

// Add event listener for `mouse move` events.
document.onmousemove=  function (event) {
    MOUSE_X = event.x
    MOUSE_Y = event.y;
};

// var myAudio = new Audio('music/main_theme.mp3');
// myAudio.loop = true;

var damage_sound = new Audio('sounds/damage.mp3');

function play_sound(sound) {
    sound.currentTime = 0;
    sound.volume = VOLUME * 2;
    sound.play();
}

function step() {
    if (game.hp <= 0) {
        draw.draw(game);
        return;
    }
    step_count++;
    if (step_count == TICK_STEPS_NUM) {
        step_count = 0;
        if (game.all_dead) {
            myAudio.pause();
            play_sound(gameover)
            return;
        }
    }
    // myAudio.volume = VOLUME;
    // myAudio.play();
    draw.draw(game);
    game.step();

    if (KEY_MINUS) {
        VOLUME = Math.max(0, VOLUME - 0.1);
    }
    if (KEY_PLUS) {
        VOLUME = Math.min(1, VOLUME + 0.1);
    }
}

var interval = setInterval(step, DT * 1000);
