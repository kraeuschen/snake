var Snake = {

	actions : [],
	current : {},
	body    : [],
	food    : {},
	score   : 0,

	gridSize : 10,
	speed    : 0.1,
	dt       : 0, // time since starting this game

	playing  : false,

	DIR : {
		UP    : 0,
		RIGHT : 1,
		DOWN  : 2,
		LEFT  : 3,
	},

	// init game
	run : function() {
		View.init();
		Events.init();

		Snake.reset();

		View.setInfo('Press Space to start.');

		var last = now = new Date().getTime();

		var frame = function() {
			now = new Date().getTime();

			Snake.update(Math.min(1, (now - last) / 1000.0));
			View.draw();

			last = now;
			requestAnimationFrame(frame, View.canvas);
		};

		frame();
	},

	update : function(idt) {
		// paused
		if (!Snake.playing) {
			return;
		}

		Snake.dt = Snake.dt + idt;

		if (Snake.dt > Snake.speed) {
			Snake.dt = Snake.dt - Snake.speed;
			Snake.handle();
		}
	},

	// reset game vars and positions
	reset : function() {
		Snake.actions = [];
		Snake.body    = [];
		Snake.playing = false;
		Snake.score   = 0;
		Snake.current = {
			x : 0,
			y : 0,
			direction : Snake.DIR.RIGHT
		};

		Snake.body.push({x : 0, y : 0});

		Snake.spawnFood();
	},

	// pause function
	pause : function() {
		Snake.playing = !Snake.playing;

		if (Snake.playing) {
			View.setInfo();
		} else {
			View.setInfo('Paused');
		}
	},

	// game over screen
	loose : function() {
		Snake.playing = false;
		View.setInfo('Game Over');
		Snake.reset();
	},

	// game handler called by setInterval
	handle : function() {
		// current direction
		var direction = Snake.current.direction;

		// user keyboard input exists
		if (Snake.actions.length > 0) {
			direction = Snake.actions.shift();
		}

		// set next head point
		Snake.move(direction);

		// check if next head point is valid
		if (Snake.collided()) {
			Snake.loose();
		}

		// store next head point
		Snake.body.push({x : Snake.current.x, y : Snake.current.y});

		// eats apple?
		if (Snake.food.x == Snake.current.x &&
			Snake.food.y == Snake.current.y
		) {
			Snake.body.push({x : Snake.current.x, y : Snake.current.y});
			Snake.spawnFood();
			Snake.score +=1;
		} else {
			Snake.body.shift(); // drop first element
		}
	},

	// check if the snake is collided
	collided : function() {
		// reaches court borders
		if (Snake.current.x >= View.canvas.width ||
			Snake.current.x < 0
		) {
			return true;
		}

		if (Snake.current.y >= View.canvas.height ||
			Snake.current.y < 0
		) {
			return true;
		}

		return Snake.body.some(Snake.eatsItself);
	},

	eatsItself : function(element, index, array) {
		return (element.x == Snake.current.x && element.y == Snake.current.y);
	},

	// changes moving direction
	move : function(direction) {
		var x   = Snake.current.x,
			y   = Snake.current.y,
			dir = Snake.current.direction;

		// filters input
		switch (direction) {
			case Snake.DIR.UP:
				y = y - 1 * Snake.gridSize;
				dir = direction;
				break;
			case Snake.DIR.RIGHT:
				x = x + 1 * Snake.gridSize;
				dir = direction;
				break;
			case Snake.DIR.DOWN:
				y = y + 1 * Snake.gridSize;
				dir = direction;
				break;
			case Snake.DIR.LEFT:
				x = x - 1 * Snake.gridSize;
				dir = direction;
				break;
		}

		Snake.current.x = x;
		Snake.current.y = y;
		Snake.current.direction = dir;
	},

	// creates an apple
	spawnFood : function() {
		Snake.food.x = Math.floor(Math.random() * (View.canvas.width/Snake.gridSize)) * Snake.gridSize;
		Snake.food.y = Math.floor(Math.random() * (View.canvas.height/Snake.gridSize)) * Snake.gridSize;

		if (Snake.body.some(Snake.foodHitsSnake)) {
			Snake.spawnFood();
		}
	},

	foodHitsSnake : function(element, index, array) {
		return (element.x == Snake.food.x && element.y == Snake.food.y);
	},
};

// initial call
Snake.run();
