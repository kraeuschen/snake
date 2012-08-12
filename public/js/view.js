var View = {

	init : function() {
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.info    = document.getElementById('playing');
		this.score   = document.getElementById('score');
		this.draw();
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
		View.drawSnake();
		View.drawFood();
		View.drawScore();
	},

	drawFood : function() {
		this.context.fillStyle = "rgb(10,100,0)";
		this.context.fillRect(
			Snake.food.x,
			Snake.food.y,
			Snake.gridSize,
			Snake.gridSize);
	},

	drawSnake : function() {
		// draw snake
		this.context.fillStyle = "rgb(200,0,0)";

		for (var i=Snake.body.length-1; i>=0; i--) {
			var part = Snake.body[i];

			this.context.fillRect(
				part.x,
				part.y,
				Snake.gridSize,
				Snake.gridSize);
		};
	},

	drawScore : function() {
		this.score.innerHTML = Snake.score;
	},
};
