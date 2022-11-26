const CURS_NONE = 0;
const CURS_RANGE = 1;
const CURS_TEXTBOX = 2;
const CURS_RADIOBUTTONS = 3;

let rangeTemplate = document.createElement("input");
rangeTemplate.class = "tower"
rangeTemplate.type = "range";
rangeTemplate.style.width = "150px";
rangeTemplate.style.height = "20px";
rangeTemplate.style.position = "absolute";

let textTemplate = document.createElement("input");
textTemplate.class = "tower"
textTemplate.type = "text";
textTemplate.style.width = "50px";
textTemplate.style.height = "30px";
textTemplate.style.position = "absolute";
textTemplate.maxLength = 10;

let radioTemplate = document.createElement("input");
radioTemplate.class = "tower"
radioTemplate.type = "radio";
radioTemplate.style.width = "50px";
radioTemplate.style.height = "30px";
radioTemplate.style.position = "absolute";


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
		let element;

		if (this.type == CURS_RANGE) {
			element = rangeTemplate.cloneNode();
		}

		if (this.type == CURS_TEXTBOX) {
			element = textTemplate.cloneNode();
		}

		if (this.type == CURS_RADIOBUTTONS) {
			element = radioTemplate.cloneNode();
		}

		if (this.type != CURS_NONE) {
			element.style.left = pos.x;
			element.style.top = pos.y;
			element.style.z_index = 10;
			console.log(element.style.position);
			document.getElementById("towers").append(element)
		}
		
		this.type = CURS_NONE;
	}
}

let cursor = new Cursor();

document.getElementById("add_range").onclick = function(){cursor.setType(CURS_RANGE)}
document.getElementById("add_textfield").onclick = function(){cursor.setType(CURS_TEXTBOX)}
document.getElementById("add_radiobuttons").onclick = function(){cursor.setType(CURS_RADIOBUTTONS)}

SCREEN.onclick = function(event){cursor.setTower(new Vec2(event.pageX, event.pageY))};