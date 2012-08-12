var Snake = {

	actions : [],
	current : {},
	
	gridSize : 10, 
	speed    : 100, // lower is faster

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

		setInterval(
			Snake.handle,
			Snake.speed);
	},

	// reset game vars and positions
	reset : function() {
		Snake.actions = [];
		Snake.playing = false;
		Snake.current = {
			x : 0,
			y : 0,
			direction : Snake.DIR.RIGHT
		};
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
		// paused
		if (!Snake.playing) {
			return;
		}

		// current direction
		var direction = Snake.current.direction;

		// user keyboard input exists
		if (Snake.actions.length > 0) {
			direction = Snake.actions.shift();
		}

		// next frame and redraw
		Snake.move(direction);
		View.draw();

		// new position is invalid
		if (Snake.collided()) {
			Snake.loose();
		}
	},

	// check if the snake is collided
	collided : function() {
		// reaches court borders
		if (Snake.current.x * Snake.gridSize >= View.canvas.width ||
			Snake.current.x < 0
		) {
			return true;
		}

		if (Snake.current.y * Snake.gridSize >= View.canvas.height ||
			Snake.current.y < 0
		) {
			return true;
		}

		return false;
	},

	// changes moving direction
	move : function(direction) {
		var x   = Snake.current.x,
			y   = Snake.current.y,
			dir = Snake.current.direction;

		// filters input
		switch (direction) {
			case Snake.DIR.UP:
				y = y - 1;
				dir = direction;
				break;
			case Snake.DIR.RIGHT:
				x = x + 1;
				dir = direction;
				break;
			case Snake.DIR.DOWN:
				y = y + 1;
				dir = direction;
				break;
			case Snake.DIR.LEFT:
				x = x - 1;
				dir = direction;
				break;
		}

		Snake.current.x = x;
		Snake.current.y = y;
		Snake.current.direction = dir;
	},
};

// initial call
Snake.run();
