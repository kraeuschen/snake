var Events = {

    KEY : {
        LEFT  : 37,
        RIGHT : 39,
        UP    : 38,
        DOWN  : 40,
        SPACE : 32,
        ESC   : 27,
    },

    init : function() {
        document.addEventListener('keydown', function(event) {
            if (Snake.playing == false && event.keyCode !== Events.KEY.SPACE) {
                return;
            }

            var handled = false;

            switch(event.keyCode) {
                case Events.KEY.LEFT:
                    Snake.actions.push(Snake.DIR.LEFT);
                    handled = true;
                    break;
                case Events.KEY.RIGHT:
                    Snake.actions.push(Snake.DIR.RIGHT);
                    handled = true;
                    break;
                case Events.KEY.UP:
                    Snake.actions.push(Snake.DIR.UP);
                    handled = true;
                    break;
                case Events.KEY.DOWN:
                    Snake.actions.push(Snake.DIR.DOWN);
                    handled = true;
                    break;
                case Events.KEY.SPACE:
                    Snake.pause();
                    handled = true;
                    break;
                case Events.KEY.ESC:
                    Snake.loose();
                    handled = true;
                    break;
            };

            if (handled) {
                event.preventDefault();
            }
        });
    },
};
