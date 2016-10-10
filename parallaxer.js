
document.onmousemove = function(e) { parallaxize(e) };

var MAX_DISTANCE = 4;
var PARALLAX_DISTANCE_THRESHOLD = 300;

var elem = document.getElementsByClassName('parallax-text')[0];
var bg = document.getElementsByClassName('parallax-bg')[0];
var elemPos = elem.getBoundingClientRect();

bg.innerHTML = elem.innerHTML;
bg.style.left = elem.style.left;
bg.style.top = elem.style.top;

function parallaxize(e) {
	var x = e.clientX;
	var y = e.clientY;
	var distanceX = (elemPos.left + elemPos.width / 2) - x;
	var distanceY = (elemPos.top + elemPos.height / 2) - y;
	if (Math.abs(distanceX) > PARALLAX_DISTANCE_THRESHOLD || Math.abs(distanceY) > PARALLAX_DISTANCE_THRESHOLD) { return; }

	var direction = { x: distanceX < 0 ? 'left' : 'right', y: distanceY < 0 ? 'up' : 'down' };
	
	var translate = function() {
		var left = 0;
		var top = 0;
		if (direction.x === 'left') {
			left = distanceX > -MAX_DISTANCE ? distanceX + 'px' : -MAX_DISTANCE + 'px';
		} else {
			left = distanceX < MAX_DISTANCE ? distanceX + 'px' : MAX_DISTANCE + 'px';
		}

		if (direction.y === 'up') {
			top = distanceY > -MAX_DISTANCE ? distanceY + 'px' : -MAX_DISTANCE + 'px';
		} else {
			top = distanceY < MAX_DISTANCE ? distanceY + 'px' : MAX_DISTANCE + 'px';
		}

		return '(' + left + ',' + top + ')';
	}
	var transform = 'translate' + translate();
	elem.style.transform = transform;
}