const CURS_NONE = 0;
const CURS_RANGE = 1;
const CURS_TEXTBOX = 2;
const CURS_RADIOBUTTONS = 3;

const RANGE_COST = 40;
const TEXT_COST = 50;
const RADIO_COST = 20;

const MONSTER_COST_MODIFIER = 1;

let rangeTemplate = document.createElement("input");
rangeTemplate.class = "tower"
rangeTemplate.type = "range";
rangeTemplate.max = 100;
rangeTemplate.value = 50;
rangeTemplate.style.width = "200px";
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
radioTemplate.style.width = "20px";
radioTemplate.style.height = "20px";
radioTemplate.style.position = "absolute";

document.getElementById("add_range").innerHTML = "Range (" + RANGE_COST + "$)";
document.getElementById("add_textfield").innerHTML = "Textbox (" + TEXT_COST + "$)";
document.getElementById("add_radiobuttons").innerHTML = "Radiobutton (" + RADIO_COST + "$)";

class Cursor {
	constructor() {
		this.active = false;
		this.type = CURS_NONE;
	}

	deletePreview() {
		if (this.preview) {
			this.preview.remove();
			this.preview = undefined;
		}
	}

	setType(_type) {
		this.deletePreview();

		this.type = _type
		if (this.type == CURS_RANGE && game.money >= RANGE_COST) {
			this.preview = rangeTemplate.cloneNode();
		} else

		if (this.type == CURS_TEXTBOX && game.money >= TEXT_COST) {
			this.preview = textTemplate.cloneNode();
		} else 

		if (this.type == CURS_RADIOBUTTONS && game.money >= RADIO_COST) {
			this.preview = radioTemplate.cloneNode();
		} else {
			return;
		}
		this.preview.id = "preview";
		this.preview.style["pointer-events"] = "none"
		this.preview.style.opacity = 0.5;

		document.getElementById("towers").append(this.preview)
	}

	setTower(pos) {
		console.log(pos)
		let element;

		if (this.type == CURS_RANGE) {
			element = rangeTemplate.cloneNode();
			game.money -= RANGE_COST;
		}

		if (this.type == CURS_TEXTBOX) {
			element = textTemplate.cloneNode();
			game.money -= TEXT_COST;
		}

		if (this.type == CURS_RADIOBUTTONS) {
			element = radioTemplate.cloneNode();
			element.cooldown = 1.5;
			element.time_to_cooldown = 0;
			game.money -= RADIO_COST;
		}

		if (this.type != CURS_NONE && this.preview) {
			element.style.left = pos.x - this.preview.offsetWidth / 2;
			element.style.top = pos.y - this.preview.offsetHeight / 2;
			element.style.z_index = 10;
			console.log(element.style.position);
			document.getElementById("towers").append(element)
		}

		this.deletePreview();
		this.type = CURS_NONE;
	}

	updatePreview(pos) {
		if (this.preview) {
			this.preview.style.left = pos.x - this.preview.offsetWidth / 2;
			this.preview.style.top = pos.y - this.preview.offsetHeight / 2;
		}
	}
}

let cursor = new Cursor();

document.getElementById("add_range").onclick = function(){cursor.setType(CURS_RANGE)}
document.getElementById("add_textfield").onclick = function(){cursor.setType(CURS_TEXTBOX)}
document.getElementById("add_radiobuttons").onclick = function(){cursor.setType(CURS_RADIOBUTTONS)}

SCREEN.onclick = function(event){cursor.setTower(new Vec2(event.pageX, event.pageY))};
SCREEN.onmousemove = function(event){cursor.updatePreview(new Vec2(event.pageX, event.pageY))};