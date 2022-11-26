const CURS_NONE = 0;
const CURS_RANGE = 1;
const CURS_TEXTBOX = 2;
const CURS_RADIOBUTTONS = 3;

class Cursor {
	constructor() {
		this.active = false;
		this.type = CURS_NONE;

	}

	setType(_type) {
		this.type = _type
	}

	setTower(pos) {
		console.log(pos)
		if (this.type = CURS_RANGE) {
			let range = document.createElement("input")
			range.class = "tower"
			range.type = "range";
			range.style.position = "absolute";
			range.style.left = pos.x;
			range.style.top = pos.y;
			console.log(range.style.position);
			document.getElementById("towers").append(range)
		}
		
		this.type = CURS_NONE;
	}
}

let cursor = new Cursor();

document.getElementById("add_range").onclick = function(){cursor.setType(CURS_RANGE)}
document.getElementById("add_textfield").onclick = function(){cursor.setType(CURS_TEXTBOX)}
document.getElementById("add_radiobuttons").onclick = function(){cursor.setType(CURS_RADIOBUTTONS)}

SCREEN.onclick = function(event){cursor.setTower(new Vec2(event.pageX, event.pageY))};