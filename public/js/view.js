var View = {

	init : function() {
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.draw();
		this.info    = document.getElementById('playing');
	},

	setInfo : function(infoText) {
		if (typeof infoText == "undefined") {
			infoText = '';
		}

		this.info.innerHTML = infoText;
	},

	draw : function() {
		// clear court
		this.context.clearRect(
			0,
			0,
			this.canvas.width,
			this.canvas.height);

		// draw snake
		this.context.fillStyle = "rgb(200,0,0)";

 		this.context.fillRect(
 			Snake.current.x * Snake.gridSize,
 			Snake.current.y * Snake.gridSize,
 			Snake.gridSize,
 			Snake.gridSize);
	},
};
